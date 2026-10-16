import { describe, it, expect } from 'vitest';
import { virtualLabService } from './virtualLabService';

describe('VirtualLabService Frontend Client', () => {
  it('simulates strong acid strong base titration via fallback', async () => {
    const result = await virtualLabService.simulateTitration({
      system_type: 'strong_acid_strong_base',
      analyte_volume_ml: 25.0,
      analyte_conc_m: 0.1,
      titrant_conc_m: 0.1,
    });

    expect(result.equivalence_volume_ml).toBe(25.0);
    expect(result.equivalence_ph).toBe(7.0);
    expect(result.curve_points.length).toBeGreaterThan(20);
    expect(result.titrant_formula).toBe('NaOH');
  });

  it('simulates weak acid strong base buffer equilibrium', async () => {
    const result = await virtualLabService.simulateTitration({
      system_type: 'weak_acid_strong_base',
      analyte_volume_ml: 25.0,
      analyte_conc_m: 0.1,
      titrant_conc_m: 0.1,
    });

    expect(result.equivalence_volume_ml).toBe(25.0);
    expect(result.equivalence_ph).toBeGreaterThan(8.0);
    expect(result.half_equivalence_volume_ml).toBe(12.5);
    expect(result.pka).toBeCloseTo(4.76, 1);
  });

  it('simulates coffee cup endothermic dissolution of NH4NO3', async () => {
    const result = await virtualLabService.simulateCalorimetry({
      calorimeter_type: 'solution_coffee_cup',
      sample_key: 'nh4no3',
      sample_mass_g: 5.0,
      water_mass_g: 100.0,
      initial_temp_c: 25.0,
    });

    expect(result.is_exothermic).toBe(false);
    expect(result.delta_t_c).toBeLessThan(0.0);
    expect(result.peak_temp_c).toBeLessThan(25.0);
    expect(result.molar_enthalpy_kj_mol).toBeCloseTo(25.7, 1);
    expect(result.temperature_curve.length).toBeGreaterThan(20);
  });

  it('simulates bomb calorimetry combustion of benzoic acid', async () => {
    const result = await virtualLabService.simulateCalorimetry({
      calorimeter_type: 'constant_volume_bomb',
      sample_key: 'benzoic_acid',
      sample_mass_g: 1.0,
      initial_temp_c: 25.0,
    });

    expect(result.is_exothermic).toBe(true);
    expect(result.delta_t_c).toBeGreaterThan(0.0);
    expect(result.peak_temp_c).toBeGreaterThan(25.0);
    expect(result.theoretical_enthalpy_kj_mol).toBe(-3227.0);
  });
});
