"""Pydantic validation schemas for Statistical Thermodynamics API endpoints (PR #043)."""

from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field
from app.models.statistical_thermo import (
    MoleculeSpec,
    PartitionFunctionsBreakdown,
    HeatCapacityDecomposition,
    ThermodynamicState,
    TemperatureCurvePoint,
)


class MoleculeSummary(BaseModel):
    id: str
    name: str
    formula: str
    geometry: str
    molar_mass_g_mol: float
    symmetry_number: int
    vibrational_modes_count: int
    rotational_constants_display: str


class PartitionFunctionCalculationRequest(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    molecule_id: Optional[str] = Field("n2", description="Molecule catalog ID or None for custom")
    custom_spec: Optional[Union[MoleculeSpec, Dict[str, Any]]] = None
    temperature_k: float = Field(298.15, gt=0.0, le=10000.0, description="Temperature in Kelvin")
    pressure_pa: float = Field(100000.0, gt=0.0, description="Pressure in Pascals (default standard 1 bar = 100,000 Pa)")


class PartitionFunctionCalculationResponse(BaseModel):
    molecule: MoleculeSummary
    temperature_k: float
    pressure_pa: float
    partition_functions: PartitionFunctionsBreakdown
    thermodynamic_state: ThermodynamicState
    heat_capacity: HeatCapacityDecomposition
    classical_equipartition_ratio: float
    pedagogical_summary: str


class TemperatureSweepRequest(BaseModel):
    molecule_id: str = Field("n2", description="Catalog molecule ID")
    temp_min_k: float = Field(20.0, gt=0.0, description="Minimum temperature in K")
    temp_max_k: float = Field(2000.0, gt=0.0, le=10000.0, description="Maximum temperature in K")
    points_count: int = Field(60, ge=10, le=200, description="Number of curve points")
    pressure_pa: float = Field(100000.0, gt=0.0)


class TemperatureSweepResponse(BaseModel):
    molecule_id: str
    molecule_name: str
    geometry: str
    equipartition_cv_limit: float
    vibrational_temperatures_k: List[float]
    rotational_temperatures_k: List[float]
    curve: List[TemperatureCurvePoint]
    analysis: str
