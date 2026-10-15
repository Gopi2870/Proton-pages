"""
Integration tests for ChemistryEngine Python Library Facade.
"""
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.stoichiometry import ReactantAmountInput


def test_library_element_lookup():
    elem = chemistry_engine.get_element("H")
    assert elem.atomic_number == 1
    assert elem.name == "Hydrogen"

    elements = chemistry_engine.list_elements()
    assert len(elements) == 118


def test_library_formula_operations():
    mass_res = chemistry_engine.calculate_molecular_mass("H2O")
    assert mass_res.molecular_mass == 18.015

    comp_res = chemistry_engine.calculate_percent_composition("H2O")
    assert comp_res.composition["H"] == 11.19


def test_library_reaction_balancing():
    balanced = chemistry_engine.balance_reaction("CH4 + O2 -> CO2 + H2O")
    assert balanced.is_balanced is True
    assert balanced.coefficients == [1, 2, 1, 2]


def test_library_stoichiometry():
    inputs = [
        ReactantAmountInput(formula="H2", amount=4.0, unit="g"),
        ReactantAmountInput(formula="O2", amount=16.0, unit="g")
    ]
    lim_res = chemistry_engine.calculate_limiting_reactant("2H2 + O2 -> 2H2O", inputs)
    assert lim_res.limiting_reactant == "O2"


def test_library_unified_search():
    search_res = chemistry_engine.search("water")
    assert search_res["total_results"] > 0
