import { describe, it, expect } from 'vitest';
import {
  calculateRandlesSevcikPeakCurrent,
  diagnoseReversibility,
  simulateCyclicVoltammetryClient,
  simulateChronoamperometryClient,
  electroanalyticalService,
  FALLBACK_ELECTRO_PRESETS,
} from './electroanalyticalService';

describe('ElectroanalyticalService & Voltammetry Engine', () => {
  it('loads electrochemical presets including standard benchmarks', async () => {
    const presets = await electroanalyticalService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(5);
    const ids = presets.map((p) => p.id);
    expect(ids).toContain('ferricyanide');
    expect(ids).toContain('ferrocene');
    expect(ids).toContain('dopamine');
    expect(ids).toContain('ascorbic_acid');
  });

  it('calculates Randles-Sevcik peak current accurately', () => {
    // 1 mM Ferricyanide, A = 0.0707 cm^2, D = 7.6e-6 cm^2/s, v = 0.1 V/s
    const ipa = calculateRandlesSevcikPeakCurrent(
      1,
      0.0707,
      1.0,
      7.6e-6,
      0.1,
      298.15,
      0.5,
      true
    );
    expect(ipa).toBeGreaterThan(16.0);
    expect(ipa).toBeLessThan(18.0);
  });

  it('diagnoses electrochemical reversibility via Nicholson parameter psi', () => {
    const rev = diagnoseReversibility(0.20, 1e-5, 0.1, 1);
    expect(rev.reversibility).toBe('reversible');
    expect(rev.psi).toBeGreaterThan(7.0);

    const qrev = diagnoseReversibility(0.003, 1e-5, 0.1, 1);
    expect(qrev.reversibility).toBe('quasi_reversible');

    const irrev = diagnoseReversibility(1e-6, 1e-5, 0.1, 1);
    expect(irrev.reversibility).toBe('irreversible');
  });

  it('simulates reversible cyclic voltammogram with duck shape and delta_Ep ≈ 59 mV', () => {
    const res = simulateCyclicVoltammetryClient({
      preset_id: 'ferricyanide',
      e0_v: 0.360,
      n_electrons: 1,
      e_start_v: 0.650,
      e_switch_v: 0.050,
      scan_rate_v_s: 0.100,
      concentration_mm: 1.0,
      diffusion_coefficient_cm2_s: 7.6e-6,
      electrode_area_cm2: 0.0707,
      standard_rate_constant_k0_cm_s: 0.150,
      transfer_coefficient_alpha: 0.50,
    });

    expect(res.reversibility).toBe('reversible');
    expect(res.delta_ep_mv).toBeCloseTo(59.2, 0);
    expect(res.e_half_v).toBeCloseTo(0.360, 2);
    expect(res.peak_current_anodic_ua).toBeGreaterThan(10.0);
    expect(res.voltammogram.length).toBeGreaterThan(50);
  });

  it('simulates Cottrell chronoamperometry with strictly linear inverse sqrt time decay', () => {
    const res = simulateChronoamperometryClient({
      preset_id: 'ferricyanide',
      applied_potential_v: 0.0,
      duration_s: 3.0,
      time_step_s: 0.05,
      concentration_mm: 1.0,
      diffusion_coefficient_cm2_s: 7.6e-6,
      electrode_area_cm2: 0.0707,
      n_electrons: 1,
    });

    expect(res.cottrell_slope_ua_s_half).toBeGreaterThan(0);
    expect(res.curve.length).toBe(60);

    // Initial current must be higher than final current
    expect(res.curve[0].current_ua).toBeGreaterThan(res.curve[res.curve.length - 1].current_ua);

    // Ratio of current to inv_sqrt_time must equal cottrell slope
    for (const pt of res.curve) {
      const slope = pt.current_ua / pt.inv_sqrt_time;
      expect(slope).toBeCloseTo(res.cottrell_slope_ua_s_half, 0);
    }
  });
});
