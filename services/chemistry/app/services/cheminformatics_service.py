"""
Cheminformatics Service Engine.
Provides graph canonicalization, topological invariant perception (aromaticity, rings, hybridization),
Morgan extended connectivity circular fingerprints (ECFP equivalent), bit vector folding,
substructure subgraph isomorphism matching, and multi-metric chemical similarity calculations.
"""
import math
import time
from typing import Dict, List, Optional, Set, Tuple

from services.chemistry.app.models.cheminformatics import (
    AtomNode,
    BondEdge,
    CircularEnvironment,
    LibraryScreeningHit,
    MolecularGraph,
    MorganFingerprint,
    SimilarityMatrixResult,
    SimilarityMetric,
    SimilarityResult,
    SubstructureMatch,
)

# Standard periodic atomic numbers
ELEMENT_ATOMIC_NUMBERS: Dict[str, int] = {
    "H": 1, "He": 2, "Li": 3, "Be": 4, "B": 5, "C": 6, "N": 7, "O": 8, "F": 9, "Ne": 10,
    "Na": 11, "Mg": 12, "Al": 13, "Si": 14, "P": 15, "S": 16, "Cl": 17, "Ar": 18,
    "K": 19, "Ca": 20, "Fe": 26, "Cu": 29, "Zn": 30, "Br": 35, "I": 53
}

# Standard valence for neutral organic atoms
STANDARD_VALENCES: Dict[str, int] = {
    "H": 1, "C": 4, "N": 3, "O": 2, "F": 1, "P": 3, "S": 2, "Cl": 1, "Br": 1, "I": 1
}


def fnv1a_32(data: bytes, seed: int = 2166136261) -> int:
    """32-bit Fowler-Noll-Vo (FNV-1a) non-cryptographic hash for deterministic feature indexing."""
    fnv_prime = 16777619
    hval = seed & 0xFFFFFFFF
    for b in data:
        hval = (hval ^ b) & 0xFFFFFFFF
        hval = (hval * fnv_prime) & 0xFFFFFFFF
    return hval


class CheminformaticsService:
    """Core algorithmic engine for molecular graph analysis, fingerprints, and substructure search."""

    def __init__(self):
        self._library = self._init_curated_library()
        self._fragments = self._init_curated_fragments()
        # Precompute fingerprints for library
        self._library_fingerprints: Dict[str, MorganFingerprint] = {
            mol_id: self.generate_morgan_fingerprint(mol, radius=2, n_bits=1024)
            for mol_id, mol in self._library.items()
        }

    # -------------------------------------------------------------------------
    # 1. Topological Graph Perception (Rings, Aromaticity, Invariants)
    # -------------------------------------------------------------------------

    def perceive_graph_properties(self, graph: MolecularGraph) -> MolecularGraph:
        """Enriches atom nodes and bond edges with ring status, cycle sizes, and aromaticity."""
        n_atoms = len(graph.atoms)
        if n_atoms == 0:
            return graph

        # Build adjacency graph
        adj: Dict[int, List[int]] = {i: [] for i in range(n_atoms)}
        bond_map: Dict[Tuple[int, int], BondEdge] = {}
        for b in graph.bonds:
            adj[b.source].append(b.target)
            adj[b.target].append(b.source)
            bond_map[(min(b.source, b.target), max(b.source, b.target))] = b

        # Find cycles up to length 8 using simple DFS cycle detection
        cycles = self._find_simple_cycles(adj, max_len=8)

        # Mark ring atoms and bonds
        for atom in graph.atoms:
            atom.ring_sizes = []
            atom.in_ring = False

        for b in graph.bonds:
            b.in_ring = False

        for cycle in cycles:
            c_len = len(cycle)
            for atom_idx in cycle:
                if 0 <= atom_idx < n_atoms:
                    graph.atoms[atom_idx].in_ring = True
                    if c_len not in graph.atoms[atom_idx].ring_sizes:
                        graph.atoms[atom_idx].ring_sizes.append(c_len)

            for i in range(c_len):
                u = cycle[i]
                v = cycle[(i + 1) % c_len]
                pair = (min(u, v), max(u, v))
                if pair in bond_map:
                    bond_map[pair].in_ring = True

        # Perceive aromaticity: rings of size 5 or 6 with alternating/aromatic bonds
        for cycle in cycles:
            c_len = len(cycle)
            if c_len in (5, 6):
                is_aromatic_cycle = True
                for i in range(c_len):
                    u = cycle[i]
                    v = cycle[(i + 1) % c_len]
                    pair = (min(u, v), max(u, v))
                    bond = bond_map.get(pair)
                    # Aromatic if bond is explicitly aromatic (1.5) or alternating double/single in ring
                    if not bond or (bond.order not in (1.0, 1.5, 2.0)):
                        is_aromatic_cycle = False
                        break

                # Count pi electrons: double bond contributes 2, aromatic contributes 1 each, heteroatom lone pair
                if is_aromatic_cycle:
                    # Check Hückel 4n+2 rule
                    pi_count = 0
                    for atom_idx in cycle:
                        elem = graph.atoms[atom_idx].element
                        # Find connected bonds in cycle
                        c_bonds = [
                            bond_map.get((min(atom_idx, o), max(atom_idx, o)))
                            for o in cycle if o != atom_idx and (min(atom_idx, o), max(atom_idx, o)) in bond_map
                        ]
                        has_double = any(b.order == 2.0 for b in c_bonds if b)
                        has_aromatic_bond = any(b.order == 1.5 for b in c_bonds if b)
                        if has_double:
                            pi_count += 1
                        elif has_aromatic_bond:
                            pi_count += 1
                        elif elem in ("N", "O", "S"):
                            pi_count += 2  # heteroatom lone pair

                    if pi_count in (6, 10, 14):
                        for atom_idx in cycle:
                            graph.atoms[atom_idx].aromatic = True
                        for i in range(c_len):
                            u = cycle[i]
                            v = cycle[(i + 1) % c_len]
                            pair = (min(u, v), max(u, v))
                            if pair in bond_map:
                                bond_map[pair].aromatic = True
                                bond_map[pair].order = 1.5

        # Compute heavy valence and estimate implicit hydrogens
        for atom in graph.atoms:
            connected_bonds = [
                b for b in graph.bonds if b.source == atom.index or b.target == atom.index
            ]
            atom.valence = len(connected_bonds)
            bond_sum = sum(b.order for b in connected_bonds)

            std_val = STANDARD_VALENCES.get(atom.element, 4)
            if atom.element == "C":
                if bond_sum >= 4.0:
                    atom.implicit_hydrogens = 0
                else:
                    atom.implicit_hydrogens = max(0, int(round(4.0 - bond_sum)))
            elif atom.element == "N":
                atom.implicit_hydrogens = max(0, int(round(3.0 - bond_sum)))
            elif atom.element == "O":
                atom.implicit_hydrogens = max(0, int(round(2.0 - bond_sum)))
            else:
                atom.implicit_hydrogens = 0

            # Hybridization estimate
            if atom.aromatic or any(b.order == 2.0 for b in connected_bonds):
                atom.hybridization = "sp2"
            elif any(b.order == 3.0 for b in connected_bonds):
                atom.hybridization = "sp"
            else:
                atom.hybridization = "sp3"

        return graph

    def _find_simple_cycles(self, adj: Dict[int, List[int]], max_len: int = 8) -> List[List[int]]:
        """Extracts simple chordless rings using bounded DFS path exploration."""
        cycles: List[List[int]] = []
        n = len(adj)

        def dfs(start: int, current: int, visited: Set[int], path: List[int]):
            if len(path) > max_len:
                return
            for nbr in adj[current]:
                if nbr == start and len(path) >= 3:
                    # Canonicalize cycle by sorting rotated representations
                    min_idx = path.index(min(path))
                    rot1 = path[min_idx:] + path[:min_idx]
                    rot2 = [rot1[0]] + list(reversed(rot1[1:]))
                    canon = rot1 if rot1 < rot2 else rot2
                    if canon not in cycles:
                        cycles.append(canon)
                elif nbr not in visited and nbr > start:
                    visited.add(nbr)
                    dfs(start, nbr, visited, path + [nbr])
                    visited.remove(nbr)

        for i in range(n):
            dfs(i, i, {i}, [i])

        return cycles

    # -------------------------------------------------------------------------
    # 2. Morgan Circular Extended-Connectivity Fingerprints (ECFP)
    # -------------------------------------------------------------------------

    def generate_morgan_fingerprint(
        self,
        graph: MolecularGraph,
        radius: int = 2,
        n_bits: int = 1024
    ) -> MorganFingerprint:
        """
        Generates an ECFP-style Morgan circular fingerprint of specified radius (e.g. 2 for ECFP4)
        folded into an n_bits bit vector.
        """
        graph = self.perceive_graph_properties(graph)
        n_atoms = len(graph.atoms)

        if n_atoms == 0:
            return MorganFingerprint(
                molecule_id=graph.id,
                radius=radius,
                n_bits=n_bits,
                active_bits=[],
                bit_counts={},
                environments=[],
                density=0.0
            )

        # Adjacency and bond lookup
        adj: Dict[int, List[Tuple[int, float]]] = {i: [] for i in range(n_atoms)}
        for b in graph.bonds:
            adj[b.source].append((b.target, b.order))
            adj[b.target].append((b.source, b.order))

        # Initial atom invariants (radius 0)
        atom_hashes: Dict[int, int] = {}
        environments: List[CircularEnvironment] = []
        features_seen: Set[int] = set()

        for atom in graph.atoms:
            # Invariant: (atomic_number, heavy_valence, implicit_h, formal_charge, in_ring, aromatic)
            inv_str = f"{atom.atomic_number}:{atom.valence}:{atom.implicit_hydrogens}:{atom.formal_charge}:{int(atom.in_ring)}:{int(atom.aromatic)}"
            h0 = fnv1a_32(inv_str.encode("utf-8"))
            atom_hashes[atom.index] = h0

            bit_idx0 = h0 % n_bits
            if h0 not in features_seen:
                features_seen.add(h0)
                environments.append(CircularEnvironment(
                    atom_index=atom.index,
                    radius=0,
                    feature_id=h0,
                    bit_index=bit_idx0,
                    participating_atoms=[atom.index],
                    participating_bonds=[],
                    notation=f"{atom.element}[r0]"
                ))

        # Iterative circular neighborhood expansions (radius 1 to radius)
        current_hashes = dict(atom_hashes)
        for r in range(1, radius + 1):
            next_hashes: Dict[int, int] = {}
            for atom in graph.atoms:
                i = atom.index
                # Collect sorted neighbors: (bond_order, neighbor_hash)
                nbr_tuples = []
                for nbr_idx, b_order in adj[i]:
                    nbr_tuples.append((int(b_order * 10), current_hashes[nbr_idx]))
                nbr_tuples.sort()

                # Build hash string combining current radius, central atom hash, and sorted neighbor tokens
                tokens = [f"{r}", f"{current_hashes[i]}"]
                for b_val, n_hash in nbr_tuples:
                    tokens.append(f"{b_val}_{n_hash}")
                combined_str = ":".join(tokens)
                hr = fnv1a_32(combined_str.encode("utf-8"))
                next_hashes[i] = hr

                bit_idx_r = hr % n_bits
                if hr not in features_seen:
                    features_seen.add(hr)
                    # Gather participating atoms within radius r using BFS
                    part_atoms, part_bonds = self._get_neighborhood(i, r, adj)
                    environments.append(CircularEnvironment(
                        atom_index=i,
                        radius=r,
                        feature_id=hr,
                        bit_index=bit_idx_r,
                        participating_atoms=part_atoms,
                        participating_bonds=part_bonds,
                        notation=f"{atom.element}[r{r},n={len(part_atoms)}]"
                    ))

            current_hashes = next_hashes

        # Fold into active bits and bit counts
        bit_counts: Dict[int, int] = {}
        for env in environments:
            b = env.bit_index
            bit_counts[b] = bit_counts.get(b, 0) + 1

        active_bits = sorted(bit_counts.keys())
        density = len(active_bits) / n_bits if n_bits > 0 else 0.0

        # Construct compact hex representation
        byte_len = (n_bits + 7) // 8
        bit_bytes = bytearray(byte_len)
        for b in active_bits:
            byte_idx = b // 8
            bit_in_byte = b % 8
            bit_bytes[byte_idx] |= (1 << bit_in_byte)
        bit_hex = bit_bytes.hex()

        return MorganFingerprint(
            molecule_id=graph.id,
            radius=radius,
            n_bits=n_bits,
            active_bits=active_bits,
            bit_counts=bit_counts,
            bit_hex=bit_hex,
            environments=environments,
            density=round(density, 4)
        )

    def _get_neighborhood(
        self,
        center_atom: int,
        radius: int,
        adj: Dict[int, List[Tuple[int, float]]]
    ) -> Tuple[List[int], List[Tuple[int, int]]]:
        """BFS exploration to collect all atoms and bonds within topological radius."""
        visited_atoms = {center_atom}
        queue = [(center_atom, 0)]
        bonds_set: Set[Tuple[int, int]] = set()

        while queue:
            curr, dist = queue.pop(0)
            if dist < radius:
                for nbr, _ in adj[curr]:
                    pair = (min(curr, nbr), max(curr, nbr))
                    bonds_set.add(pair)
                    if nbr not in visited_atoms:
                        visited_atoms.add(nbr)
                        queue.append((nbr, dist + 1))

        return sorted(visited_atoms), sorted(bonds_set)

    # -------------------------------------------------------------------------
    # 3. Chemical Similarity & Distance Metrics
    # -------------------------------------------------------------------------

    def calculate_similarity(
        self,
        fp_a: MorganFingerprint,
        fp_b: MorganFingerprint,
        tversky_alpha: float = 0.5,
        tversky_beta: float = 0.5
    ) -> SimilarityResult:
        """
        Calculates Tanimoto, Dice, Cosine, and Tversky coefficients between two fingerprints.
        """
        set_a = set(fp_a.active_bits)
        set_b = set(fp_b.active_bits)

        shared = set_a.intersection(set_b)
        a_only = set_a - set_b
        b_only = set_b - set_a

        a = len(shared)
        b = len(a_only)
        c = len(b_only)

        # Tanimoto: a / (a + b + c)
        denom_tanimoto = a + b + c
        tanimoto = (a / denom_tanimoto) if denom_tanimoto > 0 else 1.0

        # Dice: 2a / (2a + b + c)
        denom_dice = 2 * a + b + c
        dice = (2.0 * a / denom_dice) if denom_dice > 0 else 1.0

        # Cosine: a / sqrt((a + b)(a + c))
        denom_cosine = math.sqrt((a + b) * (a + c))
        cosine = (a / denom_cosine) if denom_cosine > 0 else 1.0

        # Tversky: a / (a + alpha*b + beta*c)
        denom_tversky = a + tversky_alpha * b + tversky_beta * c
        tversky = (a / denom_tversky) if denom_tversky > 0 else 1.0

        # Distances
        euclidean = math.sqrt(b + c)
        manhattan = float(b + c)

        return SimilarityResult(
            molecule_a_id=fp_a.molecule_id,
            molecule_b_id=fp_b.molecule_id,
            tanimoto=round(tanimoto, 4),
            dice=round(dice, 4),
            cosine=round(cosine, 4),
            tversky=round(tversky, 4),
            shared_bits=sorted(shared),
            bits_a_only=sorted(a_only),
            bits_b_only=sorted(b_only),
            euclidean_distance=round(euclidean, 4),
            manhattan_distance=round(manhattan, 4)
        )

    # -------------------------------------------------------------------------
    # 4. Subgraph Isomorphism Engine (Substructure Matching)
    # -------------------------------------------------------------------------

    def match_substructure(
        self,
        target_graph: MolecularGraph,
        query_graph: MolecularGraph
    ) -> SubstructureMatch:
        """
        Determines if query_graph is a substructure of target_graph using
        bitmask fingerprint pre-filtering and recursive backtracking monomorphism.
        """
        start_time = time.perf_counter()

        # Step 1: Fast compositional and size pre-filtering
        n_q = len(query_graph.atoms)
        n_t = len(target_graph.atoms)

        if n_q == 0 or n_q > n_t:
            elapsed_ms = (time.perf_counter() - start_time) * 1000.0
            return SubstructureMatch(
                target_molecule_id=target_graph.id,
                target_molecule_name=target_graph.name,
                query_fragment_id=query_graph.id,
                query_fragment_name=query_graph.name,
                matched=False,
                filter_passed=False,
                atom_mappings=[],
                matched_target_atoms=[],
                matched_target_bonds=[],
                execution_time_ms=round(elapsed_ms, 3)
            )

        # Count element requirements in query (excluding wildcard '*')
        target_counts: Dict[str, int] = {}
        for a in target_graph.atoms:
            target_counts[a.element] = target_counts.get(a.element, 0) + 1

        query_counts: Dict[str, int] = {}
        for a in query_graph.atoms:
            if a.element != "*":
                query_counts[a.element] = query_counts.get(a.element, 0) + 1

        for elem, q_cnt in query_counts.items():
            if target_counts.get(elem, 0) < q_cnt:
                elapsed_ms = (time.perf_counter() - start_time) * 1000.0
                return SubstructureMatch(
                    target_molecule_id=target_graph.id,
                    target_molecule_name=target_graph.name,
                    query_fragment_id=query_graph.id,
                    query_fragment_name=query_graph.name,
                    matched=False,
                    filter_passed=False,
                    atom_mappings=[],
                    matched_target_atoms=[],
                    matched_target_bonds=[],
                    execution_time_ms=round(elapsed_ms, 3)
                )

        # Step 2: Backtracking Subgraph Isomorphism
        t_graph = self.perceive_graph_properties(target_graph)
        q_graph = self.perceive_graph_properties(query_graph)

        # Target and query adjacency matrices
        t_adj: Dict[int, Dict[int, float]] = {i: {} for i in range(n_t)}
        for b in t_graph.bonds:
            t_adj[b.source][b.target] = b.order
            t_adj[b.target][b.source] = b.order

        q_adj: Dict[int, Dict[int, float]] = {i: {} for i in range(n_q)}
        for b in q_graph.bonds:
            q_adj[b.source][b.target] = b.order
            q_adj[b.target][b.source] = b.order

        # Candidate compatibility for each query atom
        candidates: List[List[int]] = []
        for q_atom in q_graph.atoms:
            compat = []
            for t_atom in t_graph.atoms:
                if self._atom_matches(q_atom, t_atom):
                    compat.append(t_atom.index)
            candidates.append(compat)

        # Backtracking search for all valid monomorphisms
        mappings: List[Dict[int, int]] = []

        def backtrack(q_idx: int, current_map: Dict[int, int], used_targets: Set[int]):
            if q_idx == n_q:
                mappings.append(dict(current_map))
                return

            for t_candidate in candidates[q_idx]:
                if t_candidate in used_targets:
                    continue

                # Check edge constraints with already mapped query atoms
                compatible = True
                for prev_q, prev_t in current_map.items():
                    if prev_q in q_adj[q_idx]:
                        # Edge exists in query; must exist in target
                        q_order = q_adj[q_idx][prev_q]
                        if prev_t not in t_adj[t_candidate]:
                            compatible = False
                            break
                        t_order = t_adj[t_candidate][prev_t]
                        # Check bond compatibility: exact match or both aromatic
                        if not self._bond_matches(q_order, t_order):
                            compatible = False
                            break

                if compatible:
                    current_map[q_idx] = t_candidate
                    used_targets.add(t_candidate)
                    backtrack(q_idx + 1, current_map, used_targets)
                    used_targets.remove(t_candidate)
                    del current_map[q_idx]

                    # Stop if we found up to 5 symmetry-unique mappings to prevent explosion
                    if len(mappings) >= 5:
                        return

        backtrack(0, {}, set())

        matched = len(mappings) > 0
        matched_target_atoms: Set[int] = set()
        matched_target_bonds: Set[Tuple[int, int]] = set()

        if matched:
            for mapping in mappings:
                for q_i, t_i in mapping.items():
                    matched_target_atoms.add(t_i)
                for b in q_graph.bonds:
                    t_u = mapping[b.source]
                    t_v = mapping[b.target]
                    matched_target_bonds.add((min(t_u, t_v), max(t_u, t_v)))

        elapsed_ms = (time.perf_counter() - start_time) * 1000.0

        return SubstructureMatch(
            target_molecule_id=target_graph.id,
            target_molecule_name=target_graph.name,
            query_fragment_id=query_graph.id,
            query_fragment_name=query_graph.name,
            matched=matched,
            filter_passed=True,
            atom_mappings=mappings,
            matched_target_atoms=sorted(matched_target_atoms),
            matched_target_bonds=sorted(matched_target_bonds),
            execution_time_ms=round(elapsed_ms, 3)
        )

    def _atom_matches(self, q: AtomNode, t: AtomNode) -> bool:
        """Determines if query atom matches target atom based on element, charge, and ring constraints."""
        # Element wildcard '*' or exact match
        if q.element != "*" and q.element != t.element:
            return False
        # Formal charge
        if q.formal_charge != 0 and q.formal_charge != t.formal_charge:
            return False
        # Aromaticity requirement
        if q.aromatic and not t.aromatic:
            return False
        # In ring requirement
        if q.in_ring and not t.in_ring:
            return False
        # Valence requirement: target must have at least as many heavy neighbors
        if t.valence < q.valence:
            return False
        return True

    def _bond_matches(self, q_order: float, t_order: float) -> bool:
        """Determines if query bond order matches target bond order."""
        if q_order == 1.5 and t_order == 1.5:
            return True
        return abs(q_order - t_order) < 0.1

    # -------------------------------------------------------------------------
    # 5. Library Screening & Similarity Matrix
    # -------------------------------------------------------------------------

    def screen_library_similarity(
        self,
        query_graph: MolecularGraph,
        metric: SimilarityMetric = SimilarityMetric.TANIMOTO,
        min_threshold: float = 0.2
    ) -> List[LibraryScreeningHit]:
        """Screens the curated library against a query molecule, ranked by similarity score."""
        query_fp = self.generate_morgan_fingerprint(query_graph, radius=2, n_bits=1024)
        hits: List[LibraryScreeningHit] = []

        for mol_id, mol in self._library.items():
            lib_fp = self._library_fingerprints[mol_id]
            sim = self.calculate_similarity(query_fp, lib_fp)

            score = sim.tanimoto
            if metric == SimilarityMetric.DICE:
                score = sim.dice
            elif metric == SimilarityMetric.COSINE:
                score = sim.cosine
            elif metric == SimilarityMetric.TVERSKY:
                score = sim.tversky

            if score >= min_threshold:
                hits.append(LibraryScreeningHit(
                    molecule_id=mol.id,
                    molecule_name=mol.name,
                    formula=mol.formula,
                    smiles=mol.smiles,
                    score=score,
                    rank=0
                ))

        # Sort descending by score
        hits.sort(key=lambda h: h.score, reverse=True)
        for idx, h in enumerate(hits):
            h.rank = idx + 1

        return hits

    def screen_library_substructure(
        self,
        query_fragment: MolecularGraph
    ) -> List[LibraryScreeningHit]:
        """Screens library for substructure matches."""
        hits: List[LibraryScreeningHit] = []

        for mol_id, mol in self._library.items():
            match = self.match_substructure(mol, query_fragment)
            if match.matched:
                hits.append(LibraryScreeningHit(
                    molecule_id=mol.id,
                    molecule_name=mol.name,
                    formula=mol.formula,
                    smiles=mol.smiles,
                    score=1.0,
                    rank=len(hits) + 1,
                    matched_substructure=True,
                    matched_atoms=match.matched_target_atoms
                ))

        return hits

    def compute_similarity_matrix(
        self,
        molecule_ids: Optional[List[str]] = None,
        metric: SimilarityMetric = SimilarityMetric.TANIMOTO
    ) -> SimilarityMatrixResult:
        """Computes all-against-all similarity distance matrix for a list of molecules."""
        if not molecule_ids:
            molecule_ids = list(self._library.keys())

        valid_mols = [self._library[m_id] for m_id in molecule_ids if m_id in self._library]
        n = len(valid_mols)
        fps = [self._library_fingerprints[m.id] for m in valid_mols]

        matrix = [[1.0 if i == j else 0.0 for j in range(n)] for i in range(n)]

        for i in range(n):
            for j in range(i + 1, n):
                sim = self.calculate_similarity(fps[i], fps[j])
                val = sim.tanimoto
                if metric == SimilarityMetric.DICE:
                    val = sim.dice
                elif metric == SimilarityMetric.COSINE:
                    val = sim.cosine
                elif metric == SimilarityMetric.TVERSKY:
                    val = sim.tversky
                matrix[i][j] = val
                matrix[j][i] = val

        return SimilarityMatrixResult(
            molecule_ids=[m.id for m in valid_mols],
            molecule_names=[m.name for m in valid_mols],
            metric=metric.value,
            matrix=matrix
        )

    # -------------------------------------------------------------------------
    # 6. Library and Query Fragment Catalogs
    # -------------------------------------------------------------------------

    def get_library(self) -> List[MolecularGraph]:
        return list(self._library.values())

    def get_molecule_by_id(self, mol_id: str) -> Optional[MolecularGraph]:
        return self._library.get(mol_id)

    def get_fragments(self) -> List[MolecularGraph]:
        return list(self._fragments.values())

    def get_fragment_by_id(self, frag_id: str) -> Optional[MolecularGraph]:
        return self._fragments.get(frag_id)

    def _init_curated_library(self) -> Dict[str, MolecularGraph]:
        """Curated library of diverse reference pharmaceuticals, metabolites, and aromatics."""
        mols = [
            # 1. Aspirin (Acetylsalicylic acid)
            MolecularGraph(
                id="aspirin",
                name="Aspirin",
                smiles="CC(=O)Oc1ccccc1C(=O)O",
                formula="C9H8O4",
                molecular_weight=180.16,
                description="Analgesic and anti-inflammatory nonsteroidal drug; contains benzene ring, carboxylic acid, and ester groups.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=-1.20, y=0.00),   # C1 (ring)
                    AtomNode(index=1, element="C", atomic_number=6, x=-0.60, y=1.04),   # C2 (ring)
                    AtomNode(index=2, element="C", atomic_number=6, x=0.60, y=1.04),    # C3 (ring)
                    AtomNode(index=3, element="C", atomic_number=6, x=1.20, y=0.00),    # C4 (ring)
                    AtomNode(index=4, element="C", atomic_number=6, x=0.60, y=-1.04),   # C5 (ring)
                    AtomNode(index=5, element="C", atomic_number=6, x=-0.60, y=-1.04),  # C6 (ring)
                    AtomNode(index=6, element="C", atomic_number=6, x=-2.60, y=0.00),   # -COOH carbonyl
                    AtomNode(index=7, element="O", atomic_number=8, x=-3.20, y=1.04),   # =O carbonyl
                    AtomNode(index=8, element="O", atomic_number=8, x=-3.20, y=-1.04),  # -OH hydroxyl
                    AtomNode(index=9, element="O", atomic_number=8, x=-1.20, y=2.20),   # Ester O
                    AtomNode(index=10, element="C", atomic_number=6, x=-2.40, y=2.70),  # Acetyl C=O
                    AtomNode(index=11, element="O", atomic_number=8, x=-3.30, y=2.00),  # Acetyl =O
                    AtomNode(index=12, element="C", atomic_number=6, x=-2.60, y=4.10),  # Methyl CH3
                ],
                bonds=[
                    # Benzene ring
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    # Carboxylic acid
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=6, target=7, order=2.0),
                    BondEdge(source=6, target=8, order=1.0),
                    # Ester group
                    BondEdge(source=1, target=9, order=1.0),
                    BondEdge(source=9, target=10, order=1.0),
                    BondEdge(source=10, target=11, order=2.0),
                    BondEdge(source=10, target=12, order=1.0),
                ]
            ),

            # 2. Acetaminophen (Paracetamol)
            MolecularGraph(
                id="paracetamol",
                name="Acetaminophen (Paracetamol)",
                smiles="CC(=O)Nc1ccc(O)cc1",
                formula="C8H9NO2",
                molecular_weight=151.16,
                description="Widely used antipyretic and analgesic; features 4-aminophenol scaffold with N-acetyl group.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=1.40),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.20, y=0.70),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.20, y=-0.70),
                    AtomNode(index=3, element="C", atomic_number=6, x=0.00, y=-1.40),
                    AtomNode(index=4, element="C", atomic_number=6, x=-1.20, y=-0.70),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.20, y=0.70),
                    AtomNode(index=6, element="O", atomic_number=8, x=0.00, y=2.80),    # Phenolic OH
                    AtomNode(index=7, element="N", atomic_number=7, x=0.00, y=-2.80),   # Amide N
                    AtomNode(index=8, element="C", atomic_number=6, x=-1.10, y=-3.50),  # Amide C=O
                    AtomNode(index=9, element="O", atomic_number=8, x=-2.20, y=-3.00),  # Amide =O
                    AtomNode(index=10, element="C", atomic_number=6, x=-0.90, y=-4.90), # Methyl CH3
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=3, target=7, order=1.0),
                    BondEdge(source=7, target=8, order=1.0),
                    BondEdge(source=8, target=9, order=2.0),
                    BondEdge(source=8, target=10, order=1.0),
                ]
            ),

            # 3. Ibuprofen
            MolecularGraph(
                id="ibuprofen",
                name="Ibuprofen",
                smiles="CC(C)Cc1ccc(C(C)C(=O)O)cc1",
                formula="C13H18O2",
                molecular_weight=206.28,
                description="Propionic acid derivative NSAID; contains isobutyl-substituted benzene with propionic acid chain.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=0.00),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.20, y=0.70),
                    AtomNode(index=2, element="C", atomic_number=6, x=2.40, y=0.00),
                    AtomNode(index=3, element="C", atomic_number=6, x=2.40, y=-1.40),
                    AtomNode(index=4, element="C", atomic_number=6, x=1.20, y=-2.10),
                    AtomNode(index=5, element="C", atomic_number=6, x=0.00, y=-1.40),
                    AtomNode(index=6, element="C", atomic_number=6, x=-1.20, y=0.80),   # Isobutyl CH2
                    AtomNode(index=7, element="C", atomic_number=6, x=-2.50, y=0.20),   # Isobutyl CH
                    AtomNode(index=8, element="C", atomic_number=6, x=-3.60, y=1.20),   # CH3
                    AtomNode(index=9, element="C", atomic_number=6, x=-2.70, y=-1.20),  # CH3
                    AtomNode(index=10, element="C", atomic_number=6, x=3.70, y=0.80),   # Alpha-CH
                    AtomNode(index=11, element="C", atomic_number=6, x=3.50, y=2.20),   # Alpha-CH3
                    AtomNode(index=12, element="C", atomic_number=6, x=5.00, y=0.20),   # -COOH C
                    AtomNode(index=13, element="O", atomic_number=8, x=5.30, y=-1.00),  # =O
                    AtomNode(index=14, element="O", atomic_number=8, x=6.00, y=1.10),   # -OH
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=6, target=7, order=1.0),
                    BondEdge(source=7, target=8, order=1.0),
                    BondEdge(source=7, target=9, order=1.0),
                    BondEdge(source=2, target=10, order=1.0),
                    BondEdge(source=10, target=11, order=1.0),
                    BondEdge(source=10, target=12, order=1.0),
                    BondEdge(source=12, target=13, order=2.0),
                    BondEdge(source=12, target=14, order=1.0),
                ]
            ),

            # 4. Dopamine
            MolecularGraph(
                id="dopamine",
                name="Dopamine",
                smiles="NCCc1ccc(O)c(O)c1",
                formula="C8H11NO2",
                molecular_weight=153.18,
                description="Catecholamine neurotransmitter; composed of a catechol (1,2-dihydroxybenzene) core and an ethylamine side chain.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=-0.70, y=1.20),
                    AtomNode(index=1, element="C", atomic_number=6, x=0.70, y=1.20),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.40, y=0.00),
                    AtomNode(index=3, element="C", atomic_number=6, x=0.70, y=-1.20),
                    AtomNode(index=4, element="C", atomic_number=6, x=-0.70, y=-1.20),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.40, y=0.00),
                    AtomNode(index=6, element="O", atomic_number=8, x=-1.40, y=2.40),   # 3-OH
                    AtomNode(index=7, element="O", atomic_number=8, x=1.40, y=2.40),    # 4-OH
                    AtomNode(index=8, element="C", atomic_number=6, x=-2.80, y=0.00),   # Sidechain CH2
                    AtomNode(index=9, element="C", atomic_number=6, x=-3.60, y=-1.20),  # Sidechain CH2
                    AtomNode(index=10, element="N", atomic_number=7, x=-5.00, y=-1.00), # Amine NH2
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=1, target=7, order=1.0),
                    BondEdge(source=5, target=8, order=1.0),
                    BondEdge(source=8, target=9, order=1.0),
                    BondEdge(source=9, target=10, order=1.0),
                ]
            ),

            # 5. Serotonin (5-HT)
            MolecularGraph(
                id="serotonin",
                name="Serotonin (5-Hydroxytryptamine)",
                smiles="NCCc1c[nH]c2ccc(O)cc12",
                formula="C10H12N2O",
                molecular_weight=176.22,
                description="Monoamine neurotransmitter based on a 5-hydroxyindole nucleus with an ethylamine chain.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=0.00),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.20, y=0.60),
                    AtomNode(index=2, element="C", atomic_number=6, x=2.20, y=-0.30),
                    AtomNode(index=3, element="C", atomic_number=6, x=2.00, y=-1.60),
                    AtomNode(index=4, element="C", atomic_number=6, x=0.80, y=-2.20),
                    AtomNode(index=5, element="C", atomic_number=6, x=-0.20, y=-1.30),
                    AtomNode(index=6, element="N", atomic_number=7, x=-1.50, y=-1.60),  # Indole NH
                    AtomNode(index=7, element="C", atomic_number=6, x=-2.10, y=-0.50),  # Indole C2
                    AtomNode(index=8, element="C", atomic_number=6, x=-1.20, y=0.50),   # Indole C3
                    AtomNode(index=9, element="O", atomic_number=8, x=3.30, y=0.20),    # 5-OH
                    AtomNode(index=10, element="C", atomic_number=6, x=-1.40, y=1.90),  # CH2
                    AtomNode(index=11, element="C", atomic_number=6, x=-2.70, y=2.40),  # CH2
                    AtomNode(index=12, element="N", atomic_number=7, x=-2.80, y=3.80),  # NH2
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=5, target=6, order=1.5),
                    BondEdge(source=6, target=7, order=1.5),
                    BondEdge(source=7, target=8, order=1.5),
                    BondEdge(source=8, target=0, order=1.5),
                    BondEdge(source=2, target=9, order=1.0),
                    BondEdge(source=8, target=10, order=1.0),
                    BondEdge(source=10, target=11, order=1.0),
                    BondEdge(source=11, target=12, order=1.0),
                ]
            ),

            # 6. Caffeine
            MolecularGraph(
                id="caffeine",
                name="Caffeine",
                smiles="Cn1cnc2c1c(=O)n(C)c(=O)n2C",
                formula="C8H10N4O2",
                molecular_weight=194.19,
                description="Purine alkaloid and central nervous system stimulant containing fused pyrimidinedione and imidazole rings.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=1.20),
                    AtomNode(index=1, element="N", atomic_number=7, x=1.20, y=0.60),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.20, y=-0.80),
                    AtomNode(index=3, element="N", atomic_number=7, x=0.00, y=-1.50),
                    AtomNode(index=4, element="C", atomic_number=6, x=-1.20, y=-0.80),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.20, y=0.60),
                    AtomNode(index=6, element="O", atomic_number=8, x=0.00, y=2.40),    # C=O
                    AtomNode(index=7, element="O", atomic_number=8, x=2.30, y=-1.40),   # C=O
                    AtomNode(index=8, element="N", atomic_number=7, x=-2.40, y=1.10),   # Imidazole N
                    AtomNode(index=9, element="C", atomic_number=6, x=-3.10, y=0.00),   # Imidazole CH
                    AtomNode(index=10, element="N", atomic_number=7, x=-2.40, y=-1.10), # Imidazole N-CH3
                    AtomNode(index=11, element="C", atomic_number=6, x=2.50, y=1.30),   # N1-CH3
                    AtomNode(index=12, element="C", atomic_number=6, x=0.00, y=-2.90),  # N3-CH3
                    AtomNode(index=13, element="C", atomic_number=6, x=-2.90, y=-2.40), # N7-CH3
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.0),
                    BondEdge(source=1, target=2, order=1.0),
                    BondEdge(source=2, target=3, order=1.0),
                    BondEdge(source=3, target=4, order=1.0),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.0),
                    BondEdge(source=0, target=6, order=2.0),
                    BondEdge(source=2, target=7, order=2.0),
                    BondEdge(source=5, target=8, order=1.5),
                    BondEdge(source=8, target=9, order=1.5),
                    BondEdge(source=9, target=10, order=1.5),
                    BondEdge(source=10, target=4, order=1.5),
                    BondEdge(source=1, target=11, order=1.0),
                    BondEdge(source=3, target=12, order=1.0),
                    BondEdge(source=10, target=13, order=1.0),
                ]
            ),

            # 7. Benzoic Acid
            MolecularGraph(
                id="benzoic_acid",
                name="Benzoic Acid",
                smiles="c1ccccc1C(=O)O",
                formula="C7H6O2",
                molecular_weight=122.12,
                description="Simplest aromatic carboxylic acid used as a chemical preservative and organic synthesis precursor.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=0.00),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.20, y=0.70),
                    AtomNode(index=2, element="C", atomic_number=6, x=2.40, y=0.00),
                    AtomNode(index=3, element="C", atomic_number=6, x=2.40, y=-1.40),
                    AtomNode(index=4, element="C", atomic_number=6, x=1.20, y=-2.10),
                    AtomNode(index=5, element="C", atomic_number=6, x=0.00, y=-1.40),
                    AtomNode(index=6, element="C", atomic_number=6, x=-1.30, y=0.70),
                    AtomNode(index=7, element="O", atomic_number=8, x=-1.40, y=1.90),
                    AtomNode(index=8, element="O", atomic_number=8, x=-2.40, y=0.00),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=6, target=7, order=2.0),
                    BondEdge(source=6, target=8, order=1.0),
                ]
            ),

            # 8. Phenol
            MolecularGraph(
                id="phenol",
                name="Phenol",
                smiles="c1ccccc1O",
                formula="C6H6O",
                molecular_weight=94.11,
                description="Aromatic compound consisting of a benzene ring bonded to a single hydroxyl group.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=1.20),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.04, y=0.60),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.04, y=-0.60),
                    AtomNode(index=3, element="C", atomic_number=6, x=0.00, y=-1.20),
                    AtomNode(index=4, element="C", atomic_number=6, x=-1.04, y=-0.60),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.04, y=0.60),
                    AtomNode(index=6, element="O", atomic_number=8, x=0.00, y=2.50),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                    BondEdge(source=0, target=6, order=1.0),
                ]
            ),

            # 9. Pyridine
            MolecularGraph(
                id="pyridine",
                name="Pyridine",
                smiles="c1ccncc1",
                formula="C5H5N",
                molecular_weight=79.10,
                description="Fundamental six-membered aromatic heterocycle containing one ring nitrogen atom.",
                atoms=[
                    AtomNode(index=0, element="N", atomic_number=7, x=0.00, y=1.20),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.04, y=0.60),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.04, y=-0.60),
                    AtomNode(index=3, element="C", atomic_number=6, x=0.00, y=-1.20),
                    AtomNode(index=4, element="C", atomic_number=6, x=-1.04, y=-0.60),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.04, y=0.60),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                ]
            ),

            # 10. Benzene
            MolecularGraph(
                id="benzene",
                name="Benzene",
                smiles="c1ccccc1",
                formula="C6H6",
                molecular_weight=78.11,
                description="Archetypal aromatic hydrocarbon with fully delocalized pi electron system across a planar hexagonal ring.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, x=0.00, y=1.20),
                    AtomNode(index=1, element="C", atomic_number=6, x=1.04, y=0.60),
                    AtomNode(index=2, element="C", atomic_number=6, x=1.04, y=-0.60),
                    AtomNode(index=3, element="C", atomic_number=6, x=0.00, y=-1.20),
                    AtomNode(index=4, element="C", atomic_number=6, x=-1.04, y=-0.60),
                    AtomNode(index=5, element="C", atomic_number=6, x=-1.04, y=0.60),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5),
                    BondEdge(source=1, target=2, order=1.5),
                    BondEdge(source=2, target=3, order=1.5),
                    BondEdge(source=3, target=4, order=1.5),
                    BondEdge(source=4, target=5, order=1.5),
                    BondEdge(source=5, target=0, order=1.5),
                ]
            )
        ]
        return {m.id: m for m in mols}

    def _init_curated_fragments(self) -> Dict[str, MolecularGraph]:
        """Curated functional group fragments for substructure queries."""
        frags = [
            # 1. Carboxylic Acid (-COOH)
            MolecularGraph(
                id="frag_carboxylic_acid",
                name="Carboxylic Acid (-COOH)",
                smiles="C(=O)O",
                formula="CHO2",
                description="Carboxyl group with carbonyl C=O and hydroxyl C-OH.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6),
                    AtomNode(index=1, element="O", atomic_number=8),
                    AtomNode(index=2, element="O", atomic_number=8),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=2.0),
                    BondEdge(source=0, target=2, order=1.0),
                ]
            ),

            # 2. Phenolic Hydroxyl (Ar-OH)
            MolecularGraph(
                id="frag_phenol",
                name="Phenol / Phenolic OH",
                smiles="c1ccccc1O",
                formula="C6HO",
                description="Hydroxyl directly bonded to an aromatic benzene ring.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=1, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=2, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=3, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=4, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=5, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=6, element="O", atomic_number=8),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5, aromatic=True),
                    BondEdge(source=1, target=2, order=1.5, aromatic=True),
                    BondEdge(source=2, target=3, order=1.5, aromatic=True),
                    BondEdge(source=3, target=4, order=1.5, aromatic=True),
                    BondEdge(source=4, target=5, order=1.5, aromatic=True),
                    BondEdge(source=5, target=0, order=1.5, aromatic=True),
                    BondEdge(source=0, target=6, order=1.0),
                ]
            ),

            # 3. Benzene Ring (Aromatic 6-ring)
            MolecularGraph(
                id="frag_benzene",
                name="Benzene Ring",
                smiles="c1ccccc1",
                formula="C6",
                description="Six-carbon aromatic ring with delocalized pi bonds.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=1, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=2, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=3, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=4, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=5, element="C", atomic_number=6, aromatic=True, in_ring=True),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5, aromatic=True),
                    BondEdge(source=1, target=2, order=1.5, aromatic=True),
                    BondEdge(source=2, target=3, order=1.5, aromatic=True),
                    BondEdge(source=3, target=4, order=1.5, aromatic=True),
                    BondEdge(source=4, target=5, order=1.5, aromatic=True),
                    BondEdge(source=5, target=0, order=1.5, aromatic=True),
                ]
            ),

            # 4. Ester Linkage (-COO-)
            MolecularGraph(
                id="frag_ester",
                name="Ester Linkage (-C(=O)O-)",
                smiles="C(=O)OC",
                formula="C2O2",
                description="Carboxylic ester linkage connecting carbonyl and alkoxy groups.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6),
                    AtomNode(index=1, element="O", atomic_number=8),
                    AtomNode(index=2, element="O", atomic_number=8),
                    AtomNode(index=3, element="C", atomic_number=6),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=2.0),
                    BondEdge(source=0, target=2, order=1.0),
                    BondEdge(source=2, target=3, order=1.0),
                ]
            ),

            # 5. Primary Amine (-NH2)
            MolecularGraph(
                id="frag_primary_amine",
                name="Primary Amine (-C-NH2)",
                smiles="CN",
                formula="CN",
                description="Aliphatic carbon linked to an amine nitrogen.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6),
                    AtomNode(index=1, element="N", atomic_number=7),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.0),
                ]
            ),

            # 6. Catechol (1,2-dihydroxybenzene)
            MolecularGraph(
                id="frag_catechol",
                name="Catechol (1,2-Dihydroxybenzene)",
                smiles="Oc1ccccc1O",
                formula="C6H2O2",
                description="Benzene ring with two adjacent ortho-hydroxyl substituents.",
                atoms=[
                    AtomNode(index=0, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=1, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=2, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=3, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=4, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=5, element="C", atomic_number=6, aromatic=True, in_ring=True),
                    AtomNode(index=6, element="O", atomic_number=8),
                    AtomNode(index=7, element="O", atomic_number=8),
                ],
                bonds=[
                    BondEdge(source=0, target=1, order=1.5, aromatic=True),
                    BondEdge(source=1, target=2, order=1.5, aromatic=True),
                    BondEdge(source=2, target=3, order=1.5, aromatic=True),
                    BondEdge(source=3, target=4, order=1.5, aromatic=True),
                    BondEdge(source=4, target=5, order=1.5, aromatic=True),
                    BondEdge(source=5, target=0, order=1.5, aromatic=True),
                    BondEdge(source=0, target=6, order=1.0),
                    BondEdge(source=1, target=7, order=1.0),
                ]
            ),
        ]
        return {f.id: f for f in frags}


# Singleton service instance
cheminformatics_service = CheminformaticsService()
