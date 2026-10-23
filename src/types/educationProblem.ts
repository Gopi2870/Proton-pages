/**
 * TypeScript types for Educational Chemistry Curriculum and Interactive Problem Bank.
 */

export type ProblemCategory =
  | 'Physical Chemistry'
  | 'Organic Chemistry'
  | 'Inorganic & Coordination Chemistry'
  | 'Analytical Chemistry & Spectroscopy'
  | 'Quantum Chemistry & Molecular Orbitals'
  | 'Chemical Thermodynamics & Equilibrium'
  | 'Reaction Kinetics & Catalysis'
  | 'Electrochemistry & Redox Systems';

export type ProblemDifficulty =
  | 'Introductory (High School / AP)'
  | 'Intermediate (Undergraduate General/Organic)'
  | 'Advanced (Upper-Division Undergraduate)'
  | 'Olympiad / Graduate Level';

export interface ProblemStep {
  step_number: number;
  instruction: string;
  target_quantity: string;
  expected_formula: string;
  explanation: string;
  expected_value: number;
  tolerance_percent: number;
  unit: string;
}

export interface ProblemHint {
  tier: number;
  hint_text: string;
  point_penalty: number;
}

export interface RubricCriterion {
  criterion: string;
  max_points: number;
  description: string;
}

export interface ChemistryProblemSummary {
  id: string;
  title: string;
  category: ProblemCategory;
  difficulty: ProblemDifficulty;
  topic: string;
  reference_unit: string;
  tags: string[];
}

export interface ChemistryProblemDetail extends ChemistryProblemSummary {
  question_markdown: string;
  formula_latex: string;
  given_variables: Record<string, any>;
  steps: ProblemStep[];
  hints: ProblemHint[];
  significant_figures: number;
  rubric: RubricCriterion[];
}

export interface StepSubmission {
  step_number: number;
  submitted_value: number;
  submitted_unit: string;
}

export interface VerifyProblemPayload {
  final_answer: number;
  final_unit: string;
  step_submissions: StepSubmission[];
  revealed_hint_tiers: number[];
}

export interface StepVerificationResult {
  step_number: number;
  is_correct: boolean;
  submitted_value: number;
  expected_value: number;
  submitted_unit: string;
  expected_unit: string;
  error_percentage: number;
  feedback: string;
}

export interface ProblemVerificationResponse {
  problem_id: string;
  is_correct: boolean;
  score_percentage: number;
  error_percentage: number;
  feedback: string;
  step_results: StepVerificationResult[];
  worked_solution_markdown: string;
  detailed_rubric_scores: Record<string, number>;
}

export interface RandomizedProblemInstance {
  problem_id: string;
  title: string;
  category: ProblemCategory;
  difficulty: ProblemDifficulty;
  topic: string;
  question_markdown: string;
  formula_latex: string;
  randomized_variables: Record<string, any>;
  target_unit: string;
  hints: ProblemHint[];
}
