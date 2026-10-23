"""
Domain models for Biomolecular Structure Modeling, PDB parsing,
DSSP hydrogen bonding, and Ramachandran dihedral conformational analysis.
"""
from enum import Enum
from typing import List, Dict, Optional, Tuple, Any
from pydantic import BaseModel, Field


class SecondaryStructureType(str, Enum):
    ALPHA_HELIX = "Alpha Helix (4-turn)"
    THREE_TEN_HELIX = "3_10 Helix (3-turn)"
    PI_HELIX = "Pi Helix (5-turn)"
    BETA_SHEET = "Beta Sheet / Strand"
    BETA_BRIDGE = "Isolated Beta Bridge"
    TURN = "Hydrogen-Bonded Turn"
    BEND = "Geometric Bend"
    COIL = "Random Coil / Loop"


class RamachandranRegion(str, Enum):
    FAVORED_ALPHA = "Favored Alpha Helix"
    FAVORED_BETA = "Favored Beta Sheet"
    FAVORED_LEFT_ALPHA = "Favored Left-Handed Alpha"
    ALLOWED = "Allowed Conformation"
    OUTLIER = "Steric Outlier"


class AtomRecord(BaseModel):
    serial: int
    name: str
    alt_loc: str = ""
    res_name: str
    chain_id: str
    res_seq: int
    i_code: str = ""
    x: float
    y: float
    z: float
    occupancy: float = 1.0
    temp_factor: float = 0.0
    element: str


class AminoAcidResidue(BaseModel):
    chain_id: str
    res_seq: int
    res_name: str
    i_code: str = ""
    n_coord: Optional[Tuple[float, float, float]] = None
    ca_coord: Optional[Tuple[float, float, float]] = None
    c_coord: Optional[Tuple[float, float, float]] = None
    o_coord: Optional[Tuple[float, float, float]] = None
    h_coord: Optional[Tuple[float, float, float]] = None  # Calculated if missing
    phi: Optional[float] = Field(None, description="Phi dihedral angle in degrees (-180 to 180)")
    psi: Optional[float] = Field(None, description="Psi dihedral angle in degrees (-180 to 180)")
    omega: Optional[float] = Field(None, description="Omega peptide bond dihedral in degrees")
    secondary_structure: SecondaryStructureType = SecondaryStructureType.COIL
    ramachandran_region: RamachandranRegion = RamachandranRegion.ALLOWED


class HydrogenBondRecord(BaseModel):
    donor_chain: str
    donor_res_seq: int
    donor_res_name: str
    acceptor_chain: str
    acceptor_res_seq: int
    acceptor_res_name: str
    distance_on: float = Field(..., description="Distance between Oxygen and Nitrogen in Angstroms")
    distance_oh: float = Field(..., description="Distance between Oxygen and Hydrogen in Angstroms")
    energy_kcal_mol: float = Field(..., description="Kabsch-Sander electrostatic energy in kcal/mol")


class ProteinStructureSummary(BaseModel):
    title: str
    pdb_id: Optional[str] = None
    chain_ids: List[str]
    total_residues: int
    total_atoms: int
    helix_count: int
    sheet_count: int
    turn_count: int
    coil_count: int
    helix_percentage: float
    sheet_percentage: float
    ramachandran_favored_percentage: float
    ramachandran_outlier_percentage: float


class ProteinStructureDetail(BaseModel):
    summary: ProteinStructureSummary
    residues: List[AminoAcidResidue]
    hydrogen_bonds: List[HydrogenBondRecord]
    secondary_structure_segments: List[Dict[str, Any]]
