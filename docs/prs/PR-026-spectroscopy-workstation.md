# Pull Request #026: Instrumental Spectroscopy & UV-Vis Spectrophotometry Workstation

- **Branch**: `feature/spectroscopy-instrumental-analysis`
- **Target**: `main`
- **Type**: Feature / Scientific Expansion
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive Spectroscopy & Instrumental Analysis subsystem for Proton Pages, providing:
1. **UV-Vis Spectrophotometry Engine**: Beer-Lambert Law ($A = \epsilon \cdot b \cdot c$), transmittance ($T = 10^{-A}$), multi-chromophore Gaussian line-broadening, and least-squares standard calibration curves ($A = mc + b$, $R^2$).
2. **FTIR Functional Group Identification**: Vibrational frequency database (4000 to 400 cm⁻¹), characteristic group matching, and continuous transmittance spectrum simulation.
3. **Nuclear Magnetic Resonance ($^{1}\text{H}$ & $^{13}\text{C}$ NMR)**: Chemical shifts ($\delta$ ppm), spin-spin coupling ($J$ Hz), multiplicity ($n+1$ rule), and synthetic Lorentzian spectral traces.
4. **Interactive Virtual Lab Workstation #3**: Live optomechanical bench with animated Tungsten/D₂ light source, diffraction grating monochromator, variable path length cuvette ($b = 0.5, 1.0, 2.0$ cm), real-time photodiode readout, interactive $A(\lambda)$ SVG plot, calibration curve solver, and direct persistence to the user's lab notebook.

---

## 2. Implementation Details

### Backend Scientific Layer (`services/chemistry`)
- [models/spectroscopy.py](file:///d:/proton%20pages/services/chemistry/app/models/spectroscopy.py): Dataclass domain models for UV-Vis spectra, calibration curves, FTIR vibrational bands, and NMR signals.
- [schemas/spectroscopy.py](file:///d:/proton%20pages/services/chemistry/app/schemas/spectroscopy.py): Pydantic v2 schemas validating request/response envelopes.
- [services/spectroscopy_service.py](file:///d:/proton%20pages/services/chemistry/app/services/spectroscopy_service.py): Deterministic computation engine with vetted standards ($\text{KMnO}_4$, $\text{CuSO}_4$, Riboflavin, Methyl Orange, Phenol Red), linear regression solver, and FTIR peak correlation.
- [api/v1/endpoints/spectroscopy.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/spectroscopy.py): FastAPI endpoints mounted at `/api/v1/chemistry/spectroscopy/...`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Sub-router aggregation.

### Frontend Presentation Layer (`src/`)
- [types/spectroscopy.ts](file:///d:/proton%20pages/src/types/spectroscopy.ts): Typed TypeScript contracts.
- [services/spectroscopyService.ts](file:///d:/proton%20pages/src/services/spectroscopyService.ts): API client with offline calculation fallbacks.
- [components/chemistry/spectroscopy/SpectrophotometerRig.tsx](file:///d:/proton%20pages/src/components/chemistry/spectroscopy/SpectrophotometerRig.tsx): Interactive UV-Vis workstation with real-time optomechanical schematic, SVG spectrum scan, and calibration curve solver.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Wired Rig #3 into laboratory rig switcher.

---

## 3. Verification & Test Results

- **Python Tests**: 15 new tests (8 unit in `test_spectroscopy.py`, 7 integration in `test_spectroscopy_api.py`).
  - Full suite: **174 / 174 tests passing** (100%).
  - Backend statement coverage: **88%**.
- **Frontend Tests**: 6 new Vitest tests in `src/services/spectroscopyService.test.ts`.
  - Full suite: **68 / 68 tests passing** (100% across 12 test files).
- **TypeScript Static Verification**: `tsc --noEmit` exited cleanly with **0 errors**.
- **Git Hygiene**: Clean working tree on feature branch.

---

## 4. Risks & Mitigations
- *Risk*: Heavy SVG re-rendering on rapid wavelength scrubbing.
  *Mitigation*: Pre-computed polyline coordinate arrays and optimized linear gradient shading.
- *Risk*: Network failure when calling backend spectroscopy gateway.
  *Mitigation*: Full mathematical fallback engine built into `SpectroscopyService`.
