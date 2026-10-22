"""Integration tests for Statistical Thermodynamics API endpoints (PR #043)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestStatisticalThermoApi:
    def test_get_molecules_endpoint(self):
        """Validates retrieval of curated molecules catalog."""
        res = client.get("/api/v1/chemistry/statistical-thermo/molecules")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 6
        ids = [m["id"] for m in data]
        assert "ar" in ids
        assert "n2" in ids
        assert "h2o" in ids
        assert "ch4" in ids

    def test_get_molecule_detail_endpoint(self):
        """Validates retrieval of single molecule detail."""
        res = client.get("/api/v1/chemistry/statistical-thermo/molecules/n2")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "n2"
        assert data["formula"] == "N2"
        assert data["symmetry_number"] == 2
        assert len(data["vibrational_frequencies_cm1"]) == 1

    def test_get_molecule_detail_not_found(self):
        """Validates 404 for nonexistent molecule."""
        res = client.get("/api/v1/chemistry/statistical-thermo/molecules/unknown_molecule")
        assert res.status_code == 404

    def test_calculate_endpoint_argon(self):
        """Validates partition function calculation for monatomic Argon."""
        payload = {
            "molecule_id": "ar",
            "temperature_k": 298.15,
            "pressure_pa": 100000.0,
        }
        res = client.post("/api/v1/chemistry/statistical-thermo/calculate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["molecule"]["id"] == "ar"
        assert data["partition_functions"]["q_rot"] == 1.0
        assert data["partition_functions"]["q_vib"] == 1.0
        assert abs(data["thermodynamic_state"]["entropy_standard_j_mol_k"] - 154.84) < 0.3
        assert data["heat_capacity"]["cv_rot"] == 0.0

    def test_calculate_endpoint_water(self):
        """Validates partition function calculation for non-linear polyatomic Water."""
        payload = {
            "molecule_id": "h2o",
            "temperature_k": 500.0,
            "pressure_pa": 101325.0,
        }
        res = client.post("/api/v1/chemistry/statistical-thermo/calculate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["molecule"]["geometry"] == "non_linear"
        assert data["partition_functions"]["q_rot"] > 1.0
        assert data["heat_capacity"]["cv_vib"] > 0.0
        assert data["heat_capacity"]["cp_total"] > data["heat_capacity"]["cv_total"]

    def test_temperature_sweep_endpoint(self):
        """Validates temperature sweep curve generation."""
        payload = {
            "molecule_id": "co2",
            "temp_min_k": 100.0,
            "temp_max_k": 1500.0,
            "points_count": 25,
        }
        res = client.post("/api/v1/chemistry/statistical-thermo/temperature-sweep", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["molecule_id"] == "co2"
        assert len(data["curve"]) == 25
        assert len(data["vibrational_temperatures_k"]) == 4
        assert "freeze-out" in data["analysis"]

    def test_validation_errors(self):
        """Validates error response for non-positive temperature."""
        payload = {
            "molecule_id": "ar",
            "temperature_k": -10.0,
        }
        res = client.post("/api/v1/chemistry/statistical-thermo/calculate", json=payload)
        assert res.status_code == 422 or res.status_code == 400
