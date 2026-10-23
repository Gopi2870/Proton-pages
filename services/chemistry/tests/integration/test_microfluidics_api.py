"""Integration tests for Microfluidics, Droplet Chemistry & Continuous Flow API."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestMicrofluidicsApi:
    def test_get_catalog(self):
        """Tests fetching curated chips and benchmark flow reactions."""
        res = client.get("/api/v1/chemistry/microfluidics/catalog")
        assert res.status_code == 200
        data = res.json()
        assert "chips" in data
        assert "reactions" in data
        assert len(data["chips"]) >= 4
        assert len(data["reactions"]) >= 4

    def test_hydrodynamics_endpoint(self):
        """Tests calculating channel hydrodynamics."""
        payload = {
            "channel_width_um": 100.0,
            "channel_height_um": 50.0,
            "channel_length_mm": 30.0,
            "flow_rate_ul_min": 15.0,
            "viscosity_pa_s": 0.001,
            "density_kg_m3": 1000.0,
        }
        res = client.post("/api/v1/chemistry/microfluidics/hydrodynamics", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "reynolds_number" in data
        assert "capillary_number" in data
        assert "pressure_drop_kpa" in data
        assert data["flow_regime"] in ["creeping_laminar", "laminar"]
        assert data["pressure_drop_kpa"] > 0

    def test_droplet_generation_endpoint(self):
        """Tests droplet generation simulation endpoint."""
        payload = {
            "geometry": "t_junction",
            "channel_width_um": 100.0,
            "channel_height_um": 50.0,
            "dispersed_flow_rate_ul_min": 5.0,
            "continuous_flow_rate_ul_min": 25.0,
            "continuous_viscosity_pa_s": 0.015,
            "dispersed_viscosity_pa_s": 0.001,
            "interfacial_tension_n_m": 0.025,
        }
        res = client.post("/api/v1/chemistry/microfluidics/droplet-generation", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "droplet_volume_pl" in data
        assert "generation_frequency_hz" in data
        assert "mixing_time_ms" in data
        assert data["droplet_volume_pl"] > 0
        assert data["generation_frequency_hz"] > 0

    def test_flow_reactor_endpoint(self):
        """Tests continuous flow reactor PFR endpoint."""
        payload = {
            "channel_width_um": 200.0,
            "channel_height_um": 100.0,
            "channel_length_mm": 500.0,
            "total_flow_rate_ul_min": 50.0,
            "initial_concentration_m": 1.0,
            "rate_constant_k1": 0.15,
            "rate_constant_k2": 0.01,
            "temperature_k": 323.15,
            "molecular_weight_g_mol": 150.0,
        }
        res = client.post("/api/v1/chemistry/microfluidics/flow-reactor", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "residence_time_s" in data
        assert "conversion" in data
        assert "intermediate_yield" in data
        assert "space_time_yield_kg_m3_h" in data
        assert len(data["axial_concentration_profile"]) > 10
        assert len(data["rtd_curve"]) > 10

    def test_validation_errors(self):
        """Verifies proper error handling on invalid requests."""
        # Non-positive flow rate
        payload = {
            "channel_width_um": 100.0,
            "channel_height_um": 50.0,
            "flow_rate_ul_min": -5.0,
        }
        res = client.post("/api/v1/chemistry/microfluidics/hydrodynamics", json=payload)
        assert res.status_code in [400, 422]
