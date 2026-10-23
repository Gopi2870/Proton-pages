import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dftQuantumService } from './dftQuantumService';

describe('dftQuantumService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('retrieves preset molecules via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const presets = await dftQuantumService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(3);
    const names = presets.map((m) => m.name);
    expect(names).toContain('Benzene');
    expect(names).toContain('Water');
  });

  it('calculates Kohn-Sham SCF convergence via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await dftQuantumService.calculateScf({ molecule_id: 'benzene', functional: 'B3LYP' });
    expect(res.molecule_name).toBe('Benzene');
    expect(res.scf_converged).toBe(true);
    expect(res.homo_lumo_gap_ev).toBeGreaterThan(5);
    expect(res.orbitals.some((o) => o.is_homo)).toBe(true);
    expect(res.orbitals.some((o) => o.is_lumo)).toBe(true);
  });

  it('computes TD-DFT singlet excitations via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await dftQuantumService.calculateTdDft({ molecule_id: 'benzene' });
    expect(res.states.length).toBeGreaterThanOrEqual(2);
    expect(res.absorption_max_wavelength_nm).toBeGreaterThan(200);
  });

  it('generates MEP spatial potential grid via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await dftQuantumService.generateMepSurface({ molecule_id: 'water' });
    expect(res.points.length).toBeGreaterThan(10);
    expect(res.min_potential_au).toBeLessThan(res.max_potential_au);
  });
});
