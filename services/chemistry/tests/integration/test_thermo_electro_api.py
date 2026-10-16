"""
Integration Tests for Thermochemistry and Electrochemistry API Endpoints.
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)

class TestThermochemistryAPI:
    def test_get_species_list(self):
        res = client.get("/api/v1/chemistry/thermo/species")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 20
        assert any(item["formula"] == "CO2(g)" for item in data)

    def test_get_species_by_query(self):
        res = client.get("/api/v1/chemistry/thermo/species?query=H2O")
        assert res.status_code == 200
        data = res.json()
        assert len(data) == 1
        assert "H2O" in data[0]["formula"]

    def test_calculate_reaction_thermo_equation(self):
        payload = {
            "equation": "CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)",
            "temperature_kelvin": 298.15
        }
        res = client.post("/api/v1/chemistry/thermo/calculate", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["is_exothermic"] is True
        assert pytest.approx(data["delta_h_standard_kj"], abs=1.0) == -890.3

    def test_hess_law_endpoint(self):
        payload = {
            "target_equation": "C(s) + 0.5 O2(g) -> CO(g)",
            "intermediate_reactions": [
                {"equation": "C(s) + O2(g) -> CO2(g)", "delta_h_kj": -393.51},
                {"equation": "CO(g) + 0.5 O2(g) -> CO2(g)", "delta_h_kj": -282.98}
            ]
        }
        res = client.post("/api/v1/chemistry/thermo/hess-solve", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["is_solvable"] is True
        assert pytest.approx(data["target_delta_h_kj"], abs=0.5) == -110.53

class TestElectrochemistryAPI:
    def test_get_reduction_potentials(self):
        res = client.get("/api/v1/chemistry/electrochemistry/reduction-potentials")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 15
        assert data[0]["potential_volts"] >= data[-1]["potential_volts"]

    def test_galvanic_cell_endpoint(self):
        payload = {
            "cathode_species": "Cu(2+)",
            "anode_species": "Zn(2+)",
            "cathode_molarity": 1.0,
            "anode_molarity": 0.1,
            "temperature_kelvin": 298.15
        }
        res = client.post("/api/v1/chemistry/electrochemistry/cell-potential", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["is_spontaneous"] is True
        assert pytest.approx(data["standard_potential_volts"], abs=0.02) == 1.10
        assert data["cell_potential_volts"] > data["standard_potential_volts"]

    def test_electrolysis_endpoint(self):
        payload = {
            "species": "Cu",
            "molar_mass_g_mol": 63.546,
            "electrons_per_ion_n": 2,
            "current_amperes": 2.0,
            "time_seconds": 1800.0
        }
        res = client.post("/api/v1/chemistry/electrochemistry/electrolysis", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert pytest.approx(data["mass_deposited_grams"], abs=0.05) == 1.19
