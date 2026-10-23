import { describe, it, expect } from 'vitest';
import { BiomoleculeService } from './biomoleculeService';

describe('BiomoleculeService Frontend Client', () => {
  it('fetches protein structure presets with resolution and organism', async () => {
    const presets = await BiomoleculeService.fetchPresets();
    expect(presets.length).toBeGreaterThanOrEqual(2);
    expect(presets.some((p) => p.pdb_id === '1CRN')).toBe(true);
    expect(presets.some((p) => p.pdb_id === '1L2Y')).toBe(true);
  });

  it('fetches structure details including summary, residues, and DSSP H-bonds', async () => {
    const detail = await BiomoleculeService.fetchPresetDetail('crambin-1crn');
    expect(detail.summary.pdb_id).toBe('1CRN');
    expect(detail.summary.total_residues).toBeGreaterThanOrEqual(10);
    expect(detail.residues.length).toBeGreaterThanOrEqual(10);
    expect(detail.hydrogen_bonds.length).toBeGreaterThanOrEqual(3);
    expect(detail.secondary_structure_segments.length).toBeGreaterThanOrEqual(2);
  });

  it('fetches Ramachandran points with region classifications', async () => {
    const points = await BiomoleculeService.fetchRamachandranPoints('crambin-1crn');
    expect(points.length).toBeGreaterThanOrEqual(8);
    for (const pt of points) {
      expect(pt.phi).toBeDefined();
      expect(pt.psi).toBeDefined();
      expect(pt.region).toBeDefined();
      expect(pt.phi).toBeGreaterThanOrEqual(-180);
      expect(pt.phi).toBeLessThanOrEqual(180);
      expect(pt.psi).toBeGreaterThanOrEqual(-180);
      expect(pt.psi).toBeLessThanOrEqual(180);
    }
  });

  it('parses custom PDB coordinates with offline fallback', async () => {
    const detail = await BiomoleculeService.parsePdbContent('ATOM 1 N ALA A 1 ...');
    expect(detail).toBeDefined();
    expect(detail.summary).toBeDefined();
  });
});
