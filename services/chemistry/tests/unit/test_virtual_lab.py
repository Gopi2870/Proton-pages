"""
Unit tests for Virtual Chemistry Laboratory Simulation Service.
"""
import pytest
from services.chemistry.app.services.virtual_lab_service import VirtualLabService


@pytest.fixture
def lab_service():
    return VirtualLabService()


def test_strong_acid_strong_base_equivalence(lab_service):
    """Verify strong acid / strong base titration curve and equivalence point."""
    result = lab_service.calculate_titration_curve(
        system_type="strong_acid_strong_base",
        analyte_volume_ml=25.0,
        analyte_conc_m=0.1,
        titrant_conc_m=0.1,
        indicator="Phenolphthalein",
    )
    assert result.equivalence_volume_ml == 25.0
    assert result.equivalence_ph == 7.00
    assert len(result.curve_points) > 20

    # Find point closest to 25.0 mL
    eq_pt = min(result.curve_points, key=lambda p: abs(p.volume_ml - 25.0))
    assert abs(eq_pt.ph - 7.00) < 0.2
    assert eq_pt.dp_h_dv > 5.0  # Sharp inflection derivative peak


def test_weak_acid_strong_base_buffer_and_pka(lab_service):
    """Verify Henderson-Hasselbalch buffer zone, half-equivalence pKa, and basic equivalence pH."""
    result = lab_service.calculate_titration_curve(
        system_type="weak_acid_strong_base",
        analyte_volume_ml=25.0,
        analyte_conc_m=0.1,
        titrant_conc_m=0.1,
        indicator="Phenolphthalein",
    )
    assert result.equivalence_volume_ml == 25.0
    assert result.equivalence_ph > 8.0  # Basic equivalence point due to acetate hydrolysis
    assert result.half_equivalence_volume_ml == 12.5

    # Check half-equivalence pH matches pKa (4.76)
    half_pt = min(result.curve_points, key=lambda p: abs(p.volume_ml - 12.5))
    assert abs(half_pt.ph - 4.757) < 0.15


def test_strong_acid_weak_base_equivalence(lab_service):
    """Verify weak base titrated with strong acid yields acidic equivalence point."""
    result = lab_service.calculate_titration_curve(
        system_type="strong_acid_weak_base",
        analyte_volume_ml=25.0,
        analyte_conc_m=0.1,
        titrant_conc_m=0.1,
        indicator="Methyl Orange",
    )
    assert result.equivalence_volume_ml == 25.0
    assert result.equivalence_ph < 6.0  # Acidic equivalence point due to NH4+ hydrolysis


def test_indicator_color_transitions(lab_service):
    """Verify indicator color transition thresholds."""
    phenol_clear = lab_service.get_indicator_color(4.0, "Phenolphthalein")
    phenol_pink = lab_service.get_indicator_color(9.0, "Phenolphthalein")
    assert "240, 249, 255" in phenol_clear
    assert "244, 114, 182" in phenol_pink

    bromo_yellow = lab_service.get_indicator_color(4.0, "Bromothymol Blue")
    bromo_blue = lab_service.get_indicator_color(9.0, "Bromothymol Blue")
    assert "234, 179, 8" in bromo_yellow
    assert "37, 99, 235" in bromo_blue


def test_coffee_cup_calorimetry_endothermic(lab_service):
    """Verify ammonium nitrate dissolution yields temperature drop and positive molar enthalpy."""
    sim = lab_service.simulate_calorimetry(
        calorimeter_type="solution_coffee_cup",
        sample_key="nh4no3",
        sample_mass_g=5.0,
        water_mass_g=100.0,
        initial_temp_c=25.0,
        calorimeter_c_j_k=25.0,
    )
    assert not sim.is_exothermic
    assert sim.delta_t_c < 0.0  # Cooling
    assert sim.peak_temp_c < 25.0
    assert abs(sim.molar_enthalpy_kj_mol - 25.7) < 0.5
    assert sim.percent_error < 2.0
    assert len(sim.temperature_curve) > 30


def test_coffee_cup_calorimetry_exothermic(lab_service):
    """Verify calcium chloride dissolution yields temperature rise and negative molar enthalpy."""
    sim = lab_service.simulate_calorimetry(
        calorimeter_type="solution_coffee_cup",
        sample_key="cacl2",
        sample_mass_g=5.0,
        water_mass_g=100.0,
        initial_temp_c=25.0,
        calorimeter_c_j_k=25.0,
    )
    assert sim.is_exothermic
    assert sim.delta_t_c > 0.0  # Heating
    assert sim.peak_temp_c > 25.0
    assert abs(sim.molar_enthalpy_kj_mol - (-82.8)) < 1.0
    assert sim.percent_error < 2.0


def test_bomb_calorimetry_benzoic_acid(lab_service):
    """Verify constant-volume combustion of primary standard benzoic acid."""
    sim = lab_service.simulate_calorimetry(
        calorimeter_type="constant_volume_bomb",
        sample_key="benzoic_acid",
        sample_mass_g=1.0,
        initial_temp_c=25.0,
        calorimeter_c_j_k=10250.0,
    )
    assert sim.is_exothermic
    assert sim.delta_t_c > 0.0
    assert abs(sim.molar_enthalpy_kj_mol - (-3227.0)) < 5.0
    assert sim.percent_error < 1.0
