# Pull Request #056: Radical Reaction Networks & Chemical Mechanism Generator (Stiff Rosenbrock Kinetics & Sensitivity Analysis)

- **Branch**: `feature/radical-reaction-networks-mechanisms`
- **Domain**: Chemical Kinetics, Radical Reactions, Stiff Differential Equations, Sensitivity Analysis, Combustion & Atmospheric Chemistry
- **Issue/Target**: PR #056 — Radical Reaction Networks & Mechanism Generator

---

## 1. Executive Summary

Pull Request #056 implements a rigorous, high-precision chemical kinetics subsystem for Proton Pages dedicated to radical reaction networks:
1. **Explicit Radical Species Model**: Distinguishes radical intermediates (hydroxyl, peroxy, alkyl, alkoxy, acyl, atomic) with explicit unpaired electrons, spin multiplicity ($2S+1$), and standard thermodynamic state functions ($\Delta H_f^\circ, \Delta G_f^\circ, S^\circ$).
2. **Elementary Reaction Classification**: Categorizes radical steps into initiation, propagation, chain branching, radical termination, and antioxidant scavenging.
3. **Modified Arrhenius Law Engine**: Evaluates forward rate constants $k(T) = A \cdot T^n \cdot \exp(-E_a / RT)$ with universal gas constant $R = 8.31446\times 10^{-3}\text{ kJ/(mol}\cdot\text{K)}$.
4. **L-Stable Rosenbrock (ROS2) Stiff Solver**: Integrates stiff reaction systems with eigenvalue ratios exceeding $10^8$, featuring analytical Jacobian matrix derivation, step-rejection on concentration overshoot, and adaptive time-stepping from $10^{-11}\text{ s}$ to seconds.
5. **Element Conservation Validator**: Verifies atomic mass balance vectors across Carbon, Hydrogen, Oxygen, Nitrogen, and Iron with relative tolerance $\epsilon < 10^{-3}$.
6. **Quasi-Steady-State Approximation (QSSA) Evaluator**: Evaluates the Bodenstein steady-state assumption for ultra-reactive intermediates ($[\text{OH}]_{\text{QSSA}} = P_{\text{OH}} / D_{\text{OH}}$) alongside exact numerical trajectories to identify transient breakdowns during explosive runaway.
7. **First-Order Sensitivity Analysis**: Computes normalized logarithmic sensitivity coefficients $\tilde{S}_{ij} = \frac{\partial \ln C_i}{\partial \ln k_j}$ identifying critical rate-controlling steps.
8. **Validated Chemical Mechanisms**:
   - $\text{H}_2/\text{O}_2$ Chain-Branching Combustion (8 species, 8 elementary steps)
   - Atmospheric Tropospheric Methane Oxidation & Smog Cycle (12 species, 6 elementary steps)
   - Free-Radical Chain Polymerization with AIBN Initiator (6 species, 4 elementary steps)
   - Biochemical Fenton Cascade & Ascorbate Radical Scavenging (8 species, 3 elementary steps)
9. **Interactive Radical Reaction Network Workstation**: Directed reaction network topology graph, multi-species stiff trajectory plotter, total radical pool monitor, QSSA comparative validator, and sensitivity bar chart.

---

## 2. Mathematical and Physical Foundations

### 2.1 Elementary Mass-Action Kinetics
For an elementary reaction step $j$:
$$\sum_i \nu_{ij}^{\text{react}} A_i \xrightarrow{k_j} \sum_i \nu_{ij}^{\text{prod}} A_i$$
The rate of reaction is given by:
$$r_j = k_j(T) \prod_i [C_i]^{\nu_{ij}^{\text{react}}}$$
The net species production rate is:
$$\frac{d[C_i]}{dt} = f_i(\mathbf{c}) = \sum_j S_{ij} r_j(\mathbf{c})$$
where $S_{ij} = \nu_{ij}^{\text{prod}} - \nu_{ij}^{\text{react}}$ is the stoichiometric matrix.

### 2.2 Analytical Jacobian Matrix
For the numerical stiff ODE integrator, the analytical Jacobian $J_{ik} = \frac{\partial f_i}{\partial c_k}$ is evaluated analytically:
$$J_{ik} = \sum_j S_{ij} \frac{\partial r_j}{\partial c_k} = \sum_j S_{ij} \left( k_j \frac{\nu_{kj}^{\text{react}}}{c_k} \prod_m c_m^{\nu_{mj}^{\text{react}}} \right)$$

### 2.3 L-Stable Rosenbrock Solver (ROS2)
Stiff kinetics where radical lifetimes are nanoseconds while reactant lifetimes are seconds cannot be integrated with explicit Runge-Kutta. The 2-stage L-stable Rosenbrock method solves:
$$\left(\mathbf{I} - \gamma h \mathbf{J}\right) \mathbf{k}_1 = \mathbf{f}(\mathbf{c}_n)$$
$$\left(\mathbf{I} - \gamma h \mathbf{J}\right) \mathbf{k}_2 = \mathbf{f}(\mathbf{c}_n + h \mathbf{k}_1) - 2\gamma h \mathbf{J} \mathbf{k}_1$$
$$\mathbf{c}_{n+1} = \mathbf{c}_n + h \left(\frac{1}{2} \mathbf{k}_1 + \frac{1}{2} \mathbf{k}_2\right)$$
with $\gamma = 1 - 1/\sqrt{2}$.

---

## 3. Implementation Summary

### Backend
- `services/chemistry/app/models/radical_reactions.py`: Domain models for species, reactions, rate laws, trajectories, and sensitivities.
- `services/chemistry/app/services/radical_reaction_service.py`: Stiff solver engine, Jacobian derivation, QSSA comparator, sensitivity analyzer, and 4 validated mechanisms.
- `services/chemistry/app/schemas/radical_reactions.py`: Pydantic v2 schemas validating mechanisms, simulation parameters, and output trajectories.
- `services/chemistry/app/api/v1/endpoints/radical_reactions.py`: FastAPI endpoints mounted under `/api/v1/chemistry/radical-reactions`.

### Frontend
- `src/types/radicalReactions.ts`: TypeScript domain contracts and interfaces.
- `src/services/radicalReactionsService.ts`: Client service with offline analytical fallbacks.
- `src/services/radicalReactionsService.test.ts`: Vitest suite verifying presets, trajectories, and QSSA monitoring.
- `src/components/chemistry/kinetics/RadicalReactionNetworkWorkstation.tsx`: Interactive workstation with network graph, stiff trajectory plotter, QSSA evaluator, and sensitivity matrix.
- `src/pages/VirtualLabPage.tsx`: Integrated new "Radical Reactions & Stiff ODE" workstation tab.

---

## 4. Verification Results

- **Backend Pytest**: 14 new tests in `test_radical_reactions.py` and `test_radical_reactions_api.py`. Total suite: 565 tests passing.
- **Frontend Vitest**: 3 new tests in `radicalReactionsService.test.ts`. Total frontend tests: 226 passed across 42 test files.
- **Type Check**: `npx tsc --noEmit` verified with 0 errors.
- **Build**: `npm run build` verified.
