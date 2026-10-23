"""Unit tests for Photochemistry, Jablonski Energy Diagrams & FRET Dynamics (PR #047)."""

import math
import pytest
from app.schemas.photochemistry import (
    JablonskiSimulationRequest,
    SternVolmerRequest,
    FretSimulationRequest,
)
from app.services.photochemistry_service import (
    PhotochemistryEngine,
    CURATED_FLUOROPHORES,
    CURATED_QUENCHERS,
    CURATED_FRET_PAIRS,
)


class TestPhotochemistryEngine:
    def test_catalog_retrieval(self):
        """Verifies curated library of fluorophores, quenchers, and FRET pairs."""
        catalog = PhotochemistryEngine.get_catalog()
        assert len(catalog.fluorophores) >= 5
        assert len(catalog.quenchers) >= 3
        assert len(catalog.fret_pairs) >= 2

        f_ids = [f.id for f in catalog.fluorophores]
        assert "fluorescein" in f_ids
        assert "rhodamine_b" in f_ids
        assert "anthracene" in f_ids
        assert "ruthenium_bipyridine" in f_ids

        q_ids = [q.id for q in catalog.quenchers]
        assert "iodide_anion" in q_ids
        assert "molecular_oxygen" in q_ids

    def test_fluorescein_photophysical_rates_and_quantum_yield(self):
        """Validates high quantum yield and nanosecond lifetime of fluorescein dianion."""
        req = JablonskiSimulationRequest(
            fluorophore_id="fluorescein",
            kr_scaling_factor=1.0,
            kic_scaling_factor=1.0,
            kisc_scaling_factor=1.0,
            temperature_k=298.15,
        )
        res = PhotochemistryEngine.simulate_jablonski(req)
        rates = res.rates

        # Fluorescein has Phi_F ~ 0.89 - 0.92 in alkaline water
        assert rates.fluorescence_quantum_yield_phi_f == pytest.approx(0.90, abs=0.03)
        # Lifetime tau0 ~ 4.18 ns
        assert rates.fluorescence_lifetime_tau0_ns == pytest.approx(4.18, abs=0.2)
        assert rates.triplet_yield_phi_isc < 0.05
        assert len(res.states) == 4

        # S1 state must be higher in energy than T1 (Hund's rule)
        s1 = next(s for s in res.states if s.state_id == "S1")
        t1 = next(s for s in res.states if s.state_id == "T1")
        assert s1.energy_ev > t1.energy_ev

    def test_heavy_atom_effect_enhanced_intersystem_crossing(self):
        """Validates that increasing spin-orbit coupling (heavy atom effect) boosts Phi_ISC at expense of Phi_F."""
        req_unperturbed = JablonskiSimulationRequest(
            fluorophore_id="fluorescein",
            kisc_scaling_factor=1.0,
        )
        res_unpert = PhotochemistryEngine.simulate_jablonski(req_unperturbed)

        req_heavy_atom = JablonskiSimulationRequest(
            fluorophore_id="fluorescein",
            kisc_scaling_factor=25.0,  # e.g., in presence of ethyl iodide solvent or bromination (eosin)
        )
        res_heavy = PhotochemistryEngine.simulate_jablonski(req_heavy_atom)

        # Enhanced ISC quenches fluorescence and boosts triplet formation
        assert res_heavy.rates.fluorescence_quantum_yield_phi_f < res_unpert.rates.fluorescence_quantum_yield_phi_f
        assert res_heavy.rates.triplet_yield_phi_isc > res_unpert.rates.triplet_yield_phi_isc
        assert res_heavy.rates.fluorescence_lifetime_tau0_ns < res_unpert.rates.fluorescence_lifetime_tau0_ns

    def test_ruthenium_bipyridine_mlct_triplet_emission(self):
        """Validates that [Ru(bpy)3]2+ undergoes rapid intersystem crossing with microsecond triplet lifetime."""
        req = JablonskiSimulationRequest(
            fluorophore_id="ruthenium_bipyridine",
            temperature_k=298.15,
        )
        res = PhotochemistryEngine.simulate_jablonski(req)

        # Ru(bpy)3 2+ has ~100% triplet yield
        assert res.rates.triplet_yield_phi_isc == pytest.approx(1.0, abs=0.01)
        assert res.rates.phosphorescence_lifetime_tau_p_ms > 0.0001

    def test_stern_volmer_collisional_quenching(self):
        """Validates linear Stern-Volmer relationship: F0/F = 1 + K_SV * [Q]."""
        req = SternVolmerRequest(
            fluorophore_id="fluorescein",
            quencher_id="iodide_anion",
            max_quencher_conc_mM=60.0,
            points_count=13,
            temperature_k=298.15,
        )
        res = PhotochemistryEngine.calculate_stern_volmer(req).result

        assert res.stern_volmer_constant_ksv_m_inv > 10.0
        assert res.bimolecular_quenching_rate_kq_m_inv_s_inv == pytest.approx(4.5e9, rel=1e-3)
        assert res.is_diffusion_limited is False
        assert len(res.points) == 13

        # At [Q] = 0, F0 / F must equal 1.0
        assert res.points[0].f0_over_f == 1.0
        assert res.points[0].fluorescence_intensity_f == res.unquenched_intensity_f0

        # At max [Q], F0 / F must increase linearly with slope K_SV
        last_pt = res.points[-1]
        expected_f0_f = 1.0 + res.stern_volmer_constant_ksv_m_inv * (last_pt.quencher_concentration_mM * 1e-3)
        assert last_pt.f0_over_f == pytest.approx(expected_f0_f, rel=1e-3)
        assert last_pt.fluorescence_lifetime_tau_ns < res.unquenched_lifetime_tau0_ns

    def test_fret_efficiency_distance_dependence(self):
        """Validates Förster resonance transfer efficiency: E = 50% exactly at r = R0 and scales as (1/r^6)."""
        pair_id = "CFP_YFP"
        pair_data = CURATED_FRET_PAIRS[pair_id]
        r0 = pair_data["forster_distance_r0_angstrom"]  # 49.2 Å

        # At current distance exactly equal to R0:
        req_at_r0 = FretSimulationRequest(
            fret_pair_id=pair_id,
            current_distance_r_angstrom=r0,
        )
        res_r0 = PhotochemistryEngine.simulate_fret(req_at_r0).result
        # E(R0) = 50%
        assert res_r0.efficiency_at_current_distance == pytest.approx(0.50, abs=0.01)

        # At close distance (r << R0), efficiency approaches 1.0 (100%)
        req_close = FretSimulationRequest(
            fret_pair_id=pair_id,
            current_distance_r_angstrom=20.0,
        )
        res_close = PhotochemistryEngine.simulate_fret(req_close).result
        assert res_close.efficiency_at_current_distance > 0.95

        # At far distance (r >> R0), efficiency approaches 0.0
        req_far = FretSimulationRequest(
            fret_pair_id=pair_id,
            current_distance_r_angstrom=85.0,
        )
        res_far = PhotochemistryEngine.simulate_fret(req_far).result
        assert res_far.efficiency_at_current_distance < 0.10
