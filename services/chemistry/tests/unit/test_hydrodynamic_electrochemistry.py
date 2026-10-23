"""Unit tests for Hydrodynamic Electrochemistry, RDE, RRDE, and Stripping Voltammetry."""

import pytest
import math
from app.models.hydrodynamic_electrochemistry import ElectrodeType, StrippingMode
from app.schemas.hydrodynamic_electrochemistry import (
    RdeSimulationRequest,
    StrippingVoltammetryRequest,
    ChronocoulometryRequest,
)
from app.services.hydrodynamic_electrochemistry_service import (
    HydrodynamicElectrochemistryEngine,
    CURATED_METALS,
    ELECTRODES_INFO,
)


class TestHydrodynamicElectrochemistryEngine:
    def test_catalog_retrieval(self):
        """Verifies curated metal standards and electrodes catalog."""
        catalog = HydrodynamicElectrochemistryEngine.get_catalog()
        assert len(catalog.metals) >= 4
        assert len(catalog.electrodes) >= 5
        symbols = [m.symbol for m in catalog.metals]
        assert "Zn" in symbols
        assert "Pb" in symbols
        assert "Cd" in symbols
        assert "Cu" in symbols

    def test_rde_levich_proportionality(self):
        """Verifies Levich equation scaling with sqrt(omega)."""
        req = RdeSimulationRequest(
            electrode_radius_mm=2.5,
            concentration_mm=5.0,
            n_electrons=1,
            rotation_speeds_rpm=[400.0, 900.0, 1600.0, 2500.0],
            heterogeneous_rate_constant_k0_cm_s=10.0,  # Fast kinetics, purely mass-transport controlled
        )
        res = HydrodynamicElectrochemistryEngine.simulate_rde(req)

        assert res.electrode_area_cm2 == pytest.approx(math.pi * (0.25 ** 2), rel=1e-3)
        assert res.levich_slope_ua_s_half > 0
        assert len(res.levich_points) == 4

        # For fast kinetics, current at 1600 rpm should be ~2x current at 400 rpm (sqrt(1600)/sqrt(400) = 40/20 = 2)
        i_400 = res.levich_points[0].limiting_current_ua
        i_1600 = res.levich_points[2].limiting_current_ua
        assert i_1600 / i_400 == pytest.approx(2.0, rel=0.08)

    def test_boundary_layer_thinning(self):
        """Verifies Prandtl/Levich boundary layer delta_H thins as rotation speed increases."""
        req = RdeSimulationRequest(
            rotation_speeds_rpm=[400.0, 1600.0, 3600.0],
        )
        res = HydrodynamicElectrochemistryEngine.simulate_rde(req)

        delta_400 = res.levich_points[0].hydrodynamic_boundary_layer_um
        delta_1600 = res.levich_points[1].hydrodynamic_boundary_layer_um
        delta_3600 = res.levich_points[2].hydrodynamic_boundary_layer_um

        assert delta_400 > delta_1600 > delta_3600

    def test_koutecky_levich_points(self):
        """Verifies Koutecky-Levich plot points (1/i vs 1/sqrt(omega))."""
        req = RdeSimulationRequest(
            rotation_speeds_rpm=[400.0, 900.0, 1600.0],
            heterogeneous_rate_constant_k0_cm_s=0.01,
        )
        res = HydrodynamicElectrochemistryEngine.simulate_rde(req)

        assert len(res.koutecky_levich_points) == 3
        for pt in res.koutecky_levich_points:
            assert pt.inv_sqrt_omega > 0
            assert pt.inv_current_ua > 0

    def test_stripping_voltammetry_trace_peaks(self):
        """Tests square-wave stripping simulation with distinct heavy metal peaks."""
        req = StrippingVoltammetryRequest(
            deposition_time_s=120.0,
            zn_concentration_ppb=50.0,
            cd_concentration_ppb=15.0,
            pb_concentration_ppb=20.0,
            cu_concentration_ppb=35.0,
        )
        res = HydrodynamicElectrochemistryEngine.simulate_stripping(req)

        assert len(res.peaks_detected) == 4
        assert res.preconcentration_factor > 10.0
        assert len(res.stripping_curve) > 100

        # Check peak positions match characteristic potentials
        zn_pk = next(p for p in res.peaks_detected if p.symbol == "Zn")
        cd_pk = next(p for p in res.peaks_detected if p.symbol == "Cd")
        pb_pk = next(p for p in res.peaks_detected if p.symbol == "Pb")
        cu_pk = next(p for p in res.peaks_detected if p.symbol == "Cu")

        assert zn_pk.peak_potential_v < cd_pk.peak_potential_v < pb_pk.peak_potential_v < cu_pk.peak_potential_v
        assert zn_pk.peak_current_ua > 0
        assert pb_pk.peak_current_ua > 0

    def test_chronocoulometry_anson_plot(self):
        """Tests Anson plot separating diffusion, double-layer capacitance, and surface excess."""
        req = ChronocoulometryRequest(
            concentration_mm=1.0,
            electrode_area_cm2=0.20,
            surface_excess_gamma_mol_cm2=3.0e-10,
            double_layer_capacitance_uf_cm2=25.0,
            potential_step_v=0.5,
        )
        res = HydrodynamicElectrochemistryEngine.simulate_chronocoulometry(req)

        assert res.anson_slope_uc_s_half > 0
        assert res.double_layer_charge_uc == pytest.approx(25.0 * 0.20 * 0.5, rel=1e-3)
        assert len(res.anson_points) == 30

        # Total charge should increase monotonically with time
        for i in range(1, len(res.anson_points)):
            assert res.anson_points[i]["charge_total_uc"] > res.anson_points[i - 1]["charge_total_uc"]
