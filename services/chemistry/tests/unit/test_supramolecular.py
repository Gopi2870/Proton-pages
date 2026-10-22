"""Unit tests for Supramolecular Chemistry & Host-Guest Complexation (PR #045)."""

import math
import pytest
from app.schemas.supramolecular import (
    JobPlotRequest,
    BindingSimulationRequest,
)
from app.services.supramolecular_service import (
    SupramolecularEngine,
    CURATED_HOSTS,
    CURATED_GUESTS,
)


class TestSupramolecularEngine:
    def test_catalog_retrieval(self):
        """Verifies curated library of macrocyclic hosts and guest substrates."""
        catalog = SupramolecularEngine.get_catalog()
        assert len(catalog.hosts) >= 6
        assert len(catalog.guests) >= 6

        host_ids = [h.id for h in catalog.hosts]
        assert "18_crown_6" in host_ids
        assert "15_crown_5" in host_ids
        assert "12_crown_4" in host_ids
        assert "cryptand_222" in host_ids
        assert "beta_cyclodextrin" in host_ids

        guest_ids = [g.id for g in catalog.guests]
        assert "potassium_cation" in guest_ids
        assert "sodium_cation" in guest_ids
        assert "adamantanecarboxylate" in guest_ids

    def test_crown_ether_alkali_cation_size_selectivity(self):
        """Validates peak affinity of 18-crown-6 for K+ over Na+ and Li+ due to cavity size match."""
        ka_k, _, decomp_k = SupramolecularEngine.evaluate_host_guest_system("18_crown_6", "potassium_cation")
        ka_na, _, decomp_na = SupramolecularEngine.evaluate_host_guest_system("18_crown_6", "sodium_cation")
        ka_li, _, decomp_li = SupramolecularEngine.evaluate_host_guest_system("18_crown_6", "lithium_cation")

        # K+ has optimal size match (~2.76 Å vs 2.80 Å cavity, ratio ~0.985)
        assert decomp_k.cavity_size_match_ratio == pytest.approx(0.985, abs=0.02)
        assert ka_k > ka_na
        assert ka_na > ka_li
        assert math.log10(ka_k) > 5.5

    def test_15_crown_5_and_12_crown_4_selectivity(self):
        """Validates that 15-crown-5 prefers Na+ and 12-crown-4 prefers Li+."""
        ka_15_na, _, _ = SupramolecularEngine.evaluate_host_guest_system("15_crown_5", "sodium_cation")
        ka_15_k, _, _ = SupramolecularEngine.evaluate_host_guest_system("15_crown_5", "potassium_cation")
        assert ka_15_na > ka_15_k

        ka_12_li, _, _ = SupramolecularEngine.evaluate_host_guest_system("12_crown_4", "lithium_cation")
        assert math.log10(ka_12_li) > 2.5

    def test_macrobicyclic_cryptate_effect(self):
        """Validates the 3D cryptate effect: Cryptand [2.2.2] has dramatically higher affinity than 18-crown-6."""
        ka_crown, _, _ = SupramolecularEngine.evaluate_host_guest_system("18_crown_6", "potassium_cation")
        ka_crypt, _, decomp_crypt = SupramolecularEngine.evaluate_host_guest_system("cryptand_222", "potassium_cation")

        assert math.log10(ka_crypt) >= 9.0
        assert ka_crypt > ka_crown * 1000.0
        assert decomp_crypt.ion_dipole_electrostatic_kj_mol < -50.0

    def test_cyclodextrin_hydrophobic_inclusion(self):
        """Validates beta-cyclodextrin inclusion of adamantyl carboxylate driven by hydrophobic effect."""
        ka, delta_h, decomp = SupramolecularEngine.evaluate_host_guest_system(
            "beta_cyclodextrin", "adamantanecarboxylate"
        )
        assert math.log10(ka) >= 4.5
        assert decomp.hydrophobic_desolvation_kj_mol < -10.0
        assert delta_h < 0.0

    def test_job_continuous_variation_1_to_1_stoichiometry(self):
        """Validates that Job's method of continuous variation identifies 1:1 stoichiometry with peak at r = 0.50."""
        req = JobPlotRequest(
            host_id="18_crown_6",
            guest_id="potassium_cation",
            total_concentration_mM=2.0,
            points_count=21,
            temperature_k=298.15,
        )
        res = SupramolecularEngine.generate_job_plot(req)
        assert res.result.determined_stoichiometry == "1:1"
        assert res.result.peak_mole_fraction == pytest.approx(0.50, abs=0.05)
        assert len(res.result.points) == 21
        # Signal at r=0 and r=1 must be 0
        assert res.result.points[0].complex_conc_mM == 0.0
        assert res.result.points[-1].complex_conc_mM == 0.0

    def test_quadratic_binding_isotherm_mass_conservation(self):
        """Validates exact mass conservation and binding isotherm saturation."""
        req = BindingSimulationRequest(
            host_id="18_crown_6",
            guest_id="potassium_cation",
            host_initial_conc_mM=0.5,
            guest_max_conc_mM=3.0,
            temperature_k=298.15,
            titration_steps=20,
        )
        res = SupramolecularEngine.simulate_binding(req)
        sys = res.system

        assert sys.association_constant_ka_m_inv > 0.0
        assert sys.dissociation_constant_kd_uM < 10.0
        assert sys.gibbs_free_energy_delta_g_kj_mol < -25.0

        for pt in sys.isotherm_points:
            # Bound complex cannot exceed total host
            assert pt.bound_complex_mM <= 0.5001
            assert pt.fraction_bound <= 1.0001
            # Free + bound must equal total host
            assert pt.free_host_mM + pt.bound_complex_mM == pytest.approx(0.5, abs=1e-3)

    def test_validation_errors(self):
        """Verifies rejection of invalid parameters."""
        with pytest.raises(ValueError, match="(greater than 0|positive)"):
            SupramolecularEngine.generate_job_plot(
                JobPlotRequest(total_concentration_mM=-1.0)
            )

        with pytest.raises(ValueError, match="(greater than 0|positive)"):
            SupramolecularEngine.simulate_binding(
                BindingSimulationRequest(host_initial_conc_mM=-0.5)
            )

