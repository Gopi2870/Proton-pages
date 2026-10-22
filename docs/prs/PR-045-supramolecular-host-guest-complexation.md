# Pull Request #045: Supramolecular Chemistry & Host-Guest Complexation

- **Branch**: `feature/supramolecular-host-guest-complexation`
- **Target**: `main`
- **Type**: Feature / Supramolecular Chemistry, Macrocyclic Receptors & Molecular Recognition
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement an authentic, first-principles supramolecular chemistry and host-guest complexation workstation for Proton Pages:

1. **Macrocyclic Host Inclusion & Size Complementarity**:
   - **Crown Ethers**:
     - 18-Crown-6 (cavity $\sim 2.80\text{ \AA}$): Peak size complementarity with potassium ($\text{K}^+$, ionic diameter $2.76\text{ \AA}$), yielding $\log K_a \approx 6.10$.
     - 15-Crown-5 (cavity $\sim 1.95\text{ \AA}$): Selective coordination of sodium ($\text{Na}^+$, diameter $2.04\text{ \AA}$).
     - 12-Crown-4 (cavity $\sim 1.40\text{ \AA}$): Selective coordination of lithium ($\text{Li}^+$, diameter $1.52\text{ \AA}$).
   - **Cryptands & Macrobicyclic Cryptate Effect**:
     - Cryptand [2.2.2]: Bicyclic cage providing complete three-dimensional encapsulation of $\text{K}^+$ with astronomical stability ($\log K_a \approx 9.75$, over 3 orders of magnitude stronger than 18-crown-6 due to the cryptate effect).
   - **Cyclodextrins & Hydrophobic Inclusion**:
     - $\beta$-Cyclodextrin (cavity $\sim 6.20\text{ \AA}$): Inclusion of 1-adamantanecarboxylate and 4-nitrophenol driven primarily by the classical hydrophobic effect (desolvation of high-energy cavity water molecules).
     - $\alpha$-Cyclodextrin (cavity $\sim 4.90\text{ \AA}$): Narrower cavity displaying selectivity for unbranched or monosubstituted benzenes over bulky adamantyl groups.

2. **Continuous Variation (Job's Method) Stoichiometry Determination**:
   - In equimolar continuous variation experiments where total concentration $C_0 = [H] + [G]$ is fixed:
     $$r = \frac{[G]_0}{[H]_0 + [G]_0} \in [0, 1]$$
   - Physical observable signal $Y(r) \propto [HG]$ reaches its apex at:
     - $1:1$ complex ($HG$): $r_{\text{peak}} = 0.50$
     - $1:2$ complex ($HG_2$): $r_{\text{peak}} = 0.67$
     - $2:1$ complex ($H_2G$): $r_{\text{peak}} = 0.33$

3. **Exact Analytical Quadratic Binding Isotherm Solver**:
   - For $H + G \rightleftharpoons HG$ with association constant $K_a = \frac{[HG]}{[H][G]}$:
     $$[HG]^2 - \left([H]_0 + [G]_0 + \frac{1}{K_a}\right) [HG] + [H]_0 [G]_0 = 0$$
     $$[HG] = \frac{1}{2} \left[ \left([H]_0 + [G]_0 + \frac{1}{K_a}\right) - \sqrt{\left([H]_0 + [G]_0 + \frac{1}{K_a}\right)^2 - 4 [H]_0 [G]_0} \right]$$
   - Fractional saturation: $\theta = \frac{[HG]}{[H]_0}$.

4. **Thermodynamic & Non-Covalent Force Decomposition**:
   - Standard Gibbs free energy: $\Delta G^\circ = -R T \ln K_a$.
   - Enthalpy $\Delta H^\circ$ and entropy term $-T \Delta S^\circ = \Delta G^\circ - \Delta H^\circ$.
   - Interaction energy decomposition:
     - Ion-dipole electrostatic attraction ($\text{O}^{\delta-} \cdots \text{M}^+$)
     - Hydrogen bonding ($\text{O}-\text{H} \cdots \text{O}$)
     - $\pi$-$\pi$ aromatic stacking
     - Hydrophobic desolvation free energy
     - Steric cavity fit penalty for oversized/mismatched substrates

5. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #12: Supramolecular Chemistry & Host-Guest Complexation**.
   - 3 operational tabs:
     1. Binding Isotherms (titration simulation, exact saturation curves, thermodynamic state HUD).
     2. Job's Plot (continuous variation bell curve, peak detection, stoichiometry confirmation banner).
     3. Cavity Size-Fit & Selectivity (2D macrocyclic ring and guest ion ingress cross-section projection, fit ratio gauge).

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/supramolecular.py](file:///d:/proton%20pages/services/chemistry/app/models/supramolecular.py): Domain models for `HostMolecule`, `GuestMolecule`, `JobPlotPoint`, `JobPlotResult`, `BindingIsothermPoint`, `NonCovalentDecomposition`, and `HostGuestComplexSystem`.
- [schemas/supramolecular.py](file:///d:/proton%20pages/services/chemistry/app/schemas/supramolecular.py): Pydantic request and response schemas.
- [services/supramolecular_service.py](file:///d:/proton%20pages/services/chemistry/app/services/supramolecular_service.py): `SupramolecularEngine` with quadratic solver, Job's method generator, and non-covalent force evaluator.
- [api/v1/endpoints/supramolecular.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/supramolecular.py): FastAPI endpoints mounted at `/api/v1/chemistry/supramolecular`.
- [tests/unit/test_supramolecular.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_supramolecular.py): 8 scientific validation unit tests.
- [tests/integration/test_supramolecular_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_supramolecular_api.py): 4 REST API integration tests.

### Frontend Architecture (`src/`)
- [types/supramolecular.ts](file:///d:/proton%20pages/src/types/supramolecular.ts): TypeScript domain types.
- [services/supramolecularService.ts](file:///d:/proton%20pages/src/services/supramolecularService.ts): Dual-layer service with client-side fallback computation.
- [services/supramolecularService.test.ts](file:///d:/proton%20pages/src/services/supramolecularService.test.ts): 7 Vitest unit tests.
- [components/chemistry/supramolecular/SupramolecularWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/supramolecular/SupramolecularWorkstation.tsx): Interactive 3-mode workstation component with SVG visualizers.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Integrated as Rig #12.

---

## 3. Automated Verification & Quality Gates

### Backend Test Results (Pytest)
```
services/chemistry/tests/unit/test_supramolecular.py ........ [ 66%]
services/chemistry/tests/integration/test_supramolecular_api.py .... [100%]
======================== 12 passed in 3.29s ========================
```

### Frontend Test Results (Vitest)
```
 ✓ src/services/supramolecularService.test.ts (7 tests) 15ms
 Test Files  31 passed (31)
      Tests  177 passed (177)
```

### TypeScript Validation
```
npx tsc --noEmit
Exit Code: 0 (Zero errors)
```
