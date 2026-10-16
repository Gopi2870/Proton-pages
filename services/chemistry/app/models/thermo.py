"""
Thermochemistry and Hess's Law Domain Models.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class ThermodynamicSpecies:
    """Standard state thermodynamic quantities at 298.15 K (25 °C) and 1 bar."""
    formula: str
    name: str
    state: str  # 's', 'l', 'g', 'aq'
    delta_h_f_kj_mol: float  # Standard enthalpy of formation (kJ/mol)
    delta_g_f_kj_mol: float  # Standard Gibbs free energy of formation (kJ/mol)
    s_molar_j_mol_k: float   # Standard molar entropy (J / (mol * K))

@dataclass
class ReactionThermochemistryResult:
    """Calculated thermodynamic parameters for a chemical reaction."""
    balanced_equation: str
    temperature_kelvin: float
    delta_h_standard_kj: float      # Reaction enthalpy (kJ)
    delta_s_standard_j_k: float     # Reaction entropy (J/K)
    delta_g_standard_kj: float      # Reaction Gibbs free energy (kJ)
    is_exothermic: bool
    is_spontaneous: bool
    spontaneity_condition: str      # 'spontaneous at all T', 'spontaneous at low T', etc.
    equilibrium_constant_k: Optional[float] = None
    reactants_breakdown: List[Dict[str, float]] = field(default_factory=list)
    products_breakdown: List[Dict[str, float]] = field(default_factory=list)

@dataclass
class HessStep:
    """Individual intermediate reaction step in Hess's Law linear sum."""
    equation: str
    original_delta_h_kj: float
    multiplier: float
    effective_delta_h_kj: float

@dataclass
class HessSolutionResult:
    """Solution to Hess's Law linear combination problem."""
    target_equation: str
    target_delta_h_kj: float
    steps: List[HessStep]
    is_solvable: bool
    method: str = "gaussian_elimination"
    explanation: str = ""
