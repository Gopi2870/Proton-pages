"""
Semi-Empirical Quantum Chemistry Engine (PR #057).
Implements Dewar MNDO, AM1, and Stewart PM3 NDDO Hamiltonians:
- STO valence basis overlap with analytical directional rotation (Roothaan 1951)
- Klopman-Ohno screened two-center electron repulsion
- Dewar core-core repulsion with AM1/PM3 Gaussian corrections
- Restricted Hartree-Fock (RHF) Roothaan equations with Pulay DIIS acceleration
- Heat of formation with exact reference atom valence baselines
- Mulliken population, hybridization dipole, and conceptual DFT indices
- Curated presets and 1D potential energy surface (PES) coordinate scanning
"""
import math
from typing import Dict, List, Optional, Tuple
import numpy as np
import scipy.linalg

from app.models.semi_empirical import (
    AtomCoordinate,
    AtomicBasisFunction,
    AtomicPopulation,
    DipoleMomentVector,
    ElementParameters,
    FrontierOrbitalIndices,
    MolecularOrbitalLevel,
    OrbitalType,
    PesScanPoint,
    ScfIterationRecord,
    SemiEmpiricalCalculationResult,
    SemiEmpiricalMethod,
    SemiEmpiricalPresetMolecule,
)
from app.services.semi_empirical_parameters import (
    ANGSTROM_TO_BOHR,
    BOHR_TO_ANGSTROM,
    EV_TO_KCAL_MOL,
    PARAMETERS_BY_METHOD,
    PRESET_MOLECULES,
)

COULOMB_CONSTANT_EV_ANGSTROM = 14.399645
DEBYE_PER_E_ANGSTROM = 4.803204


def _aux_a(k: int, p: float) -> float:
    """Auxiliary A_k(p) = integral_1^inf x^k * exp(-p*x) dx."""
    if p < 1e-12:
        return 1e6
    exp_p = math.exp(-p)
    if k == 0:
        return exp_p / p
    elif k == 1:
        return exp_p * (1.0 / p + 1.0 / (p * p))
    elif k == 2:
        return exp_p * (1.0 / p + 2.0 / (p * p) + 2.0 / (p**3))
    elif k == 3:
        return exp_p * (1.0 / p + 3.0 / (p * p) + 6.0 / (p**3) + 6.0 / (p**4))
    elif k == 4:
        return exp_p * (1.0 / p + 4.0 / (p * p) + 12.0 / (p**3) + 24.0 / (p**4) + 24.0 / (p**5))
    else:
        return (exp_p + k * _aux_a(k - 1, p)) / p


def _aux_b(k: int, alpha: float) -> float:
    """Auxiliary B_k(alpha) = integral_-1^1 x^k * exp(-alpha*x) dx."""
    if abs(alpha) < 1e-7:
        return 2.0 / (k + 1) if (k % 2 == 0) else 0.0
    if k == 0:
        return (math.exp(alpha) - math.exp(-alpha)) / alpha
    elif k == 1:
        return ((alpha - 1.0) * math.exp(alpha) + (alpha + 1.0) * math.exp(-alpha)) / (alpha * alpha)
    elif k == 2:
        return ((alpha * alpha - 2.0 * alpha + 2.0) * math.exp(alpha) - (alpha * alpha + 2.0 * alpha + 2.0) * math.exp(-alpha)) / (alpha**3)
    elif k == 3:
        return ((alpha**3 - 3.0 * alpha**2 + 6.0 * alpha - 6.0) * math.exp(alpha) + (alpha**3 + 3.0 * alpha**2 + 6.0 * alpha + 6.0) * math.exp(-alpha)) / (alpha**4)
    elif k == 4:
        return ((alpha**4 - 4.0 * alpha**3 + 12.0 * alpha**2 - 24.0 * alpha + 24.0) * math.exp(alpha) - (alpha**4 + 4.0 * alpha**3 + 12.0 * alpha**2 + 24.0 * alpha + 24.0) * math.exp(-alpha)) / (alpha**5)
    else:
        return (-math.exp(-alpha) + ((-1) ** k) * math.exp(alpha) + k * _aux_b(k - 1, alpha)) / alpha


def _sto_overlap_1s_1s(zeta_a: float, zeta_b: float, r_angstrom: float) -> float:
    """Overlap between two 1s Slater orbitals separated by r in Angstroms."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 1.0 if abs(zeta_a - zeta_b) < 1e-5 else 0.0
    p = 0.5 * (zeta_a + zeta_b) * r_bohr
    t = (zeta_a - zeta_b) / (zeta_a + zeta_b)
    if abs(t) < 1e-6:
        return math.exp(-p) * (1.0 + p + p * p / 3.0)
    pt = p * t
    prefactor = 0.5 * ((1.0 - t * t) ** 1.5) * (p ** 3)
    val = prefactor * (_aux_a(2, p) * _aux_b(0, pt) - _aux_a(0, p) * _aux_b(2, pt))
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_1s_2s(zeta_1s: float, zeta_2s: float, r_angstrom: float) -> float:
    """Overlap between 1s on center A and 2s on center B (Roothaan 1951 Table I)."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 0.0
    p = 0.5 * (zeta_1s + zeta_2s) * r_bohr
    t = (zeta_1s - zeta_2s) / (zeta_1s + zeta_2s)
    pt = p * t
    prefactor = (1.0 / (8.0 * math.sqrt(3.0))) * ((1.0 + t) ** 1.5) * ((1.0 - t) ** 2.5) * (p ** 4)
    val = prefactor * (
        _aux_a(3, p) * _aux_b(0, pt)
        - _aux_a(2, p) * _aux_b(1, pt)
        - _aux_a(1, p) * _aux_b(2, pt)
        + _aux_a(0, p) * _aux_b(3, pt)
    )
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_1s_2p_sigma(zeta_1s: float, zeta_2p: float, r_angstrom: float) -> float:
    """Overlap between 1s on center A and 2p_sigma on center B pointing along +z."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 0.0
    p = 0.5 * (zeta_1s + zeta_2p) * r_bohr
    t = (zeta_1s - zeta_2p) / (zeta_1s + zeta_2p)
    pt = p * t
    prefactor = (1.0 / 8.0) * ((1.0 + t) ** 1.5) * ((1.0 - t) ** 2.5) * (p ** 4)
    val = prefactor * (
        -_aux_a(2, p) * _aux_b(0, pt)
        + _aux_a(0, p) * _aux_b(2, pt)
        + _aux_a(3, p) * _aux_b(1, pt)
        - _aux_a(1, p) * _aux_b(3, pt)
    )
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_2s_2s(zeta_a: float, zeta_b: float, r_angstrom: float) -> float:
    """Overlap between 2s on center A and 2s on center B (Roothaan 1951 Table I)."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 1.0 if abs(zeta_a - zeta_b) < 1e-5 else 0.0
    p = 0.5 * (zeta_a + zeta_b) * r_bohr
    t = (zeta_a - zeta_b) / (zeta_a + zeta_b)
    pt = p * t
    prefactor = (1.0 / 48.0) * ((1.0 - t * t) ** 2.5) * (p ** 5)
    val = prefactor * (
        _aux_a(4, p) * _aux_b(0, pt)
        - 2.0 * _aux_a(2, p) * _aux_b(2, pt)
        + _aux_a(0, p) * _aux_b(4, pt)
    )
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_2s_2p_sigma(zeta_2s: float, zeta_2p: float, r_angstrom: float) -> float:
    """Overlap between 2s on center A and 2p_sigma on center B pointing along +z."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 0.0
    p = 0.5 * (zeta_2s + zeta_2p) * r_bohr
    t = (zeta_2s - zeta_2p) / (zeta_2s + zeta_2p)
    pt = p * t
    prefactor = (math.sqrt(3.0) / 48.0) * ((1.0 - t * t) ** 2.5) * (p ** 5)
    val = prefactor * (
        -_aux_a(3, p) * _aux_b(0, pt)
        + _aux_a(1, p) * _aux_b(2, pt)
        + _aux_a(4, p) * _aux_b(1, pt)
        - _aux_a(2, p) * _aux_b(3, pt)
    )
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_2p_2p_sigma(zeta_a: float, zeta_b: float, r_angstrom: float) -> float:
    """Overlap between 2p_sigma on A and 2p_sigma on B pointing head-to-head along +z."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return -1.0 if abs(zeta_a - zeta_b) < 1e-5 else 0.0
    p = 0.5 * (zeta_a + zeta_b) * r_bohr
    t = (zeta_a - zeta_b) / (zeta_a + zeta_b)
    pt = p * t
    prefactor = (1.0 / 32.0) * ((1.0 - t * t) ** 2.5) * (p ** 5)
    val = -prefactor * (
        _aux_a(4, p) * (_aux_b(0, pt) - _aux_b(2, pt))
        - _aux_a(2, p) * (_aux_b(0, pt) - 2.0 * _aux_b(2, pt) + _aux_b(4, pt))
        + _aux_a(0, p) * (_aux_b(2, pt) - _aux_b(4, pt))
    )
    return float(np.clip(val, -1.0, 1.0))


def _sto_overlap_2p_2p_pi(zeta_a: float, zeta_b: float, r_angstrom: float) -> float:
    """Overlap between 2p_pi on A and 2p_pi on B perpendicular to internuclear axis."""
    r_bohr = r_angstrom * ANGSTROM_TO_BOHR
    if r_bohr < 1e-6:
        return 1.0 if abs(zeta_a - zeta_b) < 1e-5 else 0.0
    p = 0.5 * (zeta_a + zeta_b) * r_bohr
    t = (zeta_a - zeta_b) / (zeta_a + zeta_b)
    pt = p * t
    prefactor = (1.0 / 32.0) * ((1.0 - t * t) ** 2.5) * (p ** 5)
    val = prefactor * (
        (_aux_a(4, p) - _aux_a(2, p)) * (_aux_b(0, pt) - _aux_b(2, pt))
        - (_aux_a(2, p) - _aux_a(0, p)) * (_aux_b(2, pt) - _aux_b(4, pt))
    )
    return float(np.clip(val, -1.0, 1.0))


class SemiEmpiricalEngine:
    """
    Core Semi-Empirical Quantum Chemistry Engine.
    Implements MNDO, AM1, and PM3 NDDO SCF solvers.
    """

    @staticmethod
    def get_preset_molecules() -> List[SemiEmpiricalPresetMolecule]:
        return list(PRESET_MOLECULES.values())

    @staticmethod
    def get_preset_by_id(preset_id: str) -> Optional[SemiEmpiricalPresetMolecule]:
        return PRESET_MOLECULES.get(preset_id)

    @staticmethod
    def get_parameters_for_method(method: SemiEmpiricalMethod) -> Dict[str, ElementParameters]:
        return PARAMETERS_BY_METHOD[method]

    @classmethod
    def calculate_isolated_atom_energy(cls, ep: ElementParameters) -> float:
        """
        Computes the theoretical electronic energy of an isolated neutral atom (in eV)
        using the spherically-averaged valence configuration.
        """
        sym = ep.symbol
        z = ep.valence_charge
        if sym == "H":
            return ep.u_ss

        p_ss = 2.0
        p_p_each = (z - 2.0) / 3.0
        g_ss = ep.g_ss
        g_sp = ep.g_sp
        h_sp = ep.h_sp
        g_pp = ep.g_pp
        g_p2 = ep.g_p2
        h_pp = 0.5 * (g_pp - g_p2)

        f_ss = ep.u_ss + 0.5 * p_ss * g_ss + 3.0 * p_p_each * (g_sp - 0.5 * h_sp)
        f_pp = ep.u_pp + p_ss * (g_sp - 0.5 * h_sp) + 0.5 * p_p_each * g_pp + 2.0 * p_p_each * (g_p2 - 0.5 * h_pp)

        return 0.5 * (p_ss * (ep.u_ss + f_ss) + 3.0 * p_p_each * (ep.u_pp + f_pp))

    @staticmethod
    def build_basis(
        atoms: List[AtomCoordinate],
        method: SemiEmpiricalMethod,
    ) -> Tuple[List[AtomicBasisFunction], int]:
        params = PARAMETERS_BY_METHOD[method]
        basis: List[AtomicBasisFunction] = []
        total_valence_electrons = 0
        b_idx = 0

        for atom in atoms:
            sym = atom.symbol.strip().capitalize()
            if sym not in params:
                raise ValueError(f"Element '{sym}' is not parameterized for method '{method.value}'.")
            ep = params[sym]
            total_valence_electrons += ep.valence_charge

            if sym == "H":
                basis.append(
                    AtomicBasisFunction(
                        index=b_idx,
                        atom_index=atom.index,
                        symbol=sym,
                        orbital_type=OrbitalType.S,
                        zeta=ep.zeta_s,
                    )
                )
                b_idx += 1
            else:
                for o_type, zeta in [
                    (OrbitalType.S, ep.zeta_s),
                    (OrbitalType.PX, ep.zeta_p),
                    (OrbitalType.PY, ep.zeta_p),
                    (OrbitalType.PZ, ep.zeta_p),
                ]:
                    basis.append(
                        AtomicBasisFunction(
                            index=b_idx,
                            atom_index=atom.index,
                            symbol=sym,
                            orbital_type=o_type,
                            zeta=zeta,
                        )
                    )
                    b_idx += 1

        return basis, total_valence_electrons

    @staticmethod
    def calculate_distance_matrix(atoms: List[AtomCoordinate]) -> np.ndarray:
        n = len(atoms)
        d = np.zeros((n, n))
        for i in range(n):
            for j in range(i + 1, n):
                dx = atoms[i].x - atoms[j].x
                dy = atoms[i].y - atoms[j].y
                dz = atoms[i].z - atoms[j].z
                dist = math.sqrt(dx * dx + dy * dy + dz * dz)
                d[i, j] = dist
                d[j, i] = dist
        return d

    @classmethod
    def calculate_overlap_matrix(
        cls,
        atoms: List[AtomCoordinate],
        basis: List[AtomicBasisFunction],
    ) -> np.ndarray:
        n_basis = len(basis)
        s_mat = np.eye(n_basis)
        atom_coords = {a.index: np.array([a.x, a.y, a.z]) for a in atoms}

        for i in range(n_basis):
            b_i = basis[i]
            a_idx = b_i.atom_index
            r_a = atom_coords[a_idx]

            for j in range(i + 1, n_basis):
                b_j = basis[j]
                b_idx = b_j.atom_index
                r_b = atom_coords[b_idx]

                if a_idx == b_idx:
                    s_mat[i, j] = 0.0
                    s_mat[j, i] = 0.0
                    continue

                diff = r_b - r_a
                dist = float(np.linalg.norm(diff))
                if dist < 1e-8:
                    continue
                # Direction cosines from center A towards center B
                l, m, n = diff / dist

                sym_a = b_i.symbol
                sym_b = b_j.symbol
                type_a = b_i.orbital_type
                type_b = b_j.orbital_type
                zeta_a = b_i.zeta
                zeta_b = b_j.zeta

                val = 0.0
                if sym_a == "H" and sym_b == "H":
                    val = _sto_overlap_1s_1s(zeta_a, zeta_b, dist)
                elif sym_a == "H" and sym_b != "H":
                    if type_b == OrbitalType.S:
                        val = _sto_overlap_1s_2s(zeta_a, zeta_b, dist)
                    elif type_b == OrbitalType.PX:
                        val = l * _sto_overlap_1s_2p_sigma(zeta_a, zeta_b, dist)
                    elif type_b == OrbitalType.PY:
                        val = m * _sto_overlap_1s_2p_sigma(zeta_a, zeta_b, dist)
                    elif type_b == OrbitalType.PZ:
                        val = n * _sto_overlap_1s_2p_sigma(zeta_a, zeta_b, dist)
                elif sym_a != "H" and sym_b == "H":
                    if type_a == OrbitalType.S:
                        val = _sto_overlap_1s_2s(zeta_b, zeta_a, dist)
                    elif type_a == OrbitalType.PX:
                        val = -l * _sto_overlap_1s_2p_sigma(zeta_b, zeta_a, dist)
                    elif type_a == OrbitalType.PY:
                        val = -m * _sto_overlap_1s_2p_sigma(zeta_b, zeta_a, dist)
                    elif type_a == OrbitalType.PZ:
                        val = -n * _sto_overlap_1s_2p_sigma(zeta_b, zeta_a, dist)
                else:
                    # Heavy atom - Heavy atom
                    if type_a == OrbitalType.S and type_b == OrbitalType.S:
                        val = _sto_overlap_2s_2s(zeta_a, zeta_b, dist)
                    elif type_a == OrbitalType.S and type_b != OrbitalType.S:
                        s_2s_2p = _sto_overlap_2s_2p_sigma(zeta_a, zeta_b, dist)
                        cos_b = l if type_b == OrbitalType.PX else (m if type_b == OrbitalType.PY else n)
                        val = cos_b * s_2s_2p
                    elif type_a != OrbitalType.S and type_b == OrbitalType.S:
                        s_2s_2p = _sto_overlap_2s_2p_sigma(zeta_b, zeta_a, dist)
                        cos_a = l if type_a == OrbitalType.PX else (m if type_a == OrbitalType.PY else n)
                        val = -cos_a * s_2s_2p
                    else:
                        s_sigma = _sto_overlap_2p_2p_sigma(zeta_a, zeta_b, dist)
                        s_pi = _sto_overlap_2p_2p_pi(zeta_a, zeta_b, dist)

                        cos_a = l if type_a == OrbitalType.PX else (m if type_a == OrbitalType.PY else n)
                        cos_b = l if type_b == OrbitalType.PX else (m if type_b == OrbitalType.PY else n)
                        delta_ab = 1.0 if type_a == type_b else 0.0

                        # S_sigma is negative by convention along +z, so -cos_a * cos_b * (-s_sigma) = cos_a * cos_b * s_sigma_mag
                        val = -cos_a * cos_b * s_sigma + delta_ab * s_pi

                s_mat[i, j] = val
                s_mat[j, i] = val

        return s_mat

    @classmethod
    def calculate_gamma_matrix(
        cls,
        atoms: List[AtomCoordinate],
        dist_matrix: np.ndarray,
        params: Dict[str, ElementParameters],
    ) -> np.ndarray:
        n_atoms = len(atoms)
        gamma = np.zeros((n_atoms, n_atoms))

        for i in range(n_atoms):
            sym_i = atoms[i].symbol
            g_ii = params[sym_i].g_ss
            gamma[i, i] = g_ii
            for j in range(i + 1, n_atoms):
                sym_j = atoms[j].symbol
                g_jj = params[sym_j].g_ss
                r = dist_matrix[i, j]
                r_screen = 0.5 * (COULOMB_CONSTANT_EV_ANGSTROM / g_ii + COULOMB_CONSTANT_EV_ANGSTROM / g_jj)
                g_ij = COULOMB_CONSTANT_EV_ANGSTROM / math.sqrt(r * r + r_screen * r_screen)
                gamma[i, j] = g_ij
                gamma[j, i] = g_ij

        return gamma

    @classmethod
    def calculate_core_repulsion_energy(
        cls,
        atoms: List[AtomCoordinate],
        dist_matrix: np.ndarray,
        gamma_matrix: np.ndarray,
        params: Dict[str, ElementParameters],
        method: SemiEmpiricalMethod,
    ) -> float:
        n_atoms = len(atoms)
        e_core = 0.0

        for i in range(n_atoms):
            sym_i = atoms[i].symbol
            p_i = params[sym_i]
            z_i = p_i.valence_charge
            alpha_i = p_i.alpha

            for j in range(i + 1, n_atoms):
                sym_j = atoms[j].symbol
                p_j = params[sym_j]
                z_j = p_j.valence_charge
                alpha_j = p_j.alpha
                r = dist_matrix[i, j]
                if r < 1e-6:
                    continue
                g_ij = gamma_matrix[i, j]

                # Base MNDO core-core interaction
                if method == SemiEmpiricalMethod.MNDO:
                    if (sym_i == "O" and sym_j == "H") or (sym_i == "H" and sym_j == "O"):
                        alpha_o = p_i.alpha if sym_i == "O" else p_j.alpha
                        scale = 1.0 + r * math.exp(-alpha_o * r) + math.exp(-params["H"].alpha * r)
                        e_pair = z_i * z_j * g_ij * scale
                    elif (sym_i == "N" and sym_j == "H") or (sym_i == "H" and sym_j == "N"):
                        alpha_n = p_i.alpha if sym_i == "N" else p_j.alpha
                        scale = 1.0 + r * math.exp(-alpha_n * r) + math.exp(-params["H"].alpha * r)
                        e_pair = z_i * z_j * g_ij * scale
                    else:
                        e_pair = z_i * z_j * g_ij * (1.0 + math.exp(-alpha_i * r) + math.exp(-alpha_j * r))
                else:
                    # AM1 and PM3 standard core-core function
                    e_pair = z_i * z_j * g_ij * (1.0 + math.exp(-alpha_i * r) + math.exp(-alpha_j * r))

                    # AM1/PM3 Gaussian core-core corrections (K_i in eV * Angstrom)
                    e_gauss = 0.0
                    for gc in p_i.gaussians:
                        e_gauss += gc.k * math.exp(-gc.l * ((r - gc.m) ** 2))
                    for gc in p_j.gaussians:
                        e_gauss += gc.k * math.exp(-gc.l * ((r - gc.m) ** 2))

                    e_pair += (z_i * z_j / r) * e_gauss

                e_core += e_pair

        return e_core

    @classmethod
    def assemble_core_hamiltonian(
        cls,
        atoms: List[AtomCoordinate],
        basis: List[AtomicBasisFunction],
        overlap_matrix: np.ndarray,
        gamma_matrix: np.ndarray,
        params: Dict[str, ElementParameters],
    ) -> np.ndarray:
        n_basis = len(basis)
        n_atoms = len(atoms)
        h_core = np.zeros((n_basis, n_basis))

        v_attr = np.zeros(n_atoms)
        for a_idx in range(n_atoms):
            for b_idx in range(n_atoms):
                if a_idx != b_idx:
                    sym_b = atoms[b_idx].symbol
                    z_b = params[sym_b].valence_charge
                    v_attr[a_idx] += z_b * gamma_matrix[a_idx, b_idx]

        for i in range(n_basis):
            b_i = basis[i]
            a_idx = b_i.atom_index
            sym_a = b_i.symbol
            p_a = params[sym_a]
            u_mu = p_a.u_ss if b_i.orbital_type == OrbitalType.S else p_a.u_pp
            beta_i = p_a.beta_s if b_i.orbital_type == OrbitalType.S else p_a.beta_p

            h_core[i, i] = u_mu - v_attr[a_idx]

            for j in range(i + 1, n_basis):
                b_j = basis[j]
                b_idx = b_j.atom_index
                if a_idx == b_idx:
                    h_core[i, j] = 0.0
                    h_core[j, i] = 0.0
                else:
                    sym_b = b_j.symbol
                    p_b = params[sym_b]
                    beta_j = p_b.beta_s if b_j.orbital_type == OrbitalType.S else p_b.beta_p
                    h_ij = 0.5 * (beta_i + beta_j) * overlap_matrix[i, j]
                    h_core[i, j] = h_ij
                    h_core[j, i] = h_ij

        return h_core

    @classmethod
    def assemble_fock_matrix(
        cls,
        h_core: np.ndarray,
        density_matrix: np.ndarray,
        basis: List[AtomicBasisFunction],
        gamma_matrix: np.ndarray,
        params: Dict[str, ElementParameters],
    ) -> np.ndarray:
        n_basis = len(basis)
        fock = np.copy(h_core)

        # Total valence electron population per atom
        atom_densities: Dict[int, float] = {}
        for mu in range(n_basis):
            a_idx = basis[mu].atom_index
            atom_densities[a_idx] = atom_densities.get(a_idx, 0.0) + density_matrix[mu, mu]

        for i in range(n_basis):
            b_i = basis[i]
            a_idx = b_i.atom_index
            sym_a = b_i.symbol
            p_a = params[sym_a]

            f_ii_two_center = 0.0
            for b_idx, p_b_val in atom_densities.items():
                if b_idx != a_idx:
                    f_ii_two_center += p_b_val * gamma_matrix[a_idx, b_idx]

            # One-center repulsion on atom A
            if sym_a == "H":
                f_ii_one_center = 0.5 * density_matrix[i, i] * p_a.g_ss
            else:
                g_ss = p_a.g_ss
                g_sp = p_a.g_sp
                h_sp = p_a.h_sp
                g_pp = p_a.g_pp
                g_p2 = p_a.g_p2
                h_pp = 0.5 * (g_pp - g_p2)

                # Find s and p diagonal densities on atom A
                s_mu = None
                p_mus: List[int] = []
                for mu in range(n_basis):
                    if basis[mu].atom_index == a_idx:
                        if basis[mu].orbital_type == OrbitalType.S:
                            s_mu = mu
                        else:
                            p_mus.append(mu)

                p_ss_val = density_matrix[s_mu, s_mu] if s_mu is not None else 0.0
                if b_i.orbital_type == OrbitalType.S:
                    # F_ss
                    p_p_sum = sum(density_matrix[m, m] for m in p_mus)
                    f_ii_one_center = 0.5 * density_matrix[i, i] * g_ss + p_p_sum * (g_sp - 0.5 * h_sp)
                else:
                    # F_px, F_py, or F_pz
                    other_p_sum = sum(density_matrix[m, m] for m in p_mus if m != i)
                    f_ii_one_center = (
                        0.5 * density_matrix[i, i] * g_pp
                        + p_ss_val * (g_sp - 0.5 * h_sp)
                        + other_p_sum * (g_p2 - 0.5 * h_pp)
                    )

            fock[i, i] += f_ii_one_center + f_ii_two_center

            for j in range(i + 1, n_basis):
                b_j = basis[j]
                b_idx = b_j.atom_index

                if a_idx == b_idx:
                    # One-center off-diagonal exchange term
                    h_ex = p_a.h_sp if p_a.h_sp > 0 else 2.5
                    val = density_matrix[i, j] * (1.5 * h_ex - 0.5 * p_a.g_sp)
                    fock[i, j] += val
                    fock[j, i] += val
                else:
                    # Two-center exchange term: -0.5 * P_ij * gamma_AB
                    g_ab = gamma_matrix[a_idx, b_idx]
                    val = -0.5 * density_matrix[i, j] * g_ab
                    fock[i, j] += val
                    fock[j, i] += val

        return fock

    @classmethod
    def apply_diis(
        cls,
        fock_history: List[np.ndarray],
        error_history: List[np.ndarray],
    ) -> np.ndarray:
        k = len(fock_history)
        if k < 2:
            return fock_history[-1]

        b_mat = np.zeros((k + 1, k + 1))
        for i in range(k):
            for j in range(i, k):
                b_ij = float(np.sum(error_history[i] * error_history[j]))
                b_mat[i, j] = b_ij
                b_mat[j, i] = b_ij
            b_mat[i, k] = -1.0
            b_mat[k, i] = -1.0
        b_mat[k, k] = 0.0

        rhs = np.zeros(k + 1)
        rhs[k] = -1.0

        try:
            coeffs = np.linalg.solve(b_mat, rhs)[:k]
            if np.any(np.isnan(coeffs)) or np.max(np.abs(coeffs)) > 15.0:
                return fock_history[-1]
            extrapolated_fock = np.zeros_like(fock_history[0])
            for i in range(k):
                extrapolated_fock += coeffs[i] * fock_history[i]
            return extrapolated_fock
        except np.linalg.LinAlgError:
            return fock_history[-1]

    @classmethod
    def solve(
        cls,
        atoms: List[AtomCoordinate],
        method: SemiEmpiricalMethod = SemiEmpiricalMethod.AM1,
        max_iterations: int = 60,
        energy_tolerance_ev: float = 1e-6,
        density_tolerance: float = 1e-5,
    ) -> SemiEmpiricalCalculationResult:
        if len(atoms) < 1:
            raise ValueError("Molecule must contain at least one atom.")

        params = PARAMETERS_BY_METHOD[method]
        basis, total_valence_electrons = cls.build_basis(atoms, method)
        n_basis = len(basis)

        if total_valence_electrons % 2 != 0:
            raise ValueError(
                f"Total valence electrons ({total_valence_electrons}) is odd. "
                "Only closed-shell restricted Hartree-Fock (RHF) is currently supported."
            )
        n_occ = total_valence_electrons // 2

        dist_matrix = cls.calculate_distance_matrix(atoms)
        overlap_matrix = cls.calculate_overlap_matrix(atoms, basis)
        gamma_matrix = cls.calculate_gamma_matrix(atoms, dist_matrix, params)
        core_repulsion_energy_ev = cls.calculate_core_repulsion_energy(
            atoms, dist_matrix, gamma_matrix, params, method
        )
        h_core = cls.assemble_core_hamiltonian(
            atoms, basis, overlap_matrix, gamma_matrix, params
        )

        # Initial density matrix guess: neutral isolated atom populations
        density_matrix = np.zeros((n_basis, n_basis))
        for i, b in enumerate(basis):
            sym = b.symbol
            z_a = params[sym].valence_charge
            if sym == "H":
                density_matrix[i, i] = 1.0
            else:
                if b.orbital_type == OrbitalType.S:
                    density_matrix[i, i] = 2.0
                else:
                    density_matrix[i, i] = (z_a - 2.0) / 3.0

        scf_records: List[ScfIterationRecord] = []
        fock_history: List[np.ndarray] = []
        error_history: List[np.ndarray] = []
        max_diis_dim = 6

        converged = False
        prev_total_energy = 0.0
        mo_eigenvalues = np.zeros(n_basis)
        mo_eigenvectors = np.zeros((n_basis, n_basis))
        final_elec_energy = 0.0

        for cycle in range(1, max_iterations + 1):
            fock = cls.assemble_fock_matrix(
                h_core, density_matrix, basis, gamma_matrix, params
            )

            # Error vector for DIIS: [F, P] = FP - PF
            error_vec = fock @ density_matrix - density_matrix @ fock
            error_history.append(error_vec)
            fock_history.append(fock)
            if len(error_history) > max_diis_dim:
                error_history.pop(0)
                fock_history.pop(0)

            fock_diis = cls.apply_diis(fock_history, error_history)

            # Diagonalize Fock matrix: FC = C epsilon
            eigenvals, eigenvecs = scipy.linalg.eigh(fock_diis)
            mo_eigenvalues = eigenvals
            mo_eigenvectors = eigenvecs

            # Form new density matrix: P_mu_nu = 2 * sum_{i=1}^{n_occ} C_mu_i * C_nu_i
            c_occ = eigenvecs[:, :n_occ]
            new_density = 2.0 * (c_occ @ c_occ.T)

            # Evaluate electronic energy: 0.5 * Tr(P * (H_core + F))
            elec_energy = 0.5 * float(np.sum(new_density * (h_core + fock)))
            total_energy = elec_energy + core_repulsion_energy_ev
            final_elec_energy = elec_energy

            energy_diff = abs(total_energy - prev_total_energy)
            max_p_diff = float(np.max(np.abs(new_density - density_matrix)))

            scf_records.append(
                ScfIterationRecord(
                    iteration=cycle,
                    electronic_energy_ev=round(elec_energy, 6),
                    total_energy_ev=round(total_energy, 6),
                    energy_change_ev=round(energy_diff, 8),
                    density_change_max=round(max_p_diff, 8),
                    diis_dimension=len(fock_history),
                )
            )

            if cycle > 1 and energy_diff < energy_tolerance_ev and max_p_diff < density_tolerance:
                converged = True
                density_matrix = new_density
                break

            density_matrix = new_density
            prev_total_energy = total_energy

        final_total_energy = final_elec_energy + core_repulsion_energy_ev

        # Calculate standard heat of formation Delta H_f (kcal/mol)
        sum_e_isol = 0.0
        sum_dhf_atoms = 0.0
        for a in atoms:
            p = params[a.symbol]
            sum_e_isol += cls.calculate_isolated_atom_energy(p)
            sum_dhf_atoms += p.heat_of_formation_atom_kcal_mol

        binding_energy_ev = final_total_energy - sum_e_isol
        heat_of_formation_kcal_mol = (binding_energy_ev * EV_TO_KCAL_MOL) + sum_dhf_atoms

        # Mulliken Population Analysis
        atomic_populations: List[AtomicPopulation] = []
        for a in atoms:
            idx = a.index
            sym = a.symbol
            z_a = params[sym].valence_charge
            s_pop = 0.0
            p_pop = 0.0

            for mu, b in enumerate(basis):
                if b.atom_index == idx:
                    pop = float(density_matrix[mu, mu])
                    if b.orbital_type == OrbitalType.S:
                        s_pop += pop
                    else:
                        p_pop += pop

            total_val_e = s_pop + p_pop
            net_charge = z_a - total_val_e
            atomic_populations.append(
                AtomicPopulation(
                    atom_index=idx,
                    symbol=sym,
                    total_valence_electrons=round(total_val_e, 4),
                    net_charge=round(net_charge, 4),
                    s_population=round(s_pop, 4),
                    p_population=round(p_pop, 4),
                )
            )

        # Dipole Moment calculation
        dx_pt, dy_pt, dz_pt = 0.0, 0.0, 0.0
        for ap in atomic_populations:
            at = atoms[ap.atom_index]
            dx_pt += ap.net_charge * at.x
            dy_pt += ap.net_charge * at.y
            dz_pt += ap.net_charge * at.z
        dx_pt *= DEBYE_PER_E_ANGSTROM
        dy_pt *= DEBYE_PER_E_ANGSTROM
        dz_pt *= DEBYE_PER_E_ANGSTROM
        pt_mag = math.sqrt(dx_pt * dx_pt + dy_pt * dy_pt + dz_pt * dz_pt)

        # Atomic hybridization (sp polarization) dipole contribution
        dx_hyb, dy_hyb, dz_hyb = 0.0, 0.0, 0.0
        for a in atoms:
            idx = a.index
            sym = a.symbol
            if sym == "H":
                continue
            zeta_sp = params[sym].zeta_s
            prefac_ang = (5.0 / (math.sqrt(3.0) * zeta_sp)) * BOHR_TO_ANGSTROM * DEBYE_PER_E_ANGSTROM

            s_idx = None
            px_idx, py_idx, pz_idx = None, None, None
            for mu, b in enumerate(basis):
                if b.atom_index == idx:
                    if b.orbital_type == OrbitalType.S:
                        s_idx = mu
                    elif b.orbital_type == OrbitalType.PX:
                        px_idx = mu
                    elif b.orbital_type == OrbitalType.PY:
                        py_idx = mu
                    elif b.orbital_type == OrbitalType.PZ:
                        pz_idx = mu

            if s_idx is not None and px_idx is not None:
                dx_hyb += -density_matrix[s_idx, px_idx] * prefac_ang
                dy_hyb += -density_matrix[s_idx, py_idx] * prefac_ang
                dz_hyb += -density_matrix[s_idx, pz_idx] * prefac_ang

        hyb_mag = math.sqrt(dx_hyb * dx_hyb + dy_hyb * dy_hyb + dz_hyb * dz_hyb)
        tot_dx = dx_pt + dx_hyb
        tot_dy = dy_pt + dy_hyb
        tot_dz = dz_pt + dz_hyb
        tot_mag = math.sqrt(tot_dx * tot_dx + tot_dy * tot_dy + tot_dz * tot_dz)

        dipole_result = DipoleMomentVector(
            dx=round(tot_dx, 4),
            dy=round(tot_dy, 4),
            dz=round(tot_dz, 4),
            magnitude=round(tot_mag, 4),
            point_charge_contribution=round(pt_mag, 4),
            hybridization_contribution=round(hyb_mag, 4),
        )

        # Molecular Orbitals and Frontier Indices
        mo_levels: List[MolecularOrbitalLevel] = []
        for idx in range(n_basis):
            occ = 2.0 if idx < n_occ else 0.0
            is_homo = idx == (n_occ - 1)
            is_lumo = idx == n_occ
            mo_levels.append(
                MolecularOrbitalLevel(
                    index=idx + 1,
                    energy_ev=round(float(mo_eigenvalues[idx]), 4),
                    occupancy=occ,
                    is_homo=is_homo,
                    is_lumo=is_lumo,
                    coefficients=[round(float(c), 4) for c in mo_eigenvectors[:, idx]],
                )
            )

        homo_energy = float(mo_eigenvalues[n_occ - 1])
        lumo_energy = float(mo_eigenvalues[n_occ]) if n_occ < n_basis else homo_energy + 10.0
        gap_ev = lumo_energy - homo_energy
        ip_ev = -homo_energy
        ea_ev = -lumo_energy
        chi_ev = (ip_ev + ea_ev) / 2.0
        hardness_ev = (ip_ev - ea_ev) / 2.0
        softness_inv = 1.0 / (2.0 * hardness_ev) if hardness_ev > 1e-4 else 0.0
        omega_ev = (chi_ev * chi_ev) / (2.0 * hardness_ev) if hardness_ev > 1e-4 else 0.0

        frontier_indices = FrontierOrbitalIndices(
            homo_energy_ev=round(homo_energy, 4),
            lumo_energy_ev=round(lumo_energy, 4),
            gap_ev=round(gap_ev, 4),
            ionization_potential_ev=round(ip_ev, 4),
            electron_affinity_ev=round(ea_ev, 4),
            electronegativity_ev=round(chi_ev, 4),
            hardness_ev=round(hardness_ev, 4),
            softness_ev_inv=round(softness_inv, 4),
            electrophilicity_index_ev=round(omega_ev, 4),
        )

        return SemiEmpiricalCalculationResult(
            method=method,
            total_atoms=len(atoms),
            total_valence_electrons=total_valence_electrons,
            number_of_basis_functions=n_basis,
            scf_converged=converged,
            scf_iterations=len(scf_records),
            electronic_energy_ev=round(final_elec_energy, 6),
            core_repulsion_energy_ev=round(core_repulsion_energy_ev, 6),
            total_energy_ev=round(final_total_energy, 6),
            heat_of_formation_kcal_mol=round(heat_of_formation_kcal_mol, 3),
            dipole_moment=dipole_result,
            frontier_indices=frontier_indices,
            atomic_populations=atomic_populations,
            molecular_orbitals=mo_levels,
            scf_history=scf_records,
            atoms=atoms,
        )

    @classmethod
    def scan_potential_energy_surface(
        cls,
        atoms: List[AtomCoordinate],
        atom_idx_1: int,
        atom_idx_2: int,
        start_distance: float,
        end_distance: float,
        steps: int = 15,
        method: SemiEmpiricalMethod = SemiEmpiricalMethod.AM1,
    ) -> List[PesScanPoint]:
        if atom_idx_1 >= len(atoms) or atom_idx_2 >= len(atoms):
            raise ValueError("Atom indices out of range for PES scan.")
        if start_distance <= 0.3 or end_distance <= start_distance or steps < 3:
            raise ValueError("Invalid distance scan bounds or steps.")

        a1 = atoms[atom_idx_1]
        a2 = atoms[atom_idx_2]
        r1 = np.array([a1.x, a1.y, a1.z])
        r2 = np.array([a2.x, a2.y, a2.z])
        diff = r2 - r1
        curr_dist = float(np.linalg.norm(diff))
        if curr_dist < 1e-4:
            unit_dir = np.array([0.0, 0.0, 1.0])
        else:
            unit_dir = diff / curr_dist

        distances = np.linspace(start_distance, end_distance, steps)
        points: List[PesScanPoint] = []
        ref_min_energy: Optional[float] = None

        for d in distances:
            scanned_atoms: List[AtomCoordinate] = []
            for a in atoms:
                if a.index == atom_idx_2:
                    new_pos = r1 + unit_dir * d
                    scanned_atoms.append(
                        AtomCoordinate(
                            index=a.index,
                            symbol=a.symbol,
                            x=round(float(new_pos[0]), 4),
                            y=round(float(new_pos[1]), 4),
                            z=round(float(new_pos[2]), 4),
                        )
                    )
                else:
                    scanned_atoms.append(a.model_copy())

            try:
                res = cls.solve(scanned_atoms, method=method, max_iterations=45)
                tot_e = res.total_energy_ev
                dhf = res.heat_of_formation_kcal_mol
                conv = res.scf_converged
            except Exception:
                tot_e = 0.0
                dhf = 0.0
                conv = False

            if conv and (ref_min_energy is None or tot_e < ref_min_energy):
                ref_min_energy = tot_e

            points.append(
                PesScanPoint(
                    coordinate_value=round(float(d), 3),
                    total_energy_ev=round(tot_e, 4),
                    relative_energy_kcal_mol=0.0,
                    heat_of_formation_kcal_mol=round(dhf, 3),
                    converged=conv,
                )
            )

        if ref_min_energy is not None:
            for p in points:
                if p.converged:
                    p.relative_energy_kcal_mol = round(
                        (p.total_energy_ev - ref_min_energy) * EV_TO_KCAL_MOL, 3
                    )

        return points
