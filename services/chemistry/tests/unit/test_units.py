"""
Unit tests for Unit System Conversions.
"""
import pytest
from services.chemistry.app.core.units import convert_mass, convert_amount, convert_volume, convert_concentration
from services.chemistry.app.core.exceptions import InvalidUnitError


def test_convert_mass():
    assert convert_mass(1.0, "kg", "g") == 1000.0
    assert convert_mass(1000.0, "mg", "g") == 1.0


def test_convert_volume():
    assert convert_volume(500.0, "mL", "L") == 0.5


def test_invalid_unit_raises_error():
    with pytest.raises(InvalidUnitError):
        convert_mass(10.0, "pounds", "g")
