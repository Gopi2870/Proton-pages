"""
Chemical Element Data Models.
"""
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field


class ElementCategory(str, Enum):
    ALKALI_METAL = "alkali_metal"
    ALKALINE_EARTH_METAL = "alkaline_earth_metal"
    TRANSITION_METAL = "transition_metal"
    POST_TRANSITION_METAL = "post_transition_metal"
    METALLOID = "metalloid"
    REACTIVE_NONMETAL = "reactive_nonmetal"
    NONMETAL = "nonmetal"
    HALOGEN = "halogen"
    NOBLE_GAS = "noble_gas"
    LANTHANIDE = "lanthanide"
    ACTINIDE = "actinide"
    UNKNOWN = "unknown"


class StateOfMatter(str, Enum):
    GAS = "gas"
    LIQUID = "liquid"
    SOLID = "solid"
    UNKNOWN = "unknown"


class Block(str, Enum):
    S = "s"
    P = "p"
    D = "d"
    F = "f"


class Element(BaseModel):
    """
    Representation of a chemical element in the periodic table.
    """
    model_config = ConfigDict(frozen=True)

    atomic_number: int = Field(..., ge=1, le=118, description="Atomic number (Z)")
    symbol: str = Field(..., min_length=1, max_length=3, description="IUPAC element symbol")
    name: str = Field(..., min_length=1, description="English element name")
    atomic_mass: float = Field(..., gt=0, description="Standard atomic weight (u)")
    group: Optional[int] = Field(None, ge=1, le=18, description="Periodic table group number (1-18)")
    period: int = Field(..., ge=1, le=7, description="Periodic table period number (1-7)")
    block: Block = Field(..., description="Subshell block (s, p, d, f)")
    category: ElementCategory = Field(..., description="Chemical category classification")
    state_at_room_temperature: StateOfMatter = Field(..., description="Physical state at 298.15 K")
    electron_configuration: str = Field(..., description="Standard electron configuration notation")
    electronegativity: Optional[float] = Field(None, ge=0, description="Pauling electronegativity")
    density: Optional[float] = Field(None, ge=0, description="Density at STP (g/cm^3 or g/L for gases)")
    melting_point: Optional[float] = Field(None, description="Melting point in Kelvin")
    boiling_point: Optional[float] = Field(None, description="Boiling point in Kelvin")
    oxidation_states: List[int] = Field(default_factory=list, description="Common oxidation states")
    valence_electrons: Optional[int] = Field(None, ge=0, description="Number of valence electrons")
    discovery_year: Optional[int] = Field(None, description="Year of discovery")
    discoverer: Optional[str] = Field(None, description="Discoverer name or group")
    common_uses: List[str] = Field(default_factory=list, description="Common practical applications")
