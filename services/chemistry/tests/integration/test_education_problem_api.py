"""
Integration tests for Educational Chemistry Problem Bank endpoints.
Verifies HTTP contract for /api/v1/education/problems, detail, randomized, and verify.
"""
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


def test_api_list_problems():
    response = client.get("/api/v1/education/problems")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5
    assert any(p["id"] == "prob-phys-001" for p in data)


def test_api_filter_problems():
    response = client.get("/api/v1/education/problems?category=Inorganic+%26+Coordination+Chemistry")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert all(p["category"] == "Inorganic & Coordination Chemistry" for p in data)


def test_api_get_problem_detail():
    response = client.get("/api/v1/education/problems/prob-quant-001")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "prob-quant-001"
    assert data["reference_unit"] == "nm"
    assert len(data["steps"]) == 4
    assert len(data["hints"]) == 2
    assert len(data["rubric"]) == 4


def test_api_get_problem_not_found():
    response = client.get("/api/v1/education/problems/nonexistent-id")
    assert response.status_code == 404


def test_api_get_randomized_instance():
    response = client.get("/api/v1/education/problems/prob-phys-001/randomized")
    assert response.status_code == 200
    data = response.json()
    assert "randomized_variables" in data
    assert data["target_unit"] == "kJ/mol"


def test_api_verify_solution():
    payload = {
        "final_answer": 169.75,
        "final_unit": "kJ/mol",
        "step_submissions": [
            {"step_number": 1, "submitted_value": 2.3026, "submitted_unit": "dimensionless"},
            {"step_number": 2, "submitted_value": 0.00011278, "submitted_unit": "K^-1"},
            {"step_number": 3, "submitted_value": 169752.0, "submitted_unit": "J/mol"},
            {"step_number": 4, "submitted_value": 169.75, "submitted_unit": "kJ/mol"},
        ],
        "revealed_hint_tiers": [],
    }
    response = client.post("/api/v1/education/problems/prob-kin-001/verify", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is True
    assert data["score_percentage"] == 100.0
    assert len(data["step_results"]) == 4
    assert "Worked Analytical Solution" in data["worked_solution_markdown"]
