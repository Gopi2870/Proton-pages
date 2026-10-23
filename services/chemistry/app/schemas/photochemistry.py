"""Pydantic validation schemas for Photochemistry & Jablonski Diagrams (PR #047)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.photochemistry import (
    FluorophoreMolecule,
    QuencherMolecule,
    FretPair,
    JablonskiEnergyState,
    PhotophysicalDeexcitationRates,
    SternVolmerResult,
    FretSimulationResult,
)


class PhotochemistryCatalogResponse(BaseModel):
    fluorophores: List[FluorophoreMolecule]
    quenchers: List[QuencherMolecule]
    fret_pairs: List[FretPair]


class JablonskiSimulationRequest(BaseModel):
    fluorophore_id: str = Field("fluorescein", description="Preset fluorophore identifier")
    kr_scaling_factor: float = Field(1.0, gt=0.0, le=10.0, description="Multiplier for radiative rate constant kr")
    kic_scaling_factor: float = Field(1.0, gt=0.0, le=10.0, description="Multiplier for internal conversion kic (thermal quenching)")
    kisc_scaling_factor: float = Field(1.0, gt=0.0, le=50.0, description="Multiplier for intersystem crossing kisc (heavy atom effect)")
    temperature_k: float = Field(298.15, gt=100.0, le=450.0)


class JablonskiSimulationResponse(BaseModel):
    fluorophore: FluorophoreMolecule
    states: List[JablonskiEnergyState]
    rates: PhotophysicalDeexcitationRates
    jablonski_summary: str


class SternVolmerRequest(BaseModel):
    fluorophore_id: str = Field("fluorescein", description="Fluorophore under quenching study")
    quencher_id: str = Field("iodide_anion", description="Collisional quencher (iodide, oxygen, acrylamide)")
    max_quencher_conc_mM: float = Field(50.0, gt=0.0, le=500.0, description="Maximum quencher concentration in mM")
    points_count: int = Field(11, ge=5, le=51)
    temperature_k: float = Field(298.15, gt=100.0, le=450.0)


class SternVolmerResponse(BaseModel):
    result: SternVolmerResult


class FretSimulationRequest(BaseModel):
    fret_pair_id: str = Field("CFP_YFP", description="Preset FRET pair identifier (CFP_YFP, Cy3_Cy5, FAM_TAMRA)")
    current_distance_r_angstrom: float = Field(50.0, gt=5.0, le=120.0, description="Current inter-fluorophore separation distance [Å]")
    min_distance_angstrom: float = Field(15.0, ge=5.0, le=50.0)
    max_distance_angstrom: float = Field(95.0, ge=60.0, le=150.0)
    steps_count: int = Field(35, ge=10, le=100)


class FretSimulationResponse(BaseModel):
    result: FretSimulationResult
