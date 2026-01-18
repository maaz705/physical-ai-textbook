from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator
import uuid


class User(BaseModel):
    """
    Represents a student or educator using the platform
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str = Field(..., description="User's email address")
    name: str = Field(..., description="User's full name")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    hardware_background: Optional[str] = Field(None, description="User's hardware background level")
    software_background: Optional[str] = Field(None, description="User's software background level")
    preferred_language: str = Field(default="en", description="Preferred language for content")
    last_accessed_module: Optional[int] = Field(None, description="Last accessed module number")
    progress_tracking: Optional[dict] = Field(default=None, description="Progress tracking data")

    @validator('email')
    def validate_email(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v

    @validator('name')
    def validate_name(cls, v):
        if len(v) < 2 or len(v) > 50:
            raise ValueError('Name must be between 2 and 50 characters')
        return v

    @validator('hardware_background')
    def validate_hardware_background(cls, v):
        if v and v not in ['beginner', 'intermediate', 'advanced']:
            raise ValueError('Hardware background must be one of: beginner, intermediate, advanced')
        return v

    @validator('software_background')
    def validate_software_background(cls, v):
        if v and v not in ['none', 'basic', 'intermediate', 'advanced']:
            raise ValueError('Software background must be one of: none, basic, intermediate, advanced')
        return v

    @validator('preferred_language')
    def validate_preferred_language(cls, v):
        if v not in ['en', 'ur']:
            raise ValueError('Preferred language must be one of: en, ur')
        return v


class UserCreate(BaseModel):
    """
    Model for creating a new user
    """
    email: str
    name: str
    password: str
    hardware_background: Optional[str] = None
    software_background: Optional[str] = None


class UserUpdate(BaseModel):
    """
    Model for updating user information
    """
    name: Optional[str] = None
    hardware_background: Optional[str] = None
    software_background: Optional[str] = None
    preferred_language: Optional[str] = None
    progress_tracking: Optional[dict] = None