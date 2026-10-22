# Pull Request #043: Statistical Thermodynamics & Molecular Partition Functions

- **Branch**: `feature/statistical-thermo-partition-functions`
- **Target**: `main`
- **Type**: Feature / Statistical Mechanics, Physical Chemistry & Molecular Thermodynamics
- **Status**: Verified & Ready to Merge

---

## 1. Objective & Purpose
Implement an authentic, first-principles statistical thermodynamics workstation bridging quantum molecular energy levels to macroscopic thermodynamic observables for Proton Pages:

1. **Molecular Canonical Partition Functions ($q = q_{\text{trans}} \cdot q_{\text{rot}} \cdot q_{\text{vib}} \cdot q_{\text{elec}}$)**:
   - **Translational Partition Function ($q_{\text{trans}}$)**:
     $$\Lambda = \frac{h}{\sqrt{2\pi m k_B T}}$$
     $$q_{\text{trans}} = \frac{V}{\Lambda^3} = \frac{k_B T}{P} \left(\frac{2\pi m k_B T}{h^2}\right)^{3/2}$$
   - **Rotational Partition Function ($q_{\text{rot}}$)**:
     - Monatomic: $q_{\text{rot}} = 1$.
     - Linear Polyatomic / Diatomic:
       $$q_{\text{rot}} = \frac{T}{\sigma \Theta_{\text{rot}}} \left( 1 + \frac{\Theta_{\text{rot}}}{3T} \right)$$
       where $\Theta_{\text{rot}} = \frac{h c \tilde{B}}{k_B}$ and $\sigma$ is the rotational symmetry number ($\sigma = 1$ for heteronuclear $\text{CO}, \text{HCl}$; $\sigma = 2$ for homonuclear $\text{N}_2, \text{O}_2, \text{CO}_2$).
     - Non-linear 3D Asymmetric / Spherical Rotor:
       $$q_{\text{rot}} = \frac{\sqrt{\pi}}{\sigma} \left(\frac{T^3}{\Theta_A \Theta_B \Theta_C}\right)^{1/2}$$
       where $\sigma = 2$ for $\text{H}_2\text{O}$ ($C_{2v}$), $\sigma = 12$ for $\text{CH}_4$ ($T_d$).
   - **Vibrational Partition Function ($q_{\text{vib}}$)**:
     - Product over all $3N-5$ (linear) or $3N-6$ (non-linear) normal modes referenced to zero-point energy:
       $$q_{\text{vib}} = \prod_{i=1}^{N_{\text{modes}}} \frac{1}{1 - e^{-\Theta_{\text{vib}, i} / T}}$$
       where $\Theta_{\text{vib}, i} = \frac{h c \tilde{\nu}_i}{k_B}$.
     - Zero-point energy: $E_{\text{ZPE}} = \frac{1}{2} R \sum_{i} \Theta_{\text{vib}, i}$.
   - **Electronic Partition Function ($q_{\text{elec}}$)**:
     $$q_{\text{elec}} = g_0 + g_1 e^{-\Delta\epsilon / k_B T}$$
     accounting for ground-state degeneracies ($g_0 = 1$ for singlets, $g_0 = 3$ for triplet $\text{O}_2$).

2. **Macroscopic Thermodynamic State Functions (Canonical Ensemble for Indistinguishable Particles)**:
   - Canonical partition function: $Q(N, V, T) = \frac{q^N}{N!}$.
   - **Thermal Internal Energy $U_m(T) - U_m(0)$**:
     $$U_m - U_m(0) = R T^2 \frac{\partial \ln q}{\partial T} = \frac{3}{2} R T + U_{\text{rot}} + R \sum_i \frac{\Theta_{\text{vib}, i}}{e^{\Theta_{\text{vib}, i} / T} - 1}$$
   - **Standard Absolute Molar Entropy $S_m^\circ$**:
     - Sackur-Tetrode formula for translation:
       $$S_{\text{trans}}^\circ = R \left[ \ln\left( q_{\text{trans}}^\circ \right) + \frac{5}{2} \right]$$
     - Rotational entropy: $S_{\text{rot}} = R [\ln q_{\text{rot}} + 1]$ (linear) or $R [\ln q_{\text{rot}} + \frac{3}{2}]$ (non-linear).
     - Vibrational entropy:
       $$S_{\text{vib}} = R \sum_i \left[ \frac{\Theta_{\text{vib}, i}/T}{e^{\Theta_{\text{vib}, i}/T} - 1} - \ln(1 - e^{-\Theta_{\text{vib}, i}/T}) \right]$$
     - Total absolute entropy: $S_m^\circ = S_{\text{trans}}^\circ + S_{\text{rot}} + S_{\text{vib}} + S_{\text{elec}}$.
   - **Isochoric & Isobaric Heat Capacities ($C_v, C_p$)**:
     $$C_{v, \text{vib}} = R \sum_i \left(\frac{\Theta_{\text{vib}, i}}{T}\right)^2 \frac{e^{\Theta_{\text{vib}, i}/T}}{(e^{\Theta_{\text{vib}, i}/T} - 1)^2}$$
     $$C_{p, m} = C_{v, m} + R$$
   - **Free Energies**:
     $$A_m^\circ = U_m - T S_m^\circ \quad \text{and} \quad G_m^\circ - H_m^\circ(0) = -R T \ln\left(\frac{q^\circ}{N_A}\right)$$

3. **Quantum Freeze-out and Equipartition Transitions**:
   - Evaluates temperature dependence curves showing why vibrational modes freeze out at ambient temperatures ($T \ll \Theta_{\text{vib}}$), locking $C_v$ to translational and rotational degrees of freedom until high temperatures approach the classical equipartition ceiling.

4. **Curated Molecular Catalog**:
   - Argon ($\text{Ar}$), Helium ($\text{He}$), Dinitrogen ($\text{N}_2$), Carbon Monoxide ($\text{CO}$), Dioxygen ($\text{O}_2$), Hydrogen Chloride ($\text{HCl}$), Carbon Dioxide ($\text{CO}_2$), Water Vapor ($\text{H}_2\text{O}$), Methane ($\text{CH}_4$).

5. **Interactive UI Workstation**:
   - Mounted in `VirtualLabPage.tsx` as **Rig #10: Statistical Thermodynamics & Partition Functions**.
   - Live state controls: Temperature slider ($10\text{ K} - 2500\text{ K}$) and pressure slider ($10\text{ kPa} - 500\text{ kPa}$).
   - Partition functions breakdown HUD: $q_{\text{trans}}, q_{\text{rot}}, q_{\text{vib}}, q_{\text{elec}}, q_{\text{total}}$, and thermal de Broglie wavelength $\Lambda$.
   - Interactive SVG $C_v(T)$ and $C_p(T)$ freeze-out trajectory plot with crosshair inspection and equipartition asymptotic threshold.

---

## 2. Implementation Scope

### Backend Architecture (`services/chemistry`)
- [models/statistical_thermo.py](file:///d:/proton%20pages/services/chemistry/app/models/statistical_thermo.py): Domain models for `MoleculeSpec`, `PartitionFunctionsBreakdown`, `HeatCapacityDecomposition`, `ThermodynamicState`, and `TemperatureCurvePoint`.
- [schemas/statistical_thermo.py](file:///d:/proton%20pages/services/chemistry/app/schemas/statistical_thermo.py): Pydantic request/response schemas.
- [services/statistical_thermo_service.py](file:///d:/proton%20pages/services/chemistry/app/services/statistical_thermo_service.py): `StatisticalThermoEngine` evaluating partition functions, state functions, and temperature sweeps.
- [api/v1/endpoints/statistical_thermo.py](file:///d:/proton%20pages/services/chemistry/app/api/v1/endpoints/statistical_thermo.py): FastAPI endpoints mounted at `/api/v1/chemistry/statistical-thermo`.

### Frontend Architecture (`src/`)
- [types/statisticalThermo.ts](file:///d:/proton%20pages/src/types/statisticalThermo.ts): Domain types and interfaces.
- [services/statisticalThermoService.ts](file:///d:/proton%20pages/src/services/statisticalThermoService.ts): Dual-layer service with client-side fallback computation.
- [services/statisticalThermoService.test.ts](file:///d:/proton%20pages/src/services/statisticalThermoService.test.ts): Vitest unit tests.
- [components/chemistry/thermo/StatisticalThermoWorkstation.tsx](file:///d:/proton%20pages/src/components/chemistry/thermo/StatisticalThermoWorkstation.tsx): Interactive workstation component.
- [pages/VirtualLabPage.tsx](file:///d:/proton%20pages/src/pages/VirtualLabPage.tsx): Integration as Rig #10.

---

## 3. Automated Test Evidence

### Backend Test Results (Pytest)
```
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_curated_molecules_catalog PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_argon_sackur_tetrode_monatomic_entropy PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_dinitrogen_partition_functions_and_freezeout PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_water_polyatomic_asymmetric_rotor PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_co2_degenerate_bending_heat_capacity PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_temperature_sweep_freezeout_curve PASSED
services/chemistry/tests/unit/test_statistical_thermo.py::TestStatisticalThermoEngine::test_unphysical_inputs_validation PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_get_molecules_endpoint PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_get_molecule_detail_endpoint PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_get_molecule_detail_not_found PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_calculate_endpoint_argon PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_calculate_endpoint_water PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_temperature_sweep_endpoint PASSED
services/chemistry/tests/integration/test_statistical_thermo_api.py::TestStatisticalThermoApi::test_validation_errors PASSED
======================== 387 passed in 9.10s ========================
```

### Frontend Test Results (Vitest)
```
 ✓ src/services/statisticalThermoService.test.ts (7 tests) 10ms
 Test Files  29 passed (29)
      Tests  163 passed (163)
   Duration  4.33s
```

### TypeScript Validation
```
npx tsc --noEmit
Exit Code: 0 (Zero errors)
```

---

## 4. Verification & Validation Summary
- Standard molar entropy of Argon at 298.15 K verified against experimental literature: $154.84\text{ J/(mol K)}$.
- $\text{N}_2$ heat capacity at 298.15 K verified to lock at $\frac{5}{2} R$ ($20.785\text{ J/(mol K)}$) due to vibrational freeze-out ($\Theta_{\text{vib}} = 3393.5\text{ K}$).
- $\text{CO}_2$ bending modes at $667.4\text{ cm}^{-1}$ verified to activate at room temperature, elevating $C_v$ to $28.5\text{ J/(mol K)}$.
- High-temperature limit verified to converge asymptotically to the classical equipartition ceiling.
- Zero regressions across the entire platform (387 Pytest + 163 Vitest = 550 tests passing).
