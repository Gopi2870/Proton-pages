"""Unit tests for Polymer Chemistry & Macromolecular Architecture Service."""

import pytest
from app.models.polymer_chemistry import (
    PolymerizationMechanism,
    RadicalTerminationMode,
)
from app.services.polymer_service import polymer_service


def test_carothers_equimolar_step_growth():
    """Verify Carothers equation Xn = 1/(1 - p) and PDI = 1 + p for equimolar bifunctional monomers."""
    analysis = polymer_service.evaluate_carothers(
        conversion_p=0.98,
        stoichiometric_ratio_r=1.0,
        average_functionality=2.0,
        monomer_mw=113.16,
    )

    # At p = 0.98: Xn = 1 / (1 - 0.98) = 50.0
    assert analysis.degree_of_polymerization_xn == pytest.approx(50.0, rel=1e-2)
    # Xw = (1 + 0.98) / (1 - 0.98) = 99.0
    assert analysis.weight_degree_of_polymerization_xw == pytest.approx(99.0, rel=1e-2)
    # PDI = 1 + p = 1.98
    assert analysis.polydispersity_index == pytest.approx(1.98, rel=1e-2)
    assert not analysis.is_gel_formed
    assert analysis.gel_point_pc is None


def test_carothers_stoichiometric_imbalance():
    """Verify that stoichiometric mismatch limits the maximum degree of polymerization."""
    # With 2% excess of monomer B (r = 0.98), at full conversion p = 1.0:
    # Xn = (1 + r) / (1 - r) = 1.98 / 0.02 = 99.0
    analysis = polymer_service.evaluate_carothers(
        conversion_p=0.999,
        stoichiometric_ratio_r=0.98,
        average_functionality=2.0,
        monomer_mw=100.0,
    )
    assert analysis.degree_of_polymerization_xn < 100.0


def test_flory_stockmayer_gelation():
    """Verify Flory-Stockmayer gelation point pc = 2 / fav for branching polycondensation."""
    # fav = 2.5 implies pc = 2 / 2.5 = 0.80 (80% conversion)
    pre_gel = polymer_service.evaluate_carothers(
        conversion_p=0.75,
        stoichiometric_ratio_r=1.0,
        average_functionality=2.5,
        monomer_mw=200.0,
    )
    assert pre_gel.gel_point_pc == pytest.approx(0.80, rel=1e-2)
    assert not pre_gel.is_gel_formed

    post_gel = polymer_service.evaluate_carothers(
        conversion_p=0.85,
        stoichiometric_ratio_r=1.0,
        average_functionality=2.5,
        monomer_mw=200.0,
    )
    assert post_gel.is_gel_formed


def test_radical_polymerization_kinetics_qssa():
    """Verify steady-state radical concentration [M*], rate Rp, and kinetic chain length nu."""
    kinetics = polymer_service.evaluate_radical_kinetics(
        monomer_conc=5.0,
        initiator_conc=0.01,
        kd=1.0e-5,
        f_eff=0.60,
        kp=500.0,
        kt=2.0e7,
        temp_c=60.0,
        termination_mode=RadicalTerminationMode.DISPROPORTIONATION,
        conversion_p=0.20,
    )

    # [M*] = sqrt(0.6 * 1e-5 * 0.01 / 2e7) = sqrt(6e-8 / 2e7) = sqrt(3e-15) ~ 5.48e-8 mol/L
    assert kinetics.radical_concentration_m > 0
    assert kinetics.polymerization_rate_rp_mol_l_s > 0
    assert kinetics.kinetic_chain_length_nu > 10.0
    # In disproportionation, predicted Xn = nu
    assert kinetics.predicted_xn == pytest.approx(kinetics.kinetic_chain_length_nu, rel=1e-2)
    assert not kinetics.autoacceleration_trommsdorff

    # Trommsdorff effect triggers at conversion >= 0.40
    gel_kinetics = polymer_service.evaluate_radical_kinetics(
        monomer_conc=5.0,
        initiator_conc=0.01,
        kd=1.0e-5,
        f_eff=0.60,
        kp=500.0,
        kt=2.0e7,
        temp_c=60.0,
        termination_mode=RadicalTerminationMode.DISPROPORTIONATION,
        conversion_p=0.55,
    )
    assert gel_kinetics.autoacceleration_trommsdorff
    # Due to gel effect, termination rate kt drops, increasing radical conc and Rp
    assert gel_kinetics.polymerization_rate_rp_mol_l_s > kinetics.polymerization_rate_rp_mol_l_s


def test_flory_huggins_thermodynamics():
    """Verify Flory-Huggins critical chi parameter and phase stability envelope."""
    n = 100
    # chi_c = 0.5 * (1 + 1/sqrt(100))^2 = 0.5 * (1.1)^2 = 0.605
    fh_miscible = polymer_service.evaluate_flory_huggins(degree_of_polymerization_n=n, chi_parameter=0.40)
    assert fh_miscible.critical_chi == pytest.approx(0.605, rel=1e-2)
    assert not fh_miscible.is_phase_separated
    assert len(fh_miscible.curve_points) > 20

    fh_immiscible = polymer_service.evaluate_flory_huggins(degree_of_polymerization_n=n, chi_parameter=0.75)
    assert fh_immiscible.is_phase_separated


def test_polymer_presets_catalog():
    """Verify standard polymer presets return expected mechanism and molecular weights."""
    nylon = polymer_service.get_preset_simulation("nylon_6_6", custom_conversion=0.985)
    assert nylon.mechanism == PolymerizationMechanism.STEP_GROWTH
    assert nylon.number_average_mn > 10000.0
    assert nylon.polydispersity_index == pytest.approx(1.985, rel=1e-2)

    pmma = polymer_service.get_preset_simulation("pmma")
    assert pmma.mechanism == PolymerizationMechanism.CHAIN_GROWTH_RADICAL
    assert pmma.radical_kinetics is not None
    assert len(pmma.distribution_curve) > 30
