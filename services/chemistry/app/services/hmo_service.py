"""
High-Precision Hückel Molecular Orbital (HMO) Theory Secular Determinant Solver.
Implements:
- Symmetric Secular Hamiltonian Matrix Construction
- Self-Contained Jacobi Matrix Diagonalization for Eigenvalues & Eigenvectors
- Electron Aufbau Configuration (Pauli Exclusion & Hund's Rule)
- HOMO, LUMO, and SOMO Identification with HOMO-LUMO Gap (eV & nm)
- Pi-Bond Order Matrix (p_rs) and Net Atomic Charge Densities (zeta_r)
- Aromaticity Classification (Hückel 4n+2 / Baird 4n Rules)
"""

import math
from typing import List, Dict, Tuple, Optional
from app.models.quantum_chemistry import (
    AromaticityType,
    OrbitalSymmetry,
    MolecularOrbitalLevel,
    ConjugatedAtom,
    ConjugatedBond,
    HmoCalculationResult,
    ConjugatedSystemPreset,
)

PLANCK_CONSTANT_EV_S = 4.135667696e-15
SPEED_OF_LIGHT_NM_S = 2.99792458e17  # nm / s
HC_EV_NM = 1239.84193  # h * c in eV * nm

CONJUGATED_PRESETS: Dict[str, ConjugatedSystemPreset] = {
    "ethylene": ConjugatedSystemPreset(
        id="ethylene",
        name="Ethylene (Ethene)",
        formula="C2H4",
        description="Simplest conjugated pi-system consisting of two sp2 hybridized carbon atoms.",
        expected_aromaticity=AromaticityType.NON_AROMATIC,
        is_cyclic=False,
        pedagogical_notes="Two molecular orbitals: bonding psi_1 (m = +1.0) and antibonding psi_2* (m = -1.0). HOMO-LUMO gap of 2.0|beta| yields a deep UV pi->pi* transition.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.35, 0.50, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.65, 0.50, huckel_h=0.0, pi_electron_contribution=1),
        ],
        bonds=[ConjugatedBond(0, 1, 1.0)],
    ),
    "1_3_butadiene": ConjugatedSystemPreset(
        id="1_3_butadiene",
        name="1,3-Butadiene (s-trans)",
        formula="C4H6",
        description="Archetype conjugated diene demonstrating pi-electron delocalization across four carbon centers.",
        expected_aromaticity=AromaticityType.NON_AROMATIC,
        is_cyclic=False,
        pedagogical_notes="Four pi-electrons occupying psi_1 and psi_2. Total energy E_pi = 4*alpha + 4.472*beta gives a resonance delocalization energy of 0.472|beta| (~15 kcal/mol) compared to two isolated ethylenes.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.20, 0.40, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.40, 0.60, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.60, 0.40, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(3, "C", "C4", 0.80, 0.60, huckel_h=0.0, pi_electron_contribution=1),
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 2, 1.0),
            ConjugatedBond(2, 3, 1.0),
        ],
    ),
    "benzene": ConjugatedSystemPreset(
        id="benzene",
        name="Benzene (Aromatic D6h)",
        formula="C6H6",
        description="Classic aromatic benchmark with 6 pi-electrons in a closed-shell planar ring.",
        expected_aromaticity=AromaticityType.AROMATIC,
        is_cyclic=True,
        pedagogical_notes="Degenerate orbital pairs at m = +1.0 (bonding) and m = -1.0 (antibonding). Delocalization energy of 2.00|beta| (~150 kJ/mol) provides enormous resonance stabilization, rendering benzene resistant to addition reactions.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.50, 0.20, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.72, 0.35, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.72, 0.65, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(3, "C", "C4", 0.50, 0.80, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(4, "C", "C5", 0.28, 0.65, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(5, "C", "C6", 0.28, 0.35, huckel_h=0.0, pi_electron_contribution=1),
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 2, 1.0),
            ConjugatedBond(2, 3, 1.0),
            ConjugatedBond(3, 4, 1.0),
            ConjugatedBond(4, 5, 1.0),
            ConjugatedBond(5, 0, 1.0),
        ],
    ),
    "cyclobutadiene": ConjugatedSystemPreset(
        id="cyclobutadiene",
        name="Cyclobutadiene (Anti-aromatic D4h)",
        formula="C4H4",
        description="Textbook 4n anti-aromatic ring exhibiting degenerate non-bonding orbitals.",
        expected_aromaticity=AromaticityType.ANTI_AROMATIC,
        is_cyclic=True,
        pedagogical_notes="Hückel secular solution yields energy levels at +2.0, 0.0, 0.0, -2.0. The non-bonding zero-energy levels are singly occupied by two electrons with parallel spins according to Hund's rule, producing an open-shell triplet biradical.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.35, 0.35, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.65, 0.35, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.65, 0.65, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(3, "C", "C4", 0.35, 0.65, huckel_h=0.0, pi_electron_contribution=1),
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 2, 1.0),
            ConjugatedBond(2, 3, 1.0),
            ConjugatedBond(3, 0, 1.0),
        ],
    ),
    "allyl_cation": ConjugatedSystemPreset(
        id="allyl_cation",
        name="Allyl Cation",
        formula="C3H5+",
        description="Three-center two-electron delocalized carbocation system.",
        expected_aromaticity=AromaticityType.NON_AROMATIC,
        is_cyclic=False,
        pedagogical_notes="HMO levels at +sqrt(2), 0.0, -sqrt(2). Two electrons fill psi_1, leaving non-bonding psi_2 empty. The positive charge (+0.50) is evenly distributed between terminal carbons C1 and C3.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.25, 0.45, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.50, 0.60, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.75, 0.45, huckel_h=0.0, pi_electron_contribution=0),  # Net cation
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 2, 1.0),
        ],
    ),
    "cyclopentadienyl_anion": ConjugatedSystemPreset(
        id="cyclopentadienyl_anion",
        name="Cyclopentadienyl Anion (Cp-)",
        formula="C5H5-",
        description="Aromatic 5-membered cyclic carbanion with 6 pi-electrons obeying Hückel's 4n+2 rule.",
        expected_aromaticity=AromaticityType.AROMATIC,
        is_cyclic=True,
        pedagogical_notes="Closed-shell configuration with 6 pi-electrons filling psi_1, psi_2, and psi_3. Net negative charge (-0.20 per carbon) is completely symmetrically delocalized, forming stable metallocene complexes like ferrocene.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.50, 0.20, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.75, 0.40, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.65, 0.75, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(3, "C", "C4", 0.35, 0.75, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(4, "C", "C5", 0.25, 0.40, huckel_h=0.0, pi_electron_contribution=2),  # Extra electron
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 2, 1.0),
            ConjugatedBond(2, 3, 1.0),
            ConjugatedBond(3, 4, 1.0),
            ConjugatedBond(4, 0, 1.0),
        ],
    ),
    "naphthalene": ConjugatedSystemPreset(
        id="naphthalene",
        name="Naphthalene (Bicyclic Aromatic)",
        formula="C10H8",
        description="Fused bicyclic 10-pi aromatic hydrocarbon exhibiting non-equivalent alpha and beta positions.",
        expected_aromaticity=AromaticityType.AROMATIC,
        is_cyclic=True,
        pedagogical_notes="10 pi-electrons in a closed-shell aromatic system. Bond order calculations predict shorter C1-C2 bonds (0.725) compared to C2-C3 bonds (0.603), explaining electrophilic substitution preference at alpha positions.",
        atoms=[
            ConjugatedAtom(0, "C", "C1", 0.25, 0.35, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(1, "C", "C2", 0.40, 0.25, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(2, "C", "C3", 0.60, 0.25, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(3, "C", "C4", 0.75, 0.35, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(4, "C", "C4a", 0.75, 0.65, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(5, "C", "C5", 0.60, 0.75, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(6, "C", "C6", 0.40, 0.75, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(7, "C", "C7", 0.25, 0.65, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(8, "C", "C8a", 0.40, 0.50, huckel_h=0.0, pi_electron_contribution=1),
            ConjugatedAtom(9, "C", "C8b", 0.60, 0.50, huckel_h=0.0, pi_electron_contribution=1),
        ],
        bonds=[
            ConjugatedBond(0, 1, 1.0),
            ConjugatedBond(1, 8, 1.0),
            ConjugatedBond(8, 7, 1.0),
            ConjugatedBond(7, 6, 1.0),
            ConjugatedBond(6, 8, 1.0),
            ConjugatedBond(8, 9, 1.0),
            ConjugatedBond(9, 2, 1.0),
            ConjugatedBond(2, 3, 1.0),
            ConjugatedBond(3, 4, 1.0),
            ConjugatedBond(4, 5, 1.0),
            ConjugatedBond(5, 9, 1.0),
        ],
    ),
}


class HmoService:
    """Analytical service for solving Hückel Molecular Orbital secular determinants."""

    @staticmethod
    def get_presets() -> List[ConjugatedSystemPreset]:
        return list(CONJUGATED_PRESETS.values())

    @staticmethod
    def get_preset_by_id(preset_id: str) -> Optional[ConjugatedSystemPreset]:
        return CONJUGATED_PRESETS.get(preset_id.lower().strip())

    @staticmethod
    def jacobi_eigen_solver(
        matrix: List[List[float]], max_iterations: int = 150, tolerance: float = 1e-10
    ) -> Tuple[List[float], List[List[float]]]:
        """
        Pure-Python Jacobi matrix diagonalization algorithm for real symmetric matrices.
        Returns:
            eigenvalues: List[float]
            eigenvectors: List[List[float]] where col k is the kth eigenvector.
        """
        n = len(matrix)
        # Deep copy matrix A
        A = [row[:] for row in matrix]
        # Identity matrix for eigenvectors V
        V = [[1.0 if i == j else 0.0 for j in range(n)] for i in range(n)]

        for _ in range(max_iterations):
            # Find largest off-diagonal element
            max_val = 0.0
            p, q = 0, 1
            for i in range(n):
                for j in range(i + 1, n):
                    if abs(A[i][j]) > max_val:
                        max_val = abs(A[i][j])
                        p, q = i, j

            if max_val < tolerance:
                break

            # Compute rotation angle theta
            app = A[p][p]
            aqq = A[q][q]
            apq = A[p][q]

            if abs(app - aqq) < 1e-14:
                theta = math.pi / 4.0 if apq > 0 else -math.pi / 4.0
            else:
                tau = (app - aqq) / (2.0 * apq)
                t = (math.sqrt(1.0 + tau**2) - abs(tau)) * (1.0 if tau >= 0 else -1.0)
                theta = math.atan(t)

            c = math.cos(theta)
            s = math.sin(theta)

            # Update A matrix elements
            A_pp = c * c * app + s * s * aqq + 2.0 * s * c * apq
            A_qq = s * s * app + c * c * aqq - 2.0 * s * c * apq
            A[p][p] = A_pp
            A[q][q] = A_qq
            A[p][q] = 0.0
            A[q][p] = 0.0

            for i in range(n):
                if i != p and i != q:
                    a_ip = A[i][p]
                    a_iq = A[i][q]
                    A[i][p] = c * a_ip + s * a_iq
                    A[p][i] = A[i][p]
                    A[i][q] = -s * a_ip + c * a_iq
                    A[q][i] = A[i][q]

            # Update eigenvector matrix V
            for i in range(n):
                v_ip = V[i][p]
                v_iq = V[i][q]
                V[i][p] = c * v_ip + s * v_iq
                V[i][q] = -s * v_ip + c * v_iq

        eigenvalues = [A[i][i] for i in range(n)]
        # Eigenvectors are columns of V
        eigenvectors = [[V[i][col] for i in range(n)] for col in range(n)]

        return eigenvalues, eigenvectors

    @classmethod
    def calculate_hmo(
        cls,
        preset_id: Optional[str] = None,
        custom_atoms: Optional[List[ConjugatedAtom]] = None,
        custom_bonds: Optional[List[ConjugatedBond]] = None,
        beta_value_ev: float = -2.70,
    ) -> HmoCalculationResult:
        """
        Solves Hückel Molecular Orbital secular equation:
        det(H - E*S) = 0
        """
        preset = cls.get_preset_by_id(preset_id) if preset_id else None

        if preset:
            m_id = preset.id
            m_name = preset.name
            formula = preset.formula
            atoms = preset.atoms
            bonds = preset.bonds
            is_cyclic = preset.is_cyclic
        else:
            m_id = "custom"
            m_name = "Custom Conjugated System"
            formula = "CxHy"
            atoms = custom_atoms or [
                ConjugatedAtom(0, "C", "C1", 0.35, 0.5),
                ConjugatedAtom(1, "C", "C2", 0.65, 0.5),
            ]
            bonds = custom_bonds or [ConjugatedBond(0, 1, 1.0)]
            is_cyclic = any(b.atom_i == 0 and b.atom_j == len(atoms) - 1 for b in bonds)

        n = len(atoms)
        total_pi_electrons = sum(a.pi_electron_contribution for a in atoms)

        # Build Secular Hamiltonian Matrix H in units of beta (alpha = 0, beta = 1)
        H = [[0.0 for _ in range(n)] for _ in range(n)]

        for atom in atoms:
            H[atom.atom_id][atom.atom_id] = atom.huckel_h

        for bond in bonds:
            i, j = bond.atom_i, bond.atom_j
            if 0 <= i < n and 0 <= j < n:
                H[i][j] = bond.huckel_k
                H[j][i] = bond.huckel_k

        # Diagonalize H to obtain eigenvalues m_k and eigenvectors c_k
        raw_eigenvals, raw_eigenvecs = cls.jacobi_eigen_solver(H)

        # Combine into orbital pairs and sort descending by m_k
        # (Since beta < 0, larger m_k corresponds to lower/more bonding physical energy)
        paired_orbitals = []
        for val, vec in zip(raw_eigenvals, raw_eigenvecs):
            # Count sign flips across vector for nodal planes
            sign_flips = 0
            prev_sign = 0
            for c_val in vec:
                if abs(c_val) > 1e-4:
                    curr_sign = 1 if c_val > 0 else -1
                    if prev_sign != 0 and curr_sign != prev_sign:
                        sign_flips += 1
                    prev_sign = curr_sign

            paired_orbitals.append(
                {
                    "m": val,
                    "vec": vec,
                    "nodal_planes": sign_flips,
                }
            )

        # Sort descending: bonding (highest m) to antibonding (lowest m)
        paired_orbitals.sort(key=lambda x: x["m"], reverse=True)

        # Aufbau Electron Filling
        remaining_electrons = total_pi_electrons
        levels: List[MolecularOrbitalLevel] = []

        # Find degeneracy groups to apply Hund's rule
        i = 0
        while i < len(paired_orbitals):
            # Detect degenerate shell
            group = [i]
            while (
                i + 1 < len(paired_orbitals)
                and abs(paired_orbitals[i + 1]["m"] - paired_orbitals[i]["m"]) < 1e-4
            ):
                group.append(i + 1)
                i += 1

            deg_count = len(group)
            if remaining_electrons >= deg_count * 2:
                # Fully fill degenerate shell (2 per orbital)
                for g_idx in group:
                    paired_orbitals[g_idx]["occupancy"] = 2
                remaining_electrons -= deg_count * 2
            elif remaining_electrons >= deg_count:
                # Singly fill degenerate shell (Hund's rule)
                extra = remaining_electrons - deg_count
                for idx_in_grp, g_idx in enumerate(group):
                    paired_orbitals[g_idx]["occupancy"] = 2 if idx_in_grp < extra else 1
                remaining_electrons = 0
            else:
                # Partially singly fill
                for idx_in_grp, g_idx in enumerate(group):
                    paired_orbitals[g_idx]["occupancy"] = 1 if idx_in_grp < remaining_electrons else 0
                remaining_electrons = 0

            i += 1

        # Identify HOMO and LUMO
        occupied_indices = [idx for idx, o in enumerate(paired_orbitals) if o.get("occupancy", 0) > 0]
        unoccupied_indices = [idx for idx, o in enumerate(paired_orbitals) if o.get("occupancy", 0) == 0]

        homo_idx = occupied_indices[-1] if occupied_indices else 0
        lumo_idx = unoccupied_indices[0] if unoccupied_indices else None

        total_pi_energy = sum(o["occupancy"] * o["m"] for o in paired_orbitals)

        # Build output orbital models
        for idx, o in enumerate(paired_orbitals):
            is_homo = idx == homo_idx
            is_lumo = lumo_idx is not None and idx == lumo_idx
            is_somo = o.get("occupancy", 0) == 1
            # E = alpha + m*beta. Taking alpha = 0, E = m * beta (eV)
            energy_ev = round(o["m"] * beta_value_ev, 3)

            # Symmetry classification
            m_val = round(o["m"], 4)
            if any(
                idx != other_idx and abs(m_val - round(paired_orbitals[other_idx]["m"], 4)) < 1e-4
                for other_idx in range(len(paired_orbitals))
            ):
                symm = OrbitalSymmetry.DEGENERATE
            elif o["nodal_planes"] % 2 == 0:
                symm = OrbitalSymmetry.SYMMETRIC
            else:
                symm = OrbitalSymmetry.ANTISYMMETRIC

            label = f"psi_{idx + 1}"
            if m_val < -1e-4:
                label += "*"  # Antibonding

            levels.append(
                MolecularOrbitalLevel(
                    index=idx + 1,
                    energy_coefficient_m=round(o["m"], 4),
                    energy_ev=energy_ev,
                    electron_occupancy=o.get("occupancy", 0),
                    is_homo=is_homo,
                    is_lumo=is_lumo,
                    is_singly_occupied=is_somo,
                    orbital_symmetry=symm,
                    nodal_planes_count=o["nodal_planes"],
                    coefficients=[round(c, 4) for c in o["vec"]],
                    label=label,
                )
            )

        # HOMO-LUMO Gap
        if lumo_idx is not None:
            gap_beta = round(paired_orbitals[homo_idx]["m"] - paired_orbitals[lumo_idx]["m"], 4)
            gap_ev = round(gap_beta * abs(beta_value_ev), 3)
            # lambda = hc / Delta_E
            uv_lambda = round(HC_EV_NM / gap_ev, 1) if gap_ev > 0.1 else 999.0
        else:
            gap_beta = 0.0
            gap_ev = 0.0
            uv_lambda = 0.0

        # Delocalization Energy E_deloc = E_pi - 2 * n_double * beta
        n_isolated_double = total_pi_electrons // 2
        localized_energy = 2.0 * n_isolated_double
        deloc_beta = max(0.0, round(total_pi_energy - localized_energy, 4))
        deloc_ev = round(deloc_beta * abs(beta_value_ev), 3)

        # Aromaticity classification
        if is_cyclic and total_pi_electrons >= 4:
            # Hückel 4n + 2 rule
            if (total_pi_electrons - 2) % 4 == 0 and deloc_beta > 0.5:
                aromaticity = AromaticityType.AROMATIC
            elif total_pi_electrons % 4 == 0:
                aromaticity = AromaticityType.ANTI_AROMATIC
            else:
                aromaticity = AromaticityType.NON_AROMATIC
        else:
            aromaticity = AromaticityType.NON_AROMATIC

        # Calculate Atomic Electron Densities (q_r) and Net Charges (zeta_r = 1 - q_r)
        q_densities = [0.0] * n
        for o in paired_orbitals:
            occ = o.get("occupancy", 0)
            vec = o["vec"]
            for r in range(n):
                q_densities[r] += occ * (vec[r] ** 2)

        atomic_charges = [
            round(atoms[r].pi_electron_contribution - q_densities[r], 4) for r in range(n)
        ]
        q_densities = [round(val, 4) for val in q_densities]

        # Calculate Pi-Bond Order Matrix: p_rs = sum_k n_k * c_kr * c_ks
        bond_orders = [[0.0 for _ in range(n)] for _ in range(n)]
        for r in range(n):
            for s in range(n):
                val = sum(o.get("occupancy", 0) * o["vec"][r] * o["vec"][s] for o in paired_orbitals)
                bond_orders[r][s] = round(val, 4)

        is_closed_shell = all(o.get("occupancy", 0) in (0, 2) for o in paired_orbitals)

        return HmoCalculationResult(
            molecule_id=m_id,
            molecule_name=m_name,
            chemical_formula=formula,
            atom_count=n,
            pi_electron_count=total_pi_electrons,
            total_pi_energy_units=round(total_pi_energy, 4),
            delocalization_energy_beta=deloc_beta,
            delocalization_energy_ev=deloc_ev,
            homo_lumo_gap_beta=gap_beta,
            homo_lumo_gap_ev=gap_ev,
            predicted_uv_lambda_nm=uv_lambda,
            aromaticity_classification=aromaticity,
            is_closed_shell=is_closed_shell,
            orbitals=levels,
            atomic_charges=atomic_charges,
            atomic_electron_densities=q_densities,
            bond_orders=bond_orders,
            atoms=atoms,
            bonds=bonds,
        )
