"""
Chemical Compound Data Models.
"""
from typing import Optional, List, Dict
from pydantic import BaseModel, ConfigDict, Field


class Compound(BaseModel):
    """
    Representation of a chemical compound.
    """
    model_config = ConfigDict(frozen=True)

    id: str = Field(..., description="Unique compound identifier (e.g. comp-water)")
    name: str = Field(..., description="Common or standard name")
    formula: str = Field(..., description="Chemical formula string")
    molecular_mass: float = Field(..., gt=0, description="Molar mass in g/mol")
    synonyms: List[str] = Field(default_factory=list, description="Common synonyms and alternative names")
    compound_class: str = Field(..., description="Compound class (e.g., oxide, acid, salt, alcohol)")
    elements: List[str] = Field(default_factory=list, description="List of unique element symbols in compound")
    charge: int = Field(0, description="Net ionic charge")
    physical_state: str = Field("unknown", description="State at room temperature")
    description: Optional[str] = Field(None, description="Detailed scientific description")
    iupac_name: Optional[str] = Field(None, description="Systematic IUPAC name")
    cas_number: Optional[str] = Field(None, description="CAS Registry Number")
    pubchem_id: Optional[int] = Field(None, description="PubChem Compound ID")
    density: Optional[float] = Field(None, description="Density in g/cm^3")
    melting_point: Optional[float] = Field(None, description="Melting point in K")
    boiling_point: Optional[float] = Field(None, description="Boiling point in K")
    solubility: Optional[str] = Field(None, description="Solubility description")
