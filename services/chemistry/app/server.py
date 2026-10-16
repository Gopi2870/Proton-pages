"""
FastAPI Server Entry Point for Proton Pages Chemistry Gateway.
"""
import time
import uuid
import logging
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from services.chemistry.app.api.v1 import api_v1_router
from services.chemistry.app.api.v1.endpoints.health import router as root_health_router
from services.chemistry.app.core.exceptions import ChemistryEngineError
from services.chemistry.app.core.config import config

logging.basicConfig(
    level=logging.INFO if not config.DEBUG else logging.DEBUG,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s"
)
logger = logging.getLogger("proton_pages.gateway")

def create_app() -> FastAPI:
    app = FastAPI(
        title="Proton Pages — Chemistry Intelligence Gateway",
        description=(
            "Production-grade Chemistry Intelligence & Scientific Computing API. "
            "Provides deterministic equation balancing, formula parsing, stoichiometry, "
            "and molecular informatics for the Proton Pages platform."
        ),
        version="1.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json"
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Request Correlation & Timing Middleware
    @app.middleware("http")
    async def correlation_and_timing_middleware(request: Request, call_next):
        req_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        start_time = time.perf_counter()

        response = await call_next(request)

        process_time = time.perf_counter() - start_time
        response.headers["X-Request-ID"] = req_id
        response.headers["X-Process-Time"] = f"{process_time:.4f}s"

        logger.info(
            f"req_id={req_id} method={request.method} path={request.url.path} "
            f"status={response.status_code} latency={process_time*1000:.2f}ms"
        )
        return response

    # Exception Handlers
    @app.exception_handler(ChemistryEngineError)
    async def chemistry_engine_exception_handler(request: Request, exc: ChemistryEngineError):
        status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        if "NOT_FOUND" in exc.code:
            status_code = status.HTTP_404_NOT_FOUND

        return JSONResponse(
            status_code=status_code,
            content={
                "error": {
                    "code": exc.code,
                    "message": exc.message,
                    "details": exc.details
                }
            }
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Invalid request parameters or payload.",
                    "details": exc.errors()
                }
            }
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "code": f"HTTP_{exc.status_code}",
                    "message": exc.detail if isinstance(exc.detail, str) else "HTTP Error",
                    "details": exc.detail if isinstance(exc.detail, (dict, list)) else {}
                }
            }
        )

    # Mount Routes
    app.include_router(root_health_router)
    app.include_router(api_v1_router)

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.chemistry.app.server:app", host="0.0.0.0", port=8000, reload=True)
