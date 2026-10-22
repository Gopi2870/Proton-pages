import { describe, it, expect } from 'vitest';
import { KineticsService } from './kineticsService';

describe('KineticsService Frontend Client', () => {
  it('retrieves preset benchmark kinetics reactions', async () => {
    const reactions = await KineticsService.getPresetReactions();
    expect(reactions.length).toBeGreaterThanOrEqual(4);
    const h2o2 = reactions.find((r) => r.id === 'h2o2_decomp');
    expect(h2o2).toBeDefined();
    expect(h2o2?.order).toBe(1);
  });

  it('simulates first-order integrated rate law and verifies half-life', async () => {
    const res = await KineticsService.simulateRateLaw('N2O5 Decomposition', 1, 1.0, 0.05, 60.0, 30);
    expect(res.order).toBe(1);
    expect(res.k_units).toBe('s⁻¹');
    expect(res.half_life_seconds).toBeCloseTo(13.86, 1);
    expect(res.time_series.length).toBe(31);
    expect(res.time_series[0].concentration_m).toBe(1.0);
    expect(res.time_series[30].concentration_m).toBeLessThan(1.0);
  });

  it('simulates second-order integrated rate law with hyperbolic decay', async () => {
    const res = await KineticsService.simulateRateLaw('NO2 Dimerization', 2, 0.5, 0.2, 50.0, 25);
    expect(res.order).toBe(2);
    expect(res.k_units).toBe('M⁻¹·s⁻¹');
    expect(res.half_life_seconds).toBeCloseTo(10.0, 1);
  });

  it('calculates Arrhenius activation energy and predicts rate constant at elevated temperature', async () => {
    const res = await KineticsService.calculateArrhenius(25.0, 3.46e-5, 35.0, 1.35e-4, 45.0);
    expect(res.activation_energy_kj_mol).toBeGreaterThan(95.0);
    expect(res.activation_energy_kj_mol).toBeLessThan(110.0);
    expect(res.predicted_k_at_target).toBeDefined();
    expect(res.predicted_k_at_target!).toBeGreaterThan(1.35e-4);
  });

  it('simulates Michaelis-Menten enzyme kinetics and competitive inhibition', async () => {
    const resFree = await KineticsService.simulateMichaelisMenten('Beta-Galactosidase', 100.0, 10.0);
    expect(resFree.apparent_v_max).toBe(100.0);
    expect(resFree.apparent_k_m).toBe(10.0);

    const resComp = await KineticsService.simulateMichaelisMenten(
      'Beta-Galactosidase',
      100.0,
      10.0,
      'competitive',
      2.0,
      1.0
    );
    expect(resComp.apparent_v_max).toBe(100.0);
    expect(resComp.apparent_k_m).toBeCloseTo(30.0, 1);
  });

  it('simulates consecutive A -> B -> C reaction dynamics and detects maximum intermediate concentration', async () => {
    const res = await KineticsService.simulateConsecutive(1.0, 0.2, 0.05, 60.0, 60);
    expect(res.t_max_intermediate_seconds).toBeCloseTo(9.24, 1);
    expect(res.max_intermediate_conc_m).toBeGreaterThan(0.5);
    expect(res.time_series.length).toBe(61);
  });
});
