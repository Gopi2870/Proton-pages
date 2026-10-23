"""
Cheminformatics Domain Models.
Defines molecular graphs, atom/bond topological invariants, Morgan circular fingerprints (ECFP),
chemical similarity coefficients, and substructure isomorphism match mappings.
"""
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional, Tuple


class BondOrder(float, Enum):
    SINGLE = 1.0
    DOUBLE = 2.0
    TRIPLE = 3.0
    AROMATIC = 1.5
    QUADRUPLE = 4.0


class SimilarityMetric(str, Enum):
    TANIMOTO = "tanimoto"
    DICE = "dice"
    COSINE = "cosine"
    TVERSKY = "tversky"
    EUCLIDEAN = "euclidean"
    MANHATTAN = "manhattan"


@dataclass
class AtomNode:
    """Topological atom representation with physical and topological invariants."""
    index: int
    element: str
    atomic_number: int
    formal_charge: int = 0
    implicit_hydrogens: int = 0
    aromatic: bool = False
    in_ring: bool = False
    ring_sizes: List[int] = field(default_factory=list)
    valence: int = 0
    hybridization: str = "sp3"
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0


@dataclass
class BondEdge:
    """Topological bond representation with order and ring flags."""
    source: int
    target: int
    order: float = 1.0
    aromatic: bool = False
    in_ring: bool = False


@dataclass
class MolecularGraph:
    """Full chemical molecular graph containing atoms and connecting bonds."""
    id: str
    name: str
    smiles: str = ""
    formula: str = ""
    molecular_weight: float = 0.0
    atoms: List[AtomNode] = field(default_factory=list)
    bonds: List[BondEdge] = field(default_factory=list)
    description: str = ""


@dataclass
class CircularEnvironment:
    """Substructural circular shell centered on an atom at a specific topological radius."""
    atom_index: int
    radius: int
    feature_id: int
    bit_index: int
    participating_atoms: List[int] = field(default_factory=list)
    participating_bonds: List[Tuple[int, int]] = field(default_factory=list)
    notation: str = ""


@dataclass
class MorganFingerprint:
    """Morgan circular fingerprint (Extended Connectivity Fingerprint - ECFP equivalent)."""
    molecule_id: str
    radius: int
    n_bits: int
    active_bits: List[int] = field(default_factory=list)
    bit_counts: Dict[int, int] = field(default_factory=dict)
    bit_hex: str = ""
    environments: List[CircularEnvironment] = field(default_factory=list)
    density: float = 0.0


@dataclass
class SimilarityResult:
    """Pairwise chemical similarity metrics and bit intersection breakdown."""
    molecule_a_id: str
    molecule_b_id: str
    tanimoto: float
    dice: float
    cosine: float
    tversky: float
    shared_bits: List[int] = field(default_factory=list)
    bits_a_only: List[int] = field(default_factory=list)
    bits_b_only: List[int] = field(default_factory=list)
    euclidean_distance: float = 0.0
    manhattan_distance: float = 0.0


@dataclass
class SubstructureMatch:
    """Result of subgraph isomorphism query matching."""
    target_molecule_id: str
    target_molecule_name: str
    query_fragment_id: str
    query_fragment_name: str
    matched: bool
    filter_passed: bool
    atom_mappings: List[Dict[int, int]] = field(default_factory=list)
    matched_target_atoms: List[int] = field(default_factory=list)
    matched_target_bonds: List[Tuple[int, int]] = field(default_factory=list)
    execution_time_ms: float = 0.0


@dataclass
class LibraryScreeningHit:
    """Ranked hit from library similarity or substructure screening."""
    molecule_id: str
    molecule_name: str
    formula: str
    smiles: str
    score: float
    rank: int
    matched_substructure: bool = False
    matched_atoms: List[int] = field(default_factory=list)


@dataclass
class SimilarityMatrixResult:
    """All-against-all similarity distance matrix across a molecular set."""
    molecule_ids: List[str]
    molecule_names: List[str]
    metric: str
    matrix: List[List[float]]
