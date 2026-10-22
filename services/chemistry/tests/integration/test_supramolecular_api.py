"""Integration tests for Supramolecular Chemistry & Host-Guest Complexation API endpoints (PR #045)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestSupramolecularApi:
    def test_get_catalog_endpoint(self):
        """Validates retrieval of curated macrocyclic hosts and guests."""
        res = client.get("/api/v1/chemistry/supramolecular/catalog")
        assert res.status_code == 200
        data = res.json()
        assert "hosts" in data
        assert "guests" in data
        assert len(data["hosts"]) >= 6
        assert len(data["guests"]) >= 6

    def test_job_plot_endpoint(self):
        """Validates continuous variation (Job plot) calculation endpoint."""
        payload = {
            "host_id": "18_crown_6",
            "guest_id": "potassium_cation",
            "total_concentration_mM": 1.0,
            "points_count": 21,
            "temperature_k": 298.15,
        }
        res = client.post("/api/v1/chemistry/supramolecular/job-plot", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["determined_stoichiometry"] == "1:1"
        assert abs(data["peak_mole_fraction"] - 0.50) <= 0.05
        assert len(data["points"]) == 21

    def test_simulate_binding_endpoint(self):
        """Validates binding isotherm and thermodynamic decomposition endpoint."""
        payload = {
            "host_id": "beta_cyclodextrin",
            "guest_id": "adamantanecarboxylate",
            "host_initial_conc_mM": 0.5,
            "guest_max_conc_mM": 2.5,
            "temperature_k": 298.15,
            "titration_steps": 25,
        }
        res = client.post("/api/v1/chemistry/supramolecular/simulate-binding", json=payload)
        assert res.status_code == 200
        data = res.json()["system"]

        assert data["host"]["name"] == "β-Cyclodextrin"
        assert data["association_constant_ka_m_inv"] > 1000.0
        assert data["gibbs_free_energy_delta_g_kj_mol"] < 0.0
        assert len(data["isotherm_points"]) == 25
        assert data["decomposition"]["hydrophobic_desolvation_kj_mol"] < 0.0

    def test_validation_errors(self):
        """Validates error response for non-positive concentration."""
        payload = {
            "host_id": "18_crown_6",
            "guest_id": "potassium_cation",
            "total_concentration_mM": -5.0,
        }
        res = client.post("/api/v1/chemistry/supramolecular/job-plot", json=payload)
        assert res.status_code == 422 or res.status_code == 400
