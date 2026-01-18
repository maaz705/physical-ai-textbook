from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from datetime import timedelta
from ..models.user import User, UserCreate, UserUpdate
from ..services.auth_service import AuthService
import os


router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()
auth_service = AuthService()


@router.post("/register", response_model=User)
async def register_user(user_data: UserCreate):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = await auth_service.get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    user = await auth_service.create_user(user_data)
    return user


@router.post("/login")
async def login(email: str, password: str):
    """
    Authenticate user and return access token
    """
    user = await auth_service.authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=auth_service.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": user}


@router.get("/profile", response_model=User)
async def get_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get current user's profile
    """
    token = credentials.credentials
    email = await auth_service.decode_token(token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await auth_service.get_user_by_email(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


@router.put("/profile", response_model=User)
async def update_profile(user_update: UserUpdate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Update user profile information
    """
    token = credentials.credentials
    email = await auth_service.decode_token(token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update the user in the database
    updated_user = await auth_service.update_user(email, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return updated_user