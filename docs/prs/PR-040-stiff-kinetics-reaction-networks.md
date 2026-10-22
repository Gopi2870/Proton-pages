# Pull Request #040: Computational Chemical Kinetics Network & Stiff ODE Solvers

- **Branch**: `feature/stiff-kinetics-reaction-networks`
- **Target**: `main`
- **Type**: Feature / Computational Physical Chemistry & Numerical Kinetics
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a high-performance numerical chemical kinetics network engine and interactive workstation for stiff reaction mechanisms:

1. **Linearly-Implicit Rosenbrock-W (ROS2) Stiff Integrator**:
   - Stiff kinetic networks are characterized by rate constants spanning 9+ orders of magnitude ($k_1 \sim 10^{-2}$ to $k_2 \sim 10^7$).
   - Explicit integrators (such as Euler and classical RK4) become numerically unstable and experience violent step blowup unless step size $h < 2 / |\lambda_{\max}| \sim 10^{-8}$ s.
   - The ROS2 method is linearly-implicit and $A$-stable ($\gamma = 1 - 1/\sqrt{2} \approx 0.29289$):
     $$(I - \gamma h J) k_1 = F(y_n)$$
     $$(I - \gamma h J) k_2 = F(y_n + \tfrac{1}{2} h k_1) - \gamma h J k_1$$
     $$y_{n+1} = y_n + h k_2$$
   - Solves a linear system with partial row pivoting at each step without expensive nonlinear Newton-Raphson iterative loops.

2. **Exact Analytic Jacobian Derivation**:
   - For an elementary reaction $j$ with forward rate $v_j = k_j \prod_i c_i^{\nu_{ij}'}$, exact derivatives are computed analytically:
     $$\frac{\partial v_j}{\partial c_k} = \frac{\nu_{kj}' v_j}{c_k}$$
   - Exact Jacobian matrix elements:
     $$J_{ik} = \frac{\partial (dc_i / dt)}{\partial c_k} = \sum_{j} (\nu_{ij}'' - \nu_{ij}') \frac{\partial v_j}{\partial c_k}$$
   - Eliminates finite-difference approximation errors and avoids numerical perturbation damping.

3. **Curated Stiff Kinetics Benchmark Networks**:
   - **Robertson Autocatalytic Stiff System (1966)**:
     - The universal benchmark for stiff solvers.
     - Species: $A, B, C$.
     - Reactions: $A \rightarrow B$ ($k_1 = 0.04$), $2 B \rightarrow B + C$ ($k_2 = 3 \times 10^7$), $B + C \rightarrow A + C$ ($k_3 = 10^4$).
     - Stiffness index: $\sim 7.5 \times 10^8$. Conserves total mass $[A] + [B] + [C] \equiv 1.0$ M.
   - **Chapman Photochemical Ozone Cycle**:
     - Stratospheric $O_2 / O / O_3$ photolytic cycle driven by UV radiation with fast intermediate radical turnover.
   - **Field-Noyes Oregonator (Belousov-Zhabotinsky Reaction)**:
     - Five-step reduced chemical oscillator displaying limit cycles and relaxation oscillations in bromate-malonic acid-cerium systems.
   - **Extended Zeldovich Thermal $\text{NO}_x$ Mechanism (2200 K)**:
     - High-temperature combustion oxidation of atmospheric $N_2$ and $O_2$ into thermal nitric oxide.

4. **Interactive Stiff Kinetics Workstation**:
   - Integrated into `src/pages/ReactionDatabasePage.tsx` under `'kinetics'` tab.
   - Log-scale vs Linear-scale time axis toggles for stiff trajectories spanning microseconds to hundreds of seconds.
   - Multi-species concentration $c_i(t)$ curves with color-coded legend.
   - Phase-space limit cycle portrait ($[X]$ vs $[Z]$) demonstrating non-linear limit cycle attractors.
   - Real-time Analytic Jacobian Sensitivity Matrix inspector ($J_{ik}$).

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/stiff_kinetics.py](file:///d:/proton%20pages/services/chemistry/app/models/stiff_kinetics.py): Domain models for `KineticSpecies`, `ElementaryReaction`, and `StiffKineticsPreset`.
- [schemas/stiff_kinetics.py](file:///d:/proton%20pages/services/chemistry/app/schemas/stiff_kinetics.py): Pydantic schemas for request, response, and presets.
- [services/stiff_kinetics_service.py](file:///d:/proton%20pages/services/chemistry/app/services/stiff_kinetics_service.py): `StiffKineticsEngine` with ROS2 integrator, Gaussian elimination linear solver, analytic Jacobian derivation, and benchmark library.
- [api/v1/endpoints/stiff_kinetics.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/stiff_kinetics.py): FastAPI endpoints mounted under `/api/v1/chemistry/stiff-kinetics`.

### Frontend Architecture (`src/`)
- [types/stiffKinetics.ts](file:///d:/proton%20pages/src/types/stiffKinetics.ts): TypeScript interfaces for reactions, species, presets, and trajectories.
- [services/stiffKineticsService.ts](file:///d:/proton%20pages/src/services/stiffKineticsService.ts): API client with full client-side ROS2 simulation fallback.
- [components/chemistry/kinetics/StiffKineticsWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/kinetics/StiffKineticsWorkstation.tsx): Interactive workstation with SVG trajectory charts, phase portrait, and Jacobian matrix table.
- [pages/ReactionDatabasePage.tsx](file:///d:/proton%20pages/src/pages/ReactionDatabasePage.tsx): Mounted sub-tab in Kinetics section.

---

## 3. Verification & Quality Assurance
- **Backend Unit Tests**: `services/chemistry/tests/unit/test_stiff_kinetics.py` (9 tests passing).
- **Backend Integration Tests**: `services/chemistry/tests/integration/test_stiff_kinetics_api.py` (5 tests passing).
- **Frontend Vitest Tests**: `src/services/stiffKineticsService.test.ts` (5 tests passing).
- **Type Safety**: `npx tsc --noEmit` verified 0 errors.
