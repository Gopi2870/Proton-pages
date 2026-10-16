"""
Unified Multi-Domain Chemistry Search Endpoint.
"""
from typing import Dict, Any
from fastapi import APIRouter, Query
from services.chemistry.app.main import chemistry_engine

router = APIRouter(prefix="/search", tags=["Unified Search"])

@router.get("", response_model=Dict[str, Any], summary="Unified Chemistry Search")
def unified_search(
    q: str = Query(..., min_length=1, max_length=128, description="Keyword query across elements, compounds, and reactions")
):
    """
    Search across elements, compounds, reactions, and concepts simultaneously.
    """
    return chemistry_engine.search(q)
