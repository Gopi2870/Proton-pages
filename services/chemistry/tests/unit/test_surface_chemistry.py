"""Unit tests for Surface Chemistry, Heterogeneous Catalysis & Adsorption Engine (PR #041)."""

import pytest
from app.schemas.surface_chemistry import (
    BetCalculationRequest,
    IsothermComparisonRequest,
    CatalysisSimulationRequest,
)
from app.services.surface_chemistry_service import SurfaceChemistryEngine, CURATED_MATERIALS


class TestSurfaceChemistryEngine:
    """Scientific validation suite for BET physisorption, isotherms, and heterogeneous catalysis."""

    def test_curated_materials_catalog(self):
        """Verifies curated library of porous materials."""
        materials = SurfaceChemistryEngine.get_materials()
        assert len(materials) >= 4
        ids = [m.id for m in materials]
        assert "mcm_41" in ids
        assert "activated_carbon" in ids
        assert "zeolite_zsm5" in ids
        assert "gamma_alumina" in ids

    def test_linear_regression(self):
        """Validates standard least-squares regression calculations."""
        x = [1.0, 2.0, 3.0, 4.0, 5.0]
        y = [2.0, 4.0, 6.0, 8.0, 10.0]
        slope, intercept, r2 = SurfaceChemistryEngine.linear_regression(x, y)
        assert slope == pytest.approx(2.0, abs=1e-5)
        assert intercept == pytest.approx(0.0, abs=1e-5)
        assert r2 == pytest.approx(1.0, abs=1e-5)

    def test_bet_surface_area_mcm41(self):
        """Validates multi-point BET analysis for MCM-41 mesoporous silica."""
        req = BetCalculationRequest(
            material_id="mcm_41",
            sample_mass_g=1.0,
            adsorbate_cross_section_nm2=0.162,
        )
        res = SurfaceChemistryEngine.calculate_bet_surface_area(req)

        assert res.material_name == "MCM-41 Ordered Mesoporous Silica"
        assert res.bet_fit.r_squared >= 0.99
        assert res.bet_fit.is_c_positive is True
        assert res.bet_fit.c_parameter > 20.0

        # Literature BET surface area for MCM-41 is ~985 m2/g
        assert res.bet_fit.specific_surface_area_m2_g == pytest.approx(985.0, rel=0.1)
        assert res.bet_fit.monolayer_capacity_vm == pytest.approx(226.0, rel=0.1)

    def test_bet_surface_area_activated_carbon(self):
        """Validates BET surface area for microporous activated carbon."""
        req = BetCalculationRequest(
            material_id="activated_carbon",
            sample_mass_g=1.0,
        )
        res = SurfaceChemistryEngine.calculate_bet_surface_area(req)

        # High-surface carbon exceeds 1000 m2/g
        assert res.bet_fit.specific_surface_area_m2_g > 1000.0
        assert res.bet_fit.r_squared >= 0.98

    def test_isotherm_comparison_models(self):
        """Validates Langmuir, Freundlich, and BET model fitting on isotherm dataset."""
        req = IsothermComparisonRequest(material_id="mcm_41")
        res = SurfaceChemistryEngine.compare_isotherms(req)

        assert res.material_name == "MCM-41 Ordered Mesoporous Silica"
        assert len(res.experimental_points) >= 10
        assert res.langmuir_fit.r_squared > 0.80
        assert res.freundlich_fit.r_squared > 0.85
        assert res.bet_fit.r_squared >= 0.98
        assert res.best_fitting_model in ["Langmuir", "Freundlich", "BET"]

    def test_catalysis_kinetics_langmuir_hinshelwood_peak(self):
        """Validates Langmuir-Hinshelwood dual-site volcano peak and self-poisoning."""
        req = CatalysisSimulationRequest(
            mechanism="both",
            rate_constant_k=1.0e-3,
            adsorption_constant_ka=0.1,  # 0.1 kPa^-1
            adsorption_constant_kb=0.05,  # 0.05 kPa^-1
            fixed_partial_pressure_b_kpa=20.0,
            max_pressure_a_kpa=100.0,
            points_count=50,
        )
        res = SurfaceChemistryEngine.simulate_catalysis_kinetics(req)

        # Theoretical peak P_A = (1 + K_B * P_B) / K_A = (1 + 0.05 * 20) / 0.1 = 2.0 / 0.1 = 20.0 kPa
        assert res.lh_peak_pressure_a_kpa == pytest.approx(20.0, abs=0.5)

        # Check that beyond 20 kPa, rate declines due to site blockage by A
        peak_rate = res.lh_maximum_rate
        high_pressure_pt = res.kinetics_curve[-1]  # at P_A = 100 kPa
        assert high_pressure_pt.rate_langmuir_hinshelwood < peak_rate

    def test_catalysis_kinetics_eley_rideal_monotonic(self):
        """Validates Eley-Rideal single-site impact rate monotonically increases toward saturation."""
        req = CatalysisSimulationRequest(
            mechanism="both",
            rate_constant_k=1.0e-3,
            adsorption_constant_ka=0.1,
            adsorption_constant_kb=0.05,
            fixed_partial_pressure_b_kpa=20.0,
            max_pressure_a_kpa=80.0,
            points_count=40,
        )
        res = SurfaceChemistryEngine.simulate_catalysis_kinetics(req)

        # Check monotonic rise: rate at index 10 < rate at index 20 < rate at index 35
        curve = res.kinetics_curve
        assert curve[10].rate_eley_rideal < curve[20].rate_eley_rideal
        assert curve[20].rate_eley_rideal < curve[35].rate_eley_rideal
