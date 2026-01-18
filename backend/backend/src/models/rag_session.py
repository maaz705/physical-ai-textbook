from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
import uuid


class RagChatbotSession(BaseModel):
    """
    Represents an interaction session where users can ask questions about the content
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(..., description="ID of the user initiating the session")
    query: str = Field(..., description="User's query/question")
    response: str = Field(..., description="AI-generated response")
    context_used: Optional[str] = Field(None, description="Portion of content that informed the response")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_helpful: Optional[bool] = Field(None, description="Feedback on whether the response was helpful")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "some-user-uuid",
                "query": "What is a ROS node?",
                "response": "A ROS node is a process that performs computation...",
                "context_used": "In ROS, nodes are the fundamental unit...",
                "is_helpful": True
            }
        }


class RagChatbotSessionCreate(BaseModel):
    """
    Model for creating a new RAG chatbot session
    """
    user_id: str
    query: str
    context_used: Optional[str] = None


class RagChatbotSessionUpdate(BaseModel):
    """
    Model for updating RAG chatbot session information
    """
    response: Optional[str] = None
    is_helpful: Optional[bool] = None