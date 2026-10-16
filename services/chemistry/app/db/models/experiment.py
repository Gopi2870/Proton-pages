"""
Virtual Lab Experiment Record Model.
"""
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Text, DateTime, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from services.chemistry.app.db.base import Base

class ExperimentRecord(Base):
    __tablename__ = "experiment_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    experiment_type: Mapped[str] = mapped_column(String(64), nullable=False) # titration, calorimetry, mixer, synthesis, spectroscopy
    status: Mapped[str] = mapped_column(String(32), default="draft", nullable=False) # draft, in_progress, completed
    state_data: Mapped[Optional[str]] = mapped_column(Text, nullable=True) # Serialized JSON apparatus state & simulation curve
    observations: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="experiments")

    __table_args__ = (
        Index("ix_experiments_user_type", "user_id", "experiment_type"),
        Index("ix_experiments_created_at", "created_at"),
    )

    def __repr__(self) -> str:
        return f"<ExperimentRecord id={self.id} title='{self.title}' type={self.experiment_type}>"
