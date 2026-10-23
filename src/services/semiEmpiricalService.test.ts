/**
 * Unit tests for SemiEmpiricalService (PR #057).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SemiEmpiricalService,
  FALLBACK_PRESETS,
  buildFallbackCalculation,
} from './semiEmpiricalService';

describe('SemiEmpiricalService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('provides fallback presets with expected chemical molecules', () => {
    expect(FALLBACK_PRESETS.length).toBeGreaterThanOrEqual(4);
    const water = FALLBACK_PRESETS.find((p) => p.id === 'water');
    expect(water).toBeDefined();
    expect(water?.formula).toBe('H2O');
    expect(water?.atoms.length).toBe(3);
    expect(water?.literature_heat_of_formation_kcal_mol.AM1).toBe(-59.2);
  });

  it('builds fallback calculation with realistic physical properties', () => {
    const res = buildFallbackCalculation('water', 'AM1');
    expect(res.method).toBe('AM1');
    expect(res.total_atoms).toBe(3);
    expect(res.total_valence_electrons).toBe(8);
    expect(res.number_of_basis_functions).toBe(6);
    expect(res.scf_converged).toBe(true);
    expect(res.dipole_moment.magnitude).toBeGreaterThan(1.5);
    expect(res.frontier_indices.gap_ev).toBeGreaterThan(5.0);
    expect(res.atomic_populations.length).toBe(3);
  });

  it('fetchPresets returns fallback when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    const presets = await SemiEmpiricalService.fetchPresets();
    expect(presets.length).toBe(FALLBACK_PRESETS.length);
    expect(presets[0].id).toBe('water');
  });

  it('fetchPresetById returns preset by id or throws if invalid', async () => {
    const water = await SemiEmpiricalService.fetchPresetById('water');
    expect(water.id).toBe('water');

    await expect(SemiEmpiricalService.fetchPresetById('nonexistent_id')).rejects.toThrow();
  });

  it('calculate falls back to local simulation when backend offline', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Offline'));
    const response = await SemiEmpiricalService.calculate({
      preset_id: 'water',
      method: 'AM1',
    });
    expect(response.success).toBe(true);
    expect(response.result).toBeDefined();
    expect(response.result?.scf_converged).toBe(true);
    expect(response.preset_info?.formula).toBe('H2O');
  });

  it('scanPes generates Morse potential curve when offline', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Offline'));
    const response = await SemiEmpiricalService.scanPes({
      preset_id: 'water',
      atom_idx_1: 0,
      atom_idx_2: 1,
      start_distance: 0.8,
      end_distance: 2.0,
      steps: 7,
      method: 'AM1',
    });
    expect(response.success).toBe(true);
    expect(response.points.length).toBe(7);
    expect(response.equilibrium_distance_angstrom).toBe(0.96);
    expect(response.well_depth_kcal_mol).toBe(110.0);
  });
});
