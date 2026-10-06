export type FunctionalGroupClass =
  | 'Hydrocarbon'
  | 'Oxygen-Containing'
  | 'Nitrogen-Containing'
  | 'Sulfur-Containing'
  | 'Halogenated'
  | 'Organometallic';

export interface ReactionExample {
  title: string;
  reagents: string;
  reactionType: string;
  equation: string;
  outcome: string;
}

export interface FunctionalGroup {
  id: string;
  name: string;
  formula: string;
  generalStructure: string;
  iupacPrefix: string;
  iupacSuffix: string;
  groupClass: FunctionalGroupClass;
  polarity: 'Non-polar' | 'Moderately Polar' | 'Highly Polar';
  hydrogenBonding: 'Donor and Acceptor' | 'Acceptor Only' | 'None';
  typicalPka?: number;
  characteristicIR: {
    peakCm: string;
    intensity: 'Strong' | 'Medium' | 'Weak' | 'Broad';
    vibrationType: string;
  }[];
  nmrShiftPpm: {
    protonH1?: string;
    carbonC13?: string;
  };
  representativeMolecules: {
    name: string;
    formula: string;
    smiles: string;
    application: string;
  }[];
  keyReactions: ReactionExample[];
  safetyNotes: string;
  biologicalSignificance: string;
}
