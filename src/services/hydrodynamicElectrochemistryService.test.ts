import { describe, it, expect } from 'vitest';
import {
  hydrodynamicElectrochemistryService,
  CURATED_METALS,
  ELECTRODES_INFO,
} from './hydrodynamicElectrochemistryService';

describe('HydrodynamicElectrochemistryService Frontend Client', () => {
  it('loads catalog with metals and working electrodes', async () => {
    const catalog = await hydrodynamicElectrochemistryService.getCatalog();
    expect(catalog.metals.length).toBeGreaterThanOrEqual(4);
    expect(catalog.electrodes.length).toBeGreaterThanOrEqual(5);
    expect(catalog.metals.some((m) => m.symbol === 'Pb')).toBe(true);
  });

  it('calculates Levich hydrodynamic current scaling with rotation speed', () => {
    const res = hydrodynamicElectrochemistryService.simulateRdeLocally({
      electrode_type: 'platinum_disk',
      electrode_radius_mm: 2.5,
      concentration_mm: 5.0,
      n_electrons: 1,
      diffusion_coefficient_cm2_s: 6.5e-6,
      kinematic_viscosity_cm2_s: 0.010,
      rotation_speeds_rpm: [400, 900, 1600, 2500],
      heterogeneous_rate_constant_k0_cm_s: 5.0,
    });

    expect(res.levich_points.length).toBe(4);
    expect(res.levich_slope_ua_s_half).toBeGreaterThan(0);
    expect(res.levich_points[0].limiting_current_ua).toBeLessThan(res.levich_points[3].limiting_current_ua);
    expect(res.levich_points[0].hydrodynamic_boundary_layer_um).toBeGreaterThan(
      res.levich_points[3].hydrodynamic_boundary_layer_um
    );
  });

  it('generates Koutecky-Levich points and RRDE collection waves', () => {
    const res = hydrodynamicElectrochemistryService.simulateRdeLocally({
      electrode_type: 'glassy_carbon',
      electrode_radius_mm: 2.0,
      concentration_mm: 2.0,
      n_electrons: 1,
      diffusion_coefficient_cm2_s: 5e-6,
      kinematic_viscosity_cm2_s: 0.01,
      rotation_speeds_rpm: [500, 1000],
    });

    expect(res.koutecky_levich_points.length).toBe(2);
    expect(res.polarization_waves.length).toBe(2);
    expect(res.rrde_collection_efficiency_theoretical).toBe(0.38);
  });

  it('simulates square-wave stripping voltammetry for multi-element trace analysis', () => {
    const res = hydrodynamicElectrochemistryService.simulateStrippingLocally({
      deposition_potential_v: -1.2,
      deposition_time_s: 120,
      stripping_mode: 'square_wave',
      electrode_type: 'bismuth_film',
      zn_concentration_ppb: 50,
      cd_concentration_ppb: 15,
      pb_concentration_ppb: 20,
      cu_concentration_ppb: 30,
    });

    expect(res.peaks_detected.length).toBe(4);
    expect(res.preconcentration_factor).toBeGreaterThan(10);
    expect(res.stripping_curve.length).toBe(151);

    const pb = res.peaks_detected.find((p) => p.symbol === 'Pb');
    expect(pb).toBeDefined();
    expect(pb?.peak_potential_v).toBe(-0.44);
    expect(pb?.peak_current_ua).toBeGreaterThan(0);
  });

  it('calculates chronocoulometric Anson plot and surface excess', () => {
    const res = hydrodynamicElectrochemistryService.simulateChronocoulometryLocally({
      concentration_mm: 1.0,
      electrode_area_cm2: 0.2,
      step_duration_s: 0.25,
      n_electrons: 2,
      surface_excess_gamma_mol_cm2: 2.5e-10,
      double_layer_capacitance_uf_cm2: 20.0,
      potential_step_v: 0.5,
      diffusion_coefficient_cm2_s: 5.0e-6,
    });

    expect(res.double_layer_charge_uc).toBeCloseTo(2.0, 1);
    expect(res.anson_slope_uc_s_half).toBeGreaterThan(0);
    expect(res.anson_points.length).toBe(30);
    expect(res.anson_points[29].charge_total_uc).toBeGreaterThan(res.anson_points[0].charge_total_uc);
  });
});
