import { describe, it, expect } from 'vitest';
import {
  CoordinationCftService,
  FALLBACK_METALS,
  FALLBACK_LIGANDS,
  FALLBACK_PRESETS,
} from './coordinationCftService';

describe('CoordinationCftService Frontend Suite', () => {
  it('retrieves transition metals and ligands catalogs', async () => {
    const metals = await CoordinationCftService.getMetals();
    expect(metals.length).toBeGreaterThanOrEqual(10);
    const symbols = metals.map((m) => m.symbol);
    expect(symbols).toContain('Fe');
    expect(symbols).toContain('Cu');
    expect(symbols).toContain('Ni');

    const ligands = await CoordinationCftService.getLigands();
    expect(ligands.length).toBeGreaterThanOrEqual(10);
    expect(ligands[0].id).toBe('i');
    expect(ligands[ligands.length - 1].id).toBe('co');
  });

  it('correctly calculates high-spin Fe(II) aqua complex via client fallback', () => {
    const res = CoordinationCftService.analyzeFallbackComplex({
      metal_symbol: 'Fe',
      oxidation_state: 2,
      ligand_id: 'h2o',
      geometry: 'octahedral',
    });

    expect(res.metal.d_electron_count).toBe(6);
    expect(res.spin_state).toBe('high_spin');
    expect(res.cfse_delta_units).toBeCloseTo(-0.4, 2);
    expect(res.unpaired_electrons).toBe(4);
    expect(res.magnetic_moment_bm).toBeCloseTo(4.9, 1);
    expect(res.is_paramagnetic).toBe(true);
  });

  it('correctly calculates low-spin Fe(II) cyano complex via client fallback', () => {
    const res = CoordinationCftService.analyzeFallbackComplex({
      metal_symbol: 'Fe',
      oxidation_state: 2,
      ligand_id: 'cn',
      geometry: 'octahedral',
    });

    expect(res.metal.d_electron_count).toBe(6);
    expect(res.spin_state).toBe('low_spin');
    expect(res.cfse_delta_units).toBeCloseTo(-2.4, 2);
    expect(res.unpaired_electrons).toBe(0);
    expect(res.magnetic_moment_bm).toBe(0.0);
    expect(res.is_paramagnetic).toBe(false);
  });

  it('diagnoses strong Jahn-Teller elongation in Cu(II) d9 complexes', () => {
    const res = CoordinationCftService.analyzeFallbackComplex({
      metal_symbol: 'Cu',
      oxidation_state: 2,
      ligand_id: 'h2o',
      geometry: 'octahedral',
    });

    expect(res.metal.d_electron_count).toBe(9);
    expect(res.jahn_teller_distortion).toBe('strong_elongation');
    expect(res.unpaired_electrons).toBe(1);
    expect(res.is_paramagnetic).toBe(true);
  });

  it('evaluates square planar d8 cisplatin geometry', () => {
    const res = CoordinationCftService.analyzeFallbackComplex({
      metal_symbol: 'Pt',
      oxidation_state: 2,
      ligand_id: 'cl',
      geometry: 'square_planar',
    });

    expect(res.geometry).toBe('square_planar');
    expect(res.coordination_number).toBe(4);
    expect(res.unpaired_electrons).toBe(0);
    expect(res.is_paramagnetic).toBe(false);
  });
});
