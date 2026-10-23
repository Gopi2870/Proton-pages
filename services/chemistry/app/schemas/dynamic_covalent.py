"""Pydantic validation schemas for Dynamic Covalent Chemistry & Constitutional Networks (PR #046)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.dynamic_covalent import (
    BuildingBlock,
    DynamicBondMotif,
    LibraryMember,
    TemplateReceptor,
    DCLSimulationResult,
    DynamicExchangeKineticsResult,
)


class DCLCatalogResponse(BaseModel):
    motifs: List[DynamicBondMotif]
    building_blocks: List[BuildingBlock]
    templates: List[TemplateReceptor]


class DCLSimulationRequest(BaseModel):
    motif_id: str = Field("imine_condensation", description="dynamic covalent bond motif: imine_condensation, disulfide_exchange, boronate_ester, hydrazone_exchange")
    building_block_concs_mM: Dict[str, float] = Field(
        default_factory=lambda: {"dialdehyde_A": 2.0, "diamine_B": 2.0, "monoamine_C": 1.0},
        description="Initial concentration of each building block in mM",
    )
    template_id: Optional[str] = Field("zinc_cation", description="Optional directing template receptor (None or template ID)")
    template_concentration_mM: float = Field(1.5, ge=0.0, le=50.0, description="Concentration of template in mM")
    temperature_k: float = Field(298.15, gt=200.0, le=450.0, description="Temperature in Kelvin")
    ph: float = Field(7.0, ge=0.0, le=14.0, description="pH of aqueous / buffered medium")


class DCLSimulationResponse(BaseModel):
    result: DCLSimulationResult


class ExchangeKineticsRequest(BaseModel):
    motif_id: str = Field("disulfide_exchange", description="Motif under study")
    initial_symmetric_1_mM: float = Field(5.0, gt=0.0, le=50.0, description="[R1-SS-R1] initial in mM")
    initial_symmetric_2_mM: float = Field(5.0, gt=0.0, le=50.0, description="[R2-SS-R2] initial in mM")
    initial_asymmetric_mM: float = Field(0.0, ge=0.0, le=50.0, description="[R1-SS-R2] initial in mM")
    thiol_catalyst_conc_uM: float = Field(100.0, ge=0.0, le=5000.0, description="Thiolate catalyst concentration in μM")
    temperature_k: float = Field(298.15, gt=200.0, le=450.0)
    time_span_seconds: float = Field(3600.0, gt=10.0, le=86400.0)
    steps_count: int = Field(50, ge=10, le=200)


class ExchangeKineticsResponse(BaseModel):
    result: DynamicExchangeKineticsResult
