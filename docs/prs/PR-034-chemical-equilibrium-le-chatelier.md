# Pull Request #034: Chemical Equilibrium, Buffer Capacity & Le Chatelier Perturbation Engine

- **Branch**: `feature/chemical-equilibrium-le-chatelier`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive chemical equilibrium engine, polyprotic speciation solver, van Slyke buffer capacity simulator, solubility product ($K_{sp}$) calculator, and Le Chatelier perturbation workstation for Proton Pages:

1. **RICE/ICE Table Monotonic Root Finder**:
   - Strictly monotonic log-quotient root finding:
     $$g(\xi) = \sum_{j} c_j \ln(C_{j,0} + c_j \xi) - \sum_{i} a_i \ln(A_{i,0} - a_i \xi) - \ln K = 0$$
   - Rigorous physical bracketing on $(\xi_{\min}, \xi_{\max})$ guaranteeing global convergence without non-physical negative concentrations.
   - Initial reaction quotient $Q = \prod [P]_0^c / \prod [R]_0^a$ comparison with $K$ predicting thermodynamic direction of shift (forward, reverse, at equilibrium).
   - Residual error verification and iteration tracking.

2. **Polyprotic Acid Dissociation & Speciation**:
   - Exact electroneutrality charge-balance root solver across arbitrary $N$-protic systems:
     $$[H^+] - \frac{K_w}{[H^+]} - \sum_{i=1}^{N} i \cdot \alpha_i \cdot C_a = 0$$
   - Alpha-fraction speciation distribution $\alpha_0, \alpha_1, \dots, \alpha_N$ across the pH domain without monoprotic approximations that fail for moderately strong first dissociation steps (e.g. phosphoric acid $pK_{a1} = 2.15$).

3. **van Slyke Analytical Buffer Capacity & Addition Response**:
   - Mathematical buffer capacity index $\beta$:
     $$\beta = \frac{dC_b}{dpH} = 2.303 \left( [H^+] + [OH^-] + \frac{C_{\text{tot}} K_a [H^+]}{(K_a + [H^+])^2} \right)$$
   - Analytical peak buffer capacity at $pH = pK_a$, with full response curve generation across $pH \in [1, 13]$.
   - Differential pH response to strong acid and strong base addition.

4. **Solubility Equilibria ($K_{sp}$) & Common-Ion Effect**:
   - Pure water solubility $s = (K_{sp} / (m^m n^n))^{1/(m+n)}$ for arbitrary stoichiometry $M_m X_n$.
   - Common-ion depression solver with full double precision, accurately modeling precipitate formation thresholds and ion product $Q_{sp}$.

5. **Le Chatelier Perturbation Simulator**:
   - Temperature perturbations modeled via the van 't Hoff relation:
     $$\ln\left(\frac{K_2}{K_1}\right) = -\frac{\Delta H^\circ}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)$$
   - Pressure and volume scaling via reaction quotient perturbation $Q_p' = Q_p \cdot P_{\text{mult}}^{-\Delta n_g}$.
   - Concentration spikes with immediate reaction quotient shift and relaxation to the new equilibrium state.
   - Clear pedagogical explanations for thermodynamic shifts across curated benchmarks (Haber-Bosch, $\text{NO}_2/\text{N}_2\text{O}_4$, $\text{HI}$, Cobalt(II) coordination complex).

6. **Interactive Equilibrium Workstation**:
   - Integrated into the existing chemistry experience under `ReactionDatabasePage.tsx` alongside thermochemistry, electrochemistry, kinetics, and mechanisms.
   - Interactive RICE table matrix with initial vs equilibrium concentration profiles.
   - van Slyke buffer curve visualizer with $pK_a$ marker.
   - Solubility comparison between pure water and common-ion depression.
   - Electronic Lab Notebook persistence via `experimentsApi.saveExperiment`.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/equilibrium.py](file:///d:/proton%20pages/services/chemistry/app/models/equilibrium.py): Domain dataclasses for reaction participants, RICE table rows, polyprotic speciation fractions, buffer capacity curves, solubility product calculations, and Le Chatelier perturbations.
- [schemas/equilibrium.py](file:///d:/proton%20pages/services/chemistry/app/schemas/equilibrium.py): Pydantic v2 schemas for all requests and responses.
- [services/equilibrium_service.py](file:///d:/proton%20pages/services/chemistry/app/services/equilibrium_service.py): Core scientific calculation service with monotonic bracketed root finder, polyprotic electroneutrality solver, analytical van Slyke buffer capacity, and van 't Hoff temperature/pressure perturbation models.
- [api/v1/endpoints/equilibrium.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/equilibrium.py): FastAPI endpoints mounted under `/api/v1/chemistry/equilibrium/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router aggregation and mounting.
- [tests/unit/test_equilibrium.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_equilibrium.py): 8 unit tests covering forward/reverse RICE shifts, polyprotic phosphoric acid speciation, van Slyke buffer capacity, $PbI_2$ pure solubility, common-ion depression, gas pressure perturbations, and van 't Hoff temperature shifts.
- [tests/integration/test_equilibrium_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_equilibrium_api.py): 6 integration tests verifying equilibrium presets, RICE table endpoint, polyprotic endpoint, buffer capacity endpoint, solubility $K_{sp}$ endpoint, and Le Chatelier perturbation endpoint.

### Frontend Architecture (`src/`)
- [types/equilibrium.ts](file:///d:/proton%20pages/src/types/equilibrium.ts): TypeScript domain contracts and interfaces.
- [services/equilibriumService.ts](file:///d:/proton%20pages/src/services/equilibriumService.ts): API client with complete client-side analytical simulation fallback.
- [services/equilibriumService.test.ts](file:///d:/proton%20pages/src/services/equilibriumService.test.ts): 6 Vitest tests verifying presets, bracketed RICE solving, polyprotic speciation, van Slyke buffer capacity, $PbI_2$ common-ion depression, and Le Chatelier responses.
- [components/chemistry/equilibrium/EquilibriumWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/equilibrium/EquilibriumWorkstation.tsx): Interactive workstation with RICE matrix, concentration profiles, polyprotic speciation distribution, van Slyke buffer curve SVG, $K_{sp}$ comparison, Le Chatelier stress simulator, and lab notebook logging.
- [pages/ReactionDatabasePage.tsx](file:///d:/proton%20pages/src/pages/ReactionDatabasePage.tsx): Mounted as new "Equilibrium & Le Chatelier" tab alongside Reaction Catalog, Thermodynamics & Hess, Electrochemistry & Nernst, Kinetics & Rate Laws, and Organic Mechanisms.

---

## 3. Verification & Test Metrics

- **Backend Pytest**: 14 new tests (8 unit, 6 integration). Full chemistry suite: **270 / 270 tests passing** (100%).
- **Frontend Vitest**: 6 new tests in `equilibriumService.test.ts`. Full suite: **106 / 106 tests passing** (100%).
- **TypeScript Static Verification**: `tsc --noEmit` verified with **0 errors**.
- **UI Design System**: Compliant with Parchment (`#FDF8F5`), Copper (`#D47942`), Amber (`#8B572A`), and Charcoal (`#2C302E`) design tokens.
