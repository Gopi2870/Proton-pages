"""
Domain models for Educational Chemistry Curriculum and Interactive Problem Bank.
Supports multi-disciplinary chemistry assessment, multi-step derivations,
dimensional verification, and automated rubric grading.
"""
from enum import Enum
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field


class ProblemCategory(str, Enum):
    PHYSICAL = "Physical Chemistry"
    ORGANIC = "Organic Chemistry"
    INORGANIC = "Inorganic & Coordination Chemistry"
    ANALYTICAL = "Analytical Chemistry & Spectroscopy"
    QUANTUM = "Quantum Chemistry & Molecular Orbitals"
    THERMODYNAMICS = "Chemical Thermodynamics & Equilibrium"
    KINETICS = "Reaction Kinetics & Catalysis"
    ELECTROCHEMISTRY = "Electrochemistry & Redox Systems"


class ProblemDifficulty(str, Enum):
    INTRODUCTORY = "Introductory (High School / AP)"
    INTERMEDIATE = "Intermediate (Undergraduate General/Organic)"
    ADVANCED = "Advanced (Upper-Division Undergraduate)"
    OLYMPIAD = "Olympiad / Graduate Level"


class ProblemStep(BaseModel):
    step_number: int
    instruction: str
    target_quantity: str
    expected_formula: str
    explanation: str
    expected_value: float
    tolerance_percent: float = Field(default=2.5, description="Percentage deviation tolerance (+/-)")
    unit: str


class ProblemHint(BaseModel):
    tier: int = Field(..., description="1 = Concept nudge, 2 = Key equation, 3 = Full derivation guide")
    hint_text: str
    point_penalty: float = Field(default=0.0, description="Percentage score deducted if hint is revealed")


class RubricCriterion(BaseModel):
    criterion: str
    max_points: float
    description: str


class ChemistryProblem(BaseModel):
    id: str
    title: str
    category: ProblemCategory
    difficulty: ProblemDifficulty
    topic: str
    question_markdown: str
    formula_latex: str
    given_variables: Dict[str, Any]
    steps: List[ProblemStep] = Field(default_factory=list)
    hints: List[ProblemHint] = Field(default_factory=list)
    reference_value: float
    reference_unit: str
    significant_figures: int = 3
    rubric: List[RubricCriterion] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)


class StepSubmission(BaseModel):
    step_number: int
    submitted_value: float
    submitted_unit: str


class ProblemVerificationRequest(BaseModel):
    problem_id: str
    final_answer: float
    final_unit: str
    step_submissions: List[StepSubmission] = Field(default_factory=list)
    revealed_hint_tiers: List[int] = Field(default_factory=list)


class StepVerificationResult(BaseModel):
    step_number: int
    is_correct: bool
    submitted_value: float
    expected_value: float
    submitted_unit: str
    expected_unit: str
    error_percentage: float
    feedback: str


class ProblemVerificationResponse(BaseModel):
    problem_id: str
    is_correct: bool
    score_percentage: float
    error_percentage: float
    feedback: str
    step_results: List[StepVerificationResult] = Field(default_factory=list)
    worked_solution_markdown: str
    detailed_rubric_scores: Dict[str, float] = Field(default_factory=dict)
