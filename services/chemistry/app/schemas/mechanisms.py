"""
Pydantic schemas for Organic Chemistry Mechanisms API.
"""

from typing import List, Tuple, Optional
from pydantic import BaseModel, Field
from app.models.mechanisms import (
    ArrowType,
    IntermediateType,
    MechanismClass,
    StereochemicalOutcome,
)


class CurvedArrowSchema(BaseModel):
    source_type: str
    source_label: str
    source_coords: Tuple[float, float]
    target_type: str
    target_label: str
    target_coords: Tuple[float, float]
    arrow_type: ArrowType = ArrowType.TWO_ELECTRON
    curvature_bias: float = 0.35


class MechanismStepSchema(BaseModel):
    step_number: int
    title: str
    description: str
    intermediate_type: IntermediateType
    reactants_label: str
    products_label: str
    activation_energy_kj_mol: float
    reaction_energy_kj_mol: float
    curved_arrows: List[CurvedArrowSchema]
    key_bonds_formed: List[str]
    key_bonds_broken: List[str]


class ReactionEnergyPointSchema(BaseModel):
    reaction_coordinate: float
    gibbs_free_energy_kj_mol: float
    point_type: str
    label: str


class MechanismSummarySchema(BaseModel):
    id: str
    name: str
    mechanism_class: MechanismClass
    overall_reaction: str
    substrate: str
    nucleophile_or_reagent: str
    solvent: str
    stereochemical_outcome: StereochemicalOutcome
    kinetics_rate_law: str
    step_count: int
    total_activation_barrier_kj_mol: float
    net_gibbs_energy_kj_mol: float


class MechanismDetailSchema(BaseModel):
    id: str
    name: str
    mechanism_class: MechanismClass
    overall_reaction: str
    substrate: str
    nucleophile_or_reagent: str
    solvent: str
    stereochemical_outcome: StereochemicalOutcome
    kinetics_rate_law: str
    steps: List[MechanismStepSchema]
    energy_profile: List[ReactionEnergyPointSchema]
    pedagogical_notes: str


class EnergyProfileInterpolationRequest(BaseModel):
    points: List[ReactionEnergyPointSchema]
    resolution: int = Field(50, ge=10, le=200)


class EnergyProfileInterpolationResponse(BaseModel):
    coordinate_grid: List[float]
    gibbs_energy_curve: List[float]
    transition_state_peaks: List[ReactionEnergyPointSchema]
    intermediate_valleys: List[ReactionEnergyPointSchema]
