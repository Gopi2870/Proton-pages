# Pull Request #042: Nuclear Chemistry, Radioactive Decay Chains & Bateman Solvers

- **Branch**: `feature/nuclear-decay-bateman-chains`
- **Target**: `main`
- **Type**: Feature / Nuclear Chemistry, Radiochemistry & Scientific Computing
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive, mathematically rigorous nuclear-decay workstation and radiochemical kinetics simulation platform for Proton Pages:

1. **Analytical Bateman Cascade Equation Solver**:
   - Sequential disintegration chains from parent radionuclide $N_1$ through multiple daughter products $N_2, N_3, \ldots, N_n$:
     $$\frac{dN_1}{dt} = -\lambda_1 N_1$$
     $$\frac{dN_i}{dt} = \beta_{i-1} \lambda_{i-1} N_{i-1} - \lambda_i N_i \quad (i = 2, \ldots, n)$$
   - Analytical Bateman closed-form solution:
     $$N_n(t) = N_1(0) \cdot \left( \prod_{i=1}^{n-1} \beta_i \lambda_i \right) \sum_{j=1}^n \frac{e^{-\lambda_j t}}{\prod_{k=1, k \ne j}^n (\lambda_k - \lambda_j)}$$
   - Superposition principle applied for non-zero initial daughter populations.
   - Stable final end-product accumulation via atom conservation:
     $$N_{\text{stable}}(t) = N_{\text{total}}(0) - \sum_{i \text{ radioactive}} N_i(t)$$

2. **Degenerate Decay Constant Regularization**:
   - In instances where parent and daughter or successive nuclides share identical or near-identical decay constants ($\lambda_j \to \lambda_k$), the Bateman denominator $\prod (\lambda_k - \lambda_j) \to 0$.
   - The engine implements an infinitesimal perturbation regularization ($\lambda_k' = \lambda_k \times (1 + 10^{-6})$) ensuring numerical stability without altering physical kinetics.

3. **Radiochemical Equilibrium Phenomena**:
   - **Transient Equilibrium** ($\lambda_1 < \lambda_2$ or $t_{1/2, 1} > t_{1/2, 2}$):
     - Analytical time of maximum daughter activity:
       $$t_{\max} = \frac{\ln(\lambda_2 / \lambda_1)}{\lambda_2 - \lambda_1}$$
     - Asymptotic daughter-to-parent activity ratio:
       $$\frac{A_2(t)}{A_1(t)} \to \frac{\lambda_2}{\lambda_2 - \lambda_1} > 1$$
     - Exemplified by the medical workhorse ${}^{99}\text{Mo} \to {}^{99m}\text{Tc}$ generator ($t_{\max} \approx 22.9\text{ hours}$).
   - **Secular Equilibrium** ($\lambda_1 \ll \lambda_2$ or $t_{1/2, 1} \gg t_{1/2, 2}$):
     - Daughter activity asymptotically equals parent activity ($A_2 \approx A_1$).
     - Exemplified by the ${}^{222}\text{Rn}$ short-lived progeny cascade ($t_{1/2} = 3.82\text{ d}$ vs minutes).

4. **Calibrated Radiocarbon Dating Lab**:
   - Uncalibrated radiocarbon age calculation from measured fraction of modern carbon ($F = A / A_0$):
     $$t_{\text{BP}} = -\frac{1}{\lambda} \ln(F) = -\frac{t_{1/2}}{\ln 2} \ln(F)$$
   - Supports both the **Cambridge physical half-life** ($t_{1/2} = 5,730 \pm 40\text{ y}$, IUPAC standard) and the **Libby conventional half-life** ($t_{1/2} = 5,568 \pm 30\text{ y}$).
   - **Crucial Scientific Limitation & Calibration Notice**:
     - Explicitly documents that uncalibrated ages (reported in years Before Present, where $0\text{ BP} = 1950\text{ CE}$) require calibration against dendrochronological records (IntCal20 calibration curve).
     - Explains physical mechanisms necessitating calibration: historical geomagnetic field modulation of cosmic ray flux, solar cycle variations, industrial fossil-fuel ${}^{14}\text{C}$ dilution (Suess effect post-1850), and above-ground thermonuclear testing (bomb carbon spike post-1950).

5. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #9: Nuclear Decay & Radiochemistry**.
   - Dual-mode interface: **Bateman Decay Simulator** & **Radiocarbon Dating Lab**.
   - Custom SVG multi-curve trajectory visualizer with interactive crosshair inspection, time unit conversion, and nuclide cascade architecture diagram.
   - Built with the strict Proton Pages Parchment White (`#FDF8F5`), Copper Reaction (`#D47942`), Amber Bottle (`#8B572A`), and Charcoal Ash (`#2C302E`) design language.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/nuclear_decay.py](file:///d:/proton%20pages/services/chemistry/app/models/nuclear_decay.py): Domain models for `Radioisotope`, `DecayChainPreset`, `BatemanTimePoint`, and `RadiocarbonDatingResult`.
- [schemas/nuclear_decay.py](file:///d:/proton%20pages/services/chemistry/app/schemas/nuclear_decay.py): Pydantic request and response schemas.
- [services/nuclear_decay_service.py](file:///d:/proton%20pages/services/chemistry/app/services/nuclear_decay_service.py): `NuclearDecayEngine` implementing analytical Bateman equations, lambda regularization, and radiocarbon dating.
- [api/v1/endpoints/nuclear_decay.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/nuclear_decay.py): FastAPI endpoints mounted at `/api/v1/chemistry/nuclear-decay`.

### Frontend Architecture (`src/`)
- [types/nuclearChemistry.ts](file:///d:/proton%20pages/src/types/nuclearChemistry.ts): TypeScript interfaces for isotopes, decay presets, trajectories, and radiocarbon dating results.
- [services/nuclearChemistryService.ts](file:///d:/proton%20pages/src/services/nuclearChemistryService.ts): Dual-layer service with full client-side Bateman solver fallback and radiocarbon calculator.
- [services/nuclearChemistryService.test.ts](file:///d:/proton%20pages/src/services/nuclearChemistryService.test.ts): Vitest unit tests for the service.
- [components/chemistry/nuclear/NuclearDecayWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/nuclear/NuclearDecayWorkstation.tsx): Interactive workstation component.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Integration as Rig #9.

---

## 3. Automated Test Evidence

### Backend Test Results (Pytest)
```
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_presets_registered PASSED
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_single_step_exponential_decay PASSED
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_molybdenum_technetium_transient_equilibrium PASSED
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_radon_secular_equilibrium PASSED
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_bateman_equal_decay_constants_regularization PASSED
services/chemistry/tests/unit/test_nuclear_decay.py::TestNuclearDecayEngine::test_radiocarbon_dating_half_lives PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_get_presets_endpoint PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_get_preset_detail_endpoint PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_get_preset_detail_not_found PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_simulate_bateman_endpoint_transient_equilibrium PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_simulate_bateman_invalid_units PASSED
services/chemistry/tests/integration/test_nuclear_decay_api.py::TestNuclearDecayApi::test_radiocarbon_dating_endpoint PASSED
======================== 373 passed in 22.97s ========================
```

### Frontend Test Results (Vitest)
```
 ✓ src/services/nuclearChemistryService.test.ts (9 tests) 111ms
 Test Files  28 passed (28)
      Tests  156 passed (156)
   Duration  6.18s
```

### TypeScript Validation
```
npx tsc --noEmit
Exit Code: 0 (Zero errors)
```

---

## 4. Verification & Validation Summary
- Bateman equation solver verified against analytical single-nuclide half-life population ($N(t_{1/2}) = 0.5 N_0$).
- Transient equilibrium verified against analytical ${}^{99}\text{Mo}/{}^{99m}\text{Tc}$ formula $t_{\max} \approx 22.9\text{ h}$.
- Secular equilibrium verified against ${}^{222}\text{Rn}$ daughter activity parity after $\approx 6\text{ h}$.
- Equal-decay-constant regularization verified to yield finite, positive populations without NaN or division by zero.
- Radiocarbon ages verified for 1 and 2 half-lives ($5,730\text{ BP}$ and $11,460\text{ BP}$).
- Zero regressions across existing test suites (373 Pytest + 156 Vitest).
