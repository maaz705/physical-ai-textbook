from datetime import datetime
from typing import List, Optional
from ..models.hardware_profile import HardwareProfile, HardwareProfileCreate, HardwareProfileUpdate


class HardwareProfileService:
    """
    Service for handling hardware profile operations
    """

    def __init__(self):
        # In a real implementation, this would connect to a database
        self.profiles: List[HardwareProfile] = []

    async def create_hardware_profile(self, profile_data: HardwareProfileCreate) -> HardwareProfile:
        """
        Create a new hardware profile
        """
        profile = HardwareProfile(
            **profile_data.dict()
        )
        self.profiles.append(profile)
        return profile

    async def get_profile_by_user_id(self, user_id: str) -> Optional[HardwareProfile]:
        """
        Retrieve a hardware profile by user ID
        """
        for profile in self.profiles:
            if profile.user_id == user_id:
                return profile
        return None

    async def update_hardware_profile(self, user_id: str, update_data: HardwareProfileUpdate) -> Optional[HardwareProfile]:
        """
        Update a hardware profile for a user
        """
        profile = await self.get_profile_by_user_id(user_id)
        if profile:
            update_dict = update_data.dict(exclude_unset=True)
            for field, value in update_dict.items():
                setattr(profile, field, value)
            profile.updated_at = datetime.utcnow()
            return profile
        return None

    async def delete_hardware_profile(self, user_id: str) -> bool:
        """
        Delete a hardware profile by user ID
        """
        profile = await self.get_profile_by_user_id(user_id)
        if profile:
            self.profiles.remove(profile)
            return True
        return False