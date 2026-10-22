"""Integration tests for Coordination Chemistry & Crystal Field Theory API endpoints (PR #039)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestCoordinationCftApi:
    def test_get_metals_endpoint(self):
        """Validates retrieval of transition metal list with d-counts."""
        res = client.get("/api/v1/chemistry/coordination-cft/metals")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 8
        symbols = [m["symbol"] for m in data]
        assert "Fe" in symbols
        assert "Cu" in symbols
        assert "Co" in symbols
        assert "Ni" in symbols

    def test_get_ligands_endpoint(self):
        """Validates retrieval of spectrochemical ligand series."""
        res = client.get("/api/v1/chemistry/coordination-cft/ligands")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 10
        assert data[0]["id"] == "i"
        assert data[-1]["id"] == "co"

    def test_get_presets_endpoint(self):
        """Validates retrieval of curated coordination complex presets."""
        res = client.get("/api/v1/chemistry/coordination-cft/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 5
        ids = [p["id"] for p in data]
        assert "fe_cn6_4" in ids
        assert "cu_h2o6_2" in ids
        assert "co_nh36_3" in ids

    def test_analyze_complex_endpoint(self):
        """Validates crystal field theory analysis for Fe(CN)6^4-."""
        payload = {
            "metal_symbol": "Fe",
            "oxidation_state": 2,
            "ligand_id": "cn",
            "geometry": "octahedral",
        }
        res = client.post("/api/v1/chemistry/coordination-cft/analyze", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["formula"] == "[Fe(CN-)6]4-"
        assert data["spin_state"] == "low_spin"
        assert data["cfse_delta_units"] == -2.4
        assert data["unpaired_electrons"] == 0
        assert data["is_paramagnetic"] is False
        assert data["magnetic_moment_bm"] == 0.0
        assert len(data["orbital_levels"]) == 2
        assert "Crystal field splitting" in data["pedagogical_notes"]

    def test_analyze_tetrahedral_endpoint(self):
        """Validates analysis of tetrahedral complex."""
        payload = {
            "metal_symbol": "Ni",
            "oxidation_state": 2,
            "ligand_id": "cl",
            "geometry": "tetrahedral",
        }
        res = client.post("/api/v1/chemistry/coordination-cft/analyze", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["geometry"] == "tetrahedral"
        assert data["coordination_number"] == 4
        assert data["unpaired_electrons"] == 2
        assert data["is_paramagnetic"] is True
