"""Integration tests for Stiff Kinetics Reaction Networks API endpoints (PR #040)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestStiffKineticsApi:
    def test_get_presets_endpoint(self):
        """Validates retrieval of stiff kinetics benchmark presets."""
        res = client.get("/api/v1/chemistry/stiff-kinetics/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 4
        ids = [p["id"] for p in data]
        assert "robertson_stiff" in ids
        assert "chapman_ozone" in ids
        assert "oregonator_bz" in ids
        assert "zeldovich_nox" in ids

    def test_get_preset_detail_endpoint(self):
        """Validates retrieval of preset details."""
        res = client.get("/api/v1/chemistry/stiff-kinetics/presets/robertson_stiff")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "robertson_stiff"
        assert len(data["species"]) == 3
        assert len(data["reactions"]) == 3

    def test_get_preset_detail_not_found(self):
        """Validates 404 response for invalid preset ID."""
        res = client.get("/api/v1/chemistry/stiff-kinetics/presets/nonexistent_preset")
        assert res.status_code == 404

    def test_simulate_robertson_preset(self):
        """Validates running stiff simulation via API endpoint."""
        payload = {
            "preset_id": "robertson_stiff",
            "total_time_s": 20.0,
            "initial_step_s": 1e-4,
            "solver_method": "rosenbrock_stiff",
            "max_steps": 100,
        }
        res = client.post("/api/v1/chemistry/stiff-kinetics/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["network_name"] == "Robertson Autocatalytic Stiff System (1966)"
        assert data["solver_method"] == "rosenbrock_stiff"
        assert data["is_stiff"] is True
        assert len(data["trajectory"]) > 0
        assert "A" in data["final_concentrations"]
        assert "B" in data["final_concentrations"]
        assert "C" in data["final_concentrations"]
        assert len(data["jacobian_matrix"]) == 3
        assert "successfully computed" in data["pedagogical_summary"]

    def test_simulate_custom_network(self):
        """Validates running simulation with custom species and reactions."""
        payload = {
            "preset_id": None,
            "species": [
                {"name": "Reactant", "initial_concentration_m": 1.0},
                {"name": "Product", "initial_concentration_m": 0.0},
            ],
            "reactions": [
                {
                    "id": "r1",
                    "equation_str": "Reactant -> Product",
                    "reactants": {"Reactant": 1.0},
                    "products": {"Product": 1.0},
                    "rate_constant": 1.0,
                }
            ],
            "total_time_s": 1.0,
            "initial_step_s": 0.1,
            "solver_method": "rosenbrock_stiff",
            "max_steps": 50,
        }
        res = client.post("/api/v1/chemistry/stiff-kinetics/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["network_name"] == "Custom Reaction Network"
        assert data["final_concentrations"]["Product"] > 0.5
