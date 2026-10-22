"""Data models for Polymer Chemistry & Macromolecular Architecture.

Models Step-Growth Polycondensation (Carothers equation, gelation point),
Chain-Growth Free-Radical Polymerization (QSSA kinetics),
Molecular Weight Distributions (Mn, Mw, Mz, PDI), and
Flory-Huggins Polymer Solution Thermodynamics.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class PolymerizationMechanism(str, Enum):
    STEP_GROWTH = "step_growth"
    CHAIN_GROWTH_RADICAL = "chain_growth_radical"
    RING_OPENING = "ring_opening"


class RadicalTerminationMode(str, Enum):
    COMBINATION = "combination"
    DISPROPORTIONATION = "disproportionation"
    MIXED = "mixed"


@dataclass
class MonomerUnit:
    name: str
    chemical_formula: str
    molecular_weight: float
    functionality: int = 2
    feed_ratio: float = 1.0


@dataclass
class RadicalInitiator:
    name: str = "AIBN (Azobisisobutyronitrile)"
    kd_s_1: float = 1.0e-5  # decomposition rate constant at reaction temp
    efficiency_f: float = 0.65
    initial_concentration_m: float = 0.01  # mol/L


@dataclass
class CarothersAnalysis:
    stoichiometric_ratio_r: float  # r = NA / NB <= 1.0
    average_functionality_fav: float
    conversion_p: float
    gel_point_pc: Optional[float]
    is_gel_formed: bool
    degree_of_polymerization_xn: float
    weight_degree_of_polymerization_xw: float
    polydispersity_index: float


@dataclass
class RadicalKineticsAnalysis:
    temperature_c: float
    monomer_concentration_m: float
    initiator_concentration_m: float
    propagation_kp_l_mol_s: float
    termination_kt_l_mol_s: float
    radical_concentration_m: float  # [M*] = sqrt(f * kd * [I] / kt)
    polymerization_rate_rp_mol_l_s: float  # Rp = kp * [M] * [M*]
    kinetic_chain_length_nu: float  # nu = Rp / Ri
    predicted_xn: float
    autoacceleration_trommsdorff: bool


@dataclass
class MolecularWeightPoint:
    chain_length_i: int
    molecular_weight: float
    mole_fraction: float  # xi
    weight_fraction: float  # wi
    cumulative_weight_fraction: float


@dataclass
class FloryHugginsPoint:
    phi_polymer: float  # volume fraction of polymer phi2
    delta_g_mix_rt: float  # Delta G_mix / RT
    spinodal_chi: float


@dataclass
class FloryHugginsAnalysis:
    chi_parameter: float
    critical_chi: float
    critical_phi_polymer: float
    is_phase_separated: bool
    curve_points: List[FloryHugginsPoint] = field(default_factory=list)


@dataclass
class PolymerSimulationResult:
    simulation_id: str
    polymer_name: str
    repeat_unit_formula: str
    repeat_unit_mw: float
    mechanism: PolymerizationMechanism
    conversion_p: float
    number_average_mn: float  # Mn (g/mol)
    weight_average_mw: float  # Mw (g/mol)
    z_average_mz: float  # Mz (g/mol)
    polydispersity_index: float  # PDI = Mw / Mn
    carothers: Optional[CarothersAnalysis] = None
    radical_kinetics: Optional[RadicalKineticsAnalysis] = None
    flory_huggins: Optional[FloryHugginsAnalysis] = None
    distribution_curve: List[MolecularWeightPoint] = field(default_factory=list)
    pedagogical_notes: str = ""
