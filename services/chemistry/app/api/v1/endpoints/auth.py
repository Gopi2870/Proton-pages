"""
User Authentication and Profile Endpoints.
"""
import uuid
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request, status, Header
from sqlalchemy.orm import Session
from sqlalchemy import or_

from services.chemistry.app.db.session import get_db
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.session import UserSession
from services.chemistry.app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from services.chemistry.app.core.security import hash_password, verify_password, hash_token
from services.chemistry.app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication & User Management"])

SESSION_DURATION_DAYS = 30

def _create_user_session(user_id: str, request: Request, db: Session) -> str:
    """Generate secure session token and persist hashed record."""
    raw_token = secrets.token_urlsafe(32)
    token_hashed = hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) + timedelta(days=SESSION_DURATION_DAYS)

    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")[:255] if request.headers.get("user-agent") else None

    session_record = UserSession(
        user_id=user_id,
        token_hash=token_hashed,
        ip_address=ip_address,
        user_agent=user_agent,
        expires_at=expires_at,
    )
    db.add(session_record)
    db.commit()
    return raw_token

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, request: Request, db: Session = Depends(get_db)):
    """Register a new student, teacher, or researcher account."""
    existing = db.query(User).filter(
        or_(User.email == payload.email.lower(), User.username == payload.username.lower())
    ).first()

    if existing:
        if existing.email.lower() == payload.email.lower():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email address already exists."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This username is already taken. Please choose another."
            )

    new_user = User(
        email=payload.email.lower(),
        username=payload.username.lower(),
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        institution=payload.institution,
        department=payload.department,
        is_active=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = _create_user_session(new_user.id, request, db)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in_seconds=SESSION_DURATION_DAYS * 86400,
        user=UserResponse.model_validate(new_user)
    )

@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, request: Request, db: Session = Depends(get_db)):
    """Authenticate with username/email and password."""
    identifier = payload.email_or_username.strip().lower()
    user = db.query(User).filter(
        or_(User.email == identifier, User.username == identifier)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/username or password."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account has been deactivated."
        )

    token = _create_user_session(user.id, request, db)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in_seconds=SESSION_DURATION_DAYS * 86400,
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(user: User = Depends(get_current_user)):
    """Retrieve profile of currently authenticated user."""
    return UserResponse.model_validate(user)

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Invalidate current user session."""
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ", 1)[1].strip()
        token_hashed = hash_token(token)
        db.query(UserSession).filter(UserSession.token_hash == token_hashed).delete()
        db.commit()
    return None
