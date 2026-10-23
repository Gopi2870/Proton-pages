"""
Integration tests for Radical Reaction Networks API endpoints.
Verifies HTTP contract for /api/v1/chemistry/radical-reactions endpoints.
"""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


def test_api_list_mechanisms():
    res = client.get("/api/v1/chemistry/radical-reactions/mechanisms")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 4
    assert any(m["id"] == "h2_o2_combustion" for m in data)
    assert any(m["id"] == "atmospheric_methane" for m in data)


def test_api_filter_mechanisms_by_category():
    res = client.get("/api/v1/chemistry/radical-reactions/mechanisms?category=combustion")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 1
    assert data[0]["category"] == "combustion"


def test_api_get_mechanism_details():
    res = client.get("/api/v1/chemistry/radical-reactions/mechanisms/h2_o2_combustion")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == "h2_o2_combustion"
    assert len(data["species"]) == 8
    assert len(data["reactions"]) >= 8
    assert any(r["role"] == "branching" for r in data["reactions"])


def test_api_get_mechanism_404():
    res = client.get("/api/v1/chemistry/radical-reactions/mechanisms/unknown_mechanism")
    assert res.status_code == 404


def test_api_simulate_h2_o2_combustion():
    payload = {
        "mechanism_id": "h2_o2_combustion",
        "temperature_k": 1200.0,
        "pressure_atm": 1.0,
        "total_time_s": 0.0001,
        "max_steps": 300,
    }
    res = client.post("/api/v1/chemistry/radical-reactions/simulate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["mechanism_id"] == "h2_o2_combustion"
    assert len(data["time_points_s"]) > 5
    assert "H2" in data["trajectories"]
    assert "OH" in data["trajectories"]
    assert len(data["total_radical_pool"]) == len(data["time_points_s"])
    assert len(data["top_sensitivities"]) > 0


def test_api_simulate_fenton():
    payload = {
        "mechanism_id": "fenton_scavenging",
        "temperature_k": 310.15,
        "pressure_atm": 1.0,
        "total_time_s": 0.05,
        "max_steps": 200,
    }
    res = client.post("/api/v1/chemistry/radical-reactions/simulate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["mechanism_id"] == "fenton_scavenging"
    assert "Fe2_plus" in data["trajectories"]
    assert "Fe3_plus" in data["trajectories"]
