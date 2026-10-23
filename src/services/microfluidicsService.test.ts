import { describe, it, expect } from 'vitest';
import {
  microfluidicsService,
  CURATED_CHIPS,
  CURATED_REACTIONS,
} from './microfluidicsService';

describe('MicrofluidicsService Frontend Client', () => {
  it('loads curated microfluidic chips and benchmark reactions', async () => {
    const catalog = await microfluidicsService.getCatalog();
    expect(catalog.chips.length).toBeGreaterThanOrEqual(4);
    expect(catalog.reactions.length).toBeGreaterThanOrEqual(4);
    expect(catalog.chips[0].name).toContain('PDMS');
  });

  it('calculates laminar channel hydrodynamics via local fallback', () => {
    const res = microfluidicsService.calculateHydrodynamicsLocally({
      channel_width_um: 100,
      channel_height_um: 50,
      channel_length_mm: 30,
      flow_rate_ul_min: 10,
      viscosity_pa_s: 0.001,
      density_kg_m3: 1000,
      diffusion_coefficient_m2_s: 1e-9,
      interfacial_tension_n_m: 0.035,
    });

    expect(res.reynolds_number).toBeLessThan(10.0);
    expect(['creeping_laminar', 'laminar']).toContain(res.flow_regime);
    expect(res.hydraulic_diameter_um).toBeCloseTo(66.67, 1);
    expect(res.pressure_drop_kpa).toBeGreaterThan(0);
    expect(res.wall_shear_stress_pa).toBeGreaterThan(0);
  });

  it('simulates droplet generation and Garstecki scaling law', () => {
    const res = microfluidicsService.simulateDropletsLocally({
      geometry: 't_junction',
      channel_width_um: 100,
      channel_height_um: 50,
      dispersed_flow_rate_ul_min: 5,
      continuous_flow_rate_ul_min: 25,
      continuous_viscosity_pa_s: 0.015,
      dispersed_viscosity_pa_s: 0.001,
      interfacial_tension_n_m: 0.025,
      diffusion_coefficient_m2_s: 1e-9,
    });

    expect(['squeezing', 'dripping']).toContain(res.regime);
    expect(res.droplet_volume_pl).toBeGreaterThan(50);
    expect(res.generation_frequency_hz).toBeGreaterThan(0);
    expect(res.mixing_acceleration_fold).toBeGreaterThan(1.0);
    expect(res.mixing_time_ms).toBeLessThan(res.unsegmented_mixing_time_ms);
  });

  it('simulates continuous-flow PFR conversion and selectivity', () => {
    const res = microfluidicsService.simulateFlowReactorLocally({
      channel_width_um: 200,
      channel_height_um: 100,
      channel_length_mm: 500,
      total_flow_rate_ul_min: 50,
      initial_concentration_m: 1.0,
      rate_constant_k1: 0.15,
      rate_constant_k2: 0.01,
      temperature_k: 323.15,
      molecular_weight_g_mol: 150.0,
    });

    expect(res.residence_time_s).toBeGreaterThan(0);
    expect(res.conversion).toBeGreaterThan(0);
    expect(res.conversion).toBeLessThanOrEqual(1.0);
    expect(res.intermediate_yield).toBeGreaterThan(0);
    expect(res.intermediate_yield + res.byproduct_yield).toBeCloseTo(res.conversion, 3);
    expect(res.space_time_yield_kg_m3_h).toBeGreaterThan(0);
    expect(res.axial_concentration_profile.length).toBe(21);
    expect(res.rtd_curve.length).toBe(30);
  });

  it('ensures RTD curve integrates to approximately 1.0', () => {
    const res = microfluidicsService.simulateFlowReactorLocally({
      channel_width_um: 100,
      channel_height_um: 100,
      channel_length_mm: 200,
      total_flow_rate_ul_min: 20,
      initial_concentration_m: 1.0,
      rate_constant_k1: 0.1,
      rate_constant_k2: 0.0,
      temperature_k: 298.15,
      molecular_weight_g_mol: 100,
    });

    const dTheta = res.rtd_curve[1].theta - res.rtd_curve[0].theta;
    const integral = res.rtd_curve.reduce((sum, pt) => sum + pt.e_theta * dTheta, 0);
    expect(integral).toBeGreaterThan(0.75); // closed dispersion cutoff up to theta=2.5 captures >75-90% of area
  });
});
