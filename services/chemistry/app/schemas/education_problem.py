"""
Pydantic schemas for Educational Chemistry Curriculum and Interactive Problem Bank API.
"""
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from ..models.education_problem import (
    ProblemCategory,
    ProblemDifficulty,
    ProblemStep,
    ProblemHint,
    RubricCriterion,
    StepSubmission,
    StepVerificationResult,
    ProblemVerificationResponse,
)


class ProblemSummarySchema(BaseModel):
    id: str
    title: str
    category: ProblemCategory
    difficulty: ProblemDifficulty
    topic: str
    reference_unit: str
    tags: List[str]


class ProblemDetailSchema(BaseModel):
    id: str
    title: str
    category: ProblemCategory
    difficulty: ProblemDifficulty
    topic: str
    question_markdown: str
    formula_latex: str
    given_variables: Dict[str, Any]
    steps: List[ProblemStep]
    hints: List[ProblemHint]
    reference_unit: str
    significant_figures: int
    rubric: List[RubricCriterion]
    tags: List[str]


class ProblemFilterQuery(BaseModel):
    category: Optional[ProblemCategory] = None
    difficulty: Optional[ProblemDifficulty] = None
    search: Optional[str] = None
    tag: Optional[str] = None


class VerifyAnswerPayload(BaseModel):
    final_answer: float = Field(..., description="Student numerical answer")
    final_unit: str = Field(..., description="Student unit e.g. kJ/mol, M, s^-1")
    step_submissions: List[StepSubmission] = Field(default_factory=list)
    revealed_hint_tiers: List[int] = Field(default_factory=list)


class RandomizedProblemInstance(BaseModel):
    problem_id: str
    title: str
    category: ProblemCategory
    difficulty: ProblemDifficulty
    topic: str
    question_markdown: str
    formula_latex: str
    randomized_variables: Dict[str, Any]
    target_unit: str
    hints: List[ProblemHint]
