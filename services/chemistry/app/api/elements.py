"""
Element API Endpoints.
"""
from typing import Optional, List
from fastapi import APIRouter, Query, HTTPException, Path
from services.chemistry.app.schemas.element import ElementResponse, ElementListResponse
from services.chemistry.app.services.element_service import element_service
from services.chemistry.app.core.exceptions import ElementNotFoundError

router = APIRouter(prefix="/elements", tags=["Elements"])


@router.get("", response_model=ElementListResponse, summary="List or search elements")
def list_elements(
    query: Optional[str] = Query(None, description="Search query string"),
    skip: int = Query(0, ge=0),
    limit: int = Query(118, ge=1, le=118)
):
    if query:
        res = element_service.search_elements(query)
        return ElementListResponse(total=len(res), elements=res[skip : skip + limit])

    res = element_service.list_elements(skip=skip, limit=limit)
    return ElementListResponse(total=len(element_service.list_elements()), elements=res)


@router.get("/{identifier}", response_model=ElementResponse, summary="Get element by Z, symbol, or name")
def get_element(
    identifier: str = Path(..., description="Atomic number (Z), element symbol, or English name")
):
    try:
        return element_service.get_element(identifier)
    except ElementNotFoundError as e:
        raise HTTPException(status_code=404, detail=e.message)


@router.get("/group/{group}", response_model=ElementListResponse, summary="Filter elements by periodic table group")
def filter_by_group(group: int = Path(..., ge=1, le=18)):
    res = element_service.filter_elements_by_group(group)
    return ElementListResponse(total=len(res), elements=res)


@router.get("/period/{period}", response_model=ElementListResponse, summary="Filter elements by periodic table period")
def filter_by_period(period: int = Path(..., ge=1, le=7)):
    res = element_service.filter_elements_by_period(period)
    return ElementListResponse(total=len(res), elements=res)


@router.get("/category/{category}", response_model=ElementListResponse, summary="Filter elements by category")
def filter_by_category(category: str = Path(..., description="Element category e.g. alkali_metal, noble_gas")):
    res = element_service.filter_elements_by_category(category)
    return ElementListResponse(total=len(res), elements=res)
