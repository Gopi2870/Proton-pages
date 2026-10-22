/**
 * Domain types and interfaces for Nuclear Chemistry, Bateman Equations & Radiochemistry (PR #042).
 */

export type DecayMode = 'alpha' | 'beta_minus' | 'beta_plus' | 'gamma' | 'ec' | 'stable';

export type ChainEquilibriumType = 'secular' | 'transient' | 'none';

export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'years';

export interface Radioisotope {
  symbol: string;
  name: string;
  atomicNumber: number;
  massNumber: number;
  halfLifeSeconds?: number | null;
  halfLifeDisplay: string;
  decayConstantSInv: number;
  decayMode: DecayMode;
  daughterIsotope?: string | null;
  branchingRatio: number;
  isStable: boolean;
  energyMev?: number | null;
}

export interface DecayChainPreset {
  id: string;
  name: string;
  category: 'primordial' | 'medical' | 'cosmogenic' | 'actinide';
  description: string;
  isotopes: Radioisotope[];
  defaultTimeHorizonS: number;
  defaultTimeUnit: TimeUnit;
  equilibriumType: ChainEquilibriumType;
}

export interface ChainPresetSummary {
  id: string;
  name: string;
  category: string;
  description: string;
  isotopesCount: number;
  firstNuclide: string;
  stableEndProduct: string;
  equilibriumType: ChainEquilibriumType;
  defaultTimeHorizonDisplay: string;
}

export interface BatemanTrajectoryPoint {
  timeSeconds: number;
  timeDisplay: number;
  populations: Record<string, number>;
  activitiesBq: Record<string, number>;
  totalActivityBq: number;
}

export interface BatemanSimulationRequest {
  chainId?: string;
  customIsotopes?: Radioisotope[];
  initialPopulations?: Record<string, number>;
  timeHorizon: number;
  timeUnit: TimeUnit;
  pointsCount: number;
}

export interface NuclideSummary {
  symbol: string;
  name: string;
  atomicNumber: number;
  massNumber: number;
  halfLifeDisplay: string;
  decayMode: string;
  daughterIsotope?: string | null;
  isStable: boolean;
}

export interface BatemanSimulationResult {
  chainName: string;
  equilibriumType: ChainEquilibriumType;
  timeUnit: TimeUnit;
  isotopes: NuclideSummary[];
  timePointsCount: number;
  trajectory: BatemanTrajectoryPoint[];
  finalPopulations: Record<string, number>;
  finalActivitiesBq: Record<string, number>;
  pedagogicalSummary: string;
}

export interface RadiocarbonDatingRequest {
  fractionModernCarbon?: number;
  measuredDpmPerG?: number;
  useCambridgeHalfLife?: boolean;
}

export interface RadiocarbonDatingResult {
  fractionModernCarbon: number;
  uncalibratedAgeYearsBp: number;
  uncertaintyYears: number;
  halfLifeUsedYears: number;
  decayConstantYrInv: number;
  approximateCalendarEra: string;
  calibrationNotes: string;
  scientificDisclaimer: string;
}
