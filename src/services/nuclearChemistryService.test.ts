import { describe, it, expect } from 'vitest';
import {
  nuclearChemistryService,
  CAMBRIDGE_HALF_LIFE_YR,
  LIBBY_HALF_LIFE_YR,
} from './nuclearChemistryService';
import { Radioisotope } from '../types/nuclearChemistry';

describe('nuclearChemistryService', () => {
  describe('Presets Catalog', () => {
    it('returns at least 4 curated decay chain presets', () => {
      const presets = nuclearChemistryService.getPresetSummaries();
      expect(presets.length).toBeGreaterThanOrEqual(4);

      const ids = presets.map((p) => p.id);
      expect(ids).toContain('molybdenum_technetium');
      expect(ids).toContain('radon_daughters');
      expect(ids).toContain('uranium_actinides');
      expect(ids).toContain('iodine_131');
    });

    it('retrieves detailed preset information', () => {
      const preset = nuclearChemistryService.getPreset('molybdenum_technetium');
      expect(preset).toBeDefined();
      expect(preset?.isotopes.length).toBe(4);
      expect(preset?.isotopes[0].symbol).toBe('Mo-99');
      expect(preset?.isotopes[1].symbol).toBe('Tc-99m');
    });
  });

  describe('Single-step exponential decay', () => {
    it('accurately halves parent population at exactly t = t_1/2', () => {
      const halfLifeS = 100.0;
      const testNuclide: Radioisotope = {
        symbol: 'Iso-1',
        name: 'Test Nuclide',
        atomicNumber: 50,
        massNumber: 100,
        halfLifeSeconds: halfLifeS,
        halfLifeDisplay: '100 s',
        decayConstantSInv: Math.LN2 / halfLifeS,
        decayMode: 'beta_minus',
        daughterIsotope: 'Iso-2',
        branchingRatio: 1.0,
        isStable: false,
      };

      const result = nuclearChemistryService.solveBatemanChain(
        [testNuclide],
        { 'Iso-1': 1000.0 },
        halfLifeS
      );

      expect(result.populations['Iso-1']).toBeCloseTo(500.0, 1);
    });
  });

  describe('Mo-99 / Tc-99m Transient Equilibrium', () => {
    it('predicts daughter Tc-99m peak activity between 22 and 24 hours', () => {
      const res = nuclearChemistryService.simulateLocally({
        chainId: 'molybdenum_technetium',
        timeHorizon: 72.0,
        timeUnit: 'hours',
        pointsCount: 144, // 0.5-hour resolution
        initialPopulations: { 'Mo-99': 1.0e12, 'Tc-99m': 0.0, 'Ru-99': 0.0 },
      });

      expect(res.trajectory.length).toBe(145);

      // Find time of peak Tc-99m activity
      let maxActivity = -1;
      let peakTimeHours = -1;

      for (const pt of res.trajectory) {
        const tcAct = pt.activitiesBq['Tc-99m'] || 0;
        if (tcAct > maxActivity) {
          maxActivity = tcAct;
          peakTimeHours = pt.timeDisplay;
        }
      }

      // Analytical peak time: ln(l2/l1) / (l2 - l1) approx 22.9 hours
      expect(peakTimeHours).toBeGreaterThan(21.0);
      expect(peakTimeHours).toBeLessThan(25.0);
      expect(res.equilibriumType).toBe('transient');
    });
  });

  describe('Radon-222 Secular Equilibrium', () => {
    it('demonstrates daughter progeny activities reaching secular equilibrium', () => {
      const res = nuclearChemistryService.simulateLocally({
        chainId: 'radon_daughters',
        timeHorizon: 6.0,
        timeUnit: 'hours',
        pointsCount: 60,
        initialPopulations: { 'Rn-222': 1.0e12 },
      });

      expect(res.equilibriumType).toBe('secular');
      const finalPoint = res.trajectory[res.trajectory.length - 1];

      // After 6 hours (~12 half-lives of Po-218 and Pb-214), progeny activities should closely approach parent Rn-222 activity
      const rnAct = finalPoint.activitiesBq['Rn-222'];
      const poAct = finalPoint.activitiesBq['Po-218'];
      const pbAct = finalPoint.activitiesBq['Pb-214'];

      expect(rnAct).toBeGreaterThan(0);
      expect(poAct / rnAct).toBeCloseTo(1.0, 1);
      expect(pbAct / rnAct).toBeCloseTo(1.0, 1);
    });
  });

  describe('Equal-decay-constant Regularization', () => {
    it('prevents division by zero when decay constants are equal or nearly identical', () => {
      const identicalLambda = 0.01;
      const isoA: Radioisotope = {
        symbol: 'Nuclide-A',
        name: 'Parent',
        atomicNumber: 80,
        massNumber: 200,
        halfLifeSeconds: Math.LN2 / identicalLambda,
        halfLifeDisplay: '69.3 s',
        decayConstantSInv: identicalLambda,
        decayMode: 'beta_minus',
        daughterIsotope: 'Nuclide-B',
        branchingRatio: 1.0,
        isStable: false,
      };

      const isoB: Radioisotope = {
        symbol: 'Nuclide-B',
        name: 'Daughter with Equal Lambda',
        atomicNumber: 81,
        massNumber: 200,
        halfLifeSeconds: Math.LN2 / identicalLambda,
        halfLifeDisplay: '69.3 s',
        decayConstantSInv: identicalLambda,
        decayMode: 'alpha',
        daughterIsotope: null,
        branchingRatio: 1.0,
        isStable: false,
      };

      const result = nuclearChemistryService.solveBatemanChain(
        [isoA, isoB],
        { 'Nuclide-A': 1000.0, 'Nuclide-B': 0.0 },
        50.0
      );

      expect(Number.isNaN(result.populations['Nuclide-B'])).toBe(false);
      expect(Number.isFinite(result.populations['Nuclide-B'])).toBe(true);
      expect(result.populations['Nuclide-B']).toBeGreaterThan(0);
    });
  });

  describe('Radiocarbon Dating', () => {
    it('calculates exact age for 1 and 2 half-lives', () => {
      // 1 half-life (50% remaining)
      const res1 = nuclearChemistryService.calculateRadiocarbonAgeLocally({
        fractionModernCarbon: 0.5,
        useCambridgeHalfLife: true,
      });
      expect(res1.uncalibratedAgeYearsBp).toBe(CAMBRIDGE_HALF_LIFE_YR);

      // Libby half-life test
      const resLibby = nuclearChemistryService.calculateRadiocarbonAgeLocally({
        fractionModernCarbon: 0.5,
        useCambridgeHalfLife: false,
      });
      expect(resLibby.uncalibratedAgeYearsBp).toBe(LIBBY_HALF_LIFE_YR);

      // 2 half-lives (25% remaining)
      const res2 = nuclearChemistryService.calculateRadiocarbonAgeLocally({
        fractionModernCarbon: 0.25,
        useCambridgeHalfLife: true,
      });
      expect(res2.uncalibratedAgeYearsBp).toBe(2 * CAMBRIDGE_HALF_LIFE_YR);
    });

    it('includes required scientific disclaimer about IntCal calibration and Suess effect', () => {
      const res = nuclearChemistryService.calculateRadiocarbonAgeLocally({
        fractionModernCarbon: 0.35,
      });

      expect(res.scientificDisclaimer).toContain('UNCALIBRATED');
      expect(res.scientificDisclaimer).toContain('IntCal20');
      expect(res.scientificDisclaimer).toContain('Suess effect');
    });
  });

  describe('Validation & Edge Cases', () => {
    it('throws error for negative initial populations', () => {
      expect(() => {
        nuclearChemistryService.simulateLocally({
          chainId: 'molybdenum_technetium',
          timeHorizon: 50.0,
          timeUnit: 'hours',
          pointsCount: 30,
          initialPopulations: { 'Mo-99': -500 },
        });
      }).toThrow(/cannot be negative/);
    });
  });
});
