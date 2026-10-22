"""
Domain models for Organic Chemistry Reaction Mechanisms, Curved-Arrow Formalisms, and Reaction Energy Coordinates.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum


class ArrowType(str, Enum):
    TWO_ELECTRON = "two_electron"  # Standard double-barbed curved arrow
    SINGLE_ELECTRON = "single_electron"  # Fishhook / radical curved arrow


class IntermediateType(str, Enum):
    REACTANT = "reactant"
    TRANSITION_STATE = "transition_state"
    CARBOCATION = "carbocation"
    CARBANION = "carbanion"
    ENOLATE = "enolate"
    OXONIUM = "oxonium"
    ARENIUM_ION = "arenium_ion"
    RADICAL = "radical"
    PRODUCT = "product"


class MechanismClass(str, Enum):
    SN1 = "SN1"
    SN2 = "SN2"
    E1 = "E1"
    E2 = "E2"
    EAS = "EAS"  # Electrophilic Aromatic Substitution
    CARBONYL_ADDITION = "carbonyl_addition"
    ALDOL_CONDENSATION = "aldol_condensation"
    GRIGNARD = "grignard"
    MARKOVNIKOV_ADDITION = "markovnikov_addition"


class StereochemicalOutcome(str, Enum):
    INVERSION = "inversion_walden"
    RACEMIZATION = "racemization"
    RETENTION = "retention"
    ANTI_ELIMINATION = "anti_elimination"
    SYN_ADDITION = "syn_addition"
    ZAITSEV_REGIOSELECTIVE = "zaitsev_regioselective"
    MARKOVNIKOV_REGIOSELECTIVE = "markovnikov_regioselective"
    ACHIRAL = "achiral"


@dataclass
class CurvedArrow:
    source_type: str  # 'lone_pair', 'bond', 'atom'
    source_label: str  # e.g., 'O_lone_pair', 'C-Br_bond', 'C1'
    source_coords: Tuple[float, float]  # Normalized 2D canvas coordinates
    target_type: str  # 'atom', 'bond'
    target_label: str  # e.g., 'C1', 'Br_atom', 'C=C_bond'
    target_coords: Tuple[float, float]
    arrow_type: ArrowType = ArrowType.TWO_ELECTRON
    curvature_bias: float = 0.35  # Bezier control point displacement


@dataclass
class MechanismStep:
    step_number: int
    title: str
    description: str
    intermediate_type: IntermediateType
    reactants_label: str
    products_label: str
    activation_energy_kj_mol: float  # Delta G double-dagger
    reaction_energy_kj_mol: float  # Delta G rxn
    curved_arrows: List[CurvedArrow] = field(default_factory=list)
    key_bonds_formed: List[str] = field(default_factory=list)
    key_bonds_broken: List[str] = field(default_factory=list)


@dataclass
class ReactionEnergyPoint:
    reaction_coordinate: float  # 0.0 to 1.0 (or step index)
    gibbs_free_energy_kj_mol: float
    point_type: str  # 'ground_state', 'transition_state', 'intermediate'
    label: str


@dataclass
class OrganicReactionMechanism:
    id: str
    name: str
    mechanism_class: MechanismClass
    overall_reaction: str
    substrate: str
    nucleophile_or_reagent: str
    solvent: str
    stereochemical_outcome: StereochemicalOutcome
    kinetics_rate_law: str  # e.g., "Rate = k[Substrate][Nu]"
    steps: List[MechanismStep] = field(default_factory=list)
    energy_profile: List[ReactionEnergyPoint] = field(default_factory=list)
    pedagogical_notes: str = ""
