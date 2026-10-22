"""Integration tests for Surface Chemistry & Heterogeneous Catalysis API endpoints (PR #041)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestSurfaceChemistryApi:
    def test_get_materials_endpoint(self):
        """Validates retrieval of curated porous materials list."""
        res = client.get("/api/v1/chemistry/surface-chemistry/materials")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 4
        ids = [m["id"] for m in data]
        assert "mcm_41" in ids
        assert "activated_carbon" in ids

    def test_get_material_detail_endpoint(self):
        """Validates retrieval of single material details."""
        res = client.get("/api/v1/chemistry/surface-chemistry/materials/mcm_41")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "mcm_41"
        assert len(data["sample_points"]) >= 10

    def test_get_material_detail_not_found(self):
        """Validates 404 for invalid material ID."""
        res = client.get("/api/v1/chemistry/surface-chemistry/materials/nonexistent_material")
        assert res.status_code == 404

    def test_bet_analysis_endpoint(self):
        """Validates BET multi-point surface area calculation endpoint."""
        payload = {
            "material_id": "mcm_41",
            "sample_mass_g": 1.0,
            "adsorbate_cross_section_nm2": 0.162,
        }
        res = client.post("/api/v1/chemistry/surface-chemistry/bet-analysis", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["material_name"] == "MCM-41 Ordered Mesoporous Silica"
        assert data["bet_fit"]["r_squared"] >= 0.99
        assert data["bet_fit"]["specific_surface_area_m2_g"] > 900.0
        assert len(data["linear_plot_points"]) >= 8

    def test_isotherm_comparison_endpoint(self):
        """Validates comparison of Langmuir, Freundlich, and BET models."""
        payload = {"material_id": "mcm_41"}
        res = client.post("/api/v1/chemistry/surface-chemistry/isotherm-compare", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert "langmuir_fit" in data
        assert "freundlich_fit" in data
        assert "bet_fit" in data
        assert data["best_fitting_model"] in ["Langmuir", "Freundlich", "BET"]

    def test_catalysis_kinetics_endpoint(self):
        """Validates heterogeneous catalytic kinetics simulation."""
        payload = {
            "mechanism": "both",
            "rate_constant_k": 0.002,
            "adsorption_constant_ka": 0.1,
            "adsorption_constant_kb": 0.05,
            "fixed_partial_pressure_b_kpa": 15.0,
            "max_pressure_a_kpa": 100.0,
            "points_count": 30,
        }
        res = client.post("/api/v1/chemistry/surface-chemistry/catalysis-kinetics", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert len(data["kinetics_curve"]) == 31
        assert data["lh_peak_pressure_a_kpa"] > 0
        assert data["lh_maximum_rate"] > 0
        assert "volcanic peak" in data["summary"]
