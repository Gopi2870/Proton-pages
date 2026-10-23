# Pull Request #051: Analytical Chromatography & Mass Spectrometry (GC-MS / LC-MS Quadrupole Fragmentation & Isotope Distribution)

- **Branch**: `feature/chromatography-mass-spectrometry-quadrupole`
- **Target**: `main`
- **Type**: Feature / Analytical Chemistry, Electron Ionization Fragmentation, Isotope Abundance Envelopes & Van Deemter Hydrodynamics
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose

Deliver a complete, rigorous Analytical Chromatography & Quadrupole Mass Spectrometry simulation workstation for Proton Pages:

1. **70 eV Electron Ionization (EI) Fragmentation**:
   - High-energy impact ionization generating radical cations $M^{+\bullet}$.
   - Mechanistic pathways:
     - McLafferty rearrangement: $\beta$-cleavage directed by carbonyl or aromatic rings via 6-membered cyclic transition state (e.g., $m/z\ 92$ in butylbenzene, $m/z\ 58$ in 2-pentanone).
     - $\alpha$-Cleavage yielding resonance-stabilized acylium cations (e.g., benzoyl $m/z\ 105$ in acetophenone, acetyl $m/z\ 43$).
     - Benzylic cleavage yielding tropylium cation ($m/z\ 91$, $[\text{C}_7\text{H}_7]^+$).
     - Diagnostic neutral loss tracking: $-\text{H}_2\text{O}$ (18 Da), $-\text{CO}$ / $-\text{C}_2\text{H}_4$ (28 Da), $-\text{CH}_3$ (15 Da), $-\text{C}_3\text{H}_6$ (42 Da), and halogen radical loss ($-\text{Cl}$, $-\text{Br}$).

2. **Exact High-Resolution Isotopic Abundance Envelopes**:
   - Multinomial isotopic expansion including $^{13}\text{C}$ binomial distributions.
   - Diagnostic halogen fingerprint recognition:
     - Single Chlorine ($\text{Cl}$): characteristic $3:1$ doublet at $M$ ($^{35}\text{Cl}$) and $M+2$ ($^{37}\text{Cl}$, $\sim 32.5\%$).
     - Single Bromine ($\text{Br}$): twin doublet of equal $1:1$ intensity at $M$ ($^{79}\text{Br}$) and $M+2$ ($^{81}\text{Br}$, $\sim 97.3\%$).

3. **Van Deemter Column Hydrodynamics**:
   - Theoretical plate height ($H$) as a function of mobile phase linear velocity ($u$):
     $$H = A + \frac{B}{u} + C \cdot u$$
     where:
     - $A = 2 \lambda d_p$ (eddy diffusion band broadening).
     - $B = 2 \gamma D_m$ (longitudinal molecular diffusion).
     - $C = \left[\frac{1}{6} \frac{k'}{(1+k')^2} \frac{d_p^2}{D_m} + C_s\right]$ (mass transfer resistance).
   - Optimum linear velocity: $u_{opt} = \sqrt{B/C}$.
   - Minimum plate height: $H_{min} = A + 2\sqrt{BC}$ and total theoretical plates $N = L/H$.

4. **Multi-Component Chromatographic Separation**:
   - Total Ion Chromatogram (TIC) and Extracted Ion Chromatograms (XIC).
   - Capacity factors $k'$, column dead time $t_0$, peak widths $w = 4 t_r / \sqrt{N}$, and chromatographic resolution $R_s = \frac{2(t_{r2} - t_{r1})}{w_1 + w_2}$.

5. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #17: GC/LC Mass Spec**.
   - 4 specialized operational tabs: EI Mass Spectrum visualizer, Isotope Abundance Envelopes, Van Deemter Curve with $d_p$ and length sliders, and Chromatogram TIC Separation.

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/mass_spectrometry.py](file:///d:/proton%20pages/services/chemistry/app/models/mass_spectrometry.py): Domain models for `MassPeak`, `IsotopePeak`, `ChromatographicPeak`, `VanDeemterPoint`, `MsStandard`.
- [schemas/mass_spectrometry.py](file:///d:/proton%20pages/services/chemistry/app/schemas/mass_spectrometry.py): Pydantic request/response validation schemas.
- [services/mass_spectrometry_service.py](file:///d:/proton%20pages/services/chemistry/app/services/mass_spectrometry_service.py): Mass spectrometry fragmentation and chromatography engine.
- [api/v1/endpoints/mass_spectrometry.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/mass_spectrometry.py): REST endpoints under `/api/v1/chemistry/mass-spectrometry`.
- [tests/unit/test_mass_spectrometry.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_mass_spectrometry.py): Unit tests for fragmentation, isotopes, Van Deemter, and resolution.
- [tests/integration/test_mass_spectrometry_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_mass_spectrometry_api.py): Integration tests for HTTP contracts and responses.

### Frontend Architecture (`src/`)
- [types/massSpectrometry.ts](file:///d:/proton%20pages/src/types/massSpectrometry.ts): TypeScript interfaces.
- [services/massSpectrometryService.ts](file:///d:/proton%20pages/src/services/massSpectrometryService.ts): Client service with offline fallback.
- [services/massSpectrometryService.test.ts](file:///d:/proton%20pages/src/services/massSpectrometryService.test.ts): Vitest test suite.
- [components/chemistry/analytical/MassSpectrometryWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/analytical/MassSpectrometryWorkstation.tsx): Interactive UI workstation.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Mounted as Rig #17.

---

## 3. Quality Gates & Verification

- **Backend Pytest**: 12/12 passed in `test_mass_spectrometry.py` and `test_mass_spectrometry_api.py`.
- **Frontend Vitest**: 37 test files, 207 passed (100% passing).
- **TypeScript**: `tsc --noEmit` clean pass.
- **Production Build**: `npm run build` clean bundle.
