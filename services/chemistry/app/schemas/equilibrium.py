"""Pydantic schemas for Chemical Equilibrium, Buffer Capacity & Le Chatelier API."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.equilibrium import (
    EquilibriumSystemType,
    ShiftDirection,
    PerturbationType,
)


class ReactionParticipantSchema(BaseModel):
    formula: str
    name: str
    coefficient: int = Field(default=1, ge=1, le=10)
    is_product: bool = False
    initial_concentration: float = Field(default=1.0, ge=0.0, le=100.0)


class RiceTableRequest(BaseModel):
    equilibrium_constant_k: float = Field(default=1.0, gt=0.0)
    participants: List[ReactionParticipantSchema]


class RiceTableRowSchema(BaseModel):
    species_formula: str
    species_name: str
    coefficient: int
    is_product: bool
    initial: float
    change: float
    equilibrium: float


class RiceTableResponse(BaseModel):
    equilibrium_constant_k: float
    reaction_quotient_q: float
    shift_direction: ShiftDirection
    extent_of_reaction_xi: float
    rows: List[RiceTableRowSchema]
    converged: bool
    iterations: int
    residual_error: float


class PolyproticAcidRequest(BaseModel):
    acid_name: str = "Phosphoric Acid"
    acid_formula: str = "H3PO4"
    total_concentration_ca: float = Field(default=0.10, gt=1.0e-7, le=10.0)
    dissociation_constants_ka: List[float] = Field(default=[7.11e-3, 6.32e-8, 4.49e-13])


class PolyproticSpeciesFractionSchema(BaseModel):
    species_formula: str
    charge: int
    fraction_alpha: float
    equilibrium_concentration: float


class PolyproticAcidResponse(BaseModel):
    acid_name: str
    acid_formula: str
    total_concentration_ca: float
    ph: float
    poh: float
    h_plus_concentration: float
    oh_minus_concentration: float
    dissociation_constants_ka: List[float]
    species_fractions: List[PolyproticSpeciesFractionSchema]


class BufferCapacityRequest(BaseModel):
    buffer_name: str = "Acetic Acid / Acetate Buffer"
    acid_component: str = "CH3COOH"
    base_component: str = "CH3COO-"
    pka: float = Field(default=4.756, ge=0.0, le=14.0)
    total_buffer_concentration_m: float = Field(default=0.10, gt=1.0e-5, le=5.0)
    ratio_base_to_acid: float = Field(default=1.0, gt=0.01, le=100.0)
    added_strong_acid_m: float = Field(default=0.01, ge=0.0, le=0.5)
    added_strong_base_m: float = Field(default=0.01, ge=0.0, le=0.5)


class BufferCapacityPointSchema(BaseModel):
    ph: float
    buffer_capacity_beta: float
    fraction_base: float


class BufferCapacityResponse(BaseModel):
    buffer_name: str
    acid_component: str
    base_component: str
    pka: float
    total_buffer_concentration_m: float
    ratio_base_to_acid: float
    henderson_hasselbalch_ph: float
    rigorous_equilibrium_ph: float
    van_slyke_buffer_capacity_beta: float
    maximum_buffer_capacity: float
    ph_after_acid_addition: float
    ph_after_base_addition: float
    buffer_curve: List[BufferCapacityPointSchema]


class SolubilityKspRequest(BaseModel):
    salt_name: str = "Lead(II) Iodide"
    salt_formula: str = "PbI2"
    ksp_value: float = Field(default=9.8e-9, gt=0.0)
    molar_mass_g_mol: float = Field(default=461.01, gt=0.0)
    cation_formula: str = "Pb2+"
    cation_coefficient: int = Field(default=1, ge=1, le=4)
    anion_formula: str = "I-"
    anion_coefficient: int = Field(default=2, ge=1, le=4)
    common_ion_formula: Optional[str] = None
    common_ion_concentration: float = Field(default=0.0, ge=0.0, le=10.0)


class SolubilityKspResponse(BaseModel):
    salt_name: str
    salt_formula: str
    ksp_value: float
    cation_formula: str
    cation_coefficient: int
    anion_formula: str
    anion_coefficient: int
    common_ion_formula: Optional[str]
    common_ion_concentration: float
    molar_solubility_mol_l: float
    mass_solubility_g_l: float
    ion_product_qsp: float
    is_precipitate_formed: bool
    saturation_state: str


class LeChatelierRequest(BaseModel):
    preset_reaction_id: str = "haber_bosch"
    perturbation_type: PerturbationType = PerturbationType.CONCENTRATION_SPIKE
    concentration_changes: Dict[str, float] = Field(default_factory=dict)
    pressure_multiplier: float = Field(default=1.0, gt=0.05, le=50.0)
    temperature_k: float = Field(default=298.15, ge=150.0, le=2000.0)


class LeChatelierResponse(BaseModel):
    reaction_title: str
    equation_string: str
    delta_h_standard_kj_mol: float
    delta_ng_gas: int
    perturbation_type: PerturbationType
    perturbation_description: str
    initial_k: float
    initial_q: float
    initial_shift: ShiftDirection
    perturbed_k: float
    perturbed_q: float
    le_chatelier_shift: ShiftDirection
    initial_concentrations: Dict[str, float]
    perturbed_concentrations: Dict[str, float]
    new_equilibrium_concentrations: Dict[str, float]
    pedagogical_explanation: str


class EquilibriumPresetSummary(BaseModel):
    id: str
    title: str
    system_type: EquilibriumSystemType
    equation: str
    default_k: float
    delta_h_kj_mol: Optional[float]
    description: str
