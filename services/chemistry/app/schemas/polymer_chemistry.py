"""Pydantic schemas for Polymer Chemistry & Macromolecular Architecture."""

from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.polymer_chemistry import (
    PolymerizationMechanism,
    RadicalTerminationMode,
)


class MonomerUnitSchema(BaseModel):
    name: str = "Adipic Acid"
    chemical_formula: str = "C6H10O4"
    molecular_weight: float = Field(default=146.14, gt=0)
    functionality: int = Field(default=2, ge=1, le=6)
    feed_ratio: float = Field(default=1.0, gt=0)


class RadicalInitiatorSchema(BaseModel):
    name: str = "AIBN"
    kd_s_1: float = Field(default=1.0e-5, gt=0)
    efficiency_f: float = Field(default=0.65, gt=0, le=1.0)
    initial_concentration_m: float = Field(default=0.01, gt=0, le=1.0)


class CarothersRequest(BaseModel):
    conversion_p: float = Field(default=0.98, ge=0.0, lt=1.0)
    stoichiometric_ratio_r: float = Field(default=1.0, gt=0.0, le=1.0)
    average_functionality: float = Field(default=2.0, ge=1.5, le=6.0)
    monomer_molecular_weight: float = Field(default=113.16, gt=0.0)


class RadicalKineticsRequest(BaseModel):
    monomer_name: str = "Methyl Methacrylate"
    monomer_mw: float = Field(default=100.12, gt=0)
    monomer_concentration_m: float = Field(default=5.0, gt=0, le=15.0)
    initiator: RadicalInitiatorSchema = Field(default_factory=RadicalInitiatorSchema)
    temperature_c: float = Field(default=60.0, ge=20.0, le=200.0)
    propagation_kp_l_mol_s: float = Field(default=515.0, gt=0)
    termination_kt_l_mol_s: float = Field(default=2.55e7, gt=0)
    termination_mode: RadicalTerminationMode = RadicalTerminationMode.DISPROPORTIONATION
    conversion_p: float = Field(default=0.75, ge=0.0, lt=1.0)


class FloryHugginsRequest(BaseModel):
    degree_of_polymerization_n: int = Field(default=500, ge=10, le=50000)
    chi_parameter: float = Field(default=0.45, ge=-1.0, le=2.5)


class MolecularWeightPointResponse(BaseModel):
    chain_length_i: int
    molecular_weight: float
    mole_fraction: float
    weight_fraction: float
    cumulative_weight_fraction: float


class FloryHugginsPointResponse(BaseModel):
    phi_polymer: float
    delta_g_mix_rt: float
    spinodal_chi: float


class FloryHugginsResponse(BaseModel):
    chi_parameter: float
    critical_chi: float
    critical_phi_polymer: float
    is_phase_separated: bool
    curve_points: List[FloryHugginsPointResponse]


class CarothersResponse(BaseModel):
    stoichiometric_ratio_r: float
    average_functionality_fav: float
    conversion_p: float
    gel_point_pc: Optional[float]
    is_gel_formed: bool
    degree_of_polymerization_xn: float
    weight_degree_of_polymerization_xw: float
    polydispersity_index: float


class RadicalKineticsResponse(BaseModel):
    temperature_c: float
    monomer_concentration_m: float
    initiator_concentration_m: float
    propagation_kp_l_mol_s: float
    termination_kt_l_mol_s: float
    radical_concentration_m: float
    polymerization_rate_rp_mol_l_s: float
    kinetic_chain_length_nu: float
    predicted_xn: float
    autoacceleration_trommsdorff: bool


class PolymerSimulationResponse(BaseModel):
    simulation_id: str
    polymer_name: str
    repeat_unit_formula: str
    repeat_unit_mw: float
    mechanism: PolymerizationMechanism
    conversion_p: float
    number_average_mn: float
    weight_average_mw: float
    z_average_mz: float
    polydispersity_index: float
    carothers: Optional[CarothersResponse] = None
    radical_kinetics: Optional[RadicalKineticsResponse] = None
    flory_huggins: Optional[FloryHugginsResponse] = None
    distribution_curve: List[MolecularWeightPointResponse]
    pedagogical_notes: str


class PolymerPresetSummary(BaseModel):
    id: str
    name: str
    classification: str
    mechanism: PolymerizationMechanism
    repeat_unit_formula: str
    repeat_unit_mw: float
    typical_applications: List[str]
    description: str
