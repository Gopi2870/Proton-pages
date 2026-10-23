"""
FastAPI endpoints for Educational Chemistry Curriculum and Interactive Problem Bank.
Mounted at /api/v1/education/problems
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from ....schemas.education_problem import (
    ProblemSummarySchema,
    ProblemDetailSchema,
    VerifyAnswerPayload,
    RandomizedProblemInstance,
)
from ....models.education_problem import (
    ProblemCategory,
    ProblemDifficulty,
    ProblemVerificationRequest,
    ProblemVerificationResponse,
)
from ....services.education_problem_service import EducationProblemService

router = APIRouter(prefix="/education/problems", tags=["Education Problem Bank"])
service = EducationProblemService()


@router.get("", response_model=List[ProblemSummarySchema])
def list_problems(
    category: Optional[ProblemCategory] = Query(None, description="Filter by problem branch"),
    difficulty: Optional[ProblemDifficulty] = Query(None, description="Filter by academic level"),
    search: Optional[str] = Query(None, description="Search query across title, topic, text"),
    tag: Optional[str] = Query(None, description="Filter by topic tag"),
):
    """List curated chemistry problems with metadata and topic tagging."""
    problems = service.list_problems(category=category, difficulty=difficulty, search=search, tag=tag)
    return [
        ProblemSummarySchema(
            id=p.id,
            title=p.title,
            category=p.category,
            difficulty=p.difficulty,
            topic=p.topic,
            reference_unit=p.reference_unit,
            tags=p.tags,
        )
        for p in problems
    ]


@router.get("/{problem_id}", response_model=ProblemDetailSchema)
def get_problem(problem_id: str):
    """Retrieve full problem definition including given variables, step instructions, hints, and rubric."""
    p = service.get_problem(problem_id)
    if not p:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problem '{problem_id}' not found in active curriculum bank.",
        )
    return ProblemDetailSchema(
        id=p.id,
        title=p.title,
        category=p.category,
        difficulty=p.difficulty,
        topic=p.topic,
        question_markdown=p.question_markdown,
        formula_latex=p.formula_latex,
        given_variables=p.given_variables,
        steps=p.steps,
        hints=p.hints,
        reference_unit=p.reference_unit,
        significant_figures=p.significant_figures,
        rubric=p.rubric,
        tags=p.tags,
    )


@router.get("/{problem_id}/randomized", response_model=RandomizedProblemInstance)
def get_randomized_problem(problem_id: str):
    """Generate a randomized instance with perturbed physical variables and dynamic recalculation."""
    try:
        p, vars_dict = service.generate_randomized_problem(problem_id)
        return RandomizedProblemInstance(
            problem_id=p.id,
            title=p.title,
            category=p.category,
            difficulty=p.difficulty,
            topic=p.topic,
            question_markdown=p.question_markdown,
            formula_latex=p.formula_latex,
            randomized_variables=vars_dict,
            target_unit=p.reference_unit,
            hints=p.hints,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.post("/{problem_id}/verify", response_model=ProblemVerificationResponse)
def verify_solution(problem_id: str, payload: VerifyAnswerPayload):
    """
    Verify student's submitted answer and individual intermediate derivation steps.
    Computes percentage error, evaluates dimensional unit consistency, assesses hint penalties,
    and returns comprehensive worked solution markdown.
    """
    req = ProblemVerificationRequest(
        problem_id=problem_id,
        final_answer=payload.final_answer,
        final_unit=payload.final_unit,
        step_submissions=payload.step_submissions,
        revealed_hint_tiers=payload.revealed_hint_tiers,
    )
    try:
        return service.verify_submission(req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
