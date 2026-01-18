from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
import uuid


class CourseModule(BaseModel):
    """
    Represents one of the 4 core topics (ROS 2, Digital Twins, AI-Robot Brain, VLA)
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., description="Title of the module")
    description: str = Field(..., description="Description of the module")
    module_number: int = Field(..., ge=1, le=4, description="Module number (1-4)")
    weeks_duration: int = Field(..., ge=1, description="Duration in weeks")
    prerequisites: Optional[List[str]] = Field(default=[], description="List of prerequisite module IDs")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "title": "ROS 2 Fundamentals",
                "description": "Introduction to Robot Operating System 2",
                "module_number": 1,
                "weeks_duration": 3,
                "prerequisites": []
            }
        }


class CourseModuleCreate(BaseModel):
    """
    Model for creating a new course module
    """
    title: str = Field(..., min_length=5, max_length=100)
    description: str
    module_number: int = Field(ge=1, le=4)
    weeks_duration: int = Field(ge=1)
    prerequisites: Optional[List[str]] = []


class CourseModuleUpdate(BaseModel):
    """
    Model for updating course module information
    """
    title: Optional[str] = Field(None, min_length=5, max_length=100)
    description: Optional[str] = None
    weeks_duration: Optional[int] = Field(None, ge=1)
    prerequisites: Optional[List[str]] = None