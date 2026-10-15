"""
Unit tests for Stoichiometry Engine.
"""
import pytest
from services.chemistry.app.services.stoichiometry import stoichiometry_engine
from services.chemistry.app.models.stoichiometry import ReactantAmountInput


def test_limiting_reactant_water():
    # 2H2 + O2 -> 2H2O
    # 4.0 g H2 (~2.0 mol), 32.0 g O2 (1.0 mol) -> exact stoichiometric ratio
    # Let's give 4.0 g H2 (~2.0 mol) and 16.0 g O2 (0.5 mol) -> O2 is limiting!
    inputs = [
        ReactantAmountInput(formula="H2", amount=4.0, unit="g"),
        ReactantAmountInput(formula="O2", amount=16.0, unit="g")
    ]
    res = stoichiometry_engine.calculate_limiting_reactant("2H2 + O2 -> 2H2O", inputs)
    assert res.limiting_reactant == "O2"
    assert len(res.products_breakdown) == 1
    # 0.5 mol O2 yields 1.0 mol H2O = 18.015 g H2O
    assert res.products_breakdown[0].theoretical_yield_grams == pytest.approx(18.015, abs=0.1)


def test_percent_yield():
    res = stoichiometry_engine.calculate_percent_yield(actual_yield_g=16.0, theoretical_yield_g=18.0)
    assert res.percent_yield == pytest.approx(88.89, abs=0.01)


def test_molarity():
    res = stoichiometry_engine.molarity(moles=0.5, volume_liters=2.0)
    assert res.molarity == 0.25


def test_dilution_m1v1():
    # M1*V1 = M2*V2 => M1=12M, V1=0.1L, M2=1M => V2 = 12*0.1/1 = 1.2L
    res = stoichiometry_engine.dilution(m1=12.0, v1=0.1, m2=1.0, v2=None)
    assert res.solved_variable == "v2"
    assert res.solved_value == pytest.approx(1.2, abs=0.001)
