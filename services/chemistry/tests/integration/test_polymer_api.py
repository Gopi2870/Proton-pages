"""Integration Tests for Polymer Chemistry API Endpoints."""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestPolymerEndpoints:
    def test_list_polymer_presets(self):
        resp = client.get("/api/v1/chemistry/polymers/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 5
        preset_ids = [p["id"] for p in data]
        assert "nylon_6_6" in preset_ids
        assert "pmma" in preset_ids
        assert "polyurethane_network" in preset_ids

    def test_get_single_preset_simulation_with_overrides(self):
        resp = client.get("/api/v1/chemistry/polymers/presets/nylon_6_6?conversion=0.99&chi=0.45")
        assert resp.status_code == 200
        data = resp.json()
        assert data["polymer_name"] == "Nylon 6,6 (Polyhexamethylene Adipamide)"
        assert data["conversion_p"] == 0.99
        assert data["number_average_mn"] > 20000.0
        assert data["carothers"]["degree_of_polymerization_xn"] == 100.0
        assert len(data["distribution_curve"]) > 20
        assert data["flory_huggins"]["chi_parameter"] == 0.45

    def test_get_invalid_preset_404(self):
        resp = client.get("/api/v1/chemistry/polymers/presets/invalid_polymer_abc")
        assert resp.status_code == 404

    def test_carothers_endpoint(self):
        payload = {
            "conversion_p": 0.95,
            "stoichiometric_ratio_r": 1.0,
            "average_functionality": 2.0,
            "monomer_molecular_weight": 113.16,
        }
        resp = client.post("/api/v1/chemistry/polymers/carothers", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["degree_of_polymerization_xn"] == 20.0
        assert data["polydispersity_index"] == 1.95
        assert not data["is_gel_formed"]

    def test_radical_kinetics_endpoint(self):
        payload = {
            "monomer_name": "Methyl Methacrylate",
            "monomer_mw": 100.12,
            "monomer_concentration_m": 6.0,
            "initiator": {
                "name": "AIBN",
                "kd_s_1": 1.0e-5,
                "efficiency_f": 0.65,
                "initial_concentration_m": 0.01,
            },
            "temperature_c": 60.0,
            "propagation_kp_l_mol_s": 515.0,
            "termination_kt_l_mol_s": 2.5e7,
            "termination_mode": "disproportionation",
            "conversion_p": 0.25,
        }
        resp = client.post("/api/v1/chemistry/polymers/radical-kinetics", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["radical_concentration_m"] > 0
        assert data["polymerization_rate_rp_mol_l_s"] > 0
        assert data["predicted_xn"] > 0

    def test_flory_huggins_endpoint(self):
        payload = {
            "degree_of_polymerization_n": 200,
            "chi_parameter": 0.55,
        }
        resp = client.post("/api/v1/chemistry/polymers/flory-huggins", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["critical_chi"] > 0.5
        assert len(data["curve_points"]) > 20
