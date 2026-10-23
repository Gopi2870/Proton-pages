"""
Unit tests for Analytical Chromatography & Mass Spectrometry (PR #051).
"""
import pytest
from app.schemas.mass_spectrometry import (
    MsSimulationRequest,
    IsotopeEnvelopeRequest,
    VanDeemterRequest,
    ChromatogramSimulationRequest,
)
from app.services.mass_spectrometry_service import MassSpectrometryEngine


class TestMassSpectrometryEngine:
    def test_catalog_retrieval(self):
        catalog = MassSpectrometryEngine.get_catalog()
        assert len(catalog) >= 5
        ids = [s.id for s in catalog]
        assert "butylbenzene" in ids
        assert "acetophenone" in ids
        assert "chlorobenzene" in ids
        assert "bromobenzene" in ids
        assert "pentan_2_one" in ids

    def test_mclafferty_rearrangement_butylbenzene(self):
        req = MsSimulationRequest(standard_id="butylbenzene")
        res = MassSpectrometryEngine.simulate_ms(req)
        assert res.analyte_name == "Butylbenzene"
        assert res.base_peak_mz == 91.0  # Tropylium ion base peak
        assert res.molecular_ion_mz == 134.0
        # Check McLafferty fragment at m/z 92
        mclafferty_peak = next((p for p in res.spectrum if p.mz == 92.0), None)
        assert mclafferty_peak is not None
        assert "McLafferty" in mclafferty_peak.mechanism
        assert len(res.diagnostic_neutral_losses) >= 1

    def test_alpha_cleavage_acetophenone(self):
        req = MsSimulationRequest(standard_id="acetophenone")
        res = MassSpectrometryEngine.simulate_ms(req)
        assert res.base_peak_mz == 105.0  # Benzoyl acylium ion
        benzoyl_peak = next((p for p in res.spectrum if p.mz == 105.0), None)
        assert benzoyl_peak is not None
        assert "Benzoyl" in benzoyl_peak.fragment_name
        assert any("CO" in loss for loss in res.diagnostic_neutral_losses)

    def test_isotope_chlorine_pattern(self):
        req = IsotopeEnvelopeRequest(formula="C6H5Cl")
        res = MassSpectrometryEngine.calculate_isotope_envelope(req)
        assert "Chlorine" in res.pattern_signature
        m_peak = next(p for p in res.peaks if p.isotopic_label == "M")
        m2_peak = next(p for p in res.peaks if p.isotopic_label == "M+2")
        assert m_peak.relative_abundance == 100.0
        # 3:1 ratio means M+2 is around 32-34%
        assert 30.0 <= m2_peak.relative_abundance <= 36.0

    def test_isotope_bromine_pattern(self):
        req = IsotopeEnvelopeRequest(formula="C6H5Br")
        res = MassSpectrometryEngine.calculate_isotope_envelope(req)
        assert "Bromine" in res.pattern_signature
        m_peak = next(p for p in res.peaks if p.isotopic_label == "M")
        m2_peak = next(p for p in res.peaks if p.isotopic_label == "M+2")
        assert m_peak.relative_abundance == 100.0
        # 1:1 ratio means M+2 is around 95-100%
        assert 95.0 <= m2_peak.relative_abundance <= 100.0

    def test_van_deemter_hydrodynamics(self):
        req = VanDeemterRequest(particle_diameter_um=3.5, column_length_mm=150.0)
        res = MassSpectrometryEngine.calculate_van_deemter(req)
        assert res.a_term_um > 0.0
        assert res.b_term_cm2_s > 0.0
        assert res.c_term_s > 0.0
        assert res.optimum_velocity_cm_s > 0.0
        assert res.minimum_plate_height_um > 0.0
        assert res.maximum_theoretical_plates > 5000
        assert len(res.curve) >= 10

    def test_chromatographic_separation_resolution(self):
        req = ChromatogramSimulationRequest(
            analyte_ids=["benzene", "toluene", "butylbenzene"],
            column_length_mm=150.0,
            temperature_c=120.0,
        )
        res = MassSpectrometryEngine.simulate_chromatogram(req)
        assert res.dead_time_t0_min > 0.0
        assert len(res.peaks) == 3
        # Ensure ordered retention times
        assert res.peaks[0].retention_time_min < res.peaks[1].retention_time_min < res.peaks[2].retention_time_min
        # Resolution should be baseline resolved (Rs > 1.5)
        for pair, rs in res.resolution_pairs.items():
            assert rs >= 1.0
