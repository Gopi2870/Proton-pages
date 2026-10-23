/**
 * TypeScript domain models and interfaces for Photochemistry, Jablonski Diagrams & FRET Dynamics (PR #047).
 */

export interface FluorophoreMolecule {
  id: string;
  name: string;
  category: string;
  formula: string;
  molecularWeight: number;
  absorptionMaxNm: number;
  emissionMaxNm: number;
  extinctionCoefficientMInvCmInv: number;
  radiativeRateKrSInv: number;
  internalConversionRateKicSInv: number;
  intersystemCrossingRateKiscSInv: number;
  phosphorescenceRateKpSInv: number;
  tripletNonRadiativeRateKtnrSInv: number;
  stokesShiftCmInv: number;
  singletEnergyS1Ev: number;
  tripletEnergyT1Ev: number;
  description: string;
}

export interface QuencherMolecule {
  id: string;
  name: string;
  quencherType: string;
  formula: string;
  molecularWeight: number;
  typicalBimolecularKqMInvSInv: number;
  description: string;
}

export interface FretPair {
  id: string;
  name: string;
  donorId: string;
  acceptorId: string;
  forsterDistanceR0Angstrom: number;
  spectralOverlapIntegralJNm4MCm: number;
  dipoleOrientationKappa2: number;
  refractiveIndexN: number;
  description: string;
}

export interface JablonskiEnergyState {
  stateId: string;
  label: string;
  multiplicity: string;
  energyEv: number;
  energyKjMol: number;
  electronicConfiguration: string;
}

export interface PhotophysicalDeexcitationRates {
  radiativeKrSInv: number;
  internalConversionKicSInv: number;
  intersystemCrossingKiscSInv: number;
  totalDecayRateKTotSInv: number;
  fluorescenceLifetimeTau0Ns: number;
  fluorescenceQuantumYieldPhiF: number;
  tripletYieldPhiIsc: number;
  phosphorescenceQuantumYieldPhiP: number;
  phosphorescenceLifetimeTauPMs: number;
}

export interface JablonskiSimulationResponse {
  fluorophore: FluorophoreMolecule;
  states: JablonskiEnergyState[];
  rates: PhotophysicalDeexcitationRates;
  jablonski_summary: string;
}

export interface JablonskiSimulationRequest {
  fluorophore_id: string;
  kr_scaling_factor?: number;
  kic_scaling_factor?: number;
  kisc_scaling_factor?: number;
  temperature_k?: number;
}

export interface SternVolmerPoint {
  quencherConcentrationMM: number;
  fluorescenceIntensityF: number;
  f0OverF: number;
  fluorescenceLifetimeTauNs: number;
}

export interface SternVolmerResult {
  fluorophoreName: string;
  quencherName: string;
  sternVolmerConstantKsvMInv: number;
  bimolecularQuenchingRateKqMInvSInv: number;
  isDiffusionLimited: boolean;
  unquenchedIntensityF0: number;
  unquenchedLifetimeTau0Ns: number;
  points: SternVolmerPoint[];
  regressionRSquared: number;
  explanation: string;
}

export interface SternVolmerResponse {
  result: SternVolmerResult;
}

export interface SternVolmerRequest {
  fluorophore_id: string;
  quencher_id: string;
  max_quencher_conc_mM?: number;
  points_count?: number;
  temperature_k?: number;
}

export interface FretEfficiencyPoint {
  distanceRAngstrom: number;
  fretEfficiency: number;
  relativeDonorFluorescence: number;
  sensitizedAcceptorEmission: number;
}

export interface FretSimulationResult {
  pairName: string;
  donorName: string;
  acceptorName: string;
  forsterDistanceR0Angstrom: number;
  currentDistanceRAngstrom: number;
  efficiencyAtCurrentDistance: number;
  distancePoints: FretEfficiencyPoint[];
  r0ValidationSummary: string;
}

export interface FretSimulationResponse {
  result: FretSimulationResult;
}

export interface FretSimulationRequest {
  fret_pair_id: string;
  current_distance_r_angstrom?: number;
  min_distance_angstrom?: number;
  max_distance_angstrom?: number;
  steps_count?: number;
}

export interface PhotochemistryCatalogResponse {
  fluorophores: FluorophoreMolecule[];
  quenchers: QuencherMolecule[];
  fret_pairs: FretPair[];
}
