"""
Authentication and Context Dependencies for FastAPI endpoints.
"""
from datetime import datetime, timezone
from typing import Optional
from fastapi import Depends, HTTPException, Header, status
from sqlalchemy.orm import Session

from services.chemistry.app.db.session import get_db
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.session import UserSession
from services.chemistry.app.core.security import hash_token, hash_password

DEFAULT_GUEST_ID = "00000000-0000-0000-0000-000000000001"

def get_or_create_default_guest(db: Session) -> User:
    """Ensure a default local user exists for local exploration without credentials."""
    user = db.query(User).filter(User.id == DEFAULT_GUEST_ID).first()
    if not user:
        user = User(
            id=DEFAULT_GUEST_ID,
            email="guest@protonpages.org",
            username="guest_researcher",
            full_name="Proton Pages Guest Researcher",
            hashed_password=hash_password("guest_secret_123!"),
            role="student",
            institution="Proton Open Chemistry Lab",
            department="General Chemistry",
            is_active=True,
        )
        db.add(user)
        try:
            db.commit()
            db.refresh(user)
        except Exception:
            db.rollback()
            user = db.query(User).filter(User.id == DEFAULT_GUEST_ID).first()
    return user

def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """
    Authenticate request via Bearer token in Authorization header.
    Throws HTTP 401 if token is missing, invalid, or expired.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header. Expected 'Bearer <token>'.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split("Bearer ", 1)[1].strip()
    token_hashed = hash_token(token)

    now = datetime.now(timezone.utc)
    session_record = (
        db.query(UserSession)
        .filter(UserSession.token_hash == token_hashed)
        .first()
    )

    if not session_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired or is invalid.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires_at = session_record.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if expires_at < now:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired or is invalid.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == session_record.user_id, User.is_active == True).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account associated with this session is inactive or removed.",
        )

    return user

def get_current_user_or_guest(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """
    Authenticate via Bearer token if present; fallback to default guest user
    if unauthenticated so local UI explorations work smoothly out of the box.
    """
    if authorization and authorization.startswith("Bearer "):
        try:
            return get_current_user(authorization=authorization, db=db)
        except HTTPException:
            pass
    return get_or_create_default_guest(db)


def require_role(*allowed_roles: str):
    """
    Enforce role-based access control (RBAC).
    Admins always bypass role restrictions.
    """
    def role_dependency(user: User = Depends(get_current_user_or_guest)) -> User:
        if user.role not in allowed_roles and "admin" not in user.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: User role '{user.role}' lacks required authorization ({', '.join(allowed_roles)})."
            )
        return user
    return role_dependency

