"""
Unified Chemistry Search API Endpoint.
"""
from typing import Dict, Any
from fastapi import APIRouter, Query
from services.chemistry.app.services.chemistry_search import chemistry_search_engine

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", summary="Unified chemistry search across elements, compounds, and formulas")
def search_chemistry(q: str = Query(..., min_length=1, description="Search query string")) -> Dict[str, Any]:
    return chemistry_search_engine.search(q)
