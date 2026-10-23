"""
FastAPI endpoints for Biomolecular Structure Modeling, PDB parsing, and DSSP analysis.
Mounted at /api/v1/chemistry/biomolecule
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from ....schemas.biomolecule import (
    PdbParseRequest,
    StructurePresetSummary,
    RamachandranPoint,
)
from ....models.biomolecule import (
    ProteinStructureDetail,
    ProteinStructureSummary,
)
from ....services.biomolecule_service import BiomoleculeService
from ....data.protein_structures import get_protein_preset_list

router = APIRouter(prefix="/chemistry/biomolecule", tags=["Biomolecular Structure & DSSP"])
service = BiomoleculeService()


@router.get("/presets", response_model=List[StructurePresetSummary])
def list_presets():
    """Retrieve catalog of authenticated benchmark protein structures with experimental resolution."""
    return get_protein_preset_list()


@router.get("/presets/{preset_id}", response_model=ProteinStructureDetail)
def get_preset_detail(preset_id: str):
    """Retrieve full structural analysis, backbone dihedrals, and DSSP H-bonding network for a preset."""
    detail = service.load_preset(preset_id)
    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Protein preset '{preset_id}' not found.",
        )
    return detail


@router.get("/presets/{preset_id}/ramachandran", response_model=List[RamachandranPoint])
def get_preset_ramachandran(preset_id: str):
    """Retrieve Ramachandran dihedral points (phi, psi) with conformational region assignments."""
    detail = service.load_preset(preset_id)
    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Protein preset '{preset_id}' not found.",
        )

    points: List[RamachandranPoint] = []
    for r in detail.residues:
        if r.phi is not None and r.psi is not None:
            points.append(
                RamachandranPoint(
                    chain_id=r.chain_id,
                    res_seq=r.res_seq,
                    res_name=r.res_name,
                    phi=r.phi,
                    psi=r.psi,
                    region=r.ramachandran_region,
                    is_general=r.res_name not in ["GLY", "PRO"],
                    is_glycine=r.res_name == "GLY",
                    is_proline=r.res_name == "PRO",
                )
            )
    return points


@router.post("/parse", response_model=ProteinStructureDetail)
def parse_pdb_stream(payload: PdbParseRequest):
    """Parse custom PDB coordinate stream, evaluate backbone geometry, and run DSSP secondary structure analysis."""
    if not payload.pdb_content or len(payload.pdb_content.strip()) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="PDB content stream is empty or too short to contain valid ATOM records.",
        )
    try:
        return service.parse_pdb_text(payload.pdb_content, calculate_dssp=payload.calculate_dssp)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to parse PDB coordinates: {str(e)}",
        )
