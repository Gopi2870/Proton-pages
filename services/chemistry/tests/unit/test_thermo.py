"""
Unit Tests for Thermochemistry and Hess's Law Calculations.
Scientifically verified against NIST Chemistry WebBook standard values.
"""
import pytest
from services.chemistry.app.services.thermo_service import ThermoService

class TestThermochemistryEngine:
    def test_species_lookup(self):
        co2 = ThermoService.get_species("CO2")
        assert co2 is not None
        assert co2.formula == "CO2(g)"
        assert co2.delta_h_f_kj_mol == -393.51
        assert co2.s_molar_j_mol_k == 213.74

        h2o_l = ThermoService.get_species("H2O(l)")
        assert h2o_l is not None
        assert h2o_l.delta_h_f_kj_mol == -285.83

    def test_methane_combustion_enthalpy(self):
        # CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)
        # Expected: Delta H = (-393.51 + 2*(-285.83)) - (-74.87) = -890.30 kJ
        reactants = [(1.0, "CH4(g)"), (2.0, "O2(g)")]
        products = [(1.0, "CO2(g)"), (2.0, "H2O(l)")]
        result = ThermoService.calculate_reaction_thermo(reactants, products, temperature_kelvin=298.15)

        assert pytest.approx(result.delta_h_standard_kj, rel=1e-3) == -890.30
        assert result.is_exothermic is True
        assert result.is_spontaneous is True
        assert result.delta_g_standard_kj < 0

    def test_haber_bosch_ammonia_synthesis(self):
        # N2(g) + 3 H2(g) -> 2 NH3(g)
        # Delta H = 2 * (-46.11) = -92.22 kJ
        # Delta S = 2 * 192.45 - (191.61 + 3 * 130.68) = -198.75 J/K
        reactants = [(1.0, "N2(g)"), (3.0, "H2(g)")]
        products = [(2.0, "NH3(g)")]
        result = ThermoService.calculate_reaction_thermo(reactants, products, temperature_kelvin=298.15)

        assert pytest.approx(result.delta_h_standard_kj, rel=1e-3) == -92.22
        assert pytest.approx(result.delta_s_standard_j_k, rel=1e-2) == -198.75
        assert "Spontaneous at low temperatures" in result.spontaneity_condition

    def test_equation_string_parsing(self):
        reactants, products = ThermoService.parse_equation_components("C3H8(g) + 5 O2(g) -> 3 CO2(g) + 4 H2O(l)")
        assert len(reactants) == 2
        assert reactants[0] == (1.0, "C3H8(g)")
        assert reactants[1] == (5.0, "O2(g)")
        assert len(products) == 2
        assert products[0] == (3.0, "CO2(g)")
        assert products[1] == (4.0, "H2O(l)")

    def test_hess_law_exact_solver(self):
        # Target: Synthesis of carbon monoxide:
        # C(s) + 0.5 O2(g) -> CO(g)
        # Intermediate 1: C(s) + O2(g) -> CO2(g), Delta H = -393.51 kJ
        # Intermediate 2: CO(g) + 0.5 O2(g) -> CO2(g), Delta H = -282.98 kJ
        # Target = Int 1 - Int 2 => Delta H = -393.51 - (-282.98) = -110.53 kJ
        target = "C(s) + 0.5 O2(g) -> CO(g)"
        intermediates = [
            {"equation": "C(s) + O2(g) -> CO2(g)", "delta_h_kj": -393.51},
            {"equation": "CO(g) + 0.5 O2(g) -> CO2(g)", "delta_h_kj": -282.98}
        ]
        solution = ThermoService.solve_hess_law(target, intermediates)

        assert solution.is_solvable is True
        assert len(solution.steps) == 2
        assert pytest.approx(solution.steps[0].multiplier, abs=1e-3) == 1.0
        assert pytest.approx(solution.steps[1].multiplier, abs=1e-3) == -1.0
        assert pytest.approx(solution.target_delta_h_kj, abs=1e-2) == -110.53

    def test_unsolvable_hess_law_detected(self):
        target = "C(s) + 2 H2(g) -> CH4(g)"
        intermediates = [
            {"equation": "H2(g) + 0.5 O2(g) -> H2O(l)", "delta_h_kj": -285.83}
        ]
        solution = ThermoService.solve_hess_law(target, intermediates)
        assert solution.is_solvable is False

    def test_missing_reference_raises_value_error(self):
        with pytest.raises(ValueError, match="Thermodynamic reference data unavailable"):
            ThermoService.calculate_reaction_thermo(
                reactants=[(1.0, "NonExistentChemicalX123")],
                products=[(1.0, "CO2(g)")]
            )
