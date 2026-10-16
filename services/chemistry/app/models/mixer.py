"""
Chemical Mixer Simulation Domain Models.
"""
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class MixedReagentInput(BaseModel):
    formula: str = Field(..., description="Chemical formula (e.g. HCl, NaOH, AgNO3)")
    name: str = Field(..., description="Common or chemical substance name")
    volume_ml: float = Field(..., gt=0, le=10000, description="Volume in milliliters")
    concentration_m: float = Field(..., ge=0, le=20, description="Molar concentration (M)")
    initial_ph: Optional[float] = Field(None, ge=0, le=14, description="Optional measured initial pH")
    temperature_c: float = Field(25.0, ge=0, le=100, description="Initial temperature in Celsius")

class PrecipitateProduct(BaseModel):
    formula: str = Field(..., description="Solid precipitate formula (e.g. AgCl(s))")
    name: str = Field(..., description="Compound name")
    color: str = Field(..., description="Observed visual color and appearance")
    ksp: float = Field(..., description="Solubility product constant at 298.15K")
    mass_precipitated_g: float = Field(..., ge=0, description="Mass of solid precipitate formed in grams")
    description: str = Field(..., description="Scientific observation and crystal habit")

class GasProduct(BaseModel):
    formula: str = Field(..., description="Gaseous product formula (e.g. CO2(g), H2(g))")
    name: str = Field(..., description="Gas name")
    volume_liters_stp: float = Field(..., ge=0, description="Volume at standard temperature & pressure")
    odor: str = Field(..., description="Sensory odor profile")
    hazard: Optional[str] = Field(None, description="Inhalation or flammability hazard description")

class MixerSimulationResult(BaseModel):
    total_volume_ml: float = Field(..., description="Total combined solution volume in mL")
    final_ph: float = Field(..., ge=0, le=14, description="Calculated equilibrium solution pH")
    final_temperature_c: float = Field(..., description="Final solution temperature in Celsius")
    delta_temperature_c: float = Field(..., description="Temperature change Delta T")
    is_exothermic: bool = Field(..., description="Whether reaction releases heat")
    is_endothermic: bool = Field(..., description="Whether reaction absorbs heat")
    precipitates: List[PrecipitateProduct] = Field(default_factory=list)
    gases: List[GasProduct] = Field(default_factory=list)
    balanced_equation: Optional[str] = Field(None, description="Overall balanced chemical equation")
    net_ionic_equation: Optional[str] = Field(None, description="Net ionic equation of driving transformation")
    safety_warnings: List[str] = Field(default_factory=list, description="NFPA hazard & laboratory safety alerts")
    chemical_explanation: str = Field(..., description="Rigorous explanation of observed chemical phenomena")
    aqueous_ions_remaining: Dict[str, float] = Field(default_factory=dict, description="Remaining ion concentrations in mol/L")
