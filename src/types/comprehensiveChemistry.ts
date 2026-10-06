// Comprehensive Chemistry Data Contracts for Proton Pages

export interface ComprehensiveIsotope {
  massNumber: number;
  atomicMassU: number;
  relativeAbundance: number; // percentage
  halfLife: string;
  spinParity: string;
  decayMode?: string;
  bindingEnergyMev: number;
  magneticMomentNu: number;
}

export interface SpectralLine {
  wavelengthNm: number;
  intensity: number; // relative 1 - 1000
  airVacuum: 'air' | 'vacuum';
  transitionTerm: string;
}

export interface ElementCompound {
  formula: string;
  name: string;
  oxidationState: number;
  molarMassGmol: number;
  solubilityGper100ml: string;
  primaryUse: string;
}

export interface ComprehensiveElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f';
  electronConfiguration: string;
  electronegativityPauling: number;
  electronegativityAllen: number;
  ionizationEnergiesKjMol: number[];
  oxidationStates: number[];
  covalentRadiusPm: number;
  vanDerWaalsRadiusPm: number;
  atomicRadiusEmpiricalPm: number;
  meltingPointK: number;
  boilingPointK: number;
  densityGcm3: number;
  heatOfFusionKjMol: number;
  heatOfVaporizationKjMol: number;
  molarHeatCapacityJmolK: number;
  crystalStructure: string;
  spaceGroup: string;
  casNumber: string;
  discoveredYear: number;
  discoverer: string;
  summary: string;
  geochemicalAbundanceCrustMgKg: number;
  geochemicalAbundanceOceanMgL: number;
  safetyGhsCodes: string[];
  safetySignalWord: 'Warning' | 'Danger' | 'None';
  isotopes: ComprehensiveIsotope[];
  spectralLines: SpectralLine[];
  commonCompounds: ElementCompound[];
}

export interface ReactionStoichiometryEntity {
  formula: string;
  name: string;
  state: 's' | 'l' | 'g' | 'aq';
  coefficient: number;
  molarMassGmol: number;
  charge: number;
}

export interface ReactionMechanismStep {
  stepNumber: number;
  description: string;
  intermediateName?: string;
  elementaryEquation: string;
  isRateDeterminingStep: boolean;
  electronMovementType: string;
}

export interface ComprehensiveReaction {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  balancedEquation: string;
  reactants: ReactionStoichiometryEntity[];
  products: ReactionStoichiometryEntity[];
  deltaH0KjMol: number;
  deltaS0JmolK: number;
  deltaG0KjMol: number;
  activationEnergyKjMol: number;
  equilibriumConstantLogK: number;
  rateLawExpression: string;
  temperatureK: number;
  pressureAtm: number;
  solvent: string;
  catalyst?: string;
  mechanismSteps: ReactionMechanismStep[];
  industrialSignificance: string;
  safetyHazards: string[];
  analyticalDetectionMethod: string;
}

export interface Molecule3DAtom {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
  partialCharge: number;
  hybridization: 'sp' | 'sp2' | 'sp3' | 'sp3d' | 'sp3d2' | 'unhybridized';
}

export interface Molecule3DBond {
  source: string;
  target: string;
  order: 1 | 2 | 3 | 1.5;
  distanceAngstrom: number;
}

export interface MoleculeIrBand {
  wavenumberCm1: number;
  mode: string;
  intensity: 'weak' | 'medium' | 'strong' | 'broad';
}

export interface ComprehensiveMolecule {
  id: string;
  name: string;
  iupacName: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  inchi: string;
  casNumber: string;
  category: string;
  logP: number;
  tpsaA2: number;
  hBondDonors: number;
  hBondAcceptors: number;
  rotatableBonds: number;
  dipoleMomentDebye: number;
  pKa?: number;
  atoms: Molecule3DAtom[];
  bonds: Molecule3DBond[];
  irAbsorptionBands: MoleculeIrBand[];
  description: string;
  application: string;
}

export interface CurriculumLesson {
  id: string;
  lessonNumber: string;
  title: string;
  durationMinutes: number;
  summary: string;
  theoryContent: string[];
  keyEquations: string[];
  learningObjectives: string[];
  checkpointQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export interface ComprehensiveCourse {
  id: string;
  code: string;
  title: string;
  level: 'Introductory' | 'Intermediate' | 'Advanced' | 'Graduate';
  instructor: string;
  institution: string;
  creditHours: number;
  prerequisites: string[];
  description: string;
  modules: CurriculumModule[];
}

export interface ComprehensiveQuestionOption {
  id: string;
  text: string;
  rationale: string;
  isCorrect: boolean;
}

export interface ComprehensiveQuestion {
  id: string;
  courseCode: string;
  moduleTitle: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Olympiad';
  points: number;
  prompt: string;
  contextScenario?: string;
  equationOrDiagram?: string;
  options: ComprehensiveQuestionOption[];
  hint: string;
  detailedStepByStepSolution: string;
  curriculumStandard: 'ACS General Chemistry' | 'ACS Organic Chemistry' | 'IChO' | 'AP Chemistry' | 'MCAT Chemical Foundations';
}
