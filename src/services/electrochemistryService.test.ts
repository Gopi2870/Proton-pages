import { describe, it, expect } from 'vitest';
import { ElectrochemistryService } from './electrochemistryService';

describe('ElectrochemistryService Frontend Client', () => {
  it('calculates standard galvanic cell potential for Daniell cell (Zn/Cu)', () => {
    const result = ElectrochemistryService.calculateLocalGalvanicCell('Cu(2+)', 'Zn(2+)', 1.0, 1.0);
    expect(result).toBeDefined();
    expect(result.standard_potential_volts).toBeCloseTo(1.10, 1);
    expect(result.is_spontaneous).toBe(true);
    expect(result.standard_gibbs_free_energy_kj).toBeLessThan(0);
  });

  it('adjusts potential according to Nernst equation when concentrations vary', () => {
    const standard = ElectrochemistryService.calculateLocalGalvanicCell('Cu(2+)', 'Zn(2+)', 1.0, 1.0);
    const dilutedAnode = ElectrochemistryService.calculateLocalGalvanicCell('Cu(2+)', 'Zn(2+)', 1.0, 0.01);
    // Diluting products increases forward cell voltage
    expect(dilutedAnode.cell_potential_volts).toBeGreaterThan(standard.cell_potential_volts);
  });

  it('calculates Faraday electrolysis deposition mass', () => {
    // Current = 2 A, Time = 1800 s, Copper n=2, M=63.546
    const result = ElectrochemistryService.calculateLocalElectrolysis('Cu', 63.546, 2, 2.0, 1800.0);
    expect(result).toBeDefined();
    expect(result.total_charge_coulombs).toBe(3600.0);
    expect(result.mass_deposited_grams).toBeCloseTo(1.185, 2);
  });

  it('calculates gas volume for gas-evolving electrolysis', () => {
    const result = ElectrochemistryService.calculateLocalElectrolysis('H2', 2.016, 2, 5.0, 3600.0);
    expect(result.gas_volume_liters_stp).toBeDefined();
    expect(result.gas_volume_liters_stp).toBeGreaterThan(0);
  });
});
