export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f';
  electronConfiguration: string;
  electronegativity?: number;
  density?: number;
  meltingPoint?: number; // Kelvin
  boilingPoint?: number; // Kelvin
  discoveredBy?: string;
  summary: string;
  oxidationStates?: string;
  crystalStructure?: string;
  spectralEmissionColor?: string;
}

export interface MoleculeAtom {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
  formalCharge?: number;
}

export interface MoleculeBond {
  source: string;
  target: string;
  order: 1 | 2 | 3 | 1.5;
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  inchiKey: string;
  category: 'Bioactive' | 'Pharma' | 'Industrial' | 'Neuro' | 'Solvent';
  description: string;
  iupacName: string;
  logP: number;
  hBondDonors: number;
  hBondAcceptors: number;
  rotatableBonds: number;
  polarSurfaceArea: number; // Å²
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
}

export interface ChemicalSpecies {
  formula: string;
  name: string;
  state: 's' | 'l' | 'g' | 'aq';
  coefficient: number;
  molarMass: number;
  colorHex?: string;
}

export interface ChemicalReaction {
  id: string;
  title: string;
  category: 'Redox' | 'Combustion' | 'Synthesis' | 'Acid-Base' | 'Esterification' | 'Precipitation';
  phaseSystem: string;
  description: string;
  rawInput: string;
  balancedEquation: string;
  reactants: ChemicalSpecies[];
  products: ChemicalSpecies[];
  stoichiometryRatio: string;
  deltaH: number; // kJ/mol
  deltaS: number; // J/(mol*K)
  deltaG: number; // kJ/mol
  keq: string;
  conditions: {
    temperature: number; // K
    pressure: number; // atm
    catalyst?: string;
  };
  atomBalance: {
    element: string;
    reactantCount: number;
    productCount: number;
    balanced: boolean;
  }[];
}

export interface LabReagent {
  id: string;
  name: string;
  formula: string;
  concentration: number; // Molarity
  unit: string;
  ph: number;
  color: string;
  colorName: string;
  category: 'Reagents' | 'Glass' | 'Probes' | 'Heat/Stir';
  volumeAvailable: number; // mL
  nfpa: {
    health: number;
    flammability: number;
    instability: number;
    special?: string;
  };
  details: string;
}

export interface TitrationDataPoint {
  volumeAdded: number; // mL
  pH: number;
  conductivity: number; // mS/cm
  temperature: number; // °C
}

export interface TitrationSession {
  titrant: LabReagent;
  analyte: LabReagent;
  indicator: string;
  initialAnalyteVolume: number; // mL
  titrantVolumeAdded: number; // mL
  currentPh: number;
  equivalencePointVolume: number; // mL
  isEndpointReached: boolean;
  stirrerActive: boolean;
  stirrerRpm: number;
  buretteDripRate: number; // drops per second
  dataPoints: TitrationDataPoint[];
}
