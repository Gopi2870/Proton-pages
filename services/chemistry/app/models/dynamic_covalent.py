"""Domain models for Dynamic Covalent Chemistry & Constitutional Networks (PR #046)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class BuildingBlock(BaseModel):
    """Constituent building block in a dynamic combinatorial library (DCL)."""
    id: str
    name: str
    functional_group: str = Field(..., description="aldehyde, amine, thiol, boronic_acid, diol, hydrazide")
    valency: int = Field(1, description="Number of reactive dynamic covalent motifs (1=monotopic, 2=ditopic)")
    formula: str
    molecular_weight: float
    description: str


class DynamicBondMotif(BaseModel):
    """Dynamic covalent reversible bond reaction archetype."""
    id: str
    name: str
    reaction_type: str = Field(..., description="imine, disulfide, boronate_ester, hydrazone")
    forward_equation: str
    exchange_equation: str
    equilibrium_constant_k_eq: float
    exchange_rate_constant_k_ex: float = Field(..., description="M^-1 s^-1 or s^-1 exchange rate")
    activation_energy_ea_kj_mol: float
    typical_ph_optimum: float
    catalyst_required: Optional[str] = None
    pedagogical_description: str


class LibraryMember(BaseModel):
    """Dynamic combinatorial library macrocycle, oligomer, or exchange product."""
    id: str
    name: str
    formula: str
    molecular_weight: float
    composition: Dict[str, int] = Field(..., description="Building block counts, e.g. {'A1': 1, 'B1': 1}")
    topology: str = Field("linear", description="linear, macrocycle_1x1, macrocycle_2x2, macrocycle_3x3")
    standard_formation_gibbs_kj_mol: float = Field(..., description="Standard ΔG° formation from building blocks")
    equilibrium_fraction_untemplated: float = Field(..., description="Equilibrium mole fraction without template")
    equilibrium_fraction_templated: Optional[float] = Field(None, description="Mole fraction in presence of template")
    amplification_factor: Optional[float] = Field(None, description="Ratio of templated to untemplated equilibrium fraction")


class TemplateReceptor(BaseModel):
    """External directing template (cation, anion, or neutral guest) driving constitutional selection."""
    id: str
    name: str
    template_type: str = Field(..., description="transition_metal_cation, alkali_cation, organic_dication, neutral_guest")
    charge: int
    ionic_radius_angstrom: Optional[float] = None
    binding_affinities: Dict[str, float] = Field(..., description="Association constants Ka [M^-1] for each library member")
    description: str


class DCLSimulationResult(BaseModel):
    """Equilibrium component distribution of a dynamic combinatorial library with thermodynamic selection."""
    motif: DynamicBondMotif
    temperature_k: float
    ph: float
    initial_building_blocks: Dict[str, float] = Field(..., description="Initial concentrations in mM")
    template: Optional[TemplateReceptor] = None
    template_concentration_mM: float = 0.0
    members: List[LibraryMember]
    amplified_member_id: Optional[str] = None
    max_amplification_factor: Optional[float] = None
    shannon_diversity_entropy_untemplated: float
    shannon_diversity_entropy_templated: Optional[float] = None
    equilibrium_converged: bool
    iterations_to_convergence: int
    selection_mechanism: str


class ExchangeKineticsPoint(BaseModel):
    """Time-course concentration point during component exchange equilibration."""
    time_seconds: float
    species_concentrations_mM: Dict[str, float]


class DynamicExchangeKineticsResult(BaseModel):
    """Kinetic relaxation of a dynamic covalent network approaching thermodynamic equilibrium."""
    motif_name: str
    half_life_seconds: float
    relaxation_time_tau_seconds: float
    trajectory: List[ExchangeKineticsPoint]
    rate_law_description: str
