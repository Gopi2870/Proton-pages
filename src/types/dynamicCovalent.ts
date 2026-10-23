/**
 * TypeScript domain models and interfaces for Dynamic Covalent Chemistry & Constitutional Networks (PR #046).
 */

export interface BuildingBlock {
  id: string;
  name: string;
  functionalGroup: string;
  valency: number;
  formula: string;
  molecularWeight: number;
  description: string;
}

export interface DynamicBondMotif {
  id: string;
  name: string;
  reactionType: string;
  forwardEquation: string;
  exchangeEquation: string;
  equilibriumConstantKEq: number;
  exchangeRateConstantKEx: number;
  activationEnergyEaKjMol: number;
  typicalPhOptimum: number;
  catalystRequired?: string | null;
  pedagogicalDescription: string;
}

export interface LibraryMember {
  id: string;
  name: string;
  formula: string;
  molecularWeight: number;
  composition: Record<string, number>;
  topology: string;
  standardFormationGibbsKjMol: number;
  equilibriumFractionUntemplated: number;
  equilibriumFractionTemplated?: number | null;
  amplificationFactor?: number | null;
}

export interface TemplateReceptor {
  id: string;
  name: string;
  templateType: string;
  charge: number;
  ionicRadiusAngstrom?: number | null;
  bindingAffinities: Record<string, number>;
  description: string;
}

export interface DCLSimulationResult {
  motif: DynamicBondMotif;
  temperatureK: number;
  ph: number;
  initialBuildingBlocks: Record<string, number>;
  template?: TemplateReceptor | null;
  templateConcentrationMM: number;
  members: LibraryMember[];
  amplifiedMemberId?: string | null;
  maxAmplificationFactor?: number | null;
  shannonDiversityEntropyUntemplated: number;
  shannonDiversityEntropyTemplated?: number | null;
  equilibriumConverged: boolean;
  iterationsToConvergence: number;
  selectionMechanism: string;
}

export interface DCLCatalogResponse {
  motifs: DynamicBondMotif[];
  buildingBlocks: BuildingBlock[];
  templates: TemplateReceptor[];
}

export interface DCLSimulationResponse {
  result: DCLSimulationResult;
}

export interface DCLSimulationRequest {
  motif_id: string;
  building_block_concs_mM?: Record<string, number>;
  template_id?: string | null;
  template_concentration_mM?: number;
  temperature_k?: number;
  ph?: number;
}

export interface ExchangeKineticsPoint {
  timeSeconds: number;
  speciesConcentrationsMM: Record<string, number>;
}

export interface DynamicExchangeKineticsResult {
  motifName: string;
  halfLifeSeconds: number;
  relaxationTimeTauSeconds: number;
  trajectory: ExchangeKineticsPoint[];
  rateLawDescription: string;
}

export interface ExchangeKineticsResponse {
  result: DynamicExchangeKineticsResult;
}

export interface ExchangeKineticsRequest {
  motif_id: string;
  initial_symmetric_1_mM?: number;
  initial_symmetric_2_mM?: number;
  initial_asymmetric_mM?: number;
  thiol_catalyst_conc_uM?: number;
  temperature_k?: number;
  time_span_seconds?: number;
  steps_count?: number;
}
