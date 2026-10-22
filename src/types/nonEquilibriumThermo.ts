/**
 * TypeScript domain types and interfaces for Non-Equilibrium Thermodynamics & Onsager Reciprocal Relations (PR #044).
 */

export interface TransportMatrix {
  dimension: number;
  labels: string[];
  matrixL: number[][];
  isSymmetric: boolean;
  asymmetryNorm: number;
  eigenvalues: number[];
  isPositiveSemidefinite: boolean;
  determinant: number;
  couplingFactorQ?: number | null;
}

export interface EntropyProductionResult {
  fluxes: number[];
  forces: number[];
  entropyProductionWM3K: number;
  dissipationRateWM3: number;
  isPhysicallyAdmissible: boolean;
  secondLawSatisfied: boolean;
  validationMessage: string;
}

export interface BenchmarkSystemSummary {
  id: string;
  name: string;
  category: 'thermoelectric' | 'thermodiffusion' | 'electrokinetic' | 'custom';
  description: string;
  fluxLabels: string[];
  forceLabels: string[];
  defaultForces: number[];
}

export interface TransportCouplingRequest {
  matrixL: number[][];
  drivingForces: number[];
  temperatureK: number;
  forceLabels?: string[];
  fluxLabels?: string[];
}

export interface TransportCouplingResponse {
  temperatureK: number;
  transportMatrix: TransportMatrix;
  entropyProduction: EntropyProductionResult;
  pedagogicalSummary: string;
}

export interface ThermoelectricSystem {
  materialName: string;
  temperatureK: number;
  electricalConductivitySM: number;
  seebeckCoefficientUvK: number;
  thermalConductivityWMK: number;
  peltierCoefficientMv: number;
  kelvinRelationPredictedPeltierMv: number;
  kelvinRelationResidualPct: number;
  figureOfMeritZt: number;
  thomsonCoefficientUvK?: number | null;
}

export interface ThermoelectricAnalysisRequest {
  materialId?: string;
  temperatureK: number;
  electricalConductivitySM?: number;
  seebeckCoefficientUvK?: number;
  thermalConductivityWMK?: number;
  voltageGradientVM: number;
  temperatureGradientKM: number;
}

export interface ThermoelectricAnalysisResponse {
  materialName: string;
  temperatureK: number;
  system: ThermoelectricSystem;
  currentDensityAM2: number;
  heatFluxWM2: number;
  entropyProductionWM3K: number;
  secondKelvinLawVerified: boolean;
  explanation: string;
}

export interface ElectrokineticSystem {
  mediumName: string;
  hydraulicPermeanceL11: number;
  electricalConductanceL22: number;
  crossCoefficientL12: number;
  crossCoefficientL21: number;
  electroosmoticVelocityPerVolt: number;
  streamingPotentialPerBar: number;
  saxenReciprocityVerified: boolean;
  saxenRelativeErrorPct: number;
}

export interface ElectrokineticAnalysisRequest {
  mediumId?: string;
  pressureDropKpa: number;
  voltageDifferenceV: number;
  hydraulicPermeance?: number;
  electricalConductance?: number;
  crossCouplingCoeff?: number;
}

export interface ElectrokineticAnalysisResponse {
  mediumName: string;
  system: ElectrokineticSystem;
  volumeFlowRateM3S: number;
  electricCurrentA: number;
  entropyProductionWK: number;
  saxenReciprocityHolds: boolean;
  explanation: string;
}

export interface ThermodiffusionSystem {
  mixtureName: string;
  temperatureK: number;
  massDiffusionCoeffM2S: number;
  thermalConductivityWMK: number;
  soretCoefficientKInv: number;
  thermalDiffusionCoeffM2SK: number;
  dufourHeatFluxRatio: number;
  onsagerCrossCouplingRatio: number;
}

export interface ThermodiffusionAnalysisRequest {
  mixtureId?: string;
  temperatureK: number;
  massDiffusionCoeffM2S?: number;
  thermalConductivityWMK?: number;
  soretCoefficientKInv?: number;
  temperatureGradientKM: number;
  massFractionGradientMInv: number;
  massFractionSolute?: number;
}

export interface ThermodiffusionAnalysisResponse {
  mixtureName: string;
  temperatureK: number;
  system: ThermodiffusionSystem;
  matterFluxKgM2S: number;
  heatFluxWM2: number;
  entropyProductionWM3K: number;
  steadyStateSeparationPct: number;
  onsagerReciprocityVerified: boolean;
  explanation: string;
}

export interface CuratedThermoelectricMaterial {
  id: string;
  name: string;
  sigmaSM: number;
  seebeckUvK: number;
  kappaWMK: number;
  optimalTK: number;
  description: string;
}

export interface CuratedElectrokineticMedium {
  id: string;
  name: string;
  l11M5NS: number;
  l22S: number;
  l12Cross: number;
  l21Cross: number;
  description: string;
}

export interface CuratedThermodiffusionMixture {
  id: string;
  name: string;
  dM2S: number;
  kappaWMK: number;
  soretKInv: number;
  rhoKgM3: number;
  description: string;
}
