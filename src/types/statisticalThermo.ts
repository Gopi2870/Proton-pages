/**
 * TypeScript domain types and interfaces for Statistical Thermodynamics (PR #043).
 */

export type MolecularGeometry = 'monatomic' | 'linear' | 'non_linear';

export interface MoleculeSpec {
  id: string;
  name: string;
  formula: string;
  molarMassGMol: number;
  geometry: MolecularGeometry;
  symmetryNumber: number;
  rotationalConstantsCm1: number[];
  rotationalTemperaturesK: number[];
  vibrationalFrequenciesCm1: number[];
  electronicDegeneracy: number;
  spinOrbitSplitK?: number | null;
  spinOrbitDegeneracy?: number | null;
}

export interface MoleculeSummary {
  id: string;
  name: string;
  formula: string;
  geometry: MolecularGeometry;
  molarMassGMol: number;
  symmetryNumber: number;
  vibrationalModesCount: number;
  rotationalConstantsDisplay: string;
}

export interface PartitionFunctionsBreakdown {
  qTrans: number;
  qRot: number;
  qVib: number;
  qElec: number;
  qTotal: number;
  thermalWavelengthPm: number;
}

export interface HeatCapacityDecomposition {
  cvTrans: number;
  cvRot: number;
  cvVib: number;
  cvElec: number;
  cvTotal: number;
  cpTotal: number;
  equipartitionCvLimit: number;
}

export interface ThermodynamicState {
  temperatureK: number;
  pressurePa: number;
  internalEnergyThermalJMol: number;
  zeroPointEnergyJMol: number;
  enthalpyThermalJMol: number;
  entropyStandardJMolK: number;
  helmholtzFreeEnergyJMol: number;
  gibbsFreeEnergyThermalJMol: number;
  heatCapacityCvJMolK: number;
  heatCapacityCpJMolK: number;
}

export interface TemperatureCurvePoint {
  temperatureK: number;
  qTotal: number;
  entropyJMolK: number;
  cvJMolK: number;
  cpJMolK: number;
  internalEnergyJMol: number;
  fractionEquipartition: number;
}

export interface PartitionFunctionCalculationRequest {
  moleculeId?: string;
  customSpec?: MoleculeSpec;
  temperatureK: number;
  pressurePa: number;
}

export interface PartitionFunctionCalculationResponse {
  molecule: MoleculeSummary;
  temperatureK: number;
  pressurePa: number;
  partitionFunctions: PartitionFunctionsBreakdown;
  thermodynamicState: ThermodynamicState;
  heatCapacity: HeatCapacityDecomposition;
  classicalEquipartitionRatio: number;
  pedagogicalSummary: string;
}

export interface TemperatureSweepRequest {
  moleculeId: string;
  tempMinK: number;
  tempMaxK: number;
  pointsCount: number;
  pressurePa?: number;
}

export interface TemperatureSweepResponse {
  moleculeId: string;
  moleculeName: string;
  geometry: MolecularGeometry;
  equipartitionCvLimit: number;
  vibrationalTemperaturesK: number[];
  rotationalTemperaturesK: number[];
  curve: TemperatureCurvePoint[];
  analysis: string;
}
