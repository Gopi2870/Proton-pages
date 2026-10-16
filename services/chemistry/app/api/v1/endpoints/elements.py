"""
Periodic Elements Endpoints.
"""
from typing import List
from fastapi import APIRouter, Query, HTTPException, Path
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.element import Element
from services.chemistry.app.core.exceptions import ElementNotFoundError

router = APIRouter(prefix="/elements", tags=["Periodic Table Elements"])

@router.get("", response_model=List[Element], summary="List Periodic Elements")
def list_elements(
    skip: int = Query(0, ge=0, description="Offset index for pagination"),
    limit: int = Query(118, ge=1, le=118, description="Number of elements to return")
):
    """
    Retrieve periodic table elements with pagination.
    """
    return chemistry_engine.list_elements(skip=skip, limit=limit)

@router.get("/search", response_model=List[Element], summary="Search Elements")
def search_elements(
    q: str = Query(..., min_length=1, max_length=64, description="Search query across symbol, name, or group")
):
    """
    Search elements by query keyword matching symbol, name, block, or group.
    """
    return chemistry_engine.search_elements(q)

@router.get("/{identifier}", response_model=Element, summary="Get Element by Identifier")
def get_element(
    identifier: str = Path(..., min_length=1, max_length=32, description="Atomic number (Z), chemical symbol, or English name")
):
    """
    Fetch a single chemical element by atomic number, symbol, or full name.
    """
    try:
        # Check if integer atomic number
        if identifier.isdigit():
            return chemistry_engine.get_element(int(identifier))
        return chemistry_engine.get_element(identifier)
    except ElementNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
