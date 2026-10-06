"""
Application Configuration for the Chemistry Engine.
"""
import os
from dataclasses import dataclass

@dataclass
class ChemistryConfig:
    APP_NAME: str = "Proton Pages Chemistry Engine"
    API_V1_PREFIX: str = "/api/v1/chemistry"
    VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")
    MAX_FORMULA_LENGTH: int = 256
    MAX_EQUATION_SPECIES: int = 30
    NUMERICAL_TOLERANCE: float = 1e-4

config = ChemistryConfig()
