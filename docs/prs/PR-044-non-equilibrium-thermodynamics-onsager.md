# Pull Request #044: Non-Equilibrium Thermodynamics & Onsager Reciprocal Relations

- **Branch**: `feature/non-equilibrium-thermodynamics-onsager`
- **Target**: `main`
- **Type**: Feature / Irreversible Thermodynamics, Coupled Transport Phenomena & Physical Chemistry
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement an authentic, first-principles non-equilibrium thermodynamics simulation workstation bridging irreversible dissipation, coupled linear transport equations, and Onsager reciprocal relations for Proton Pages:

1. **Entropy Production and Local Dissipation Rate ($\sigma \ge 0, \Phi = T \sigma \ge 0$)**:
   - In any irreversible process, entropy production rate per unit volume is the sum of products of conjugate fluxes $J_i$ and generalized driving forces $X_i$:
     $$\sigma = \sum_{i} J_i X_i \ge 0$$
   - Rayleigh dissipation function / energy dissipation rate:
     $$\Phi = T \sigma = \sum_{i} J_i (T X_i) \ge 0$$
   - Microscopic stability and the Second Law of Thermodynamics dictate that the phenomenological transport coefficient matrix $L$ must be positive semi-definite (all eigenvalues $\lambda_i \ge 0$, and for $2 \times 2$: $|q| \le 1$ where $q = \frac{L_{12}}{\sqrt{L_{11} L_{22}}}$).

2. **Coupled Linear Transport Equations & Onsager Reciprocity ($L_{ik} = L_{ki}$)**:
   - Near equilibrium where linear response holds:
     $$J_i = \sum_{k} L_{ik} X_k$$
   - By Lars Onsager's theorem (Nobel Prize in Chemistry 1968), derived from microscopic time-reversibility of fluctuations:
     $$L_{ik} = L_{ki} \quad \text{and under magnetic fields: } L_{ik}(\mathbf{B}) = L_{ki}(-\mathbf{B})$$

3. **Coupled Thermoelectric Transport & Second Kelvin Relation**:
   - Coupled electric current $j$ and heat flux $J_q$ under electric field $-\nabla\varphi$ and temperature gradient $-\nabla T$:
     $$j = L_{11} (-\nabla\varphi) + L_{12} \left(-\frac{\nabla T}{T}\right)$$
     $$J_q = L_{21} (-\nabla\varphi) + L_{22} \left(-\frac{\nabla T}{T}\right)$$
   - Onsager symmetry $L_{12} = L_{21}$ analytically enforces the **Second Kelvin Relation**:
     $$\Pi = S \cdot T$$
     equating the Peltier heat coefficient $\Pi$ to the Seebeck thermoelectric power $S$ multiplied by absolute temperature $T$.
   - Dimensionless thermoelectric figure of merit:
     $$ZT = \frac{S^2 \sigma_{\text{el}}}{\kappa} T$$
   - Curated materials: n-type $\text{Bi}_2\text{Te}_3$ ($S < 0$), p-type $(\text{Bi,Sb})_2\text{Te}_3$ ($S > 0, ZT \sim 1.0$), $\text{Si}_{0.8}\text{Ge}_{0.2}$ (RTG alloy), Constantan, Chromel.

4. **Thermodiffusion in Binary Fluid Mixtures (Soret & Dufour Cross-Effects)**:
   - Cross-coupling between concentration gradients and temperature gradients:
     $$J_m = -\rho \left[ D \nabla w_1 + D_T w_1 (1 - w_1) \nabla T \right]$$
     $$J_q = -\kappa \nabla T + J_{q, \text{Dufour}}$$
   - Soret coefficient: $S_T = \frac{D_T}{D}$.
   - Steady-state separation across thermal gap $\Delta x$ with zero mass flux ($J_m = 0$):
     $$\nabla w_{1, \text{ss}} = -S_T w_1 (1 - w_1) \nabla T$$
   - Curated systems: Toluene-Cyclohexane benchmark ($S_T > 0$, thermophobic accumulation at cold wall), Water-Ethanol ($S_T < 0$, anomalous thermophilic accumulation at warm wall), Polystyrene macromolecule (ThFFF giant thermophoresis), He-Ar gas (Dufour diffusion thermo-effect).

5. **Electrokinetic Membrane Transport & Saxén Reciprocal Relations**:
   - Cross-coupling between hydraulic volume flow $I_v$ and electric current $I$ under pressure drop $\Delta P$ and electric potential difference $\Delta V$:
     $$I_v = L_{11} \Delta P + L_{12} \Delta V$$
     $$I = L_{21} \Delta P + L_{22} \Delta V$$
   - Onsager reciprocity $L_{12} = L_{21}$ analytically establishes the **Saxén Reciprocal Relation**:
     $$\left(\frac{I_v}{I}\right)_{\Delta P = 0} = -\left(\frac{\Delta V}{\Delta P}\right)_{I = 0}$$
     relating electro-osmotic pumping volume per unit charge to streaming potential generated per unit pressure head.
   - Curated media: Borosilicate glass capillary array, ordered mesoporous silica nanochannels.

6. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #11: Non-Equilibrium Thermodynamics & Onsager Relations**.
   - 4 specialized operational tabs:
     1. Matrix & Dissipation (interactive $L$ matrix editor, eigenvalue spectrum, coupling factor $q$, 2D phase-space Force/Flux projection, "Break Reciprocity" & "Violate 2nd Law" interactive demos).
     2. Thermoelectric Workstation (material presets, Seebeck/Peltier calculators, Kelvin relation verification, solid-state thermocouple SVG visualizer).
     3. Thermodiffusion Workstation (mixture presets, Soret/Dufour calculators, cold-wall/warm-wall steady-state separation profile).
     4. Electrokinetic Workstation (porous membrane presets, Saxén balance verification, nanochannel electrical double layer SVG visualizer).

---

## 2. Scientific Assumptions, Physical Units & Limitations

1. **Linear Regime Assumption**:
   - Assumes generalized fluxes $J_i$ are strictly linear functions of driving forces $X_k$. This holds accurately when gradients are moderate (near local equilibrium). Under extreme conditions (e.g., laser ablation, shock waves, very strong non-linear electric fields), higher-order non-linear terms must be included.
2. **Local Equilibrium Hypothesis**:
   - Assumes small microscopic sub-volumes are in local thermodynamic equilibrium such that intensive variables ($T, P, \mu$) remain well-defined point-wise.
3. **Electrochemical & Units Consistency**:
   - Units strictly follow SI:
     - Entropy production $\sigma$: $\text{W / (m}^3 \text{ K)}$
     - Dissipation $\Phi$: $\text{W / m}^3$
     - Seebeck coefficient $S$: $\mu\text{V / K}$ ($10^{-6}\text{ V / K}$)
     - Peltier coefficient $\Pi$: $\text{mV}$ ($10^{-3}\text{ V}$)
     - Soret coefficient $S_T$: $\text{K}^{-1}$
     - Thermal diffusion $D_T$: $\text{m}^2 \text{ / (s K)}$
     - Streaming potential: $\text{V / bar}$ ($10^{-5}\text{ V / Pa}$)
     - Electro-osmotic pumping: $\text{m}^3 \text{ / C}$ ($\text{m}^3 \text{ / (A s)}$)

---

## 3. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/non_equilibrium_thermo.py](file:///d:/proton%20pages/services/chemistry/app/models/non_equilibrium_thermo.py): Domain models for `TransportMatrix`, `EntropyProductionResult`, `ThermoelectricSystem`, `ElectrokineticSystem`, and `ThermodiffusionSystem`.
- [schemas/non_equilibrium_thermo.py](file:///d:/proton%20pages/services/chemistry/app/schemas/non_equilibrium_thermo.py): Pydantic request/response schemas for transport coupling, thermoelectricity, electrokinetics, and thermodiffusion.
- [services/non_equilibrium_thermo_service.py](file:///d:/proton%20pages/services/chemistry/app/services/non_equilibrium_thermo_service.py): `NonEquilibriumThermoEngine` evaluating phenomenological matrices, eigenvalues, entropy production, Seebeck/Peltier, Saxén reciprocity, and Soret/Dufour demixing.
- [api/v1/endpoints/non_equilibrium_thermo.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/non_equilibrium_thermo.py): FastAPI endpoints mounted at `/api/v1/chemistry/non-equilibrium-thermo`.
- [tests/unit/test_non_equilibrium_thermo.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_non_equilibrium_thermo.py): 10 scientific property unit tests.
- [tests/integration/test_non_equilibrium_thermo_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_non_equilibrium_thermo_api.py): 7 REST API integration tests.

### Frontend Architecture (`src/`)
- [types/nonEquilibriumThermo.ts](file:///d:/proton%20pages/src/types/nonEquilibriumThermo.ts): TypeScript interfaces matching backend models and curated catalogs.
- [services/nonEquilibriumThermoService.ts](file:///d:/proton%20pages/src/services/nonEquilibriumThermoService.ts): Dual-layer service with client-side fallback computation.
- [services/nonEquilibriumThermoService.test.ts](file:///d:/proton%20pages/src/services/nonEquilibriumThermoService.test.ts): 7 Vitest unit tests.
- [components/chemistry/thermo/NonEquilibriumThermoWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/thermo/NonEquilibriumThermoWorkstation.tsx): Interactive 4-mode workstation component with SVG visualizers.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Integrated as Rig #11.

---

## 4. Automated Verification & Quality Gates

### Backend Test Results (Pytest)
```
services/chemistry/tests/unit/test_non_equilibrium_thermo.py .......... [ 58%]
services/chemistry/tests/integration/test_non_equilibrium_thermo_api.py ....... [100%]
======================== 17 passed in 3.91s ========================
```

### Frontend Test Results (Vitest)
```
 ✓ src/services/nonEquilibriumThermoService.test.ts (7 tests) 26ms
 Test Files  30 passed (30)
      Tests  170 passed (170)
```

### TypeScript Validation
```
npx tsc --noEmit
Exit Code: 0 (Zero errors)
```
