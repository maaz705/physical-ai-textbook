from datetime import datetime
from typing import Optional, Dict
from pydantic import BaseModel, Field, validator
import uuid


class HardwareProfile(BaseModel):
    """
    Information about user's available hardware to tailor exercises and examples
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(..., description="ID of the user this profile belongs to")
    workstation_gpu: Optional[str] = Field(None, description="GPU model (e.g., RTX 4070 Ti)")
    workstation_specs: Optional[Dict] = Field(default={}, description="Detailed workstation specs")
    edge_kit_type: Optional[str] = Field(None, description="Edge kit type (e.g., Jetson Orin Nano)")
    edge_kit_specs: Optional[Dict] = Field(default={}, description="Detailed edge kit specs")
    access_level: str = Field(default="none", description="Access level to hardware")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "some-user-uuid",
                "workstation_gpu": "RTX 4070 Ti",
                "workstation_specs": {"cpu": "Intel i7", "ram": "32GB"},
                "edge_kit_type": "Jetson Orin Nano",
                "edge_kit_specs": {"memory": "8GB", "ports": "USB-C, HDMI"},
                "access_level": "simulation"
            }
        }

    @validator('access_level')
    def validate_access_level(cls, v):
        if v not in ['none', 'simulation', 'physical_hardware']:
            raise ValueError('Access level must be one of: none, simulation, physical_hardware')
        return v


class HardwareProfileCreate(BaseModel):
    """
    Model for creating a new hardware profile
    """
    user_id: str
    workstation_gpu: Optional[str] = None
    workstation_specs: Optional[Dict] = {}
    edge_kit_type: Optional[str] = None
    edge_kit_specs: Optional[Dict] = {}
    access_level: str = "none"


class HardwareProfileUpdate(BaseModel):
    """
    Model for updating hardware profile information
    """
    workstation_gpu: Optional[str] = None
    workstation_specs: Optional[Dict] = None
    edge_kit_type: Optional[str] = None
    edge_kit_specs: Optional[Dict] = None
    access_level: Optional[str] = None


