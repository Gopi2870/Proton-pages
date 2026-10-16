"""
Integration tests for Education Platform and Administration Endpoints.
"""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from starlette.testclient import TestClient

from services.chemistry.app.db.base import Base
from services.chemistry.app.db.session import get_db
from services.chemistry.app.server import create_app

# Use in-memory SQLite for isolated integration testing
test_engine = create_engine(
    "sqlite:///:memory:",
    echo=False,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture
def app_instance():
    return create_app()


@pytest.fixture(autouse=True)
def setup_test_db(app_instance):
    Base.metadata.create_all(bind=test_engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app_instance.dependency_overrides[get_db] = override_get_db
    yield
    Base.metadata.drop_all(bind=test_engine)
    app_instance.dependency_overrides.clear()


@pytest.fixture
def client(app_instance):
    return TestClient(app_instance)


def get_auth_token(client: TestClient, role: str, username: str) -> str:
    """Helper to register and return a bearer token for a specific role."""
    payload = {
        "email": f"{username}@university.edu",
        "username": username,
        "full_name": f"{username.capitalize()} User",
        "password": "SecurePassword123!",
        "role": role,
        "institution": "University of Chemistry",
        "department": "Chemistry Dept",
    }
    res = client.post("/api/v1/auth/register", json=payload)
    return res.json()["access_token"]


def test_student_courses_and_assignments(client):
    """Verify student enrolled courses and assignments retrieval."""
    res_courses = client.get("/api/v1/education/student/courses")
    assert res_courses.status_code == 200
    courses = res_courses.json()
    assert len(courses) >= 1
    assert "course_code" in courses[0]
    assert "progress_percent" in courses[0]

    res_asgn = client.get("/api/v1/education/student/assignments")
    assert res_asgn.status_code == 200
    assignments = res_asgn.json()
    assert len(assignments) >= 1
    assert "experiment_type" in assignments[0]


def test_student_submit_and_teacher_grade(client):
    """Verify student submission, RBAC protection, and educator grading lifecycle."""
    teacher_token = get_auth_token(client, "teacher", "prof_feynman")
    teacher_headers = {"Authorization": f"Bearer {teacher_token}"}

    res_asgn = client.get("/api/v1/education/student/assignments")
    asgn_id = res_asgn.json()[0]["id"]

    # Student submits assignment
    submit_payload = {
        "assignment_id": asgn_id,
        "submission_data_json": '{"measured_ph": 7.02, "delta_t": 5.4, "notes": "Completed run."}',
    }
    res_submit = client.post(f"/api/v1/education/student/assignments/{asgn_id}/submit", json=submit_payload)
    assert res_submit.status_code == 200
    sub_data = res_submit.json()
    assert sub_data["status"] == "submitted"
    submission_id = sub_data["id"]

    # Unauthenticated / student user cannot access teacher review endpoint (403 Forbidden)
    res_unauthorized = client.get(f"/api/v1/education/teacher/assignments/{asgn_id}/submissions")
    assert res_unauthorized.status_code == 403

    # Authorized educator views submissions
    res_list = client.get(f"/api/v1/education/teacher/assignments/{asgn_id}/submissions", headers=teacher_headers)
    assert res_list.status_code == 200
    subs = res_list.json()
    assert any(s["id"] == submission_id for s in subs)

    # Teacher grades submission
    grade_payload = {
        "score": 96.5,
        "teacher_feedback": "Excellent stoichiometric accuracy and error analysis.",
        "status": "graded",
    }
    res_grade = client.post(
        f"/api/v1/education/teacher/submissions/{submission_id}/grade",
        json=grade_payload,
        headers=teacher_headers,
    )
    assert res_grade.status_code == 200
    graded_data = res_grade.json()
    assert graded_data["score"] == 96.5
    assert graded_data["status"] == "graded"


def test_admin_governance_and_audit_logs(client):
    """Verify administrator RBAC checks, user administration, role updates, and audit logging."""
    admin_token = get_auth_token(client, "admin", "dean_mendeleev")
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    # Register target student user
    get_auth_token(client, "student", "student_alchemist")

    # Non-admin user gets 403 Forbidden on administrative endpoints
    res_unauth = client.get("/api/v1/admin/users")
    assert res_unauth.status_code == 403

    # Admin lists users
    res_users = client.get("/api/v1/admin/users", headers=admin_headers)
    assert res_users.status_code == 200
    users = res_users.json()
    assert len(users) >= 2
    target_user = next(u for u in users if u["username"] == "student_alchemist")

    # Admin updates user role
    role_payload = {
        "role": "researcher",
        "institution": "Caltech Chemistry Dept",
        "department": "Inorganic Catalysis",
    }
    res_role = client.put(f"/api/v1/admin/users/{target_user['id']}/role", json=role_payload, headers=admin_headers)
    assert res_role.status_code == 200
    assert res_role.json()["role"] == "researcher"

    # Audit log entry verified
    res_audit = client.get("/api/v1/admin/audit-logs", headers=admin_headers)
    assert res_audit.status_code == 200
    logs = res_audit.json()
    assert len(logs) >= 1
    assert any(l["action"] == "user_role_updated" for l in logs)

    # Campus telemetry stats
    res_stats = client.get("/api/v1/admin/campus-stats", headers=admin_headers)
    assert res_stats.status_code == 200
    stats = res_stats.json()
    assert stats["student_seats_total"] == 2000
    assert stats["ferpa_compliant"] is True
