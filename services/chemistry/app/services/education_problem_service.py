"""
Service layer for Educational Chemistry Curriculum and Interactive Problem Bank.
Handles grading, dimensional analysis verification, step-by-step partial credit,
and randomized parameter re-calculation.
"""
import math
import random
from typing import List, Dict, Optional, Tuple
from ..models.education_problem import (
    ChemistryProblem,
    ProblemCategory,
    ProblemDifficulty,
    ProblemStep,
    StepSubmission,
    StepVerificationResult,
    ProblemVerificationResponse,
    ProblemVerificationRequest,
)
from ..data.problem_bank import CHEMISTRY_PROBLEM_BANK, find_problem_by_id


class EducationProblemService:
    def __init__(self, problems: Optional[List[ChemistryProblem]] = None):
        self._problems = problems or CHEMISTRY_PROBLEM_BANK

    def list_problems(
        self,
        category: Optional[ProblemCategory] = None,
        difficulty: Optional[ProblemDifficulty] = None,
        search: Optional[str] = None,
        tag: Optional[str] = None,
    ) -> List[ChemistryProblem]:
        results = []
        search_lower = search.lower().strip() if search else None

        for p in self._problems:
            if category and p.category != category:
                continue
            if difficulty and p.difficulty != difficulty:
                continue
            if tag and tag.lower() not in [t.lower() for t in p.tags]:
                continue
            if search_lower:
                match = (
                    search_lower in p.title.lower()
                    or search_lower in p.topic.lower()
                    or search_lower in p.question_markdown.lower()
                )
                if not match:
                    continue
            results.append(p)
        return results

    def get_problem(self, problem_id: str) -> Optional[ChemistryProblem]:
        for p in self._problems:
            if p.id == problem_id:
                return p
        return None

    def verify_submission(
        self, request: ProblemVerificationRequest
    ) -> ProblemVerificationResponse:
        problem = self.get_problem(request.problem_id)
        if not problem:
            raise ValueError(f"Problem with ID '{request.problem_id}' not found.")

        # Evaluate final answer error
        expected_final = problem.reference_value
        student_final = request.final_answer

        error_pct = (
            abs(student_final - expected_final) / abs(expected_final) * 100.0
            if expected_final != 0
            else abs(student_final) * 100.0
        )

        # Allow 3.0% tolerance on final numeric answer
        final_correct = (
            error_pct <= 3.0 and self._check_unit_compatibility(request.final_unit, problem.reference_unit)
        )

        # Evaluate steps
        step_results: List[StepVerificationResult] = []
        total_step_score = 0.0
        max_step_score = len(problem.steps) * 10.0 if problem.steps else 10.0

        for step in problem.steps:
            sub = next(
                (s for s in request.step_submissions if s.step_number == step.step_number),
                None,
            )
            if sub:
                val = sub.submitted_value
                exp = step.expected_value
                s_err = (
                    abs(val - exp) / abs(exp) * 100.0 if exp != 0 else abs(val) * 100.0
                )
                unit_ok = self._check_unit_compatibility(sub.submitted_unit, step.unit)
                is_ok = s_err <= step.tolerance_percent and unit_ok

                if is_ok:
                    total_step_score += 10.0
                    fb = f"Correct. {step.explanation}"
                else:
                    if not unit_ok:
                        fb = f"Unit mismatch: expected '{step.unit}', got '{sub.submitted_unit}'."
                    else:
                        fb = f"Deviation {s_err:.2f}% exceeds tolerance (+/- {step.tolerance_percent}%). Expected ~{exp}."

                step_results.append(
                    StepVerificationResult(
                        step_number=step.step_number,
                        is_correct=is_ok,
                        submitted_value=val,
                        expected_value=exp,
                        submitted_unit=sub.submitted_unit,
                        expected_unit=step.unit,
                        error_percentage=round(s_err, 2),
                        feedback=fb,
                    )
                )
            else:
                step_results.append(
                    StepVerificationResult(
                        step_number=step.step_number,
                        is_correct=False,
                        submitted_value=0.0,
                        expected_value=step.expected_value,
                        submitted_unit="",
                        expected_unit=step.unit,
                        error_percentage=100.0,
                        feedback="Step was not submitted.",
                    )
                )

        # Calculate base score from final + steps
        step_factor = total_step_score / max_step_score if max_step_score > 0 else 1.0
        base_score = (50.0 if final_correct else 0.0) + (50.0 * step_factor)

        # Apply hint penalty deductions
        penalty = 0.0
        for tier in request.revealed_hint_tiers:
            hint = next((h for h in problem.hints if h.tier == tier), None)
            if hint:
                penalty += hint.point_penalty

        score_percentage = max(0.0, min(100.0, base_score - penalty))

        # Overall correctness
        is_overall_correct = final_correct and (score_percentage >= 70.0)

        # Rubric breakdown
        rubric_scores: Dict[str, float] = {}
        for r in problem.rubric:
            rubric_scores[r.criterion] = round(
                (r.max_points * score_percentage) / 100.0, 1
            )

        feedback_msg = (
            f"Full marks! Your answer {student_final} {request.final_unit} matches reference {expected_final} {problem.reference_unit} (error: {error_pct:.2f}%)."
            if final_correct
            else f"Your final answer {student_final} {request.final_unit} deviates by {error_pct:.2f}% from expected {expected_final} {problem.reference_unit}."
        )

        worked_solution = self._generate_worked_solution(problem)

        return ProblemVerificationResponse(
            problem_id=problem.id,
            is_correct=is_overall_correct,
            score_percentage=round(score_percentage, 1),
            error_percentage=round(error_pct, 2),
            feedback=feedback_msg,
            step_results=step_results,
            worked_solution_markdown=worked_solution,
            detailed_rubric_scores=rubric_scores,
        )

    def generate_randomized_problem(
        self, problem_id: str
    ) -> Tuple[ChemistryProblem, Dict[str, float]]:
        """
        Creates a new randomized instance of a problem by altering given input variables
        within +/- 20% and recalculating exact reference values and step targets.
        """
        base = self.get_problem(problem_id)
        if not base:
            raise ValueError(f"Problem {problem_id} not found.")

        # Clone and vary variables
        rand_vars = dict(base.given_variables)

        if problem_id == "prob-phys-001":
            # Vary P2 between 40.0 and 55.0 kPa, T2 between 325 and 340 K
            p2 = round(random.uniform(40.0, 55.0), 1)
            t2 = round(random.uniform(328.15, 338.15), 2)
            p1 = 5.85
            t1 = 293.15
            r = 8.314462
            rand_vars["P2_kpa"] = p2
            rand_vars["T2_kelvin"] = t2

            ln_p = math.log(p2 / p1)
            inv_t = (1.0 / t2) - (1.0 / t1)
            delta_h_j = -r * ln_p / inv_t
            delta_h_kj = round(delta_h_j / 1000.0, 2)

            new_steps = [
                ProblemStep(
                    step_number=1,
                    instruction="Compute the natural logarithm of the vapor pressure ratio ln(P2 / P1).",
                    target_quantity="ln_P_ratio",
                    expected_formula=f"ln({p2} / {p1})",
                    explanation="Vapor pressure ratio logarithm.",
                    expected_value=round(ln_p, 4),
                    tolerance_percent=1.0,
                    unit="dimensionless",
                ),
                ProblemStep(
                    step_number=2,
                    instruction="Compute the inverse temperature difference (1/T2 - 1/T1) in K^-1.",
                    target_quantity="inv_T_diff",
                    expected_formula=f"1/{t2} - 1/{t1}",
                    explanation="Inverse temperature difference.",
                    expected_value=round(inv_t, 8),
                    tolerance_percent=1.0,
                    unit="K^-1",
                ),
                ProblemStep(
                    step_number=3,
                    instruction="Calculate Delta H_vap in J/mol.",
                    target_quantity="delta_h_joules",
                    expected_formula=f"-{r} * {ln_p:.4f} / ({inv_t:.8f})",
                    explanation="Clausius-Clapeyron enthalpy.",
                    expected_value=round(delta_h_j, 1),
                    tolerance_percent=2.0,
                    unit="J/mol",
                ),
                ProblemStep(
                    step_number=4,
                    instruction="Convert Delta H_vap to kJ/mol.",
                    target_quantity="delta_h_kj",
                    expected_formula="Delta H / 1000.0",
                    explanation="kJ/mol conversion.",
                    expected_value=delta_h_kj,
                    tolerance_percent=2.0,
                    unit="kJ/mol",
                ),
            ]

            randomized_p = ChemistryProblem(
                id=f"{base.id}-rand",
                title=f"{base.title} (Randomized)",
                category=base.category,
                difficulty=base.difficulty,
                topic=base.topic,
                question_markdown=(
                    f"The vapor pressure of liquid ethanol was measured experimentally:\n"
                    f"- At $T_1 = {t1}\\text{{ K}}$, $P_1 = {p1}\\text{{ kPa}}$\n"
                    f"- At $T_2 = {t2}\\text{{ K}}$, $P_2 = {p2}\\text{{ kPa}}$\n\n"
                    f"Calculate $\\Delta H_{{vap}}^\\circ$ in $\\text{{kJ/mol}}$."
                ),
                formula_latex=base.formula_latex,
                given_variables=rand_vars,
                steps=new_steps,
                hints=base.hints,
                reference_value=delta_h_kj,
                reference_unit="kJ/mol",
                significant_figures=3,
                rubric=base.rubric,
                tags=base.tags,
            )
            return randomized_p, rand_vars

        # Default fallback returns original
        return base, rand_vars

    def _check_unit_compatibility(self, submitted: str, expected: str) -> bool:
        """Normalized unit equivalence checker"""
        if not expected or expected == "dimensionless":
            return True
        s = (
            submitted.lower()
            .replace(" ", "")
            .replace("^", "")
            .replace("/", "per")
            .replace("*", "")
        )
        e = (
            expected.lower()
            .replace(" ", "")
            .replace("^", "")
            .replace("/", "per")
            .replace("*", "")
        )
        return s == e or s in e or e in s

    def _generate_worked_solution(self, problem: ChemistryProblem) -> str:
        lines = [
            f"### Worked Analytical Solution: {problem.title}\n",
            f"**Governing Equation**:\n$${problem.formula_latex}$$\n",
            "**Step-by-step Derivation**:\n",
        ]
        for step in problem.steps:
            lines.append(
                f"{step.step_number}. **{step.instruction}**\n"
                f"   - Formula: `{step.expected_formula}`\n"
                f"   - Value: `{step.expected_value} {step.unit}`\n"
                f"   - Detail: {step.explanation}\n"
            )
        lines.append(
            f"\n**Final Answer**: **`{problem.reference_value} {problem.reference_unit}`**"
        )
        return "\n".join(lines)
