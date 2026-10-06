"""
Integration tests for Chemistry Engine REST API endpoints.
"""
def test_get_elements(api_client):
    response = api_client.get("/api/v1/chemistry/elements")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 118
    assert len(data["elements"]) == 118


def test_get_element_by_symbol(api_client):
    response = api_client.get("/api/v1/chemistry/elements/H")
    assert response.status_code == 200
    data = response.json()
    assert data["atomic_number"] == 1
    assert data["name"] == "Hydrogen"


def test_parse_formula_api(api_client):
    response = api_client.post("/api/v1/chemistry/formulas/parse", json={"formula": "Ca(OH)2"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_valid"] is True
    assert data["composition"]["elements"] == {"Ca": 1, "O": 2, "H": 2}


def test_calculate_mass_api(api_client):
    response = api_client.post("/api/v1/chemistry/formulas/mass", json={"formula": "H2O"})
    assert response.status_code == 200
    data = response.json()
    assert data["molecular_mass"] == 18.015


def test_balance_reaction_api(api_client):
    response = api_client.post("/api/v1/chemistry/reactions/balance", json={"equation": "CH4 + O2 -> CO2 + H2O"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_balanced"] is True
    assert data["coefficients"] == [1, 2, 1, 2]


def test_limiting_reactant_api(api_client):
    payload = {
        "equation": "2H2 + O2 -> 2H2O",
        "reactants": [
            {"formula": "H2", "amount": 4.0, "unit": "g"},
            {"formula": "O2", "amount": 16.0, "unit": "g"}
        ]
    }
    response = api_client.post("/api/v1/chemistry/stoichiometry/limiting-reactant", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["limiting_reactant"] == "O2"


def test_search_api(api_client):
    response = api_client.get("/api/v1/chemistry/search?q=water")
    assert response.status_code == 200
    data = response.json()
    assert data["total_results"] > 0
