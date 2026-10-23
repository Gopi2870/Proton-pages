import { describe, it, expect } from 'vitest';
import { photochemistryService } from './photochemistryService';

describe('PhotochemistryService Frontend Client', () => {
  it('retrieves curated fluorophores, quenchers, and FRET pairs', async () => {
    const catalog = await photochemistryService.getCatalog();
    expect(catalog.fluorophores.length).toBeGreaterThanOrEqual(5);
    expect(catalog.quenchers.length).toBeGreaterThanOrEqual(3);
    expect(catalog.fret_pairs.length).toBeGreaterThanOrEqual(2);

    const fluorIds = catalog.fluorophores.map((f) => f.id);
    expect(fluorIds).toContain('fluorescein');
    expect(fluorIds).toContain('anthracene');
    expect(fluorIds).toContain('ruthenium_bipyridine');
  });

  it('simulates Jablonski energy manifold and photophysical decay rates', async () => {
    const res = await photochemistryService.simulateJablonski({
      fluorophore_id: 'fluorescein',
      kr_scaling_factor: 1.0,
      kic_scaling_factor: 1.0,
      kisc_scaling_factor: 1.0,
      temperature_k: 298.15,
    });

    expect(res.fluorophore.name).toContain('Fluorescein');
    expect(res.states.length).toBe(4);
    expect(res.rates.fluorescenceQuantumYieldPhiF).toBeGreaterThan(0.85);
    expect(res.rates.fluorescenceLifetimeTau0Ns).toBeGreaterThan(3.5);

    const s1 = res.states.find((s) => s.stateId === 'S1');
    const t1 = res.states.find((s) => s.stateId === 'T1');
    expect(s1).toBeDefined();
    expect(t1).toBeDefined();
    expect(s1!.energyEv).toBeGreaterThan(t1!.energyEv);
  });

  it('calculates Stern-Volmer collisional quenching plot and kq', async () => {
    const res = await photochemistryService.calculateSternVolmer({
      fluorophore_id: 'fluorescein',
      quencher_id: 'iodide_anion',
      max_quencher_conc_mM: 50.0,
      points_count: 11,
      temperature_k: 298.15,
    });
    const result = res.result;

    expect(result.sternVolmerConstantKsvMInv).toBeGreaterThan(10.0);
    expect(result.bimolecularQuenchingRateKqMInvSInv).toBeGreaterThan(1e9);
    expect(result.points.length).toBe(11);
    expect(result.points[0].f0OverF).toBe(1.0);

    const lastPt = result.points[result.points.length - 1];
    expect(lastPt.f0OverF).toBeGreaterThan(1.5);
    expect(lastPt.fluorescenceLifetimeTauNs).toBeLessThan(result.unquenchedLifetimeTau0Ns);
  });

  it('simulates FRET efficiency at Forster distance R0 = 50%', async () => {
    const res = await photochemistryService.simulateFRET({
      fret_pair_id: 'CFP_YFP',
      current_distance_r_angstrom: 49.2,
      min_distance_angstrom: 15.0,
      max_distance_angstrom: 95.0,
      steps_count: 25,
    });
    const result = res.result;

    expect(result.forsterDistanceR0Angstrom).toBe(49.2);
    expect(Math.abs(result.efficiencyAtCurrentDistance - 0.5)).toBeLessThanOrEqual(0.02);
    expect(result.distancePoints.length).toBe(25);

    // Closest point should have near 100% transfer efficiency
    expect(result.distancePoints[0].fretEfficiency).toBeGreaterThan(0.95);
    // Farthest point should have near 0% transfer efficiency
    expect(result.distancePoints[result.distancePoints.length - 1].fretEfficiency).toBeLessThan(0.1);
  });

  it('demonstrates heavy atom spin-orbit coupling enhancement of intersystem crossing', async () => {
    const res = await photochemistryService.simulateJablonski({
      fluorophore_id: 'anthracene',
      kisc_scaling_factor: 1.0,
    });
    expect(res.rates.tripletYieldPhiIsc).toBeGreaterThan(0.5);
  });
});
