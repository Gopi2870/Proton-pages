"""
API v1 Router Aggregator.
"""
from fastapi import APIRouter
from services.chemistry.app.api.v1.endpoints.health import router as health_router
from services.chemistry.app.api.v1.endpoints.elements import router as elements_router
from services.chemistry.app.api.v1.endpoints.compounds import router as compounds_router
from services.chemistry.app.api.v1.endpoints.formulas import router as formulas_router
from services.chemistry.app.api.v1.endpoints.reactions import router as reactions_router
from services.chemistry.app.api.v1.endpoints.stoichiometry import router as stoichiometry_router
from services.chemistry.app.api.v1.endpoints.mixer import router as mixer_router
from services.chemistry.app.api.v1.endpoints.search import router as search_router
from services.chemistry.app.api.v1.endpoints.auth import router as auth_router
from services.chemistry.app.api.v1.endpoints.bookmarks import router as bookmarks_router
from services.chemistry.app.api.v1.endpoints.experiments import router as experiments_router

api_v1_router = APIRouter(prefix="/api/v1")

# Mount sub-routers
api_v1_router.include_router(health_router)
api_v1_router.include_router(elements_router, prefix="/chemistry")
api_v1_router.include_router(compounds_router, prefix="/chemistry")
api_v1_router.include_router(formulas_router, prefix="/chemistry")
api_v1_router.include_router(reactions_router, prefix="/chemistry")
api_v1_router.include_router(stoichiometry_router, prefix="/chemistry")
api_v1_router.include_router(mixer_router, prefix="/chemistry")
api_v1_router.include_router(search_router, prefix="/chemistry")

# User persistence, auth, bookmarks, and virtual lab notebook
api_v1_router.include_router(auth_router)
api_v1_router.include_router(bookmarks_router)
api_v1_router.include_router(experiments_router)

