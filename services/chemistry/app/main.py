"""
Main FastAPI Application Entrypoint for Chemistry Engine.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from services.chemistry.app.core.config import config
from services.chemistry.app.core.exceptions import (
    ChemistryEngineError, InvalidFormulaError, UnknownElementError,
    InvalidReactionError, UnbalancedReactionError, ElementNotFoundError,
    CompoundNotFoundError, InvalidStoichiometryError, InvalidUnitError,
    UnsupportedChemistryOperationError
)
from services.chemistry.app.api import api_router

app = FastAPI(
    title=config.APP_NAME,
    version=config.VERSION,
    description="Deterministic Chemistry Engine API for Proton Pages",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ChemistryEngineError)
async def chemistry_exception_handler(request: Request, exc: ChemistryEngineError):
    status_code = 400
    if isinstance(exc, (ElementNotFoundError, CompoundNotFoundError)):
        status_code = 404
    elif isinstance(exc, (InvalidFormulaError, InvalidReactionError, InvalidStoichiometryError, InvalidUnitError)):
        status_code = 400
    elif isinstance(exc, UnsupportedChemistryOperationError):
        status_code = 422

    return JSONResponse(
        status_code=status_code,
        content={
            "error": {
                "message": exc.message,
                "code": exc.code,
                "details": exc.details
            }
        }
    )


app.include_router(api_router, prefix=config.API_V1_PREFIX)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "chemistry_engine", "version": config.VERSION}


@app.get("/", tags=["Root"])
def root():
    return {
        "service": config.APP_NAME,
        "version": config.VERSION,
        "docs": "/docs",
        "api_v1": config.API_V1_PREFIX
    }
