import { describe, it, expect } from 'vitest';
import {
  surfaceChemistryService,
  linearRegression,
  calculateBetFallback,
  compareIsothermsFallback,
  simulateCatalysisFallback,
  FALLBACK_MATERIALS,
} from './surfaceChemistryService';

describe('SurfaceChemistryService Frontend Suite', () => {
  it('retrieves default adsorbent materials catalog', async () => {
    const materials = await surfaceChemistryService.getMaterials();
    expect(materials.length).toBeGreaterThanOrEqual(4);
    const ids = materials.map((m) => m.id);
    expect(ids).toContain('mcm_41');
    expect(ids).toContain('activated_carbon');
    expect(ids).toContain('zeolite_zsm5');
    expect(ids).toContain('gamma_alumina');
  });

  it('performs linear regression with high numerical fidelity', () => {
    const x = [0.1, 0.2, 0.3, 0.4];
    const y = [1.0, 2.0, 3.0, 4.0];
    const { slope, intercept, rSquared } = linearRegression(x, y);
    expect(slope).toBeCloseTo(10.0, 4);
    expect(intercept).toBeCloseTo(0.0, 4);
    expect(rSquared).toBeCloseTo(1.0, 4);
  });

  it('calculates multi-point BET surface area for MCM-41 mesoporous silica', () => {
    const res = calculateBetFallback({ material_id: 'mcm_41', sample_mass_g: 1.0 });
    expect(res.bet_fit.r_squared).toBeGreaterThanOrEqual(0.99);
    expect(res.bet_fit.is_c_positive).toBe(true);
    // Specific surface area of MCM-41 is around 900-1000 m2/g
    expect(res.bet_fit.specific_surface_area_m2_g).toBeGreaterThan(850.0);
    expect(res.bet_fit.monolayer_capacity_vm).toBeGreaterThan(190.0);
  });

  it('calculates BET surface area for microporous activated carbon using Rouquerol range', () => {
    const res = calculateBetFallback({ material_id: 'activated_carbon', sample_mass_g: 1.0 });
    expect(res.bet_fit.r_squared).toBeGreaterThanOrEqual(0.98);
    expect(res.bet_fit.is_c_positive).toBe(true);
    expect(res.bet_fit.specific_surface_area_m2_g).toBeGreaterThan(1000.0);
  });

  it('compares Langmuir, Freundlich, and BET models on isotherm data', () => {
    const res = compareIsothermsFallback('mcm_41');
    expect(res.experimental_points.length).toBeGreaterThanOrEqual(10);
    expect(res.langmuir_fit.r_squared).toBeGreaterThan(0.8);
    expect(res.freundlich_fit.r_squared).toBeGreaterThan(0.8);
    expect(res.bet_fit.r_squared).toBeGreaterThanOrEqual(0.98);
    expect(['Langmuir', 'Freundlich', 'BET']).toContain(res.best_fitting_model);
  });

  it('simulates heterogeneous catalysis comparing Langmuir-Hinshelwood and Eley-Rideal', () => {
    const res = simulateCatalysisFallback({
      mechanism: 'both',
      rate_constant_k: 1.0e-3,
      adsorption_constant_ka: 0.1,
      adsorption_constant_kb: 0.05,
      fixed_partial_pressure_b_kpa: 20.0,
      max_pressure_a_kpa: 100.0,
      points_count: 50,
    });

    // LH peak pressure: P_A = (1 + 0.05*20) / 0.1 = 20.0 kPa
    expect(res.lh_peak_pressure_a_kpa).toBeCloseTo(20.0, 1);
    expect(res.lh_maximum_rate).toBeGreaterThan(0);

    // Eley-Rideal monotonic behavior
    const curve = res.kinetics_curve;
    expect(curve[10].rate_eley_rideal).toBeLessThan(curve[25].rate_eley_rideal);
  });
});
