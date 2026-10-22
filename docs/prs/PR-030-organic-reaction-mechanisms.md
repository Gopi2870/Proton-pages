# Pull Request #030: Organic Chemistry Curved-Arrow Reaction Mechanisms Engine

- **Branch**: `feature/organic-reaction-mechanisms`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive organic reaction mechanism and electron-pushing subsystem for Proton Pages:
1. **Curved-Arrow Formalisms**: Precise two-electron double-barbed ($\curvearrowright$) and single-electron radical fishhook ($\rightharpoonup$) vector trajectories connecting electron donors (lone pairs, $\sigma$-bonds, $\pi$-bonds) to electrophilic centers.
2. **Elementary Step Transformations**: Step-by-step reaction sequences for core organic reaction classes ($S_N1, S_N2, E1, E2$, Electrophilic Aromatic Substitution EAS, Aldol condensation, Grignard addition, and Markovnikov hydrohalogenation).
3. **Reactive Intermediate Topologies**: High-accuracy modeling of planar $sp^2$ carbocations, tetrahedral carbanions, resonance-stabilized enolates, oxonium ions, and non-aromatic Arenium (Wheland $\sigma$-complex) ions with key bond formations/cleavages.
4. **Reaction Coordinate Free Energy Landscapes**: Analytical Gibbs free energy ($\Delta G$) landscapes across reaction progress coordinates ($0.0 \rightarrow 1.0$), identifying activation barriers $\Delta G^\ddagger$, reaction enthalpies $\Delta G^\circ$, and transition state geometries.
5. **Interactive Mechanism Player Workstation**: Animated Bezier curved-arrow canvas with dynamic electron flow trails, step-by-step scrubbing and auto-play controls, stereochemical outcome badges (Walden inversion, racemization, anti-periplanar, Zaitsev), and electronic lab notebook persistence.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/mechanisms.py](file:///d:/proton%20pages/services/chemistry/app/models/mechanisms.py): Dataclass domain models for curved arrows, mechanism steps, reactive intermediates, and reaction energy coordinates.
- [schemas/mechanisms.py](file:///d:/proton%20pages/services/chemistry/app/schemas/mechanisms.py): Pydantic v2 schemas validating mechanism steps, arrow trajectories, and energy interpolation requests.
- [services/mechanism_service.py](file:///d:/proton%20pages/services/chemistry/app/services/mechanism_service.py): Physical organic chemistry service with 8 standard reaction mechanism presets and Hermite energy interpolation.
- [api/v1/endpoints/mechanisms.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/mechanisms.py): FastAPI endpoints mounted at `/api/v1/chemistry/mechanisms/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router aggregation.

### Frontend Architecture (`src/`)
- [types/mechanisms.ts](file:///d:/proton%20pages/src/types/mechanisms.ts): TypeScript domain contracts.
- [services/mechanismService.ts](file:///d:/proton%20pages/src/services/mechanismService.ts): API client with offline analytical mechanisms and energy profile interpolation.
- [services/mechanismService.test.ts](file:///d:/proton%20pages/src/services/mechanismService.test.ts): 4 comprehensive Vitest tests verifying presets, curved-arrow vectors, multi-step intermediates, and energy landscapes.
- [components/chemistry/mechanisms/OrganicMechanismPlayer.tsx](file:///d:/proton%20pages/src/components/chemistry/mechanisms/OrganicMechanismPlayer.tsx): Interactive player component with animated curved arrows, step scrubber, and free energy curves.
- [pages/ReactionDatabasePage.tsx](file:///d:/proton%20pages/src/pages/ReactionDatabasePage.tsx): Mounted as new "Organic Mechanisms" tab alongside Catalog, Thermodynamics, Electrochemistry, and Kinetics.

---

## 3. Verification & Test Metrics

- **Backend Pytest**: 9 new tests (5 unit in `test_mechanisms.py`, 4 integration in `test_mechanisms_api.py`). Full chemistry suite: **222 / 222 tests passing**.
- **Frontend Vitest**: 4 new tests in `mechanismService.test.ts`. Full suite: **88 / 88 tests passing** across 16 test files.
- **TypeScript Static Verification**: `tsc --noEmit` verified with **0 errors**.
- **UI Design System**: Compliant with Parchment, Copper, Amber, and Charcoal design tokens.
