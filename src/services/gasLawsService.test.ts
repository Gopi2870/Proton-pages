import { describe, it, expect } from 'vitest';
import { GasLawsService } from './gasLawsService';

describe('GasLawsService Frontend Client', () => {
  it('retrieves real gas constants catalog with Van der Waals parameters', async () => {
    const constants = await GasLawsService.getConstants();
    expect(constants.length).toBeGreaterThanOrEqual(6);
    const co2 = constants.find((g) => g.id === 'co2');
    expect(co2).toBeDefined();
    expect(co2?.vdw_a_l2_atm_mol2).toBeCloseTo(3.658, 2);
  });

  it('solves Ideal Gas Law for missing pressure and calculates molar volume', async () => {
    const res = await GasLawsService.calculateIdealGas(undefined, 22.414, 1.0, 273.15, 44.01);
    expect(res.pressure_atm).toBeCloseTo(1.0, 1);
    expect(res.molar_volume_l_mol).toBeCloseTo(22.414, 1);
    expect(res.density_g_l).toBeDefined();
  });

  it('simulates Van der Waals real gas behavior under compression', async () => {
    const res = await GasLawsService.simulateVanDerWaals('co2', 1.0, 298.15, 1.0);
    expect(res.gas_name).toBe('Carbon Dioxide');
    expect(res.compressibility_z).toBeLessThan(1.0);
    expect(res.isotherm_points.length).toBeGreaterThan(10);
  });

  it('calculates Maxwell-Boltzmann molecular speeds (v_mp < v_avg < v_rms)', async () => {
    const res = await GasLawsService.calculateMaxwellBoltzmann('N2', 28.013, 298.15);
    expect(res.v_mp_m_s).toBeLessThan(res.v_avg_m_s);
    expect(res.v_avg_m_s).toBeLessThan(res.v_rms_m_s);
    expect(res.v_mp_m_s).toBeCloseTo(420.6, 0);
    expect(res.distribution_points.length).toBeGreaterThan(20);
  });

  it('retrieves phase equilibrium boundaries and vapor pressure progression', async () => {
    const res = await GasLawsService.getPhaseEquilibrium('water');
    expect(res.substance_name).toBe('Water');
    expect(res.normal_boiling_point_c).toBe(100.0);
    expect(res.vapor_pressure_curve.length).toBeGreaterThan(2);
  });
});
