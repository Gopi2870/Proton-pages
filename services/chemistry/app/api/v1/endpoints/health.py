"""
Health and System Status Endpoints.
"""
import datetime
from fastapi import APIRouter
from services.chemistry.app.main import chemistry_engine

router = APIRouter(tags=["Health & Status"])

@router.get("/health", summary="Service Health Probe")
def health_check():
    """
    Returns system status, active version, and verification that the ChemistryEngine is operational.
    """
    return {
        "status": "healthy",
        "service": "proton-pages-chemistry",
        "version": "1.1.0",
        "engine_ready": chemistry_engine is not None,
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
