import { describe, it, expect } from 'vitest';
import {
  crystallographySpaceGroupService,
  SPACE_GROUP_PRESETS,
} from './crystallographySpaceGroupService';

describe('CrystallographySpaceGroupService Frontend Client', () => {
  it('returns curated space group presets', () => {
    const presets = crystallographySpaceGroupService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(7);

    const nacl = crystallographySpaceGroupService.getPresetById('nacl_rocksalt');
    expect(nacl).toBeDefined();
    expect(nacl?.space_group_symbol).toBe('Fm-3m');
    expect(nacl?.space_group_number).toBe(225);
    expect(nacl?.crystal_system).toBe('cubic');
    expect(nacl?.basis_sites.length).toBe(2);

    const rutile = crystallographySpaceGroupService.getPresetById('tio2_rutile');
    expect(rutile).toBeDefined();
    expect(rutile?.space_group_symbol).toBe('P4_2/mnm');
    expect(rutile?.space_group_number).toBe(136);

    const hcp = crystallographySpaceGroupService.getPresetById('mg_hcp');
    expect(hcp?.crystal_system).toBe('hexagonal');
    expect(hcp?.unit_cell.gamma).toBe(120);
  });

  it('computes unit cell volume and metric tensor offline', () => {
    const cubicCell = { a: 4.0, b: 4.0, c: 4.0, alpha: 90, beta: 90, gamma: 90 };
    const res = crystallographySpaceGroupService.computeMetricTensorOffline(cubicCell);

    expect(res.volume_angstrom3).toBe(64.0);
    expect(res.direct_metric_tensor[0][0]).toBe(16.0);
    expect(res.direct_metric_tensor[1][1]).toBe(16.0);
    expect(res.direct_metric_tensor[2][2]).toBe(16.0);
    expect(res.reciprocal_a_star).toBeCloseTo(0.25, 4);
  });

  it('transforms fractional coordinates to Cartesian coordinates offline', async () => {
    const cell = { a: 5.0, b: 5.0, c: 5.0, alpha: 90, beta: 90, gamma: 90 };
    const fracCoords = [
      { element: 'Na', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'Cl', x: 0.5, y: 0.5, z: 0.5 },
    ];
    const cart = await crystallographySpaceGroupService.convertFractionalToCartesian({
      unit_cell: cell,
      fractional_coordinates: fracCoords,
    });

    expect(cart.length).toBe(2);
    expect(cart[0].x_angstrom).toBe(0.0);
    expect(cart[0].y_angstrom).toBe(0.0);
    expect(cart[0].z_angstrom).toBe(0.0);
    expect(cart[1].x_angstrom).toBe(2.5);
    expect(cart[1].y_angstrom).toBe(2.5);
    expect(cart[1].z_angstrom).toBe(2.5);
  });

  it('synthesizes offline powder XRD diffractogram peaks', () => {
    const cell = { a: 5.64, b: 5.64, c: 5.64, alpha: 90, beta: 90, gamma: 90 };
    const pattern = crystallographySpaceGroupService.simulatePowderXrdOffline({
      space_group_number: 225,
      unit_cell: cell,
      atoms: [
        { element: 'Na', x: 0, y: 0, z: 0 },
        { element: 'Cl', x: 0.5, y: 0.5, z: 0.5 },
      ],
      two_theta_min: 10,
      two_theta_max: 80,
    });

    expect(pattern.peaks.length).toBeGreaterThan(0);
    expect(pattern.two_theta_grid.length).toBeGreaterThan(0);
    expect(pattern.intensity_profile.length).toBe(pattern.two_theta_grid.length);

    // Verify first peak is 111 at ~27.3 degrees
    const peak111 = pattern.peaks.find((p) => p.h === 1 && p.k === 1 && p.l === 1);
    expect(peak111).toBeDefined();
    expect(peak111?.d_spacing_angstrom).toBeCloseTo(3.2562, 2);
    expect(peak111?.two_theta_degrees).toBeGreaterThan(25);
    expect(peak111?.two_theta_degrees).toBeLessThan(30);
  });
});
