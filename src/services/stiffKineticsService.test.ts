import { describe, it, expect } from 'vitest';
import {
  stiffKineticsService,
  solveLinearSystem,
  evaluateDerivatives,
  simulateOffline,
  FALLBACK_PRESETS,
} from './stiffKineticsService';

describe('StiffKineticsService Frontend Suite', () => {
  it('retrieves default stiff benchmark presets', async () => {
    const presets = await stiffKineticsService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(4);
    const ids = presets.map((p) => p.id);
    expect(ids).toContain('robertson_stiff');
    expect(ids).toContain('chapman_ozone');
    expect(ids).toContain('oregonator_bz');
    expect(ids).toContain('zeldovich_nox');
  });

  it('solves linear systems with partial row pivoting', () => {
    // 2x + y = 5
    // x + 3y = 5
    // Solution: x = 2, y = 1
    const a = [
      [2, 1],
      [1, 3],
    ];
    const b = [5, 5];
    const x = solveLinearSystem(a, b);
    expect(x[0]).toBeCloseTo(2.0, 4);
    expect(x[1]).toBeCloseTo(1.0, 4);
  });

  it('evaluates exact analytic Jacobian for elementary reactions', () => {
    const speciesNames = ['A', 'B'];
    const reactions = [
      {
        id: 'r1',
        equation_str: 'A -> B',
        reactants: { A: 1.0 },
        products: { B: 1.0 },
        rate_constant: 3.0,
      },
    ];
    const concs = { A: 2.0, B: 0.0 };
    const { fVec, jMat } = evaluateDerivatives(speciesNames, reactions, concs);

    // dA/dt = -3.0 * [A] = -6.0
    // dB/dt = +3.0 * [A] = +6.0
    expect(fVec[0]).toBeCloseTo(-6.0, 4);
    expect(fVec[1]).toBeCloseTo(6.0, 4);

    // J_AA = -3.0, J_BA = +3.0
    expect(jMat[0][0]).toBeCloseTo(-3.0, 4);
    expect(jMat[1][0]).toBeCloseTo(3.0, 4);
  });

  it('simulates Robertson stiff benchmark with Rosenbrock-W ROS2 integrator', () => {
    const res = simulateOffline({
      preset_id: 'robertson_stiff',
      total_time_s: 40.0,
      initial_step_s: 1e-4,
      solver_method: 'rosenbrock_stiff',
      max_steps: 100,
    });

    expect(res.is_stiff).toBe(true);
    expect(res.trajectory.length).toBeGreaterThan(5);

    // Mass conservation: [A] + [B] + [C] == 1.0
    for (const pt of res.trajectory) {
      const sum = pt.A + pt.B + pt.C;
      expect(sum).toBeCloseTo(1.0, 2);
    }

    // Steady state check: intermediate B is small
    expect(res.final_concentrations.B).toBeLessThan(1e-3);
    expect(res.final_concentrations.C).toBeGreaterThan(0.0);
  });

  it('simulates Chapman photochemical ozone cycle with non-negative concentrations', () => {
    const res = simulateOffline({
      preset_id: 'chapman_ozone',
      total_time_s: 100.0,
      initial_step_s: 1e-3,
      solver_method: 'rosenbrock_stiff',
      max_steps: 100,
    });

    expect(res.time_points_count).toBeGreaterThan(5);
    expect(res.final_concentrations.O2).toBeGreaterThan(0.0);
    expect(res.final_concentrations.O3).toBeGreaterThanOrEqual(0.0);
  });
});
