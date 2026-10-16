"""
Electrochemistry and Nernst Equation API Schemas.
"""
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class StandardReductionPotentialResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    half_reaction_str: str
    oxidized_species: str
    reduced_species: str
    electrons: int
    potential_volts: float
    state: str
    description: str

class GalvanicCellRequest(BaseModel):
    cathode_species: str = Field(..., json_schema_extra={"example": "Cu(2+)"}, description="Species being reduced at cathode")
    anode_species: str = Field(..., json_schema_extra={"example": "Zn(2+)"}, description="Species being oxidized at anode")
    cathode_molarity: float = Field(default=1.0, gt=0, le=20.0, description="Cathode aqueous ion molarity [M]")
    anode_molarity: float = Field(default=1.0, gt=0, le=20.0, description="Anode aqueous ion molarity [M]")
    temperature_kelvin: float = Field(default=298.15, ge=100.0, le=1000.0)

class GalvanicCellResponse(BaseModel):
    anode_half_reaction: str
    cathode_half_reaction: str
    overall_reaction: str
    cell_notation: str
    electrons_transferred_n: int
    standard_potential_volts: float
    cell_potential_volts: float
    reaction_quotient_q: float
    standard_gibbs_free_energy_kj: float
    equilibrium_constant_k: float
    is_spontaneous: bool
    temperature_kelvin: float
    nernst_correction_volts: float

class ElectrolysisRequest(BaseModel):
    species: str = Field(..., json_schema_extra={"example": "Cu"}, description="Deposited metal or evolved gas formula")
    molar_mass_g_mol: float = Field(..., gt=0, json_schema_extra={"example": 63.546})
    electrons_per_ion_n: int = Field(..., gt=0, le=8, json_schema_extra={"example": 2})
    current_amperes: float = Field(..., gt=0, json_schema_extra={"example": 2.5})
    time_seconds: float = Field(..., gt=0, json_schema_extra={"example": 3600.0})

class ElectrolysisResponse(BaseModel):
    species_deposited: str
    molar_mass_g_mol: float
    electrons_per_ion_n: int
    current_amperes: float
    time_seconds: float
    total_charge_coulombs: float
    moles_electrons: float
    moles_substance: float
    mass_deposited_grams: float
    gas_volume_liters_stp: Optional[float] = None
