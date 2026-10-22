"""Domain models for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE)."""

from typing import List, Optional, Tuple
from pydantic import BaseModel, Field


class TernaryPoint(BaseModel):
    """Composition point in a ternary system with normalized mole/mass fractions."""
    x_a: float = Field(..., ge=0.0, le=1.0, description="Carrier fraction (e.g. Water)")
    x_b: float = Field(..., ge=0.0, le=1.0, description="Solvent fraction (e.g. Toluene / MIBK)")
    x_c: float = Field(..., ge=0.0, le=1.0, description="Solute fraction (e.g. Acetic Acid / Acetone)")
    label: Optional[str] = Field(None, description="Optional label (e.g., Feed, Solvent, Plait)")

    @property
    def sum_fractions(self) -> float:
        return self.x_a + self.x_b + self.x_c

    def to_cartesian(self) -> Tuple[float, float]:
        """Projects (x_A, x_B, x_C) onto an equilateral triangle of base 1 and height sqrt(3)/2.
        
        Vertex A (Carrier): (0, 0)
        Vertex B (Solvent): (1, 0)
        Vertex C (Solute): (0.5, sqrt(3)/2)
        """
        x = self.x_b + 0.5 * self.x_c
        y = (3.0 ** 0.5 / 2.0) * self.x_c
        return (x, y)


class TieLine(BaseModel):
    """Conjugate phase equilibrium tie-line between Raffinate and Extract."""
    id: str = Field(..., description="Tie line identifier")
    raffinate: TernaryPoint = Field(..., description="Carrier-rich phase (R)")
    extract: TernaryPoint = Field(..., description="Solvent-rich phase (E)")
    distribution_coefficient: float = Field(..., description="K_D = y_C / x_C (Extract/Raffinate solute partition)")
    selectivity: float = Field(..., description="beta = (y_C / x_C) / (y_A / x_A) (Separation factor)")


class CorrelationResult(BaseModel):
    """Linear regression thermodynamic consistency result (Hand or Othmer-Tobias)."""
    slope: float
    intercept: float
    r_squared: float
    is_consistent: bool = Field(..., description="True if R^2 >= 0.98")
    formula_latex: str
    data_points: List[Tuple[float, float]] = Field(default_factory=list, description="(X, Y) correlation pairs")


class ExtractionStage(BaseModel):
    """A single theoretical equilibrium stage in Hunter-Nash countercurrent extraction."""
    stage_number: int
    extract: TernaryPoint
    raffinate: TernaryPoint
    solute_recovery_percent: float


class TernarySystemPreset(BaseModel):
    """Curated experimental ternary system with binodal curve and tie-lines."""
    id: str
    name: str
    carrier_name: str
    solvent_name: str
    solute_name: str
    temperature_k: float = 298.15
    pressure_kpa: float = 101.325
    plait_point: TernaryPoint
    binodal_curve: List[TernaryPoint]
    tie_lines: List[TieLine]
    description: str
