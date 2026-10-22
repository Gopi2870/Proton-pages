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
from services.chemistry.app.api.v1.endpoints.thermo import router as thermo_router
from services.chemistry.app.api.v1.endpoints.electrochemistry import router as electrochemistry_router
from services.chemistry.app.api.v1.endpoints.virtual_lab import router as virtual_lab_router
from services.chemistry.app.api.v1.endpoints.spectroscopy import router as spectroscopy_router
from services.chemistry.app.api.v1.endpoints.education import router as education_router
from services.chemistry.app.api.v1.endpoints.admin import router as admin_router

api_v1_router = APIRouter(prefix="/api/v1")

# Mount sub-routers
api_v1_router.include_router(health_router)
api_v1_router.include_router(elements_router, prefix="/chemistry")
api_v1_router.include_router(compounds_router, prefix="/chemistry")
api_v1_router.include_router(formulas_router, prefix="/chemistry")
api_v1_router.include_router(reactions_router, prefix="/chemistry")
api_v1_router.include_router(stoichiometry_router, prefix="/chemistry")
api_v1_router.include_router(mixer_router, prefix="/chemistry")
api_v1_router.include_router(thermo_router, prefix="/chemistry")
api_v1_router.include_router(electrochemistry_router, prefix="/chemistry")
api_v1_router.include_router(virtual_lab_router, prefix="/chemistry")
api_v1_router.include_router(spectroscopy_router, prefix="/chemistry")
api_v1_router.include_router(search_router, prefix="/chemistry")

# User persistence, auth, bookmarks, virtual lab notebook, and education platform
api_v1_router.include_router(auth_router)
api_v1_router.include_router(bookmarks_router)
api_v1_router.include_router(experiments_router)
api_v1_router.include_router(education_router)
api_v1_router.include_router(admin_router)



