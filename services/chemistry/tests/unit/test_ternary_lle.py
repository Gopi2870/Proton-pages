"""Unit tests for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE) engine."""

import math
import pytest
from app.models.ternary_lle import TernaryPoint, TieLine
from app.services.ternary_lle_service import (
    TernaryLleEngine,
    PRESET_SYSTEMS,
    HunterNashSimulationRequest,
)


class TestTernaryLleEngine:
    """Scientific validation suite for ternary LLE calculations."""

    def test_equilateral_cartesian_projection(self):
        """Validates equilateral triangular projection geometry."""
        # Vertex A (Carrier): x_A=1, x_B=0, x_C=0 -> (0, 0)
        pt_a = TernaryPoint(x_a=1.0, x_b=0.0, x_c=0.0)
        ax, ay = pt_a.to_cartesian()
        assert ax == pytest.approx(0.0, abs=1e-6)
        assert ay == pytest.approx(0.0, abs=1e-6)

        # Vertex B (Solvent): x_A=0, x_B=1, x_C=0 -> (1, 0)
        pt_b = TernaryPoint(x_a=0.0, x_b=1.0, x_c=0.0)
        bx, by = pt_b.to_cartesian()
        assert bx == pytest.approx(1.0, abs=1e-6)
        assert by == pytest.approx(0.0, abs=1e-6)

        # Vertex C (Solute): x_A=0, x_B=0, x_C=1 -> (0.5, sqrt(3)/2)
        pt_c = TernaryPoint(x_a=0.0, x_b=0.0, x_c=1.0)
        cx, cy = pt_c.to_cartesian()
        assert cx == pytest.approx(0.5, abs=1e-6)
        assert cy == pytest.approx(math.sqrt(3.0) / 2.0, abs=1e-6)

        # Centroid: (1/3, 1/3, 1/3)
        pt_m = TernaryPoint(x_a=1/3, x_b=1/3, x_c=1/3)
        mx, my = pt_m.to_cartesian()
        assert mx == pytest.approx(0.5, abs=1e-6)
        assert my == pytest.approx(math.sqrt(3.0) / 6.0, abs=1e-6)

    def test_hand_correlation_consistency(self):
        """Verifies Hand correlation linearity (R^2 >= 0.95) on benchmark system."""
        sys = PRESET_SYSTEMS["water_toluene_acetic_acid"]
        corr = TernaryLleEngine.calculate_hand_correlation(sys.tie_lines)
        assert corr.r_squared >= 0.95
        assert corr.is_consistent is True
        assert len(corr.data_points) == len(sys.tie_lines)
        # Slope should be positive
        assert corr.slope > 0.0

    def test_othmer_tobias_correlation_consistency(self):
        """Verifies Othmer-Tobias correlation linearity (R^2 >= 0.95)."""
        sys = PRESET_SYSTEMS["water_toluene_acetic_acid"]
        corr = TernaryLleEngine.calculate_othmer_tobias_correlation(sys.tie_lines)
        assert corr.r_squared >= 0.95
        assert corr.is_consistent is True
        assert corr.slope > 0.0

    def test_mibk_acetone_correlations(self):
        """Verifies Hand and Othmer-Tobias consistency for MIBK-Water-Acetone system."""
        sys = PRESET_SYSTEMS["water_mibk_acetone"]
        hand = TernaryLleEngine.calculate_hand_correlation(sys.tie_lines)
        ot = TernaryLleEngine.calculate_othmer_tobias_correlation(sys.tie_lines)
        assert hand.r_squared >= 0.95
        assert ot.r_squared >= 0.95

    def test_two_phase_miscibility_gap_detection(self):
        """Tests that points inside the binodal envelope are detected as two-phase."""
        sys = PRESET_SYSTEMS["water_toluene_acetic_acid"]
        # Inside the gap: 50% water, 40% toluene, 10% acetic acid
        inside_pt = TernaryPoint(x_a=0.50, x_b=0.40, x_c=0.10)
        assert TernaryLleEngine.is_in_two_phase_region(sys, inside_pt) is True

        # Outside the gap (homogeneous 1-phase): high solute (e.g. 70% acetic acid)
        outside_pt = TernaryPoint(x_a=0.15, x_b=0.15, x_c=0.70)
        assert TernaryLleEngine.is_in_two_phase_region(sys, outside_pt) is False

    def test_tie_line_interpolation(self):
        """Tests conjugate raffinate interpolation from extract solute fraction."""
        sys = PRESET_SYSTEMS["water_toluene_acetic_acid"]
        # Moderate extract solute fraction (e.g. y_c = 0.20)
        raff = TernaryLleEngine.interpolate_raffinate_from_extract(sys, 0.20)
        assert 0.0 < raff.x_c < 0.40
        assert raff.x_a > 0.60  # Raffinate is carrier-rich (water)
        assert raff.x_b < 0.10  # Low solvent fraction

    def test_hunter_nash_simulation_basic(self):
        """Tests complete Hunter-Nash multistage countercurrent extraction simulation."""
        req = HunterNashSimulationRequest(
            system_id="water_toluene_acetic_acid",
            feed_rate_kg_h=1000.0,
            feed_x_carrier=0.70,
            feed_x_solvent=0.00,
            feed_x_solute=0.30,
            solvent_rate_kg_h=1200.0,
            solvent_x_carrier=0.00,
            solvent_x_solvent=1.00,
            solvent_x_solute=0.00,
            target_raffinate_solute_fraction=0.05,
            max_stages=15,
        )
        res = TernaryLleEngine.simulate_hunter_nash(req)
        assert res.system_id == "water_toluene_acetic_acid"
        assert res.is_in_two_phase_region is True
        assert res.theoretical_stages_count >= 1
        assert len(res.stages) == res.theoretical_stages_count
        assert res.solute_recovery_percent > 70.0
        assert res.actual_solvent_ratio == 1.20
        assert res.operating_point_delta is not None
        assert res.extract_rate_kg_h > 0
        assert res.raffinate_rate_kg_h > 0
        assert res.stages[-1].raffinate.x_c <= 0.06

    def test_hunter_nash_solvent_ratio_comparison(self):
        """Tests that increasing solvent flow rate improves solute recovery and reduces required stages."""
        req_low = HunterNashSimulationRequest(
            system_id="water_mibk_acetone",
            feed_rate_kg_h=1000.0,
            feed_x_carrier=0.75,
            feed_x_solvent=0.00,
            feed_x_solute=0.25,
            solvent_rate_kg_h=800.0,
            target_raffinate_solute_fraction=0.05,
            max_stages=15,
        )
        res_low = TernaryLleEngine.simulate_hunter_nash(req_low)

        req_high = HunterNashSimulationRequest(
            system_id="water_mibk_acetone",
            feed_rate_kg_h=1000.0,
            feed_x_carrier=0.75,
            feed_x_solvent=0.00,
            feed_x_solute=0.25,
            solvent_rate_kg_h=1600.0,
            target_raffinate_solute_fraction=0.05,
            max_stages=15,
        )
        res_high = TernaryLleEngine.simulate_hunter_nash(req_high)

        assert res_high.actual_solvent_ratio > res_low.actual_solvent_ratio
        assert res_high.solute_recovery_percent >= res_low.solute_recovery_percent
