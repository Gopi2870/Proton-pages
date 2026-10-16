# Proton Pages — Expansion Progress Log

**Durable State Tracker for Recursive Engineering Iterations**

---

## Iteration Log

### Iteration 0: Baseline Repository Audit (Phase 0)
- **Status**: Completed
- **Changes**: Established reproducible counting script `scripts/count_loc.py`, untracked 46 `.pyc` files, updated `.gitignore`.
- **Metrics**: 80,584 total lines, 78,744 LOC.

### Iteration 1: Foundations, CI/CD & Vitest Suite (Phase 1.1)
- **Status**: Completed
- **Changes**:
  - Added `.github/workflows/ci.yml`.
  - Installed Vitest, configured `vitest.config.ts`, added 26 frontend unit tests.
  - Rewrote `ChemicalFormulaValidator.parseFormula()` with recursive descent parser for nested brackets and hydrates.
  - Wired all 9 orphan pages in `src/App.tsx`, `Sidebar.tsx`, and `Header.tsx`.
- **Metrics**: 81,410 total lines, 79,402 LOC.

### Iteration 2: FastAPI Chemistry Gateway & PostgreSQL Schema (Phase 1.2)
- **Status**: Completed
- **Changes**:
  - Implemented FastAPI server in `services/chemistry/app/server.py` with versioned routers `/api/v1/chemistry/...` for elements, compounds, formulas, reactions, stoichiometry, and unified search.
  - Added 22 integration tests in `test_api_endpoints.py`.
  - Implemented SQLAlchemy 2.x models (`User`, `UserSession`, `ChemicalBookmark`, `ExperimentRecord`) and PBKDF2 password security.
  - Added Alembic migration `0001_initial_schema.py` and 6 database integration tests (`test_database.py`).
  - Created Docker Compose environment (`docker-compose.yml`, Dockerfiles, `.env.example`).
  - Added `src/vite-env.d.ts` and updated `src/services/api.ts` with environment configuration.
- **Metrics**: 83,008 total lines, 80,636 LOC.

### Iteration 3: Virtual Chemical Mixer Subsystem (Phase 5)
- **Status**: Completed
- **Changes**:
  - Implemented deterministic aqueous mixing calculation engine in `services/chemistry/app/services/mixer_service.py` with ionic dissociation, logarithmic pH neutralization ($pH = -\log_{10}[H^+]$), neutralization heat ($\Delta H_{neut} = -55.8\text{ kJ/mol}$, $\Delta T$), $K_{sp}$ precipitate phase separations ($AgCl$, $BaSO_4$, $Cu(OH)_2$, $Ag_2CrO_4$), effervescence ($CO_2$), and NFPA 704 hazard warnings.
  - Exposed endpoint `POST /api/v1/chemistry/mixer/simulate`.
  - Added 8 unit tests in `test_mixer.py` and 4 Vitest unit tests in `src/services/mixerService.test.ts`.
  - Overhauled UI in `src/pages/ChemicalMixerPage.tsx` with pipette volume/molarity controls, live glassware graphics, gas bubble animations, precipitate badges, and net ionic equation ribbons.
- **Metrics**: 84,310 total lines, 81,747 LOC.

### Iteration 4: User Persistence, Bookmarking & Virtual Lab Notebook (Phase 8)
- **Status**: Completed
- **Changes**:
  - Implemented Pydantic v2 schemas (`UserCreate`, `UserLogin`, `UserResponse`, `BookmarkCreate`, `BookmarkResponse`, `ExperimentCreate`, `ExperimentResponse`).
  - Added authentication and session middleware in `services/chemistry/app/core/dependencies.py` with Bearer token validation and guest mode fallback.
  - Implemented REST endpoints for Auth (`/api/v1/auth/register`, `/login`, `/me`, `/logout`), Bookmarks (`/api/v1/bookmarks`, delete by item), and Virtual Experiments (`/api/v1/experiments`, CRUD with observations and simulation telemetry).
  - Added 5 integration tests in `test_user_persistence_api.py` (all passing).
  - Upgraded frontend API client in `src/services/api.ts` with `tokenStorage`, `bookmarksApi`, and `experimentsApi`, tested via `src/services/api.test.ts` (7 tests).
  - Wired `ChemicalMixerPage.tsx` to persist simulations directly to `/api/v1/experiments`.
  - Upgraded `SavedItemsPage.tsx` with live bookmarks, experiment records, delete actions, and module shortcuts.
- **Metrics**: 85,695 total lines, 82,918 LOC.

---

## Next Prioritized Tasks

1. **Task 1: Thermochemistry & Electrochemistry Expansion (Phase 2)**:
   - Implement Hess's Law standard enthalpy matrix solver and Nernst equation electrochemistry engine with standard reduction potentials in Python chemistry services.
   - Expose endpoints under `/api/v1/chemistry/thermo` and `/api/v1/chemistry/electrochemistry`.
2. **Task 2: Molecular 3D Visualization & Geometry (Phase 3)**:
   - Integrate WebGL/Three.js or 3D ball-and-stick molecular viewer in `MolecularExplorerPage.tsx` with atom hover inspection and bond length metrics.
3. **Task 3: Virtual Lab Titration & Calorimetry Workflows (Phase 4)**:
   - Wire interactive buret titration curves and calorimeter temperature logging directly to the experiment persistence store.

