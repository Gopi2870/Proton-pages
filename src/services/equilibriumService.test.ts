import { describe, it, expect } from 'vitest';
import {
  EquilibriumService,
  solveRiceTableClient,
  solvePolyproticAcidClient,
  calculateBufferCapacityClient,
  calculateSolubilityKspClient,
  simulateLeChatelierClient,
} from './equilibriumService';

describe('EquilibriumService & Scientific Engine', () => {
  it('loads equilibrium presets with thermodynamics and stoichiometry', async () => {
    const presets = await EquilibriumService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(6);

    const ids = presets.map((p) => p.id);
    expect(ids).toContain('haber_bosch');
    expect(ids).toContain('no2_dimerization');
    expect(ids).toContain('acetic_acid');
    expect(ids).toContain('phosphoric_acid');
    expect(ids).toContain('lead_iodide');
  });

  it('solves RICE table with bracketed monotonic root finder', () => {
    // N2 + 3 H2 <=> 2 NH3 with K = 0.50
    // Initial: N2 = 1.0 M, H2 = 1.0 M, NH3 = 0.0 M -> Q = 0 < K -> shift forward
    const result = solveRiceTableClient({
      equilibrium_constant_k: 0.50,
      participants: [
        { formula: 'N2', name: 'Nitrogen', coefficient: 1, is_product: false, initial_concentration: 1.0 },
        { formula: 'H2', name: 'Hydrogen', coefficient: 3, is_product: false, initial_concentration: 1.0 },
        { formula: 'NH3', name: 'Ammonia', coefficient: 2, is_product: true, initial_concentration: 0.0 },
      ],
    });

    expect(result.converged).toBe(true);
    expect(result.shift_direction).toBe('forward');
    expect(result.extent_of_reaction_xi).toBeGreaterThan(0.0);
    expect(result.extent_of_reaction_xi).toBeLessThan(1.0 / 3.0);

    const n2Row = result.rows.find((r) => r.species_formula === 'N2')!;
    const h2Row = result.rows.find((r) => r.species_formula === 'H2')!;
    const nh3Row = result.rows.find((r) => r.species_formula === 'NH3')!;

    expect(n2Row.equilibrium).toBeCloseTo(1.0 - result.extent_of_reaction_xi, 4);
    expect(h2Row.equilibrium).toBeCloseTo(1.0 - 3.0 * result.extent_of_reaction_xi, 4);
    expect(nh3Row.equilibrium).toBeCloseTo(2.0 * result.extent_of_reaction_xi, 4);
  });

  it('solves polyprotic acid speciation across multiple Ka values', () => {
    // Phosphoric acid H3PO4 (0.10 M) Ka1=7.11e-3, Ka2=6.32e-8, Ka3=4.49e-13
    const res = solvePolyproticAcidClient({
      acid_name: 'Phosphoric Acid',
      acid_formula: 'H3PO4',
      total_concentration_ca: 0.10,
      dissociation_constants_ka: [7.11e-3, 6.32e-8, 4.49e-13],
    });

    expect(res.ph).toBeGreaterThan(1.4);
    expect(res.ph).toBeLessThan(1.8);
    expect(res.species_fractions.length).toBe(4);

    const sumAlpha = res.species_fractions.reduce((s, f) => s + f.fraction_alpha, 0);
    expect(sumAlpha).toBeCloseTo(1.0, 5);

    // In 0.1 M phosphoric acid, [H3PO4] and [H2PO4-] dominate; [PO4(3-)] is negligible
    const h3po4 = res.species_fractions[0];
    const h2po4 = res.species_fractions[1];
    expect(h3po4.fraction_alpha + h2po4.fraction_alpha).toBeGreaterThan(0.99);
  });

  it('calculates van Slyke buffer capacity and pH response', () => {
    // Acetic acid / acetate buffer (pKa = 4.756, Ctot = 0.10 M, ratio = 1.0)
    const buf = calculateBufferCapacityClient({
      buffer_name: 'Acetic Acid Buffer',
      acid_component: 'CH3COOH',
      base_component: 'CH3COO-',
      pka: 4.756,
      total_buffer_concentration_m: 0.10,
      ratio_base_to_acid: 1.0,
      added_strong_acid_m: 0.01,
      added_strong_base_m: 0.01,
    });

    expect(buf.henderson_hasselbalch_ph).toBeCloseTo(4.756, 3);
    expect(buf.van_slyke_buffer_capacity_beta).toBeGreaterThan(0.04);
    expect(buf.ph_after_acid_addition).toBeLessThan(4.756);
    expect(buf.ph_after_base_addition).toBeGreaterThan(4.756);
    expect(buf.buffer_curve.length).toBeGreaterThan(40);
  });

  it('calculates Ksp solubility and common-ion depression for PbI2', () => {
    // PbI2 (Ksp = 9.8e-9, molar mass 461.01 g/mol)
    const pure = calculateSolubilityKspClient({
      salt_name: 'Lead(II) Iodide',
      salt_formula: 'PbI2',
      ksp_value: 9.8e-9,
      molar_mass_g_mol: 461.01,
      cation_formula: 'Pb2+',
      cation_coefficient: 1,
      anion_formula: 'I-',
      anion_coefficient: 2,
      common_ion_concentration: 0.0,
    });

    // Pure s = (9.8e-9 / 4)^(1/3) ~ 0.001348 mol/L
    expect(pure.molar_solubility_mol_l).toBeCloseTo(0.001348, 4);

    // With 0.10 M KI common ion
    const depressed = calculateSolubilityKspClient({
      salt_name: 'Lead(II) Iodide',
      salt_formula: 'PbI2',
      ksp_value: 9.8e-9,
      molar_mass_g_mol: 461.01,
      cation_formula: 'Pb2+',
      cation_coefficient: 1,
      anion_formula: 'I-',
      anion_coefficient: 2,
      common_ion_formula: 'I-',
      common_ion_concentration: 0.10,
    });

    // s*(0.10)^2 = 9.8e-9 -> s ~ 9.8e-7 mol/L
    expect(depressed.molar_solubility_mol_l).toBeLessThan(pure.molar_solubility_mol_l / 1000.0);
    expect(depressed.molar_solubility_mol_l).toBeCloseTo(9.8e-7, 7);
  });

  it('simulates Le Chatelier responses for pressure and temperature', () => {
    // Haber-Bosch exothermic reaction (deltaH = -92.2 kJ/mol, deltaNg = -2)
    const tempResponse = simulateLeChatelierClient({
      preset_reaction_id: 'haber_bosch',
      perturbation_type: 'temperature_shift',
      concentration_changes: {},
      pressure_multiplier: 1.0,
      temperature_k: 450.0, // raised temperature
    });

    expect(tempResponse.le_chatelier_shift).toBe('reverse');
    expect(tempResponse.perturbed_k).toBeLessThan(tempResponse.initial_k);
    expect(tempResponse.pedagogical_explanation).toContain('exothermic');

    const pressureResponse = simulateLeChatelierClient({
      preset_reaction_id: 'haber_bosch',
      perturbation_type: 'pressure_volume',
      concentration_changes: {},
      pressure_multiplier: 3.0, // increased pressure
    });

    expect(pressureResponse.le_chatelier_shift).toBe('forward');
    expect(pressureResponse.pedagogical_explanation).toContain('fewer gas moles');
  });
});
