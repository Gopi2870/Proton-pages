"""Integration tests for Electroanalytical Chemistry & Cyclic Voltammetry API endpoints (PR #037)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestElectroanalyticalApi:
    def test_get_presets_endpoint(self):
        """Validates retrieval of curated electrochemical presets."""
        res = client.get("/api/v1/chemistry/electroanalysis/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 5
        ids = [p["id"] for p in data]
        assert "ferricyanide" in ids
        assert "ferrocene" in ids
        assert "ruthenium_hexamine" in ids
        assert "dopamine" in ids
        assert "ascorbic_acid" in ids

        fc = next(p for p in data if p["id"] == "ferrocene")
        assert fc["e0_v_vs_she"] == 0.400
        assert fc["n_electrons"] == 1

    def test_cv_simulate_endpoint(self):
        """Validates cyclic voltammetry simulation endpoint."""
        payload = {
            "preset_id": "ferricyanide",
            "system_name": "Potassium Ferricyanide in 0.1M KCl",
            "e0_v": 0.360,
            "n_electrons": 1,
            "e_start_v": 0.650,
            "e_switch_v": 0.050,
            "scan_rate_v_s": 0.100,
            "concentration_mm": 1.0,
            "diffusion_coefficient_cm2_s": 7.6e-6,
            "electrode_area_cm2": 0.0707,
            "standard_rate_constant_k0_cm_s": 0.020,
            "transfer_coefficient_alpha": 0.50,
        }

        res = client.post("/api/v1/chemistry/electroanalysis/cv-simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["system_name"] == "Potassium Ferricyanide in 0.1M KCl"
        assert data["reversibility"] in ["reversible", "quasi_reversible"]
        assert data["peak_current_anodic_ua"] > 10.0
        assert len(data["voltammogram"]) > 50
        assert "Cyclic voltammogram simulated" in data["pedagogical_summary"]

    def test_chronoamperometry_endpoint(self):
        """Validates Cottrell chronoamperometry simulation endpoint."""
        payload = {
            "preset_id": "ferricyanide",
            "applied_potential_v": 0.0,
            "duration_s": 4.0,
            "time_step_s": 0.05,
            "concentration_mm": 1.5,
            "diffusion_coefficient_cm2_s": 7.6e-6,
            "electrode_area_cm2": 0.0707,
            "n_electrons": 1,
        }

        res = client.post("/api/v1/chemistry/electroanalysis/chronoamperometry", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["cottrell_slope_ua_s_half"] > 0.0
        assert len(data["curve"]) == 80
        assert data["curve"][0]["current_ua"] > data["curve"][-1]["current_ua"]

    def test_invalid_parameters_rejection(self):
        """Validates that Pydantic rejects out-of-bounds parameters."""
        bad_payload = {
            "e0_v": 0.360,
            "concentration_mm": -2.0,  # Negative concentration invalid
        }
        res = client.post("/api/v1/chemistry/electroanalysis/cv-simulate", json=bad_payload)
        assert res.status_code == 422
