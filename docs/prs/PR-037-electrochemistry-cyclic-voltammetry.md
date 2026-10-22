# Pull Request #037: Advanced Electroanalytical Chemistry & Cyclic Voltammetry Simulator

- **Branch**: `feature/electrochemistry-cyclic-voltammetry`
- **Target**: `main`
- **Type**: Feature / Electrochemistry & Analytical Instrumentation
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive electroanalytical simulation suite and interactive Cyclic Voltammetry (CV) & Chronoamperometry workstation for Proton Pages:

1. **Randles-Sevcik Peak Current Modeling**:
   - Reversible planar diffusion-controlled peak current at 298.15 K:
     $$i_{p,\text{rev}} = 0.4463 \cdot n F A C^\ast \sqrt{\frac{n F \nu D}{R T}}$$
   - Irreversible electron transfer with transfer coefficient $\alpha$:
     $$i_{p,\text{irrev}} = 0.4958 \cdot n F A C^\ast \sqrt{\frac{\alpha n_\alpha F \nu D}{R T}}$$
   - Strict linear scaling with bulk concentration ($C^\ast$) and square-root scaling with scan rate ($\sqrt{\nu}$).

2. **Butler-Volmer Kinetics & Nicholson Diagnostic Classification**:
   - Heterogeneous electron transfer rate constant $k^0$ ($\text{cm/s}$) and transfer coefficient $\alpha$.
   - Dimensionless Nicholson kinetic parameter:
     $$\psi = \frac{k^0}{\sqrt{\pi D \frac{n F}{R T} \nu}}$$
   - **Reversible ($\psi \ge 7.0$)**: $\Delta E_p = E_{p,a} - E_{p,c} \approx \frac{59.2\text{ mV}}{n}$, $|i_{p,a}/i_{p,c}| = 1.0$, $E_{1/2} = (E_{p,a} + E_{p,c})/2$.
   - **Quasi-Reversible ($0.001 < \psi < 7.0$)**: Broadened peak separation $\Delta E_p > 70\text{ mV}$, current ratio $|i_{p,a}/i_{p,c}| < 1.0$.
   - **Irreversible ($\psi \le 0.001$)**: Absent cathodic return wave (EC mechanisms, broad irreversible oxidation wave).

3. **Double-Layer Capacitance & Background Charging**:
   - Capacitive current baseline hysteresis:
     $$i_{\text{cap}} = A \cdot C_{dl} \cdot \nu$$
     with opposite polarity between forward and reverse potential sweeps.

4. **Cottrell Chronoamperometry & Diffusion Solvers**:
   - Semi-infinite planar diffusion current response to potential step:
     $$i(t) = \frac{n F A D^{1/2} C^\ast}{\pi^{1/2} t^{1/2}}$$
   - Linear Cottrell slope:
     $$S = \frac{n F A D^{1/2} C^\ast}{\pi^{1/2}}$$
     yielding active surface area $A$ or diffusion coefficient $D$ from $i$ vs $t^{-1/2}$ linear regression.

5. **Curated Electrochemical Benchmark Catalog**:
   - **Ferricyanide / Ferrocyanide**: $[Fe(CN)_6]^{3-/4-}$ in aqueous KCl ($E^0 = +0.360\text{ V}$ vs SHE, $n=1$).
   - **Ferrocene / Ferrocenium**: $Fc/Fc^+$ in non-aqueous $\text{CH}_3\text{CN}/\text{TBAPF}_6$ ($E^0 = +0.400\text{ V}$, IUPAC standard).
   - **Ruthenium Hexamine**: $[Ru(NH_3)_6]^{3+/2+}$ ideal outer-sphere probe ($E^0 = -0.210\text{ V}$, $n=1$).
   - **Dopamine**: $2e^-/2H^+$ quasi-reversible neurotransmitter oxidation on carbon ($E^0 = +0.220\text{ V}$, $\Delta E_p > 70\text{ mV}$).
   - **L-Ascorbic Acid**: Irreversible EC oxidation lacking cathodic return peak ($E^0 = +0.060\text{ V}$, $n=2$).

6. **Interactive Cyclic Voltammetry Workstation Frontend**:
   - Mounted in `ReactionDatabasePage.tsx` under `'electro'` tab with dedicated mode toggle.
   - Interactive SVG voltammogram display rendering forward/reverse sweeps, zero-current axis, peak markers ($E_{p,a}, E_{p,c}$), and capacitive baselines.
   - Chronoamperometry view plotting $i(t)$ vs $t$ and linear Cottrell slope.
   - Live diagnostic HUD cards ($\Delta E_p$, $E_{1/2}$, $i_{p,a}$, $|i_{p,a}/i_{p,c}|$).
   - Lab notebook export and AI assistant prompt generator.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/electroanalytical.py](file:///d:/proton%20pages/services/chemistry/app/models/electroanalytical.py): Data models for cyclic voltammetry, chronoamperometry, and presets.
- [schemas/electroanalytical.py](file:///d:/proton%20pages/services/chemistry/app/schemas/electroanalytical.py): Pydantic schemas for request and response validation.
- [services/electroanalytical_service.py](file:///d:/proton%20pages/services/chemistry/app/services/electroanalytical_service.py): Randles-Sevcik engine, Nicholson diagnosis, Butler-Volmer voltammogram simulation, and Cottrell solver.
- [api/v1/endpoints/electroanalytical.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/electroanalytical.py): Endpoints `/electroanalysis/presets`, `/electroanalysis/cv-simulate`, `/electroanalysis/chronoamperometry`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router registration.

### Frontend Architecture (`src/`)
- [types/electroanalytical.ts](file:///d:/proton%20pages/src/types/electroanalytical.ts): TypeScript type interfaces.
- [services/electroanalyticalService.ts](file:///d:/proton%20pages/src/services/electroanalyticalService.ts): Client-side analytical simulation engine and API client.
- [components/chemistry/electrochemistry/CyclicVoltammetryWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/electrochemistry/CyclicVoltammetryWorkstation.tsx): Interactive SVG cyclic voltammogram, Cottrell plot, sliders, and diagnostic HUD.
- [pages/ReactionDatabasePage.tsx](file:///d:/proton%20pages/src/pages/ReactionDatabasePage.tsx): Mounted sub-tab mode in electrochemistry section.

### Test Verification
- [services/chemistry/tests/unit/test_electroanalytical.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_electroanalytical.py): 8 unit tests for peak currents, Nicholson diagnosis, and Cottrell slope.
- [services/chemistry/tests/integration/test_electroanalytical_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_electroanalytical_api.py): 4 integration tests for API contracts and invalid inputs.
- [src/services/electroanalyticalService.test.ts](file:///d:/proton%20pages/src/services/electroanalyticalService.test.ts): 5 Vitest tests for frontend client calculations.

---

## 3. Quality Gate Outcomes
- **Pytest**: 309/309 passed (100%).
- **Vitest**: 126/126 passed (100%).
- **TypeScript**: `tsc --noEmit` passed with 0 errors.
- **Vite Build**: Production bundle succeeded in 32.98s.
