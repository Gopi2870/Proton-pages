# Proton Pages — Chemistry Engine Documentation

## System Overview
The Chemistry Engine serves as the scientific core of the Proton Pages workbench. It performs deterministic chemistry calculations, equation balancing, formula parsing, and stoichiometric yield analysis without reliance on non-deterministic external LLMs or floating-point approximations.

## API Specification

### Elements
- `GET /api/v1/chemistry/elements`: List or search elements.
- `GET /api/v1/chemistry/elements/{identifier}`: Fetch single element by atomic number (Z), symbol, or name.
- `GET /api/v1/chemistry/elements/group/{group}`: Filter elements by periodic table group (1-18).
- `GET /api/v1/chemistry/elements/period/{period}`: Filter elements by period (1-7).
- `GET /api/v1/chemistry/elements/category/{category}`: Filter elements by category classification.

### Compounds
- `GET /api/v1/chemistry/compounds`: List or search compounds.
- `GET /api/v1/chemistry/compounds/{identifier}`: Get compound by ID, formula, or name.

### Formulas
- `POST /api/v1/chemistry/formulas/parse`: Parse formula string into structured composition AST.
- `POST /api/v1/chemistry/formulas/mass`: Calculate total molar mass in g/mol and elemental contributions.
- `POST /api/v1/chemistry/formulas/composition`: Calculate elemental percent composition.
- `POST /api/v1/chemistry/formulas/empirical`: Derive empirical formula from elemental ratios.

### Reactions
- `POST /api/v1/chemistry/reactions/parse`: Parse chemical equation into species, state symbols, and coefficients.
- `POST /api/v1/chemistry/reactions/balance`: Balance equation using exact matrix null-space solver.
- `POST /api/v1/chemistry/reactions/validate`: Verify atom conservation between left and right sides.
- `POST /api/v1/chemistry/reactions/classify`: Classify reaction type (synthesis, combustion, acid-base, etc.).

### Stoichiometry
- `POST /api/v1/chemistry/stoichiometry/limiting-reactant`: Compute limiting reactant, excess remaining, and theoretical yields.
- `POST /api/v1/chemistry/stoichiometry/yield`: Calculate theoretical yield for a target product.
- `POST /api/v1/chemistry/stoichiometry/percent-yield`: Calculate percent yield from actual vs theoretical yield.
- `POST /api/v1/chemistry/stoichiometry/molarity`: Solve molarity, moles, or volume.
- `POST /api/v1/chemistry/stoichiometry/dilution`: Solve $M_1 V_1 = M_2 V_2$.
- `POST /api/v1/chemistry/stoichiometry/convert-units`: Convert chemistry mass, volume, amount, or concentration units.

### Search
- `GET /api/v1/chemistry/search`: Unified multi-domain search.
