"""Unit tests for Statistical Thermodynamics & Molecular Partition Functions (PR #043)."""

import math
import pytest
from app.models.statistical_thermo import MoleculeSpec
from app.schemas.statistical_thermo import (
    PartitionFunctionCalculationRequest,
    TemperatureSweepRequest,
)
from app.services.statistical_thermo_service import (
    StatisticalThermoEngine,
    CURATED_MOLECULES,
    R_GAS,
    KB,
    PLANCK_H,
    AVOGADRO_NA,
)


class TestStatisticalThermoEngine:
    """Scientific validation suite for molecular partition functions and thermodynamic state derivations."""

    def test_curated_molecules_catalog(self):
        """Verifies curated molecular specifications are registered and accurate."""
        molecules = StatisticalThermoEngine.get_molecules()
        assert len(molecules) >= 6
        ids = [m.id for m in molecules]
        assert "ar" in ids
        assert "n2" in ids
        assert "co2" in ids
        assert "h2o" in ids
        assert "ch4" in ids

    def test_argon_sackur_tetrode_monatomic_entropy(self):
        """Validates Sackur-Tetrode standard molar entropy of Argon at 298.15 K, 1 bar (10^5 Pa)."""
        req = PartitionFunctionCalculationRequest(
            molecule_id="ar",
            temperature_k=298.15,
            pressure_pa=100000.0,
        )
        res = StatisticalThermoEngine.calculate(req)

        # Monatomic has no rotational or vibrational modes
        assert res.partition_functions.q_rot == 1.0
        assert res.partition_functions.q_vib == 1.0
        assert res.partition_functions.q_elec == 1.0

        # Exact literature value for Argon standard entropy: S° = 154.84 J / (mol K)
        s_calc = res.thermodynamic_state.entropy_standard_j_mol_k
        assert pytest.approx(154.84, abs=0.25) == s_calc

        # Monatomic heat capacities: Cv = 3/2 R, Cp = 5/2 R
        assert pytest.approx(1.5 * R_GAS, abs=0.01) == res.heat_capacity.cv_total
        assert pytest.approx(2.5 * R_GAS, abs=0.01) == res.heat_capacity.cp_total

    def test_dinitrogen_partition_functions_and_freezeout(self):
        """Validates N2 linear rotor partition function and vibrational freeze-out at room temp."""
        req = PartitionFunctionCalculationRequest(
            molecule_id="n2",
            temperature_k=298.15,
            pressure_pa=100000.0,
        )
        res = StatisticalThermoEngine.calculate(req)

        # N2: sigma = 2, Theta_rot ~ 2.875 K => q_rot = T / (2 * 2.875) ~ 51.8
        assert res.partition_functions.q_rot > 50.0
        # Vibrational wavenumber = 2358.6 cm^-1 => Theta_vib ~ 3393 K >> 298 K => q_vib ~ 1.0000
        assert pytest.approx(1.0, abs=0.001) == res.partition_functions.q_vib

        # At 298 K, vibration is frozen out, so Cv ~ 5/2 R = 20.785 J/(mol K)
        cv = res.heat_capacity.cv_total
        assert pytest.approx(2.5 * R_GAS, abs=0.05) == cv

        # Standard entropy S° for N2 ~ 191.6 J/(mol K)
        s_calc = res.thermodynamic_state.entropy_standard_j_mol_k
        assert pytest.approx(191.6, abs=0.6) == s_calc

    def test_water_polyatomic_asymmetric_rotor(self):
        """Validates H2O asymmetric polyatomic rotor and 3 normal modes."""
        req = PartitionFunctionCalculationRequest(
            molecule_id="h2o",
            temperature_k=298.15,
            pressure_pa=100000.0,
        )
        res = StatisticalThermoEngine.calculate(req)

        # Non-linear rotor has Cv_trans = 1.5 R, Cv_rot = 1.5 R => base Cv = 3 R
        assert res.heat_capacity.cv_trans == pytest.approx(1.5 * R_GAS, abs=0.01)
        assert res.heat_capacity.cv_rot == pytest.approx(1.5 * R_GAS, abs=0.01)
        # Lowest bend is 1595 cm^-1 (Theta_vib ~ 2295 K), minor vibrational excitation at 298 K
        assert res.heat_capacity.cv_total > 3.0 * R_GAS

        # Standard molar entropy for H2O vapor ~ 188.8 J/(mol K)
        s_calc = res.thermodynamic_state.entropy_standard_j_mol_k
        assert pytest.approx(188.8, abs=0.8) == s_calc

    def test_co2_degenerate_bending_heat_capacity(self):
        """Validates CO2 low-frequency bending modes contribution to Cv at 298.15 K."""
        req = PartitionFunctionCalculationRequest(
            molecule_id="co2",
            temperature_k=298.15,
            pressure_pa=100000.0,
        )
        res = StatisticalThermoEngine.calculate(req)

        # Bending modes at 667.4 cm^-1 (Theta ~ 960 K) are partially active at 298 K
        # Cv should exceed 5/2 R = 20.785 J/(mol K), typically around 28.8 J/(mol K)
        cv = res.heat_capacity.cv_total
        assert cv > 27.0
        assert cv < 30.5

    def test_temperature_sweep_freezeout_curve(self):
        """Validates temperature sweep showing low-T plateau to high-T equipartition transition."""
        req = TemperatureSweepRequest(
            molecule_id="n2",
            temp_min_k=50.0,
            temp_max_k=3000.0,
            points_count=30,
        )
        res = StatisticalThermoEngine.temperature_sweep(req)

        assert len(res.curve) == 30
        first_pt = res.curve[0]
        last_pt = res.curve[-1]

        # At 50 K: Cv ~ 5/2 R (vibration completely frozen)
        assert pytest.approx(2.5 * R_GAS, abs=0.1) == first_pt.cv_j_mol_k

        # At 3000 K: Cv approaches full equipartition limit 7/2 R (29.1 J/mol K)
        assert last_pt.cv_j_mol_k > 28.0
        assert last_pt.fraction_equipartition > 0.95

    def test_unphysical_inputs_validation(self):
        """Verifies rejection of non-positive temperature or pressure."""
        with pytest.raises(ValueError, match="(greater than 0|Temperature must be positive)"):
            StatisticalThermoEngine.calculate(
                PartitionFunctionCalculationRequest(
                    molecule_id="ar",
                    temperature_k=-50.0,
                )
            )

        with pytest.raises(ValueError, match="(greater than 0|Pressure must be positive)"):
            StatisticalThermoEngine.calculate(
                PartitionFunctionCalculationRequest(
                    molecule_id="ar",
                    temperature_k=298.15,
                    pressure_pa=-100.0,
                )
            )
