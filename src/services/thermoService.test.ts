import { describe, it, expect } from 'vitest';
import { ThermoService } from './thermoService';

describe('ThermoService Frontend Client', () => {
  it('computes local reaction thermodynamics accurately for combustion', () => {
    const result = ThermoService.calculateLocalReaction('CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)');
    expect(result).toBeDefined();
    expect(result.delta_h_standard_kj).toBeLessThan(0);
    expect(result.is_exothermic).toBe(true);
    expect(result.is_spontaneous).toBe(true);
  });

  it('calculates temperature-dependent Gibbs free energy', () => {
    const res298 = ThermoService.calculateLocalReaction('N2(g) + 3 H2(g) -> 2 NH3(g)', 298.15);
    const res500 = ThermoService.calculateLocalReaction('N2(g) + 3 H2(g) -> 2 NH3(g)', 500.0);
    // At higher temperatures with negative delta S, delta G becomes more positive (less spontaneous)
    expect(res500.delta_g_standard_kj).toBeGreaterThan(res298.delta_g_standard_kj);
  });

  it('solves Hess Law pathway via fallback structure', async () => {
    const intermediates = [
      { equation: 'C(s) + O2(g) -> CO2(g)', delta_h_kj: -393.51 },
      { equation: 'CO(g) + 0.5 O2(g) -> CO2(g)', delta_h_kj: -282.98 }
    ];
    const solution = await ThermoService.solveHessLaw('C(s) + 0.5 O2(g) -> CO(g)', intermediates);
    expect(solution).toBeDefined();
    expect(solution.is_solvable).toBe(true);
    expect(solution.steps.length).toBe(2);
  });
});
