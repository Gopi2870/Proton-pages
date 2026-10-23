# Pull Request #055: Crystallographic Space Groups & 230 Symmetry Operators (Wyckoff Positions & Powder XRD Bragg Diffraction)

- **Branch**: `feature/crystallographic-space-groups-wyckoff`
- **Domain**: Solid-State Chemistry, Mathematical Crystallography, Symmetry Operations, Powder X-Ray Diffraction
- **Issue/Target**: PR #055 — 230 Crystallographic Space Groups, Wyckoff Sites, and Powder XRD

---

## 1. Executive Summary

Pull Request #055 implements an authentic, mathematically rigorous crystallographic subsystem for Proton Pages covering:
1. **230 Standard Crystallographic Space Groups**: Full metadata catalogue spanning all 7 crystal systems (Triclinic, Monoclinic, Orthorhombic, Tetragonal, Trigonal, Hexagonal, Cubic), with Hermann-Mauguin, Schönflies, and Hall notations, point groups, Laue classes, and centering types.
2. **Affine Symmetry Operations & Jones-Faithful Parser**: Converts Jones-Faithful symmetry strings into $3\times 3$ rotation/reflection/inversion matrices $\mathbf{W}$ and $3\times 1$ translation vectors $\mathbf{w}$ satisfying $\mathbf{r}' = \mathbf{W}\mathbf{r} + \mathbf{w} \pmod 1$, with proper/improper rotation order classification and determinant validation.
3. **Wyckoff Position Registry & Orbit Generator**: Full Wyckoff positions with traceable provenance from the *International Tables for Crystallography Volume A* (2016). Generates full equivalent crystallographic orbits from arbitrary asymmetric coordinates with periodic boundary condition deduplication within $\epsilon = 10^{-4}$ tolerance.
4. **Metric Tensor & Busing-Levy Coordinate Transformations**: Direct metric tensor $G$, reciprocal metric tensor $G^*$, Busing-Levy Direct-to-Cartesian matrix $M$ ($\mathbf{r}_{\text{cart}} = M \mathbf{r}_{\text{frac}}$) and its inverse $M^{-1}$, direct cell volume calculation, and minimum-image periodic distance evaluation.
5. **Cromer-Mann Atomic Scattering Factors & Powder XRD Simulation**: Authentic 9-parameter analytical Gaussian fits ($f_0(s) = \sum a_i e^{-b_i s^2} + c$), temperature Debye-Waller attenuation, structure factors $F(hkl)$, Lorentz-polarization factor $L_p(\theta)$, space-group centering systematic absences ($P, I, F, C$), and continuous pseudo-Voigt profile synthesis.
6. **Interactive Space Group & Wyckoff Workbench**: Interactive canvas-based isometric 3D unit cell projector with slow auto-rotation, Wyckoff orbit generator, symmetry operators inspector, metric tensor explorer, and SVG powder XRD diffractogram with Miller index peak sticks.

---

## 2. Mathematical and Physical Foundations

### 2.1 Affine Space Group Symmetry Transformations
For any crystallographic operation in a space group $G$, an asymmetric coordinate $\mathbf{r} = (x, y, z)^T$ is mapped to an equivalent position:
$$\mathbf{r}' = \mathbf{W} \mathbf{r} + \mathbf{w} \pmod 1$$
where $\mathbf{W} \in O(3)$ is a $3\times 3$ orthogonal integer-based matrix ($\det(\mathbf{W}) = +1$ for proper rotations, $-1$ for improper rotations/reflections) and $\mathbf{w}$ is a fractional translation vector.

### 2.2 Direct and Reciprocal Metric Tensors
Given unit cell parameters $(a, b, c, \alpha, \beta, \gamma)$:
$$G = \begin{pmatrix} a^2 & ab\cos\gamma & ac\cos\beta \\ ab\cos\gamma & b^2 & bc\cos\alpha \\ ac\cos\beta & bc\cos\alpha & c^2 \end{pmatrix}$$
Direct cell volume:
$$V = \sqrt{\det(G)} = abc \sqrt{1 - \cos^2\alpha - \cos^2\beta - \cos^2\gamma + 2\cos\alpha\cos\beta\cos\gamma}$$
The reciprocal metric tensor $G^* = G^{-1}$ provides interplanar spacings for Miller indices $(h, k, l)$:
$$\frac{1}{d^2_{hkl}} = \begin{pmatrix} h & k & l \end{pmatrix} G^* \begin{pmatrix} h \\ k \\ l \end{pmatrix}$$

### 2.3 Busing-Levy Orientation Matrix
The direct-to-Cartesian transformation matrix $M$ aligns the direct lattice vector $\mathbf{a}$ with the Cartesian $X$-axis, $\mathbf{b}$ in the $XY$-plane, and $\mathbf{c}$ along the $Z$-axis:
$$M = \begin{pmatrix} a & b\cos\gamma & c\cos\beta \\ 0 & b\sin\gamma & c\frac{\cos\alpha - \cos\beta\cos\gamma}{\sin\gamma} \\ 0 & 0 & \frac{V}{ab\sin\gamma} \end{pmatrix}$$

### 2.4 Cromer-Mann Atomic Scattering & Bragg Diffraction
For each atom $j$, the atomic form factor is computed via the 9-parameter Cromer-Mann fit:
$$f_j(s) = \left( \sum_{i=1}^4 a_i \exp\left(-b_i s^2\right) + c \right) \exp\left(-B_j s^2\right)$$
where $s = \frac{\sin\theta}{\lambda} = \frac{1}{2 d_{hkl}}$.
The kinematic structure factor:
$$F(hkl) = \sum_j \text{occ}_j \cdot f_j(s) \cdot \exp\left(2\pi i (h x_j + k y_j + l z_j)\right)$$
Integrated intensity with Lorentz-polarization factor:
$$I(hkl) = |F(hkl)|^2 \times M_{hkl} \times \frac{1 + \cos^2(2\theta)}{\sin^2\theta \cos\theta}$$

---

## 3. Implementation Details

### Backend
- `services/chemistry/app/models/crystallography_spacegroup.py`: Domain models for SpaceGroupMetadata, SpaceGroupDetails, SymmetryOperation, WyckoffSite, UnitCellParameters, MetricTensorResult, BraggDiffractionPeak, and PowderDiffractionPattern.
- `services/chemistry/app/services/crystallography_scattering.py`: Cromer-Mann 9-parameter analytical Gaussian fits for neutral atoms from $Z=1$ to $92$.
- `services/chemistry/app/services/crystallography_spacegroup_service.py`: 230 space-group registry, Jones-Faithful parser, Wyckoff orbit expander, metric tensor calculator, Cartesian converter, and powder XRD Bragg simulator.
- `services/chemistry/app/schemas/crystallography_spacegroup.py`: Pydantic v2 schemas validating space group queries, orbit requests, metric tensors, and XRD simulations.
- `services/chemistry/app/api/v1/endpoints/crystallography_spacegroup.py`: FastAPI endpoints mounted at `/api/v1/chemistry/crystallography/space-groups`.

### Frontend
- `src/types/crystallographySpaceGroup.ts`: TypeScript domain contracts and interfaces.
- `src/services/crystallographySpaceGroupService.ts`: Frontend client with offline analytical metric tensor, Wyckoff orbit, and Bragg powder XRD fallbacks.
- `src/services/crystallographySpaceGroupService.test.ts`: Vitest suite verifying presets, metric tensors, Cartesian transforms, and powder XRD synthesis.
- `src/components/chemistry/crystallography/SpaceGroupWyckoffWorkbench.tsx`: Comprehensive interactive workstation with 3D isometric unit cell canvas, Wyckoff positions table, symmetry operators browser, metric tensor calculator, and SVG powder XRD plot.
- `src/pages/MolecularExplorerPage.tsx`: Integrated top-level "Space Groups & Wyckoff" workstation tab.

---

## 4. Test Verification

- **Pytest**: 28 new tests in `test_crystallography_spacegroup.py` and `test_crystallography_spacegroup_api.py`.
- **Vitest**: 4 new tests in `crystallographySpaceGroupService.test.ts`. Total frontend tests: 223 passed across 41 test files.
- **Type Check**: `npx tsc --noEmit` passed with 0 errors.
- **Build**: `npm run build` completed successfully.
