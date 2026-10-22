"""Unit tests for Coordination Chemistry & Crystal Field Theory (CFT) engine."""

import math
import pytest
from app.models.coordination_cft import TransitionMetalIon, Ligand
from app.services.coordination_cft_service import (
    CoordinationCftEngine,
    CoordinationAnalysisRequest,
    METALS,
    LIGANDS,
)


class TestCoordinationCftEngine:
    """Scientific validation suite for crystal field splitting and magnetic properties."""

    def test_d_electron_counts(self):
        """Verifies valence d-electron count determination across transition metals."""
        # Ti(III): Group 4 - 3 = d1
        ti3 = CoordinationCftEngine.get_metal("Ti", 3)
        assert ti3.d_electron_count == 1

        # Cr(III): Group 6 - 3 = d3
        cr3 = CoordinationCftEngine.get_metal("Cr", 3)
        assert cr3.d_electron_count == 3

        # Fe(II): Group 8 - 2 = d6
        fe2 = CoordinationCftEngine.get_metal("Fe", 2)
        assert fe2.d_electron_count == 6

        # Fe(III): Group 8 - 3 = d5
        fe3 = CoordinationCftEngine.get_metal("Fe", 3)
        assert fe3.d_electron_count == 5

        # Ni(II): Group 10 - 2 = d8
        ni2 = CoordinationCftEngine.get_metal("Ni", 2)
        assert ni2.d_electron_count == 8

        # Cu(II): Group 11 - 2 = d9
        cu2 = CoordinationCftEngine.get_metal("Cu", 2)
        assert cu2.d_electron_count == 9

        # Zn(II): Group 12 - 2 = d10
        zn2 = CoordinationCftEngine.get_metal("Zn", 2)
        assert zn2.d_electron_count == 10

    def test_octahedral_d3_unambiguous_filling(self):
        """Verifies that d3 (Cr3+) has t2g3 eg0, CFSE = -1.2 Delta_o, and mu = 3.87 BM."""
        req = CoordinationAnalysisRequest(
            metal_symbol="Cr",
            oxidation_state=3,
            ligand_id="h2o",
            geometry="octahedral",
        )
        res = CoordinationCftEngine.analyze_complex(req)
        assert res.metal.d_electron_count == 3
        assert res.cfse_delta_units == pytest.approx(-1.2, abs=1e-2)
        assert res.unpaired_electrons == 3
        # mu = sqrt(3*(3+2)) = sqrt(15) = 3.873
        assert res.magnetic_moment_bm == pytest.approx(3.87, abs=0.05)
        assert res.is_paramagnetic is True
        assert res.orbital_levels[0].electron_count == 3  # t2g
        assert res.orbital_levels[1].electron_count == 0  # eg

    def test_fe2_high_spin_vs_low_spin_bifurcation(self):
        """Tests classic Fe(II) d6 bifurcation: weak-field H2O (high-spin) vs strong-field CN- (low-spin)."""
        # 1. Fe(II) with H2O -> High-spin (t2g4 eg2, CFSE = -0.4 Delta, 4 unpaired e-)
        req_hs = CoordinationAnalysisRequest(
            metal_symbol="Fe",
            oxidation_state=2,
            ligand_id="h2o",
            geometry="octahedral",
        )
        res_hs = CoordinationCftEngine.analyze_complex(req_hs)
        assert res_hs.spin_state == "high_spin"
        assert res_hs.cfse_delta_units == pytest.approx(-0.4, abs=1e-2)
        assert res_hs.unpaired_electrons == 4
        # mu = sqrt(4*6) = sqrt(24) = 4.90 BM
        assert res_hs.magnetic_moment_bm == pytest.approx(4.90, abs=0.05)
        assert res_hs.is_paramagnetic is True

        # 2. Fe(II) with CN- -> Low-spin (t2g6 eg0, CFSE = -2.4 Delta, 0 unpaired e-, Diamagnetic)
        req_ls = CoordinationAnalysisRequest(
            metal_symbol="Fe",
            oxidation_state=2,
            ligand_id="cn",
            geometry="octahedral",
        )
        res_ls = CoordinationCftEngine.analyze_complex(req_ls)
        assert res_ls.spin_state == "low_spin"
        assert res_ls.cfse_delta_units == pytest.approx(-2.4, abs=1e-2)
        assert res_ls.unpaired_electrons == 0
        assert res_ls.magnetic_moment_bm == 0.0
        assert res_ls.is_paramagnetic is False

    def test_tetrahedral_geometry_splitting(self):
        """Tests tetrahedral splitting Delta_t = 4/9 Delta_o with e below t2."""
        req = CoordinationAnalysisRequest(
            metal_symbol="Ni",
            oxidation_state=2,
            ligand_id="cl",
            geometry="tetrahedral",
        )
        res = CoordinationCftEngine.analyze_complex(req)
        assert res.geometry == "tetrahedral"
        assert res.coordination_number == 4
        assert res.spin_state == "high_spin"
        # Level 0 is 'e' with negative energy delta, Level 1 is 't2' with positive delta
        assert res.orbital_levels[0].label == "e"
        assert res.orbital_levels[0].energy_delta == -0.6
        assert res.orbital_levels[1].label == "t2"
        assert res.orbital_levels[1].energy_delta == +0.4

    def test_square_planar_d8_diamagnetism(self):
        """Tests Pt(II) d8 square planar geometry producing diamagnetism with empty dx2-y2."""
        req = CoordinationAnalysisRequest(
            metal_symbol="Pt",
            oxidation_state=2,
            ligand_id="cl",
            geometry="square_planar",
        )
        res = CoordinationCftEngine.analyze_complex(req)
        assert res.geometry == "square_planar"
        assert res.coordination_number == 4
        assert res.unpaired_electrons == 0
        assert res.is_paramagnetic is False
        # The highest orbital dx2-y2 should have 0 electrons
        highest_orbital = res.orbital_levels[-1]
        assert highest_orbital.label == "dx2-y2"
        assert highest_orbital.electron_count == 0

    def test_jahn_teller_distortion_detection(self):
        """Verifies strong Jahn-Teller elongation in Cu(II) d9 and absence in d3/d8."""
        # Cu(II) d9 -> strong elongation
        req_cu = CoordinationAnalysisRequest(
            metal_symbol="Cu",
            oxidation_state=2,
            ligand_id="h2o",
            geometry="octahedral",
        )
        res_cu = CoordinationCftEngine.analyze_complex(req_cu)
        assert res_cu.jahn_teller_distortion == "strong_elongation"

        # Cr(III) d3 -> none
        req_cr = CoordinationAnalysisRequest(
            metal_symbol="Cr",
            oxidation_state=3,
            ligand_id="h2o",
            geometry="octahedral",
        )
        res_cr = CoordinationCftEngine.analyze_complex(req_cr)
        assert res_cr.jahn_teller_distortion == "none"

        # Ni(II) d8 -> none
        req_ni = CoordinationAnalysisRequest(
            metal_symbol="Ni",
            oxidation_state=2,
            ligand_id="h2o",
            geometry="octahedral",
        )
        res_ni = CoordinationCftEngine.analyze_complex(req_ni)
        assert res_ni.jahn_teller_distortion == "none"

    def test_spectrochemical_series_ranking(self):
        """Verifies strict spectrochemical ordering from weak-field iodide to strong-field CO."""
        ligands = CoordinationCftEngine.get_all_ligands()
        ranks = [l.spectrochemical_rank for l in ligands]
        # Must be strictly increasing
        assert ranks == sorted(ranks)
        assert ligands[0].id == "i"
        assert ligands[-1].id == "co"
