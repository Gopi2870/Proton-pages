import { describe, it, expect } from 'vitest';
import {
  radicalReactionsService,
  RADICAL_MECHANISM_PRESETS,
} from './radicalReactionsService';

describe('RadicalReactionsService Frontend Client', () => {
  it('returns validated radical mechanism presets', () => {
    const presets = radicalReactionsService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(4);

    const h2o2 = presets.find((p) => p.id === 'h2_o2_combustion');
    expect(h2o2).toBeDefined();
    expect(h2o2?.category).toBe('combustion');
    expect(h2o2?.species_count).toBe(8);

    const methane = presets.find((p) => p.id === 'atmospheric_methane');
    expect(methane?.category).toBe('atmospheric');

    const frp = presets.find((p) => p.id === 'polymerization_frp');
    expect(frp?.category).toBe('polymerization');
  });

  it('retrieves detailed offline mechanism structure with species and reactions', () => {
    const detail = radicalReactionsService.getOfflineMechanismDetails('h2_o2_combustion');
    expect(detail.id).toBe('h2_o2_combustion');
    expect(detail.species.length).toBeGreaterThanOrEqual(4);
    expect(detail.reactions.length).toBeGreaterThanOrEqual(1);

    const branchingRxn = detail.reactions.find((r) => r.role === 'branching');
    expect(branchingRxn).toBeDefined();
    expect(branchingRxn?.rate_law.activation_energy_kj_mol).toBe(71.4);
  });

  it('runs offline stiff kinetics simulation with sigmoidal radical ignition', () => {
    const res = radicalReactionsService.simulateOffline({
      mechanism_id: 'h2_o2_combustion',
      temperature_k: 1200,
      total_time_s: 0.001,
    });

    expect(res.mechanism_id).toBe('h2_o2_combustion');
    expect(res.time_points_s.length).toBeGreaterThan(10);
    expect(res.trajectories.H2).toBeDefined();
    expect(res.trajectories.O2).toBeDefined();
    expect(res.trajectories.OH).toBeDefined();
    expect(res.total_radical_pool.length).toBe(res.time_points_s.length);

    // Initial H2 is higher than final H2 due to combustion consumption
    const initH2 = res.trajectories.H2[0];
    const finalH2 = res.trajectories.H2[res.trajectories.H2.length - 1];
    expect(finalH2).toBeLessThan(initH2);

    // Top sensitivities and QSSA comparison present
    expect(res.top_sensitivities.length).toBeGreaterThan(0);
    expect(res.qssa_comparison.OH_QSSA).toBeDefined();
  });
});
