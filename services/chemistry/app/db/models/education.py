"""
Education Platform Models: Courses, Assignments, Submissions, and Administrative Audit Logs.
"""
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import String, Text, Float, DateTime, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from services.chemistry.app.db.base import Base


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code: Mapped[str] = mapped_column(String(32), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    instructor_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    term: Mapped[str] = mapped_column(String(64), default="Fall 2026", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    instructor: Mapped["User"] = relationship("User", foreign_keys=[instructor_id])
    enrollments: Mapped[List["CourseEnrollment"]] = relationship("CourseEnrollment", back_populates="course", cascade="all, delete-orphan")
    assignments: Mapped[List["Assignment"]] = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")


class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id: Mapped[str] = mapped_column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(32), default="active", nullable=False)  # active, completed, dropped
    progress_percent: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    grade_letter: Mapped[Optional[str]] = mapped_column(String(8), nullable=True)
    enrolled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    course: Mapped["Course"] = relationship("Course", back_populates="enrollments")
    student: Mapped["User"] = relationship("User", foreign_keys=[student_id])

    __table_args__ = (
        Index("ix_enrollments_student_course", "student_id", "course_id", unique=True),
    )


class Assignment(Base):
    __tablename__ = "assignments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id: Mapped[str] = mapped_column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    experiment_type: Mapped[str] = mapped_column(String(64), default="titration", nullable=False)  # titration, calorimetry, mixer, thermo
    max_points: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)
    rubric_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    due_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    course: Mapped["Course"] = relationship("Course", back_populates="assignments")
    submissions: Mapped[List["AssignmentSubmission"]] = relationship("AssignmentSubmission", back_populates="assignment", cascade="all, delete-orphan")


class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    assignment_id: Mapped[str] = mapped_column(String(36), ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    experiment_record_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("experiment_records.id", ondelete="SET NULL"), nullable=True)
    submission_data_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(32), default="submitted", nullable=False)  # submitted, graded, returned
    score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    teacher_feedback: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    graded_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    assignment: Mapped["Assignment"] = relationship("Assignment", back_populates="submissions")
    student: Mapped["User"] = relationship("User", foreign_keys=[student_id])
    experiment: Mapped[Optional["ExperimentRecord"]] = relationship("ExperimentRecord", foreign_keys=[experiment_record_id])

    __table_args__ = (
        Index("ix_submissions_assignment_student", "assignment_id", "student_id"),
    )


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    actor_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    action: Mapped[str] = mapped_column(String(64), nullable=False)  # role_change, user_status_change, assignment_graded, etc.
    target_type: Mapped[str] = mapped_column(String(64), nullable=False)  # user, course, assignment, grade
    target_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    details_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    actor: Mapped["User"] = relationship("User", foreign_keys=[actor_id])

    __table_args__ = (
        Index("ix_audit_logs_action_created", "action", "created_at"),
    )
