"""
User and Authentication Schemas.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="User's valid email address")
    username: str = Field(..., min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_\-]+$")
    full_name: str = Field(..., min_length=1, max_length=100)
    role: str = Field(default="student", description="Role: student, teacher, researcher, admin")
    institution: Optional[str] = Field(default=None, max_length=128)
    department: Optional[str] = Field(default=None, max_length=128)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128, description="Plaintext password, min 8 chars")

class UserLogin(BaseModel):
    email_or_username: str = Field(..., description="Email address or username")
    password: str = Field(..., min_length=1)

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    username: str
    full_name: str
    role: str
    institution: Optional[str] = None
    department: Optional[str] = None
    is_active: bool
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_seconds: int
    user: UserResponse
