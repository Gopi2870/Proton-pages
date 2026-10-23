# Pull Request #050: Comprehensive Chemical Compounds & Spectral Reference Database

- **Branch**: `feature/chemical-compounds-spectral-database`
- **Target**: `main`
- **Type**: Feature / IUPAC Chemical Informatics, Thermochemical Data, Analytical Spectroscopy & Peak Matcher
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose

Deliver a production-grade, authoritative Chemical Compounds and Analytical Spectral Reference Database for Proton Pages:

1. **Curated IUPAC Compound Profiles**:
   - Deep physicochemical, structural, and thermodynamic parameterization:
     - Identifiers: IUPAC systematic name, SMILES string, InChI, InChIKey, CAS registry number.
     - Physical constants: Molecular weight ($M_w$), monoisotopic mass, physical state at 25°C, melting point ($T_m$), boiling point ($T_b$), density ($\rho$), aqueous solubility ($S_{aq}$), partition coefficient ($\log P$), acid-base dissociation constants ($pK_a$).
     - Standard thermochemical state functions: $\Delta H_f^\circ$, $S^\circ$, $C_p$, and $\Delta G_f^\circ$.
   - Multi-disciplinary classification across Organic, Inorganic, Biochemical, Pharmaceutical, and Organometallic chemistry.

2. **Multi-Modal Analytical Spectroscopic Standards**:
   - **Ultraviolet-Visible (UV-Vis)**:
     - Peak absorption wavelengths ($\lambda_{max}$ in $\text{nm}$), molar absorption extinction coefficients ($\epsilon$ in $\text{M}^{-1}\cdot\text{cm}^{-1}$), and electronic transition assignments ($\pi \to \pi^*$, $n \to \pi^*$, MLCT, $d-d$).
   - **Fourier-Transform Infrared (FTIR)**:
     - Wavenumbers ($\tilde{\nu}$ in $\text{cm}^{-1}$), qualitative intensities (strong, medium, weak, broad), and normal vibrational mode assignments (carbonyl stretches, Fermi doublets, OH hydrogen bonds, ring breathing modes).
   - **Nuclear Magnetic Resonance ($^1\text{H}$ & $^{13}\text{C}$ NMR)**:
     - Isotropic chemical shifts ($\delta$ in $\text{ppm}$), spin-spin splitting multiplicity ($s, d, t, q, m, dd$), proton integrations, and carbon hybridization / functional group assignments.

3. **"Analytical Unknown Detective" Peak Matcher**:
   - Reverse-lookup search engine matching unknown experimental peaks against reference standards within user-configurable percentage tolerance windows ($\pm 1\% - 20\%$).
   - Multi-modal joint search combining UV, FTIR, and NMR criteria.

4. **Interactive UI Workstation**:
   - Mounted in `MolecularExplorerPage.tsx` under the new dedicated workbench tab **Spectral Database**.
   - Includes real-time catalog analytics banner, multi-faceted filtering (formula, category, state, MW, LogP, spectral availability), grid card view, and an inspector modal with interactive tabbed spectroscopy tables.
   - Comprehensive offline fallback enabling zero-latency client-side querying when backend connectivity is unavailable.

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/compound_database.py](file:///d:/proton%20pages/services/chemistry/app/models/compound_database.py): Domain models for `SpectralPeakUv`, `SpectralBandIr`, `SpectralShiftNmr1H`, `SpectralShiftNmr13C`, `DetailedCompound`, and `CompoundSearchResult`.
- [schemas/compound_database.py](file:///d:/proton%20pages/services/chemistry/app/schemas/compound_database.py): Pydantic request and response schemas for search, spectral matching, and catalog statistics.
- [services/compound_database_service.py](file:///d:/proton%20pages/services/chemistry/app/services/compound_database_service.py): High-performance search, filtering, and spectral matching engine with curated standards database.
- [api/v1/endpoints/compound_database.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/compound_database.py): REST endpoints under `/api/v1/chemistry/compound-database`.
- [tests/unit/test_compound_database.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_compound_database.py): Unit tests for search, bounds, spectral filtering, and matching.
- [tests/integration/test_compound_database_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_compound_database_api.py): FastAPI integration tests for HTTP contracts, status codes, and error formatting.

### Frontend Architecture (`src/`)
- [types/compoundDatabase.ts](file:///d:/proton%20pages/src/types/compoundDatabase.ts): TypeScript interface contracts.
- [data/compoundsReferenceComprehensive.ts](file:///d:/proton%20pages/src/data/compoundsReferenceComprehensive.ts): Resilient client-side reference dataset.
- [services/compoundDatabaseService.ts](file:///d:/proton%20pages/src/services/compoundDatabaseService.ts): Client service with automatic fallback to local dataset.
- [services/compoundDatabaseService.test.ts](file:///d:/proton%20pages/src/services/compoundDatabaseService.test.ts): Vitest test suite.
- [components/chemistry/compounds/CompoundDatabaseExplorer.tsx](file:///d:/proton%20pages/src/components/chemistry/compounds/CompoundDatabaseExplorer.tsx): Glassmorphic interactive database explorer and unknown peak matcher.
- [pages/MolecularExplorerPage.tsx](file:///d:/proton%20pages/src/pages/MolecularExplorerPage.tsx): Integrated as 6th workbench tab.

---

## 3. Verification & Quality Gates

- **Unit & Integration Pytest**: 17 tests passed (0 failures) in `services/chemistry/tests/unit/test_compound_database.py` and `test_compound_database_api.py`.
- **Full Backend Pytest**: 479 passed in `python -m pytest services/chemistry/tests`.
- **Frontend Vitest**: 36 test files, 202 passed (0 failures).
- **TypeScript Typecheck**: Clean `tsc --noEmit` pass with zero errors.
- **Production Build**: Clean `npm run build` bundle.
