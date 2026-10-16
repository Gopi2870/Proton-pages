"""
Integration tests for Virtual Chemistry Laboratory API Endpoints.
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import create_app


@pytest.fixture
def client():
    app = create_app()
    return TestClient(app)


def test_get_solutes_and_systems(client):
    """Verify metadata endpoints for virtual lab catalog."""
    res_solutes = client.get("/api/v1/chemistry/lab/solutes")
    assert res_solutes.status_code == 200
    solutes_data = res_solutes.json()
    assert "solution_solutes" in solutes_data
    assert "nh4no3" in solutes_data["solution_solutes"]
    assert "combustion_standards" in solutes_data
    assert "benzoic_acid" in solutes_data["combustion_standards"]

    res_systems = client.get("/api/v1/chemistry/lab/systems")
    assert res_systems.status_code == 200
    systems_data = res_systems.json()
    assert "systems" in systems_data
    assert "indicators" in systems_data


def test_titration_simulate_endpoint(client):
    """Verify endpoint simulation for weak acid vs strong base."""
    payload = {
        "system_type": "weak_acid_strong_base",
        "analyte_volume_ml": 25.0,
        "analyte_conc_m": 0.1,
        "titrant_conc_m": 0.1,
        "indicator": "Phenolphthalein",
    }
    response = client.post("/api/v1/chemistry/lab/titration-simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["equivalence_volume_ml"] == 25.0
    assert data["equivalence_ph"] > 8.0
    assert data["half_equivalence_volume_ml"] == 12.5
    assert len(data["curve_points"]) > 20
    assert data["curve_points"][0]["indicator_color"] != ""


def test_calorimetry_simulate_endpoint(client):
    """Verify endpoint simulation for solution calorimetry."""
    payload = {
        "calorimeter_type": "solution_coffee_cup",
        "sample_key": "cacl2",
        "sample_mass_g": 5.0,
        "water_mass_g": 100.0,
        "initial_temp_c": 25.0,
        "calorimeter_c_j_k": 25.0,
    }
    response = client.post("/api/v1/chemistry/lab/calorimetry-simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_exothermic"] is True
    assert data["delta_t_c"] > 0
    assert len(data["temperature_curve"]) > 20
    assert "analysis_notes" in data


def test_titration_validation_error(client):
    """Verify 422 error on negative analyte volume."""
    payload = {
        "system_type": "strong_acid_strong_base",
        "analyte_volume_ml": -10.0,
        "analyte_conc_m": 0.1,
    }
    response = client.post("/api/v1/chemistry/lab/titration-simulate", json=payload)
    assert response.status_code == 422
