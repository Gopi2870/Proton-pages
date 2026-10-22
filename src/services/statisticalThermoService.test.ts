import { describe, it, expect } from 'vitest';
import {
  statisticalThermoService,
  R_GAS,
} from './statisticalThermoService';

describe('statisticalThermoService', () => {
  describe('Molecules Catalog', () => {
    it('returns at least 6 curated molecules', () => {
      const molecules = statisticalThermoService.getMolecules();
      expect(molecules.length).toBeGreaterThanOrEqual(6);

      const ids = molecules.map((m) => m.id);
      expect(ids).toContain('ar');
      expect(ids).toContain('n2');
      expect(ids).toContain('co2');
      expect(ids).toContain('h2o');
      expect(ids).toContain('ch4');
    });

    it('retrieves detailed molecule specification', () => {
      const n2 = statisticalThermoService.getMolecule('n2');
      expect(n2).toBeDefined();
      expect(n2?.formula).toBe('N2');
      expect(n2?.geometry).toBe('linear');
      expect(n2?.symmetryNumber).toBe(2);
      expect(n2?.vibrationalFrequenciesCm1.length).toBe(1);
    });
  });

  describe('Argon Monatomic Sackur-Tetrode State', () => {
    it('computes exact Sackur-Tetrode standard entropy S° at 298.15 K and 1 bar', () => {
      const res = statisticalThermoService.calculateLocally({
        moleculeId: 'ar',
        temperatureK: 298.15,
        pressurePa: 100000.0,
      });

      expect(res.partitionFunctions.qRot).toBe(1.0);
      expect(res.partitionFunctions.qVib).toBe(1.0);
      expect(res.partitionFunctions.qElec).toBe(1.0);

      // Sackur-Tetrode experimental literature benchmark: 154.84 J / (mol K)
      expect(res.thermodynamicState.entropyStandardJMolK).toBeCloseTo(154.84, 0);

      // Monatomic heat capacities: Cv = 1.5 R, Cp = 2.5 R
      expect(res.heatCapacity.cvTotal).toBeCloseTo(1.5 * R_GAS, 1);
      expect(res.heatCapacity.cpTotal).toBeCloseTo(2.5 * R_GAS, 1);
    });
  });

  describe('Dinitrogen Linear Rotor & Vibrational Freeze-out', () => {
    it('calculates linear q_rot and verifies vibrational freeze-out at room temp', () => {
      const res = statisticalThermoService.calculateLocally({
        moleculeId: 'n2',
        temperatureK: 298.15,
        pressurePa: 100000.0,
      });

      // Linear rotor q_rot > 50 at 298 K
      expect(res.partitionFunctions.qRot).toBeGreaterThan(50.0);
      // High vibrational frequency (2358.6 cm^-1) means mode is frozen at 298 K
      expect(res.partitionFunctions.qVib).toBeCloseTo(1.0, 2);

      // Heat capacity is locked at 5/2 R = 20.785 J/(mol K)
      expect(res.heatCapacity.cvTotal).toBeCloseTo(2.5 * R_GAS, 1);
      expect(res.thermodynamicState.entropyStandardJMolK).toBeCloseTo(191.6, 0);
    });
  });

  describe('Water Polyatomic Asymmetric Rotor', () => {
    it('calculates non-linear 3D rotational partition function', () => {
      const res = statisticalThermoService.calculateLocally({
        moleculeId: 'h2o',
        temperatureK: 298.15,
        pressurePa: 100000.0,
      });

      expect(res.partitionFunctions.qRot).toBeGreaterThan(1.0);
      // Non-linear base heat capacity: Cv_trans (1.5 R) + Cv_rot (1.5 R) = 3 R
      expect(res.heatCapacity.cvTrans).toBeCloseTo(1.5 * R_GAS, 1);
      expect(res.heatCapacity.cvRot).toBeCloseTo(1.5 * R_GAS, 1);
      expect(res.heatCapacity.cvTotal).toBeGreaterThan(3.0 * R_GAS);
    });
  });

  describe('Temperature Sweep & Quantum Freeze-out', () => {
    it('demonstrates low-T plateau to high-T equipartition transition', () => {
      const sweep = statisticalThermoService.temperatureSweepLocally({
        moleculeId: 'n2',
        tempMinK: 50.0,
        tempMaxK: 3000.0,
        pointsCount: 30,
      });

      expect(sweep.curve.length).toBe(30);
      const lowT = sweep.curve[0];
      const highT = sweep.curve[sweep.curve.length - 1];

      // At 50 K, Cv ~ 5/2 R = 20.785
      expect(lowT.cvJMolK).toBeCloseTo(2.5 * R_GAS, 0);
      // At 3000 K, Cv approaches 7/2 R = 29.10
      expect(highT.cvJMolK).toBeGreaterThan(28.0);
      expect(highT.fractionEquipartition).toBeGreaterThan(0.95);
    });
  });

  describe('Validation & Edge Cases', () => {
    it('throws error for non-positive temperature or pressure', () => {
      expect(() => {
        statisticalThermoService.calculateLocally({
          moleculeId: 'ar',
          temperatureK: -100.0,
          pressurePa: 100000.0,
        });
      }).toThrow(/Temperature must be positive/);

      expect(() => {
        statisticalThermoService.calculateLocally({
          moleculeId: 'ar',
          temperatureK: 298.15,
          pressurePa: -500.0,
        });
      }).toThrow(/Pressure must be positive/);
    });
  });
});
