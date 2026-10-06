export type CarbonAllotropeType =
  | 'Allotrope'
  | 'Aromatic Hydrocarbon'
  | 'Cycloalkane Ring'
  | 'Fullerene / Nanocarbon'
  | 'Polycyclic Aromatic (PAH)';

export interface CarbonStructure {
  id: string;
  name: string;
  formula: string;
  type: CarbonAllotropeType;
  hybridization: 'sp³' | 'sp²' | 'sp' | 'Mixed sp²/sp³';
  geometry: string;
  cCBondLengthPm: number;
  cCBondEnergyKjMol: number;
  electricalConductivity: 'Insulator' | 'Semiconductor' | 'Semimetal' | 'Conductor' | 'Superconductor (doped)';
  thermalConductivityWmK: number;
  hardnessMohs?: number;
  bandGapEv?: number;
  applications: string[];
  description: string;
  synthesisOrOccurrence: string;
  delocalizationDescription?: string;
  resonanceEnergyKcalMol?: number;
}
