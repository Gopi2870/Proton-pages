"""
Chemical Bookmarks and Saved Entities Endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from services.chemistry.app.db.session import get_db
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.bookmark import ChemicalBookmark
from services.chemistry.app.schemas.bookmark import BookmarkCreate, BookmarkUpdate, BookmarkResponse
from services.chemistry.app.core.dependencies import get_current_user_or_guest

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks & Saved Workspace"])

@router.get("", response_model=List[BookmarkResponse])
def list_bookmarks(
    item_type: Optional[str] = Query(None, description="Filter by item_type (element, compound, reaction, formula)"),
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Retrieve saved bookmarks for the current user."""
    query = db.query(ChemicalBookmark).filter(ChemicalBookmark.user_id == user.id)
    if item_type:
        query = query.filter(ChemicalBookmark.item_type == item_type.lower())
    bookmarks = query.order_by(ChemicalBookmark.created_at.desc()).all()
    return [BookmarkResponse.model_validate(b) for b in bookmarks]

@router.post("", response_model=BookmarkResponse, status_code=status.HTTP_201_CREATED)
def create_or_update_bookmark(
    payload: BookmarkCreate,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Bookmark an element, compound, reaction, or equation."""
    existing = db.query(ChemicalBookmark).filter(
        ChemicalBookmark.user_id == user.id,
        ChemicalBookmark.item_type == payload.item_type.lower(),
        ChemicalBookmark.item_identifier == payload.item_identifier
    ).first()

    if existing:
        # Update existing notes/metadata idempotently
        if payload.notes is not None:
            existing.notes = payload.notes
        if payload.metadata_json is not None:
            existing.metadata_json = payload.metadata_json
        db.commit()
        db.refresh(existing)
        return BookmarkResponse.model_validate(existing)

    bookmark = ChemicalBookmark(
        user_id=user.id,
        item_type=payload.item_type.lower(),
        item_identifier=payload.item_identifier,
        notes=payload.notes,
        metadata_json=payload.metadata_json,
    )
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return BookmarkResponse.model_validate(bookmark)

@router.get("/{bookmark_id}", response_model=BookmarkResponse)
def get_bookmark(
    bookmark_id: str,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Get single bookmark details."""
    bookmark = db.query(ChemicalBookmark).filter(
        ChemicalBookmark.id == bookmark_id,
        ChemicalBookmark.user_id == user.id
    ).first()

    if not bookmark:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Bookmark '{bookmark_id}' not found."
        )
    return BookmarkResponse.model_validate(bookmark)

@router.delete("/{bookmark_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bookmark(
    bookmark_id: str,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Delete a saved bookmark by ID."""
    deleted_count = db.query(ChemicalBookmark).filter(
        ChemicalBookmark.id == bookmark_id,
        ChemicalBookmark.user_id == user.id
    ).delete()

    if not deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Bookmark '{bookmark_id}' not found."
        )
    db.commit()
    return None

@router.delete("/by-item/{item_type}/{item_identifier}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bookmark_by_item(
    item_type: str,
    item_identifier: str,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Delete a bookmark directly using item_type and item_identifier."""
    deleted_count = db.query(ChemicalBookmark).filter(
        ChemicalBookmark.user_id == user.id,
        ChemicalBookmark.item_type == item_type.lower(),
        ChemicalBookmark.item_identifier == item_identifier
    ).delete()

    if not deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No bookmark found for {item_type}='{item_identifier}'."
        )
    db.commit()
    return None
