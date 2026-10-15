"""
Unit System and Conversions for Chemical Calculations.
"""
from services.chemistry.app.core.exceptions import InvalidUnitError
from services.chemistry.app.core.constants import (
    SUPPORTED_MASS_UNITS,
    SUPPORTED_AMOUNT_UNITS,
    SUPPORTED_VOLUME_UNITS,
    SUPPORTED_CONCENTRATION_UNITS
)

# Conversion factors to base units (g, mol, L, M)
MASS_TO_GRAMS = {
    "g": 1.0,
    "kg": 1000.0,
    "mg": 0.001,
}

AMOUNT_TO_MOLES = {
    "mol": 1.0,
    "mmol": 0.001,
}

VOLUME_TO_LITERS = {
    "L": 1.0,
    "mL": 0.001,
}

CONCENTRATION_TO_MOLAR = {
    "M": 1.0,
    "mol/L": 1.0,
    "mM": 0.001,
}

def convert_mass(value: float, from_unit: str, to_unit: str = "g") -> float:
    if from_unit not in MASS_TO_GRAMS:
        raise InvalidUnitError(from_unit, SUPPORTED_MASS_UNITS)
    if to_unit not in MASS_TO_GRAMS:
        raise InvalidUnitError(to_unit, SUPPORTED_MASS_UNITS)
    grams = value * MASS_TO_GRAMS[from_unit]
    return grams / MASS_TO_GRAMS[to_unit]

def convert_amount(value: float, from_unit: str, to_unit: str = "mol") -> float:
    if from_unit not in AMOUNT_TO_MOLES:
        raise InvalidUnitError(from_unit, SUPPORTED_AMOUNT_UNITS)
    if to_unit not in AMOUNT_TO_MOLES:
        raise InvalidUnitError(to_unit, SUPPORTED_AMOUNT_UNITS)
    moles = value * AMOUNT_TO_MOLES[from_unit]
    return moles / AMOUNT_TO_MOLES[to_unit]

def convert_volume(value: float, from_unit: str, to_unit: str = "L") -> float:
    if from_unit not in VOLUME_TO_LITERS:
        raise InvalidUnitError(from_unit, SUPPORTED_VOLUME_UNITS)
    if to_unit not in VOLUME_TO_LITERS:
        raise InvalidUnitError(to_unit, SUPPORTED_VOLUME_UNITS)
    liters = value * VOLUME_TO_LITERS[from_unit]
    return liters / VOLUME_TO_LITERS[to_unit]

def convert_concentration(value: float, from_unit: str, to_unit: str = "M") -> float:
    if from_unit not in CONCENTRATION_TO_MOLAR:
        raise InvalidUnitError(from_unit, SUPPORTED_CONCENTRATION_UNITS)
    if to_unit not in CONCENTRATION_TO_MOLAR:
        raise InvalidUnitError(to_unit, SUPPORTED_CONCENTRATION_UNITS)
    molar = value * CONCENTRATION_TO_MOLAR[from_unit]
    return molar / CONCENTRATION_TO_MOLAR[to_unit]
