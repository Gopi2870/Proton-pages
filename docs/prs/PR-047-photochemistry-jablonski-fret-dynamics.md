# Pull Request #047: Photochemistry, Jablonski Energy Diagram & FRET Dynamics

- **Branch**: `feature/photochemistry-jablonski-fret-dynamics`
- **Target**: `main`
- **Type**: Feature / Photophysics, Radiative & Non-Radiative Transitions, Stern-Volmer Quenching & Förster Resonance Energy Transfer
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose

Implement a rigorous, first-principles photochemistry and photophysics simulation suite for Proton Pages:

1. **Jablonski State Manifold & Photophysical Transitions**:
   - Singlet ground ($S_0$), first singlet excited ($S_1$), and first triplet excited ($T_1$) states.
   - Transition rate constants:
     - Radiative fluorescence rate $k_r$ (or $k_F$)
     - Internal conversion rate $k_{IC}$ ($S_1 \to S_0$)
     - Intersystem crossing rate $k_{ISC}$ ($S_1 \to T_1$, spin-forbidden spin-orbit coupling)
     - Phosphorescence rate $k_P$ ($T_1 \to S_0$)
     - Triplet non-radiative decay $k_{IC2}$ ($T_1 \to S_0$)
   - Observable photophysical quantities:
     $$\tau_F = \frac{1}{k_r + k_{IC} + k_{ISC}}, \quad \Phi_F = \frac{k_r}{k_r + k_{IC} + k_{ISC}} = k_r \tau_F$$
     $$\Phi_{ISC} = \frac{k_{ISC}}{k_r + k_{IC} + k_{ISC}}, \quad \tau_P = \frac{1}{k_P + k_{IC2}}, \quad \Phi_P = \Phi_{ISC} \times \frac{k_P}{k_P + k_{IC2}}$$
   - Stokes shift calculation: $\Delta \lambda = \lambda_{em} - \lambda_{abs}$ and $\Delta \tilde{\nu} = 10^7 (1/\lambda_{abs} - 1/\lambda_{em}) \text{ cm}^{-1}$.

2. **Stern-Volmer Dynamic Quenching**:
   - Collisional deactivation of excited singlet state by molecular quenchers (e.g., $I^-$, acrylamide, molecular oxygen $\text{O}_2$):
     $$\frac{I_0}{I} = \frac{\tau_0}{\tau} = 1 + K_{SV} [Q]$$
     $$K_{SV} = k_q \tau_0$$
   - Smoluchowski diffusion limit comparison:
     $$k_{diff} = \frac{8 R T}{3 \eta}$$
     where $\eta$ is solvent viscosity ($0.89 \text{ mPa}\cdot\text{s}$ for water at $298.15\text{ K}$).

3. **Förster Resonance Energy Transfer (FRET)**:
   - Non-radiative dipole-dipole resonance energy transfer from donor to acceptor fluorophore:
     $$E = \frac{R_0^6}{R_0^6 + r^6}$$
   - Förster distance $R_0$ where efficiency $E = 50\%$:
     $$R_0 = 0.211 \times \left( \kappa^2 n^{-4} \Phi_D J \right)^{1/6} \text{ \AA}$$
     with orientation factor $\kappa^2 = 2/3$ (dynamic isotropic regime), refractive index $n = 1.333$ (aqueous buffer), and spectral overlap integral $J(\lambda)$.
   - Quenched donor fluorescence and sensitized acceptor emission calculation:
     $$F_D = F_{D,0} (1 - E), \quad F_A = F_{A,0} + E \times F_{D,0}$$

4. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #14: Photochemistry & Jablonski Energy Diagram**.
   - 3 operational tabs:
     1. Interactive Jablonski Diagram with state transitions, kinetic rates, and fluorescence lifetime visualization.
     2. Stern-Volmer Plot generator with quencher selection and linear regression fit.
     3. FRET Efficiency vs Distance curve with donor/acceptor distance slider and molecular ruler metrics.

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/photochemistry.py](file:///d:/proton%20pages/services/chemistry/app/models/photochemistry.py): Photophysical domain models, states, transitions, fluorophores, quenchers, and FRET pairs.
- [schemas/photochemistry.py](file:///d:/proton%20pages/services/chemistry/app/schemas/photochemistry.py): Pydantic request and response validation schemas.
- [services/photochemistry_service.py](file:///d:/proton%20pages/services/chemistry/app/services/photochemistry_service.py): `PhotochemistryEngine` with Jablonski kinetics, Stern-Volmer analysis, and FRET modeling.
- [api/v1/endpoints/photochemistry.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/photochemistry.py): REST API endpoints mounted under `/api/v1/chemistry/photochemistry`.
- [tests/unit/test_photochemistry.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_photochemistry.py): 6 scientific validation tests.
- [tests/integration/test_photochemistry_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_photochemistry_api.py): 5 REST API integration tests.

### Frontend Architecture (`src/`)
- [types/photochemistry.ts](file:///d:/proton%20pages/src/types/photochemistry.ts): Photophysical TypeScript interfaces and state models.
- [services/photochemistryService.ts](file:///d:/proton%20pages/src/services/photochemistryService.ts): Frontend calculation engine with curated fluorophores (Fluorescein, Rhodamine 6G, Quinine, Cy3, Cy5, CFP, YFP) and offline simulation.
- [services/photochemistryService.test.ts](file:///d:/proton%20pages/src/services/photochemistryService.test.ts): 5 Vitest tests.
- [components/chemistry/photochemistry/PhotochemistryWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/photochemistry/PhotochemistryWorkstation.tsx): Full glassmorphic workstation with interactive SVG Jablonski diagram and FRET curve.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Integrated as Rig #14.

---

## 3. Automated Verification & Quality Gates

### Backend Tests (Pytest)
```
services/chemistry/tests/unit/test_photochemistry.py ...... [ 54%]
services/chemistry/tests/integration/test_photochemistry_api.py ..... [100%]
======================= 11 passed in 4.98s =======================
```

### Frontend Tests (Vitest)
```
 ✓ src/services/photochemistryService.test.ts (5 tests)
```

### TypeScript Validation
```
npx tsc --noEmit -> Clean (0 errors)
```
