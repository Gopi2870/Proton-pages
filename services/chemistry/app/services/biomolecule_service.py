"""
Biomolecular Structure Modeling and Protein Secondary Structure Topology Engine.
Implements PDB coordinate parsing, backbone dihedral geometry (phi, psi, omega),
Kabsch-Sander DSSP electrostatic hydrogen-bond energy calculation,
and Ramachandran conformational mapping.
"""
import math
from typing import List, Dict, Optional, Tuple, Any
from ..models.biomolecule import (
    AtomRecord,
    AminoAcidResidue,
    HydrogenBondRecord,
    SecondaryStructureType,
    RamachandranRegion,
    ProteinStructureSummary,
    ProteinStructureDetail,
)
from ..data.protein_structures import get_protein_preset_by_id, get_protein_preset_list


def vector_sub(v1: Tuple[float, float, float], v2: Tuple[float, float, float]) -> Tuple[float, float, float]:
    return (v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2])


def vector_add(v1: Tuple[float, float, float], v2: Tuple[float, float, float]) -> Tuple[float, float, float]:
    return (v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2])


def vector_scale(v: Tuple[float, float, float], s: float) -> Tuple[float, float, float]:
    return (v[0] * s, v[1] * s, v[2] * s)


def vector_dot(v1: Tuple[float, float, float], v2: Tuple[float, float, float]) -> float:
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]


def vector_cross(v1: Tuple[float, float, float], v2: Tuple[float, float, float]) -> Tuple[float, float, float]:
    return (
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
    )


def vector_norm(v: Tuple[float, float, float]) -> float:
    return math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])


def vector_normalize(v: Tuple[float, float, float]) -> Tuple[float, float, float]:
    n = vector_norm(v)
    if n < 1e-9:
        return (0.0, 0.0, 1.0)
    return (v[0] / n, v[1] / n, v[2] / n)


def euclidean_distance(p1: Tuple[float, float, float], p2: Tuple[float, float, float]) -> float:
    dx = p1[0] - p2[0]
    dy = p1[1] - p2[1]
    dz = p1[2] - p2[2]
    return math.sqrt(dx * dx + dy * dy + dz * dz)


def compute_dihedral_angle(
    p1: Tuple[float, float, float],
    p2: Tuple[float, float, float],
    p3: Tuple[float, float, float],
    p4: Tuple[float, float, float],
) -> float:
    """
    Computes dihedral angle formed by 4 points P1-P2-P3-P4 in degrees (-180 to 180).
    Uses robust cross and dot product formulation with atan2 quadrant resolution.
    """
    v1 = vector_sub(p2, p1)
    v2 = vector_sub(p3, p2)
    v3 = vector_sub(p4, p3)

    n1 = vector_cross(v1, v2)
    n2 = vector_cross(v2, v3)

    v2_unit = vector_normalize(v2)
    m1 = vector_cross(n1, v2_unit)

    x = vector_dot(n1, n2)
    y = vector_dot(m1, n2)

    deg = math.degrees(math.atan2(y, x))
    return round(deg, 2)


class BiomoleculeService:
    def __init__(self):
        pass

    def parse_pdb_text(self, pdb_content: str, calculate_dssp: bool = True) -> ProteinStructureDetail:
        """
        Parses PDB stream, extracts atoms, clusters into residues,
        computes backbone dihedrals and runs DSSP secondary structure assignment.
        """
        title = "PDB Macromolecular Structure"
        chain_atoms: Dict[str, Dict[Tuple[int, str], Dict[str, AtomRecord]]] = {}
        total_atoms = 0

        for line in pdb_content.splitlines():
            record_type = line[0:6].strip().upper()
            if record_type == "TITLE":
                title = line[10:80].strip() or title
            elif record_type in ["ATOM", "HETATM"]:
                try:
                    serial = int(line[6:11].strip())
                    atom_name = line[12:16].strip().upper()
                    alt_loc = line[16:17].strip()
                    res_name = line[17:20].strip().upper()
                    chain_id = line[21:22].strip() or "A"
                    res_seq = int(line[22:26].strip())
                    i_code = line[26:27].strip()
                    x = float(line[30:38].strip())
                    y = float(line[38:46].strip())
                    z = float(line[46:54].strip())
                    occ = float(line[54:60].strip()) if len(line) >= 60 and line[54:60].strip() else 1.0
                    b_factor = float(line[60:66].strip()) if len(line) >= 66 and line[60:66].strip() else 0.0
                    element = line[76:78].strip() if len(line) >= 78 and line[76:78].strip() else atom_name[0]
                except (ValueError, IndexError):
                    continue

                # Filter alternate locations: keep 'A' or first encountered
                if alt_loc and alt_loc not in ["A", "1", ""]:
                    continue

                atom = AtomRecord(
                    serial=serial,
                    name=atom_name,
                    alt_loc=alt_loc,
                    res_name=res_name,
                    chain_id=chain_id,
                    res_seq=res_seq,
                    i_code=i_code,
                    x=x,
                    y=y,
                    z=z,
                    occupancy=occ,
                    temp_factor=b_factor,
                    element=element,
                )

                if chain_id not in chain_atoms:
                    chain_atoms[chain_id] = {}
                res_key = (res_seq, i_code)
                if res_key not in chain_atoms[chain_id]:
                    chain_atoms[chain_id][res_key] = {}
                # Keep first atom per name
                if atom_name not in chain_atoms[chain_id][res_key]:
                    chain_atoms[chain_id][res_key][atom_name] = atom
                    total_atoms += 1

        # Build residues list
        residues: List[AminoAcidResidue] = []
        for chain_id in sorted(chain_atoms.keys()):
            res_keys = sorted(chain_atoms[chain_id].keys(), key=lambda k: k[0])
            for res_seq, i_code in res_keys:
                atoms = chain_atoms[chain_id][(res_seq, i_code)]
                # Determine standard residue name
                first_atom = next(iter(atoms.values()))
                res_name = first_atom.res_name

                n_coord = (atoms["N"].x, atoms["N"].y, atoms["N"].z) if "N" in atoms else None
                ca_coord = (atoms["CA"].x, atoms["CA"].y, atoms["CA"].z) if "CA" in atoms else None
                c_coord = (atoms["C"].x, atoms["C"].y, atoms["C"].z) if "C" in atoms else None
                o_coord = (atoms["O"].x, atoms["O"].y, atoms["O"].z) if "O" in atoms else None

                # Amide hydrogen: from file or virtual placement
                h_coord = None
                if "H" in atoms:
                    h_coord = (atoms["H"].x, atoms["H"].y, atoms["H"].z)

                residues.append(
                    AminoAcidResidue(
                        chain_id=chain_id,
                        res_seq=res_seq,
                        res_name=res_name,
                        i_code=i_code,
                        n_coord=n_coord,
                        ca_coord=ca_coord,
                        c_coord=c_coord,
                        o_coord=o_coord,
                        h_coord=h_coord,
                    )
                )

        # Compute Virtual Amide Hydrogens where missing using standard DSSP formulation
        for i, res in enumerate(residues):
            if res.h_coord is None and res.n_coord and res.ca_coord and i > 0:
                prev_res = residues[i - 1]
                if prev_res.chain_id == res.chain_id and prev_res.c_coord:
                    # Kabsch-Sander vector bisector:
                    # v1 = (N_i - C_{i-1}) / |N_i - C_{i-1}|
                    # v2 = (CA_i - N_i) / |CA_i - N_i|
                    # H_dir = normalize(v1 - v2)
                    # H = N + 1.01 * H_dir
                    v1 = vector_normalize(vector_sub(res.n_coord, prev_res.c_coord))
                    v2 = vector_normalize(vector_sub(res.ca_coord, res.n_coord))
                    h_dir = vector_normalize(vector_sub(v1, v2))
                    res.h_coord = vector_add(res.n_coord, vector_scale(h_dir, 1.01))

        # Calculate Dihedral Angles (Phi, Psi, Omega)
        for i, res in enumerate(residues):
            if not (res.n_coord and res.ca_coord and res.c_coord):
                continue

            # Phi: C_{i-1} - N_i - CA_i - C_i
            if i > 0 and residues[i - 1].chain_id == res.chain_id and residues[i - 1].c_coord:
                res.phi = compute_dihedral_angle(
                    residues[i - 1].c_coord, res.n_coord, res.ca_coord, res.c_coord
                )

            # Psi: N_i - CA_i - C_i - N_{i+1}
            if i < len(residues) - 1 and residues[i + 1].chain_id == res.chain_id and residues[i + 1].n_coord:
                res.psi = compute_dihedral_angle(
                    res.n_coord, res.ca_coord, res.c_coord, residues[i + 1].n_coord
                )

            # Omega: CA_i - C_i - N_{i+1} - CA_{i+1}
            if i < len(residues) - 1 and residues[i + 1].chain_id == res.chain_id and residues[i + 1].n_coord and residues[i + 1].ca_coord:
                res.omega = compute_dihedral_angle(
                    res.ca_coord, res.c_coord, residues[i + 1].n_coord, residues[i + 1].ca_coord
                )

            # Classify Ramachandran Region
            res.ramachandran_region = self._classify_ramachandran(res.phi, res.psi, res.res_name)

        # Calculate DSSP Hydrogen Bonds & Secondary Structure
        h_bonds: List[HydrogenBondRecord] = []
        if calculate_dssp:
            h_bonds = self._calculate_dssp_hydrogen_bonds(residues)
            self._assign_secondary_structure(residues, h_bonds)

        # Compile Summary Statistics
        total_res = len(residues)
        helix_count = sum(
            1 for r in residues if r.secondary_structure in [
                SecondaryStructureType.ALPHA_HELIX,
                SecondaryStructureType.THREE_TEN_HELIX,
                SecondaryStructureType.PI_HELIX,
            ]
        )
        sheet_count = sum(
            1 for r in residues if r.secondary_structure in [
                SecondaryStructureType.BETA_SHEET,
                SecondaryStructureType.BETA_BRIDGE,
            ]
        )
        turn_count = sum(1 for r in residues if r.secondary_structure == SecondaryStructureType.TURN)
        coil_count = total_res - (helix_count + sheet_count + turn_count)

        favored_count = sum(
            1 for r in residues if r.ramachandran_region in [
                RamachandranRegion.FAVORED_ALPHA,
                RamachandranRegion.FAVORED_BETA,
                RamachandranRegion.FAVORED_LEFT_ALPHA,
            ]
        )
        outlier_count = sum(1 for r in residues if r.ramachandran_region == RamachandranRegion.OUTLIER)

        evaluated_dihedrals = sum(1 for r in residues if r.phi is not None and r.psi is not None)

        summary = ProteinStructureSummary(
            title=title,
            chain_ids=sorted(list(chain_atoms.keys())),
            total_residues=total_res,
            total_atoms=total_atoms,
            helix_count=helix_count,
            sheet_count=sheet_count,
            turn_count=turn_count,
            coil_count=coil_count,
            helix_percentage=round((helix_count / total_res * 100.0) if total_res else 0.0, 1),
            sheet_percentage=round((sheet_count / total_res * 100.0) if total_res else 0.0, 1),
            ramachandran_favored_percentage=round((favored_count / evaluated_dihedrals * 100.0) if evaluated_dihedrals else 0.0, 1),
            ramachandran_outlier_percentage=round((outlier_count / evaluated_dihedrals * 100.0) if evaluated_dihedrals else 0.0, 1),
        )

        segments = self._build_structure_segments(residues)

        return ProteinStructureDetail(
            summary=summary,
            residues=residues,
            hydrogen_bonds=h_bonds,
            secondary_structure_segments=segments,
        )

    def _calculate_dssp_hydrogen_bonds(self, residues: List[AminoAcidResidue]) -> List[HydrogenBondRecord]:
        """
        Calculates Kabsch-Sander electrostatic H-bond energy:
        E = q1 * q2 * (1/r_ON + 1/r_CH - 1/r_OH - 1/r_CN) * 332 kcal/mol
        Threshold: E <= -0.5 kcal/mol
        """
        bonds: List[HydrogenBondRecord] = []
        KABSCH_SANDER_FACTOR = 332.0 * 0.42 * 0.20  # ~27.888 kcal*A/mol

        for i, donor in enumerate(residues):
            # Donor has Carbonyl: C=O
            if not (donor.c_coord and donor.o_coord):
                continue

            for j, acceptor in enumerate(residues):
                # Proline has no backbone NH amide hydrogen
                if acceptor.res_name == "PRO":
                    continue
                # Acceptor has Amide: N-H
                if not (acceptor.n_coord and acceptor.h_coord):
                    continue

                # Ignore same residue or immediately adjacent peptide bond
                if donor.chain_id == acceptor.chain_id and abs(donor.res_seq - acceptor.res_seq) <= 1:
                    continue

                r_on = max(0.5, euclidean_distance(donor.o_coord, acceptor.n_coord))
                r_ch = max(0.5, euclidean_distance(donor.c_coord, acceptor.h_coord))
                r_oh = max(0.5, euclidean_distance(donor.o_coord, acceptor.h_coord))
                r_cn = max(0.5, euclidean_distance(donor.c_coord, acceptor.n_coord))

                # Distance cutoff: O to N must be within 5.2 A for meaningful electrostatic interaction
                if r_on > 5.2:
                    continue

                energy = KABSCH_SANDER_FACTOR * (
                    (1.0 / r_on) + (1.0 / r_ch) - (1.0 / r_oh) - (1.0 / r_cn)
                )

                if energy <= -0.5:
                    bonds.append(
                        HydrogenBondRecord(
                            donor_chain=donor.chain_id,
                            donor_res_seq=donor.res_seq,
                            donor_res_name=donor.res_name,
                            acceptor_chain=acceptor.chain_id,
                            acceptor_res_seq=acceptor.res_seq,
                            acceptor_res_name=acceptor.res_name,
                            distance_on=round(r_on, 3),
                            distance_oh=round(r_oh, 3),
                            energy_kcal_mol=round(energy, 3),
                        )
                    )

        return bonds

    def _assign_secondary_structure(
        self, residues: List[AminoAcidResidue], h_bonds: List[HydrogenBondRecord]
    ):
        """
        Assigns DSSP-standard secondary structures based on H-bonding network patterns:
        - 4-turn (i -> i+4): Alpha Helix
        - 3-turn (i -> i+3): 3_10 Helix
        - 5-turn (i -> i+5): Pi Helix
        - Bridged strands: Beta Sheet
        - Isolated turn: Turn
        """
        # Map (chain, res_seq) to residue index
        res_map = {(r.chain_id, r.res_seq): idx for idx, r in enumerate(residues)}

        # Identify H-bond linkages (i -> j where i donates C=O and j accepts N-H)
        h_pairs = set()
        for hb in h_bonds:
            if (hb.donor_chain, hb.donor_res_seq) in res_map and (hb.acceptor_chain, hb.acceptor_res_seq) in res_map:
                i = res_map[(hb.donor_chain, hb.donor_res_seq)]
                j = res_map[(hb.acceptor_chain, hb.acceptor_res_seq)]
                h_pairs.add((i, j))

        # Check helical patterns
        n_res = len(residues)
        alpha_helix_flags = [False] * n_res
        three_ten_flags = [False] * n_res

        for i in range(n_res):
            # Alpha helix: i -> i+4 H-bond
            if (i, i + 4) in h_pairs:
                for k in range(i, min(n_res, i + 5)):
                    alpha_helix_flags[k] = True

            # 3_10 helix: i -> i+3 H-bond
            if (i, i + 3) in h_pairs:
                for k in range(i, min(n_res, i + 4)):
                    three_ten_flags[k] = True

        # Check Beta Sheet bridges (antiparallel: (i, j) & (j, i); parallel: (i-1, j) & (j, i+1))
        beta_flags = [False] * n_res
        for (i, j) in h_pairs:
            # Antiparallel bridge
            if (j, i) in h_pairs and abs(i - j) >= 3:
                beta_flags[i] = True
                beta_flags[j] = True
            # Parallel bridge
            if (i - 1, j) in h_pairs and (j, i + 1) in h_pairs and abs(i - j) >= 3:
                beta_flags[i] = True
                beta_flags[j] = True

        # Assign types prioritizing Alpha > 3_10 > Beta > Turn > Coil
        for i in range(n_res):
            if alpha_helix_flags[i]:
                residues[i].secondary_structure = SecondaryStructureType.ALPHA_HELIX
            elif three_ten_flags[i]:
                residues[i].secondary_structure = SecondaryStructureType.THREE_TEN_HELIX
            elif beta_flags[i]:
                residues[i].secondary_structure = SecondaryStructureType.BETA_SHEET
            else:
                # Check for single turn
                is_turn = any((i - k, i) in h_pairs for k in [2, 3, 4]) or any((i, i + k) in h_pairs for k in [2, 3, 4])
                if is_turn:
                    residues[i].secondary_structure = SecondaryStructureType.TURN
                else:
                    residues[i].secondary_structure = SecondaryStructureType.COIL

    def _classify_ramachandran(
        self, phi: Optional[float], psi: Optional[float], res_name: str
    ) -> RamachandranRegion:
        if phi is None or psi is None:
            return RamachandranRegion.ALLOWED

        # Glycine has no beta carbon; wide conformational freedom
        if res_name == "GLY":
            if (-180 <= phi <= 0 and -100 <= psi <= 50) or (0 <= phi <= 180 and -50 <= psi <= 100):
                return RamachandranRegion.FAVORED_ALPHA
            return RamachandranRegion.ALLOWED

        # Alpha-helical region: phi in [-160, -20], psi in [-90, -10]
        if -160 <= phi <= -20 and -90 <= psi <= -10:
            return RamachandranRegion.FAVORED_ALPHA

        # Beta-sheet region: phi in [-180, -50], psi in [80, 180] or [-180, -170]
        if -180 <= phi <= -50 and (80 <= psi <= 180 or psi <= -170):
            return RamachandranRegion.FAVORED_BETA

        # Left-handed alpha-helix (collagen): phi in [30, 90], psi in [10, 80]
        if 30 <= phi <= 90 and 10 <= psi <= 80:
            return RamachandranRegion.FAVORED_LEFT_ALPHA

        # Allowed surrounding envelopes
        if (-180 <= phi <= 0 and -120 <= psi <= 180) or (20 <= phi <= 110 and 0 <= psi <= 100):
            return RamachandranRegion.ALLOWED

        return RamachandranRegion.OUTLIER

    def _build_structure_segments(self, residues: List[AminoAcidResidue]) -> List[Dict[str, Any]]:
        segments = []
        if not residues:
            return segments

        curr_type = residues[0].secondary_structure
        start_res = residues[0].res_seq
        start_idx = 0

        for i in range(1, len(residues)):
            if residues[i].secondary_structure != curr_type or residues[i].chain_id != residues[i - 1].chain_id:
                segments.append({
                    "type": curr_type,
                    "chain_id": residues[start_idx].chain_id,
                    "start_res_seq": start_res,
                    "end_res_seq": residues[i - 1].res_seq,
                    "length": i - start_idx,
                })
                curr_type = residues[i].secondary_structure
                start_res = residues[i].res_seq
                start_idx = i

        segments.append({
            "type": curr_type,
            "chain_id": residues[start_idx].chain_id,
            "start_res_seq": start_res,
            "end_res_seq": residues[-1].res_seq,
            "length": len(residues) - start_idx,
        })
        return segments

    def load_preset(self, preset_id: str) -> Optional[ProteinStructureDetail]:
        preset = get_protein_preset_by_id(preset_id)
        if not preset:
            return None
        detail = self.parse_pdb_text(preset["pdb_text"], calculate_dssp=True)
        detail.summary.pdb_id = preset["pdb_id"]
        detail.summary.title = preset["name"]
        return detail
