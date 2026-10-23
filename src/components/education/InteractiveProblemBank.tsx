import React, { useState, useEffect } from 'react';
import {
  ChemistryProblemSummary,
  ChemistryProblemDetail,
  ProblemVerificationResponse,
  ProblemCategory,
  ProblemDifficulty,
} from '../../types/educationProblem';
import { EducationProblemService, FALLBACK_PROBLEMS } from '../../services/educationProblemService';

export const InteractiveProblemBank: React.FC = () => {
  const [problems, setProblems] = useState<ChemistryProblemSummary[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('prob-phys-001');
  const [currentProblem, setCurrentProblem] = useState<ChemistryProblemDetail>(FALLBACK_PROBLEMS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Student Input State
  const [finalAnswer, setFinalAnswer] = useState<string>('');
  const [finalUnit, setFinalUnit] = useState<string>('');
  const [stepAnswers, setStepAnswers] = useState<Record<number, string>>({});
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [verificationResult, setVerificationResult] = useState<ProblemVerificationResponse | null>(null);

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    if (selectedProblemId) {
      loadProblemDetail(selectedProblemId);
    }
  }, [selectedProblemId]);

  const loadProblems = async () => {
    setLoading(true);
    try {
      const list = await EducationProblemService.fetchProblemList();
      setProblems(list);
    } finally {
      setLoading(false);
    }
  };

  const loadProblemDetail = async (id: string) => {
    setLoading(true);
    try {
      const detail = await EducationProblemService.fetchProblemDetail(id);
      setCurrentProblem(detail);
      setFinalAnswer('');
      setFinalUnit(detail.reference_unit);
      setStepAnswers({});
      setRevealedHints([]);
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRevealHint = (tier: number) => {
    if (!revealedHints.includes(tier)) {
      setRevealedHints([...revealedHints, tier]);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const numAnswer = parseFloat(finalAnswer);
      if (isNaN(numAnswer)) {
        alert('Please enter a valid numeric final answer.');
        return;
      }

      const stepSubs = currentProblem.steps.map((s) => ({
        step_number: s.step_number,
        submitted_value: parseFloat(stepAnswers[s.step_number] || '0'),
        submitted_unit: s.unit,
      }));

      const res = await EducationProblemService.verifySolution(currentProblem.id, {
        final_answer: numAnswer,
        final_unit: finalUnit || currentProblem.reference_unit,
        step_submissions: stepSubs,
        revealed_hint_tiers: revealedHints,
      });
      setVerificationResult(res);
    } finally {
      setVerifying(false);
    }
  };

  const categories = [
    'All',
    'Physical Chemistry',
    'Reaction Kinetics & Catalysis',
    'Electrochemistry & Redox Systems',
    'Inorganic & Coordination Chemistry',
    'Quantum Chemistry & Molecular Orbitals',
    'Analytical Chemistry & Spectroscopy',
  ];

  const filteredProblems = problems.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(s) ||
        p.topic.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
            <span className="material-symbols-outlined text-[20px]">school</span>
            Curriculum Problem Bank & Olympiad Assessment
          </div>
          <h2 className="text-2xl font-bold text-on-surface">
            Multi-Disciplinary Interactive Chemistry Exercises
          </h2>
          <p className="text-on-surface-variant text-sm mt-1 max-w-3xl">
            Authentic physical, analytical, inorganic, and quantum chemistry problem sets with step-by-step
            mathematical derivations, dimensional analysis checks, and automated rubric grading.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface">
            {problems.length} Curated Modules
          </span>
        </div>
      </div>

      {/* Grid Layout: Left Navigator & Right Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigator (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Category Filter */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 space-y-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search topic, equation, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.slice(0, 4).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition whitespace-nowrap ${
                    selectedCategory === c
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {c === 'All' ? 'All Branches' : c.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Problem List Cards */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredProblems.map((p) => {
              const isSelected = p.id === currentProblem.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProblemId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-primary-container/20 border-primary text-on-surface shadow-xs'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-primary">{p.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-outline">
                      {p.reference_unit}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-on-surface line-clamp-1">{p.title}</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">{p.topic}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Problem Solver Workstation (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-6">
            {/* Problem Title & Meta Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-secondary-container/40 text-secondary font-semibold text-xs">
                  {currentProblem.category}
                </span>
                <span className="text-xs text-outline font-medium">{currentProblem.difficulty}</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface">{currentProblem.title}</h3>
              <p className="text-xs text-primary font-medium mt-0.5">{currentProblem.topic}</p>
            </div>

            {/* Question Text Box */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
              <h5 className="text-xs font-semibold text-outline uppercase tracking-wider">Problem Statement</h5>
              <div className="text-xs text-on-surface leading-relaxed whitespace-pre-line font-serif">
                {currentProblem.question_markdown}
              </div>

              {/* LaTeX Formula Highlight */}
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                <span className="text-[11px] text-outline font-mono">Governing Equation:</span>
                <code className="text-xs font-bold text-primary font-mono">{currentProblem.formula_latex}</code>
              </div>
            </div>

            {/* Intermediate Derivation Steps Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">function</span>
                    Step-by-Step Mathematical Derivations
                  </h4>
                  <span className="text-[11px] text-outline">Partial credit awarded per correct step</span>
                </div>

                <div className="space-y-3">
                  {currentProblem.steps.map((step) => {
                    const stepRes = verificationResult?.step_results.find(
                      (r) => r.step_number === step.step_number
                    );
                    return (
                      <div
                        key={step.step_number}
                        className={`p-3.5 rounded-xl border transition ${
                          stepRes
                            ? stepRes.is_correct
                              ? 'bg-emerald-500/5 border-emerald-500/40'
                              : 'bg-rose-500/5 border-rose-500/40'
                            : 'bg-surface-container-low/60 border-outline-variant/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <span className="text-[11px] font-bold text-primary mr-2">
                              Step {step.step_number}:
                            </span>
                            <span className="text-xs text-on-surface font-medium">{step.instruction}</span>
                            <div className="text-[11px] text-outline mt-0.5">
                              Formula guide: <code className="font-mono text-on-surface-variant">{step.expected_formula}</code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              step="any"
                              placeholder="Value"
                              value={stepAnswers[step.step_number] || ''}
                              onChange={(e) =>
                                setStepAnswers({ ...stepAnswers, [step.step_number]: e.target.value })
                              }
                              className="w-28 px-2.5 py-1 bg-surface-container-lowest rounded-md text-xs text-on-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                            />
                            <span className="text-xs text-outline font-mono min-w-[50px]">{step.unit}</span>
                          </div>
                        </div>

                        {stepRes && (
                          <div
                            className={`mt-2 pt-2 border-t text-[11px] flex items-center justify-between ${
                              stepRes.is_correct
                                ? 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                : 'border-rose-500/20 text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            <span>{stepRes.feedback}</span>
                            <span>Δ {stepRes.error_percentage}%</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Final Answer Input & Verification Button */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-on-surface">Final Numerical Answer:</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="e.g. 42.26"
                      value={finalAnswer}
                      onChange={(e) => setFinalAnswer(e.target.value)}
                      className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-sm font-semibold text-on-surface border border-outline-variant/50 focus:outline-none focus:border-primary w-32"
                    />
                    <input
                      type="text"
                      value={finalUnit}
                      onChange={(e) => setFinalUnit(e.target.value)}
                      className="px-2 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-mono text-outline border border-outline-variant/40 w-24 text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={verifying}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary/90 transition shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  {verifying ? 'Evaluating Solution...' : 'Verify Answer & Steps'}
                </button>
              </div>
            </form>

            {/* Hints Accordion */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-amber-500">lightbulb</span>
                Pedagogical Hints & Derivation Aids
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentProblem.hints.map((hint) => {
                  const isRevealed = revealedHints.includes(hint.tier);
                  return (
                    <div
                      key={hint.tier}
                      className={`p-3 rounded-xl border text-xs transition ${
                        isRevealed
                          ? 'bg-amber-500/10 border-amber-500/30 text-on-surface'
                          : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[11px] text-amber-600 dark:text-amber-400">
                          Tier {hint.tier} Hint
                        </span>
                        {hint.point_penalty > 0 && (
                          <span className="text-[10px] text-rose-500">-{hint.point_penalty}% pts</span>
                        )}
                      </div>
                      {isRevealed ? (
                        <p className="text-[11px] leading-relaxed">{hint.hint_text}</p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRevealHint(hint.tier)}
                          className="w-full mt-1 py-1 px-2 rounded bg-surface-container text-[11px] font-semibold text-primary hover:bg-surface-container-high transition"
                        >
                          Reveal Hint
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification Result Card */}
            {verificationResult && (
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  verificationResult.is_correct
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-on-surface'
                    : 'bg-rose-500/10 border-rose-500/40 text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        verificationResult.is_correct ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {verificationResult.is_correct ? 'task_alt' : 'error'}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">
                        {verificationResult.is_correct ? 'Solution Accepted!' : 'Solution Requires Revision'}
                      </h4>
                      <p className="text-xs text-on-surface-variant">{verificationResult.feedback}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">
                      {verificationResult.score_percentage}%
                    </span>
                    <div className="text-[10px] text-outline uppercase font-semibold">Total Score</div>
                  </div>
                </div>

                {/* Rubric Breakdown */}
                <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 space-y-2">
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                    Grading Rubric Assessment
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(verificationResult.detailed_rubric_scores).map(([crit, pts]) => (
                      <div key={crit} className="p-2 rounded-lg bg-surface-container-low text-center">
                        <div className="text-xs font-bold text-on-surface">{pts} pts</div>
                        <div className="text-[10px] text-outline truncate">{crit}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Worked Solution Accordion */}
                <details className="text-xs text-on-surface-variant">
                  <summary className="cursor-pointer font-semibold text-primary hover:underline">
                    View Complete Worked Solution & Derivation
                  </summary>
                  <div className="mt-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono whitespace-pre-line text-on-surface">
                    {verificationResult.worked_solution_markdown}
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
