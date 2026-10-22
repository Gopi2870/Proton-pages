"""FastAPI endpoints for Coordination Chemistry & Crystal Field Theory (CFT) (PR #039)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.coordination_cft import (
    MetalIonSummary,
    LigandSummary,
    ComplexPresetSummary,
    CoordinationAnalysisRequest,
    CoordinationAnalysisResponse,
)
from app.services.coordination_cft_service import CoordinationCftEngine

router = APIRouter(prefix="/coordination-cft", tags=["Coordination Chemistry & Crystal Field Theory"])


@router.get("/metals", response_model=List[MetalIonSummary])
async def get_transition_metals():
    """Returns curated transition metal ions with oxidation states and d-electron counts."""
    return CoordinationCftEngine.get_all_metals()


@router.get("/ligands", response_model=List[LigandSummary])
async def get_spectrochemical_ligands():
    """Returns the spectrochemical series of ligands ordered by field splitting strength."""
    return CoordinationCftEngine.get_all_ligands()


@router.get("/presets", response_model=List[ComplexPresetSummary])
async def get_coordination_presets():
    """Returns classic textbook coordination complex presets (Fe, Co, Cu, Ni, Pt)."""
    return CoordinationCftEngine.get_presets()


@router.post("/analyze", response_model=CoordinationAnalysisResponse)
async def analyze_coordination_complex(request: CoordinationAnalysisRequest):
    """Calculates crystal field splitting, CFSE, spin state, magnetic moment, and Jahn-Teller effect."""
    try:
        return CoordinationCftEngine.analyze_complex(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Coordination CFT analysis failed: {str(e)}",
        )
