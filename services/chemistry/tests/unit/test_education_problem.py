"""
Unit tests for Educational Chemistry Curriculum and Interactive Problem Bank service.
Tests problem listing, filtering, mathematical derivation verification,
step scoring, hint penalty deductions, and parameter randomization.
"""
import pytest
from services.chemistry.app.models.education_problem import (
    ProblemCategory,
    ProblemDifficulty,
    StepSubmission,
    ProblemVerificationRequest,
)
from services.chemistry.app.services.education_problem_service import EducationProblemService
from services.chemistry.app.data.problem_bank import CHEMISTRY_PROBLEM_BANK


@pytest.fixture
def service():
    return EducationProblemService()


def test_list_and_filter_problems(service):
    all_problems = service.list_problems()
    assert len(all_problems) >= 5

    # Filter by category
    phys_problems = service.list_problems(category=ProblemCategory.PHYSICAL)
    assert len(phys_problems) >= 1
    assert all(p.category == ProblemCategory.PHYSICAL for p in phys_problems)

    # Filter by difficulty
    adv_problems = service.list_problems(difficulty=ProblemDifficulty.ADVANCED)
    assert len(adv_problems) >= 2
    assert all(p.difficulty == ProblemDifficulty.ADVANCED for p in adv_problems)

    # Filter by search
    clausius = service.list_problems(search="Clausius")
    assert len(clausius) == 1
    assert "Clausius" in clausius[0].title

    # Filter by tag
    nernst = service.list_problems(tag="Nernst Equation")
    assert len(nernst) == 1
    assert nernst[0].id == "prob-elec-001"


def test_verify_perfect_submission(service):
    # prob-phys-001 reference value is 42.26 kJ/mol
    req = ProblemVerificationRequest(
        problem_id="prob-phys-001",
        final_answer=42.26,
        final_unit="kJ/mol",
        step_submissions=[
            StepSubmission(step_number=1, submitted_value=2.0837, submitted_unit="dimensionless"),
            StepSubmission(step_number=2, submitted_value=-0.00041, submitted_unit="K^-1"),
            StepSubmission(step_number=3, submitted_value=42261.0, submitted_unit="J/mol"),
            StepSubmission(step_number=4, submitted_value=42.26, submitted_unit="kJ/mol"),
        ],
        revealed_hint_tiers=[],
    )
    res = service.verify_submission(req)
    assert res.is_correct is True
    assert res.score_percentage == 100.0
    assert res.error_percentage < 0.1
    assert len(res.step_results) == 4
    assert all(sr.is_correct for sr in res.step_results)
    assert "Worked Analytical Solution" in res.worked_solution_markdown
    assert res.detailed_rubric_scores["Unit conversion to kJ/mol"] == 25.0


def test_verify_submission_with_hint_penalty(service):
    # Student reveals Tier 2 (10% penalty) and Tier 3 (20% penalty)
    req = ProblemVerificationRequest(
        problem_id="prob-phys-001",
        final_answer=42.26,
        final_unit="kJ/mol",
        step_submissions=[
            StepSubmission(step_number=1, submitted_value=2.0837, submitted_unit="dimensionless"),
            StepSubmission(step_number=2, submitted_value=-0.00041, submitted_unit="K^-1"),
            StepSubmission(step_number=3, submitted_value=42261.0, submitted_unit="J/mol"),
            StepSubmission(step_number=4, submitted_value=42.26, submitted_unit="kJ/mol"),
        ],
        revealed_hint_tiers=[2, 3],
    )
    res = service.verify_submission(req)
    assert res.is_correct is True
    # 100 - 10 - 20 = 70.0%
    assert res.score_percentage == 70.0


def test_verify_incorrect_submission(service):
    req = ProblemVerificationRequest(
        problem_id="prob-elec-001",
        final_answer=2.500,  # Expected is 1.030 V
        final_unit="V",
        step_submissions=[],
        revealed_hint_tiers=[],
    )
    res = service.verify_submission(req)
    assert res.is_correct is False
    assert res.score_percentage == 0.0
    assert res.error_percentage > 100.0


def test_generate_randomized_problem(service):
    rand_p, rand_vars = service.generate_randomized_problem("prob-phys-001")
    assert rand_p.id == "prob-phys-001-rand"
    assert "P2_kpa" in rand_vars
    assert "T2_kelvin" in rand_vars
    # Recomputed reference value should be positive and realistic (35 to 55 kJ/mol)
    assert 30.0 <= rand_p.reference_value <= 60.0
    assert len(rand_p.steps) == 4
