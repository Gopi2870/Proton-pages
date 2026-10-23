"""
Unit tests for Comprehensive Chemical Compounds & Spectral Reference Database (PR #050).
"""
import pytest
from app.schemas.compound_database import (
    CompoundSearchRequest,
    SpectralMatchRequest,
)
from app.services.compound_database_service import CompoundDatabaseEngine, CURATED_DATABASE


class TestCompoundDatabaseEngine:
    def test_database_stats(self):
        stats = CompoundDatabaseEngine.get_database_stats()
        assert stats.total_compounds >= 8
        assert "Pharmaceutical" in stats.categories
        assert "Organic" in stats.categories
        assert stats.compounds_with_uv >= 6
        assert stats.compounds_with_ir >= 6
        assert stats.compounds_with_nmr >= 6
        assert stats.average_molecular_weight > 50.0

    def test_search_by_name(self):
        req = CompoundSearchRequest(query="aspirin")
        result = CompoundDatabaseEngine.search_compounds(req)
        assert result.total_matches >= 1
        aspirin = result.compounds[0]
        assert aspirin.name == "Aspirin"
        assert aspirin.formula == "C9H8O4"
        assert len(aspirin.uv_vis_peaks) == 2
        assert len(aspirin.ir_bands) == 4
        assert len(aspirin.nmr_1h_shifts) == 6

    def test_search_by_smiles(self):
        req = CompoundSearchRequest(query="CCO")  # Ethanol
        result = CompoundDatabaseEngine.search_compounds(req)
        assert result.total_matches >= 1
        ethanol = next(c for c in result.compounds if c.id == "cmpd_ethanol")
        assert ethanol.name == "Ethanol"
        assert ethanol.molecular_weight == pytest.approx(46.069, abs=0.1)

    def test_search_by_category(self):
        req = CompoundSearchRequest(category="Pharmaceutical")
        result = CompoundDatabaseEngine.search_compounds(req)
        names = [c.name for c in result.compounds]
        assert "Aspirin" in names
        assert "Paracetamol" in names

    def test_search_by_mw_range(self):
        req = CompoundSearchRequest(min_mw=150.0, max_mw=185.0)
        result = CompoundDatabaseEngine.search_compounds(req)
        for c in result.compounds:
            assert 150.0 <= c.molecular_weight <= 185.0

    def test_search_by_log_p_range(self):
        req = CompoundSearchRequest(min_log_p=0.0, max_log_p=2.0)
        result = CompoundDatabaseEngine.search_compounds(req)
        for c in result.compounds:
            assert c.log_p is not None
            assert 0.0 <= c.log_p <= 2.0

    def test_spectral_filtering(self):
        req = CompoundSearchRequest(has_uv=True, has_ir=True, has_nmr=True)
        result = CompoundDatabaseEngine.search_compounds(req)
        for c in result.compounds:
            assert len(c.uv_vis_peaks) > 0
            assert len(c.ir_bands) > 0
            assert (len(c.nmr_1h_shifts) > 0 or len(c.nmr_13c_shifts) > 0)

    def test_match_spectroscopy_uv_aspirin(self):
        req = SpectralMatchRequest(target_uv_wavelength_nm=226.0, tolerance_percent=3.0)
        result = CompoundDatabaseEngine.match_spectroscopy(req)
        ids = [c.id for c in result.compounds]
        assert "cmpd_aspirin" in ids

    def test_match_spectroscopy_ir_carbonyl(self):
        # 1750 cm-1 ester carbonyl in aspirin
        req = SpectralMatchRequest(target_ir_wavenumber_cm1=1750.0, tolerance_percent=2.0)
        result = CompoundDatabaseEngine.match_spectroscopy(req)
        ids = [c.id for c in result.compounds]
        assert "cmpd_aspirin" in ids

    def test_match_spectroscopy_nmr_ferrocene(self):
        # 4.15 ppm singlet for ferrocene
        req = SpectralMatchRequest(target_nmr_1h_ppm=4.15, tolerance_percent=5.0)
        result = CompoundDatabaseEngine.match_spectroscopy(req)
        ids = [c.id for c in result.compounds]
        assert "cmpd_ferrocene" in ids

    def test_pagination(self):
        req = CompoundSearchRequest(limit=3, offset=0)
        res1 = CompoundDatabaseEngine.search_compounds(req)
        assert len(res1.compounds) <= 3
        req2 = CompoundSearchRequest(limit=3, offset=3)
        res2 = CompoundDatabaseEngine.search_compounds(req2)
        assert len(res2.compounds) <= 3
        # Ensure no overlap between page 1 and page 2
        ids1 = {c.id for c in res1.compounds}
        ids2 = {c.id for c in res2.compounds}
        assert ids1.isdisjoint(ids2)
