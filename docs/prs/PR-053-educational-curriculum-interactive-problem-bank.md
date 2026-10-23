# Pull Request #053: Educational Chemistry Curriculum & Interactive Multi-Step Problem Bank

- **Branch**: `feature/educational-curriculum-interactive-problem-bank`
- **Target**: `main`
- **Type**: Feature / Educational Chemistry Curriculum, Multi-Step Mathematical Derivations, Dimensional Analysis Verification, Automated Rubric Grading, & Parameter Randomization
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose

Deliver a comprehensive, multi-disciplinary Educational Chemistry Assessment & Interactive Problem Bank workstation for Proton Pages:

1. **Curated Multi-Disciplinary Chemistry Problem Bank**:
   - Covers core subdisciplines:
     - **Physical Chemistry**: Clausius-Clapeyron vapor pressure relations, phase equilibria, and vaporization enthalpies.
     - **Reaction Kinetics & Catalysis**: Arrhenius activation barriers ($E_a$), temperature-dependent rate constants, and transition-state thermodynamics.
     - **Inorganic & Coordination Chemistry**: Crystal Field Stabilization Energy (CFSE) of octahedral and tetrahedral complexes, high/low-spin electron configurations, and spectrochemical series.
     - **Quantum Chemistry & Molecular Orbitals**: Particle-in-a-box conjugated polyene models (HOMO/LUMO transition wavelengths $\lambda = hc/\Delta E$), zero-point energies, and Hückel resonance stabilization.
     - **Analytical Chemistry & Spectroscopy**: Standard addition methodology in spectrophotometry, matrix interference elimination, and Beer-Lambert calibrations.
     - **Electrochemistry & Redox Systems**: Non-standard electromotive force (EMF) via Nernst equation for galvanic cells with concentration polarization.

2. **Automated Mathematical Grading & Dimensional Verification**:
   - Intermediate derivation step evaluation checking mathematical formulation, intermediate values, and dimensional unit compatibility.
   - Partial credit scoring algorithm awarding points per valid step plus final answer verification within scientific tolerances (+/- 2.5%).
   - Multi-tier pedagogical hints with tiered score penalty accounting (Tier 1 Concept Nudge: 0%, Tier 2 Equation: 10%, Tier 3 Derivation: 20%).
   - Objective rubric criteria breakdown generating itemized score reporting.

3. **Dynamic Parameter Perturbation & Randomization**:
   - Algorithmic generation of randomized problem instances with perturbed physical quantities (e.g. pressure, temperature, concentration) and automatic on-the-fly recomputation of exact analytical step targets and reference solutions.

4. **Glassmorphic Student Workstation**:
   - Integrated into `src/pages/AssignmentsPage.tsx` under **Interactive Problem Bank** tab.
   - Branch filters, search bar, active problem statement card, LaTeX formula preview, step input inputs, hint accordion, and complete worked solution derivations.

---

## 2. Architecture & File Registry

### Backend Architecture (`services/chemistry`)
- [models/education_problem.py](file:///d:/proton%20pages/services/chemistry/app/models/education_problem.py): Domain models for `ChemistryProblem`, `ProblemStep`, `ProblemHint`, `RubricCriterion`, `StepSubmission`, `ProblemVerificationRequest`, `ProblemVerificationResponse`.
- [schemas/education_problem.py](file:///d:/proton%20pages/services/chemistry/app/schemas/education_problem.py): Pydantic request/response schemas for `/api/v1/education/problems`.
- [data/problem_bank.py](file:///d:/proton%20pages/services/chemistry/app/data/problem_bank.py): Repository of authentic problems across Physical, Kinetics, Inorganic, Quantum, Analytical, and Electrochemistry.
- [services/education_problem_service.py](file:///d:/proton%20pages/services/chemistry/app/services/education_problem_service.py): Step scoring engine, dimensional unit checker, hint penalty assessor, and randomized problem generator.
- [api/v1/endpoints/education_problems.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/education_problems.py): REST endpoints under `/api/v1/education/problems`.
- [tests/unit/test_education_problem.py](file:///d:/proton%20pages/services/chemistry/tests/unit/test_education_problem.py): Unit tests for listing, perfect score, hint penalties, incorrect submissions, and randomization.
- [tests/integration/test_education_problem_api.py](file:///d:/proton%20pages/services/chemistry/tests/integration/test_education_problem_api.py): Integration tests for HTTP contracts, filters, details, and verification.

### Frontend Architecture (`src/`)
- [types/educationProblem.ts](file:///d:/proton%20pages/src/types/educationProblem.ts): TypeScript domain definitions and interfaces.
- [services/educationProblemService.ts](file:///d:/proton%20pages/src/services/educationProblemService.ts): Client service with offline evaluation engine and fallback problem bank.
- [services/educationProblemService.test.ts](file:///d:/proton%20pages/src/services/educationProblemService.test.ts): Vitest test suite for client and offline fallbacks.
- [components/education/InteractiveProblemBank.tsx](file:///d:/proton%20pages/src/components/education/InteractiveProblemBank.tsx): Interactive problem bank explorer and solver.
- [pages/AssignmentsPage.tsx](file:///d:/proton%20pages/src/pages/AssignmentsPage.tsx): Mounted with tab switcher.

---

## 3. Verification & Test Metrics
- **Backend Tests (`pytest`)**: 11/11 passed in 3.62s.
- **Frontend Tests (`vitest`)**: 39 test suites, 215 passed in 7.35s.
- **TypeScript (`npx tsc --noEmit`)**: 0 errors.
- **Vite Build (`npm run build`)**: 0 errors (built in 50.86s).
