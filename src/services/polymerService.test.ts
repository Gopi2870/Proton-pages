import { describe, it, expect } from 'vitest';
import { polymerService } from './polymerService';

describe('PolymerService Frontend Client', () => {
  it('loads preset polymer applications', async () => {
    const presets = await polymerService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(5);

    const ids = presets.map((p) => p.id);
    expect(ids).toContain('nylon_6_6');
    expect(ids).toContain('pmma');
    expect(ids).toContain('polyurethane_network');
  });

  it('solves Carothers equation and detects gelation point', () => {
    // Equimolar Nylon step-growth at p = 0.98 -> Xn = 50, PDI = 1.98
    const analysis = polymerService.evaluateCarothers(0.98, 1.0, 2.0, 113.16);
    expect(analysis.degree_of_polymerization_xn).toBeCloseTo(50.0, 0);
    expect(analysis.polydispersity_index).toBeCloseTo(1.98, 1);
    expect(analysis.is_gel_formed).toBe(false);

    // Crosslinked network fav = 2.4 -> pc = 2/2.4 = 0.833
    const preGel = polymerService.evaluateCarothers(0.80, 1.0, 2.4, 300.0);
    expect(preGel.gel_point_pc).toBeCloseTo(0.833, 2);
    expect(preGel.is_gel_formed).toBe(false);

    const postGel = polymerService.evaluateCarothers(0.86, 1.0, 2.4, 300.0);
    expect(postGel.is_gel_formed).toBe(true);
  });

  it('evaluates Flory-Huggins solution thermodynamics and critical miscibility', () => {
    const fh = polymerService.evaluateFloryHuggins(200, 0.42);
    expect(fh.critical_chi).toBeGreaterThan(0.5);
    expect(fh.critical_phi_polymer).toBeLessThan(0.1);
    expect(fh.curve_points.length).toBeGreaterThan(20);
  });

  it('simulates step-growth Nylon 6,6 with molecular weight distribution', async () => {
    const sim = await polymerService.getPresetSimulation('nylon_6_6', 0.985);
    expect(sim.polymer_name).toContain('Nylon 6,6');
    expect(sim.mechanism).toBe('step_growth');
    expect(sim.number_average_mn).toBeGreaterThan(10000.0);
    expect(sim.distribution_curve.length).toBeGreaterThan(20);
    expect(sim.carothers?.degree_of_polymerization_xn).toBeGreaterThan(50.0);
  });

  it('simulates chain-growth radical PMMA with Trommsdorff effect', async () => {
    const sim = await polymerService.getPresetSimulation('pmma', 0.80);
    expect(sim.mechanism).toBe('chain_growth_radical');
    expect(sim.radical_kinetics).not.toBeNull();
    expect(sim.radical_kinetics?.autoacceleration_trommsdorff).toBe(true);
  });
});
