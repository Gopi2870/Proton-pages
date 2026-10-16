import { describe, it, expect } from 'vitest';
import {
  ThermodynamicsCalculator,
  KineticsCalculator,
  ElectrochemistryCalculator,
  AcidBaseCalculator,
  QuantumChemistryCalculator,
} from './scientificCalculators';

describe('Scientific Calculators Suite', () => {
  describe('ThermodynamicsCalculator', () => {
    it('calculates Gibbs free energy correctly', () => {
      // deltaH = -100 kJ/mol, deltaS = -200 J/(mol*K) at 298.15 K
      // deltaG = -100 - (298.15 * -200 / 1000) = -100 - (-59.63) = -40.37 kJ/mol
      const deltaG = ThermodynamicsCalculator.calculateGibbsFreeEnergy(-100, -200, 298.15);
      expect(deltaG).toBeCloseTo(-40.37, 1);
    });

    it('identifies spontaneous reaction at 298.15 K', () => {
      const result = ThermodynamicsCalculator.analyzeReaction(-120, -50, 298.15);
      expect(result.isSpontaneousAt298K).toBe(true);
      expect(result.deltaG0Kj).toBeLessThan(0);
      expect(result.equilibriumConstantKeq).toBeGreaterThan(1);
    });

    it('computes crossover temperature when Delta S and Delta H share signs', () => {
      // Delta H = 50 kJ, Delta S = 100 J/K -> T_crossover = 50000 / 100 = 500 K
      const result = ThermodynamicsCalculator.analyzeReaction(50, 100);
      expect(result.crossoverTemperatureK).toBeCloseTo(500, 0);
    });
  });

  describe('KineticsCalculator', () => {
    it('computes first order half-life accurately', () => {
      // t_half = ln(2) / k
      const k = 0.05; // s^-1
      const halfLife = KineticsCalculator.firstOrderHalfLife(k);
      expect(halfLife).toBeCloseTo(Math.LN2 / 0.05, 3);
    });

    it('calculates first order concentration decay', () => {
      const c0 = 1.0;
      const k = 0.1;
      const t = 10;
      const c = KineticsCalculator.firstOrderConcentration(c0, k, t);
      expect(c).toBeCloseTo(1.0 * Math.exp(-1), 4);
    });

    it('computes second order concentration decay', () => {
      const c0 = 1.0;
      const k = 0.1;
      const t = 10;
      // 1 / (1 + 0.1 * 10 * 1) = 1 / 2 = 0.5 M
      const c = KineticsCalculator.secondOrderConcentration(c0, k, t);
      expect(c).toBeCloseTo(0.5, 4);
    });
  });

  describe('ElectrochemistryCalculator', () => {
    it('calculates Delta G from standard cell potential', () => {
      // deltaG = -n * F * E0
      // n = 2, E0 = 1.10 V (Daniell cell Zn/Cu)
      const deltaG = ElectrochemistryCalculator.deltaGFromPotential(1.10, 2);
      // -(2 * 96485.33 * 1.10) / 1000 = -212.27 kJ/mol
      expect(deltaG).toBeCloseTo(-212.27, 0);
    });

    it('solves Nernst equation potential', () => {
      // At standard state (Q = 1), potential equals standard cell potential
      const potential = ElectrochemistryCalculator.nernstPotential(1.10, 2, 1.0, 298.15);
      expect(potential).toBeCloseTo(1.10, 3);
    });
  });

  describe('AcidBaseCalculator', () => {
    it('computes strong acid pH', () => {
      expect(AcidBaseCalculator.calculatePH(0.01)).toBeCloseTo(2.0, 3);
      expect(AcidBaseCalculator.calculatePH(1e-7)).toBeCloseTo(7.0, 2);
    });

    it('computes Henderson-Hasselbalch buffer pH', () => {
      // Acetic acid buffer pKa = 4.76, [A-] = [HA] -> pH = 4.76
      const pH = AcidBaseCalculator.hendersonHasselbalchBufferPH(4.76, 0.1, 0.1);
      expect(pH).toBeCloseTo(4.76, 3);

      // When [A-] = 10 * [HA], pH = 4.76 + log10(10) = 5.76
      const pHTen = AcidBaseCalculator.hendersonHasselbalchBufferPH(4.76, 1.0, 0.1);
      expect(pHTen).toBeCloseTo(5.76, 3);
    });
  });

  describe('QuantumChemistryCalculator', () => {
    it('calculates photon energy in Joules and eV', () => {
      // 500 nm green light
      const joules = QuantumChemistryCalculator.photonEnergyJoules(500);
      const ev = QuantumChemistryCalculator.photonEnergyEv(500);
      expect(joules).toBeGreaterThan(0);
      expect(ev).toBeCloseTo(2.48, 1);
    });
  });
});
