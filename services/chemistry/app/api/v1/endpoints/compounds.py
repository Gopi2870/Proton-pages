"""
Chemical Compounds Endpoints.
"""
from typing import List
from fastapi import APIRouter, Query, HTTPException, Path
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.compound import Compound
from services.chemistry.app.core.exceptions import CompoundNotFoundError

router = APIRouter(prefix="/compounds", tags=["Chemical Compounds"])

@router.get("/search", response_model=List[Compound], summary="Search Compounds")
def search_compounds(
    q: str = Query(..., min_length=1, max_length=64, description="Search query across formula, common name, or IUPAC name")
):
    """
    Search database of organic and inorganic chemical compounds.
    """
    return chemistry_engine.search_compounds(q)

@router.get("/{identifier}", response_model=Compound, summary="Get Compound by Identifier")
def get_compound(
    identifier: str = Path(..., min_length=1, max_length=64, description="Compound ID, chemical formula, or common name")
):
    """
    Fetch a chemical compound by identifier, formula, or name.
    """
    try:
        return chemistry_engine.get_compound(identifier)
    except CompoundNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)
    except Exception:
        raise HTTPException(status_code=404, detail=f"Compound '{identifier}' not found.")
