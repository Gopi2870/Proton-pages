"""Unit tests for Chemical Equilibrium, Buffer Capacity & Le Chatelier Service."""

import pytest
from app.models.equilibrium import ShiftDirection, PerturbationType
from app.schemas.equilibrium import ReactionParticipantSchema
from app.services.equilibrium_service import equilibrium_service


def test_rice_table_forward_shift():
    """Verify RICE solver when Q < K, extent xi > 0, and dynamic equilibrium is reached."""
    # N2 + 3 H2 <=> 2 NH3 with K = 0.50
    participants = [
        ReactionParticipantSchema(formula="N2", name="Nitrogen", coefficient=1, is_product=False, initial_concentration=2.0),
        ReactionParticipantSchema(formula="H2", name="Hydrogen", coefficient=3, is_product=False, initial_concentration=2.0),
        ReactionParticipantSchema(formula="NH3", name="Ammonia", coefficient=2, is_product=True, initial_concentration=0.1),
    ]

    res = equilibrium_service.solve_rice_table(equilibrium_constant_k=0.50, participants=participants)

    assert res.converged
    assert res.shift_direction == ShiftDirection.FORWARD
    assert res.extent_of_reaction_xi > 0
    # Mass balance and non-negativity
    for row in res.rows:
        assert row.equilibrium >= 0.0
        if not row.is_product:
            assert row.equilibrium < row.initial
        else:
            assert row.equilibrium > row.initial


def test_rice_table_reverse_shift():
    """Verify RICE solver when Q > K, extent xi < 0, and system shifts toward reactants."""
    participants = [
        ReactionParticipantSchema(formula="A", name="Reactant A", coefficient=1, is_product=False, initial_concentration=0.01),
        ReactionParticipantSchema(formula="B", name="Product B", coefficient=1, is_product=True, initial_concentration=2.0),
    ]

    res = equilibrium_service.solve_rice_table(equilibrium_constant_k=1.0, participants=participants)

    assert res.converged
    assert res.shift_direction == ShiftDirection.REVERSE
    assert res.extent_of_reaction_xi < 0
    row_a = next(r for r in res.rows if r.species_formula == "A")
    row_b = next(r for r in res.rows if r.species_formula == "B")
    assert row_a.equilibrium > row_a.initial
    assert row_b.equilibrium < row_b.initial
    # At equilibrium for 1:1 with K = 1.0, [A]eq == [B]eq ~ 1.005
    assert row_a.equilibrium == pytest.approx(row_b.equilibrium, rel=1e-3)


def test_polyprotic_acid_phosphoric():
    """Verify triprotic phosphoric acid H3PO4 (Ka1=7.11e-3, Ka2=6.32e-8, Ka3=4.49e-13)."""
    res = equilibrium_service.solve_polyprotic_acid(
        acid_name="Phosphoric Acid",
        acid_formula="H3PO4",
        total_concentration_ca=0.10,
        dissociation_constants_ka=[7.11e-3, 6.32e-8, 4.49e-13],
    )

    # 0.1 M H3PO4 yields pH around 1.62
    assert res.ph == pytest.approx(1.62, abs=0.1)
    assert res.poh == pytest.approx(14.0 - res.ph, abs=0.01)
    assert len(res.species_fractions) == 4

    # Sum of alpha fractions must equal 1.0
    alpha_sum = sum(f.fraction_alpha for f in res.species_fractions)
    assert alpha_sum == pytest.approx(1.0, abs=1e-4)


def test_buffer_capacity_van_slyke():
    """Verify exact van Slyke buffer capacity beta = dCb/dpH for acetic acid buffer."""
    res = equilibrium_service.solve_buffer_capacity(
        buffer_name="Acetate Buffer",
        acid_component="CH3COOH",
        base_component="CH3COO-",
        pka=4.756,
        total_buffer_concentration_m=0.10,
        ratio_base_to_acid=1.0,  # pH == pKa
    )

    # At ratio 1.0, Henderson-Hasselbalch pH == pKa == 4.756
    assert res.henderson_hasselbalch_ph == pytest.approx(4.756, abs=1e-3)
    assert res.rigorous_equilibrium_ph == pytest.approx(4.756, abs=0.05)

    # Maximum buffer capacity beta_max ~ 2.303 * 0.25 * Ctot ~ 0.0576 M/pH
    assert res.maximum_buffer_capacity == pytest.approx(0.0576, abs=1e-3)
    assert res.van_slyke_buffer_capacity_beta == pytest.approx(res.maximum_buffer_capacity, rel=0.05)

    # Acid and base additions must cause small, symmetric pH deviations
    assert res.ph_after_acid_addition < res.henderson_hasselbalch_ph
    assert res.ph_after_base_addition > res.henderson_hasselbalch_ph
    assert len(res.buffer_curve) == 51


def test_solubility_ksp_pure_water():
    """Verify PbI2 solubility in pure water: Ksp = 4*S^3 => S = (Ksp/4)^(1/3)."""
    # Ksp = 9.8e-9 for PbI2 (m=1, x=2 => coeff = 1^1 * 2^2 = 4)
    res = equilibrium_service.solve_solubility_ksp(
        salt_name="Lead(II) Iodide",
        salt_formula="PbI2",
        ksp_value=9.8e-9,
        molar_mass_g_mol=461.01,
        cation_formula="Pb2+",
        cation_coefficient=1,
        anion_formula="I-",
        anion_coefficient=2,
    )

    expected_s = (9.8e-9 / 4.0) ** (1.0 / 3.0)  # ~ 0.001348 mol/L
    assert res.molar_solubility_mol_l == pytest.approx(expected_s, rel=1e-3)
    assert res.mass_solubility_g_l == pytest.approx(expected_s * 461.01, rel=1e-3)
    assert res.saturation_state == "saturated"


def test_solubility_ksp_common_ion_depression():
    """Verify common-ion effect depresses molar solubility by Le Chatelier's principle."""
    # S in 0.1 M NaI (common ion I- = 0.1 M)
    # [Pb2+][I-]^2 = S * (0.1)^2 = 9.8e-9 => S ~ 9.8e-7 mol/L
    res = equilibrium_service.solve_solubility_ksp(
        salt_name="Lead(II) Iodide",
        salt_formula="PbI2",
        ksp_value=9.8e-9,
        molar_mass_g_mol=461.01,
        cation_formula="Pb2+",
        cation_coefficient=1,
        anion_formula="I-",
        anion_coefficient=2,
        common_ion_formula="I-",
        common_ion_concentration=0.10,
    )

    expected_s = 9.8e-9 / (0.10**2)
    assert res.molar_solubility_mol_l == pytest.approx(expected_s, rel=0.05)
    # Common ion dramatically depresses solubility compared to pure water (~1.35e-3 mol/L)
    assert res.molar_solubility_mol_l < 1.0e-5


def test_le_chatelier_pressure_perturbation():
    """Verify Le Chatelier pressure increase shifts Haber-Bosch toward fewer gas moles (NH3)."""
    res = equilibrium_service.simulate_le_chatelier(
        preset_reaction_id="haber_bosch",
        perturbation_type=PerturbationType.PRESSURE_VOLUME,
        concentration_changes={},
        pressure_multiplier=3.0,
    )

    # Increasing pressure shifts forward toward products (Delta ng = -2)
    assert res.le_chatelier_shift == ShiftDirection.FORWARD
    assert res.new_equilibrium_concentrations["NH3"] > res.initial_concentrations["NH3"]


def test_le_chatelier_temperature_van_t_hoff():
    """Verify heating exothermic reaction (Haber-Bosch, Delta H = -92.2 kJ/mol) lowers K and shifts left."""
    res = equilibrium_service.simulate_le_chatelier(
        preset_reaction_id="haber_bosch",
        perturbation_type=PerturbationType.TEMPERATURE_SHIFT,
        concentration_changes={},
        temperature_k=450.0,  # heated above 298.15 K
    )

    assert res.perturbed_k < res.initial_k
    assert res.le_chatelier_shift == ShiftDirection.REVERSE
