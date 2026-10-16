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

---

## Next Prioritized Tasks

1. **Task 1: Virtual Chemical Mixer Engine (Phase 5)**:
   - Implement the deterministic chemical mixing calculation engine in `services/chemistry/app/services/mixer_service.py`.
   - Calculate precipitates, gas evolution, neutralization temperature shifts, and NFPA 704 hazard warnings.
   - Expose endpoint `POST /api/v1/chemistry/mixer/simulate` and wire up the frontend in `src/pages/ChemicalMixerPage.tsx`.
2. **Task 2: User Persistence & Bookmarking API (Phase 8)**:
   - Expose CRUD REST endpoints for `/api/v1/users`, `/api/v1/bookmarks`, and `/api/v1/experiments`.
   - Connect `src/pages/SavedItemsPage.tsx` and user profile preferences to live backend storage.
3. **Task 3: Thermochemistry & Electrochemistry Expansion (Phase 2)**:
   - Add Hess's Law reaction enthalpies and Nernst equation solvers in Python engine with unit tests.
