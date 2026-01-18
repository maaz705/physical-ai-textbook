from typing import Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from ..models.user import User, UserCreate


class AuthService:
    """
    Service for handling authentication operations
    """

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    def __init__(self):
        pass

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        Verify a plain password against its hash
        """
        return self.pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        """
        Hash a password
        """
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        """
        Create a JWT access token
        """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate a user by email and password
        """
        # In a real implementation, this would fetch from a database
        # For now, we'll return a dummy user
        # In practice, you'd query the database to find the user by email
        # Then verify the password
        pass
        return None

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieve a user by their email address
        """
        # In a real implementation, this would query the database
        pass
        return None

    async def create_user(self, user_data: UserCreate) -> User:
        """
        Create a new user with hashed password
        """
        # Hash the password
        hashed_password = self.get_password_hash(user_data.password)

        # Create user instance
        user = User(
            email=user_data.email,
            name=user_data.name,
            hardware_background=user_data.hardware_background,
            software_background=user_data.software_background
        )

        # In a real implementation, this would save to the database
        # For now, we'll just return the user object
        return user

    async def update_user(self, email: str, user_update) -> Optional[User]:
        """
        Update user information
        """
        # In a real implementation, this would update the user in the database
        # For now, we'll return a dummy updated user
        # In practice, you'd fetch the user from the database, update fields,
        # and save back to the database
        user = await self.get_user_by_email(email)
        if not user:
            return None

        # Update user fields based on the update data
        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            if hasattr(user, field):
                setattr(user, field, value)

        # Update the updated_at timestamp
        user.updated_at = datetime.utcnow()

        # In a real implementation, this would save the updated user to the database
        return user

    async def decode_token(self, token: str) -> Optional[str]:
        """
        Decode a JWT token to get the user email
        """
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                return None
            return email
        except JWTError:
            return None