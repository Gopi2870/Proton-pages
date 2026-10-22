"""
Integration Tests for Quantum Chemistry & Hückel Molecular Orbital API Endpoints.
"""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestQuantumEndpoints:
    def test_list_conjugated_presets(self):
        resp = client.get("/api/v1/chemistry/quantum/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 5
        preset_ids = [p["id"] for p in data]
        assert "benzene" in preset_ids
        assert "1_3_butadiene" in preset_ids
        assert "ethylene" in preset_ids

    def test_get_single_preset_analysis(self):
        resp = client.get("/api/v1/chemistry/quantum/presets/benzene")
        assert resp.status_code == 200
        data = resp.json()
        assert data["molecule_id"] == "benzene"
        assert data["atom_count"] == 6
        assert data["pi_electron_count"] == 6
        assert data["aromaticity_classification"] == "aromatic"
        assert len(data["orbitals"]) == 6
        assert data["delocalization_energy_beta"] > 1.9

    def test_get_invalid_preset_404(self):
        resp = client.get("/api/v1/chemistry/quantum/presets/unknown_molecule_404")
        assert resp.status_code == 404

    def test_custom_hmo_calculation_api(self):
        payload = {
            "custom_atoms": [
                {"atom_id": 0, "element": "C", "label": "C1", "x_2d": 0.2, "y_2d": 0.5, "pi_electron_contribution": 1},
                {"atom_id": 1, "element": "C", "label": "C2", "x_2d": 0.8, "y_2d": 0.5, "pi_electron_contribution": 1},
            ],
            "custom_bonds": [
                {"atom_i": 0, "atom_j": 1, "huckel_k": 1.0},
            ],
            "beta_value_ev": -2.7,
        }
        resp = client.post("/api/v1/chemistry/quantum/calculate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["atom_count"] == 2
        assert data["homo_lumo_gap_beta"] == 2.0
        assert data["homo_lumo_gap_ev"] == 5.4
        assert len(data["orbitals"]) == 2
