"""
Domain models for Radical Reaction Networks, Elementary Radical Mechanisms,
Stiff Numerical Kinetics, and Sensitivity Analysis.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Dict, Optional, Any, Tuple


class RadicalSpeciesType(str, Enum):
    ATOMIC = "atomic"             # H, O(3P), O(1D), Cl
    HYDROXYL = "hydroxyl"         # OH
    HYDROPEROXYL = "hydroperoxyl" # HO2
    ALKYL = "alkyl"               # CH3, C2H5
    PEROXY = "peroxy"             # CH3O2, ROO
    ALKOXY = "alkoxy"             # CH3O, RO
    ACYL = "acyl"                 # HCO, CH3CO
    HALOGEN = "halogen"           # Cl, ClO, Br
    NON_RADICAL = "non_radical"   # H2, O2, H2O, CH4, CO, CO2


class RadicalReactionRole(str, Enum):
    INITIATION = "initiation"     # Homolytic cleavage, creates radical pairs
    PROPAGATION = "propagation"   # Radical + molecule -> new radical + new molecule
    BRANCHING = "branching"       # One radical -> 2+ radicals (chain multiplication)
    TERMINATION = "termination"   # Radical + radical -> stable non-radical molecule
    SCAVENGING = "scavenging"     # Trapping by antioxidant or inhibitor


@dataclass
class RadicalSpecies:
    """
    Detailed chemical species with thermodynamic and radical character data.
    """
    name: str
    formula: str
    unpaired_electrons: int = 0
    spin_multiplicity: int = 1         # 2S + 1 (1 for singlet, 2 for doublet radical, 3 for triplet)
    radical_type: RadicalSpeciesType = RadicalSpeciesType.NON_RADICAL
    enthalpy_f_kj_mol: float = 0.0     # Standard enthalpy of formation (298 K)
    gibbs_f_kj_mol: float = 0.0        # Standard Gibbs free energy of formation (298 K)
    entropy_j_mol_k: float = 0.0       # Standard molar entropy (298 K)
    initial_concentration_m: float = 0.0
    color_hex: str = "#94a3b8"
    elements: Dict[str, int] = field(default_factory=dict)  # Atom composition e.g. {"C": 1, "H": 4}


@dataclass
class ArrheniusRateLaw:
    """
    Modified Arrhenius equation: k(T) = A * T^n * exp(-E_a / (R * T))
    Units: A in (m^3/mol)^(order-1) * s^-1, E_a in kJ/mol.
    """
    pre_exponential_a: float
    temperature_exponent_n: float = 0.0
    activation_energy_kj_mol: float = 0.0
    description: str = ""


@dataclass
class RadicalElementaryReaction:
    """
    Elementary radical reaction step in a multi-step chemical mechanism.
    """
    id: str
    equation: str
    role: RadicalReactionRole
    reactants: Dict[str, float]        # Stoichiometric coefficient map
    products: Dict[str, float]
    rate_law: ArrheniusRateLaw
    is_reversible: bool = False
    reverse_rate_law: Optional[ArrheniusRateLaw] = None
    delta_h_rxn_kj_mol: float = 0.0
    delta_g_rxn_kj_mol: float = 0.0


@dataclass
class RadicalMechanism:
    """
    Complete reaction network mechanism with documented provenance.
    """
    id: str
    name: str
    category: str                      # "combustion", "atmospheric", "polymerization", "biochemical"
    description: str
    species: List[RadicalSpecies]
    reactions: List[RadicalElementaryReaction]
    reference_citation: str = ""
    validated_temperature_range_k: Tuple[float, float] = (250.0, 3000.0)


@dataclass
class RadicalTrajectoryStep:
    """
    Instantaneous numerical state along the stiff kinetics trajectory.
    """
    time_s: float
    concentrations: Dict[str, float]
    total_radical_concentration_m: float
    net_reaction_rates: Dict[str, float]
    step_size_s: float


@dataclass
class SensitivityEntry:
    """
    Normalized logarithmic sensitivity coefficient: d(ln C_i) / d(ln k_j).
    """
    species: str
    reaction_id: str
    sensitivity: float                 # Positive = promotes species, Negative = suppresses species


@dataclass
class RadicalSimulationResult:
    """
    Output of stiff ODE numerical integration, QSSA, and sensitivity analysis.
    """
    mechanism_id: str
    mechanism_name: str
    temperature_k: float
    pressure_atm: float
    time_points_s: List[float]
    trajectories: Dict[str, List[float]]  # species_name -> list of concentrations
    total_radical_pool: List[float]
    top_sensitivities: List[SensitivityEntry]
    element_conservation_errors: Dict[str, float]  # Element -> max relative drift
    qssa_comparison: Dict[str, List[float]] = field(default_factory=dict)
    stiffness_ratio_estimate: float = 1.0
    cpu_time_ms: float = 0.0
