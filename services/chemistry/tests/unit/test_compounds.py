"""
Unit tests for Compound Service.
"""
import pytest
from services.chemistry.app.services.compound_service import compound_service
from services.chemistry.app.core.exceptions import CompoundNotFoundError


def test_get_compound_by_id():
    water = compound_service.get_compound_by_id("comp-h2o")
    assert water.name == "Water"
    assert water.formula == "H2O"


def test_get_compound_by_formula():
    nacl = compound_service.get_compound_by_formula("nacl")
    assert nacl.name == "Sodium Chloride"
    assert nacl.molecular_mass == 58.44


def test_get_compound_by_name():
    ch4 = compound_service.get_compound_by_name("methane")
    assert ch4.formula == "CH4"


def test_search_compounds():
    results = compound_service.search_compounds("acid")
    assert len(results) >= 2
    names = [c.name for c in results]
    assert "Sulfuric Acid" in names or "Hydrochloric Acid" in names


def test_compound_not_found():
    with pytest.raises(CompoundNotFoundError):
        compound_service.get_compound_by_id("comp-non-existent")
