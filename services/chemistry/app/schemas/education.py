"""
Pydantic Schemas for Education Dashboards, Courses, Assignments, and Administrative Controls.
"""
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


# ============================================================================
# Course & Enrollment Schemas
# ============================================================================
class CourseCreate(BaseModel):
    code: str = Field(..., max_length=32, description="Course identifier (e.g. CHEM-101)")
    title: str = Field(..., max_length=255, description="Course title")
    description: Optional[str] = Field(None, description="Curriculum description")
    term: str = Field("Fall 2026", max_length=64, description="Academic term")


class CourseResponse(BaseModel):
    id: str
    code: str
    title: str
    description: Optional[str] = None
    instructor_id: str
    instructor_name: Optional[str] = None
    term: str
    student_count: int = 0
    assignment_count: int = 0
    created_at: str

    model_config = {"from_attributes": True}


class EnrollmentResponse(BaseModel):
    id: str
    course_id: str
    course_code: str
    course_title: str
    student_id: str
    student_name: Optional[str] = None
    status: str
    progress_percent: float
    grade_letter: Optional[str] = None
    enrolled_at: str

    model_config = {"from_attributes": True}


# ============================================================================
# Assignment & Submission Schemas
# ============================================================================
class AssignmentCreate(BaseModel):
    course_id: str
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    experiment_type: str = Field("titration", description="titration, calorimetry, mixer, thermo")
    max_points: float = Field(100.0, ge=1.0)
    rubric_json: Optional[str] = Field(None, description="Serialized grading rubric JSON")
    due_date: Optional[str] = None


class AssignmentResponse(BaseModel):
    id: str
    course_id: str
    course_code: Optional[str] = None
    course_title: Optional[str] = None
    title: str
    description: Optional[str] = None
    experiment_type: str
    max_points: float
    rubric_json: Optional[str] = None
    due_date: Optional[str] = None
    submission_count: int = 0
    created_at: str

    model_config = {"from_attributes": True}


class SubmissionCreate(BaseModel):
    assignment_id: str
    experiment_record_id: Optional[str] = None
    submission_data_json: Optional[str] = Field(None, description="Student lab writeup and telemetry JSON")


class SubmissionGradeRequest(BaseModel):
    score: float = Field(..., ge=0.0)
    teacher_feedback: Optional[str] = None
    status: str = Field("graded", description="graded, revision_requested")


class SubmissionResponse(BaseModel):
    id: str
    assignment_id: str
    assignment_title: Optional[str] = None
    student_id: str
    student_name: Optional[str] = None
    experiment_record_id: Optional[str] = None
    submission_data_json: Optional[str] = None
    status: str
    score: Optional[float] = None
    max_points: float = 100.0
    teacher_feedback: Optional[str] = None
    submitted_at: str
    graded_at: Optional[str] = None

    model_config = {"from_attributes": True}


# ============================================================================
# Administrative & Governance Schemas
# ============================================================================
class UserAdminResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: str
    role: str
    institution: Optional[str] = None
    department: Optional[str] = None
    is_active: bool
    created_at: str

    model_config = {"from_attributes": True}


class UserRoleUpdateRequest(BaseModel):
    role: str = Field(..., description="student, teacher, researcher, admin")
    institution: Optional[str] = None
    department: Optional[str] = None


class UserStatusUpdateRequest(BaseModel):
    is_active: bool


class AuditLogResponse(BaseModel):
    id: str
    actor_id: str
    actor_name: Optional[str] = None
    action: str
    target_type: str
    target_id: str
    details_json: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: str

    model_config = {"from_attributes": True}


class CampusStatsResponse(BaseModel):
    total_users: int
    student_seats_allocated: int
    student_seats_total: int
    faculty_count: int
    active_courses: int
    total_experiments_run: int
    ferpa_compliant: bool = True
