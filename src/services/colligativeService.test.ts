import { describe, it, expect } from 'vitest';
import {
  ColligativeService,
  calculatePureVaporPressureMmHg,
  calculateVaporPressureClient,
  calculateBoilingFreezingClient,
  calculateOsmoticPressureClient,
  calculateIonicStrengthClient,
} from './colligativeService';

describe('ColligativeService & Scientific Engine', () => {
  it('loads presets, solvents, and solutes', async () => {
    const presets = await ColligativeService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(8);
    const presetIds = presets.map((p) => p.id);
    expect(presetIds).toContain('ethanol_water_vle');
    expect(presetIds).toContain('seawater_freezing');
    expect(presetIds).toContain('camphor_rast_method');

    const solvents = await ColligativeService.getSolvents();
    expect(solvents.length).toBeGreaterThanOrEqual(8);

    const solutes = await ColligativeService.getSolutes();
    expect(solutes.length).toBeGreaterThanOrEqual(6);
  });

  it('calculates Antoine pure vapor pressure for water', () => {
    const p100 = calculatePureVaporPressureMmHg('water', 100.0);
    expect(p100).toBeCloseTo(760.0, -1);

    const p25 = calculatePureVaporPressureMmHg('water', 25.0);
    expect(p25).toBeCloseTo(23.76, 0);
  });

  it('calculates ideal Raoult binary vapor-liquid equilibrium (Benzene-Toluene)', () => {
    const res = calculateVaporPressureClient({
      solvent1_id: 'benzene',
      solvent2_id: 'toluene',
      temperature_c: 25.0,
      x1_mole_fraction: 0.50,
      non_ideal_parameter_a12: 0.0,
    });

    expect(res.model_type).toBe('ideal_raoult');
    expect(res.activity_coeff_1).toBeCloseTo(1.0, 3);
    expect(res.activity_coeff_2).toBeCloseTo(1.0, 3);
    expect(res.azeotrope_detected).toBe(false);
    expect(res.vle_curve.length).toBe(21);
  });

  it('detects azeotrope in non-ideal Margules solution (Ethanol-Water)', () => {
    const res = calculateVaporPressureClient({
      solvent1_id: 'ethanol',
      solvent2_id: 'water',
      temperature_c: 78.15,
      x1_mole_fraction: 0.40,
      non_ideal_parameter_a12: 1.25,
    });

    expect(res.model_type).toBe('margules_two_suffix');
    expect(res.activity_coeff_1).toBeGreaterThan(1.0);
    expect(res.azeotrope_detected).toBe(true);
    expect(res.azeotrope_x1).not.toBeNull();
  });

  it('calculates boiling elevation and freezing depression with dilute validation', () => {
    // 0.1 m NaCl in water -> i = 2, deltaTb = 2 * 0.512 * 0.10 = 0.1024, deltaTf = 2 * 1.86 * 0.10 = 0.372
    const res = calculateBoilingFreezingClient({
      solvent_id: 'water',
      solute_id: 'nacl',
      solute_mass_g: 5.8443,
      solvent_mass_g: 1000.0,
    });

    expect(res.molality_m).toBeCloseTo(0.10, 2);
    expect(res.delta_tb_c).toBeCloseTo(0.1024, 3);
    expect(res.delta_tf_c).toBeCloseTo(0.372, 2);
    expect(res.solution_boiling_point_c).toBeCloseTo(100.1024, 2);
    expect(res.solution_freezing_point_c).toBeCloseTo(-0.372, 2);
    expect(res.dilute_limit_exceeded).toBe(false);
  });

  it('determines molecular weight via camphor Rast cryoscopic method', () => {
    // 1.00 g in 10.0 g camphor (Kf = 39.7), observed deltaTf = 19.85 C -> M = 200 g/mol
    const res = calculateBoilingFreezingClient({
      solvent_id: 'camphor',
      solute_id: 'glucose',
      solute_mass_g: 1.00,
      solvent_mass_g: 10.0,
      custom_van_t_hoff_i: 1.0,
      observed_delta_tf_c: 19.85,
    });

    expect(res.estimated_molar_mass_g_mol).toBeCloseTo(200.0, 0);
  });

  it('calculates osmotic pressure and blood plasma isotonicity', () => {
    // 0.154 M NaCl at 37 C -> Pi approx 7.85 atm
    const res = calculateOsmoticPressureClient({
      solute_name: 'Normal Saline (0.9% NaCl)',
      temperature_c: 37.0,
      solute_mass_g: 9.0,
      solution_volume_l: 1.0,
      solute_molar_mass_g_mol: 58.443,
      van_t_hoff_i: 2.0,
    });

    expect(res.osmotic_pressure_atm).toBeCloseTo(7.85, 0);
    expect(res.is_isotonic_blood).toBe(true);
    expect(res.tonicity_category).toContain('Isotonic');
  });

  it('calculates ionic strength and Debye-Hückel activity coefficients', () => {
    // CaCl2 (0.05 M) -> I = 0.15 M
    const res = calculateIonicStrengthClient({
      electrolyte_id: 'cacl2',
      molarity_m: 0.05,
      temperature_c: 25.0,
      ion_radius_angstrom: 3.0,
    });

    expect(res.ionic_strength_i).toBeCloseTo(0.15, 2);
    expect(res.selected_gamma).toBeGreaterThan(0.0);
    expect(res.selected_gamma).toBeLessThan(1.0);
    expect(res.activity_curve.length).toBeGreaterThan(5);
  });
});
