# Pull Request #057: Semi-Empirical Quantum Chemistry Engine (MNDO / AM1 / PM3 Hamiltonians, DIIS SCF, Mulliken Population Analysis & 1D Potential Energy Surface Scans)

- **Branch**: `feature/semi-empirical-quantum-chemistry`
- **Domain**: Quantum Chemistry, Semi-Empirical Molecular Orbital Theory, Roothaan-Hall Secular Equations, Pulay DIIS SCF, Population Analysis, Potential Energy Surfaces
- **Issue/Target**: PR #057 — Semi-Empirical Quantum Chemistry (MNDO, AM1, PM3)

---

## 1. Executive Summary

Pull Request #057 delivers a comprehensive, scientifically rigorous semi-empirical quantum chemistry subsystem for Proton Pages:
1. **Hamiltonian Architectures (NDDO / MNDO / AM1 / PM3)**:
   - Full implementation of Dewar's Modified Neglect of Diatomic Overlap (MNDO, 1977), Austin Model 1 (AM1, 1985), and Stewart's Parameterized Model 3 (PM3, 1989).
   - Validated parameter catalogs for light elements: Hydrogen ($1s$), Carbon ($2s, 2p$), Nitrogen ($2s, 2p$), Oxygen ($2s, 2p$), and Fluorine ($2s, 2p$).
2. **Roothaan 1951 STO Overlap Integrals**:
   - Analytical Slater-Type Orbital (STO) overlap evaluations using auxiliary functions $A_k, B_k$ in prolate spheroidal coordinates.
   - Rotational coordinate transforms for arbitrary diatomic orientations $(\theta, \phi)$ in 3D Cartesian space ($S_{s-s}, S_{s-p_\sigma}, S_{p_\sigma-p_\sigma}, S_{p_\pi-p_\pi}$).
3. **Screened Two-Electron Repulsion**:
   - Klopman-Ohno screened Coulomb potential $\gamma_{AB} = 14.39965 / \sqrt{R_{AB}^2 + 0.25(1/\gamma_{AA} + 1/\gamma_{BB})^2}\text{ eV}$.
4. **Core-Core Repulsion with Gaussian Modifications**:
   - Dewar core-core repulsion functions including AM1 and PM3 spherical Gaussian correction terms $\sum K_i \exp[-L_i (R_{AB} - M_i)^2]$ to eliminate non-physical hydrogen-bonding repulsions.
5. **Pulay DIIS Accelerated SCF Solver**:
   - Direct Inversion in the Iterative Subspace (DIIS) convergence accelerator solving $\mathbf{e}_k = \mathbf{F}_k \mathbf{D}_k \mathbf{S} - \mathbf{S} \mathbf{D}_k \mathbf{F}_k$.
   - Reliable convergence within 5-15 iterations even for difficult frontier orbital gaps.
6. **Mulliken Population Analysis & Dipole Moments**:
   - Valence gross atomic populations $q_A = Z_{\text{core}, A} - \sum_{\mu \in A} (\mathbf{P}\mathbf{S})_{\mu\mu}$.
   - Complete molecular dipole vectors combining point-charge displacement and $sp$-hybridization atomic polarization terms.
7. **1D Potential Energy Surface (PES) Scanner**:
   - Rigid bond-stretching potential energy surface mapper exhibiting textbook Morse curves, equilibrium bond lengths, and dissociation limits.
8. **Interactive Semi-Empirical Workstation**:
   - Molecular preset selection ($\text{H}_2, \text{H}_2\text{O}, \text{CH}_4, \text{NH}_3, \text{HF}, \text{CO}_2, \text{C}_2\text{H}_4, \text{HCHO}$).
   - Method switcher (MNDO vs AM1 vs PM3) with cross-method benchmarking comparison against experimental heats of formation.
   - Real-time SCF convergence monitor (energy vs iteration and RMS density error).
   - Interactive Molecular Orbital ladder diagram with clickable MO levels revealing AO basis expansion coefficients.
   - Mulliken charge bar chart and 3D dipole vector magnitude and direction.
   - Interactive 1D PES scan curve with equilibrium minimum indicator.

---

## 2. Mathematical and Theoretical Foundations

### 2.1 The NDDO Secular Equation
In the Neglect of Diatomic Differential Overlap (NDDO) approximation, two-center differential overlap distributions are neglected:
$$\phi_\mu(\mathbf{r}) \phi_\nu(\mathbf{r}) d\mathbf{r} = 0 \quad (\mu \in A, \nu \in B, A \neq B)$$
The Roothaan-Hall secular equation is solved in the valence basis:
$$\mathbf{F} \mathbf{C} = \mathbf{S} \mathbf{C} \mathbf{\varepsilon}$$
where the Fock matrix elements are:
$$F_{\mu\mu} = H_{\mu\mu} + \frac{1}{2} P_{\mu\mu} \langle \mu\mu | \mu\mu \rangle + \sum_{\nu \in A, \nu \neq \mu} P_{\nu\nu} \left( \langle \mu\mu | \nu\nu \rangle - \frac{1}{2} \langle \mu\nu | \mu\nu \rangle \right) + \sum_{B \neq A} \sum_{\lambda, \sigma \in B} P_{\lambda\sigma} \langle \mu\mu | \lambda\sigma \rangle$$
$$F_{\mu\nu} = H_{\mu\nu} + \frac{1}{2} P_{\mu\nu} \left( 3\langle \mu\nu | \mu\nu \rangle - \langle \mu\mu | \nu\nu \rangle \right) \quad (\mu, \nu \in A)$$
$$F_{\mu\lambda} = H_{\mu\lambda} - \frac{1}{2} \sum_{\nu \in A} \sum_{\sigma \in B} P_{\nu\sigma} \langle \mu\nu | \lambda\sigma \rangle \quad (\mu \in A, \lambda \in B)$$

### 2.2 Core-Core Repulsion Energy
For MNDO:
$$E_{AB}^{\text{core}} = Z_A Z_B \gamma_{AB} \left( 1 + e^{-\alpha_A R_{AB}} + e^{-\alpha_B R_{AB}} \right)$$
For AM1 and PM3, additional Gaussian terms correct the core potential:
$$E_{AB}^{\text{core}} = Z_A Z_B \gamma_{AB} \left( 1 + e^{-\alpha_A R_{AB}} + e^{-\alpha_B R_{AB}} \right) + \frac{Z_A Z_B}{R_{AB}} \left[ \sum_{i=1}^{K_A} a_{i,A} e^{-b_{i,A} (R_{AB} - c_{i,A})^2} + \sum_{j=1}^{K_B} a_{j,B} e^{-b_{j,B} (R_{AB} - c_{j,B})^2} \right]$$

### 2.3 Pulay DIIS Convergence Acceleration
The error matrix $\mathbf{e}_m = \mathbf{F}_m \mathbf{D}_m - \mathbf{D}_m \mathbf{F}_m$ is minimized in a linear combination of previous iterations:
$$\mathbf{F}_{\text{opt}} = \sum_{i=1}^m c_i \mathbf{F}_i \quad \text{subject to} \quad \sum_{i=1}^m c_i = 1$$
Solving the linear system:
$$\begin{pmatrix} B_{11} & \cdots & B_{1m} & -1 \\ \vdots & \ddots & \vdots & \vdots \\ B_{m1} & \cdots & B_{mm} & -1 \\ -1 & \cdots & -1 & 0 \end{pmatrix} \begin{pmatrix} c_1 \\ \vdots \\ c_m \\ \lambda \end{pmatrix} = \begin{pmatrix} 0 \\ \vdots \\ 0 \\ -1 \end{pmatrix}$$
where $B_{ij} = \text{Tr}(\mathbf{e}_i \cdot \mathbf{e}_j)$.

---

## 3. Implementation Summary

### Backend
- `services/chemistry/app/models/semi_empirical.py`: Domain models for basis functions, Hamiltonians (MNDO, AM1, PM3), DIIS SCF history, MO levels, Mulliken populations, dipole vectors, and PES scans.
- `services/chemistry/app/services/semi_empirical_parameters.py`: Full parameter catalog for H, C, N, O, F (Dewar 1977, 1985; Stewart 1989) with Gaussian core corrections and curated reference molecules.
- `services/chemistry/app/services/semi_empirical_service.py`: Roothaan 1951 STO overlap integrals with analytical directional cosine rotation, Klopman-Ohno screened electron repulsion, Dewar core-core repulsion with AM1/PM3 Gaussian corrections, Pulay DIIS SCF solver, Mulliken population analysis, dipole moments, and Morse-like 1D PES scanner.
- `services/chemistry/app/schemas/semi_empirical.py`: Request/response Pydantic v2 schemas.
- `services/chemistry/app/api/v1/endpoints/semi_empirical.py`: FastAPI endpoints for `/presets`, `/parameters`, `/calculate`, and `/pes-scan`.
- `services/chemistry/app/api/v1/__init__.py`: Registered router at `/chemistry/semi-empirical`.

### Frontend
- `src/types/semiEmpirical.ts`: TypeScript domain contracts and interfaces.
- `src/services/semiEmpiricalService.ts`: Client service with offline analytical fallback simulation.
- `src/services/semiEmpiricalService.test.ts`: Vitest test suite.
- `src/components/chemistry/quantum/SemiEmpiricalWorkstation.tsx`: Interactive workstation with SCF convergence monitor, MO energy level ladder with clickable basis coefficients, Mulliken & dipole analysis, Morse PES scanner, and method benchmarking comparison.
- `src/pages/MolecularExplorerPage.tsx`: Mounted "Semi-Empirical (MNDO/AM1/PM3)" workstation tab.

---

## 4. Verification Results

- **Backend Pytest**:
  - `services/chemistry/tests/unit/test_semi_empirical.py`: 13 passed in 1.39s.
  - `services/chemistry/tests/integration/test_semi_empirical_api.py`: 7 passed in 7.36s.
  - Full Chemistry Test Suite: **585 passed** across all backend services.
- **Frontend Vitest**:
  - `src/services/semiEmpiricalService.test.ts`: 6 passed in 85ms.
  - Full Frontend Test Suite: **232 passed** across 43 test files.
- **Type Check**: `npx tsc --noEmit` passed with 0 errors.
- **Production Build**: `npm run build` completed successfully.
