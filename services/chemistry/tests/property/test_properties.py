"""
Property-based invariant tests for Chemistry Engine.
"""
import pytest
from services.chemistry.app.services.equation_balancer import equation_balancer
from services.chemistry.app.services.reaction_validator import reaction_validator
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.services.molecular_mass import molecular_mass_engine
from services.chemistry.app.services.element_service import element_service

TEST_EQUATIONS = [
    "H2 + O2 -> H2O",
    "CH4 + O2 -> CO2 + H2O",
    "Fe + O2 -> Fe2O3",
    "Na + Cl2 -> NaCl",
    "C3H8 + O2 -> CO2 + H2O",
    "Al + O2 -> Al2O3",
    "KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2"
]

TEST_FORMULAS = [
    "H2O", "CO2", "CH4", "NaCl", "Ca(OH)2", "Al2(SO4)3",
    "Fe(NO3)3", "(NH4)2SO4", "Ca3(PO4)2", "CuSO4.5H2O"
]


@pytest.mark.parametrize("equation", TEST_EQUATIONS)
def test_property_atom_conservation_in_balanced_equations(equation):
    balanced = equation_balancer.balance(equation)
    val_res = reaction_validator.validate_reaction(balanced.balanced_equation)
    assert val_res.is_balanced is True
    assert val_res.atom_difference == {}


@pytest.mark.parametrize("formula", TEST_FORMULAS)
def test_property_parsed_formula_symbols_and_counts(formula):
    comp = parse_formula(formula)
    for elem, count in comp.elements.items():
        # Verify symbol exists in element DB
        elem_obj = element_service.get_element_by_symbol(elem)
        assert elem_obj is not None
        assert count > 0


@pytest.mark.parametrize("formula", TEST_FORMULAS)
def test_property_molecular_mass_positive(formula):
    mass_res = molecular_mass_engine.calculate(formula)
    assert mass_res.molecular_mass > 0.0
