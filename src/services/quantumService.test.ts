import { describe, it, expect } from 'vitest';
import { quantumService } from './quantumService';

describe('QuantumService Frontend Client', () => {
  it('loads conjugated system presets with fallback availability', async () => {
    const list = await quantumService.getPresets();
    expect(list.length).toBeGreaterThanOrEqual(4);

    const bz = list.find((p) => p.id === 'benzene');
    expect(bz).toBeDefined();
    expect(bz?.expected_aromaticity).toBe('aromatic');
    expect(bz?.pi_electron_count).toBe(6);
  });

  it('computes Hückel molecular orbital properties for ethylene', async () => {
    const res = await quantumService.getPresetAnalysis('ethylene', -2.7);
    expect(res.molecule_id).toBe('ethylene');
    expect(res.atom_count).toBe(2);
    expect(res.orbitals.length).toBe(2);

    const homo = res.orbitals.find((o) => o.is_homo);
    const lumo = res.orbitals.find((o) => o.is_lumo);
    expect(homo).toBeDefined();
    expect(lumo).toBeDefined();
    expect(homo?.energy_coefficient_m).toBeCloseTo(1.0, 1);
    expect(lumo?.energy_coefficient_m).toBeCloseTo(-1.0, 1);
    expect(res.homo_lumo_gap_beta).toBeCloseTo(2.0, 1);
    expect(res.homo_lumo_gap_ev).toBeCloseTo(5.4, 1);
  });

  it('computes benzene aromatic resonance delocalization energy and uniform bond orders', async () => {
    const bz = await quantumService.getPresetAnalysis('benzene', -2.7);
    expect(bz.aromaticity_classification).toBe('aromatic');
    expect(bz.delocalization_energy_beta).toBeCloseTo(2.0, 1);
    expect(bz.orbitals.length).toBe(6);
    expect(bz.is_closed_shell).toBe(true);
    expect(bz.bond_orders[0][1]).toBeCloseTo(0.667, 2);
  });
});
