/**
 * TypeScript domain models and interfaces for Supramolecular Chemistry & Host-Guest Complexation (PR #045).
 */

export interface HostMolecule {
  id: string;
  name: string;
  category: string;
  formula: string;
  molecularWeight: number;
  cavityDiameterAngstrom: number;
  depthAngstrom?: number | null;
  donorSites: number;
  donorAtomType: string;
  description: string;
}

export interface GuestMolecule {
  id: string;
  name: string;
  category: string;
  formula: string;
  molecularWeight: number;
  effectiveRadiusAngstrom: number;
  charge: number;
  description: string;
}

export interface JobPlotPoint {
  moleFractionGuest: number;
  hostConcMM: number;
  guestConcMM: number;
  complexConcMM: number;
  signalIntensity: number;
}

export interface JobPlotResult {
  hostName: string;
  guestName: string;
  totalConcentrationMM: number;
  peakMoleFraction: number;
  determinedStoichiometry: string;
  points: JobPlotPoint[];
  theoretical1To1Peak: number;
  explanation: string;
}

export interface BindingIsothermPoint {
  guestTotalMM: number;
  freeHostMM: number;
  freeGuestMM: number;
  boundComplexMM: number;
  fractionBound: number;
  relativeSpectroscopicSignal: number;
}

export interface NonCovalentDecomposition {
  ionDipoleElectrostaticKjMol: number;
  hydrogenBondingKjMol: number;
  piPiStackingKjMol: number;
  hydrophobicDesolvationKjMol: number;
  stericCavityFitPenaltyKjMol: number;
  totalInteractionEnergyKjMol: number;
  cavitySizeMatchRatio: number;
}

export interface HostGuestComplexSystem {
  host: HostMolecule;
  guest: GuestMolecule;
  associationConstantKaMInv: number;
  logKa: number;
  dissociationConstantKdUM: number;
  gibbsFreeEnergyDeltaGKjMol: number;
  enthalpyDeltaHKjMol: number;
  entropyTermMinusTDeltaSKjMol: number;
  isEnthalpyDriven: boolean;
  isEntropyDriven: boolean;
  decomposition: NonCovalentDecomposition;
  stoichiometry: string;
  isothermPoints: BindingIsothermPoint[];
  pedagogicalSummary: string;
}

export interface JobPlotRequest {
  hostId: string;
  guestId: string;
  totalConcentrationMM: number;
  pointsCount: number;
  temperatureK: number;
}

export interface JobPlotResponse {
  result: JobPlotResult;
}

export interface BindingSimulationRequest {
  hostId: string;
  guestId: string;
  hostInitialConcMM: number;
  guestMaxConcMM: number;
  temperatureK: number;
  titrationSteps: number;
}

export interface BindingSimulationResponse {
  system: HostGuestComplexSystem;
}
