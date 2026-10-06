"""
Compound API Endpoints.
"""
from typing import Optional
from fastapi import APIRouter, Query, HTTPException, Path
from services.chemistry.app.schemas.compound import CompoundResponse, CompoundListResponse
from services.chemistry.app.services.compound_service import compound_service
from services.chemistry.app.core.exceptions import CompoundNotFoundError

router = APIRouter(prefix="/compounds", tags=["Compounds"])


@router.get("", response_model=CompoundListResponse, summary="List or search chemical compounds")
def list_compounds(
    query: Optional[str] = Query(None, description="Search query for compound name, formula, or synonym"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    if query:
        res = compound_service.search_compounds(query)
        return CompoundListResponse(total=len(res), compounds=res[skip : skip + limit])

    res = compound_service.list_compounds(skip=skip, limit=limit)
    return CompoundListResponse(total=len(compound_service.list_compounds()), compounds=res)


@router.get("/{identifier}", response_model=CompoundResponse, summary="Get compound by ID, formula, or name")
def get_compound(identifier: str = Path(..., description="Compound ID, chemical formula, or name")):
    try:
        # Try ID first, then formula, then name
        try:
            return compound_service.get_compound_by_id(identifier)
        except CompoundNotFoundError:
            try:
                return compound_service.get_compound_by_formula(identifier)
            except CompoundNotFoundError:
                return compound_service.get_compound_by_name(identifier)
    except CompoundNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
