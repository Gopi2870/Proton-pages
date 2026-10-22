"""
Integration Tests for Organic Reaction Mechanism Endpoints.
"""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestMechanismEndpoints:
    def test_list_mechanism_presets(self):
        resp = client.get("/api/v1/chemistry/mechanisms/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 6
        mech_ids = [m["id"] for m in data]
        assert "sn2_bromoethane" in mech_ids
        assert "sn1_tertbutyl_chloride" in mech_ids
        assert "e2_bromopropane" in mech_ids
        assert "eas_benzene_nitration" in mech_ids

    def test_get_single_mechanism_detail(self):
        resp = client.get("/api/v1/chemistry/mechanisms/presets/sn2_bromoethane")
        assert resp.status_code == 200
        data = resp.json()
        assert data["name"] == "SN2 Bimolecular Nucleophilic Substitution"
        assert data["stereochemical_outcome"] == "inversion_walden"
        assert len(data["steps"]) == 1
        assert len(data["steps"][0]["curved_arrows"]) == 2
        assert len(data["energy_profile"]) == 3

    def test_get_invalid_mechanism_404(self):
        resp = client.get("/api/v1/chemistry/mechanisms/presets/invalid_mechanism_id")
        assert resp.status_code == 404

    def test_interpolate_energy_profile_endpoint(self):
        payload = {
            "points": [
                {"reaction_coordinate": 0.0, "gibbs_free_energy_kj_mol": 0.0, "point_type": "ground_state", "label": "R"},
                {"reaction_coordinate": 0.5, "gibbs_free_energy_kj_mol": 85.0, "point_type": "transition_state", "label": "TS"},
                {"reaction_coordinate": 1.0, "gibbs_free_energy_kj_mol": -60.0, "point_type": "ground_state", "label": "P"},
            ],
            "resolution": 30,
        }
        resp = client.post("/api/v1/chemistry/mechanisms/energy-profile/interpolate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert len(data["coordinate_grid"]) == 30
        assert len(data["gibbs_energy_curve"]) == 30
        assert len(data["transition_state_peaks"]) == 1
        assert data["transition_state_peaks"][0]["gibbs_free_energy_kj_mol"] == 85.0
