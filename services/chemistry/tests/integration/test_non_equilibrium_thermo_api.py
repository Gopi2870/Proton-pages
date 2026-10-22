"""Integration tests for Non-Equilibrium Thermodynamics API endpoints (PR #044)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestNonEquilibriumThermoApi:
    def test_get_benchmarks_endpoint(self):
        """Validates retrieval of curated coupled transport benchmark regimes."""
        res = client.get("/api/v1/chemistry/non-equilibrium-thermo/benchmarks")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 3
        ids = [b["id"] for b in data]
        assert "thermoelectric" in ids
        assert "thermodiffusion" in ids
        assert "electrokinetic" in ids

    def test_evaluate_transport_endpoint_symmetric(self):
        """Validates transport coupling evaluation endpoint for positive-definite symmetric matrix."""
        payload = {
            "matrix_l": [[4.0, 1.5], [1.5, 6.0]],
            "driving_forces": [2.0, 1.0],
            "temperature_k": 300.0,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/evaluate-transport", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["transport_matrix"]["is_symmetric"] is True
        assert data["transport_matrix"]["is_positive_semidefinite"] is True
        assert data["entropy_production"]["is_physically_admissible"] is True
        assert data["entropy_production"]["entropy_production_w_m3_k"] > 0.0

    def test_evaluate_transport_negative_cross_coupling(self):
        """Validates that negative cross-coupling with valid PSD condition succeeds."""
        payload = {
            "matrix_l": [[10.0, -3.0], [-3.0, 10.0]],
            "driving_forces": [1.0, 2.0],
            "temperature_k": 298.15,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/evaluate-transport", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["transport_matrix"]["coupling_factor_q"] == -0.3
        assert data["transport_matrix"]["is_positive_semidefinite"] is True
        assert data["entropy_production"]["is_physically_admissible"] is True

    def test_thermoelectric_endpoint(self):
        """Validates thermoelectric analysis endpoint and Kelvin relation verification."""
        payload = {
            "material_id": "bi2te3_p_type",
            "temperature_k": 300.0,
            "voltage_gradient_v_m": 5.0,
            "temperature_gradient_k_m": 200.0,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/thermoelectric", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert "Bismuth Telluride" in data["material_name"]
        assert data["second_kelvin_law_verified"] is True
        assert data["system"]["figure_of_merit_zt"] > 0.0
        assert data["entropy_production_w_m3_k"] > 0.0

    def test_electrokinetic_endpoint(self):
        """Validates electrokinetic transport endpoint and Saxen reciprocity."""
        payload = {
            "medium_id": "glass_capillary_water",
            "pressure_drop_kpa": 40.0,
            "voltage_difference_v": 50.0,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/electrokinetic", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["saxen_reciprocity_holds"] is True
        assert data["system"]["saxen_relative_error_pct"] == 0.0
        assert data["volume_flow_rate_m3_s"] > 0.0

    def test_thermodiffusion_endpoint(self):
        """Validates thermodiffusion endpoint and Soret/Dufour reciprocity verification."""
        payload = {
            "mixture_id": "toluene_cyclohexane",
            "temperature_k": 298.15,
            "temperature_gradient_k_m": 150.0,
            "mass_fraction_gradient_m_inv": 0.4,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/thermodiffusion", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert "Toluene" in data["mixture_name"]
        assert data["onsager_reciprocity_verified"] is True
        assert data["system"]["soret_coefficient_k_inv"] > 0.0
        assert data["system"]["onsager_cross_coupling_ratio"] == 1.000
        assert data["entropy_production_w_m3_k"] > 0.0

    def test_validation_errors(self):
        """Validates error response for non-square matrix or negative temperature."""
        payload = {
            "matrix_l": [[1.0, 2.0]],
            "driving_forces": [1.0],
            "temperature_k": 300.0,
        }
        res = client.post("/api/v1/chemistry/non-equilibrium-thermo/evaluate-transport", json=payload)
        assert res.status_code == 400

