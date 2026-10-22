"""Integration tests for Colligative Properties & Solution Chemistry API endpoints."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestColligativeApi:
    def test_get_presets(self):
        """Validates retrieval of colligative benchmark presets."""
        res = client.get("/api/v1/chemistry/colligative/presets")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 8
        ids = [p["id"] for p in data]
        assert "ethanol_water_vle" in ids
        assert "benzene_toluene_ideal" in ids
        assert "seawater_freezing" in ids
        assert "camphor_rast_method" in ids

    def test_get_solvents_and_solutes(self):
        """Validates catalog of solvents and solutes."""
        res_solv = client.get("/api/v1/chemistry/colligative/solvents")
        assert res_solv.status_code == 200
        solvents = res_solv.json()
        assert len(solvents) >= 8
        water = next(s for s in solvents if s["name"] == "Water")
        assert water["kb_c_kg_mol"] == 0.512
        assert water["kf_c_kg_mol"] == 1.86

        res_solute = client.get("/api/v1/chemistry/colligative/solutes")
        assert res_solute.status_code == 200
        solutes = res_solute.json()
        assert len(solutes) >= 6
        nacl = next(s for s in solutes if s["formula"] == "NaCl")
        assert nacl["van_t_hoff_i"] == 2.0

    def test_vapor_pressure_endpoint(self):
        """Validates Raoult's law and Margules VLE calculation via HTTP POST."""
        payload = {
            "solvent1_id": "ethanol",
            "solvent2_id": "water",
            "temperature_c": 78.15,
            "x1_mole_fraction": 0.40,
            "non_ideal_parameter_a12": 1.25,
        }
        res = client.post("/api/v1/chemistry/colligative/vapor-pressure", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["solvent1_name"] == "Ethanol"
        assert data["solvent2_name"] == "Water"
        assert data["total_vapor_pressure_kpa"] > 0
        assert data["azeotrope_detected"] is True
        assert len(data["vle_curve"]) == 21

    def test_boiling_freezing_endpoint(self):
        """Validates ebullioscopy and cryoscopy endpoint."""
        payload = {
            "solvent_id": "water",
            "solute_id": "nacl",
            "solute_mass_g": 5.844,
            "solvent_mass_g": 1000.0,
            "observed_delta_tf_c": 0.372,
        }
        res = client.post("/api/v1/chemistry/colligative/boiling-freezing", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["molality_m"] == pytest.approx(0.10, abs=1e-3)
        assert data["delta_tb_c"] > 0
        assert data["delta_tf_c"] > 0
        assert data["solution_freezing_point_c"] < 0
        assert data["estimated_molar_mass_g_mol"] == pytest.approx(58.44, rel=0.05)

    def test_osmotic_pressure_endpoint(self):
        """Validates van 't Hoff osmotic pressure and Morse correction endpoint."""
        payload = {
            "solute_name": "Normal Saline (0.9% NaCl)",
            "temperature_c": 37.0,
            "solute_mass_g": 9.0,
            "solution_volume_l": 1.0,
            "solute_molar_mass_g_mol": 58.443,
            "van_t_hoff_i": 2.0,
        }
        res = client.post("/api/v1/chemistry/colligative/osmotic-pressure", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["osmotic_pressure_atm"] == pytest.approx(7.85, rel=0.05)
        assert data["is_isotonic_blood"] is True
        assert "Isotonic" in data["tonicity_category"]

    def test_ionic_strength_endpoint(self):
        """Validates Debye-Hückel ionic strength and activity coefficient endpoint."""
        payload = {
            "electrolyte_id": "cacl2",
            "molarity_m": 0.05,
            "temperature_c": 25.0,
            "ion_radius_angstrom": 3.0,
        }
        res = client.post("/api/v1/chemistry/colligative/ionic-strength", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["ionic_strength_i"] == pytest.approx(0.15, abs=1e-4)
        assert 0.0 < data["selected_gamma"] < 1.0
        assert len(data["activity_curve"]) > 5
