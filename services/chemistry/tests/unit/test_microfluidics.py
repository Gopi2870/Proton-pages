"""Unit tests for Microfluidics, Droplet Chemistry, and Continuous-Flow Reactor Engine."""

import pytest
from app.models.microfluidics import FlowRegime, DropletRegime, JunctionGeometry
from app.schemas.microfluidics import (
    HydrodynamicsRequest,
    DropletGenerationRequest,
    FlowReactionRequest,
)
from app.services.microfluidics_service import (
    MicrofluidicsEngine,
    CURATED_CHIPS,
    CURATED_REACTIONS,
)


class TestMicrofluidicsEngine:
    def test_curated_catalogs_exist(self):
        """Verifies curated microfluidic chips and benchmark reactions."""
        assert len(CURATED_CHIPS) >= 4
        assert len(CURATED_REACTIONS) >= 4
        chip_ids = [c.id for c in CURATED_CHIPS]
        assert "chip_pdms_t_junction" in chip_ids
        assert "chip_quartz_flow_focusing" in chip_ids

    def test_hydrodynamics_creeping_laminar_flow(self):
        """Tests laminar pressure drop and Reynolds number calculation."""
        req = HydrodynamicsRequest(
            channel_width_um=100.0,
            channel_height_um=50.0,
            channel_length_mm=25.0,
            flow_rate_ul_min=10.0,
            viscosity_pa_s=0.001,  # water
            density_kg_m3=1000.0,
        )
        res = MicrofluidicsEngine.calculate_hydrodynamics(req)

        # In microchannel, Re should be << 2000 (laminar)
        assert res.reynolds_number < 10.0
        assert res.flow_regime in [FlowRegime.CREEPING_LAMINAR, FlowRegime.LAMINAR]
        assert res.hydraulic_diameter_um == pytest.approx(66.67, rel=1e-2)
        assert res.pressure_drop_kpa > 0.0
        assert res.mean_velocity_m_s > 0.0
        assert res.wall_shear_stress_pa > 0.0

    def test_droplet_generation_squeezing_regime(self):
        """Tests droplet pinch-off in squeezing regime at low Capillary number."""
        req = DropletGenerationRequest(
            geometry=JunctionGeometry.T_JUNCTION,
            channel_width_um=100.0,
            channel_height_um=50.0,
            dispersed_flow_rate_ul_min=5.0,
            continuous_flow_rate_ul_min=25.0,
            continuous_viscosity_pa_s=0.015,
            dispersed_viscosity_pa_s=0.001,
            interfacial_tension_n_m=0.035,
        )
        res = MicrofluidicsEngine.simulate_droplet_generation(req)

        # Droplet regime should be Squeezing or Dripping
        assert res.regime in [DropletRegime.SQUEEZING, DropletRegime.DRIPPING]
        assert res.droplet_volume_pl > 50.0  # reasonable pL droplet
        assert res.generation_frequency_hz > 0.0
        assert res.droplet_length_um > 100.0
        assert res.slug_velocity_m_s > 0.0

    def test_chaotic_advection_mixing_acceleration(self):
        """Verifies that internal recirculation accelerates mixing inside droplets vs unsegmented streams."""
        req = DropletGenerationRequest(
            geometry=JunctionGeometry.FLOW_FOCUSING,
            channel_width_um=100.0,
            channel_height_um=50.0,
            dispersed_flow_rate_ul_min=10.0,
            continuous_flow_rate_ul_min=40.0,
            continuous_viscosity_pa_s=0.02,
            dispersed_viscosity_pa_s=0.001,
            interfacial_tension_n_m=0.02,
        )
        res = MicrofluidicsEngine.simulate_droplet_generation(req)

        # Segmented mixing should be strictly faster than pure diffusive unsegmented mixing
        assert res.mixing_time_ms < res.unsegmented_mixing_time_ms
        assert res.mixing_acceleration_fold > 1.0

    def test_flow_reactor_first_order_kinetics(self):
        """Tests continuous plug-flow conversion for A -> P."""
        req = FlowReactionRequest(
            channel_width_um=200.0,
            channel_height_um=100.0,
            channel_length_mm=500.0,
            total_flow_rate_ul_min=50.0,
            initial_concentration_m=1.0,
            rate_constant_k1=0.20,
            rate_constant_k2=0.0,  # no consecutive byproduct
            temperature_k=298.15,
        )
        res = MicrofluidicsEngine.simulate_flow_reactor(req)

        assert res.residence_time_s > 0.0
        assert 0.0 < res.conversion <= 1.0
        assert res.intermediate_yield == pytest.approx(res.conversion, rel=1e-3)
        assert res.byproduct_yield == 0.0
        assert len(res.axial_concentration_profile) == 21
        assert len(res.rtd_curve) == 30

    def test_flow_reactor_consecutive_intermediate_selectivity(self):
        """Tests intermediate selectivity maximization in consecutive reaction A -> P -> S."""
        req = FlowReactionRequest(
            channel_width_um=150.0,
            channel_height_um=75.0,
            channel_length_mm=300.0,
            total_flow_rate_ul_min=30.0,
            initial_concentration_m=2.0,
            rate_constant_k1=0.35,
            rate_constant_k2=0.05,
            temperature_k=313.15,
        )
        res = MicrofluidicsEngine.simulate_flow_reactor(req)

        # Total molar balance: C_A + C_P + C_S = C_A0
        last_profile = res.axial_concentration_profile[-1]
        sum_conc = (
            last_profile["c_reactant_m"]
            + last_profile["c_product_m"]
            + last_profile["c_byproduct_m"]
        )
        assert sum_conc == pytest.approx(2.0, rel=1e-3)
        assert res.intermediate_yield > 0.0
        assert res.byproduct_yield > 0.0
        assert res.intermediate_yield + res.byproduct_yield == pytest.approx(res.conversion, rel=1e-3)

    def test_rtd_dispersion_profile(self):
        """Verifies residence time distribution peaks around theta = 1."""
        req = FlowReactionRequest(
            channel_width_um=250.0,
            channel_height_um=100.0,
            channel_length_mm=1000.0,
            total_flow_rate_ul_min=100.0,
            rate_constant_k1=0.1,
            rate_constant_k2=0.01,
        )
        res = MicrofluidicsEngine.simulate_flow_reactor(req)

        # RTD curve should have positive probability density
        for pt in res.rtd_curve:
            assert pt["e_theta"] >= 0.0
        # Peak of E(theta) should be near theta = 1.0
        max_pt = max(res.rtd_curve, key=lambda p: p["e_theta"])
        assert 0.7 <= max_pt["theta"] <= 1.3
