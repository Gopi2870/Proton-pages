"""
Unit tests for Percent Composition and Empirical Formula Calculation.
"""
import pytest
from services.chemistry.app.services.composition import composition_engine


def test_percent_composition_h2o():
    res = composition_engine.calculate_percent_composition("H2O")
    # H: 2.016/18.015 * 100 = 11.19%, O: 88.81%
    assert res.composition["H"] == pytest.approx(11.19, abs=0.1)
    assert res.composition["O"] == pytest.approx(88.81, abs=0.1)


def test_empirical_formula_derivation():
    # H = 11.19, O = 88.81 -> H2O
    res = composition_engine.calculate_empirical_formula({"H": 11.19, "O": 88.81})
    assert res.empirical_formula in ("H2O", "OH2")
    assert res.element_counts["H"] == 2
    assert res.element_counts["O"] == 1


def test_empirical_formula_glucose():
    # Glucose C6H12O6 -> C=40.0%, H=6.7%, O=53.3% -> Empirical CH2O
    res = composition_engine.calculate_empirical_formula({"C": 40.0, "H": 6.7, "O": 53.3})
    assert res.empirical_formula == "CH2O"
    assert res.element_counts["C"] == 1
    assert res.element_counts["H"] == 2
    assert res.element_counts["O"] == 1
