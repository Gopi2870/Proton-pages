"""
Chemical Bookmark and Saved Entity Model.
"""
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Text, DateTime, ForeignKey, UniqueConstraint, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from services.chemistry.app.db.base import Base

class ChemicalBookmark(Base):
    __tablename__ = "chemical_bookmarks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    item_type: Mapped[str] = mapped_column(String(32), nullable=False) # element, compound, reaction, formula, molecule
    item_identifier: Mapped[str] = mapped_column(String(128), nullable=False, index=True) # e.g. "Fe", "H2O", "CH4+O2"
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    metadata_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="bookmarks")

    __table_args__ = (
        UniqueConstraint("user_id", "item_type", "item_identifier", name="uq_user_bookmark_item"),
        Index("ix_user_bookmarks_by_type", "user_id", "item_type"),
    )

    def __repr__(self) -> str:
        return f"<ChemicalBookmark id={self.id} type={self.item_type} identifier={self.item_identifier}>"
