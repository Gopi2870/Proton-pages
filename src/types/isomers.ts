export type IsomerType =
  | 'Constitutional (Chain)'
  | 'Constitutional (Positional)'
  | 'Constitutional (Functional)'
  | 'Stereoisomer (Enantiomer)'
  | 'Stereoisomer (Diastereomer)'
  | 'Geometric (Cis/Trans - E/Z)'
  | 'Conformational (Rotamer)'
  | 'Tautomer';

export interface IsomerPair {
  id: string;
  molecularFormula: string;
  type: IsomerType;
  title: string;
  compoundA: {
    name: string;
    iupac: string;
    smiles: string;
    boilingPointC: number;
    meltingPointC: number;
    densityGml: number;
    specificRotation?: string;
    biologicalActivity?: string;
  };
  compoundB: {
    name: string;
    iupac: string;
    smiles: string;
    boilingPointC: number;
    meltingPointC: number;
    densityGml: number;
    specificRotation?: string;
    biologicalActivity?: string;
  };
  interconversionBarrierKjMol?: number;
  mechanismOfDifferentiation: string;
  educationalTakeaway: string;
  spectroscopyDifference: string;
}
