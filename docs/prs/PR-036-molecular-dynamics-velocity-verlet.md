# Pull Request #036: Molecular Dynamics Engine & Velocity-Verlet Simulation Sandbox

- **Branch**: `feature/molecular-dynamics-velocity-verlet`
- **Target**: `main`
- **Type**: Feature / Scientific Computing & Numerical Simulation
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement a rigorous, unit-consistent molecular dynamics (MD) simulation engine and interactive 3D laboratory workstation for Proton Pages:

1. **Lennard-Jones (12-6) Pair Potential & Analytical Forces**:
   - Pairwise interatomic potential with explicit physical units:
     $$U(r_{ij}) = 4\epsilon \left[ \left(\frac{\sigma}{r_{ij}}\right)^{12} - \left(\frac{\sigma}{r_{ij}}\right)^6 \right] - U_{\text{shift}}$$
     where $\sigma = 3.405\text{ \AA}$ and $\epsilon = 0.996\text{ kJ/mol}$ for Argon.
   - Analytical interatomic force derived from the negative spatial gradient ($-\nabla U$):
     $$\mathbf{F}_{ij} = \frac{48\epsilon}{r_{ij}^2} \left[ \left(\frac{\sigma}{r_{ij}}\right)^{12} - \frac{1}{2}\left(\frac{\sigma}{r_{ij}}\right)^6 \right] \mathbf{r}_{ij}$$
   - Truncated and energy-shifted at spherical cutoff $r_c = 2.5\sigma$ ($8.51\text{ \AA}$) to prevent artificial potential discontinuities at cell boundaries.

2. **Symplectic Velocity-Verlet Time Integration**:
   - Second-order, time-reversible, symplectic integrator preserving phase-space volume:
     $$\mathbf{v}(t + \frac{1}{2}\Delta t) = \mathbf{v}(t) + \frac{1}{2}\mathbf{a}(t)\Delta t$$
     $$\mathbf{r}(t + \Delta t) = \mathbf{r}(t) + \mathbf{v}(t + \frac{1}{2}\Delta t)\Delta t$$
     $$\mathbf{a}(t + \Delta t) = \frac{\mathbf{F}(t + \Delta t)}{m}$$
     $$\mathbf{v}(t + \Delta t) = \mathbf{v}(t + \frac{1}{2}\Delta t) + \frac{1}{2}\mathbf{a}(t + \Delta t)\Delta t$$
   - Rigorous unit conversion for acceleration:
     $$a\,(\text{\AA/ps}^2) = \frac{F\,(\text{kJ}/(\text{mol}\cdot\text{\AA}))}{M\,(\text{g/mol})} \times 100.0$$

3. **Periodic Boundary Conditions (PBC) & Minimum Image Convention**:
   - Cubic simulation cell of length $L = \sqrt[3]{V}$ with minimum image vector wrapping:
     $$\Delta x_{\text{wrapped}} = \Delta x - L \cdot \text{round}\left(\frac{\Delta x}{L}\right)$$
   - Unwrapped position tracking for accurate continuous displacement and diffusion calculation across boundary crossings.

4. **Thermodynamic Ensembles & Thermostats**:
   - **NVE Microcanonical Ensemble**: Strictly isolated total energy ($E_{\text{tot}} = E_k + E_p$) with bounded numerical drift $< 0.1\%$ over extended trajectories.
   - **NVT Berendsen Weak-Coupling Thermostat**: Velocity rescaling toward target $T_0$ via exponential relaxation:
     $$\lambda = \sqrt{1 + \frac{\Delta t}{\tau} \left(\frac{T_0}{T_{\text{inst}}} - 1\right)}$$
     Qualified with explicit documentation noting that Berendsen does not reproduce the true canonical momentum fluctuation variance $\sigma_E^2 = k_B T^2 C_v$.
   - **NVT Andersen Stochastic Thermostat**: Thermal collisions with an imaginary heat bath at frequency $\nu = \Delta t / \tau$, generating genuine canonical Maxwell-Boltzmann velocity distributions.

5. **Statistical Mechanics Observables & Transport Properties**:
   - Instantaneous temperature via equipartition theorem with center-of-mass degrees of freedom removed:
     $$T_{\text{inst}} = \frac{2 E_k}{(3N - 3) R}$$
   - Virial equation of state pressure:
     $$P = \left( \frac{N R T + \frac{1}{3} W}{V} \right) \times 16605.39\text{ bar}, \quad W = \sum_{i < j} \mathbf{r}_{ij} \cdot \mathbf{F}_{ij}$$
   - Radial distribution function $g(r)$:
     $$g(r) = \frac{2 \langle N(r) \rangle}{N \rho \cdot 4\pi r^2 \Delta r}$$
     capturing liquid Argon coordination shells at $r \approx 3.7\text{ \AA}$ and $r \approx 7.1\text{ \AA}$.
   - Einstein Mean Squared Displacement (MSD) and self-diffusion coefficient $D$:
     $$\text{MSD}(t) = \frac{1}{N} \sum_{i=1}^N |\mathbf{r}_i(t) - \mathbf{r}_i(0)|^2, \quad D = \lim_{t \to \infty} \frac{\text{MSD}(t)}{6t}$$

6. **Interactive 3D Workstation Frontend**:
   - Mounted under `MolecularExplorerPage.tsx` as a new dedicated workbench tab ("Molecular Dynamics").
   - Real-time 60 FPS HTML5 Canvas engine with 3D projection, orbital mouse drag rotation, depth sorting, and kinetic energy color mapping.
   - Live telemetry cards for temperature, virial pressure, energy partition, and drift ratio.
   - Analytical batch trajectory plots for $g(r)$ pair correlation histograms and MSD linear diffusion curves.
   - Full lab notebook integration via `experimentsApi.saveExperiment` and contextual AI assistant prompt generation.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/molecular_dynamics.py](file:///d:/proton%20pages/services/chemistry/app/models/molecular_dynamics.py): Data models for particles, telemetry, radial distribution, MSD, and simulation results.
- [schemas/molecular_dynamics.py](file:///d:/proton%20pages/services/chemistry/app/schemas/molecular_dynamics.py): Pydantic v2 schemas for simulation validation.
- [services/molecular_dynamics_service.py](file:///d:/proton%20pages/services/chemistry/app/services/molecular_dynamics_service.py): Symplectic Velocity-Verlet engine, FCC/SC lattice initialization, Maxwell-Boltzmann sampler, PBC minimum image, and virial pressure.
- [api/v1/endpoints/molecular_dynamics.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/molecular_dynamics.py): Endpoints `/dynamics/presets` and `/dynamics/simulate`.
- [api/v1/__init__.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/__init__.py): Router registration.

### Frontend Architecture (`src/`)
- [types/molecularDynamics.ts](file:///d:/proton%20pages/src/types/molecularDynamics.ts): TypeScript interfaces for ensembles, telemetry, and presets.
- [services/molecularDynamicsService.ts](file:///d:/proton%20pages/src/services/molecularDynamicsService.ts): Client-side 60 FPS simulation engine, unit conversions, and API client.
- [components/chemistry/dynamics/MolecularDynamicsWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/dynamics/MolecularDynamicsWorkstation.tsx): Interactive 3D particle canvas, playback controls, parameter sliders, telemetry HUD, and $g(r)$/MSD plots.
- [pages/MolecularExplorerPage.tsx](file:///d:/proton%20pages/src/pages/MolecularExplorerPage.tsx): Mounted new tab `'dynamics'` with full command strip integration.

### Test Verification
- [services/chemistry/tests/unit/test_molecular_dynamics.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_molecular_dynamics.py): 9 unit tests validating force gradients, Newton's 3rd law, PBC wrapping, Maxwell-Boltzmann COM momentum, NVE energy conservation, and thermostats.
- [services/chemistry/tests/integration/test_molecular_dynamics_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_molecular_dynamics_api.py): 4 integration tests verifying API preset retrieval, NVE/NVT payloads, and input validation.
- [src/services/molecularDynamicsService.test.ts](file:///d:/proton%20pages/src/services/molecularDynamicsService.test.ts): 7 Vitest tests for frontend numerical integration.

---

## 3. Quality Gate Outcomes
- **Pytest**: 297/297 passed (100%).
- **Vitest**: 121/121 passed (100%).
- **TypeScript**: `tsc --noEmit` passed with 0 errors.
- **Vite Build**: Production bundle succeeded in 32.90s.
