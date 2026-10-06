"""
Unit tests for Element Service.
"""
import pytest
from services.chemistry.app.services.element_service import element_service
from services.chemistry.app.core.exceptions import ElementNotFoundError


def test_element_count():
    elements = element_service.list_elements()
    assert len(elements) == 118


def test_get_element_by_atomic_number():
    h = element_service.get_element_by_atomic_number(1)
    assert h.symbol == "H"
    assert h.name == "Hydrogen"
    assert h.atomic_mass == 1.008

    og = element_service.get_element_by_atomic_number(118)
    assert og.symbol == "Og"
    assert og.name == "Oganesson"


def test_get_element_by_symbol_case_insensitive():
    elem_h = element_service.get_element_by_symbol("h")
    assert elem_h.atomic_number == 1

    elem_fe = element_service.get_element_by_symbol("fE")
    assert elem_fe.name == "Iron"
    assert elem_fe.atomic_number == 26


def test_get_element_by_name_case_insensitive():
    elem = element_service.get_element_by_name("cALCiUM")
    assert elem.symbol == "Ca"
    assert elem.atomic_number == 20


def test_element_not_found():
    with pytest.raises(ElementNotFoundError):
        element_service.get_element_by_atomic_number(999)

    with pytest.raises(ElementNotFoundError):
        element_service.get_element_by_symbol("Xx")


def test_element_filtering():
    alkali = element_service.filter_elements_by_category("alkali_metal")
    symbols = [e.symbol for e in alkali]
    assert "Li" in symbols
    assert "Na" in symbols
    assert "K" in symbols

    period1 = element_service.filter_elements_by_period(1)
    assert len(period1) == 2
    assert [e.symbol for e in period1] == ["H", "He"]
