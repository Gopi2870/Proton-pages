"""Unit tests for Colligative Properties & Solution Chemistry Engine."""

import pytest
import math
from app.services.colligative_service import (
    ColligativeEngine,
    SOLVENTS_DB,
    SOLUTES_DB,
)
from app.models.colligative import SolutionModelType


class TestColligativeEngine:
    def test_antoine_pure_vapor_pressure(self):
        """Validates Antoine equation for water against standard thermodynamic tables."""
        water = SOLVENTS_DB["water"]

        # Normal boiling point: at 100 C, P* should be 760 mmHg (101.325 kPa)
        p_100c = ColligativeEngine.calculate_pure_vapor_pressure_mmhg(water, 100.0)
        assert p_100c == pytest.approx(760.0, rel=0.01)

        # Ambient temperature: at 25 C, P* should be approx 23.76 mmHg
        p_25c = ColligativeEngine.calculate_pure_vapor_pressure_mmhg(water, 25.0)
        assert p_25c == pytest.approx(23.76, rel=0.02)

    def test_ideal_raoult_vapor_pressure(self):
        """Benzene-Toluene ideal mixture: P = x1*P1* + x2*P2* with gamma = 1.0."""
        res = ColligativeEngine.calculate_vapor_pressure_binary(
            solvent1_id="benzene",
            solvent2_id="toluene",
            temperature_c=25.0,
            x1=0.50,
            a12_param=0.0,
        )

        assert res.model_type == SolutionModelType.IDEAL_RAOULT
        assert res.activity_coeff_1 == pytest.approx(1.0, abs=1e-4)
        assert res.activity_coeff_2 == pytest.approx(1.0, abs=1e-4)

        expected_ptot_kpa = 0.5 * res.p1_pure_kpa + 0.5 * res.p2_pure_kpa
        assert res.total_vapor_pressure_kpa == pytest.approx(expected_ptot_kpa, abs=0.01)
        assert res.azeotrope_detected is False
        assert len(res.vle_curve) == 21

    def test_non_ideal_margules_azeotrope(self):
        """Ethanol-Water positive deviation (A12 = 1.25) generates minimum-boiling azeotrope."""
        res = ColligativeEngine.calculate_vapor_pressure_binary(
            solvent1_id="ethanol",
            solvent2_id="water",
            temperature_c=78.15,
            x1=0.40,
            a12_param=1.25,
        )

        assert res.model_type == SolutionModelType.MARGULES_TWO_SUFFIX
        assert res.activity_coeff_1 > 1.0
        assert res.activity_coeff_2 > 1.0
        assert res.azeotrope_detected is True
        assert res.azeotrope_x1 is not None

    def test_boiling_elevation_and_freezing_depression(self):
        """NaCl (5.844 g, 0.10 mol) in 1000 g water -> molality = 0.10 m, i = 2."""
        res = ColligativeEngine.calculate_boiling_freezing(
            solvent_id="water",
            solute_id="nacl",
            solute_mass_g=5.8443,
            solvent_mass_g=1000.0,
        )

        assert res.molality_m == pytest.approx(0.10, abs=1e-3)
        assert res.van_t_hoff_factor_i == 2.0

        # Delta Tb = 2 * 0.512 * 0.10 = 0.1024 C
        assert res.delta_tb_c == pytest.approx(0.1024, abs=1e-3)
        assert res.solution_boiling_point_c == pytest.approx(100.1024, abs=1e-3)

        # Delta Tf = 2 * 1.86 * 0.10 = 0.372 C
        assert res.delta_tf_c == pytest.approx(0.372, abs=1e-3)
        assert res.solution_freezing_point_c == pytest.approx(-0.372, abs=1e-3)
        assert res.dilute_limit_exceeded is False

    def test_camphor_molar_mass_determination(self):
        """Rast cryoscopic method: 1.00 g unknown in 10.0 g camphor (Kf = 39.7 C*kg/mol)."""
        # If Delta Tf observed = 19.85 C, M = (Kf * mass) / (delta_tf * kg_solvent) = (39.7 * 1.0) / (19.85 * 0.01) = 200 g/mol
        res = ColligativeEngine.calculate_boiling_freezing(
            solvent_id="camphor",
            solute_id="glucose",
            solute_mass_g=1.00,
            solvent_mass_g=10.0,
            custom_i=1.0,
            observed_delta_tf=19.85,
        )

        assert res.estimated_molar_mass_g_mol == pytest.approx(200.0, rel=0.01)

    def test_dilute_solution_limit_warning(self):
        """Molality exceeding 1.0 mol/kg triggers dilute limit warning."""
        res = ColligativeEngine.calculate_boiling_freezing(
            solvent_id="water",
            solute_id="nacl",
            solute_mass_g=116.88,  # 2.0 mol in 1000 g -> m = 2.0
            solvent_mass_g=1000.0,
        )

        assert res.molality_m == pytest.approx(2.0, abs=0.05)
        assert res.dilute_limit_exceeded is True
        assert res.applicability_warning is not None
        assert "exceeds the dilute solution limit" in res.applicability_warning

    def test_osmotic_pressure_and_isotonicity(self):
        """0.154 M NaCl at 37 C (blood body temperature) produces physiological isotonic pressure."""
        res = ColligativeEngine.calculate_osmotic_pressure(
            solute_name="Normal Saline (0.9% NaCl)",
            temperature_c=37.0,
            solute_mass_g=9.0,
            solution_volume_l=1.0,
            molar_mass_g_mol=58.443,
            van_t_hoff_i=2.0,
        )

        # Pi = 2 * (9.0 / 58.443) * 0.082057 * 310.15 K approx = 7.85 atm
        assert res.osmotic_pressure_atm == pytest.approx(7.85, rel=0.03)
        assert res.is_isotonic_blood is True
        assert "Isotonic" in res.tonicity_category

    def test_ionic_strength_and_debye_huckel(self):
        """CaCl2 (0.05 M) -> I = 0.5*(0.05*2^2 + 0.10*1^2) = 0.15 M."""
        res = ColligativeEngine.calculate_ionic_strength_activity(
            electrolyte_id="cacl2",
            molarity_m=0.05,
            temperature_c=25.0,
            ion_radius_angstrom=3.0,
        )

        assert res.ionic_strength_i == pytest.approx(0.15, abs=1e-4)
        assert res.cation_charge_z_plus == 2
        assert res.anion_charge_z_minus == 1

        # Activity coefficient must be less than 1.0 due to electrostatic screening
        assert 0.0 < res.dhll_gamma_plus_minus < 1.0
        assert 0.0 < res.extended_dh_gamma_plus_minus < 1.0
        assert 0.0 < res.davies_gamma_plus_minus < 1.0
        assert len(res.activity_curve) == 11
