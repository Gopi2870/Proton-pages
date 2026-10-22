"""Unit tests for Advanced Electroanalytical Chemistry & Cyclic Voltammetry Engine (PR #037).

Validates:
- Theoretical Randles-Sevcik peak current calculations
- Square-root scan rate (v^1/2) and linear concentration scaling
- Nicholson reversibility parameter psi and mechanism classification
- Peak-to-peak potential separation delta_Ep (59.2 mV / n limit)
- Double-layer capacitive charging current baseline
- Cottrell chronoamperometry current decay and slope derivation
"""

import math
import pytest
from app.models.electroanalytical import (
    ElectrochemicalReversibility,
)
from app.schemas.electroanalytical import (
    CyclicVoltammetryRequest,
    ChronoamperometryRequest,
)
from app.services.electroanalytical_service import (
    ElectroanalyticalEngine,
    BENCHMARK_PRESETS,
    FARADAY_F,
    GAS_R,
)


class TestElectroanalyticalEngine:
    def test_randles_sevcik_reversible_peak_current(self):
        """Validates Randles-Sevcik equation for 1.0 mM Ferricyanide at 100 mV/s."""
        # 1.0 mM = 1.0e-6 mol/cm^3
        # A = 0.0707 cm^2 (3 mm diameter glassy carbon disc)
        # D = 7.60e-6 cm^2/s
        # v = 0.10 V/s
        # n = 1, T = 298.15 K
        n = 1
        area = 0.0707
        c_mm = 1.0
        d = 7.60e-6
        v = 0.10
        t_k = 298.15

        ipa_ua = ElectroanalyticalEngine.calculate_randles_sevcik_peak_current(
            n_electrons=n,
            electrode_area_cm2=area,
            concentration_mm=c_mm,
            diffusion_coeff_cm2_s=d,
            scan_rate_v_s=v,
            temperature_k=t_k,
            is_reversible=True,
        )

        # Theoretical manual calculation:
        # i_p = 0.4463 * n * F * A * C * sqrt(n * F * v * D / (R * T))
        f_rt = FARADAY_F / (GAS_R * t_k)
        expected_ipa = 0.4463 * 1 * FARADAY_F * area * 1.0e-6 * math.sqrt(1 * f_rt * v * d) * 1.0e6
        assert ipa_ua == pytest.approx(expected_ipa, rel=1e-4)
        assert 16.0 < ipa_ua < 18.0  # Typical experimental peak current ~17 uA

    def test_scan_rate_square_root_dependency(self):
        """Diffusion-controlled Randles-Sevcik current must scale strictly with sqrt(v)."""
        v1 = 0.05
        v2 = 0.20  # 4x scan rate -> 2x peak current

        i1 = ElectroanalyticalEngine.calculate_randles_sevcik_peak_current(
            n_electrons=1,
            electrode_area_cm2=0.07,
            concentration_mm=1.0,
            diffusion_coeff_cm2_s=1e-5,
            scan_rate_v_s=v1,
        )
        i2 = ElectroanalyticalEngine.calculate_randles_sevcik_peak_current(
            n_electrons=1,
            electrode_area_cm2=0.07,
            concentration_mm=1.0,
            diffusion_coeff_cm2_s=1e-5,
            scan_rate_v_s=v2,
        )

        ratio = i2 / i1
        assert ratio == pytest.approx(math.sqrt(v2 / v1), rel=1e-3)

    def test_concentration_linear_scaling(self):
        """Peak current must scale linearly with analyte bulk concentration."""
        c1 = 1.0
        c2 = 5.0

        i1 = ElectroanalyticalEngine.calculate_randles_sevcik_peak_current(
            n_electrons=1, electrode_area_cm2=0.05, concentration_mm=c1, diffusion_coeff_cm2_s=1e-5, scan_rate_v_s=0.1
        )
        i2 = ElectroanalyticalEngine.calculate_randles_sevcik_peak_current(
            n_electrons=1, electrode_area_cm2=0.05, concentration_mm=c2, diffusion_coeff_cm2_s=1e-5, scan_rate_v_s=0.1
        )

        assert i2 / i1 == pytest.approx(5.0, rel=1e-3)

    def test_nicholson_reversibility_classification(self):
        """Validates diagnostic classification between reversible, quasi-reversible, and irreversible."""
        # 1. Fast kinetics (k0 = 0.2 cm/s) -> Reversible (psi > 7.0)
        rev, psi_rev = ElectroanalyticalEngine.diagnose_reversibility(
            k0_cm_s=0.20, diffusion_coeff_cm2_s=1e-5, scan_rate_v_s=0.10, n_electrons=1
        )
        assert rev == ElectrochemicalReversibility.REVERSIBLE
        assert psi_rev > 7.0

        # 2. Moderate kinetics (k0 = 0.002 cm/s) -> Quasi-reversible (0.001 < psi < 7.0)
        qrev, psi_qrev = ElectroanalyticalEngine.diagnose_reversibility(
            k0_cm_s=0.002, diffusion_coeff_cm2_s=1e-5, scan_rate_v_s=0.10, n_electrons=1
        )
        assert qrev == ElectrochemicalReversibility.QUASI_REVERSIBLE
        assert 0.001 < psi_qrev < 7.0

        # 3. Sluggish kinetics (k0 = 1e-6 cm/s) -> Irreversible (psi < 0.001)
        irrev, psi_irrev = ElectroanalyticalEngine.diagnose_reversibility(
            k0_cm_s=1e-6, diffusion_coeff_cm2_s=1e-5, scan_rate_v_s=0.10, n_electrons=1
        )
        assert irrev == ElectrochemicalReversibility.IRREVERSIBLE
        assert psi_irrev < 0.001

    def test_cyclic_voltammetry_reversible_nve_simulation(self):
        """Reversible simulation generates duck-shaped voltammogram with delta_Ep ≈ 59.2 mV."""
        req = CyclicVoltammetryRequest(
            preset_id="ferricyanide",
            system_name="Ferricyanide / Ferrocyanide",
            e0_v=0.360,
            n_electrons=1,
            e_start_v=0.650,
            e_switch_v=0.050,
            scan_rate_v_s=0.100,
            concentration_mm=1.0,
            diffusion_coefficient_cm2_s=7.6e-6,
            electrode_area_cm2=0.0707,
            standard_rate_constant_k0_cm_s=0.150,  # Fast kinetics -> Reversible
        )

        res = ElectroanalyticalEngine.simulate_cyclic_voltammetry(req)

        assert res.reversibility == ElectrochemicalReversibility.REVERSIBLE
        assert res.delta_ep_mv == pytest.approx(59.2, rel=0.05)
        assert res.current_ratio == pytest.approx(1.0, abs=0.05)
        assert res.e_half_v == pytest.approx(0.360, abs=0.01)
        assert len(res.voltammogram) > 100

        # Check forward and reverse scan points exist
        fwd_pts = [p for p in res.voltammogram if p.scan_direction == "forward"]
        rev_pts = [p for p in res.voltammogram if p.scan_direction == "reverse"]
        assert len(fwd_pts) > 50
        assert len(rev_pts) > 50

    def test_cyclic_voltammetry_irreversible_simulation(self):
        """Irreversible system lacks a cathodic return peak and exhibits broad overpotential."""
        req = CyclicVoltammetryRequest(
            preset_id="ascorbic_acid",
            system_name="L-Ascorbic Acid Oxidation",
            e0_v=0.060,
            n_electrons=2,
            e_start_v=-0.200,
            e_switch_v=0.600,
            scan_rate_v_s=0.100,
            concentration_mm=1.0,
            diffusion_coefficient_cm2_s=5.8e-6,
            electrode_area_cm2=0.0707,
            standard_rate_constant_k0_cm_s=1.0e-5,  # Irreversible
            transfer_coefficient_alpha=0.35,
        )

        res = ElectroanalyticalEngine.simulate_cyclic_voltammetry(req)

        assert res.reversibility == ElectrochemicalReversibility.IRREVERSIBLE
        assert res.delta_ep_mv is None
        assert res.e_peak_cathodic_v is None
        assert res.current_ratio is None
        assert res.peak_current_anodic_ua > 0.0

    def test_cottrell_chronoamperometry_slope_and_decay(self):
        """Cottrell chronoamperometry must decay with 1/sqrt(t) and yield exact slope S."""
        req = ChronoamperometryRequest(
            preset_id="ferricyanide",
            applied_potential_v=0.0,
            duration_s=5.0,
            time_step_s=0.05,
            concentration_mm=2.0,
            diffusion_coefficient_cm2_s=7.60e-6,
            electrode_area_cm2=0.10,
            n_electrons=1,
            temperature_k=298.15,
        )

        res = ElectroanalyticalEngine.simulate_chronoamperometry(req)

        # Theoretical slope S = (n * F * A * D^0.5 * C) / pi^0.5
        c_mol_cm3 = 2.0 * 1.0e-6
        expected_slope = (1 * FARADAY_F * 0.10 * math.sqrt(7.60e-6) * c_mol_cm3) / math.sqrt(math.pi) * 1.0e6
        assert res.cottrell_slope_ua_s_half == pytest.approx(expected_slope, rel=1e-3)
        assert len(res.curve) == 100

        # Verify i(t) * sqrt(t) is constant across all points within rounding resolution
        for pt in res.curve:
            derived_slope = pt.current_ua / pt.inv_sqrt_time
            assert derived_slope == pytest.approx(res.cottrell_slope_ua_s_half, rel=1e-3)

    def test_presets_catalog(self):
        """Curated benchmark presets must contain key outer-sphere and inner-sphere couples."""
        assert len(BENCHMARK_PRESETS) >= 5
        ids = [p.id for p in BENCHMARK_PRESETS]
        assert "ferricyanide" in ids
        assert "ferrocene" in ids
        assert "ruthenium_hexamine" in ids
        assert "dopamine" in ids
        assert "ascorbic_acid" in ids
