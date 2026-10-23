"""
Integration tests for Semi-Empirical Quantum Chemistry FastAPI Endpoints (PR #057).
Tests /presets, /presets/{id}, /parameters, /calculate, and /pes-scan.
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app
from app.models.semi_empirical import SemiEmpiricalMethod


@pytest.fixture
def client():
    return TestClient(app)


class TestSemiEmpiricalApi:
    def test_get_presets_returns_catalogue(self, client):
        response = client.get("/api/v1/chemistry/semi-empirical/presets")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 5
        preset_ids = [m["id"] for m in data]
        assert "water" in preset_ids
        assert "methane" in preset_ids
        assert "ammonia" in preset_ids
        assert "formaldehyde" in preset_ids

    def test_get_preset_by_id_success_and_404(self, client):
        res = client.get("/api/v1/chemistry/semi-empirical/presets/water")
        assert res.status_code == 200
        data = res.json()
        assert data["id"] == "water"
        assert data["formula"] == "H2O"
        assert data["point_group"] == "C2v"
        assert "AM1" in data["literature_heat_of_formation_kcal_mol"]

        res_404 = client.get("/api/v1/chemistry/semi-empirical/presets/nonexistent_xyz")
        assert res_404.status_code == 404

    def test_get_parameters_for_all_and_filtered(self, client):
        # All methods
        res_all = client.get("/api/v1/chemistry/semi-empirical/parameters")
        assert res_all.status_code == 200
        data_all = res_all.json()
        assert len(data_all) == 3

        # Filtered by AM1
        res_am1 = client.get("/api/v1/chemistry/semi-empirical/parameters?method=AM1")
        assert res_am1.status_code == 200
        data_am1 = res_am1.json()
        assert len(data_am1) == 1
        assert data_am1[0]["method"] == "AM1"
        assert "Dewar" in data_am1[0]["citation"]
        assert "O" in data_am1[0]["elements"]

    def test_post_calculate_with_preset_water(self, client):
        payload = {
            "preset_id": "water",
            "method": "AM1",
            "max_iterations": 40,
        }
        res = client.post("/api/v1/chemistry/semi-empirical/calculate", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["success"] is True
        result = data["result"]
        assert result["scf_converged"] is True
        assert result["total_atoms"] == 3
        assert result["total_valence_electrons"] == 8
        assert result["number_of_basis_functions"] == 6
        assert len(result["atomic_populations"]) == 3
        assert result["dipole_moment"]["magnitude"] > 1.5
        assert result["frontier_indices"]["gap_ev"] > 6.0

    def test_post_calculate_with_custom_coordinates(self, client):
        # Ethylene planar custom coordinates
        payload = {
            "atoms": [
                {"index": 0, "symbol": "C", "x": 0.0, "y": 0.0, "z": 0.67},
                {"index": 1, "symbol": "C", "x": 0.0, "y": 0.0, "z": -0.67},
                {"index": 2, "symbol": "H", "x": 0.0, "y": 0.92, "z": 1.23},
                {"index": 3, "symbol": "H", "x": 0.0, "y": -0.92, "z": 1.23},
                {"index": 4, "symbol": "H", "x": 0.0, "y": 0.92, "z": -1.23},
                {"index": 5, "symbol": "H", "x": 0.0, "y": -0.92, "z": -1.23},
            ],
            "method": "PM3",
        }
        res = client.post("/api/v1/chemistry/semi-empirical/calculate", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["success"] is True
        result = data["result"]
        assert result["scf_converged"] is True
        assert result["total_atoms"] == 6
        assert result["total_valence_electrons"] == 12
        # Ethylene is non-polar
        assert result["dipole_moment"]["magnitude"] < 0.1

    def test_post_calculate_odd_electron_fails_400(self, client):
        payload = {
            "atoms": [
                {"index": 0, "symbol": "O", "x": 0.0, "y": 0.0, "z": 0.0},
                {"index": 1, "symbol": "H", "x": 0.0, "y": 0.0, "z": 0.96},
            ],
            "method": "AM1",
        }
        res = client.post("/api/v1/chemistry/semi-empirical/calculate", json=payload)
        assert res.status_code == 400

    def test_post_pes_scan_water_oh_bond(self, client):
        payload = {
            "preset_id": "water",
            "atom_idx_1": 0,
            "atom_idx_2": 1,
            "start_distance": 0.8,
            "end_distance": 2.0,
            "steps": 8,
            "method": "AM1",
        }
        res = client.post("/api/v1/chemistry/semi-empirical/pes-scan", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["success"] is True
        assert len(data["points"]) == 8
        assert data["equilibrium_distance_angstrom"] is not None
        assert 0.8 <= data["equilibrium_distance_angstrom"] <= 1.2
