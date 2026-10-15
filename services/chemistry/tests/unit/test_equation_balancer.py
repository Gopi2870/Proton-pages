"""
Unit tests for Mathematical Chemical Equation Balancer.
"""
import pytest
from services.chemistry.app.services.equation_balancer import equation_balancer
from services.chemistry.app.core.exceptions import UnsupportedChemistryOperationError


def test_balance_water_synthesis():
    res = equation_balancer.balance("H2 + O2 -> H2O")
    assert res.is_balanced is True
    assert res.coefficients == [2, 1, 2]
    assert "2H2" in res.balanced_equation
    assert "2H2O" in res.balanced_equation


def test_balance_methane_combustion():
    res = equation_balancer.balance("CH4 + O2 -> CO2 + H2O")
    assert res.is_balanced is True
    assert res.coefficients == [1, 2, 1, 2]
    assert "2O2" in res.balanced_equation
    assert "2H2O" in res.balanced_equation


def test_balance_iron_oxidation():
    res = equation_balancer.balance("Fe + O2 -> Fe2O3")
    assert res.is_balanced is True
    assert res.coefficients == [4, 3, 2]


def test_balance_sodium_chloride():
    res = equation_balancer.balance("Na + Cl2 -> NaCl")
    assert res.is_balanced is True
    assert res.coefficients == [2, 1, 2]


def test_balance_propane_combustion():
    res = equation_balancer.balance("C3H8 + O2 -> CO2 + H2O")
    assert res.is_balanced is True
    assert res.coefficients == [1, 5, 3, 4]


def test_balance_aluminum_oxidation():
    res = equation_balancer.balance("Al + O2 -> Al2O3")
    assert res.is_balanced is True
    assert res.coefficients == [4, 3, 2]


def test_impossible_equation_raises_error():
    with pytest.raises(UnsupportedChemistryOperationError):
        equation_balancer.balance("H2 -> O2")
