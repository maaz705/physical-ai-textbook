from fastapi import APIRouter, Depends, HTTPException, status
from ..models.rag_session import RagChatbotSession, RagChatbotSessionCreate
from ..services.rag_service import RagService
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel


class QueryRequest(BaseModel):
    query: str
    selected_text: str = None


router = APIRouter(prefix="/chat", tags=["RAG Chatbot"])
security = HTTPBearer()
rag_service = RagService()


@router.post("/query", response_model=RagChatbotSession)
async def query_rag_bot(request: QueryRequest, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Submit a query to the RAG chatbot
    """
    # In a real implementation, we would extract the user ID from the token
    # For now, we'll use a placeholder user ID
    user_id = "placeholder_user_id"

    session = await rag_service.process_query(
        query=request.query,
        user_id=user_id,
        selected_text=request.selected_text
    )

    return session


@router.post("/session", response_model=RagChatbotSession)
async def create_rag_session(session_data: RagChatbotSessionCreate):
    """
    Create a new RAG chatbot session
    """
    session = await rag_service.create_chat_session(session_data)
    return session