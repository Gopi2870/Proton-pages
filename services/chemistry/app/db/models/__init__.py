"""
Persistence Models Aggregator.
"""
from services.chemistry.app.db.base import Base
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.session import UserSession
from services.chemistry.app.db.models.bookmark import ChemicalBookmark
from services.chemistry.app.db.models.experiment import ExperimentRecord
from services.chemistry.app.db.models.education import (
    Course,
    CourseEnrollment,
    Assignment,
    AssignmentSubmission,
    AuditLog,
)

__all__ = [
    "Base",
    "User",
    "UserSession",
    "ChemicalBookmark",
    "ExperimentRecord",
    "Course",
    "CourseEnrollment",
    "Assignment",
    "AssignmentSubmission",
    "AuditLog",
]
