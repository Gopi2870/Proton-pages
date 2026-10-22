"""Data models for Chemical Equilibrium, Buffer Capacity & Le Chatelier Engine.

Models ICE/RICE tables, polyprotic acid-base equilibria, van Slyke buffer capacity,
solubility product (Ksp) with common-ion effect, and Le Chatelier perturbations.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional


class EquilibriumSystemType(str, Enum):
    HOMOGENEOUS_GAS = "homogeneous_gas"
    WEAK_ACID_BASE = "weak_acid_base"
    POLYPROTIC_ACID = "polyprotic_acid"
    BUFFER_SOLUTION = "buffer_solution"
    SOLUBILITY_KSP = "solubility_ksp"
    COBALT_COMPLEX = "cobalt_complex"


class ShiftDirection(str, Enum):
    FORWARD = "forward"  # shifts right toward products
    REVERSE = "reverse"  # shifts left toward reactants
    AT_EQUILIBRIUM = "at_equilibrium"  # Q == K


class PerturbationType(str, Enum):
    CONCENTRATION_SPIKE = "concentration_spike"
    PRESSURE_VOLUME = "pressure_volume"
    TEMPERATURE_SHIFT = "temperature_shift"


@dataclass
class ReactionParticipant:
    formula: str
    name: str
    coefficient: int  # stoichiometric coefficient (positive)
    is_product: bool  # False for reactant, True for product
    initial_concentration: float = 0.0  # mol/L or bar
    change_concentration: float = 0.0  # -coeff * xi or +coeff * xi
    equilibrium_concentration: float = 0.0  # mol/L or bar


@dataclass
class RiceTableRow:
    species_formula: str
    species_name: str
    coefficient: int
    is_product: bool
    initial: float
    change: float
    equilibrium: float


@dataclass
class RiceTableResult:
    equilibrium_constant_k: float
    reaction_quotient_q: float
    shift_direction: ShiftDirection
    extent_of_reaction_xi: float
    rows: List[RiceTableRow]
    converged: bool
    iterations: int
    residual_error: float


@dataclass
class PolyproticSpeciesFraction:
    species_formula: str
    charge: int
    fraction_alpha: float  # alpha_0, alpha_1, ...
    equilibrium_concentration: float


@dataclass
class PolyproticEquilibriumResult:
    acid_name: str
    acid_formula: str
    total_concentration_ca: float
    ph: float
    poh: float
    h_plus_concentration: float
    oh_minus_concentration: float
    dissociation_constants_ka: List[float]
    species_fractions: List[PolyproticSpeciesFraction]


@dataclass
class BufferCapacityPoint:
    ph: float
    buffer_capacity_beta: float  # van Slyke beta = dCb/dpH
    fraction_base: float


@dataclass
class BufferCapacityResult:
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
    ph_after_acid_addition: float  # after adding 0.01 M strong acid
    ph_after_base_addition: float  # after adding 0.01 M strong base
    buffer_curve: List[BufferCapacityPoint] = field(default_factory=list)


@dataclass
class SolubilityKspResult:
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
    saturation_state: str  # unsaturated, saturated, supersaturated


@dataclass
class LeChatelierPerturbationResult:
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
