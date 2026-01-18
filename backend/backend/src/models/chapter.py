from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator
import uuid


class Chapter(BaseModel):
    """
    Represents individual sections within modules that can be personalized and translated
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., description="Title of the chapter")
    content: str = Field(..., description="Content of the chapter in English")
    content_ur: Optional[str] = Field(None, description="Content of the chapter in Urdu")
    module_id: str = Field(..., description="ID of the parent module")
    chapter_number: int = Field(..., ge=1, description="Chapter number within the module")
    estimated_reading_time: int = Field(..., ge=1, description="Estimated reading time in minutes")
    difficulty_level: str = Field(..., description="Difficulty level of the chapter")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Introduction to ROS Nodes",
                "content": "This chapter introduces the concept of nodes in ROS...",
                "content_ur": "یہ باب ROS میں نوڈس کے تصور سے متعارف کراتا ہے...",
                "module_id": "some-uuid-here",
                "chapter_number": 1,
                "estimated_reading_time": 15,
                "difficulty_level": "beginner"
            }
        }

    @validator('difficulty_level')
    def validate_difficulty_level(cls, v):
        if v not in ['beginner', 'intermediate', 'advanced']:
            raise ValueError('Difficulty level must be one of: beginner, intermediate, advanced')
        return v


class ChapterCreate(BaseModel):
    """
    Model for creating a new chapter
    """
    title: str = Field(..., min_length=5, max_length=100)
    content: str
    content_ur: Optional[str] = None
    module_id: str
    chapter_number: int = Field(ge=1)
    estimated_reading_time: int = Field(ge=1)
    difficulty_level: str


class ChapterUpdate(BaseModel):
    """
    Model for updating chapter information
    """
    title: Optional[str] = Field(None, min_length=5, max_length=100)
    content: Optional[str] = None
    content_ur: Optional[str] = None
    chapter_number: Optional[int] = Field(None, ge=1)
    estimated_reading_time: Optional[int] = Field(None, ge=1)
    difficulty_level: Optional[str] = None


