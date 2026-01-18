from typing import Optional, List
from ..models.rag_session import RagChatbotSession, RagChatbotSessionCreate
from qdrant_client import QdrantClient
from qdrant_client.http import models
from openai import AsyncOpenAI
import os
import asyncio


class RagService:
    """
    Service for handling RAG (Retrieval Augmented Generation) operations
    """

    def __init__(self):
        # Initialize Qdrant client for vector storage
        self.qdrant_client = QdrantClient(
            url=os.getenv("QDRANT_URL", "http://localhost:6333"),
            api_key=os.getenv("QDRANT_API_KEY")
        )

        # Initialize OpenAI client for LLM interactions
        self.openai_client = AsyncOpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

        # Collection name for storing textbook content vectors
        self.collection_name = "textbook_content"

        # Initialize the Qdrant collection if it doesn't exist
        self._init_collection()

    def _init_collection(self):
        """
        Initialize the Qdrant collection for storing content vectors
        """
        try:
            collections = self.qdrant_client.get_collections()
            if self.collection_name not in [col.name for col in collections.collections]:
                self.qdrant_client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE),
                )
        except Exception as e:
            print(f"Error initializing Qdrant collection: {e}")

    async def add_content_to_vector_db(self, content_id: str, content_text: str, metadata: dict = None):
        """
        Add content to the vector database for RAG retrieval
        """
        from openai import OpenAI
        sync_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        # Generate embedding for the content
        embedding_response = sync_client.embeddings.create(
            input=content_text,
            model="text-embedding-ada-002"
        )
        embedding = embedding_response.data[0].embedding

        # Upsert the content into Qdrant
        self.qdrant_client.upsert(
            collection_name=self.collection_name,
            points=[
                models.PointStruct(
                    id=content_id,
                    vector=embedding,
                    payload={
                        "content": content_text,
                        "metadata": metadata or {}
                    }
                )
            ]
        )

    async def retrieve_context(self, query: str, limit: int = 5) -> List[dict]:
        """
        Retrieve relevant context from the vector database based on the query
        """
        from openai import OpenAI
        sync_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        # Generate embedding for the query
        embedding_response = sync_client.embeddings.create(
            input=query,
            model="text-embedding-ada-002"
        )
        query_embedding = embedding_response.data[0].embedding

        # Search for similar content in Qdrant
        search_results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=limit
        )

        # Extract the content from the results
        retrieved_contexts = []
        for result in search_results:
            retrieved_contexts.append({
                "content": result.payload.get("content", ""),
                "metadata": result.payload.get("metadata", {}),
                "score": result.score
            })

        return retrieved_contexts

    async def generate_response(self, query: str, context: List[dict], selected_text: Optional[str] = None) -> str:
        """
        Generate a response using the LLM with retrieved context
        """
        # Combine context into a single string
        context_str = "\n\n".join([item["content"] for item in context])

        # If selected text is provided, include it in the prompt
        if selected_text:
            system_prompt = f"""
            You are an AI assistant for the Physical AI & Humanoid Robotics textbook.
            Use the following context to answer questions about robotics concepts:

            {context_str}

            The user has selected this specific text: "{selected_text}"

            Answer the user's question based on the context and the selected text.
            """
        else:
            system_prompt = f"""
            You are an AI assistant for the Physical AI & Humanoid Robotics textbook.
            Use the following context to answer questions about robotics concepts:

            {context_str}

            Answer the user's question based on the context provided.
            """

        # Call the OpenAI API to generate a response
        response = await self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ],
            temperature=0.3,
            max_tokens=500
        )

        return response.choices[0].message.content

    async def create_chat_session(self, session_data: RagChatbotSessionCreate) -> RagChatbotSession:
        """
        Create a new RAG chatbot session
        """
        # Retrieve relevant context from vector database
        context = await self.retrieve_context(session_data.query)

        # Generate a response based on the query and context
        response = await self.generate_response(session_data.query, context, session_data.context_used)

        # Create the session object
        session = RagChatbotSession(
            user_id=session_data.user_id,
            query=session_data.query,
            response=response,
            context_used=session_data.context_used or "\n\n".join([item["content"] for item in context]),
        )

        return session

    async def process_query(self, query: str, user_id: str, selected_text: Optional[str] = None) -> RagChatbotSession:
        """
        Process a user query through the RAG system
        """
        # Retrieve relevant context from vector database
        context = await self.retrieve_context(query)

        # Generate a response based on the query and context
        response = await self.generate_response(query, context, selected_text)

        # Create the session object
        session = RagChatbotSession(
            user_id=user_id,
            query=query,
            response=response,
            context_used=selected_text or "\n\n".join([item["content"] for item in context]),
        )

        return session