# Pull Request #058: Cheminformatics (Molecular Graph Canonicalization, Morgan Extended Connectivity Circular Fingerprints, Multi-Metric Chemical Similarity & Subgraph Isomorphism Matching)

- **Branch**: `feature/cheminformatics-fingerprints-tanimoto`
- **Domain**: Cheminformatics, Molecular Graphs, Extended Connectivity Fingerprints (ECFP), Graph Isomorphism (VF2/Ullmann), Chemical Similarity
- **Issue/Target**: PR #058 — Cheminformatics

---

## 1. Executive Summary

Pull Request #058 implements an industrial-grade, fully featured cheminformatics subsystem within Proton Pages:
1. **Molecular Graph Representation & Topological Invariant Perception**:
   - Explicit graph data structure ($V, E$) capturing atomic numbers, formal charges, heavy valence degrees, implicit hydrogens, cycle memberships, and hybridization ($sp^3, sp^2, sp$).
   - Algorithmic ring detection using bounded cycle exploration and Hückel $4n+2$ pi electron aromaticity perception.
2. **Morgan Extended Connectivity Circular Fingerprints (ECFP Equivalent)**:
   - Initial atom invariant hashing via 32-bit Fowler-Noll-Vo (FNV-1a).
   - Iterative circular neighborhood expansions (Radius $R = 0, 1, 2, 3$, corresponding to ECFP0, ECFP2, ECFP4, ECFP6).
   - Canonical neighborhood sorting and feature bit folding into 512, 1024, or 2048-bit bit vectors.
   - Circular environment inspection with participating atom and bond provenance.
3. **Multi-Metric Chemical Similarity Engine**:
   - Comprehensive formulation of **Tanimoto** (Jaccard), **Dice** (Sørensen), **Cosine** (Ochiai), and **Tversky** ($\alpha, \beta$) coefficients.
   - Euclidean and Manhattan distances in bit and count space.
   - Bit intersection decomposition into shared bits ($A \cap B$) and exclusive symmetric difference subsets ($A \setminus B, B \setminus A$).
4. **Subgraph Isomorphism Matching (Substructure Search)**:
   - Ullmann / VF2 recursive backtracking monomorphism solver.
   - Fast stoichiometric composition and graph size pre-filtering to eliminate non-matching candidate graphs in sub-millisecond time.
   - Precise target atom and bond mapping for visual substructure highlighting.
5. **Curated Molecular Reference Library & Functional Fragments**:
   - Diverse set of pharmaceuticals, metabolites, and aromatics: Aspirin, Acetaminophen, Ibuprofen, Dopamine, Serotonin, Caffeine, Benzoic Acid, Phenol, Pyridine, Benzene.
   - Curated functional group query fragments: Carboxylic Acid, Benzene ring, Phenolic OH, Ester linkage, Primary Amine, Catechol.
6. **Interactive Cheminformatics Workstation**:
   - Dynamic 2D SVG molecular structure rendering with element coloring and aromatic bond dashes.
   - Interactive circular shell inspector: click any atom to view concentric shells and active bit hashes.
   - Pairwise Venn diagram bit decomposition and similarity metric gauges.
   - Substructure search explorer with glowing atom/bond halos.
   - All-against-all interactive library similarity heatmap matrix with cell inspection.
   - Chemical analog screening tool with threshold slider and ranking progress bars.

---

## 2. Mathematical and Algorithmic Foundations

### 2.1 Morgan / ECFP Fingerprint Algorithm
For each atom $i$, the radius-0 invariant is:
$$h_0(i) = \text{FNV1a}\left( Z_i \mathbin{\Vert} \text{deg}_i \mathbin{\Vert} H_i \mathbin{\Vert} q_i \mathbin{\Vert} \text{ring}_i \mathbin{\Vert} \text{arom}_i \right)$$
At iteration $r \in \{1, \dots, R\}$:
$$\text{nbrs}(i) = \text{sort}\left( \left\{ (10 \cdot b_{ij}, h_{r-1}(j)) \mid j \in \mathcal{N}(i) \right\} \right)$$
$$h_r(i) = \text{FNV1a}\left( r \mathbin{\Vert} h_{r-1}(i) \mathbin{\Vert} \text{nbrs}(i) \right)$$
The bit index in an $M$-bit vector is folded via:
$$\text{bit}(h) = h \pmod M$$

### 2.2 Chemical Similarity Metrics
Given bit vectors $\mathbf{u}, \mathbf{v}$ with $a = |\mathbf{u} \cap \mathbf{v}|$, $b = |\mathbf{u} \setminus \mathbf{v}|$, $c = |\mathbf{v} \setminus \mathbf{u}|$:
- **Tanimoto (Jaccard)**:
  $$T(\mathbf{u}, \mathbf{v}) = \frac{a}{a + b + c}$$
- **Dice**:
  $$S_{\text{Dice}}(\mathbf{u}, \mathbf{v}) = \frac{2a}{2a + b + c}$$
- **Cosine (Ochiai)**:
  $$S_{\text{Cosine}}(\mathbf{u}, \mathbf{v}) = \frac{a}{\sqrt{(a + b)(a + c)}}$$
- **Tversky**:
  $$S_{\text{Tversky}}(\mathbf{u}, \mathbf{v}; \alpha, \beta) = \frac{a}{a + \alpha b + \beta c}$$

---

## 3. Implementation Summary

### Backend
- `services/chemistry/app/models/cheminformatics.py`: Domain dataclasses for molecular graphs, atoms, bonds, circular environments, Morgan fingerprints, similarity metrics, and substructure matches.
- `services/chemistry/app/services/cheminformatics_service.py`: Complete engine for ring perception, aromaticity, Morgan ECFP generation, similarity calculation, and subgraph isomorphism.
- `services/chemistry/app/schemas/cheminformatics.py`: Pydantic schemas validating all API inputs and outputs.
- `services/chemistry/app/api/v1/endpoints/cheminformatics.py`: FastAPI endpoints for library, fragments, fingerprints, similarity, substructure search, and heatmap matrix.
- `services/chemistry/app/api/v1/__init__.py`: Registered router under `/chemistry/cheminformatics`.

### Frontend
- `src/types/cheminformatics.ts`: TypeScript domain contracts and interfaces.
- `src/services/cheminformaticsService.ts`: Client API service with full offline client-side simulation.
- `src/services/cheminformaticsService.test.ts`: Vitest test suite.
- `src/components/chemistry/cheminformatics/CheminformaticsWorkstation.tsx`: Interactive workstation with 5 tabs (Fingerprints, Similarity, Substructure, Heatmap, Screening) and 2D SVG graph renderer.
- `src/pages/MolecularExplorerPage.tsx`: Mounted "Cheminformatics & Fingerprints" tab.

---

## 4. Verification Results

- **Backend Unit Tests**: 12 passed in 0.18s (`services/chemistry/tests/unit/test_cheminformatics.py`).
- **Backend Integration Tests**: 8 passed in 7.71s (`services/chemistry/tests/integration/test_cheminformatics_api.py`).
- **Frontend Vitest**: 6 passed in 49ms (`src/services/cheminformaticsService.test.ts`).
- **Full Backend Pytest**: Verified across full chemistry suite.
- **Type Check**: `npx tsc --noEmit` verified with 0 errors.
- **Production Build**: `npm run build` verified.
