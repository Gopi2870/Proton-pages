import { ComprehensiveQuestion } from '../types/comprehensiveChemistry';

export const COMPREHENSIVE_QUESTIONS: ComprehensiveQuestion[] = [
  {
    id: 'q-bank-001',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-002',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-003',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-004',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-005',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-006',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-007',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-008',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-009',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-010',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-011',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-012',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-013',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-014',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-015',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-016',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-017',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-018',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-019',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-020',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-021',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-022',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-023',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-024',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-025',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-026',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-027',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-028',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-029',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-030',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-031',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-032',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-033',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-034',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-035',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-036',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-037',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-038',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-039',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-040',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-041',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-042',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-043',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-044',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-045',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-046',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-047',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-048',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-049',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-050',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-051',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-052',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-053',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-054',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-055',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-056',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-057',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-058',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-059',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-060',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-061',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-062',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-063',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-064',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-065',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-066',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-067',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-068',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-069',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-070',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-071',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-072',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-073',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-074',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-075',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-076',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-077',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-078',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-079',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-080',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-081',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-082',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-083',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-084',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-085',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-086',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-087',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-088',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-089',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-090',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-091',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-092',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-093',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-094',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-095',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-096',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-097',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-098',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-099',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-100',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-101',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-102',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-103',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-104',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-105',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-106',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-107',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-108',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-109',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-110',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-111',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-112',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-113',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-114',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-115',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-116',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-117',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-118',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-119',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-120',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-121',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-122',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-123',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-124',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-125',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-126',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-127',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-128',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-129',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-130',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-131',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-132',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-133',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-134',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-135',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-136',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-137',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-138',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-139',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-140',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-141',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-142',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-143',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-144',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-145',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-146',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-147',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-148',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-149',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-150',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-151',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-152',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-153',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-154',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-155',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-156',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-157',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-158',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-159',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-160',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-161',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-162',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-163',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-164',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-165',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-166',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-167',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-168',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-169',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-170',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-171',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-172',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-173',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-174',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-175',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-176',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-177',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-178',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-179',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-180',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-181',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-182',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-183',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-184',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-185',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-186',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-187',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-188',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-189',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-190',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-191',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-192',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-193',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-194',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-195',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-196',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-197',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-198',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-199',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-200',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-201',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-202',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-203',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-204',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-205',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-206',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-207',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-208',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-209',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-210',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-211',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-212',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-213',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-214',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-215',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-216',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-217',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-218',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-219',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-220',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-221',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-222',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-223',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-224',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-225',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-226',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-227',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-228',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-229',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-230',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-231',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-232',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-233',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-234',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-235',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-236',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-237',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-238',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-239',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-240',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-241',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-242',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-243',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-244',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-245',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-246',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-247',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-248',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-249',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-250',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-251',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-252',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-253',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-254',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-255',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-256',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-257',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-258',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-259',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-260',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-261',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-262',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-263',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-264',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-265',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-266',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-267',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-268',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-269',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-270',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-271',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-272',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-273',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-274',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-275',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-276',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-277',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-278',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-279',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-280',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-281',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-282',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-283',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-284',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-285',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-286',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-287',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-288',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-289',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-290',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-291',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-292',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-293',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-294',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-295',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-296',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-297',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-298',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-299',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-300',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-301',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-302',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-303',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-304',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-305',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-306',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 15,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-307',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 20,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-308',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 25,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-309',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 30,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-310',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 10,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-311',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 15,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-312',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 20,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-313',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 25,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-314',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 30,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-315',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 10,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-316',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 15,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-317',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 20,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-318',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Pericyclic [4+2] Cycloadditions & Stereocontrol',
    difficulty: 'Medium',
    points: 25,
    prompt: 'In an experiment evaluating pericyclic [4+2] cycloadditions & stereocontrol, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-319',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Spectroscopy: Infrared & Nuclear Magnetic Resonance',
    difficulty: 'Olympiad',
    points: 30,
    prompt: 'In an experiment evaluating spectroscopy: infrared & nuclear magnetic resonance, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-320',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 3: Analytical Foundations',
    topic: 'Thermodynamic Potentials & Gibbs Free Energy',
    difficulty: 'Hard',
    points: 10,
    prompt: 'In an experiment evaluating thermodynamic potentials & gibbs free energy, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-321',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 4: Analytical Foundations',
    topic: 'Acid-Base Buffers & Polyprotic Speciation',
    difficulty: 'Easy',
    points: 15,
    prompt: 'In an experiment evaluating acid-base buffers & polyprotic speciation, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-322',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 5: Analytical Foundations',
    topic: 'Orbital Hybridization & Molecular Symmetry',
    difficulty: 'Medium',
    points: 20,
    prompt: 'In an experiment evaluating orbital hybridization & molecular symmetry, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-323',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 6: Analytical Foundations',
    topic: 'Reaction Kinetics & Integrated Rate Laws',
    difficulty: 'Olympiad',
    points: 25,
    prompt: 'In an experiment evaluating reaction kinetics & integrated rate laws, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
  {
    id: 'q-bank-324',
    courseCode: 'CHEM 102',
    moduleTitle: 'Module 1: Analytical Foundations',
    topic: 'Electrochemistry & Nernst Equation Models',
    difficulty: 'Hard',
    points: 30,
    prompt: 'In an experiment evaluating electrochemistry & nernst equation models, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS General Chemistry'
  },
  {
    id: 'q-bank-325',
    courseCode: 'CHEM 201',
    moduleTitle: 'Module 2: Analytical Foundations',
    topic: 'Stereochemistry & Optical Chirality',
    difficulty: 'Easy',
    points: 10,
    prompt: 'In an experiment evaluating stereochemistry & optical chirality, a system is maintained under standard state conditions. What is the expected behavior if temperature is increased isothermally by 25 K?',
    contextScenario: 'Consider an endothermic equilibrium process with ΔH° = +45.2 kJ/mol and ΔS° = +112 J/(mol·K).',
    equationOrDiagram: 'ln(K2/K1) = -(ΔH°/R) * (1/T2 - 1/T1)',
    options: [
      {
        id: 'opt-a',
        text: 'The equilibrium constant Keq increases and the reaction shifts toward products.',
        rationale: 'Correct according to the van \'t Hoff equation: for an endothermic process (ΔH > 0), increasing temperature favors product formation.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'The equilibrium constant Keq decreases because thermal disorder destabilizes bonds.',
        rationale: 'Distractor: Thermal disorder is captured by entropy, but ΔH > 0 dictates that Keq must increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'The rate constant decreases due to collision de-excitation.',
        rationale: 'Distractor: The Arrhenius equation indicates that rate constants always increase with temperature.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'The Gibbs free energy becomes more positive, halting the reaction entirely.',
        rationale: 'Distractor: Since ΔG = ΔH - TΔS and ΔS > 0, increasing T causes ΔG to become more negative, increasing spontaneity.',
        isCorrect: false
      }
    ],
    hint: 'Recall the van \'t Hoff relation connecting equilibrium constants to reaction enthalpy and absolute temperature.',
    detailedStepByStepSolution: 'Step 1: Write van \'t Hoff equation. Step 2: Note ΔH° > 0. Step 3: Differentiate ln K with respect to T; d(ln K)/dT = ΔH°/(RT^2) > 0. Therefore K increases monotonically.',
    curriculumStandard: 'ACS Organic Chemistry'
  },
];
