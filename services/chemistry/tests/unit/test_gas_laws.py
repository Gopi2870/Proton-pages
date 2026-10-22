"""
Unit Tests for Gas Laws and Phase Equilibria Scientific Service.
Tests Ideal Gas equations of state, Van der Waals real gas deviations,
and Maxwell-Boltzmann speed distributions.
"""
import pytest
from services.chemistry.app.services.gas_laws_service import GasLawsService


def test_ideal_gas_solve_pressure():
    """Verify solving for pressure given V, n, T."""
    res = GasLawsService.calculate_ideal_gas(
        volume_liters=22.414,
        moles=1.0,
        temperature_k=273.15,
    )
    # At 0 C and 22.414 L, 1 mole should be 1.0 atm
    assert abs(res.pressure_atm - 1.0) < 1e-3
    assert abs(res.molar_volume_l_mol - 22.414) < 1e-2


def test_ideal_gas_solve_volume_and_density():
    """Verify solving for volume and calculating gas density."""
    res = GasLawsService.calculate_ideal_gas(
        pressure_atm=1.0,
        moles=2.0,
        temperature_c=25.0,  # 298.15 K
        molar_mass_g_mol=44.01,  # CO2
    )
    # V = nRT/P = 2 * 0.082057 * 298.15 = 48.93 L
    assert abs(res.volume_liters - 48.93) < 0.1
    # Density = PM / RT = 1 * 44.01 / (0.082057 * 298.15) = 1.799 g/L
    assert res.density_g_l is not None
    assert abs(res.density_g_l - 1.799) < 0.05


def test_ideal_gas_invalid_arguments():
    """Verify error when too many or too few variables are supplied."""
    with pytest.raises(ValueError):
        GasLawsService.calculate_ideal_gas(pressure_atm=1.0, volume_liters=10.0)  # 2 missing


def test_vanderwaals_real_gas_co2():
    """Verify Van der Waals equation for CO2 under high pressure exhibits Z < 1 due to attraction."""
    # 1 mole CO2 in 1.0 L at 298.15 K
    res = GasLawsService.simulate_vanderwaals(
        gas_id="co2",
        moles=1.0,
        temperature_k=298.15,
        current_volume_liters=1.0,
    )
    assert res.gas_name == "Carbon Dioxide"
    # Intermolecular attraction for CO2 lowers pressure compared to ideal gas
    assert res.p_vdw_atm < res.p_ideal_atm
    assert res.compressibility_z < 1.0
    assert "attraction" in res.regime.lower()
    assert len(res.isotherm_points) > 10


def test_vanderwaals_volume_singularity_error():
    """Verify error raised when volume is smaller than molecular excluded volume nb."""
    with pytest.raises(ValueError):
        # b for CO2 is 0.0429 L/mol, so for 10 moles nb = 0.429 L; 0.1 L is impossible
        GasLawsService.simulate_vanderwaals(
            gas_id="co2",
            moles=10.0,
            current_volume_liters=0.1,
        )


def test_maxwell_boltzmann_distribution_n2():
    """Verify Maxwell-Boltzmann speed distribution for N2 at 298.15 K."""
    res = GasLawsService.calculate_maxwell_boltzmann(
        gas_name="N2",
        molar_mass_g_mol=28.013,
        temperature_k=298.15,
    )
    # v_mp = sqrt(2RT/M) = sqrt(2 * 8.314 * 298.15 / 0.028013) ~ 420.6 m/s
    assert abs(res.v_mp_m_s - 420.6) < 1.0
    # v_rms = sqrt(3RT/M) ~ 515.2 m/s
    assert abs(res.v_rms_m_s - 515.2) < 1.5
    assert res.v_mp_m_s < res.v_avg_m_s < res.v_rms_m_s
    assert len(res.distribution_points) == 51


def test_phase_equilibrium_water():
    """Verify Clausius-Clapeyron vapor pressure of water at boiling point is 101.325 kPa."""
    res = GasLawsService.get_phase_equilibrium("water")
    assert res.substance_name == "Water"
    assert res.normal_boiling_point_c == 100.0

    # At 100 C, vapor pressure should be 101.325 kPa (1 atm)
    pt_100 = next(p for p in res.vapor_pressure_curve if abs(p.temperature_c - 100.0) < 1.0)
    assert abs(pt_100.vapor_pressure_atm - 1.0) < 0.02
    assert abs(pt_100.vapor_pressure_kpa - 101.3) < 2.0
