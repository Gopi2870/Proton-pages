"""
Integration tests for Computational Quantum Chemistry & DFT Kohn-Sham API endpoints (PR #052).
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestDftQuantumApi:
    def test_get_presets_endpoint(self):
        res = client.get("/api/v1/chemistry/dft-quantum/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 4
        names = [m["name"] for m in data]
        assert "Benzene" in names
        assert "Water" in names

    def test_calculate_scf_endpoint(self):
        payload = {
            "molecule_id": "benzene",
            "functional": "B3LYP",
            "basis_set": "6-31G(d)",
            "enable_diis": True,
        }
        res = client.post("/api/v1/chemistry/dft-quantum/calculate-scf", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["molecule_name"] == "Benzene"
        assert data["scf_converged"] is True
        assert data["homo_lumo_gap_ev"] > 5.0
        assert len(data["orbitals"]) >= 8

    def test_td_dft_endpoint(self):
        payload = {
            "molecule_id": "formaldehyde",
            "n_excited_states": 3,
        }
        res = client.post("/api/v1/chemistry/dft-quantum/td-dft", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert len(data["states"]) == 3
        assert data["absorption_max_wavelength_nm"] > 0.0

    def test_mep_surface_endpoint(self):
        payload = {
            "molecule_id": "water",
            "grid_resolution": 12,
        }
        res = client.post("/api/v1/chemistry/dft-quantum/mep-surface", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert len(data["points"]) > 10
        assert data["min_potential_au"] < data["max_potential_au"]
