from fastapi import APIRouter, Depends, HTTPException, status
from ..models.hardware_profile import HardwareProfile, HardwareProfileCreate, HardwareProfileUpdate
from ..services.hardware_service import HardwareProfileService
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


router = APIRouter(prefix="/hardware", tags=["Hardware Profile"])
security = HTTPBearer()
hardware_service = HardwareProfileService()


@router.post("/", response_model=HardwareProfile)
async def create_hardware_profile(profile_data: HardwareProfileCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Create a new hardware profile for the authenticated user
    """
    # In a real implementation, we would extract the user ID from the token
    # For now, we'll use the user_id from the request data
    profile = await hardware_service.create_hardware_profile(profile_data)
    return profile


@router.get("/", response_model=HardwareProfile)
async def get_hardware_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get the hardware profile for the authenticated user
    """
    # In a real implementation, we would decode the JWT to get user info
    # For now, we'll use a placeholder - in a real app, you'd decode the token
    # and extract the user ID from the claims
    user_id = "placeholder_user_id"  # This would come from the decoded token

    profile = await hardware_service.get_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hardware profile not found"
        )

    return profile


@router.put("/", response_model=HardwareProfile)
async def update_hardware_profile(update_data: HardwareProfileUpdate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Update the hardware profile for the authenticated user
    """
    # In a real implementation, we would decode the JWT to get user info
    # For now, we'll use a placeholder - in a real app, you'd decode the token
    # and extract the user ID from the claims
    user_id = "placeholder_user_id"  # This would come from the decoded token

    profile = await hardware_service.update_hardware_profile(user_id, update_data)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hardware profile not found"
        )

    return profile


@router.delete("/")
async def delete_hardware_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Delete the hardware profile for the authenticated user
    """
    # In a real implementation, we would decode the JWT to get user info
    # For now, we'll use a placeholder - in a real app, you'd decode the token
    # and extract the user ID from the claims
    user_id = "placeholder_user_id"  # This would come from the decoded token

    success = await hardware_service.delete_hardware_profile(user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hardware profile not found"
        )

    return {"message": "Hardware profile deleted successfully"}