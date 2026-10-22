# Pull Request #027: Reaction Kinetics, Rate Laws & Catalytic Dynamics Reactor Engine

- **Branch**: `feature/reaction-kinetics-dynamics`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive chemical reaction kinetics and dynamic transport subsystem for Proton Pages:
1. **Integrated Rate Laws**: Exact analytical solvers for zero-order ($[A]_t = [A]_0 - kt$), first-order ($[A]_t = [A]_0 e^{-kt}$, constant $t_{1/2} = \ln 2/k$), and second-order ($\frac{1}{[A]_t} = \frac{1}{[A]_0} + kt$, $t_{1/2} = \frac{1}{k[A]_0}$) reaction progressions.
2. **Arrhenius Energetics & Activation Barriers**: Two-point temperature solver calculating activation energy $E_a$ (kJ/mol) and pre-exponential frequency factor $A$, with temperature response curves from -10°C to 110°C.
3. **Michaelis-Menten Enzyme Catalysis**: Substrate saturation velocity ($v_0 = \frac{V_{max}[S]}{K_m + [S]}$) with competitive, uncompetitive, and non-competitive enzyme inhibition modeling.
4. **Consecutive Sequential Reaction Dynamics**: Multi-step $A \xrightarrow{k_1} B \xrightarrow{k_2} C$ intermediate accumulation kinetics with analytical maximum time $t_{max} = \frac{\ln(k_1/k_2)}{k_1 - k_2}$.
5. **Interactive Reactor Workstation**: Live CSTR reactor animation, real-time $[A](t)$ time-course graphs, linearized rate plots, and direct lab notebook persistence.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/kinetics.py](file:///d:/proton%20pages/services/chemistry/app/models/kinetics.py): Dataclass domain models for rate law time-series, Arrhenius energetics, enzyme kinetics, and consecutive reactions.
- [schemas/kinetics.py](file:///d:/proton%20pages/services/chemistry/app/schemas/kinetics.py): Pydantic v2 schemas validating kinetics payloads.
- [services/kinetics_service.py](file:///d:/proton%20pages/services/chemistry/app/services/kinetics_service.py): Mathematical kinetics service with preset reaction library.
- [api/v1/endpoints/kinetics.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/kinetics.py): FastAPI endpoints mounted under `/api/v1/chemistry/kinetics/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Sub-router aggregator.

### Frontend Architecture (`src/`)
- [types/kinetics.ts](file:///d:/proton%20pages/src/types/kinetics.ts): TypeScript domain contracts.
- [services/kineticsService.ts](file:///d:/proton%20pages/src/services/kineticsService.ts): Frontend API client with analytical offline fallbacks.
- [components/chemistry/reactions/KineticsReactorRig.tsx](file:///d:/proton%20pages/src/components/chemistry/reactions/KineticsReactorRig.tsx): Interactive reactor workstation with stirred tank animation and dual SVG charts.
- [pages/ReactionDatabasePage.tsx](file:///d:/proton%20pages/src/pages/ReactionDatabasePage.tsx): Integrated kinetics workstation tab.

---

## 3. Verification & Test Metrics

- **Backend Pytest**: 13 new tests (7 unit in `test_kinetics.py`, 6 integration in `test_kinetics_api.py`). Full suite: **187 / 187 tests passing** with **88% coverage**.
- **Frontend Vitest**: 6 new unit tests in `src/services/kineticsService.test.ts`. Full suite: **74 / 74 tests passing** across 13 test files.
- **TypeScript Static Verification**: `tsc --noEmit` clean with **0 errors**.
- **Production Build**: Clean compilation.
