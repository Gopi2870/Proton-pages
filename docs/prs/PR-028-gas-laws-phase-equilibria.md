# Pull Request #028: Gas Laws, Kinetic Theory & Real Gas Phase Equilibria Engine

- **Branch**: `feature/gas-laws-phase-equilibria`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive chemical thermodynamics and physical gas mechanics subsystem for Proton Pages:
1. **Ideal Gas State Engine**: Exact analytical state variables solver ($PV = nRT$) for $P, V, T, n$ across standard SI and engineering units ($\text{atm}, \text{kPa}, \text{bar}, \text{torr}, \text{L}, \text{mL}, \text{K}, ^\circ\text{C}$).
2. **Van der Waals Real Gas Equation of State**: Solving $(P + a\frac{n^2}{V^2})(V - nb) = nRT$ with real gas compressibility factor $Z = \frac{PV}{nRT}$ across real gas presets ($\text{He}, \text{H}_2, \text{N}_2, \text{O}_2, \text{CO}_2, \text{H}_2\text{O}, \text{CH}_4, \text{NH}_3, \text{Cl}_2$).
3. **Maxwell-Boltzmann Molecular Speed Distribution**: Kinetic theory distribution $f(v) = 4\pi \left(\frac{M}{2\pi RT}\right)^{3/2} v^2 \exp\left(-\frac{Mv^2}{2RT}\right)$, computing root-mean-square speed $v_{rms} = \sqrt{\frac{3RT}{M}}$, mean speed $v_{avg} = \sqrt{\frac{8RT}{\pi M}}$, and most probable speed $v_{mp} = \sqrt{\frac{2RT}{M}}$.
4. **Clausius-Clapeyron Vapor-Liquid Phase Equilibria**: Temperature-dependent vapor pressure curve $\ln\left(\frac{P_2}{P_1}\right) = -\frac{\Delta H_{vap}}{R} \left(\frac{1}{T_2} - \frac{1}{T_1}\right)$ determining boiling point shifts under non-standard ambient pressures.
5. **Interactive Workstation #4 (Piston Chamber Rig)**: Live gas-cylinder animated viewport with dynamic piston compression, thermal particle kinetics, real-time $P$-$V$ isotherms, Maxwell-Boltzmann distribution curves, and electronic lab notebook persistence.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/gas_laws.py](file:///d:/proton%20pages/services/chemistry/app/models/gas_laws.py): Dataclass domain models for ideal gas, Van der Waals real gas parameters, speed distributions, and vapor-liquid equilibria.
- [schemas/gas_laws.py](file:///d:/proton%20pages/services/chemistry/app/schemas/gas_laws.py): Pydantic v2 schemas validating gas parameters and simulation requests.
- [services/gas_laws_service.py](file:///d:/proton%20pages/services/chemistry/app/services/gas_laws_service.py): High-precision physical chemistry solver with empirical gas database.
- [api/v1/endpoints/gas_laws.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/gas_laws.py): FastAPI endpoints mounted at `/api/v1/chemistry/gas-laws/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router aggregation for gas laws endpoints.

### Frontend Architecture (`src/`)
- [types/gasLaws.ts](file:///d:/proton%20pages/src/types/gasLaws.ts): TypeScript domain interfaces and type definitions.
- [services/gasLawsService.ts](file:///d:/proton%20pages/src/services/gasLawsService.ts): API client with local physics fallback engine.
- [services/gasLawsService.test.ts](file:///d:/proton%20pages/src/services/gasLawsService.test.ts): 5 comprehensive Vitest tests verifying calculation accuracy and offline fallbacks.
- [components/chemistry/virtual-lab/GasLawsPistonRig.tsx](file:///d:/proton%20pages/src/components/chemistry/virtual-lab/GasLawsPistonRig.tsx): Animated piston apparatus with dual SVG curves, pressure transducers, and state notebook logging.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Mounted as Rig #4 alongside Titration, Calorimetry, and Spectrophotometer rigs.

---

## 3. Verification & Test Metrics

- **Backend Pytest**: 12 new tests (7 unit in `test_gas_laws.py`, 5 integration in `test_gas_laws_api.py`). Full chemistry suite: **199 / 199 tests passing** with **88% coverage**.
- **Frontend Vitest**: 5 new tests in `gasLawsService.test.ts`. Full suite: **79 / 79 tests passing** across 14 test files.
- **TypeScript Static Verification**: `tsc --noEmit` verified with **0 errors**.
- **UI Responsiveness & Tokens**: Strictly compliant with Parchment, Copper, Amber, and Charcoal design system.
