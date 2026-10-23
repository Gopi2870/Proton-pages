# Pull Request #054: Biomolecular Structure Modeling & Protein Secondary Structure Topology (PDB Coordinate Parsing, DSSP Hydrogen-Bonding Network, & Ramachandran Dihedral Analysis)

- **Branch**: `feature/biomolecular-protein-secondary-structure`
- **Target**: `main`
- **Type**: Feature / Biomolecular Modeling, Kabsch-Sander DSSP Hydrogen-Bonding, Dihedral Angle Geometry ($\phi, \psi, \omega$), Ramachandran Conformation Space, & PDB Stream Parsing
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose

Deliver a scientifically grounded Biomolecular Modeling & Protein Secondary Structure analysis workstation for Proton Pages:

1. **PDB Coordinate Record Parser**:
   - Parses standard Protein Data Bank coordinate streams (`ATOM`, `HETATM`, `TER`, `END`, `HEADER`, `TITLE`).
   - Handles alternate locations (filtering to `'A'` or first encountered), chain identifiers, residue numbering, and insertion codes.
   - Robust error handling for truncated or malformed coordinate records.

2. **Backbone Dihedral Angle Geometry ($\phi, \psi, \omega$)**:
   - $4$-point vector cross-and-dot product algorithm with quadrant-resolved $\text{atan2}$ calculations:
     - $\phi$ (Phi): $C_{i-1} - N_i - C\alpha_i - C_i$
     - $\psi$ (Psi): $N_i - C\alpha_i - C_i - N_{i+1}$
     - $\omega$ (Omega): $C\alpha_i - C_i - N_{i+1} - C\alpha_{i+1}$ (trans/cis planar peptide validation)
   - Virtual amide hydrogen placement along the $C_{i-1}-N_i$ and $N_i-C\alpha_i$ vector bisector ($1.01\ \text{\AA}$) for structures lacking explicit hydrogen coordinates.

3. **Kabsch-Sander (DSSP) Electrostatic Hydrogen-Bond Energy Calculation**:
   - Formula:
     $$E = q_1 q_2 \left[\frac{1}{r(ON)} + \frac{1}{r(CH)} - \frac{1}{r(OH)} - \frac{1}{r(CN)}\right] \cdot 332\ \text{kcal/mol}$$
   - Partial charges: $q_1 = 0.42\ e$, $q_2 = 0.20\ e$, electrostatic conversion factor $f = 332\ \text{kcal}\cdot\text{\AA}/\text{mol} \times 0.084 = 27.888\ \text{kcal}\cdot\text{\AA}/\text{mol}$.
   - Singularity protection: distance clamping at $r_{min} = 0.5\ \text{\AA}$.
   - Standard DSSP cutoff: $E \le -0.5\ \text{kcal/mol}$, $r(ON) \le 5.2\ \text{\AA}$.
   - Classifies canonical secondary structure patterns:
     - $\alpha$-helix: $i \to i+4$ H-bonding
     - $3_{10}$-helix: $i \to i+3$ H-bonding
     - $\pi$-helix: $i \to i+5$ H-bonding
     - $\beta$-sheet: parallel and antiparallel cross-strand bridges
     - Turn: isolated $(i, i+n)$ loops

4. **Ramachandran Dihedral Conformational Map**:
   - Interactive $2\text{D}$ coordinate scatter map with shaded boundaries:
     - Core Favored $\alpha$-helix: $\phi \in [-160^\circ, -20^\circ], \psi \in [-90^\circ, -10^\circ]$
     - Core Favored $\beta$-sheet: $\phi \in [-180^\circ, -50^\circ], \psi \in [80^\circ, 180^\circ]$
     - Left-handed $\alpha$-helix (collagen / Glycine): $\phi \in [30^\circ, 90^\circ], \psi \in [10^\circ, 80^\circ]$
     - Steric outlier detection.
   - Evaluates stereochemical compliance (% favored, % outliers).

5. **Curated Reference Structures**:
   - **Crambin (`1CRN`)**: Ultra-high resolution ($0.54\ \text{\AA}$) plant seed thionin containing two amphipathic $\alpha$-helices, an antiparallel $\beta$-sheet, and 28 authentic DSSP hydrogen bonds.
   - **Trp-Cage (`1L2Y`)**: $20$-residue synthetic miniprotein model.

6. **Interactive Glassmorphic Workstation**:
   - Mounted in `src/pages/MolecularExplorerPage.tsx` under the **Biomolecules & DSSP** tab.
   - 4 specialized operational views:
     - **Ramachandran Plot**: Interactive SVG scatter map with selectable residues and tooltip telemetry.
     - **DSSP H-Bond Network**: Structured table showing donor, acceptor, distances $r(ON), r(OH)$, pattern, and electrostatic energy.
     - **Secondary Structure Sequence**: Color-coded residue track.
     - **Structure Segments**: High-level secondary structure domain breakdown.
     - **Custom PDB Modal**: Direct coordinate stream submission with on-the-fly DSSP evaluation.

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/biomolecule.py](file:///d:/proton%20pages/services/chemistry/app/models/biomolecule.py): Domain models for `AtomRecord`, `AminoAcidResidue`, `HydrogenBondRecord`, `ProteinStructureSummary`, `ProteinStructureDetail`.
- [schemas/biomolecule.py](file:///d:/proton%20pages/services/chemistry/app/schemas/biomolecule.py): Pydantic request/response schemas for `/api/v1/chemistry/biomolecule`.
- [data/protein_structures.py](file:///d:/proton%20pages/services/chemistry/app/data/protein_structures.py): Curated PDB benchmark presets (Crambin 1CRN 46 residues, Trp-Cage 1L2Y).
- [services/biomolecule_service.py](file:///d:/proton%20pages/services/chemistry/app/services/biomolecule_service.py): Vector geometry, PDB parsing, dihedral calculation, Kabsch-Sander DSSP engine.
- [api/v1/endpoints/biomolecule.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/biomolecule.py): REST endpoints under `/api/v1/chemistry/biomolecule`.
- [tests/unit/test_biomolecule.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_biomolecule.py): 6 unit tests covering vector operations, dihedral geometry, 1CRN parsing, DSSP H-bonds, and Ramachandran regions.
- [tests/integration/test_biomolecule_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_biomolecule_api.py): 6 integration tests covering presets, detail, Ramachandran points, custom PDB parse, and error handling.

### Frontend Architecture (`src/`)
- [types/biomolecule.ts](file:///d:/proton%20pages/src/types/biomolecule.ts): TypeScript domain definitions and interfaces.
- [services/biomoleculeService.ts](file:///d:/proton%20pages/src/services/biomoleculeService.ts): Client service with offline fallback data and Ramachandran point generators.
- [services/biomoleculeService.test.ts](file:///d:/proton%20pages/src/services/biomoleculeService.test.ts): Vitest test suite for client and offline fallbacks.
- [components/chemistry/biomolecules/BiomolecularStructureWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/biomolecules/BiomolecularStructureWorkstation.tsx): Glassmorphic interactive workstation with 4 views and custom PDB modal.
- [pages/MolecularExplorerPage.tsx](file:///d:/proton%20pages/src/pages/MolecularExplorerPage.tsx): Integration and tab switcher.

---

## 3. Verification & Test Metrics
- **Backend Tests (`pytest`)**: 12/12 passed in 3.43s.
- **Frontend Tests (`vitest`)**: 40 test suites, 219 passed in 6.28s.
- **TypeScript (`npx tsc --noEmit`)**: 0 errors.
- **Vite Build (`npm run build`)**: 0 errors (built in 22.81s).
