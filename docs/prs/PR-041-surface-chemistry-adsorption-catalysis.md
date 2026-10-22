# Pull Request #041: Surface Chemistry, Heterogeneous Catalysis & Langmuir-BET Adsorption

- **Branch**: `feature/surface-chemistry-adsorption-catalysis`
- **Target**: `main`
- **Type**: Feature / Surface Science, Physical Chemistry & Heterogeneous Catalysis
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive surface science, physisorption, and heterogeneous catalysis suite for Proton Pages:

1. **Brunauer-Emmett-Teller (BET) Multi-Point Surface Area Determination**:
   - The classical BET linear equation for multilayer physisorption:
     $$\frac{P/P_0}{V (1 - P/P_0)} = \frac{1}{V_m C} + \frac{C - 1}{V_m C} \left(\frac{P}{P_0}\right)$$
   - Standard IUPAC linear pressure range: $0.05 \le P/P_0 \le 0.35$.
   - **Rouquerol Criteria for Microporous Adsorbents (Type I)**:
     - Automatically shifts linear fitting to lower relative pressures ($0.01 \le P/P_0 \le 0.15$) to prevent negative $C$ parameters and maintain positive net adsorption enthalpy.
   - Specific surface area determination:
     $$S_{\text{BET}} = \frac{V_m \cdot N_A \cdot \sigma}{V_{mol} \cdot m_{\text{sample}}}$$
     using standard adsorbate molecular cross-sectional areas ($\sigma_{N_2} = 0.162\text{ nm}^2 = 16.2\text{ \AA}^2$ at 77.35 K).

2. **Adsorption Isotherm Modeling & Regression Comparison**:
   - **Langmuir Monolayer Isotherm**:
     $$V = \frac{V_m K_L (P/P_0)}{1 + K_L (P/P_0)}$$
     Linear transform: $(P/P_0) / V = 1/(K_L V_m) + (P/P_0) / V_m$.
   - **Freundlich Empirical Heterogeneous Isotherm**:
     $$V = K_F (P/P_0)^{1/n}$$
     Linear transform: $\ln V = \ln K_F + (1/n) \ln(P/P_0)$.
   - Automated goodness-of-fit comparison across models ($R^2$, parameter identification, and best-fit selection).

3. **Heterogeneous Catalysis Kinetics**:
   - **Langmuir-Hinshelwood (LH) Dual-Site Mechanism**:
     $$r_{\text{LH}} = \frac{k K_A K_B P_A P_B}{(1 + K_A P_A + K_B P_B)^2}$$
     Captures the iconic volcanic curve where rate peaks at $P_{A,\max} = \frac{1 + K_B P_B}{K_A}$ and decreases at higher pressures due to competitive self-poisoning (surface site saturation by reactant $A$).
   - **Eley-Rideal (ER) Single-Site Mechanism**:
     $$r_{\text{ER}} = \frac{k K_A P_A P_B}{1 + K_A P_A + K_B P_B}$$
     Models direct gas-phase impact of reactant $B$ with adsorbed intermediate $A$, demonstrating monotonic saturation.

4. **Curated Adsorbent Materials Library**:
   - **MCM-41**: Ordered mesoporous silica ($S_{\text{BET}} \approx 985\text{ m}^2/\text{g}$, Type IV isotherm with steep capillary condensation).
   - **Activated Carbon**: BPL commercial carbon ($S_{\text{BET}} \approx 1150\text{ m}^2/\text{g}$, Type I microporous).
   - **Zeolite ZSM-5**: MFI aluminosilicate framework ($S_{\text{BET}} \approx 425\text{ m}^2/\text{g}$).
   - **$\gamma$-Alumina**: Industrial catalyst support ($S_{\text{BET}} \approx 210\text{ m}^2/\text{g}$, Type IV mesoporous).

5. **Interactive Virtual Laboratory Workstation**:
   - Mounted in `VirtualLabPage.tsx` under `'surface-chemistry'` ("Rig #8: Surface Chemistry & BET Adsorption").
   - Dual-plot interface: Adsorption Isotherm $V(P/P_0)$ and BET Linear Transform plot with highlighted linear region.
   - Live metrics HUD: $S_{\text{BET}}$, $V_m$, $C$ constant, $R^2$ regression quality.
   - Interactive catalytic kinetics simulator with real-time rate comparison and surface coverage fractions ($\theta_A, \theta_B, \theta_v$).

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/surface_chemistry.py](file:///d:/proton%20pages/services/chemistry/app/models/surface_chemistry.py): Domain models for `AdsorptionDataPoint`, `AdsorbentMaterial`, `BetLinearFit`, and `CatalyticKineticsPoint`.
- [schemas/surface_chemistry.py](file:///d:/proton%20pages/services/chemistry/app/schemas/surface_chemistry.py): Request/response Pydantic schemas.
- [services/surface_chemistry_service.py](file:///d:/proton%20pages/services/chemistry/app/services/surface_chemistry_service.py): `SurfaceChemistryEngine` with Rouquerol-compliant multi-point BET regression, isotherm comparison, and LH/ER catalytic kinetics.
- [api/v1/endpoints/surface_chemistry.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/surface_chemistry.py): FastAPI endpoints mounted at `/api/v1/chemistry/surface-chemistry`.

### Frontend Architecture (`src/`)
- [types/surfaceChemistry.ts](file:///d:/proton%20pages/src/types/surfaceChemistry.ts): TypeScript type definitions.
- [services/surfaceChemistryService.ts](file:///d:/proton%20pages/src/services/surfaceChemistryService.ts): API client with self-contained client-side offline calculation engine.
- [components/chemistry/surface/SurfaceChemistryWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/surface/SurfaceChemistryWorkstation.tsx): Interactive SVG workstation.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Mounted as Rig #8.

---

## 3. Verification & Quality Assurance
- **Backend Unit Tests**: `services/chemistry/tests/unit/test_surface_chemistry.py` (7 tests passing).
- **Backend Integration Tests**: `services/chemistry/tests/integration/test_surface_chemistry_api.py` (6 tests passing).
- **Frontend Vitest Tests**: `src/services/surfaceChemistryService.test.ts` (6 tests passing).
- **Type Safety**: `npx tsc --noEmit` verified 0 errors.
