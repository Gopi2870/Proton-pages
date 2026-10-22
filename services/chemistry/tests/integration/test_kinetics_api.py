"""
Integration Tests for Reaction Kinetics & Dynamics API Endpoints.
"""
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestKineticsEndpoints:
    def test_get_preset_reactions(self):
        resp = client.get("/api/v1/chemistry/kinetics/reactions")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 4
        reaction_ids = [r["id"] for r in data]
        assert "h2o2_decomp" in reaction_ids
        assert "catalase_enzyme" in reaction_ids

    def test_simulate_rate_law_endpoint(self):
        payload = {
            "reaction_name": "N2O5 Decomposition",
            "order": 1,
            "initial_conc_m": 1.5,
            "rate_constant_k": 0.04,
            "total_time_seconds": 60.0,
            "time_steps": 30,
        }
        resp = client.post("/api/v1/chemistry/kinetics/rate-law/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["order"] == 1
        assert data["k_units"] == "s⁻¹"
        assert abs(data["half_life_seconds"] - 17.32) < 0.1
        assert len(data["time_series"]) == 31

    def test_calculate_arrhenius_endpoint(self):
        payload = {
            "t1_c": 20.0,
            "k1": 0.02,
            "t2_c": 40.0,
            "k2": 0.08,
            "target_t_c": 60.0,
        }
        resp = client.post("/api/v1/chemistry/kinetics/arrhenius/calculate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["activation_energy_kj_mol"] > 0
        assert data["predicted_k_at_target"] is not None
        assert data["predicted_k_at_target"] > 0.08
        assert len(data["temp_curve"]) > 5

    def test_simulate_michaelis_menten_endpoint(self):
        payload = {
            "enzyme_name": "Invertase",
            "v_max": 150.0,
            "k_m": 15.0,
            "inhibition_type": "competitive",
            "inhibitor_conc_um": 5.0,
            "k_i_um": 2.5,
            "max_substrate_um": 120.0,
            "steps": 25,
        }
        resp = client.post("/api/v1/chemistry/kinetics/michaelis-menten/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["apparent_v_max"] == 150.0
        # alpha = 1 + 5/2.5 = 3 -> apparent Km = 45.0
        assert abs(data["apparent_k_m"] - 45.0) < 0.1
        assert len(data["saturation_points"]) == 25

    def test_simulate_consecutive_endpoint(self):
        payload = {
            "initial_a_m": 2.0,
            "k1": 0.15,
            "k2": 0.03,
            "total_time_seconds": 80.0,
            "steps": 40,
        }
        resp = client.post("/api/v1/chemistry/kinetics/consecutive/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["t_max_intermediate_seconds"] > 0
        assert len(data["time_series"]) == 41

    def test_invalid_requests(self):
        # Order must be 0, 1, or 2
        bad_order = {"order": 5, "initial_conc_m": 1.0, "rate_constant_k": 0.1}
        resp = client.post("/api/v1/chemistry/kinetics/rate-law/simulate", json=bad_order)
        assert resp.status_code == 422
