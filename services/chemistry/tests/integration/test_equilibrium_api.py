"""Integration Tests for Chemical Equilibrium & Le Chatelier API Endpoints."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestEquilibriumEndpoints:
    def test_list_equilibrium_presets(self):
        resp = client.get("/api/v1/chemistry/equilibrium/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 4
        preset_ids = [p["id"] for p in data]
        assert "haber_bosch" in preset_ids
        assert "no2_dimerization" in preset_ids
        assert "cobalt_complex" in preset_ids

    def test_solve_rice_table_endpoint(self):
        payload = {
            "equilibrium_constant_k": 2.5,
            "participants": [
                {"formula": "A", "name": "Reactant A", "coefficient": 1, "is_product": False, "initial_concentration": 1.0},
                {"formula": "B", "name": "Product B", "coefficient": 1, "is_product": True, "initial_concentration": 0.0},
            ],
        }
        resp = client.post("/api/v1/chemistry/equilibrium/rice-table", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["converged"]
        assert data["shift_direction"] == "forward"
        assert len(data["rows"]) == 2
        # K = 2.5 for A <=> B => B_eq / A_eq = 2.5 => xi / (1 - xi) = 2.5 => xi = 2.5/3.5 ~ 0.714
        assert data["extent_of_reaction_xi"] == pytest.approx(0.714, abs=0.01)

    def test_polyprotic_acid_endpoint(self):
        payload = {
            "acid_name": "Carbonic Acid",
            "acid_formula": "H2CO3",
            "total_concentration_ca": 0.05,
            "dissociation_constants_ka": [4.3e-7, 4.8e-11],
        }
        resp = client.post("/api/v1/chemistry/equilibrium/polyprotic-acid", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["ph"] > 3.0
        assert data["ph"] < 5.0
        assert len(data["species_fractions"]) == 3

    def test_buffer_capacity_endpoint(self):
        payload = {
            "buffer_name": "Phosphate Buffer",
            "acid_component": "H2PO4-",
            "base_component": "HPO4 2-",
            "pka": 7.20,
            "total_buffer_concentration_m": 0.05,
            "ratio_base_to_acid": 1.0,
            "added_strong_acid_m": 0.005,
            "added_strong_base_m": 0.005,
        }
        resp = client.post("/api/v1/chemistry/equilibrium/buffer-capacity", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["henderson_hasselbalch_ph"] == 7.20
        assert data["van_slyke_buffer_capacity_beta"] > 0
        assert len(data["buffer_curve"]) == 51

    def test_solubility_ksp_endpoint(self):
        payload = {
            "salt_name": "Silver Chloride",
            "salt_formula": "AgCl",
            "ksp_value": 1.77e-10,
            "molar_mass_g_mol": 143.32,
            "cation_formula": "Ag+",
            "cation_coefficient": 1,
            "anion_formula": "Cl-",
            "anion_coefficient": 1,
            "common_ion_formula": "Cl-",
            "common_ion_concentration": 0.05,
        }
        resp = client.post("/api/v1/chemistry/equilibrium/solubility-ksp", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        # [Ag+] = Ksp / [Cl-] = 1.77e-10 / 0.05 ~ 3.54e-9 mol/L
        assert data["molar_solubility_mol_l"] == pytest.approx(3.54e-9, rel=0.05)

    def test_le_chatelier_endpoint(self):
        payload = {
            "preset_reaction_id": "no2_dimerization",
            "perturbation_type": "concentration_spike",
            "concentration_changes": {"NO2": 0.30},
            "pressure_multiplier": 1.0,
            "temperature_k": 298.15,
        }
        resp = client.post("/api/v1/chemistry/equilibrium/le-chatelier", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        # Adding NO2 (reactant) causes shift forward toward N2O4
        assert data["le_chatelier_shift"] == "forward"
        assert len(data["pedagogical_explanation"]) > 20
