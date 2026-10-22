import { describe, it, expect } from 'vitest';
import { crystallographyService } from './crystallographyService';

describe('CrystallographyService Frontend Client', () => {
  it('loads crystal structure presets with fallback availability', async () => {
    const presets = await crystallographyService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(5);

    const cu = presets.find((p) => p.id === 'copper');
    expect(cu).toBeDefined();
    expect(cu?.formula).toBe('Cu');
    expect(cu?.crystal_system).toBe('cubic');
    expect(cu?.bravais_lattice).toBe('face_centered_cubic');
  });

  it('retrieves single preset by id', async () => {
    const nacl = await crystallographyService.getPresetById('nacl');
    expect(nacl).toBeDefined();
    expect(nacl.name).toContain('Sodium Chloride');
    expect(nacl.basis_atoms.length).toBeGreaterThan(0);
  });

  it('computes unit cell volume and density correctly via analytical fallback', async () => {
    const geom = await crystallographyService.computeUnitCellGeometry({
      a: 3.615,
      crystal_system: 'cubic',
      bravais_lattice: 'face_centered_cubic',
      formula_units_z: 4,
      molar_mass_g_mol: 63.546,
    });

    expect(geom.volume_angstrom3).toBeCloseTo(47.238, 1);
    expect(geom.density_g_cm3).toBeCloseTo(8.93, 1);
  });

  it('computes Miller plane d-spacing and Bragg 2-theta angle', async () => {
    const res = await crystallographyService.computeMillerSpacing({
      h: 1,
      k: 1,
      l: 1,
      a: 3.615,
    });

    expect(res.d_spacing_angstrom).toBeCloseTo(2.087, 2);
    expect(res.cu_ka_two_theta_deg).toBeDefined();
    expect(res.cu_ka_two_theta_deg!).toBeGreaterThan(40.0);
    expect(res.cu_ka_two_theta_deg!).toBeLessThan(46.0);
    expect(res.is_diffraction_allowed).toBe(true);
  });

  it('synthesizes simulated Powder XRD diffractogram with peak indexing', async () => {
    const xrd = await crystallographyService.simulateXrd({
      crystal_id: 'copper',
      x_ray_source: 'Cu_Ka',
      max_two_theta: 90.0,
      fwhm_degrees: 0.2,
    });

    expect(xrd.chemical_formula).toBe('Cu');
    expect(xrd.wavelength_angstrom).toBeCloseTo(1.5406, 3);
    expect(xrd.peaks.length).toBeGreaterThanOrEqual(3);
    expect(xrd.two_theta_grid.length).toBe(xrd.intensity_profile.length);
    expect(xrd.highest_intensity_peak.two_theta_degrees).toBeGreaterThan(40.0);
  });
});
