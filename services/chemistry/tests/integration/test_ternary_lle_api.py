"""Integration tests for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE) API endpoints (PR #038)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestTernaryLleApi:
    def test_get_systems_endpoint(self):
        """Validates retrieval of curated ternary system presets."""
        res = client.get("/api/v1/chemistry/ternary-lle/systems")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 3
        ids = [s["id"] for s in data]
        assert "water_toluene_acetic_acid" in ids
        assert "water_mibk_acetone" in ids
        assert "water_chloroform_acetic_acid" in ids

    def test_get_system_detail_endpoint(self):
        """Validates retrieval of detailed binodal curve, tie lines, and correlations."""
        res = client.get("/api/v1/chemistry/ternary-lle/systems/water_toluene_acetic_acid")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "water_toluene_acetic_acid"
        assert data["carrier_name"] == "Water"
        assert data["solvent_name"] == "Toluene"
        assert data["solute_name"] == "Acetic Acid"
        assert len(data["binodal_curve"]) > 10
        assert len(data["tie_lines"]) >= 5
        assert data["hand_correlation"]["r_squared"] >= 0.95
        assert data["othmer_tobias_correlation"]["r_squared"] >= 0.95

    def test_get_system_detail_not_found(self):
        """Validates 404 response for unknown system."""
        res = client.get("/api/v1/chemistry/ternary-lle/systems/unknown_nonexistent_system")
        assert res.status_code == 404

    def test_simulate_hunter_nash_endpoint(self):
        """Validates Hunter-Nash countercurrent multistage simulation endpoint."""
        payload = {
            "system_id": "water_toluene_acetic_acid",
            "feed_rate_kg_h": 1000.0,
            "feed_x_carrier": 0.70,
            "feed_x_solvent": 0.00,
            "feed_x_solute": 0.30,
            "solvent_rate_kg_h": 1200.0,
            "solvent_x_carrier": 0.00,
            "solvent_x_solvent": 1.00,
            "solvent_x_solute": 0.00,
            "target_raffinate_solute_fraction": 0.05,
            "max_stages": 15,
        }
        res = client.post("/api/v1/chemistry/ternary-lle/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["system_id"] == "water_toluene_acetic_acid"
        assert data["is_in_two_phase_region"] is True
        assert data["theoretical_stages_count"] >= 1
        assert len(data["stages"]) == data["theoretical_stages_count"]
        assert data["solute_recovery_percent"] > 70.0
        assert data["extract_rate_kg_h"] > 0
        assert data["raffinate_rate_kg_h"] > 0
        assert "Hunter-Nash countercurrent multistage extraction" in data["pedagogical_summary"]

    def test_invalid_parameters_rejection(self):
        """Validates that Pydantic rejects negative flow rate or out-of-range mass fractions."""
        bad_payload = {
            "system_id": "water_toluene_acetic_acid",
            "feed_rate_kg_h": -500.0,  # Negative feed rate invalid
            "feed_x_solute": 0.30,
        }
        res = client.post("/api/v1/chemistry/ternary-lle/simulate", json=bad_payload)
        assert res.status_code == 422
