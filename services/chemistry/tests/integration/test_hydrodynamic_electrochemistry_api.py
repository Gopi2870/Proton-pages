"""Integration tests for Hydrodynamic Electrochemistry, RDE & Stripping API (PR #049)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestHydrodynamicElectrochemistryApi:
    def test_get_catalog_endpoint(self):
        """Tests fetching metals and electrodes catalog."""
        res = client.get("/api/v1/chemistry/hydrodynamic-electrochemistry/catalog")
        assert res.status_code == 200
        data = res.json()
        assert "metals" in data
        assert "electrodes" in data
        assert len(data["metals"]) >= 4

    def test_simulate_rde_endpoint(self):
        """Tests RDE Levich simulation endpoint."""
        payload = {
            "system_name": "Ferrocyanide RDE",
            "electrode_type": "platinum_disk",
            "electrode_radius_mm": 2.5,
            "concentration_mm": 5.0,
            "n_electrons": 1,
            "rotation_speeds_rpm": [400.0, 900.0, 1600.0],
        }
        res = client.post("/api/v1/chemistry/hydrodynamic-electrochemistry/simulate-rde", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "levich_slope_ua_s_half" in data
        assert len(data["levich_points"]) == 3
        assert len(data["koutecky_levich_points"]) == 3
        assert len(data["polarization_waves"]) == 3

    def test_simulate_stripping_endpoint(self):
        """Tests Anodic Stripping Voltammetry simulation endpoint."""
        payload = {
            "sample_name": "Tap Water Sample",
            "deposition_time_s": 90.0,
            "zn_concentration_ppb": 40.0,
            "pb_concentration_ppb": 15.0,
            "cd_concentration_ppb": 8.0,
            "cu_concentration_ppb": 25.0,
        }
        res = client.post("/api/v1/chemistry/hydrodynamic-electrochemistry/simulate-stripping", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert len(data["peaks_detected"]) == 4
        assert len(data["stripping_curve"]) > 50
        assert data["preconcentration_factor"] > 1.0

    def test_simulate_chronocoulometry_endpoint(self):
        """Tests chronocoulometry Anson plot endpoint."""
        payload = {
            "system_name": "Carbon Adsorption",
            "concentration_mm": 1.0,
            "electrode_area_cm2": 0.20,
            "surface_excess_gamma_mol_cm2": 2.5e-10,
        }
        res = client.post("/api/v1/chemistry/hydrodynamic-electrochemistry/simulate-chronocoulometry", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "double_layer_charge_uc" in data
        assert "anson_slope_uc_s_half" in data
        assert len(data["anson_points"]) == 30

    def test_validation_errors(self):
        """Tests rejection of invalid parameters."""
        payload = {
            "electrode_radius_mm": -1.0,  # invalid negative radius
        }
        res = client.post("/api/v1/chemistry/hydrodynamic-electrochemistry/simulate-rde", json=payload)
        assert res.status_code in [400, 422]
