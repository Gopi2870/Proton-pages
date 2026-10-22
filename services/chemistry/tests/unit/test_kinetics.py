"""
Unit Tests for Reaction Kinetics and Dynamic Transport Service.
Tests zero, first, and second order integrated rate laws, Arrhenius calculations,
Michaelis-Menten enzyme kinetics, and consecutive reaction dynamics.
"""
import pytest
from services.chemistry.app.services.kinetics_service import KineticsService


def test_zero_order_kinetics():
    """Verify zero-order linear decay and half-life dependence on [A]0."""
    res = KineticsService.simulate_rate_law(
        reaction_name="Ammonia Decomposition",
        order=0,
        initial_conc_m=1.0,
        rate_constant_k=0.01,
        total_time_seconds=100.0,
        time_steps=20,
    )
    assert res.order == 0
    assert res.k_units == "M·s⁻¹"
    # t1/2 = [A]0 / (2k) = 1.0 / (2 * 0.01) = 50 s
    assert abs(res.half_life_seconds - 50.0) < 1e-3
    assert len(res.time_series) == 21
    # At t = 50 s, conc should be 0.5 M
    mid = next(p for p in res.time_series if abs(p.time_seconds - 50.0) < 1e-2)
    assert abs(mid.concentration_m - 0.5) < 1e-3


def test_first_order_kinetics():
    """Verify first-order exponential decay and constant half-life."""
    res = KineticsService.simulate_rate_law(
        reaction_name="N2O5 Decomposition",
        order=1,
        initial_conc_m=2.0,
        rate_constant_k=0.05,
        total_time_seconds=60.0,
        time_steps=30,
    )
    assert res.order == 1
    assert res.k_units == "s⁻¹"
    # t1/2 = ln(2) / k = 0.693147 / 0.05 = 13.86 s
    assert abs(res.half_life_seconds - 13.863) < 1e-2
    # At t = 0, conc is 2.0; at large t, conc decreases monotonically
    assert res.time_series[0].concentration_m == 2.0
    assert res.time_series[-1].concentration_m < res.time_series[0].concentration_m


def test_second_order_kinetics():
    """Verify second-order hyperbolic decay and half-life inversely proportional to [A]0."""
    res = KineticsService.simulate_rate_law(
        reaction_name="NO2 Dimerization",
        order=2,
        initial_conc_m=0.5,
        rate_constant_k=0.2,
        total_time_seconds=50.0,
        time_steps=25,
    )
    assert res.order == 2
    assert res.k_units == "M⁻¹·s⁻¹"
    # t1/2 = 1 / (k * [A]0) = 1 / (0.2 * 0.5) = 10 s
    assert abs(res.half_life_seconds - 10.0) < 1e-3
    # At t = 10 s, conc should be 0.25 M
    half_pt = next(p for p in res.time_series if abs(p.time_seconds - 10.0) < 1e-2)
    assert abs(half_pt.concentration_m - 0.25) < 1e-3


def test_arrhenius_activation_energy():
    """Verify two-point Arrhenius activation energy and rate constant prediction."""
    # Data for decomposition: at 25 C (298.15 K), k = 3.46e-5; at 35 C (308.15 K), k = 1.35e-4
    res = KineticsService.solve_arrhenius(
        t1_c=25.0,
        k1=3.46e-5,
        t2_c=35.0,
        k2=1.35e-4,
        target_t_c=45.0,
    )
    # Ea should be approximately 103 kJ/mol
    assert 100.0 < res.activation_energy_kj_mol < 106.0
    assert res.pre_exponential_factor_a > 0
    assert res.rate_constant_k > 1.35e-4  # Higher temperature -> higher rate


def test_michaelis_menten_kinetics_and_inhibition():
    """Verify enzyme kinetics without inhibitor and with competitive inhibition."""
    # Uninhibited
    res_free = KineticsService.simulate_michaelis_menten(
        enzyme_name="Beta-Galactosidase",
        v_max=100.0,
        k_m=10.0,
    )
    assert res_free.apparent_v_max == 100.0
    assert res_free.apparent_k_m == 10.0
    # At [S] = Km, velocity should be 0.5 * Vmax = 50.0
    km_pt = next(p for p in res_free.saturation_points if abs(p.substrate_conc_um - 10.0) < 1.0)
    assert abs(km_pt.velocity_um_s - 50.0) < 2.0

    # Competitive inhibitor: Vmax unchanged, apparent Km increases
    res_comp = KineticsService.simulate_michaelis_menten(
        enzyme_name="Beta-Galactosidase",
        v_max=100.0,
        k_m=10.0,
        inhibition_type="competitive",
        inhibitor_conc_um=2.0,
        k_i_um=1.0,
    )
    assert res_comp.apparent_v_max == 100.0
    # alpha = 1 + [I]/Ki = 1 + 2/1 = 3; Km' = 10 * 3 = 30
    assert abs(res_comp.apparent_k_m - 30.0) < 1e-2


def test_consecutive_reactions_a_b_c():
    """Verify sequential reaction intermediate accumulation and analytical maximum time."""
    k1 = 0.2
    k2 = 0.05
    res = KineticsService.simulate_consecutive_reactions(
        initial_a_m=1.0,
        k1=k1,
        k2=k2,
        total_time_seconds=60.0,
        steps=60,
    )
    # t_max = ln(k1/k2) / (k1 - k2) = ln(4) / 0.15 = 1.38629 / 0.15 = 9.24 s
    assert abs(res.t_max_intermediate_seconds - 9.242) < 0.1
    assert 0.5 < res.max_intermediate_conc_m < 0.7
    assert len(res.time_series) == 61
    # Final product C rises monotonically
    assert res.time_series[-1].conc_c > res.time_series[0].conc_c


def test_invalid_kinetics_inputs():
    """Verify parameter validations throw appropriate ValueErrors."""
    with pytest.raises(ValueError):
        KineticsService.simulate_rate_law("Test", order=3, initial_conc_m=1.0, rate_constant_k=0.1)

    with pytest.raises(ValueError):
        KineticsService.solve_arrhenius(25.0, 0.01, 25.0, 0.01)
