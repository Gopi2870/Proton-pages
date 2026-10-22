import { describe, it, expect } from 'vitest';
import {
  nonEquilibriumThermoService,
  CURATED_THERMOELECTRIC_MATERIALS,
  CURATED_ELECTROKINETIC_MEDIUMS,
  CURATED_THERMODIFFUSION_MIXTURES,
  BENCHMARK_SYSTEMS,
} from './nonEquilibriumThermoService';

describe('NonEquilibriumThermoService Frontend Client', () => {
  it('loads curated catalogs and benchmark systems', () => {
    expect(CURATED_THERMOELECTRIC_MATERIALS.length).toBeGreaterThanOrEqual(4);
    expect(CURATED_ELECTROKINETIC_MEDIUMS.length).toBeGreaterThanOrEqual(2);
    expect(CURATED_THERMODIFFUSION_MIXTURES.length).toBeGreaterThanOrEqual(4);
    expect(BENCHMARK_SYSTEMS.length).toBe(3);

    const matIds = nonEquilibriumThermoService.getCuratedMaterials().map((m) => m.id);
    expect(matIds).toContain('bi2te3_n_type');
    expect(matIds).toContain('bi2te3_p_type');
  });

  it('evaluates symmetric transport matrix, positive semi-definiteness, and entropy production', () => {
    const res = nonEquilibriumThermoService.evaluateTransportLocally({
      matrixL: [
        [5.0, 2.0],
        [2.0, 8.0],
      ],
      drivingForces: [3.0, -1.0],
      temperatureK: 300.0,
    });

    expect(res.transportMatrix.isSymmetric).toBe(true);
    expect(res.transportMatrix.asymmetryNorm).toBe(0);
    expect(res.transportMatrix.isPositiveSemidefinite).toBe(true);
    expect(res.entropyProduction.isPhysicallyAdmissible).toBe(true);
    expect(res.entropyProduction.secondLawSatisfied).toBe(true);
    expect(res.entropyProduction.entropyProductionWM3K).toBeGreaterThan(0);
  });

  it('correctly flags unphysical matrix violating positive semi-definiteness (|q| > 1)', () => {
    const res = nonEquilibriumThermoService.evaluateTransportLocally({
      matrixL: [
        [2.0, 5.0],
        [5.0, 2.0],
      ],
      drivingForces: [1.0, -1.0],
      temperatureK: 300.0,
    });

    expect(res.transportMatrix.isPositiveSemidefinite).toBe(false);
    expect(res.entropyProduction.isPhysicallyAdmissible).toBe(false);
    expect(res.entropyProduction.secondLawSatisfied).toBe(false);
    expect(res.entropyProduction.dissipationRateWM3).toBeLessThan(0);
  });

  it('validates Second Kelvin Relation (Pi = S * T) for both n-type and p-type thermoelectrics', () => {
    // n-type bismuth telluride (Seebeck < 0)
    const resN = nonEquilibriumThermoService.evaluateThermoelectricLocally({
      materialId: 'bi2te3_n_type',
      temperatureK: 300.0,
      voltageGradientVM: 10.0,
      temperatureGradientKM: 500.0,
    });
    expect(resN.system.seebeckCoefficientUvK).toBeLessThan(0);
    expect(resN.system.peltierCoefficientMv).toBeLessThan(0);
    expect(resN.secondKelvinLawVerified).toBe(true);
    expect(resN.system.kelvinRelationResidualPct).toBeCloseTo(0.0, 4);

    // p-type bismuth telluride (Seebeck > 0)
    const resP = nonEquilibriumThermoService.evaluateThermoelectricLocally({
      materialId: 'bi2te3_p_type',
      temperatureK: 300.0,
      voltageGradientVM: 10.0,
      temperatureGradientKM: 500.0,
    });
    expect(resP.system.seebeckCoefficientUvK).toBeGreaterThan(0);
    expect(resP.system.peltierCoefficientMv).toBeGreaterThan(0);
    expect(resP.secondKelvinLawVerified).toBe(true);
    expect(resP.system.figureOfMeritZt).toBeGreaterThan(0.8);
  });

  it('validates Saxen reciprocity relation for electrokinetic porous media', () => {
    const res = nonEquilibriumThermoService.evaluateElectrokineticLocally({
      mediumId: 'glass_capillary_water',
      pressureDropKpa: 50.0,
      voltageDifferenceV: 100.0,
    });

    expect(res.saxenReciprocityHolds).toBe(true);
    expect(res.system.saxenReciprocityVerified).toBe(true);
    expect(res.system.saxenRelativeErrorPct).toBe(0);
    expect(res.volumeFlowRateM3S).toBeGreaterThan(0);
    expect(res.electricCurrentA).toBeGreaterThan(0);
  });

  it('evaluates thermodiffusion Soret separation and Dufour reciprocity', () => {
    // Benchmark toluene-cyclohexane
    const resToluene = nonEquilibriumThermoService.evaluateThermodiffusionLocally({
      mixtureId: 'toluene_cyclohexane',
      temperatureK: 298.15,
      temperatureGradientKM: 200.0,
      massFractionGradientMInv: 0.5,
    });
    expect(resToluene.onsagerReciprocityVerified).toBe(true);
    expect(resToluene.system.soretCoefficientKInv).toBeGreaterThan(0);
    expect(resToluene.system.onsagerCrossCouplingRatio).toBe(1.0);
    expect(resToluene.entropyProductionWM3K).toBeGreaterThan(0);

    // Water-ethanol anomalous negative Soret
    const resEthanol = nonEquilibriumThermoService.evaluateThermodiffusionLocally({
      mixtureId: 'water_ethanol',
      temperatureK: 298.15,
      temperatureGradientKM: 200.0,
      massFractionGradientMInv: 0.5,
    });
    expect(resEthanol.system.soretCoefficientKInv).toBeLessThan(0);
  });

  it('validates input error handling for non-square matrices and non-positive temperatures', () => {
    expect(() =>
      nonEquilibriumThermoService.evaluateTransportLocally({
        matrixL: [
          [1.0, 2.0, 3.0],
          [4.0, 5.0, 6.0],
        ],
        drivingForces: [1.0, 2.0],
        temperatureK: 300.0,
      })
    ).toThrow('square');

    expect(() =>
      nonEquilibriumThermoService.evaluateTransportLocally({
        matrixL: [
          [1.0, 0.0],
          [0.0, 1.0],
        ],
        drivingForces: [1.0, 2.0],
        temperatureK: -10.0,
      })
    ).toThrow('positive');
  });
});
