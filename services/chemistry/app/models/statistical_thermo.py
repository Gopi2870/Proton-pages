"""Domain models for Statistical Thermodynamics & Molecular Partition Functions (PR #043)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class MoleculeSpec(BaseModel):
    """Specification of molecular parameters for statistical thermodynamic calculation."""
    id: str = Field(..., description="Unique molecule identifier (e.g. 'n2', 'co2', 'h2o')")
    name: str = Field(..., description="Common or IUPAC molecular name")
    formula: str = Field(..., description="Chemical formula (e.g. 'N2', 'H2O')")
    molar_mass_g_mol: float = Field(..., gt=0.0, description="Molar mass in g/mol")
    geometry: str = Field(..., description="'monatomic', 'linear', 'non_linear'")
    symmetry_number: int = Field(1, ge=1, le=120, description="Rotational symmetry number sigma")
    rotational_constants_cm1: List[float] = Field(default_factory=list, description="Rotational constants B (or A, B, C) in cm^-1")
    rotational_temperatures_k: List[float] = Field(default_factory=list, description="Characteristic rotational temperatures Theta_rot in K")
    vibrational_frequencies_cm1: List[float] = Field(default_factory=list, description="Fundamental harmonic vibrational wavenumbers in cm^-1")
    electronic_degeneracy: int = Field(1, ge=1, description="Ground electronic state degeneracy g0 (1=singlet, 3=triplet for O2)")
    spin_orbit_split_k: Optional[float] = Field(None, description="Energy gap to first excited electronic state in K")
    spin_orbit_degeneracy: Optional[int] = Field(None, description="Degeneracy of first excited electronic state")


class PartitionFunctionsBreakdown(BaseModel):
    """Molecular partition functions evaluated at given (T, V/P)."""
    q_trans: float = Field(..., description="Translational molecular partition function")
    q_rot: float = Field(..., description="Rotational partition function")
    q_vib: float = Field(..., description="Vibrational partition function (referenced to ZPE)")
    q_elec: float = Field(..., description="Electronic partition function")
    q_total: float = Field(..., description="Total molecular partition function q = q_trans * q_rot * q_vib * q_elec")
    thermal_wavelength_pm: float = Field(..., description="Thermal de Broglie wavelength Lambda in picometers")


class HeatCapacityDecomposition(BaseModel):
    """Component breakdown of constant-volume molar heat capacity Cv (J / mol K)."""
    cv_trans: float
    cv_rot: float
    cv_vib: float
    cv_elec: float
    cv_total: float
    cp_total: float = Field(..., description="Cp = Cv + R for an ideal gas")
    equipartition_cv_limit: float = Field(..., description="High-T classical equipartition limit for Cv")


class ThermodynamicState(BaseModel):
    """Macroscopic molar thermodynamic state functions derived from canonical ensemble."""
    temperature_k: float
    pressure_pa: float
    internal_energy_thermal_j_mol: float = Field(..., description="Thermal internal energy U - U(0) in J/mol")
    zero_point_energy_j_mol: float = Field(..., description="Vibrational zero-point energy in J/mol")
    enthalpy_thermal_j_mol: float = Field(..., description="Thermal enthalpy H - H(0) = U - U(0) + RT in J/mol")
    entropy_standard_j_mol_k: float = Field(..., description="Standard absolute molar entropy S° in J / (mol K)")
    helmholtz_free_energy_j_mol: float = Field(..., description="Helmholtz free energy A in J/mol")
    gibbs_free_energy_thermal_j_mol: float = Field(..., description="Thermal Gibbs energy G - H(0) in J/mol")
    heat_capacity_cv_j_mol_k: float
    heat_capacity_cp_j_mol_k: float


class TemperatureCurvePoint(BaseModel):
    """Point on temperature dependence curve."""
    temperature_k: float
    q_total: float
    entropy_j_mol_k: float
    cv_j_mol_k: float
    cp_j_mol_k: float
    internal_energy_j_mol: float
    fraction_equipartition: float
