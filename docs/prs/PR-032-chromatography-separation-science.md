# Pull Request #032: Analytical Chromatography & Separation Science Engine

- **Branch**: `feature/chromatography-separation-science`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive analytical separation science and chromatography calculation engine for Proton Pages:
1. **van Deemter Column Efficiency Kinetics**: Analytical modeling of height equivalent to a theoretical plate (HETP) $H = A + \frac{B}{u} + C \cdot u$ across packed liquid chromatography columns (Eddy diffusion $A$, longitudinal diffusion $B$, mass transfer resistance $C$) and capillary gas chromatography columns (Golay equation with $A = 0$ across Helium, Nitrogen, and Hydrogen carrier gases).
2. **Theoretical Plate Theory & Peak Dispersion**: Exact evaluation of total theoretical plates $N = L / H$, baseline peak widths $W = 4 t_r / \sqrt{N}$, half-height peak widths $W_{1/2} = 2.355 t_r / \sqrt{N}$, and USP peak tailing factors ($T_f$).
3. **Partition & Retention Models**:
   - Reversed-phase HPLC: Snyder-Soczewinski solvent strength model $\log k' = \log k'_w - S \cdot \Phi$, van 't Hoff temperature dependence, and gradient elution compression.
   - Capillary GC: Vapor pressure / boiling point partition equilibrium, isothermal retention, and linear temperature ramp programming.
4. **Chromatographic Selectivity & Resolution**: Quantitative evaluation of selectivity $\alpha = k'_2 / k'_1$ and Purnell resolution $R_s = \frac{2(t_{r2} - t_{r1})}{W_1 + W_2}$, classifying separations as *Baseline Resolved* ($R_s \ge 1.5$), *Partial Overlap* ($1.0 \le R_s < 1.5$), or *Co-eluting* ($R_s < 1.0$).
5. **Interactive Chromatography Workstation**: Dynamic SVG chromatogram trace with dead time $t_0$ marker, peak integration table, van Deemter $H(u)$ operational diagnostics, mobile phase parameter sliders, and Electronic Lab Notebook persistence.
6. **Analytical Application Presets**: Over-the-counter analgesics (Acetaminophen, Caffeine, Aspirin, Ibuprofen), Alkyl paraben homologous series, DNA/RNA nucleobases with Uracil void marker, BTEX volatile monoaromatics (EPA 8260), and Aliphatic alcohols series.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/chromatography.py](file:///d:/proton%20pages/services/chemistry/app/models/chromatography.py): Dataclass domain models for column parameters, mobile phase conditions, van Deemter parameters, analyte peaks, and digitized chromatogram profiles.
- [schemas/chromatography.py](file:///d:/proton%20pages/services/chemistry/app/schemas/chromatography.py): Pydantic v2 schemas validating custom separation simulation requests, overrides, and responses.
- [services/chromatography_service.py](file:///d:/proton%20pages/services/chemistry/app/services/chromatography_service.py): Chromatography simulation engine with van Deemter solver, Snyder-Soczewinski retention model, GC temperature programming, and digitized profile generation.
- [api/v1/endpoints/chromatography.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/chromatography.py): FastAPI endpoints mounted at `/api/v1/chemistry/chromatography/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router aggregation.
- [tests/unit/test_chromatography.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_chromatography.py): 7 unit tests verifying van Deemter HPLC & GC, analgesics retention order, parabens homologous series, uracil void marker, BTEX GC, and resolution.
- [tests/integration/test_chromatography_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_chromatography_api.py): 5 integration tests verifying presets, condition overrides, 404 handling, van Deemter curve endpoint, and custom separation simulation.

### Frontend Architecture (`src/`)
- [types/chromatography.ts](file:///d:/proton%20pages/src/types/chromatography.ts): TypeScript domain contracts.
- [services/chromatographyService.ts](file:///d:/proton%20pages/src/services/chromatographyService.ts): API client with complete client-side analytical fallback simulation.
- [services/chromatographyService.test.ts](file:///d:/proton%20pages/src/services/chromatographyService.test.ts): 4 Vitest tests verifying presets, van Deemter calculations, analgesics separation, and BTEX GC.
- [components/chemistry/chromatography/ChromatographyWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/chromatography/ChromatographyWorkstation.tsx): Interactive workstation with SVG chromatogram canvas, peak integration table, van Deemter diagnostics, and lab notebook logging.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Mounted as Rig #5 alongside Titration, Calorimetry, Spectroscopy, and Gas Laws.

---

## 3. Verification & Test Metrics

- **Backend Pytest**: 12 new tests (7 unit, 5 integration). Full chemistry suite: **244 / 244 tests passing** (100%).
- **Frontend Vitest**: 4 new tests in `chromatographyService.test.ts`. Full suite: **95 / 95 tests passing** across 18 test files (100%).
- **TypeScript Static Verification**: `tsc --noEmit` verified with **0 errors**.
- **UI Design System**: Compliant with Parchment, Copper, Amber, and Charcoal design tokens.
