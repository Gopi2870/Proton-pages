"""
Unit tests for Molecular Mass Engine.
"""
import pytest
from services.chemistry.app.services.molecular_mass import molecular_mass_engine


def test_molecular_mass_h2o():
    res = molecular_mass_engine.calculate("H2O")
    # 2*1.008 + 15.999 = 18.015
    assert res.molecular_mass == pytest.approx(18.015, abs=0.01)
    assert res.unit == "g/mol"
    assert len(res.elemental_contributions) == 2


def test_molecular_mass_co2():
    res = molecular_mass_engine.calculate("CO2")
    # 12.011 + 2*15.999 = 44.009
    assert res.molecular_mass == pytest.approx(44.009, abs=0.01)


def test_molecular_mass_ch4():
    res = molecular_mass_engine.calculate("CH4")
    # 12.011 + 4*1.008 = 16.043
    assert res.molecular_mass == pytest.approx(16.043, abs=0.01)


def test_molecular_mass_nacl():
    res = molecular_mass_engine.calculate("NaCl")
    # 22.990 + 35.45 = 58.44
    assert res.molecular_mass == pytest.approx(58.44, abs=0.05)


def test_molecular_mass_ca_oh2():
    res = molecular_mass_engine.calculate("Ca(OH)2")
    # 40.078 + 2*(15.999 + 1.008) = 74.092
    assert res.molecular_mass == pytest.approx(74.092, abs=0.05)


def test_molecular_mass_al2_so4_3():
    res = molecular_mass_engine.calculate("Al2(SO4)3")
    # 2*26.982 + 3*(32.06 + 4*15.999) = 342.15
    assert res.molecular_mass == pytest.approx(342.15, abs=0.2)


def test_molecular_mass_fe_no3_3():
    res = molecular_mass_engine.calculate("Fe(NO3)3")
    assert res.molecular_mass == pytest.approx(241.86, abs=0.2)


def test_molecular_mass_nh4_2_so4():
    res = molecular_mass_engine.calculate("(NH4)2SO4")
    assert res.molecular_mass == pytest.approx(132.14, abs=0.2)


def test_molecular_mass_ca3_po4_2():
    res = molecular_mass_engine.calculate("Ca3(PO4)2")
    assert res.molecular_mass == pytest.approx(310.18, abs=0.2)
