"""
API Package Init for Chemistry Engine.
"""
from fastapi import APIRouter
from services.chemistry.app.api.elements import router as elements_router
from services.chemistry.app.api.compounds import router as compounds_router
from services.chemistry.app.api.formulas import router as formulas_router
from services.chemistry.app.api.reactions import router as reactions_router
from services.chemistry.app.api.stoichiometry import router as stoichiometry_router
from services.chemistry.app.api.search import router as search_router

api_router = APIRouter()
api_router.include_router(elements_router)
api_router.include_router(compounds_router)
api_router.include_router(formulas_router)
api_router.include_router(reactions_router)
api_router.include_router(stoichiometry_router)
api_router.include_router(search_router)

__all__ = ["api_router"]
