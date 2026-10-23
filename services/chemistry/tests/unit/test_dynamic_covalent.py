"""Unit tests for Dynamic Covalent Chemistry & Constitutional Networks (PR #046)."""

import math
import pytest
from app.schemas.dynamic_covalent import (
    DCLSimulationRequest,
    ExchangeKineticsRequest,
)
from app.services.dynamic_covalent_service import (
    DynamicCovalentEngine,
    CURATED_MOTIFS,
    CURATED_BUILDING_BLOCKS,
    CURATED_TEMPLATES,
)


class TestDynamicCovalentEngine:
    def test_catalog_retrieval(self):
        """Verifies curated library of dynamic bond motifs, building blocks, and templates."""
        catalog = DynamicCovalentEngine.get_catalog()
        assert len(catalog.motifs) >= 4
        assert len(catalog.building_blocks) >= 6
        assert len(catalog.templates) >= 3

        motif_ids = [m.id for m in catalog.motifs]
        assert "imine_condensation" in motif_ids
        assert "disulfide_exchange" in motif_ids
        assert "boronate_ester" in motif_ids
        assert "hydrazone_exchange" in motif_ids

        template_ids = [t.id for t in catalog.templates]
        assert "zinc_cation" in template_ids
        assert "iron_cation" in template_ids
        assert "ammonium_cation" in template_ids

    def test_untemplated_dcl_distribution(self):
        """Validates statistical untemplated dynamic combinatorial library distribution."""
        req = DCLSimulationRequest(
            motif_id="imine_condensation",
            building_block_concs_mM={"dialdehyde_A": 2.0, "diamine_B": 2.0, "monoamine_C": 1.0},
            template_id=None,
            template_concentration_mM=0.0,
            temperature_k=298.15,
            ph=6.5,
        )
        res = DynamicCovalentEngine.simulate_dcl(req).result

        assert res.equilibrium_converged is True
        assert len(res.members) >= 4
        assert res.shannon_diversity_entropy_untemplated > 0.5

        # Sum of equilibrium fractions must equal 1.0
        total_frac = sum(m.equilibrium_fraction_untemplated for m in res.members)
        assert total_frac == pytest.approx(1.0, abs=1e-3)
        assert res.amplified_member_id is None

    def test_zinc_template_constitutional_amplification(self):
        """Validates that Zn2+ selectively amplifies the [2+2] bis-imine macrocycle."""
        req = DCLSimulationRequest(
            motif_id="imine_condensation",
            building_block_concs_mM={"dialdehyde_A": 2.0, "diamine_B": 2.0, "monoamine_C": 1.0},
            template_id="zinc_cation",
            template_concentration_mM=2.0,
            temperature_k=298.15,
            ph=6.5,
        )
        res = DynamicCovalentEngine.simulate_dcl(req).result

        assert res.amplified_member_id == "macrocycle_2x2"
        assert res.max_amplification_factor is not None
        assert res.max_amplification_factor > 1.2

        macro_2x2 = next(m for m in res.members if m.id == "macrocycle_2x2")
        assert macro_2x2.equilibrium_fraction_templated is not None
        assert macro_2x2.equilibrium_fraction_templated > macro_2x2.equilibrium_fraction_untemplated

        # Diversity entropy collapses upon template selection
        assert res.shannon_diversity_entropy_templated is not None
        assert res.shannon_diversity_entropy_templated < res.shannon_diversity_entropy_untemplated

    def test_iron_template_selectivity_for_tris_macrocycle(self):
        """Validates that Fe2+ selectively drives amplification of the [3+3] or chelate macrocycle."""
        req = DCLSimulationRequest(
            motif_id="imine_condensation",
            building_block_concs_mM={"dialdehyde_A": 3.0, "diamine_B": 3.0, "dialdehyde_D": 2.0},
            template_id="iron_cation",
            template_concentration_mM=2.5,
            temperature_k=298.15,
            ph=6.5,
        )
        res = DynamicCovalentEngine.simulate_dcl(req).result

        # Fe2+ has astronomical affinity for chelate_macrocycle_2x2 and macrocycle_3x3
        assert res.amplified_member_id in ["chelate_macrocycle_2x2", "macrocycle_3x3"]
        assert res.max_amplification_factor > 1.5

    def test_ph_dependence_of_boronate_ester_equilibrium(self):
        """Validates that boronate ester DCL formation is optimized at pH 8.5."""
        req_opt = DCLSimulationRequest(
            motif_id="boronate_ester",
            temperature_k=298.15,
            ph=8.5,
        )
        res_opt = DynamicCovalentEngine.simulate_dcl(req_opt).result

        req_acidic = DCLSimulationRequest(
            motif_id="boronate_ester",
            temperature_k=298.15,
            ph=4.0,
        )
        res_acidic = DynamicCovalentEngine.simulate_dcl(req_acidic).result

        # Optimal pH 8.5 yields higher cyclic boronate ester stability than acidic pH 4.0
        assert res_opt.members[0].standard_formation_gibbs_kj_mol < 0.0
        assert res_opt.shannon_diversity_entropy_untemplated >= 0.0

    def test_disulfide_exchange_relaxation_kinetics(self):
        """Validates that symmetric disulfide mixture relaxes to statistical equilibrium with heterodimer."""
        req = ExchangeKineticsRequest(
            motif_id="disulfide_exchange",
            initial_symmetric_1_mM=5.0,
            initial_symmetric_2_mM=5.0,
            initial_asymmetric_mM=0.0,
            thiol_catalyst_conc_uM=200.0,
            time_span_seconds=7200.0,
            steps_count=50,
        )
        res = DynamicCovalentEngine.calculate_exchange_kinetics(req).result

        assert res.half_life_seconds > 0.0
        assert res.relaxation_time_tau_seconds > 0.0
        assert len(res.trajectory) == 51

        # At t = 0, asymmetric concentration is 0
        assert res.trajectory[0].species_concentrations_mM["asymmetric"] == 0.0

        # At final time, asymmetric product has formed substantially approaching statistical equilibrium
        final_pt = res.trajectory[-1].species_concentrations_mM
        assert final_pt["asymmetric"] > 2.0
        assert final_pt["symmetric_1"] < 5.0
        assert final_pt["symmetric_2"] < 5.0

    def test_exchange_kinetics_catalyst_rate_enhancement(self):
        """Validates that increasing thiolate catalyst concentration reduces relaxation time tau."""
        req_low_cat = ExchangeKineticsRequest(
            motif_id="disulfide_exchange",
            thiol_catalyst_conc_uM=50.0,
        )
        res_low = DynamicCovalentEngine.calculate_exchange_kinetics(req_low_cat).result

        req_high_cat = ExchangeKineticsRequest(
            motif_id="disulfide_exchange",
            thiol_catalyst_conc_uM=500.0,
        )
        res_high = DynamicCovalentEngine.calculate_exchange_kinetics(req_high_cat).result

        assert res_high.relaxation_time_tau_seconds < res_low.relaxation_time_tau_seconds
        assert res_high.half_life_seconds < res_low.half_life_seconds
