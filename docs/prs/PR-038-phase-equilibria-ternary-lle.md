# Pull Request #038: Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE)

- **Branch**: `feature/phase-equilibria-ternary-lle`
- **Target**: `main`
- **Type**: Feature / Separation Processes & Phase Equilibria
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a comprehensive chemical engineering phase equilibria simulation suite and interactive Ternary Liquid-Liquid Extraction (LLE) workstation for Proton Pages:

1. **Equilateral Triangular Gibbs Phase Diagram Coordinates**:
   - Equilateral triangular coordinate projection:
     $$X = x_B + 0.5 \cdot x_C, \quad Y = \frac{\sqrt{3}}{2} \cdot x_C$$
   - Inversion from Cartesian back to normalized ternary fractions:
     $$x_C = \frac{2 Y}{\sqrt{3}}, \quad x_B = X - 0.5 \cdot x_C, \quad x_A = 1.0 - x_B - x_C$$
   - Strict conservation of mass fractions: $x_A + x_B + x_C = 1.0000$.

2. **Binodal Miscibility Gap Curve & Plait Point ($P$)**:
   - Division between the 2-phase immiscible zone (inside envelope) and the 1-phase homogeneous solution (above envelope).
   - Plait point $P$ where conjugate extract and raffinate phases become identical and tie-line length shrinks to zero.

3. **Thermodynamic Consistency Correlations**:
   - **Hand's Correlation**:
     $$\ln\left(\frac{y_C}{y_B}\right) = k_1 + k_2 \cdot \ln\left(\frac{x_C}{x_A}\right)$$
     Validating linearity of conjugate phase compositions ($R^2 \ge 0.95$).
   - **Othmer-Tobias Correlation**:
     $$\ln\left(\frac{1 - y_B}{y_B}\right) = k_3 + k_4 \cdot \ln\left(\frac{1 - x_A}{x_A}\right)$$
     Validating thermodynamic mutual consistency ($R^2 \ge 0.95$).
   - Distribution ratio $K_D = y_C / x_C$ and Selectivity $\beta = \frac{y_C / x_C}{y_A / x_A}$.

4. **Hunter-Nash Multistage Countercurrent Extraction Engine**:
   - Feed $F(x_{A,F}, x_{B,F}, x_{C,F})$ and Solvent $S(y_{A,S}, y_{B,S}, y_{C,S})$ overall mass balance mixture point $M$:
     $$\vec{M} = \frac{F \vec{F} + S \vec{S}}{F + S}$$
   - Extract $E_1$ and Target Raffinate $R_N$ lever-arm mass balance line $R_N - M - E_1$.
   - Operating Difference Point $\vec{\Delta}$ (Delta point):
     $$\vec{\Delta} = \frac{F \vec{F} - E_1 \vec{E}_1}{F - E_1} = \frac{R_N \vec{R}_N - S \vec{S}}{R_N - S}$$
   - Theoretical stage cascade stepping from $E_1 \rightarrow R_1 \rightarrow E_2 \rightarrow R_2 \dots \rightarrow R_N$.
   - Minimum Solvent-to-Feed ratio $(S/F)_{\min}$ calculation via pinch tie-line projection.

5. **Curated Experimental Benchmark Ternary Catalog**:
   - **Water – Toluene – Acetic Acid** at 298.15 K (Type-1 system with wide miscibility gap).
   - **Water – MIBK – Acetone** at 298.15 K (Industrial benchmark ketone extraction).
   - **Water – Chloroform – Acetic Acid** at 298.15 K (Dense solvent chlorinated extraction).

6. **Interactive Ternary Phase Diagram Workstation**:
   - Mounted in `VirtualLabPage.tsx` under `'ternary-lle'` ("Rig #7: Ternary LLE & Phase Equilibria").
   - Interactive SVG equilateral triangle with $10\%$ triangular gridlines.
   - Live mouse-hover coordinate readout calculating real-time Carrier/Solvent/Solute mass percentages.
   - Live rendering of binodal boundary, experimental tie-lines, plait point, overall balance line $F-M-S$, and Hunter-Nash stage cascade.
   - Operating sliders for feed flow rate, solute fraction, solvent rate, target raffinate fraction, and max stages.
   - Telemetry HUD displaying theoretical stages count, solute recovery $\%$, $(S/F)$ vs $(S/F)_{\min}$, and Hand / Othmer-Tobias $R^2$.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/ternary_lle.py](file:///d:/proton%20pages/services/chemistry/app/models/ternary_lle.py): Domain models for ternary points, tie-lines, correlations, and extraction stages.
- [schemas/ternary_lle.py](file:///d:/proton%20pages/services/chemistry/app/schemas/ternary_lle.py): Pydantic validation schemas.
- [services/ternary_lle_service.py](file:///d:/proton%20pages/services/chemistry/app/services/ternary_lle_service.py): TernaryLleEngine with Hand/Othmer-Tobias regressions and Hunter-Nash stage solver.
- [api/v1/endpoints/ternary_lle.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/ternary_lle.py): Endpoints `/systems`, `/systems/{system_id}`, `/simulate`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router registration.

### Frontend Architecture (`src/`)
- [types/ternaryLle.ts](file:///d:/proton%20pages/src/types/ternaryLle.ts): TypeScript interfaces.
- [services/ternaryLleService.ts](file:///d:/proton%20pages/src/services/ternaryLleService.ts): Client-side simulation fallback and API client.
- [components/chemistry/equilibria/TernaryPhaseDiagramWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/equilibria/TernaryPhaseDiagramWorkstation.tsx): Interactive Gibbs triangular phase diagram and Hunter-Nash cascade.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Mounted Rig #7 in Virtual Chemistry Laboratory.

### Test Verification
- [services/chemistry/tests/unit/test_ternary_lle.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_ternary_lle.py): 8 unit tests covering equilateral projections, Hand/Othmer-Tobias linearity, and Hunter-Nash stages.
- [services/chemistry/tests/integration/test_ternary_lle_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_ternary_lle_api.py): 5 integration tests covering systems listing, detail retrieval, simulation, and input validation.
- [src/services/ternaryLleService.test.ts](file:///d:/proton%20pages/src/services/ternaryLleService.test.ts): 5 Vitest tests for frontend client calculations and offline fallback.

---

## 3. Quality Gate Outcomes
- **Pytest**: 322/322 passed (100% across unit, integration, and property suites).
- **Vitest**: 131/131 passed (100% across 24 test suites).
- **TypeScript**: `tsc --noEmit` passed with 0 errors.
- **Vite Build**: Production bundle succeeded in 32.74s.
