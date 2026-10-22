"""Integration tests for Molecular Dynamics API Endpoints (PR #036)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestMolecularDynamicsApi:
    def test_get_presets(self):
        """Validates that MD presets catalog returns Argon physical benchmarks."""
        res = client.get("/api/v1/chemistry/dynamics/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 5
        preset_ids = [p["id"] for p in data]
        assert "liquid_argon" in preset_ids
        assert "supercritical_argon" in preset_ids
        assert "dilute_argon_gas" in preset_ids
        assert "argon_crystal" in preset_ids

        liq = next(p for p in data if p["id"] == "liquid_argon")
        assert liq["target_temperature_k"] == 84.0
        assert liq["density_g_cm3"] == 1.40

    def test_simulate_endpoint_nve(self):
        """Validates NVE microcanonical simulation via REST API."""
        payload = {
            "ensemble": "nve_microcanonical",
            "num_particles": 32,
            "target_temperature_k": 85.0,
            "density_g_cm3": 1.35,
            "timestep_fs": 2.0,
            "total_steps": 50,
            "sampling_interval": 10,
            "cutoff_radius_sigma": 2.5,
            "random_seed": 42,
        }

        res = client.post("/api/v1/chemistry/dynamics/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["num_particles"] == 32
        assert data["box_length_angstrom"] > 0.0
        assert data["volume_angstrom3"] > 0.0
        assert len(data["telemetry"]) >= 5
        assert len(data["final_positions"]) == 32
        assert data["energy_conservation_ratio"] > 0.99
        assert "Liquid Argon" in data["pedagogical_summary"] or "Argon" in data["pedagogical_summary"]

    def test_simulate_endpoint_nvt_berendsen(self):
        """Validates NVT Berendsen simulation with temperature coupling."""
        payload = {
            "ensemble": "nvt_berendsen",
            "num_particles": 32,
            "target_temperature_k": 120.0,
            "density_g_cm3": 1.10,
            "timestep_fs": 2.0,
            "total_steps": 40,
            "thermostat_coupling_ps": 0.1,
            "sampling_interval": 10,
            "random_seed": 101,
        }

        res = client.post("/api/v1/chemistry/dynamics/simulate", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["ensemble"] == "nvt_berendsen"
        assert len(data["msd_curve"]) > 0
        assert data["average_temperature_k"] > 50.0

    def test_invalid_parameters_rejection(self):
        """FastAPI Pydantic schema must reject physically unfeasible or out-of-bound inputs."""
        # Non-positive number of particles
        bad_payload = {
            "ensemble": "NVE (Microcanonical)",
            "num_particles": 0,
            "target_temperature_k": 100.0,
            "density_g_cm3": 1.0,
        }
        res = client.post("/api/v1/chemistry/dynamics/simulate", json=bad_payload)
        assert res.status_code == 422

        # Negative density
        bad_payload2 = {
            "ensemble": "NVE (Microcanonical)",
            "num_particles": 32,
            "target_temperature_k": 100.0,
            "density_g_cm3": -0.5,
        }
        res2 = client.post("/api/v1/chemistry/dynamics/simulate", json=bad_payload2)
        assert res2.status_code == 422
