"""
API Router for Analytical Chromatography & Mass Spectrometry (PR #051).
"""
from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.mass_spectrometry import MsStandard
from app.schemas.mass_spectrometry import (
    MsSimulationRequest,
    MsSimulationResponse,
    IsotopeEnvelopeRequest,
    IsotopeEnvelopeResponse,
    VanDeemterRequest,
    VanDeemterResponse,
    ChromatogramSimulationRequest,
    ChromatogramSimulationResponse,
)
from app.services.mass_spectrometry_service import MassSpectrometryEngine

router = APIRouter(prefix="/mass-spectrometry", tags=["Analytical Chromatography & Mass Spectrometry"])


@router.get("/catalog", response_model=List[MsStandard], summary="Get curated MS fragmentation standards")
async def get_ms_catalog():
    """Returns curated library of standard electron ionization fragmentation libraries."""
    return MassSpectrometryEngine.get_catalog()


@router.post("/simulate-ms", response_model=MsSimulationResponse, summary="Simulate quadrupole mass spectrum")
async def simulate_ms(request: MsSimulationRequest):
    """Calculates 70eV EI fragmentation centroids, McLafferty rearrangements, and neutral loss diagnostics."""
    return MassSpectrometryEngine.simulate_ms(request)


@router.post("/isotope-envelope", response_model=IsotopeEnvelopeResponse, summary="Compute exact isotopic abundance envelope")
async def calculate_isotope_envelope(request: IsotopeEnvelopeRequest):
    """Calculates exact isotopic distribution (M, M+1, M+2, M+4) including halogen Cl (3:1) and Br (1:1) signatures."""
    return MassSpectrometryEngine.calculate_isotope_envelope(request)


@router.post("/van-deemter", response_model=VanDeemterResponse, summary="Compute Van Deemter column hydrodynamics")
async def calculate_van_deemter(request: VanDeemterRequest):
    """Computes eddy diffusion (A), longitudinal diffusion (B), mass transfer resistance (C), and optimum velocity u_opt."""
    return MassSpectrometryEngine.calculate_van_deemter(request)


@router.post("/simulate-chromatogram", response_model=ChromatogramSimulationResponse, summary="Simulate chromatographic separation")
async def simulate_chromatogram(request: ChromatogramSimulationRequest):
    """Simulates multi-component chromatographic retention times, peak widths, and chromatographic resolution Rs."""
    return MassSpectrometryEngine.simulate_chromatogram(request)
