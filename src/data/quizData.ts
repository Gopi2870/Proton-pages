import { QuizAssessment } from '../types/learning';

export const QUIZ_ASSESSMENT_DATA: QuizAssessment = {
  id: 'quiz-sn2-mechanisms',
  title: 'Midterm Assessment: Reaction Mechanisms & Stereochemistry',
  courseCode: 'CHEM 204',
  totalQuestions: 12,
  timeRemainingSeconds: 2450, // 40m 50s
  currentQuestionIndex: 5, // Q6
  answeredQuestions: {
    'q-1': 'opt-1-b',
    'q-2': 'opt-2-a',
    'q-3': 'opt-3-c',
    'q-4': 'opt-4-b',
    'q-5': 'opt-5-d',
  },
  questions: [
    {
      id: 'q-1',
      number: 1,
      topic: 'Hybridization',
      subtopic: 'Orbital Geometry',
      difficulty: 'Easy',
      points: 5,
      prompt: 'What is the hybridization and bond angle around the carbonyl carbon in acetone (CH₃COCH₃)?',
      mechanismTitle: 'Carbonyl Geometry',
      solvent: 'Gas Phase',
      temperature: '298 K',
      options: [
        { id: 'opt-1-a', label: 'sp³, 109.5°', nomenclature: 'Tetrahedral geometry', rationale: 'Incorrect; the carbonyl carbon has three σ bonds and one π bond.', isCorrect: false },
        { id: 'opt-1-b', label: 'sp², 120°', nomenclature: 'Trigonal planar geometry', rationale: 'Correct; carbonyl carbons are sp² hybridized with ~120° bond angles.', isCorrect: true },
        { id: 'opt-1-c', label: 'sp, 180°', nomenclature: 'Linear geometry', rationale: 'Incorrect; only alkynes or cumulenes have sp carbon atoms.', isCorrect: false }
      ],
      hint: 'Count the number of electron domains (bonding domains + nonbonding domains) around the central carbon.'
    },
    {
      id: 'q-2',
      number: 2,
      topic: 'Conformations',
      subtopic: 'Cyclohexane Chair',
      difficulty: 'Medium',
      points: 8,
      prompt: 'In trans-1,4-dimethylcyclohexane, which conformation possesses the lowest ground state conformational energy?',
      mechanismTitle: 'Cyclohexane Ring Conformations',
      solvent: 'Neat',
      temperature: '298 K',
      options: [
        { id: 'opt-2-a', label: 'Diequatorial (1e, 4e)', nomenclature: 'Equatorial chair conformer', rationale: 'Correct; both methyl substituents avoid 1,3-diaxial steric clash.', isCorrect: true },
        { id: 'opt-2-b', label: 'Diaxial (1a, 4a)', nomenclature: 'Axial chair conformer', rationale: 'Incorrect; suffers two sets of syn-1,3-diaxial repulsions (~7.1 kJ/mol strain).', isCorrect: false },
        { id: 'opt-2-c', label: 'Twist-boat', nomenclature: 'Non-chair conformer', rationale: 'Incorrect; twist-boat conformers have substantial torsional and flagpole strain.', isCorrect: false }
      ],
      hint: 'Bulky substituents have strongly negative A-values favoring equatorial positions.'
    },
    {
      id: 'q-3',
      number: 3,
      topic: 'Thermodynamics',
      subtopic: 'Gibbs Free Energy',
      difficulty: 'Medium',
      points: 8,
      prompt: 'For an endothermic reaction (ΔH > 0) with positive entropy change (ΔS > 0), under what thermal conditions will the process become spontaneous (ΔG < 0)?',
      mechanismTitle: 'Spontaneity & Equilibrium',
      solvent: 'Aqueous',
      temperature: 'Variable',
      options: [
        { id: 'opt-3-a', label: 'Spontaneous at all temperatures', nomenclature: 'Exergonic domain', rationale: 'Incorrect; requires ΔH < 0 and ΔS > 0 for all-temperature spontaneity.', isCorrect: false },
        { id: 'opt-3-b', label: 'Spontaneous only at low temperatures', nomenclature: 'Enthalpy-driven', rationale: 'Incorrect; low temperatures minimize the favorable TΔS term.', isCorrect: false },
        { id: 'opt-3-c', label: 'Spontaneous only at high temperatures (T > ΔH/ΔS)', nomenclature: 'Entropy-driven spontaneity', rationale: 'Correct; when T > ΔH/ΔS, the -TΔS term outweighs positive ΔH.', isCorrect: true }
      ],
      hint: 'Use the fundamental relation ΔG = ΔH - TΔS and solve for ΔG < 0.'
    },
    {
      id: 'q-4',
      number: 4,
      topic: 'Acids & Bases',
      subtopic: 'pKa & Conjugate Stability',
      difficulty: 'Medium',
      points: 8,
      prompt: 'Why is trichloroacetic acid (pKa = 0.65) significantly more acidic than acetic acid (pKa = 4.76)?',
      mechanismTitle: 'Inductive Electron Withdrawal',
      solvent: 'Aqueous',
      temperature: '298 K',
      options: [
        { id: 'opt-4-a', label: 'Steric inhibition of resonance', nomenclature: 'Steric effect', rationale: 'Incorrect; the chlorine atoms do not restrict carboxylate planarity.', isCorrect: false },
        { id: 'opt-4-b', label: 'Strong inductive electron withdrawal by three electronegative Cl atoms', nomenclature: '-I Inductive stabilization of conjugate base', rationale: 'Correct; electronegative chlorines disperse negative charge on the carboxylate anion.', isCorrect: true },
        { id: 'opt-4-c', label: 'Hyperconjugation with adjacent C-H bonds', nomenclature: 'Orbital donation', rationale: 'Incorrect; trichloroacetic acid lacks alpha C-H bonds.', isCorrect: false }
      ],
      hint: 'Consider how electronegative halogens stabilize the conjugate base conjugate anion.'
    },
    {
      id: 'q-5',
      number: 5,
      topic: 'Stereochemistry',
      subtopic: 'Optical Rotation',
      difficulty: 'Medium-High',
      points: 10,
      prompt: 'A sample of chiral 2-butanol has an observed specific rotation [α] = +9.2°. If pure (S)-(+)-2-butanol has [α] = +13.5°, what is the enantiomeric excess (ee) and composition?',
      mechanismTitle: 'Polarimetry & Enantiomeric Excess',
      solvent: 'Ethanol',
      temperature: '293 K',
      options: [
        { id: 'opt-5-a', label: 'ee = 50% (75% S, 25% R)', nomenclature: 'Partial resolution', rationale: 'Incorrect calculation of ee = [α]obs / [α]pure.', isCorrect: false },
        { id: 'opt-5-b', label: 'ee = 60% (80% S, 20% R)', nomenclature: 'Partial resolution', rationale: 'Incorrect calculation.', isCorrect: false },
        { id: 'opt-5-c', label: 'ee = 84% (92% S, 8% R)', nomenclature: 'High purity', rationale: 'Incorrect.', isCorrect: false },
        { id: 'opt-5-d', label: 'ee = 68.1% (84.1% S, 15.9% R)', nomenclature: 'ee = (+9.2 / +13.5) × 100% = 68.1%', rationale: 'Correct; ee = 68.1%. Major enantiomer % = 50 + (68.1 / 2) = 84.1% (S).', isCorrect: true }
      ],
      hint: 'ee = ([α]observed / [α]pure) × 100%, and % major = 50 + (ee / 2).'
    },
    {
      id: 'q-6',
      number: 6,
      topic: 'Reaction Mechanisms',
      subtopic: 'SN2 Bimolecular Nucleophilic Substitution',
      difficulty: 'Medium-High',
      points: 10,
      prompt: 'Consider the bimolecular reaction of (2R)-2-bromobutane with sodium cyanide (NaCN) dissolved in anhydrous dimethyl sulfoxide (DMSO) at 25°C. Predict the stereochemical configuration and IUPAC nomenclature of the primary organic product.',
      mechanismTitle: 'Reaction Pathway & Transition State Geometry',
      solvent: 'DMSO (Polar Aprotic)',
      temperature: 'T = 298.15 K',
      options: [
        {
          id: 'opt-6-a',
          label: 'Option A: (2S)-2-methylbutanenitrile',
          nomenclature: 'Inversion of stereochemistry via backside attack',
          rationale: 'Correct. Cyanide (:C≡N⁻) attacks the chiral carbon strictly from the backside (180° opposite the C-Br bond) through a pentacoordinate trigonal bipyramidal transition state. This produces complete Walden inversion, converting the (2R) configuration into (2S)-2-methylbutanenitrile.',
          isCorrect: true
        },
        {
          id: 'opt-6-b',
          label: 'Option B: (2R)-2-methylbutanenitrile',
          nomenclature: 'Retention of configuration',
          rationale: 'Incorrect. Retention of stereocenter configuration occurs in double-inversion pathways or internal nucleophilic substitutions (SNi), not classical SN2.',
          isCorrect: false
        },
        {
          id: 'opt-6-c',
          label: 'Option C: (±)-2-methylbutanenitrile (Racemic Mixture)',
          nomenclature: 'Complete racemization via planar carbocation',
          rationale: 'Incorrect. Racemization occurs in unimolecular SN1 reactions via planar sp² carbocations, which do not predominate in secondary alkyl halides dissolved in polar aprotic DMSO with strong nucleophile :CN⁻.',
          isCorrect: false
        },
        {
          id: 'opt-6-d',
          label: 'Option D: 2-butene (Zaitsev E2 elimination product)',
          nomenclature: 'Elimination pathway predominant',
          rationale: 'Incorrect. Cyanide is a strong, compact nucleophile with modest basicity (pKa of HCN = 9.2), favoring substitution (SN2) over elimination (E2) on secondary bromides.',
          isCorrect: false
        }
      ],
      hint: 'In polar aprotic solvents (like DMSO), nucleophiles are naked and unencumbered by hydrogen bonding. Backside displacement is concerted and causes Walden inversion.'
    }
  ]
};
