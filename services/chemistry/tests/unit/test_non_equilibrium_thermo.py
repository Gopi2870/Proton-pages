"""Unit tests for Non-Equilibrium Thermodynamics & Onsager Reciprocal Relations (PR #044)."""

import math
import pytest
from app.schemas.non_equilibrium_thermo import (
    TransportCouplingRequest,
    ThermoelectricAnalysisRequest,
    ElectrokineticAnalysisRequest,
    ThermodiffusionAnalysisRequest,
)

from app.services.non_equilibrium_thermo_service import (
    NonEquilibriumThermoEngine,
    CURATED_THERMOELECTRIC_MATERIALS,
    CURATED_ELECTROKINETIC_SYSTEMS,
)


class TestNonEquilibriumThermoEngine:
    """Scientific validation suite for linear irreversible thermodynamics, Onsager symmetry, and cross-effects."""

    def test_benchmark_systems_catalog(self):
        """Verifies curated coupled transport benchmark systems are registered."""
        systems = NonEquilibriumThermoEngine.get_benchmark_systems()
        assert len(systems) >= 3
        ids = [s.id for s in systems]
        assert "thermoelectric" in ids
        assert "thermodiffusion" in ids
        assert "electrokinetic" in ids

    def test_onsager_symmetry_and_positive_entropy_production(self):
        """Validates Onsager symmetry detection and positive entropy production rate."""
        # 2x2 symmetric positive-definite transport matrix
        mat_l = [[5.0, 2.0], [2.0, 8.0]]
        forces = [3.0, -1.0]
        req = TransportCouplingRequest(
            matrix_l=mat_l,
            driving_forces=forces,
            temperature_k=300.0,
        )
        res = NonEquilibriumThermoEngine.evaluate_transport_coupling(req)

        assert res.transport_matrix.is_symmetric is True
        assert res.transport_matrix.asymmetry_norm == pytest.approx(0.0, abs=1e-9)
        assert res.transport_matrix.is_positive_semidefinite is True
        assert res.entropy_production.is_physically_admissible is True
        assert res.entropy_production.second_law_satisfied is True
        assert res.entropy_production.entropy_production_w_m3_k > 0.0

    def test_negative_cross_coupling_admissibility(self):
        """Verifies that negative cross-coefficients (e.g. n-type Seebeck or negative Soret)

        are physically admissible as long as the matrix is positive semi-definite (|q| <= 1).
        """
        # L_12 = -4.0 is negative, but det = 10*10 - 16 = 84 > 0, q = -0.4
        mat_negative_cross = [[10.0, -4.0], [-4.0, 10.0]]
        forces = [2.0, 3.0]
        req = TransportCouplingRequest(
            matrix_l=mat_negative_cross,
            driving_forces=forces,
            temperature_k=298.15,
        )
        res = NonEquilibriumThermoEngine.evaluate_transport_coupling(req)

        assert res.transport_matrix.coupling_factor_q == -0.4
        assert res.transport_matrix.is_positive_semidefinite is True
        assert res.entropy_production.is_physically_admissible is True
        # Dissipation: [10*2 - 4*3]*2 + [-4*2 + 10*3]*3 = 8*2 + 22*3 = 16 + 66 = 82 > 0
        assert res.entropy_production.dissipation_rate_w_m3 == pytest.approx(82.0, abs=1e-3)
        assert res.entropy_production.entropy_production_w_m3_k > 0.0

    def test_second_law_violation_detection(self):
        """Verifies that non-positive-definite matrices (|q| > 1) are flagged as physically inadmissible."""
        # det = 2*2 - 5^2 = 4 - 25 = -21 < 0 (unphysical excessive coupling)
        mat_unphysical = [[2.0, 5.0], [5.0, 2.0]]
        forces = [1.0, -1.0]
        req = TransportCouplingRequest(
            matrix_l=mat_unphysical,
            driving_forces=forces,
            temperature_k=300.0,
        )
        res = NonEquilibriumThermoEngine.evaluate_transport_coupling(req)

        assert res.transport_matrix.is_positive_semidefinite is False
        assert res.entropy_production.is_physically_admissible is False
        # For X = [1, -1], Phi = [2*1 - 5*1]*1 + [5*1 - 2*1]*(-1) = -3 - 3 = -6 < 0 (violates 2nd law)
        assert res.entropy_production.dissipation_rate_w_m3 < 0.0
        assert res.entropy_production.second_law_satisfied is False

    def test_thermoelectric_second_kelvin_relation_n_and_p_type(self):
        """Validates that Onsager symmetry equates Peltier coefficient Pi to Seebeck S * T.

        Tests both n-type (negative Seebeck) and p-type (positive Seebeck) bismuth telluride.
        """
        # n-type Bi2Te3 (electrons: S < 0)
        req_n = ThermoelectricAnalysisRequest(
            material_id="bi2te3_n_type",
            temperature_k=300.0,
        )
        res_n = NonEquilibriumThermoEngine.evaluate_thermoelectric_system(req_n)
        assert res_n.system.seebeck_coefficient_uv_k < 0.0
        assert res_n.system.peltier_coefficient_mv < 0.0
        # Second Kelvin relation: Pi = S * T identically
        assert res_n.second_kelvin_law_verified is True
        assert res_n.system.kelvin_relation_residual_pct == pytest.approx(0.0, abs=1e-6)

        # p-type Bi2Te3 (holes: S > 0)
        req_p = ThermoelectricAnalysisRequest(
            material_id="bi2te3_p_type",
            temperature_k=300.0,
        )
        res_p = NonEquilibriumThermoEngine.evaluate_thermoelectric_system(req_p)
        assert res_p.system.seebeck_coefficient_uv_k > 0.0
        assert res_p.system.peltier_coefficient_mv > 0.0
        assert res_p.second_kelvin_law_verified is True
        assert res_p.system.figure_of_merit_zt > 0.8

    def test_saxen_electrokinetic_reciprocal_relation(self):
        """Validates Saxen reciprocal relation (Iv / I)_{DP=0} == -(DeltaV / DeltaP)_{I=0}."""
        req = ElectrokineticAnalysisRequest(
            medium_id="glass_capillary_water",
            pressure_drop_kpa=50.0,
            voltage_difference_v=100.0,
        )
        res = NonEquilibriumThermoEngine.evaluate_electrokinetic_system(req)

        assert res.saxen_reciprocity_holds is True
        assert res.system.saxen_reciprocity_verified is True
        assert res.system.saxen_relative_error_pct == pytest.approx(0.0, abs=1e-6)
        assert res.volume_flow_rate_m3_s > 0.0
        assert res.electric_current_a > 0.0

    def test_thermodiffusion_soret_and_dufour_benchmark(self):
        """Validates benchmark thermodiffusion in toluene-cyclohexane with positive Soret effect."""
        req = ThermodiffusionAnalysisRequest(
            mixture_id="toluene_cyclohexane",
            temperature_k=298.15,
            temperature_gradient_k_m=200.0,
            mass_fraction_gradient_m_inv=0.5,
        )
        res = NonEquilibriumThermoEngine.evaluate_thermodiffusion_system(req)

        assert res.onsager_reciprocity_verified is True
        assert res.system.soret_coefficient_k_inv > 0.0
        assert res.system.thermal_diffusion_coeff_m2_s_k > 0.0
        assert res.system.onsager_cross_coupling_ratio == 1.000
        assert res.entropy_production_w_m3_k > 0.0
        assert res.steady_state_separation_pct != 0.0

    def test_thermodiffusion_water_ethanol_negative_soret(self):
        """Validates thermophilic migration in water-ethanol with negative Soret coefficient."""
        req = ThermodiffusionAnalysisRequest(
            mixture_id="water_ethanol",
            temperature_k=298.15,
            temperature_gradient_k_m=200.0,
            mass_fraction_gradient_m_inv=0.5,
        )
        res = NonEquilibriumThermoEngine.evaluate_thermodiffusion_system(req)

        assert res.system.soret_coefficient_k_inv < 0.0
        assert res.system.thermal_diffusion_coeff_m2_s_k < 0.0
        # For negative Soret, steady state separation has opposite sign (solute enriches warm boundary)
        assert res.steady_state_separation_pct > 0.0

    def test_thermodiffusion_macromolecule_giant_soret(self):
        """Validates high Soret coefficient and thermophoresis for polystyrene macromolecule."""
        req = ThermodiffusionAnalysisRequest(
            mixture_id="polystyrene_toluene",
            temperature_k=298.15,
        )
        res = NonEquilibriumThermoEngine.evaluate_thermodiffusion_system(req)

        assert res.system.soret_coefficient_k_inv >= 0.01
        assert abs(res.steady_state_separation_pct) >= 0.5


    def test_unphysical_inputs_validation(self):

        """Verifies rejection of non-square matrix or non-positive temperature."""
        with pytest.raises(ValueError, match="square"):
            NonEquilibriumThermoEngine.evaluate_transport_coupling(
                TransportCouplingRequest(
                    matrix_l=[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]],
                    driving_forces=[1.0, 2.0],
                    temperature_k=300.0,
                )
            )

        with pytest.raises(ValueError, match="(greater than 0|positive)"):
            NonEquilibriumThermoEngine.evaluate_transport_coupling(
                TransportCouplingRequest(
                    matrix_l=[[1.0, 0.0], [0.0, 1.0]],
                    driving_forces=[1.0, 2.0],
                    temperature_k=-50.0,
                )
            )
