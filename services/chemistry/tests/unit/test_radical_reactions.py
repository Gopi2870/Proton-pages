"""
Unit tests for Radical Reaction Networks, Elementary Radical Mechanisms,
Stiff Numerical ODE Kinetics, and Sensitivity Analysis.
"""

import math
import pytest
from app.models.radical_reactions import (
    RadicalSpeciesType,
    RadicalReactionRole,
    ArrheniusRateLaw,
)
from app.services.radical_reaction_service import (
    RadicalReactionService,
    evaluate_arrhenius_rate,
    VALIDATED_MECHANISMS,
)


class TestArrheniusKinetics:
    def test_temperature_dependence(self):
        # Activation energy = 50 kJ/mol
        law = ArrheniusRateLaw(pre_exponential_a=1.0e10, temperature_exponent_n=0.0, activation_energy_kj_mol=50.0)
        k_300 = evaluate_arrhenius_rate(law, 300.0)
        k_600 = evaluate_arrhenius_rate(law, 600.0)
        k_1200 = evaluate_arrhenius_rate(law, 1200.0)

        assert k_300 < k_600 < k_1200
        # Check standard Arrhenius ratio
        expected_ratio = math.exp(-50.0 / (8.31446e-3 * 600.0)) / math.exp(-50.0 / (8.31446e-3 * 300.0))
        assert abs((k_600 / k_300) - expected_ratio) / expected_ratio < 1e-2

    def test_zero_activation_barrier(self):
        # Barrierless radical recombination
        law = ArrheniusRateLaw(pre_exponential_a=1.0e9, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0)
        k_300 = evaluate_arrhenius_rate(law, 300.0)
        k_1000 = evaluate_arrhenius_rate(law, 1000.0)
        assert abs(k_300 - 1.0e9) < 1e-4
        assert abs(k_1000 - 1.0e9) < 1e-4


class TestRadicalMechanismsRegistry:
    def test_all_validated_mechanisms_present(self):
        mechs = RadicalReactionService.list_mechanisms()
        assert len(mechs) >= 4
        ids = {m.id for m in mechs}
        assert "h2_o2_combustion" in ids
        assert "atmospheric_methane" in ids
        assert "polymerization_frp" in ids
        assert "fenton_scavenging" in ids

    def test_h2_o2_combustion_species_and_roles(self):
        mech = RadicalReactionService.get_mechanism("h2_o2_combustion")
        assert mech is not None
        assert len(mech.species) == 8
        species_names = {s.name for s in mech.species}
        assert {"H2", "O2", "H2O", "H", "O", "OH", "HO2", "H2O2"} == species_names

        roles = {r.role for r in mech.reactions}
        assert RadicalReactionRole.BRANCHING in roles
        assert RadicalReactionRole.PROPAGATION in roles
        assert RadicalReactionRole.TERMINATION in roles
        assert RadicalReactionRole.INITIATION in roles


class TestStiffKineticsSimulation:
    def test_h2_o2_combustion_stiff_integration(self):
        res = RadicalReactionService.simulate_mechanism(
            mechanism_id="h2_o2_combustion",
            temperature_k=1200.0,
            pressure_atm=1.0,
            total_time_s=1e-4,
            max_steps=500,
        )
        assert res.mechanism_id == "h2_o2_combustion"
        assert len(res.time_points_s) > 10
        assert "H2" in res.trajectories
        assert "O2" in res.trajectories
        assert "H2O" in res.trajectories
        assert "OH" in res.trajectories

        # Element conservation checks: Hydrogen and Oxygen relative drift < 1e-3
        for elem, err in res.element_conservation_errors.items():
            assert err < 1e-3, f"Element {elem} conservation failed with drift {err}"

        # Total radical pool is non-negative and monitored
        assert all(r >= 0.0 for r in res.total_radical_pool)

        # Sensitivity analysis generated
        assert len(res.top_sensitivities) > 0
        sens_reactions = {s.reaction_id for s in res.top_sensitivities}
        assert any("branching" in r_id for r_id in sens_reactions)

    def test_atmospheric_methane_oxidation(self):
        res = RadicalReactionService.simulate_mechanism(
            mechanism_id="atmospheric_methane",
            temperature_k=298.15,
            pressure_atm=1.0,
            total_time_s=1e-2,
            max_steps=300,
        )
        assert res.mechanism_id == "atmospheric_methane"
        assert "CH4" in res.trajectories
        assert "OH" in res.trajectories
        assert "CH3" in res.trajectories
        assert "NO2" in res.trajectories

        # Carbon and Nitrogen elements conserved
        assert res.element_conservation_errors.get("C", 0.0) < 1e-3
        assert res.element_conservation_errors.get("N", 0.0) < 1e-3

    def test_free_radical_polymerization(self):
        res = RadicalReactionService.simulate_mechanism(
            mechanism_id="polymerization_frp",
            temperature_k=350.0,
            pressure_atm=1.0,
            total_time_s=1.0,
            max_steps=300,
        )
        assert res.mechanism_id == "polymerization_frp"
        # Monomer decreases and dead polymer forms
        init_monomer = res.trajectories["Monomer"][0]
        final_monomer = res.trajectories["Monomer"][-1]
        assert final_monomer <= init_monomer
        assert res.trajectories["Dead_Polymer"][-1] >= 0.0

    def test_fenton_scavenging_cascade(self):
        res = RadicalReactionService.simulate_mechanism(
            mechanism_id="fenton_scavenging",
            temperature_k=310.15,
            pressure_atm=1.0,
            total_time_s=1e-1,
            max_steps=300,
        )
        assert res.mechanism_id == "fenton_scavenging"
        # Fe2+ consumed, Fe3+ generated
        init_fe2 = res.trajectories["Fe2_plus"][0]
        final_fe2 = res.trajectories["Fe2_plus"][-1]
        assert final_fe2 <= init_fe2
        assert res.trajectories["Fe3_plus"][-1] > 0.0
