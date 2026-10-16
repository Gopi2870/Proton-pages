"""
Education Platform Endpoints for Student and Educator Workflows.
"""
import json
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from services.chemistry.app.db.session import get_db
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.education import (
    Course,
    CourseEnrollment,
    Assignment,
    AssignmentSubmission,
    AuditLog,
)
from services.chemistry.app.core.dependencies import get_current_user_or_guest, require_role
from services.chemistry.app.schemas.education import (
    CourseCreate,
    CourseResponse,
    EnrollmentResponse,
    AssignmentCreate,
    AssignmentResponse,
    SubmissionCreate,
    SubmissionGradeRequest,
    SubmissionResponse,
)

router = APIRouter(prefix="/education", tags=["Education Platform"])


def _ensure_default_curriculum(db: Session, student: User):
    """Seed sample courses and enrollments if database table is empty."""
    course_count = db.query(Course).count()
    if course_count == 0:
        c1 = Course(
            id="course-101",
            code="CHEM-101",
            title="General Chemistry & Thermochemistry Lab",
            description="Introduction to stoichiometry, aqueous equilibrium, and solution calorimetry.",
            instructor_id=student.id,
            term="Fall 2026",
        )
        c2 = Course(
            id="course-201",
            code="CHEM-201",
            title="Analytical Chemistry & Volumetric Titrations",
            description="Quantitative analysis, glass electrodes, potentiometric titrations, and error analysis.",
            instructor_id=student.id,
            term="Fall 2026",
        )
        c3 = Course(
            id="course-301",
            code="CHEM-301",
            title="Organic Reaction Mechanisms & Stereochemistry",
            description="3D molecular conformations, nucleophilic substitutions, and reaction energy diagrams.",
            instructor_id=student.id,
            term="Fall 2026",
        )
        db.add_all([c1, c2, c3])
        db.commit()

        # Seed assignments
        a1 = Assignment(
            id="asgn-101",
            course_id=c1.id,
            title="Lab #1: Coffee-Cup Dissolution Enthalpy (NH4NO3 vs CaCl2)",
            description="Measure temperature shifts, determine molar ΔH, and compare against NIST theoretical values.",
            experiment_type="calorimetry",
            max_points=100.0,
            rubric_json=json.dumps({"accuracy_weight": 0.5, "uncertainty_analysis": 0.3, "notes_completeness": 0.2}),
        )
        a2 = Assignment(
            id="asgn-201",
            course_id=c2.id,
            title="Lab #2: Strong-Weak Acid Titration Curve & pKa Determination",
            description="Titrate 0.1 M acetic acid with 0.1 M NaOH using phenolphthalein. Identify equivalence volume and half-equivalence pKa.",
            experiment_type="titration",
            max_points=100.0,
            rubric_json=json.dumps({"equivalence_precision": 0.4, "derivative_analysis": 0.4, "observations": 0.2}),
        )
        db.add_all([a1, a2])
        db.commit()

    # Ensure enrollment for current student
    user_enrollments = db.query(CourseEnrollment).filter(CourseEnrollment.student_id == student.id).count()
    if user_enrollments == 0:
        courses = db.query(Course).all()
        for idx, crs in enumerate(courses):
            enr = CourseEnrollment(
                id=str(uuid.uuid4()),
                course_id=crs.id,
                student_id=student.id,
                status="active",
                progress_percent=72.0 if idx == 0 else 45.0 if idx == 1 else 20.0,
                grade_letter="A" if idx == 0 else "B+",
            )
            db.add(enr)
        db.commit()


# ============================================================================
# Student Endpoints
# ============================================================================
@router.get("/student/courses", response_model=List[EnrollmentResponse])
def get_student_courses(
    current_user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Retrieve all courses enrolled by the active student with academic progress."""
    _ensure_default_curriculum(db, current_user)
    enrollments = (
        db.query(CourseEnrollment)
        .filter(CourseEnrollment.student_id == current_user.id)
        .all()
    )
    result = []
    for e in enrollments:
        result.append(
            EnrollmentResponse(
                id=e.id,
                course_id=e.course_id,
                course_code=e.course.code,
                course_title=e.course.title,
                student_id=e.student_id,
                student_name=current_user.full_name,
                status=e.status,
                progress_percent=e.progress_percent,
                grade_letter=e.grade_letter,
                enrolled_at=e.enrolled_at.isoformat(),
            )
        )
    return result


@router.get("/student/assignments", response_model=List[AssignmentResponse])
def get_student_assignments(
    current_user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Retrieve assignments for all courses currently enrolled by the student."""
    _ensure_default_curriculum(db, current_user)
    student_course_ids = [
        e.course_id for e in db.query(CourseEnrollment).filter(CourseEnrollment.student_id == current_user.id).all()
    ]
    assignments = (
        db.query(Assignment)
        .filter(Assignment.course_id.in_(student_course_ids))
        .all()
    )
    return [
        AssignmentResponse(
            id=a.id,
            course_id=a.course_id,
            course_code=a.course.code,
            course_title=a.course.title,
            title=a.title,
            description=a.description,
            experiment_type=a.experiment_type,
            max_points=a.max_points,
            rubric_json=a.rubric_json,
            due_date=a.due_date.isoformat() if a.due_date else None,
            submission_count=len(a.submissions),
            created_at=a.created_at.isoformat(),
        )
        for a in assignments
    ]


@router.post("/student/assignments/{assignment_id}/submit", response_model=SubmissionResponse)
def submit_assignment(
    assignment_id: str,
    payload: SubmissionCreate,
    current_user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Submit virtual laboratory experiment results for instructor grading."""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignment not found.")

    submission = AssignmentSubmission(
        id=str(uuid.uuid4()),
        assignment_id=assignment.id,
        student_id=current_user.id,
        experiment_record_id=payload.experiment_record_id,
        submission_data_json=payload.submission_data_json,
        status="submitted",
        submitted_at=datetime.now(timezone.utc),
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    return SubmissionResponse(
        id=submission.id,
        assignment_id=submission.assignment_id,
        assignment_title=assignment.title,
        student_id=submission.student_id,
        student_name=current_user.full_name,
        experiment_record_id=submission.experiment_record_id,
        submission_data_json=submission.submission_data_json,
        status=submission.status,
        score=submission.score,
        max_points=assignment.max_points,
        teacher_feedback=submission.teacher_feedback,
        submitted_at=submission.submitted_at.isoformat(),
        graded_at=submission.graded_at.isoformat() if submission.graded_at else None,
    )


# ============================================================================
# Educator / Teacher Endpoints
# ============================================================================
@router.get("/teacher/courses", response_model=List[CourseResponse])
def get_teacher_courses(
    current_user: User = Depends(require_role("teacher", "instructor")),
    db: Session = Depends(get_db)
):
    """List courses managed by the educator."""
    courses = db.query(Course).all()
    return [
        CourseResponse(
            id=c.id,
            code=c.code,
            title=c.title,
            description=c.description,
            instructor_id=c.instructor_id,
            instructor_name=c.instructor.full_name if c.instructor else current_user.full_name,
            term=c.term,
            student_count=len(c.enrollments),
            assignment_count=len(c.assignments),
            created_at=c.created_at.isoformat(),
        )
        for c in courses
    ]


@router.post("/teacher/courses", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    payload: CourseCreate,
    current_user: User = Depends(require_role("teacher", "instructor")),
    db: Session = Depends(get_db)
):
    """Create a new course cohort."""
    existing = db.query(Course).filter(Course.code == payload.code.upper().strip()).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Course code '{payload.code}' already exists.")

    course = Course(
        id=str(uuid.uuid4()),
        code=payload.code.upper().strip(),
        title=payload.title,
        description=payload.description,
        instructor_id=current_user.id,
        term=payload.term,
    )
    db.add(course)
    db.commit()
    db.refresh(course)

    return CourseResponse(
        id=course.id,
        code=course.code,
        title=course.title,
        description=course.description,
        instructor_id=course.instructor_id,
        instructor_name=current_user.full_name,
        term=course.term,
        student_count=0,
        assignment_count=0,
        created_at=course.created_at.isoformat(),
    )


@router.post("/teacher/assignments", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
def create_assignment(
    payload: AssignmentCreate,
    current_user: User = Depends(require_role("teacher", "instructor")),
    db: Session = Depends(get_db)
):
    """Author a new virtual laboratory assignment with grading rubric."""
    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target course not found.")

    assignment = Assignment(
        id=str(uuid.uuid4()),
        course_id=course.id,
        title=payload.title,
        description=payload.description,
        experiment_type=payload.experiment_type,
        max_points=payload.max_points,
        rubric_json=payload.rubric_json,
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return AssignmentResponse(
        id=assignment.id,
        course_id=assignment.course_id,
        course_code=course.code,
        course_title=course.title,
        title=assignment.title,
        description=assignment.description,
        experiment_type=assignment.experiment_type,
        max_points=assignment.max_points,
        rubric_json=assignment.rubric_json,
        submission_count=0,
        created_at=assignment.created_at.isoformat(),
    )


@router.get("/teacher/assignments/{assignment_id}/submissions", response_model=List[SubmissionResponse])
def get_assignment_submissions(
    assignment_id: str,
    current_user: User = Depends(require_role("teacher", "instructor")),
    db: Session = Depends(get_db)
):
    """Retrieve all student submissions for a given assignment."""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignment not found.")

    submissions = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == assignment_id).all()
    return [
        SubmissionResponse(
            id=s.id,
            assignment_id=s.assignment_id,
            assignment_title=assignment.title,
            student_id=s.student_id,
            student_name=s.student.full_name if s.student else "Student",
            experiment_record_id=s.experiment_record_id,
            submission_data_json=s.submission_data_json,
            status=s.status,
            score=s.score,
            max_points=assignment.max_points,
            teacher_feedback=s.teacher_feedback,
            submitted_at=s.submitted_at.isoformat(),
            graded_at=s.graded_at.isoformat() if s.graded_at else None,
        )
        for s in submissions
    ]


@router.post("/teacher/submissions/{submission_id}/grade", response_model=SubmissionResponse)
def grade_submission(
    submission_id: str,
    payload: SubmissionGradeRequest,
    current_user: User = Depends(require_role("teacher", "instructor")),
    db: Session = Depends(get_db)
):
    """Grade a student submission with score, feedback, and audit log."""
    submission = db.query(AssignmentSubmission).filter(AssignmentSubmission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found.")

    submission.score = payload.score
    submission.teacher_feedback = payload.teacher_feedback
    submission.status = payload.status
    submission.graded_at = datetime.now(timezone.utc)

    # Write audit log
    audit = AuditLog(
        actor_id=current_user.id,
        action="submission_graded",
        target_type="submission",
        target_id=submission.id,
        details_json=json.dumps({"score": payload.score, "student_id": submission.student_id}),
    )
    db.add(audit)
    db.commit()
    db.refresh(submission)

    return SubmissionResponse(
        id=submission.id,
        assignment_id=submission.assignment_id,
        assignment_title=submission.assignment.title,
        student_id=submission.student_id,
        student_name=submission.student.full_name if submission.student else "Student",
        experiment_record_id=submission.experiment_record_id,
        submission_data_json=submission.submission_data_json,
        status=submission.status,
        score=submission.score,
        max_points=submission.assignment.max_points,
        teacher_feedback=submission.teacher_feedback,
        submitted_at=submission.submitted_at.isoformat(),
        graded_at=submission.graded_at.isoformat() if submission.graded_at else None,
    )
