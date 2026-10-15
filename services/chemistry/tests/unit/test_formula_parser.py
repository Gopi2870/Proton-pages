"""
Unit tests for Chemical Formula Parser and Validator.
"""
import pytest
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.services.formula_validator import formula_validator
from services.chemistry.app.core.exceptions import InvalidFormulaError, UnknownElementError


def test_parse_simple_formulas():
    h2o = parse_formula("H2O")
    assert h2o.elements == {"H": 2, "O": 1}
    assert h2o.total_atoms == 3

    co2 = parse_formula("CO2")
    assert co2.elements == {"C": 1, "O": 2}

    ch4 = parse_formula("CH4")
    assert ch4.elements == {"C": 1, "H": 4}

    nacl = parse_formula("NaCl")
    assert nacl.elements == {"Na": 1, "Cl": 1}


def test_parse_polyatomic_formulas():
    ca_oh2 = parse_formula("Ca(OH)2")
    assert ca_oh2.elements == {"Ca": 1, "O": 2, "H": 2}

    al2_so4_3 = parse_formula("Al2(SO4)3")
    assert al2_so4_3.elements == {"Al": 2, "S": 3, "O": 12}

    fe_no3_3 = parse_formula("Fe(NO3)3")
    assert fe_no3_3.elements == {"Fe": 1, "N": 3, "O": 9}

    nh4_2_so4 = parse_formula("(NH4)2SO4")
    assert nh4_2_so4.elements == {"N": 2, "H": 8, "S": 1, "O": 4}

    ca3_po4_2 = parse_formula("Ca3(PO4)2")
    assert ca3_po4_2.elements == {"Ca": 3, "P": 2, "O": 8}


def test_parse_hydrates():
    cuso4_5h2o = parse_formula("CuSO4.5H2O")
    assert cuso4_5h2o.elements == {"Cu": 1, "S": 1, "O": 9, "H": 10}
    assert cuso4_5h2o.hydrate_water_molecules == 5.0


def test_parse_charged_species():
    fe3 = parse_formula("Fe+3")
    assert fe3.charge == 3
    assert fe3.elements == {"Fe": 1}

    so4_2 = parse_formula("SO4-2")
    assert so4_2.charge == -2
    assert so4_2.elements == {"S": 1, "O": 4}


def test_formula_distinguishes_ca_from_c_and_a():
    ca = parse_formula("Ca")
    assert ca.elements == {"Ca": 1}
    assert "C" not in ca.elements


def test_invalid_formulas_rejected():
    invalid_cases = ["Xx2", "H0", "C-2", "()", "Ca(", "2H", "NaCl)"]
    for formula in invalid_cases:
        res = formula_validator.validate(formula)
        assert res.is_valid is False
        assert len(res.errors) > 0
