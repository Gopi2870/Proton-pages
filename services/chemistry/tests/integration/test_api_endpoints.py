"""
Integration Tests for FastAPI Chemistry Gateway Endpoints.
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)

class TestHealthEndpoints:
    def test_root_health(self):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "proton-pages-chemistry"
        assert data["engine_ready"] is True
        assert "X-Request-ID" in response.headers
        assert "X-Process-Time" in response.headers

    def test_v1_health(self):
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"

class TestElementsEndpoints:
    def test_list_elements(self):
        response = client.get("/api/v1/chemistry/elements?skip=0&limit=10")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 10
        assert data[0]["symbol"] == "H"
        assert data[0]["atomic_number"] == 1

    def test_get_element_by_number(self):
        response = client.get("/api/v1/chemistry/elements/6")
        assert response.status_code == 200
        data = response.json()
        assert data["symbol"] == "C"
        assert data["name"] == "Carbon"
        assert data["atomic_number"] == 6

    def test_get_element_by_symbol(self):
        response = client.get("/api/v1/chemistry/elements/Au")
        assert response.status_code == 200
        data = response.json()
        assert data["symbol"] == "Au"
        assert data["name"] == "Gold"

    def test_get_element_not_found(self):
        response = client.get("/api/v1/chemistry/elements/999")
        assert response.status_code == 404
        assert "error" in response.json()

    def test_search_elements(self):
        response = client.get("/api/v1/chemistry/elements/search?q=Oxygen")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        assert any(e["symbol"] == "O" for e in data)

class TestCompoundsEndpoints:
    def test_get_compound_by_formula(self):
        response = client.get("/api/v1/chemistry/compounds/H2O")
        assert response.status_code == 200
        data = response.json()
        assert data["formula"] == "H2O"
        assert "Water" in data["name"]

    def test_get_compound_not_found(self):
        response = client.get("/api/v1/chemistry/compounds/UnknownSubstance9999")
        assert response.status_code == 404

    def test_search_compounds(self):
        response = client.get("/api/v1/chemistry/compounds/search?q=water")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1

class TestFormulasEndpoints:
    def test_parse_formula(self):
        response = client.post("/api/v1/chemistry/formulas/parse", json={"formula": "Ca(OH)2"})
        assert response.status_code == 200
        data = response.json()
        assert data["total_atoms"] == 5
        assert data["elements"]["Ca"] == 1
        assert data["elements"]["O"] == 2
        assert data["elements"]["H"] == 2

    def test_molecular_mass(self):
        response = client.post("/api/v1/chemistry/formulas/mass", json={"formula": "H2O"})
        assert response.status_code == 200
        data = response.json()
        assert pytest.approx(data["molecular_mass"], 0.05) == 18.015

    def test_percent_composition(self):
        response = client.post("/api/v1/chemistry/formulas/composition", json={"formula": "H2O"})
        assert response.status_code == 200
        data = response.json()
        assert "H" in data["composition"]
        assert "O" in data["composition"]

    def test_empirical_formula(self):
        response = client.post(
            "/api/v1/chemistry/formulas/empirical",
            json={"elemental_data": {"H": 11.19, "O": 88.81}}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["empirical_formula"] == "H2O"

    def test_invalid_formula(self):
        response = client.post("/api/v1/chemistry/formulas/parse", json={"formula": "H2(("})
        assert response.status_code == 422
        data = response.json()
        assert "error" in data

class TestReactionsEndpoints:
    def test_balance_reaction(self):
        response = client.post(
            "/api/v1/chemistry/reactions/balance",
            json={"equation": "CH4 + O2 -> CO2 + H2O"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["balanced_equation"] == "CH4 + 2O2 -> CO2 + 2H2O"

    def test_parse_reaction(self):
        response = client.post(
            "/api/v1/chemistry/reactions/parse",
            json={"equation": "2H2(g) + O2(g) -> 2H2O(l)"}
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data["reactants"]) == 2
        assert len(data["products"]) == 1

    def test_classify_reaction(self):
        response = client.post(
            "/api/v1/chemistry/reactions/classify",
            json={"equation": "CH4 + 2O2 -> CO2 + 2H2O"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["primary_type"] == "combustion"

class TestStoichiometryEndpoints:
    def test_limiting_reactant(self):
        response = client.post(
            "/api/v1/chemistry/stoichiometry/limiting-reactant",
            json={
                "equation": "2H2 + O2 -> 2H2O",
                "reactants": [
                    {"formula": "H2", "amount": 2.0, "unit": "mol"},
                    {"formula": "O2", "amount": 5.0, "unit": "mol"}
                ]
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["limiting_reactant"] == "H2"

    def test_molarity(self):
        response = client.post(
            "/api/v1/chemistry/stoichiometry/molarity",
            json={"moles": 0.5, "volume_liters": 1.0}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["molarity"] == 0.5

    def test_unit_conversion(self):
        response = client.post(
            "/api/v1/chemistry/stoichiometry/convert-units",
            json={"value": 1000.0, "from_unit": "mg", "to_unit": "g", "unit_type": "mass"}
        )
        assert response.status_code == 200
        data = response.json()
        assert pytest.approx(data["converted_value"], 0.001) == 1.0

class TestSearchEndpoints:
    def test_unified_search(self):
        response = client.get("/api/v1/chemistry/search?q=water")
        assert response.status_code == 200
        data = response.json()
        assert "elements" in data or "compounds" in data

class TestMixerEndpoints:
    def test_mixer_simulation_api(self):
        response = client.post(
            "/api/v1/chemistry/mixer/simulate",
            json={
                "reagents": [
                    {"name": "Silver Nitrate", "formula": "AgNO3", "volume_ml": 20.0, "concentration_m": 0.1},
                    {"name": "Hydrochloric Acid", "formula": "HCl", "volume_ml": 20.0, "concentration_m": 0.1}
                ]
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["total_volume_ml"] == 40.0
        assert len(data["precipitates"]) == 1
        assert data["precipitates"][0]["formula"] == "AgCl(s)"
        assert "net_ionic_equation" in data
