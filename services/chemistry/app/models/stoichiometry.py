"""
Stoichiometry Calculation Models.
"""
from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class ReactantAmountInput(BaseModel):
    formula: str = Field(..., description="Chemical formula of reactant")
    amount: float = Field(..., gt=0, description="Quantity value")
    unit: str = Field("g", description="Unit of measurement (g, kg, mg, mol, mmol)")


class ReactantBreakdown(BaseModel):
    formula: str
    initial_amount: float
    unit: str
    moles_initial: float
    stoichiometric_coefficient: int
    reaction_extent_moles: float
    is_limiting: bool
    moles_consumed: float
    moles_remaining: float
    mass_remaining_g: float


class ProductYieldBreakdown(BaseModel):
    formula: str
    stoichiometric_coefficient: int
    theoretical_yield_moles: float
    theoretical_yield_grams: float
    molar_mass: float


class LimitingReactantResult(BaseModel):
    balanced_equation: str
    limiting_reactant: str
    reactants_breakdown: List[ReactantBreakdown]
    products_breakdown: List[ProductYieldBreakdown]
    calculation_steps: List[str]


class TheoreticalYieldResult(BaseModel):
    balanced_equation: str
    limiting_reactant: str
    target_product: str
    theoretical_yield_grams: float
    theoretical_yield_moles: float
    calculation_steps: List[str]


class PercentYieldResult(BaseModel):
    actual_yield_g: float
    theoretical_yield_g: float
    percent_yield: float
    valid: bool
    explanation: str


class MolarityResult(BaseModel):
    moles: float
    volume_liters: float
    molarity: float
    unit: str = "M"


class DilutionResult(BaseModel):
    m1: float
    v1: float
    m2: float
    v2: float
    solved_variable: str
    solved_value: float
    unit_m: str = "M"
    unit_v: str = "L"
