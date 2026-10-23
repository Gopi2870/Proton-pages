/**
 * Frontend client service for Educational Chemistry Curriculum and Interactive Problem Bank.
 * Provides live API calls with full client-side offline evaluation engine and fallback problem bank.
 */
import {
  ChemistryProblemSummary,
  ChemistryProblemDetail,
  VerifyProblemPayload,
  ProblemVerificationResponse,
  RandomizedProblemInstance,
  ProblemCategory,
  ProblemDifficulty,
} from '../types/educationProblem';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const FALLBACK_PROBLEMS: ChemistryProblemDetail[] = [
  {
    id: 'prob-phys-001',
    title: 'Enthalpy of Vaporization via Clausius-Clapeyron Relation',
    category: 'Physical Chemistry',
    difficulty: 'Intermediate (Undergraduate General/Organic)',
    topic: 'Phase Equilibria & Vapor Pressure',
    question_markdown:
      'The vapor pressure of liquid ethanol (C2H5OH) was measured experimentally:\n- At T1 = 293.15 K (20°C), P1 = 5.85 kPa\n- At T2 = 333.15 K (60°C), P2 = 47.0 kPa\n\nAssuming constant ΔH_vap and ideal vapor behavior, calculate ΔH_vap in kJ/mol.',
    formula_latex: '\\ln(P_2 / P_1) = -\\frac{\\Delta H_{vap}}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)',
    given_variables: {
      T1_kelvin: 293.15,
      P1_kpa: 5.85,
      T2_kelvin: 333.15,
      P2_kpa: 47.0,
      R_gas_constant: 8.314462,
    },
    steps: [
      {
        step_number: 1,
        instruction: 'Compute the natural logarithm of the vapor pressure ratio ln(P2 / P1).',
        target_quantity: 'ln_P_ratio',
        expected_formula: 'ln(47.0 / 5.85)',
        explanation: 'Ratio of vapor pressures.',
        expected_value: 2.0837,
        tolerance_percent: 1.0,
        unit: 'dimensionless',
      },
      {
        step_number: 2,
        instruction: 'Compute the inverse temperature difference (1/T2 - 1/T1) in K^-1.',
        target_quantity: 'inv_T_diff',
        expected_formula: '1/333.15 - 1/293.15',
        explanation: 'Temperature gradient factor.',
        expected_value: -0.00040995,
        tolerance_percent: 1.0,
        unit: 'K^-1',
      },
      {
        step_number: 3,
        instruction: 'Calculate Delta H_vap in J/mol: -R * ln(P2/P1) / (1/T2 - 1/T1).',
        target_quantity: 'delta_h_joules',
        expected_formula: '-8.314462 * 2.0837 / -0.00040995',
        explanation: 'Integrated two-point Clausius-Clapeyron equation.',
        expected_value: 42261.0,
        tolerance_percent: 2.0,
        unit: 'J/mol',
      },
      {
        step_number: 4,
        instruction: 'Convert Delta H_vap to kJ/mol.',
        target_quantity: 'delta_h_kj',
        expected_formula: '42261.0 / 1000.0',
        explanation: 'Molar enthalpy conversion.',
        expected_value: 42.26,
        tolerance_percent: 2.0,
        unit: 'kJ/mol',
      },
    ],
    hints: [
      { tier: 1, hint_text: 'kPa cancels out cleanly in the ratio P2 / P1.', point_penalty: 0.0 },
      { tier: 2, hint_text: 'ln(P2/P1) = -(ΔH / R) * (1/T2 - 1/T1).', point_penalty: 10.0 },
      { tier: 3, hint_text: 'Remember 1/T2 - 1/T1 is negative; signs cancel to yield positive endothermic ΔH.', point_penalty: 20.0 },
    ],
    reference_unit: 'kJ/mol',
    significant_figures: 3,
    rubric: [
      { criterion: 'Temperature inversion', max_points: 25.0, description: 'Correct conversion to Kelvin and inverse difference.' },
      { criterion: 'Log ratio accuracy', max_points: 25.0, description: 'Evaluation of ln(P2/P1).' },
      { criterion: 'Gas constant R handling', max_points: 25.0, description: 'Use of R = 8.314 J/(mol K).' },
      { criterion: 'Unit conversion to kJ/mol', max_points: 25.0, description: 'Final conversion to kJ/mol.' },
    ],
    tags: ['Thermodynamics', 'Clausius-Clapeyron', 'Vapor Pressure', 'Phase Equilibria'],
  },
  {
    id: 'prob-kin-001',
    title: 'Arrhenius Activation Energy from Two-Temperature Rate Constants',
    category: 'Reaction Kinetics & Catalysis',
    difficulty: 'Intermediate (Undergraduate General/Organic)',
    topic: 'Chemical Kinetics & Transition State Theory',
    question_markdown:
      'The decomposition of acetaldehyde CH3CHO(g) -> CH4(g) + CO(g) exhibits:\n- k1 = 0.105 M^-1 s^-1 at T1 = 700 K\n- k2 = 1.050 M^-1 s^-1 at T2 = 760 K\n\nCalculate the activation energy Ea in kJ/mol.',
    formula_latex: '\\ln(k_2 / k_1) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)',
    given_variables: {
      T1_kelvin: 700.0,
      k1_rate: 0.105,
      T2_kelvin: 760.0,
      k2_rate: 1.050,
      R_gas_constant: 8.314462,
    },
    steps: [
      {
        step_number: 1,
        instruction: 'Calculate the natural logarithm of the rate constant ratio ln(k2 / k1).',
        target_quantity: 'ln_k_ratio',
        expected_formula: 'ln(1.050 / 0.105) = ln(10.0)',
        explanation: 'Ten-fold rate acceleration.',
        expected_value: 2.3026,
        tolerance_percent: 1.0,
        unit: 'dimensionless',
      },
      {
        step_number: 2,
        instruction: 'Compute (1/T1 - 1/T2) in K^-1.',
        target_quantity: 'inv_temp_delta',
        expected_formula: '1/700.0 - 1/760.0',
        explanation: 'Inverse temperature delta.',
        expected_value: 0.00011278,
        tolerance_percent: 1.0,
        unit: 'K^-1',
      },
      {
        step_number: 3,
        instruction: 'Evaluate Ea in J/mol: R * ln(k2 / k1) / (1/T1 - 1/T2).',
        target_quantity: 'ea_joules',
        expected_formula: '8.314462 * 2.3026 / 0.00011278',
        explanation: 'Arrhenius activation energy.',
        expected_value: 169752.0,
        tolerance_percent: 2.0,
        unit: 'J/mol',
      },
      {
        step_number: 4,
        instruction: 'Convert Ea to kJ/mol.',
        target_quantity: 'ea_kj',
        expected_formula: '169752.0 / 1000.0',
        explanation: 'Molar activation energy in kJ/mol.',
        expected_value: 169.75,
        tolerance_percent: 2.0,
        unit: 'kJ/mol',
      },
    ],
    hints: [
      { tier: 1, hint_text: 'k2 / k1 is exactly 10.0, so ln(k2/k1) ≈ 2.303.', point_penalty: 0.0 },
      { tier: 2, hint_text: 'Ea = R * ln(k2/k1) / (1/T1 - 1/T2).', point_penalty: 10.0 },
    ],
    reference_unit: 'kJ/mol',
    significant_figures: 4,
    rubric: [
      { criterion: 'Log ratio calculation', max_points: 25.0, description: 'Evaluation of ln(10).' },
      { criterion: 'Temperature gradient', max_points: 25.0, description: 'Difference 1/T1 - 1/T2.' },
      { criterion: 'Arrhenius equation application', max_points: 30.0, description: 'Substitution with R constant.' },
      { criterion: 'Units and precision', max_points: 20.0, description: 'Conversion to kJ/mol.' },
    ],
    tags: ['Kinetics', 'Arrhenius', 'Activation Energy', 'Rate Constant'],
  },
  {
    id: 'prob-elec-001',
    title: 'Non-Standard Cell Potential via Nernst Equation (Daniell Cell)',
    category: 'Electrochemistry & Redox Systems',
    difficulty: 'Intermediate (Undergraduate General/Organic)',
    topic: 'Electrochemistry & Nernst Equation',
    question_markdown:
      'A galvanic Daniell cell operates at 298.15 K with [Zn2+] = 1.50 M and [Cu2+] = 0.00500 M.\nStandard potentials: E°(Cu2+/Cu) = +0.340 V, E°(Zn2+/Zn) = -0.763 V.\nCalculate the non-standard electromotive force E_cell in Volts.',
    formula_latex: 'E_{cell} = E^\\circ - \\frac{0.05916}{n}\\log_{10}(Q)',
    given_variables: {
      E0_cu: 0.340,
      E0_zn: -0.763,
      zn_conc: 1.50,
      cu_conc: 0.00500,
      n_electrons: 2,
    },
    steps: [
      {
        step_number: 1,
        instruction: 'Calculate standard cell potential E°_cell = E°_cathode - E°_anode.',
        target_quantity: 'e0_cell',
        expected_formula: '0.340 - (-0.763)',
        explanation: 'Standard EMF.',
        expected_value: 1.103,
        tolerance_percent: 0.5,
        unit: 'V',
      },
      {
        step_number: 2,
        instruction: 'Compute reaction quotient Q = [Zn2+] / [Cu2+].',
        target_quantity: 'reaction_quotient_q',
        expected_formula: '1.50 / 0.00500',
        explanation: 'Reaction quotient.',
        expected_value: 300.0,
        tolerance_percent: 0.5,
        unit: 'dimensionless',
      },
      {
        step_number: 3,
        instruction: 'Compute log10(Q).',
        target_quantity: 'log_q',
        expected_formula: 'log10(300.0)',
        explanation: 'Base-10 log of Q.',
        expected_value: 2.4771,
        tolerance_percent: 0.5,
        unit: 'dimensionless',
      },
      {
        step_number: 4,
        instruction: 'Compute Nernst term (0.05916 / 2) * log10(Q) and subtract from E°.',
        target_quantity: 'e_cell_final',
        expected_formula: '1.103 - (0.05916 / 2) * 2.4771',
        explanation: 'Operating cell voltage.',
        expected_value: 1.030,
        tolerance_percent: 1.0,
        unit: 'V',
      },
    ],
    hints: [
      { tier: 1, hint_text: 'Copper is cathode (+0.34 V), Zinc is anode (-0.763 V).', point_penalty: 0.0 },
      { tier: 2, hint_text: 'n = 2 electrons transferred.', point_penalty: 10.0 },
    ],
    reference_unit: 'V',
    significant_figures: 4,
    rubric: [
      { criterion: 'Standard potential E0', max_points: 25.0, description: 'Evaluation of +1.103 V.' },
      { criterion: 'Reaction quotient Q', max_points: 25.0, description: '[Zn2+]/[Cu2+] = 300.' },
      { criterion: 'Nernst setup', max_points: 25.0, description: 'Correct n = 2.' },
      { criterion: 'Final potential', max_points: 25.0, description: 'Accurate subtraction to 1.030 V.' },
    ],
    tags: ['Electrochemistry', 'Nernst Equation', 'Galvanic Cell', 'Daniell Cell'],
  },
];

export class EducationProblemService {
  public static async fetchProblemList(params?: {
    category?: ProblemCategory;
    difficulty?: ProblemDifficulty;
    search?: string;
    tag?: string;
  }): Promise<ChemistryProblemSummary[]> {
    try {
      const q = new URLSearchParams();
      if (params?.category) q.append('category', params.category);
      if (params?.difficulty) q.append('difficulty', params.difficulty);
      if (params?.search) q.append('search', params.search);
      if (params?.tag) q.append('tag', params.tag);

      const res = await fetch(`${API_BASE_URL}/api/v1/education/problems?${q.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    let filtered = [...FALLBACK_PROBLEMS];
    if (params?.category) filtered = filtered.filter((p) => p.category === params.category);
    if (params?.difficulty) filtered = filtered.filter((p) => p.difficulty === params.difficulty);
    if (params?.tag) filtered = filtered.filter((p) => p.tags.includes(params.tag!));
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.topic.toLowerCase().includes(s) ||
          p.question_markdown.toLowerCase().includes(s)
      );
    }

    return filtered.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      difficulty: p.difficulty,
      topic: p.topic,
      reference_unit: p.reference_unit,
      tags: p.tags,
    }));
  }

  public static async fetchProblemDetail(problemId: string): Promise<ChemistryProblemDetail> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/education/problems/${problemId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    const found = FALLBACK_PROBLEMS.find((p) => p.id === problemId);
    if (found) return found;
    return FALLBACK_PROBLEMS[0];
  }

  public static async verifySolution(
    problemId: string,
    payload: VerifyProblemPayload
  ): Promise<ProblemVerificationResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/education/problems/${problemId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    return this.evaluateOffline(problemId, payload);
  }

  private static evaluateOffline(
    problemId: string,
    payload: VerifyProblemPayload
  ): ProblemVerificationResponse {
    const p = FALLBACK_PROBLEMS.find((item) => item.id === problemId) || FALLBACK_PROBLEMS[0];
    const expected = p.steps[p.steps.length - 1].expected_value;
    const student = payload.final_answer;
    const errorPct = expected !== 0 ? (Math.abs(student - expected) / Math.abs(expected)) * 100 : 0;
    const isCorrect = errorPct <= 3.0;

    let stepScore = 0;
    const stepResults = p.steps.map((s) => {
      const sub = payload.step_submissions.find((item) => item.step_number === s.step_number);
      if (sub) {
        const sErr = (Math.abs(sub.submitted_value - s.expected_value) / Math.abs(s.expected_value)) * 100;
        const ok = sErr <= s.tolerance_percent;
        if (ok) stepScore += 10;
        return {
          step_number: s.step_number,
          is_correct: ok,
          submitted_value: sub.submitted_value,
          expected_value: s.expected_value,
          submitted_unit: sub.submitted_unit,
          expected_unit: s.unit,
          error_percentage: Math.round(sErr * 100) / 100,
          feedback: ok ? `Correct. ${s.explanation}` : `Deviates by ${sErr.toFixed(1)}%.`,
        };
      }
      return {
        step_number: s.step_number,
        is_correct: false,
        submitted_value: 0,
        expected_value: s.expected_value,
        submitted_unit: '',
        expected_unit: s.unit,
        error_percentage: 100,
        feedback: 'Step not submitted.',
      };
    });

    const maxSteps = p.steps.length * 10;
    const stepRatio = maxSteps > 0 ? stepScore / maxSteps : 1.0;
    let score = (isCorrect ? 50 : 0) + 50 * stepRatio;

    let penalty = 0;
    payload.revealed_hint_tiers.forEach((t) => {
      const hint = p.hints.find((h) => h.tier === t);
      if (hint) penalty += hint.point_penalty;
    });

    const finalScore = Math.max(0, Math.min(100, score - penalty));
    const rubricScores: Record<string, number> = {};
    p.rubric.forEach((r) => {
      rubricScores[r.criterion] = Math.round(((r.max_points * finalScore) / 100) * 10) / 10;
    });

    return {
      problem_id: p.id,
      is_correct: isCorrect && finalScore >= 70,
      score_percentage: Math.round(finalScore * 10) / 10,
      error_percentage: Math.round(errorPct * 100) / 100,
      feedback: isCorrect
        ? `Full marks! Your answer matches reference ${expected} ${p.reference_unit} (error: ${errorPct.toFixed(2)}%).`
        : `Your answer deviates by ${errorPct.toFixed(2)}% from expected ${expected} ${p.reference_unit}.`,
      step_results: stepResults,
      worked_solution_markdown: `### Worked Analytical Solution: ${p.title}\n\n**Equation**: $${p.formula_latex}$\n\n**Final Answer**: **${expected} ${p.reference_unit}**`,
      detailed_rubric_scores: rubricScores,
    };
  }
}
