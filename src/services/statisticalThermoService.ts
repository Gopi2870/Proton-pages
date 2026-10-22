/**
 * Statistical Thermodynamics & Molecular Partition Functions Service (PR #043).
 * Dual-layer architecture: calls FastAPI backend when available, with
 * client-side partition function and thermodynamic property evaluation offline fallback.
 */

import {
  MoleculeSpec,
  MoleculeSummary,
  PartitionFunctionsBreakdown,
  HeatCapacityDecomposition,
  ThermodynamicState,
  TemperatureCurvePoint,
  PartitionFunctionCalculationRequest,
  PartitionFunctionCalculationResponse,
  TemperatureSweepRequest,
  TemperatureSweepResponse,
} from '../types/statisticalThermo';

// Fundamental Physical Constants (CODATA 2018 / IUPAC)
export const KB = 1.380649e-23; // J / K
export const PLANCK_H = 6.62607015e-34; // J s
export const AVOGADRO_NA = 6.02214076e23; // mol^-1
export const R_GAS = 8.314462618; // J / (mol K)
export const SPEED_OF_LIGHT_CM_S = 2.99792458e10; // cm / s
export const HC_OVER_KB = (PLANCK_H * SPEED_OF_LIGHT_CM_S) / KB; // ~1.4387769 K cm

export const CURATED_MOLECULES: MoleculeSpec[] = [
  {
    id: 'ar',
    name: 'Argon',
    formula: 'Ar',
    molarMassGMol: 39.948,
    geometry: 'monatomic',
    symmetryNumber: 1,
    rotationalConstantsCm1: [],
    rotationalTemperaturesK: [],
    vibrationalFrequenciesCm1: [],
    electronicDegeneracy: 1,
  },
  {
    id: 'he',
    name: 'Helium',
    formula: 'He',
    molarMassGMol: 4.0026,
    geometry: 'monatomic',
    symmetryNumber: 1,
    rotationalConstantsCm1: [],
    rotationalTemperaturesK: [],
    vibrationalFrequenciesCm1: [],
    electronicDegeneracy: 1,
  },
  {
    id: 'n2',
    name: 'Dinitrogen',
    formula: 'N2',
    molarMassGMol: 28.0134,
    geometry: 'linear',
    symmetryNumber: 2,
    rotationalConstantsCm1: [1.99824],
    rotationalTemperaturesK: [1.99824 * HC_OVER_KB],
    vibrationalFrequenciesCm1: [2358.6],
    electronicDegeneracy: 1,
  },
  {
    id: 'co',
    name: 'Carbon Monoxide',
    formula: 'CO',
    molarMassGMol: 28.0101,
    geometry: 'linear',
    symmetryNumber: 1,
    rotationalConstantsCm1: [1.9225],
    rotationalTemperaturesK: [1.9225 * HC_OVER_KB],
    vibrationalFrequenciesCm1: [2143.2],
    electronicDegeneracy: 1,
  },
  {
    id: 'o2',
    name: 'Dioxygen',
    formula: 'O2',
    molarMassGMol: 31.9988,
    geometry: 'linear',
    symmetryNumber: 2,
    rotationalConstantsCm1: [1.4377],
    rotationalTemperaturesK: [1.4377 * HC_OVER_KB],
    vibrationalFrequenciesCm1: [1556.4],
    electronicDegeneracy: 3,
  },
  {
    id: 'hcl',
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    molarMassGMol: 36.461,
    geometry: 'linear',
    symmetryNumber: 1,
    rotationalConstantsCm1: [10.5934],
    rotationalTemperaturesK: [10.5934 * HC_OVER_KB],
    vibrationalFrequenciesCm1: [2885.9],
    electronicDegeneracy: 1,
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO2',
    molarMassGMol: 44.0095,
    geometry: 'linear',
    symmetryNumber: 2,
    rotationalConstantsCm1: [0.3902],
    rotationalTemperaturesK: [0.3902 * HC_OVER_KB],
    vibrationalFrequenciesCm1: [1333.0, 667.4, 667.4, 2349.2],
    electronicDegeneracy: 1,
  },
  {
    id: 'h2o',
    name: 'Water Vapor',
    formula: 'H2O',
    molarMassGMol: 18.0153,
    geometry: 'non_linear',
    symmetryNumber: 2,
    rotationalConstantsCm1: [27.877, 14.512, 9.285],
    rotationalTemperaturesK: [
      27.877 * HC_OVER_KB,
      14.512 * HC_OVER_KB,
      9.285 * HC_OVER_KB,
    ],
    vibrationalFrequenciesCm1: [3657.0, 1595.0, 3756.0],
    electronicDegeneracy: 1,
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH4',
    molarMassGMol: 16.0425,
    geometry: 'non_linear',
    symmetryNumber: 12,
    rotationalConstantsCm1: [5.2412, 5.2412, 5.2412],
    rotationalTemperaturesK: [
      5.2412 * HC_OVER_KB,
      5.2412 * HC_OVER_KB,
      5.2412 * HC_OVER_KB,
    ],
    vibrationalFrequenciesCm1: [
      2917.0,
      1534.0,
      1534.0,
      3019.0,
      3019.0,
      3019.0,
      1306.0,
      1306.0,
      1306.0,
    ],
    electronicDegeneracy: 1,
  },
];

class StatisticalThermoService {
  private readonly baseUrl = '/api/v1/chemistry/statistical-thermo';

  public getMolecules(): MoleculeSummary[] {
    return CURATED_MOLECULES.map((mol) => ({
      id: mol.id,
      name: mol.name,
      formula: mol.formula,
      geometry: mol.geometry,
      molarMassGMol: mol.molarMassGMol,
      symmetryNumber: mol.symmetryNumber,
      vibrationalModesCount: mol.vibrationalFrequenciesCm1.length,
      rotationalConstantsDisplay:
        mol.rotationalConstantsCm1.length > 0
          ? mol.rotationalConstantsCm1.map((b) => `${b.toFixed(2)} cm⁻¹`).join(', ')
          : 'N/A (monatomic)',
    }));
  }

  public getMolecule(id: string): MoleculeSpec | undefined {
    return CURATED_MOLECULES.find((m) => m.id === id);
  }

  public calculateThermalWavelength(massKg: number, tempK: number): number {
    return PLANCK_H / Math.sqrt(2.0 * Math.PI * massKg * KB * tempK);
  }

  public computePartitionFunctions(
    spec: MoleculeSpec,
    tempK: number,
    pressurePa: number
  ): PartitionFunctionsBreakdown {
    const massKg = (spec.molarMassGMol * 1e-3) / AVOGADRO_NA;
    const lambdaM = this.calculateThermalWavelength(massKg, tempK);
    const volPerMoleculeM3 = (KB * tempK) / pressurePa;
    const qTrans = volPerMoleculeM3 / Math.pow(lambdaM, 3);

    let qRot = 1.0;
    if (spec.geometry === 'linear') {
      const thetaRot =
        spec.rotationalTemperaturesK.length > 0
          ? spec.rotationalTemperaturesK[0]
          : spec.rotationalConstantsCm1[0] * HC_OVER_KB;
      qRot = (tempK / (spec.symmetryNumber * thetaRot)) * (1.0 + thetaRot / (3.0 * tempK));
    } else if (spec.geometry === 'non_linear') {
      const thetas =
        spec.rotationalTemperaturesK.length >= 3
          ? spec.rotationalTemperaturesK
          : spec.rotationalConstantsCm1.map((b) => b * HC_OVER_KB);
      if (thetas.length >= 3) {
        const prodThetas = thetas[0] * thetas[1] * thetas[2];
        qRot = (Math.sqrt(Math.PI) / spec.symmetryNumber) * Math.sqrt(Math.pow(tempK, 3) / prodThetas);
      }
    }

    let qVib = 1.0;
    for (const nu of spec.vibrationalFrequenciesCm1) {
      const thetaVib = nu * HC_OVER_KB;
      const x = thetaVib / tempK;
      if (x < 100.0) {
        qVib *= 1.0 / (1.0 - Math.exp(-x));
      }
    }

    const qElec = spec.electronicDegeneracy;
    const qTotal = qTrans * qRot * qVib * qElec;

    return {
      qTrans,
      qRot,
      qVib,
      qElec,
      qTotal,
      thermalWavelengthPm: lambdaM * 1e12,
    };
  }

  public computeHeatCapacity(
    spec: MoleculeSpec,
    tempK: number
  ): HeatCapacityDecomposition {
    const cvTrans = 1.5 * R_GAS;
    let cvRot = 0.0;
    let eqRot = 0.0;

    if (spec.geometry === 'linear') {
      cvRot = 1.0 * R_GAS;
      eqRot = 1.0 * R_GAS;
    } else if (spec.geometry === 'non_linear') {
      cvRot = 1.5 * R_GAS;
      eqRot = 1.5 * R_GAS;
    }

    let cvVib = 0.0;
    const eqVib = spec.vibrationalFrequenciesCm1.length * R_GAS;
    for (const nu of spec.vibrationalFrequenciesCm1) {
      const thetaVib = nu * HC_OVER_KB;
      const x = thetaVib / tempK;
      if (x < 80.0) {
        const ex = Math.exp(x);
        const term = (x * x * ex) / Math.pow(ex - 1.0, 2);
        cvVib += R_GAS * term;
      }
    }

    const cvTotal = cvTrans + cvRot + cvVib;
    const cpTotal = cvTotal + R_GAS;
    const equipartitionCvLimit = cvTrans + eqRot + eqVib;

    return {
      cvTrans: Number(cvTrans.toFixed(4)),
      cvRot: Number(cvRot.toFixed(4)),
      cvVib: Number(cvVib.toFixed(4)),
      cvElec: 0.0,
      cvTotal: Number(cvTotal.toFixed(4)),
      cpTotal: Number(cpTotal.toFixed(4)),
      equipartitionCvLimit: Number(equipartitionCvLimit.toFixed(4)),
    };
  }

  public computeThermodynamicState(
    spec: MoleculeSpec,
    tempK: number,
    pressurePa: number,
    pf: PartitionFunctionsBreakdown,
    cv: HeatCapacityDecomposition
  ): ThermodynamicState {
    const uTrans = 1.5 * R_GAS * tempK;
    const uRot =
      spec.geometry === 'monatomic'
        ? 0.0
        : spec.geometry === 'linear'
        ? 1.0 * R_GAS * tempK
        : 1.5 * R_GAS * tempK;

    let uVib = 0.0;
    let zpe = 0.0;
    for (const nu of spec.vibrationalFrequenciesCm1) {
      const thetaVib = nu * HC_OVER_KB;
      zpe += 0.5 * R_GAS * thetaVib;
      const x = thetaVib / tempK;
      if (x < 80.0) {
        uVib += (R_GAS * thetaVib) / (Math.exp(x) - 1.0);
      }
    }

    const uThermal = uTrans + uRot + uVib;
    const hThermal = uThermal + R_GAS * tempK;

    const sTrans = R_GAS * (Math.log(pf.qTrans) + 2.5);
    const sRot =
      spec.geometry === 'monatomic'
        ? 0.0
        : spec.geometry === 'linear'
        ? R_GAS * (Math.log(pf.qRot) + 1.0)
        : R_GAS * (Math.log(pf.qRot) + 1.5);

    let sVib = 0.0;
    for (const nu of spec.vibrationalFrequenciesCm1) {
      const thetaVib = nu * HC_OVER_KB;
      const x = thetaVib / tempK;
      if (x < 80.0) {
        const ex = Math.exp(x);
        sVib += R_GAS * (x / (ex - 1.0) - Math.log(1.0 - Math.exp(-x)));
      }
    }

    const sElec = R_GAS * Math.log(pf.qElec);
    const sTotal = sTrans + sRot + sVib + sElec;

    const aFree = uThermal - tempK * sTotal;
    const gThermal = hThermal - tempK * sTotal;

    return {
      temperatureK: tempK,
      pressurePa,
      internalEnergyThermalJMol: Number(uThermal.toFixed(2)),
      zeroPointEnergyJMol: Number(zpe.toFixed(2)),
      enthalpyThermalJMol: Number(hThermal.toFixed(2)),
      entropyStandardJMolK: Number(sTotal.toFixed(3)),
      helmholtzFreeEnergyJMol: Number(aFree.toFixed(2)),
      gibbsFreeEnergyThermalJMol: Number(gThermal.toFixed(2)),
      heatCapacityCvJMolK: cv.cvTotal,
      heatCapacityCpJMolK: cv.cpTotal,
    };
  }

  public calculateLocally(
    request: PartitionFunctionCalculationRequest
  ): PartitionFunctionCalculationResponse {
    let spec = request.customSpec;
    if (!spec && request.moleculeId) {
      spec = this.getMolecule(request.moleculeId);
    }
    if (!spec) {
      throw new Error(`Molecule '${request.moleculeId}' not found.`);
    }

    if (request.temperatureK <= 0.0) {
      throw new Error('Temperature must be positive.');
    }
    if (request.pressurePa <= 0.0) {
      throw new Error('Pressure must be positive.');
    }

    const pf = this.computePartitionFunctions(spec, request.temperatureK, request.pressurePa);
    const cv = this.computeHeatCapacity(spec, request.temperatureK);
    const state = this.computeThermodynamicState(
      spec,
      request.temperatureK,
      request.pressurePa,
      pf,
      cv
    );

    const ratio = cv.equipartitionCvLimit > 0 ? cv.cvTotal / cv.equipartitionCvLimit : 1.0;

    return {
      molecule: {
        id: spec.id,
        name: spec.name,
        formula: spec.formula,
        geometry: spec.geometry,
        molarMassGMol: spec.molarMassGMol,
        symmetryNumber: spec.symmetryNumber,
        vibrationalModesCount: spec.vibrationalFrequenciesCm1.length,
        rotationalConstantsDisplay:
          spec.rotationalConstantsCm1.length > 0
            ? spec.rotationalConstantsCm1.map((b) => `${b.toFixed(2)} cm⁻¹`).join(', ')
            : 'N/A',
      },
      temperatureK: request.temperatureK,
      pressurePa: request.pressurePa,
      partitionFunctions: pf,
      thermodynamicState: state,
      heatCapacity: cv,
      classicalEquipartitionRatio: Number(ratio.toFixed(4)),
      pedagogicalSummary: `Canonical molecular partition functions evaluated for ${spec.name} at T = ${request.temperatureK} K. Cv = ${cv.cvTotal} J/(mol K) (${(ratio * 100).toFixed(1)}% of equipartition limit).`,
    };
  }

  public temperatureSweepLocally(
    request: TemperatureSweepRequest
  ): TemperatureSweepResponse {
    const spec = this.getMolecule(request.moleculeId);
    if (!spec) {
      throw new Error(`Molecule '${request.moleculeId}' not found.`);
    }

    const pressurePa = request.pressurePa || 100000.0;
    const step = (request.tempMaxK - request.tempMinK) / (request.pointsCount - 1);
    const curve: TemperatureCurvePoint[] = [];

    for (let i = 0; i < request.pointsCount; i++) {
      const t = request.tempMinK + i * step;
      const pf = this.computePartitionFunctions(spec, t, pressurePa);
      const cv = this.computeHeatCapacity(spec, t);
      const state = this.computeThermodynamicState(spec, t, pressurePa, pf, cv);
      const frac = cv.equipartitionCvLimit > 0 ? cv.cvTotal / cv.equipartitionCvLimit : 1.0;

      curve.push({
        temperatureK: Number(t.toFixed(1)),
        qTotal: pf.qTotal,
        entropyJMolK: state.entropyStandardJMolK,
        cvJMolK: cv.cvTotal,
        cpJMolK: cv.cpTotal,
        internalEnergyJMol: state.internalEnergyThermalJMol,
        fractionEquipartition: Number(frac.toFixed(4)),
      });
    }

    const vibThetas = spec.vibrationalFrequenciesCm1.map((nu) => nu * HC_OVER_KB);
    const rotThetas =
      spec.rotationalTemperaturesK.length > 0
        ? spec.rotationalTemperaturesK
        : spec.rotationalConstantsCm1.map((b) => b * HC_OVER_KB);

    return {
      moleculeId: spec.id,
      moleculeName: spec.name,
      geometry: spec.geometry,
      equipartitionCvLimit: curve[curve.length - 1].cvJMolK,
      vibrationalTemperaturesK: vibThetas.map((th) => Number(th.toFixed(1))),
      rotationalTemperaturesK: rotThetas.map((th) => Number(th.toFixed(1))),
      curve,
      analysis: `Temperature sweep of ${spec.name} from ${request.tempMinK} K to ${request.tempMaxK} K. Demonstrates vibrational mode excitation and quantum freeze-out.`,
    };
  }

  public async calculate(
    request: PartitionFunctionCalculationRequest
  ): Promise<PartitionFunctionCalculationResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend offline; fall through to local computation
    }
    return this.calculateLocally(request);
  }

  public async temperatureSweep(
    request: TemperatureSweepRequest
  ): Promise<TemperatureSweepResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/temperature-sweep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend offline; fall through
    }
    return this.temperatureSweepLocally(request);
  }
}

export const statisticalThermoService = new StatisticalThermoService();
