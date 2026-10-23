"""
Pydantic Schemas for Cheminformatics API.
Validates requests and responses for molecular graph fingerprints, similarity metrics,
substructure isomorphism matching, and library screening.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class AtomNodeSchema(BaseModel):
    index: int
    element: str
    atomic_number: Optional[int] = None
    formal_charge: int = 0
    implicit_hydrogens: int = 0
    aromatic: bool = False
    in_ring: bool = False
    ring_sizes: List[int] = Field(default_factory=list)
    valence: int = 0
    hybridization: str = "sp3"
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0


class BondEdgeSchema(BaseModel):
    source: int
    target: int
    order: float = 1.0
    aromatic: bool = False
    in_ring: bool = False


class MolecularGraphSchema(BaseModel):
    id: str
    name: str
    smiles: str = ""
    formula: str = ""
    molecular_weight: float = 0.0
    atoms: List[AtomNodeSchema] = Field(default_factory=list)
    bonds: List[BondEdgeSchema] = Field(default_factory=list)
    description: str = ""


class CircularEnvironmentSchema(BaseModel):
    atom_index: int
    radius: int
    feature_id: int
    bit_index: int
    participating_atoms: List[int] = Field(default_factory=list)
    participating_bonds: List[List[int]] = Field(default_factory=list)
    notation: str = ""


class MorganFingerprintResponse(BaseModel):
    molecule_id: str
    radius: int
    n_bits: int
    active_bits: List[int]
    bit_counts: Dict[str, int]
    bit_hex: str
    density: float
    environments: List[CircularEnvironmentSchema]


class FingerprintRequest(BaseModel):
    molecule_id: Optional[str] = None
    graph: Optional[MolecularGraphSchema] = None
    radius: int = 2
    n_bits: int = 1024


class SimilarityRequest(BaseModel):
    molecule_a_id: Optional[str] = None
    molecule_b_id: Optional[str] = None
    graph_a: Optional[MolecularGraphSchema] = None
    graph_b: Optional[MolecularGraphSchema] = None
    radius: int = 2
    n_bits: int = 1024
    tversky_alpha: float = 0.5
    tversky_beta: float = 0.5


class SimilarityResponse(BaseModel):
    molecule_a_id: str
    molecule_b_id: str
    tanimoto: float
    dice: float
    cosine: float
    tversky: float
    shared_bits: List[int]
    bits_a_only: List[int]
    bits_b_only: List[int]
    euclidean_distance: float
    manhattan_distance: float


class SubstructureRequest(BaseModel):
    target_id: Optional[str] = None
    fragment_id: Optional[str] = None
    target_graph: Optional[MolecularGraphSchema] = None
    query_graph: Optional[MolecularGraphSchema] = None


class SubstructureResponse(BaseModel):
    target_molecule_id: str
    target_molecule_name: str
    query_fragment_id: str
    query_fragment_name: str
    matched: bool
    filter_passed: bool
    atom_mappings: List[Dict[str, int]]
    matched_target_atoms: List[int]
    matched_target_bonds: List[List[int]]
    execution_time_ms: float


class LibraryScreeningHitSchema(BaseModel):
    molecule_id: str
    molecule_name: str
    formula: str
    smiles: str
    score: float
    rank: int
    matched_substructure: bool = False
    matched_atoms: List[int] = Field(default_factory=list)


class LibraryScreeningRequest(BaseModel):
    query_id: Optional[str] = None
    query_graph: Optional[MolecularGraphSchema] = None
    metric: str = "tanimoto"
    min_threshold: float = 0.2


class LibraryScreeningResponse(BaseModel):
    query_id: str
    metric: str
    hits: List[LibraryScreeningHitSchema]
    total_screened: int


class SimilarityMatrixRequest(BaseModel):
    molecule_ids: Optional[List[str]] = None
    metric: str = "tanimoto"


class SimilarityMatrixResponse(BaseModel):
    molecule_ids: List[str]
    molecule_names: List[str]
    metric: str
    matrix: List[List[float]]
