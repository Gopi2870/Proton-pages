"""
Pydantic validation schemas for Biomolecular Structure API endpoints.
"""
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from ..models.biomolecule import (
    SecondaryStructureType,
    RamachandranRegion,
    ProteinStructureSummary,
    AminoAcidResidue,
    HydrogenBondRecord,
    ProteinStructureDetail,
)


class PdbParseRequest(BaseModel):
    pdb_content: str = Field(..., description="Raw text content of a PDB file")
    calculate_dssp: bool = Field(default=True, description="Perform Kabsch-Sander hydrogen-bond analysis")


class PdbIdRequest(BaseModel):
    pdb_id: str = Field(..., min_length=4, max_length=4, description="4-letter PDB accession code e.g. 1CRN")


class StructurePresetSummary(BaseModel):
    id: str
    name: str
    pdb_id: str
    description: str
    organism: str
    resolution_angstrom: Optional[float]
    residue_count: int
    classification: str


class RamachandranPoint(BaseModel):
    chain_id: str
    res_seq: int
    res_name: str
    phi: float
    psi: float
    region: RamachandranRegion
    is_general: bool
    is_glycine: bool
    is_proline: bool
