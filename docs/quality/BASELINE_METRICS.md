# Proton Pages — Quality & Baseline Metrics

**Date**: October 16, 2026  
**Auditor**: Antigravity Platform Engineering  
**Measurement Script**: `python scripts/count_loc.py`  
**Execution Command**: `python scripts/count_loc.py --json`

---

## 1. Lines of Code (LOC) Accounting

### Inclusion & Exclusion Rules
- **Included**: Tracked first-party source files (`.ts`, `.tsx`, `.py`, `.js`, `.json`, `.css`, `.html`, `.md`, `.toml`, `.yaml`).
- **Excluded**: `node_modules/`, `.git/`, `dist/`, `build/`, `.pytest_cache/`, `__pycache__/`, `package-lock.json`, and binary assets.
- **Categorization**:
  1. **Reference Datasets**: Static chemistry encyclopedias (`src/data/`).
  2. **Frontend Implementation**: Core UI, pages, components, and client services (`src/`).
  3. **Backend Implementation**: Chemistry computing engine & FastAPI service (`services/chemistry/app/`).
  4. **Database & Migrations**: Persistence models and Alembic migration scripts (`services/chemistry/alembic/`).
  5. **Independent Tests**: Vitest frontend tests and Pytest backend tests (`services/chemistry/tests/`, `src/**/*.test.ts`).
  6. **Configuration & Infrastructure**: Docker, CI workflows, bundler configs.
  7. **Documentation**: Specifications, audit reports, roadmaps.

### Baseline Metrics Table

| Architecture Category | Files | Total Lines | Blank Lines | Comment Lines | Executable Code (LOC) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Reference Datasets & Dictionaries** | 16 | 63,093 | 23 | 1 | **63,069** |
| **Frontend Implementation** | 97 | 10,117 | 794 | 65 | **9,258** |
| **Backend Implementation** | 55 | 6,612 | 503 | 415 | **5,694** |
| **Generators & Utility Scripts** | 4 | 1,027 | 73 | 33 | **921** |
| **Independent Test Suites** | 19 | 1,153 | 212 | 86 | **855** |
| **Documentation** | 5 | 477 | 113 | 0 | **364** |
| **Configuration & Infrastructure** | 9 | 351 | 19 | 2 | **330** |
| **Database & Migrations** | 2 | 151 | 20 | 13 | **118** |
| **Other / Root Markup** | 1 | 27 | 0 | 0 | **27** |
| **TOTAL** | **208** | **83,008** | **1,757** | **615** | **80,636** |

---

## 2. Test Execution & Coverage Baseline

- **Frontend Tests**: 26 tests passing in 1.17s across 3 test files (100% pass rate).
- **Backend Tests**: 111 tests passing in 4.48s across 16 test files (100% pass rate).
- **Backend Statement Coverage**: **85%** (1,273 of 1,497 statements covered).
- **Type Checker**: `npx tsc --noEmit` exited with code 0 (zero errors).
- **Vite Production Build**: `npm run build` succeeded in 26.11s.

---

## 3. Milestones Toward Long-Term Targets

| Metric | Target | Current Baseline | Remaining |
| :--- | :---: | :---: | :---: |
| **Total Non-Blank LOC** | 600,000+ | **80,636** | 519,364 |
| **First-Party Code** | 200,000+ | **14,952** | 185,048 |
| **Independent Tests** | 1,000+ tests | **137 tests** | 863 tests |
| **Commits** | 100+ | **15 commits** | 85 commits |
| **Pull Requests** | 100+ | **0 open/merged** | 100 PRs |
