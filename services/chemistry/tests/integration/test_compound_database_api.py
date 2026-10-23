"""
Integration tests for Comprehensive Chemical Compounds & Spectral Reference Database API endpoints (PR #050).
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestCompoundDatabaseApi:
    def test_get_stats_endpoint(self):
        """Validates database statistics endpoint."""
        res = client.get("/api/v1/chemistry/compound-database/stats")
        assert res.status_code == 200
        data = res.json()
        assert data["total_compounds"] >= 8
        assert "categories" in data
        assert data["compounds_with_uv"] >= 6
        assert data["compounds_with_ir"] >= 6
        assert data["compounds_with_nmr"] >= 6
        assert data["average_molecular_weight"] > 50.0

    def test_get_compounds_filter_endpoint(self):
        """Validates GET compound catalog search and filtering."""
        res = client.get("/api/v1/chemistry/compound-database/compounds?query=caffeine")
        assert res.status_code == 200
        data = res.json()
        assert data["total_matches"] >= 1
        caffeine = data["compounds"][0]
        assert caffeine["id"] == "cmpd_caffeine"
        assert caffeine["formula"] == "C8H10N4O2"
        assert len(caffeine["nmr_1h_shifts"]) >= 4

    def test_post_search_endpoint(self):
        """Validates POST search payload with multiple criteria."""
        payload = {
            "query": "vanillin",
            "category": "Organic",
            "min_mw": 100.0,
            "max_mw": 200.0,
            "limit": 10,
            "offset": 0,
        }
        res = client.post("/api/v1/chemistry/compound-database/search", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["total_matches"] >= 1
        vanillin = data["compounds"][0]
        assert vanillin["id"] == "cmpd_vanillin"
        assert vanillin["iupac_name"] == "4-Hydroxy-3-methoxybenzaldehyde"

    def test_post_match_spectroscopy_endpoint(self):
        """Validates spectral peak matching endpoint."""
        payload = {
            "target_uv_wavelength_nm": 273.0,  # Caffeine UV peak
            "tolerance_percent": 5.0,
            "limit": 5,
        }
        res = client.post("/api/v1/chemistry/compound-database/match-spectroscopy", json=payload)
        assert res.status_code == 200
        data = res.json()
        ids = [c["id"] for c in data["compounds"]]
        assert "cmpd_caffeine" in ids

    def test_get_compound_by_id_endpoint(self):
        """Validates retrieval of single compound by ID."""
        res = client.get("/api/v1/chemistry/compound-database/cmpd_aspirin")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "cmpd_aspirin"
        assert data["name"] == "Aspirin"
        assert len(data["uv_vis_peaks"]) > 0
        assert len(data["ir_bands"]) > 0
        assert len(data["nmr_1h_shifts"]) > 0
        assert len(data["nmr_13c_shifts"]) > 0

    def test_get_compound_by_id_not_found(self):
        """Validates 404 response for nonexistent compound ID."""
        res = client.get("/api/v1/chemistry/compound-database/nonexistent_xyz_999")
        assert res.status_code == 404
        data = res.json()
        error_msg = data.get("error", {}).get("message") or data.get("detail", "")
        assert "not found" in error_msg.lower()
