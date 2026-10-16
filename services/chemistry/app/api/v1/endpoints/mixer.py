"""
Chemical Mixer Simulation Endpoints.
"""
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from services.chemistry.app.models.mixer import MixedReagentInput, MixerSimulationResult
from services.chemistry.app.services.mixer_service import mixer_service

router = APIRouter(prefix="/mixer", tags=["Virtual Chemical Mixer"])

class MixSimulationRequest(BaseModel):
    reagents: List[MixedReagentInput] = Field(
        ...,
        min_length=1,
        max_length=20,
        description="List of reagents added to the reaction vessel with volumes and concentrations"
    )

@router.post("/simulate", response_model=MixerSimulationResult, summary="Simulate Chemical Mixture Reaction")
def simulate_mixture(req: MixSimulationRequest):
    """
    Simulate mixing multiple chemical reagents in a reaction vessel.
    Calculates exact equilibrium pH, temperature rise (neutralization enthalpy),
    insoluble precipitate phase formation (Ksp), gas evolution, and safety warnings.
    """
    try:
        return mixer_service.simulate_mixture(req.reagents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
