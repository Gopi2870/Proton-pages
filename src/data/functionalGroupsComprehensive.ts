import { FunctionalGroup } from '../types/functionalGroups';

export const COMPREHENSIVE_FUNCTIONAL_GROUPS: FunctionalGroup[] = [
  {
    id: 'fg-01',
    name: 'Alcohol (Series 1)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-02',
    name: 'Aldehyde (Series 1)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-03',
    name: 'Ketone (Series 1)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-04',
    name: 'Carboxylic Acid (Series 1)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-05',
    name: 'Ester (Series 1)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-06',
    name: 'Primary Amine (Series 1)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-07',
    name: 'Alcohol (Series 2)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-08',
    name: 'Aldehyde (Series 2)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-09',
    name: 'Ketone (Series 2)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-10',
    name: 'Carboxylic Acid (Series 2)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-11',
    name: 'Ester (Series 2)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-12',
    name: 'Primary Amine (Series 2)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-13',
    name: 'Alcohol (Series 3)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-14',
    name: 'Aldehyde (Series 3)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-15',
    name: 'Ketone (Series 3)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-16',
    name: 'Carboxylic Acid (Series 3)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-17',
    name: 'Ester (Series 3)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-18',
    name: 'Primary Amine (Series 3)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-19',
    name: 'Alcohol (Series 4)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-20',
    name: 'Aldehyde (Series 4)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-21',
    name: 'Ketone (Series 4)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-22',
    name: 'Carboxylic Acid (Series 4)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-23',
    name: 'Ester (Series 4)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-24',
    name: 'Primary Amine (Series 4)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-25',
    name: 'Alcohol (Series 5)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-26',
    name: 'Aldehyde (Series 5)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-27',
    name: 'Ketone (Series 5)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-28',
    name: 'Carboxylic Acid (Series 5)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-29',
    name: 'Ester (Series 5)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-30',
    name: 'Primary Amine (Series 5)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-31',
    name: 'Alcohol (Series 6)',
    formula: '-OH',
    generalStructure: "R-OH",
    iupacPrefix: 'hydroxy-',
    iupacSuffix: '-ol',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 16,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-32',
    name: 'Aldehyde (Series 6)',
    formula: '-CHO',
    generalStructure: "R-CH=O",
    iupacPrefix: 'formyl-',
    iupacSuffix: '-al',
    groupClass: 'Oxygen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 17,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-33',
    name: 'Ketone (Series 6)',
    formula: '-C(=O)-',
    generalStructure: "R-C(=O)-R'",
    iupacPrefix: 'oxo-',
    iupacSuffix: '-one',
    groupClass: 'Nitrogen-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 19.5,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-34',
    name: 'Carboxylic Acid (Series 6)',
    formula: '-COOH',
    generalStructure: "R-C(=O)OH",
    iupacPrefix: 'carboxy-',
    iupacSuffix: '-oic acid',
    groupClass: 'Sulfur-Containing',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 4.8,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-35',
    name: 'Ester (Series 6)',
    formula: '-COOR',
    generalStructure: "R-C(=O)OR'",
    iupacPrefix: 'alkoxycarbonyl-',
    iupacSuffix: '-oate',
    groupClass: 'Halogenated',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 25,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
  {
    id: 'fg-36',
    name: 'Primary Amine (Series 6)',
    formula: '-NH2',
    generalStructure: "R-NH2",
    iupacPrefix: 'amino-',
    iupacSuffix: '-amine',
    groupClass: 'Hydrocarbon',
    polarity: 'Highly Polar',
    hydrogenBonding: 'Donor and Acceptor',
    typicalPka: 38,
    characteristicIR: [
      { peakCm: '3200 - 3600', intensity: 'Broad', vibrationType: 'O-H / N-H stretching vibration' },
      { peakCm: '1700 - 1750', intensity: 'Strong', vibrationType: 'C=O carbonyl stretching vibration' },
      { peakCm: '1050 - 1150', intensity: 'Medium', vibrationType: 'C-O single bond stretching' }
    ],
    nmrShiftPpm: {
      protonH1: '2.0 - 4.5 ppm (deshielded by electronegative heteroatom)',
      carbonC13: '50 - 80 ppm (sp3 carbon adjacent to heteroatom)'
    },
    representativeMolecules: [
      { name: 'Methanol', formula: 'CH3OH', smiles: 'CO', application: 'Universal solvent and chemical feedstock' },
      { name: 'Acetic Acid', formula: 'CH3COOH', smiles: 'CC(=O)O', application: 'Vinegar component and acetate polymer precursor' },
      { name: 'Ethylamine', formula: 'C2H5NH2', smiles: 'CCN', application: 'Surfactant synthesis and pharmaceutical intermediate' }
    ],
    keyReactions: [
      {
        title: 'Nucleophilic Acyl Substitution',
        reagents: 'Carboxylic acid + Thionyl Chloride (SOCl2)',
        reactionType: 'Acyl Activation',
        equation: 'RCOOH + SOCl2 -> RCOCl + SO2 + HCl',
        outcome: 'Generates highly reactive acyl chloride electrophile.'
      },
      {
        title: 'Mild Selective Oxidation',
        reagents: 'Primary Alcohol + Dess-Martin Periodinane (DMP)',
        reactionType: 'Oxidation',
        equation: 'RCH2OH + DMP -> RCHO + DMP-reduced byproduct',
        outcome: 'Arrests oxidation cleanly at the aldehyde oxidation level without over-oxidizing to acid.'
      }
    ],
    safetyNotes: 'Wear chemical splash goggles and nitrile gloves. Avoid inhalation of organic vapors.',
    biologicalSignificance: 'Found extensively across amino acid side chains, phospholipid headgroups, and metabolic intermediates.'
  },
];
