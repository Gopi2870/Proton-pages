"""Integration tests for Nuclear Chemistry & Bateman Decay Chains API endpoints (PR #042)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestNuclearDecayApi:
    def test_get_presets_endpoint(self):
        """Validates retrieval of registered radioactive decay chain presets."""
        res = client.get("/api/v1/chemistry/nuclear-decay/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 4
        ids = [p["id"] for p in data]
        assert "molybdenum_technetium" in ids
        assert "radon_daughters" in ids
        assert "uranium_actinides" in ids
        assert "iodine_131" in ids

    def test_get_preset_detail_endpoint(self):
        """Validates retrieval of individual decay chain preset details."""
        res = client.get("/api/v1/chemistry/nuclear-decay/presets/molybdenum_technetium")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "molybdenum_technetium"
        assert len(data["isotopes"]) == 4
        assert data["isotopes"][0]["symbol"] == "Mo-99"
        assert data["isotopes"][1]["symbol"] == "Tc-99m"

    def test_get_preset_detail_not_found(self):
        """Validates 404 for unknown preset."""
        res = client.get("/api/v1/chemistry/nuclear-decay/presets/unknown_nuclide_chain")
        assert res.status_code == 404

    def test_simulate_bateman_endpoint_transient_equilibrium(self):
        """Validates Bateman simulation endpoint for Mo-99 / Tc-99m transient equilibrium."""
        payload = {
            "chain_id": "molybdenum_technetium",
            "time_horizon": 72.0,
            "time_unit": "hours",
            "points_count": 50,
            "initial_populations": {"Mo-99": 1.0e12, "Tc-99m": 0.0, "Ru-99": 0.0},
        }
        res = client.post("/api/v1/chemistry/nuclear-decay/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["chain_name"] == "Molybdenum-99 / Technetium-99m Medical Generator"
        assert data["equilibrium_type"] == "transient"
        assert data["time_unit"] == "hours"
        assert len(data["trajectory"]) == 51
        assert len(data["isotopes"]) == 4
        assert "Tc-99m" in data["final_populations"]
        assert data["final_populations"]["Tc-99m"] > 0

    def test_simulate_bateman_invalid_units(self):
        """Validates rejection of unphysical negative initial population."""
        payload = {
            "chain_id": "molybdenum_technetium",
            "time_horizon": 72.0,
            "time_unit": "hours",
            "initial_populations": {"Mo-99": -50.0},
        }
        res = client.post("/api/v1/chemistry/nuclear-decay/simulate", json=payload)
        assert res.status_code == 400

    def test_radiocarbon_dating_endpoint(self):
        """Validates uncalibrated 14C dating endpoint with explicit scientific limitations."""
        payload = {
            "fraction_modern_carbon": 0.25,  # 2 half-lives: 2 * 5730 = 11460 yr BP
            "use_cambridge_half_life": True,
        }
        res = client.post("/api/v1/chemistry/nuclear-decay/radiocarbon-dating", json=payload)
        assert res.status_code == 200
        data = res.json()

        dating = data["dating_result"]
        assert abs(dating["uncalibrated_age_years_bp"] - 11460.0) < 5.0
        assert dating["fraction_modern_carbon"] == 0.25
        assert "IntCal" in dating["scientific_disclaimer"]
        assert "Suess effect" in dating["scientific_disclaimer"]
