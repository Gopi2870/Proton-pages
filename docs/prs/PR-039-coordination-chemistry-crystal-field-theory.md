# Pull Request #039: Coordination Chemistry & Crystal Field Theory (CFT)

- **Branch**: `feature/coordination-chemistry-crystal-field-theory`
- **Target**: `main`
- **Type**: Feature / Inorganic & Coordination Chemistry
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive computational inorganic chemistry suite and interactive Crystal Field Theory (CFT) workstation for Proton Pages:

1. **d-Orbital Energy Level Splitting Schemes**:
   - **Octahedral ($O_h$) Symmetry**:
     - Splitting into triply-degenerate lower $t_{2g}$ ($d_{xy}, d_{yz}, d_{xz}$, energy $-0.4 \Delta_o$) and doubly-degenerate upper $e_g$ ($d_{z^2}, d_{x^2-y^2}$, energy $+0.6 \Delta_o$).
     - Overall crystal field splitting $\Delta_o = f_{\text{ligand}} \cdot g_{\text{metal}} \times 1000\text{ cm}^{-1}$.
   - **Tetrahedral ($T_d$) Symmetry**:
     - Inverted splitting: lower doubly-degenerate $e$ (energy $-0.6 \Delta_t$) and upper triply-degenerate $t_2$ (energy $+0.4 \Delta_t$).
     - Geometric ratio: $\Delta_t = \frac{4}{9} \Delta_o$.
   - **Square Planar ($D_{4h}$) Symmetry**:
     - Four distinct energy levels: $(d_{xz}, d_{yz})$ at $-0.51 \Delta_o$, $d_{z^2}$ at $-0.43 \Delta_o$, $d_{xy}$ at $+0.23 \Delta_o$, and strongly destabilized $d_{x^2-y^2}$ at $+1.23 \Delta_o$.

2. **Crystal Field Stabilization Energy (CFSE) & Pairing Energy ($P$)**:
   - Octahedral CFSE equation:
     $$\text{CFSE}_{O_h} = (-0.4 \cdot n_{t_{2g}} + 0.6 \cdot n_{e_g}) \cdot \Delta_o + m \cdot P$$
   - Thermodynamic spin state determination:
     - **High-Spin (Weak Field)**: $\Delta_o < P$ (electrons maximize unpaired spins across $t_{2g}$ and $e_g$).
     - **Low-Spin (Strong Field)**: $\Delta_o \ge P$ (electrons pair in lower $t_{2g}$ before occupying $e_g$).
     - Unambiguous configurations ($d^1, d^2, d^3, d^8, d^9, d^{10}$) vs field-dependent configurations ($d^4, d^5, d^6, d^7$).

3. **Jahn-Teller Tetragonal Distortion**:
   - Theorem: Any non-linear molecule in an orbitally degenerate electronic state undergoes geometrical distortion to remove degeneracy and lower energy.
   - **Strong $z$-out elongation**: Asymmetric $e_g$ filling, particularly $d^9$ ($\text{Cu}^{2+}$, $t_{2g}^6 e_g^3$) and high-spin $d^4$ ($\text{Cr}^{2+}$, $t_{2g}^3 e_g^1$).
   - **Weak distortion**: Asymmetric $t_{2g}$ filling (e.g. $d^1, d^2$, HS $d^6$, LS $d^4, d^5$).

4. **Magnetic Susceptibility & Spin-Only Magnetic Moments**:
   - Number of unpaired electrons $n$.
   - Spin-only effective magnetic moment:
     $$\mu_{\text{eff}} = \sqrt{n(n + 2)} \ \mu_B \quad (\text{Bohr Magnetons})$$
   - Paramagnetic ($n \ge 1$) versus Diamagnetic ($n = 0$).

5. **Spectrochemical Series & Ligand Field Strength**:
   - Curated ranking: $\text{I}^- < \text{Br}^- < \text{Cl}^- < \text{F}^- < \text{OH}^- < \text{H}_2\text{O} < \text{NH}_3 < \text{en} < \text{NO}_2^- < \text{CN}^- < \text{CO}$.
   - Jørgensen ligand $f$-factors and transition metal $g$-factors.
   - Optical absorption wavelength $\lambda_{\max} = \frac{10^7}{\Delta}$ (nm) and complementary perceived color calculation.

6. **Interactive Coordination & CFT Workstation**:
   - Mounted in `MolecularExplorerPage.tsx` under `'coordination'` tab.
   - Visual d-orbital energy ladder with dynamic electron spin arrow rendering ($\uparrow$ and $\downarrow$) in orbital boxes.
   - Real-time transition metal and ligand selection with live calculation of CFSE ($\Delta$ and $\text{kJ/mol}$), $\mu_{\text{eff}}$, and Jahn-Teller effect.
   - Presets: $[Fe(CN)_6]^{4-}, [Fe(H_2O)_6]^{2+}, [Co(NH_3)_6]^{3+}, [Cu(H_2O)_6]^{2+}, [NiCl_4]^{2-}, [Pt(NH_3)_2Cl_2]$ (cisplatin).

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/coordination_cft.py](file:///d:/proton%20pages/services/chemistry/app/models/coordination_cft.py): Domain models for transition metal ions, ligands, orbital levels, and complexes.
- [schemas/coordination_cft.py](file:///d:/proton%20pages/services/chemistry/app/schemas/coordination_cft.py): Pydantic validation schemas.
- [services/coordination_cft_service.py](file:///d:/proton%20pages/services/chemistry/app/services/coordination_cft_service.py): CoordinationCftEngine with $O_h, T_d, D_{4h}$ splitting, CFSE, spin decision, Jahn-Teller diagnosis, and magnetic moments.
- [api/v1/endpoints/coordination_cft.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/coordination_cft.py): Endpoints `/metals`, `/ligands`, `/presets`, `/analyze`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router registration.

### Frontend Architecture (`src/`)
- [types/coordinationCft.ts](file:///d:/proton%20pages/src/types/coordinationCft.ts): TypeScript type interfaces.
- [services/coordinationCftService.ts](file:///d:/proton%20pages/src/services/coordinationCftService.ts): Client-side analytical simulation engine and API client.
- [components/chemistry/coordination/CoordinationCftWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/coordination/CoordinationCftWorkstation.tsx): Interactive d-orbital energy ladder, spin arrows, color swatch, and telemetry HUD.
- [pages/MolecularExplorerPage.tsx](file:///d:/proton%20pages/src/pages/MolecularExplorerPage.tsx): Mounted Coordination & CFT tab.

### Test Verification
- [services/chemistry/tests/unit/test_coordination_cft.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_coordination_cft.py): 7 unit tests for d-electron counts, high/low spin states, CFSE, magnetic moments, and Jahn-Teller effect.
- [services/chemistry/tests/integration/test_coordination_cft_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_coordination_cft_api.py): 5 integration tests for API contracts, presets, and geometries.
- [src/services/coordinationCftService.test.ts](file:///d:/proton%20pages/src/services/coordinationCftService.test.ts): 5 Vitest tests for frontend client calculations.

---

## 3. Quality Gate Outcomes
- **Pytest**: 334/334 passed (100%).
- **Vitest**: 136/136 passed (100% across 25 test suites).
- **TypeScript**: `tsc --noEmit` passed with 0 errors.
- **Vite Build**: Production bundle succeeded in 29.43s.
