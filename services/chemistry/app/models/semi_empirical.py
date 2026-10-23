"""
Semi-Empirical Quantum Chemistry Domain Models (PR #057).
Represents basis functions, atomic parameter sets (MNDO, AM1, PM3),
Fock matrix representations, SCF electronic states, and molecular properties.
"""
from enum import Enum
from typing import Dict, List, Optional, Tuple
from pydantic import BaseModel, Field


class SemiEmpiricalMethod(str, Enum):
    MNDO = "MNDO"
    AM1 = "AM1"
    PM3 = "PM3"


class OrbitalType(str, Enum):
    S = "s"
    PX = "px"
    PY = "py"
    PZ = "pz"


class GaussianCorrection(BaseModel):
    """AM1 / PM3 core-core repulsion Gaussian correction parameters."""
    k: float = Field(..., description="Gaussian amplitude (eV)")
    l: float = Field(..., description="Gaussian width exponent (Angstrom^-2)")
    m: float = Field(..., description="Gaussian center (Angstrom)")


class ElementParameters(BaseModel):
    """
    Semi-empirical NDDO parameters for an atomic species in eV and atomic units.
    Literature source: Dewar et al. (MNDO 1977, AM1 1985), Stewart (PM3 1989).
    """
    symbol: str
    atomic_number: int
    valence_charge: int = Field(..., description="Core charge Z_A (e.g. H: 1, C: 4, N: 5, O: 6, F: 7)")
    u_ss: float = Field(..., description="One-electron s-orbital core energy U_ss (eV)")
    u_pp: float = Field(0.0, description="One-electron p-orbital core energy U_pp (eV)")
    zeta_s: float = Field(..., description="Slater orbital exponent for s orbital (a.u. / bohr^-1)")
    zeta_p: float = Field(0.0, description="Slater orbital exponent for p orbital (a.u. / bohr^-1)")
    beta_s: float = Field(..., description="Resonance integral beta parameter for s orbital (eV)")
    beta_p: float = Field(0.0, description="Resonance integral beta parameter for p orbital (eV)")
    g_ss: float = Field(..., description="One-center two-electron integral (ss|ss) (eV)")
    g_sp: float = Field(0.0, description="One-center two-electron integral (ss|pp) (eV)")
    g_pp: float = Field(0.0, description="One-center two-electron integral (pp|pp) (eV)")
    g_p2: float = Field(0.0, description="One-center two-electron integral (pp|p'p') (eV)")
    h_sp: float = Field(0.0, description="One-center exchange integral (sp|sp) (eV)")
    alpha: float = Field(..., description="Core-core repulsion exponential parameter (Angstrom^-1)")
    gaussians: List[GaussianCorrection] = Field(default_factory=list, description="Core-core Gaussian corrections (AM1/PM3)")
    isolated_atom_energy_ev: float = Field(..., description="Total electronic energy of isolated neutral atom (eV)")
    heat_of_formation_atom_kcal_mol: float = Field(..., description="Experimental standard heat of formation of gas-phase atom (kcal/mol)")


class AtomCoordinate(BaseModel):
    """3D Cartesian coordinates of an atom in Angstroms."""
    index: int
    symbol: str
    x: float
    y: float
    z: float


class AtomicBasisFunction(BaseModel):
    """Valence basis orbital in the semi-empirical calculation."""
    index: int
    atom_index: int
    symbol: str
    orbital_type: OrbitalType
    zeta: float


class ScfIterationRecord(BaseModel):
    """Metrics recorded at each SCF cycle."""
    iteration: int
    electronic_energy_ev: float
    total_energy_ev: float
    energy_change_ev: float
    density_change_max: float
    diis_dimension: int


class MolecularOrbitalLevel(BaseModel):
    """Calculated molecular orbital eigenvalue and eigenvectors."""
    index: int
    energy_ev: float
    occupancy: float = Field(..., description="Orbital occupancy: 2.0 (closed shell), 0.0 (virtual)")
    is_homo: bool = False
    is_lumo: bool = False
    symmetry_label: Optional[str] = None
    coefficients: List[float] = Field(default_factory=list, description="Expansion coefficients C_mu,i across valence basis")


class AtomicPopulation(BaseModel):
    """Mulliken population analysis results for an atom."""
    atom_index: int
    symbol: str
    total_valence_electrons: float
    net_charge: float
    s_population: float
    p_population: float


class DipoleMomentVector(BaseModel):
    """Molecular dipole moment in Debyes."""
    dx: float
    dy: float
    dz: float
    magnitude: float
    point_charge_contribution: float
    hybridization_contribution: float


class FrontierOrbitalIndices(BaseModel):
    """Conceptual DFT / Frontier Molecular Orbital chemical reactivity indices."""
    homo_energy_ev: float
    lumo_energy_ev: float
    gap_ev: float
    ionization_potential_ev: float
    electron_affinity_ev: float
    electronegativity_ev: float
    hardness_ev: float
    softness_ev_inv: float
    electrophilicity_index_ev: float


class SemiEmpiricalPresetMolecule(BaseModel):
    """Curated reference molecule for benchmarking semi-empirical Hamiltonians."""
    id: str
    name: str
    formula: str
    description: str
    atoms: List[AtomCoordinate]
    point_group: str
    literature_heat_of_formation_kcal_mol: Dict[str, float] = Field(
        default_factory=dict,
        description="Published literature Delta H_f values by method (e.g. {'MNDO': -60.7, 'AM1': -59.2, 'PM3': -53.4, 'Exp': -57.8})"
    )
    literature_dipole_debye: Dict[str, float] = Field(
        default_factory=dict,
        description="Published dipole moments by method"
    )
    provenance: str


class PesScanPoint(BaseModel):
    """A single coordinate point along a 1D potential energy surface."""
    coordinate_value: float = Field(..., description="Distance in Angstroms or angle in degrees")
    total_energy_ev: float
    relative_energy_kcal_mol: float
    heat_of_formation_kcal_mol: float
    converged: bool


class SemiEmpiricalCalculationResult(BaseModel):
    """Comprehensive output of an SCF semi-empirical calculation."""
    method: SemiEmpiricalMethod
    total_atoms: int
    total_valence_electrons: int
    number_of_basis_functions: int
    scf_converged: bool
    scf_iterations: int
    electronic_energy_ev: float
    core_repulsion_energy_ev: float
    total_energy_ev: float
    heat_of_formation_kcal_mol: float
    dipole_moment: DipoleMomentVector
    frontier_indices: FrontierOrbitalIndices
    atomic_populations: List[AtomicPopulation]
    molecular_orbitals: List[MolecularOrbitalLevel]
    scf_history: List[ScfIterationRecord]
    atoms: List[AtomCoordinate]

