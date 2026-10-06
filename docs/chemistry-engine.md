# Proton Pages — Chemistry Engine Documentation

## System Overview
The Chemistry Engine serves as the scientific core of the Proton Pages workbench. It performs deterministic chemistry calculations, equation balancing, formula parsing, and stoichiometric yield analysis as a pure Python scientific computing library.

## Python API Specification (`ChemistryEngine`)

### Elements
- `chemistry_engine.get_element(identifier)`: Fetch single element by atomic number (Z), symbol, or name.
- `chemistry_engine.list_elements(skip, limit)`: List all chemical elements.
- `chemistry_engine.search_elements(query)`: Search elements by query string.

### Compounds
- `chemistry_engine.get_compound(identifier)`: Get compound by ID, formula, or name.
- `chemistry_engine.search_compounds(query)`: Search compounds.

### Formulas
- `chemistry_engine.parse_formula(formula)`: Parse formula string into structured composition AST.
- `chemistry_engine.calculate_molecular_mass(formula)`: Calculate total molar mass in g/mol and elemental contributions.
- `chemistry_engine.calculate_percent_composition(formula)`: Calculate elemental percent composition.
- `chemistry_engine.calculate_empirical_formula(elemental_data)`: Derive empirical formula from elemental ratios.

### Reactions
- `chemistry_engine.parse_reaction(equation)`: Parse chemical equation into species, state symbols, and coefficients.
- `chemistry_engine.balance_reaction(equation)`: Balance equation using exact matrix null-space solver.
- `chemistry_engine.validate_reaction(equation)`: Verify atom conservation between left and right sides.
- `chemistry_engine.classify_reaction(equation)`: Classify reaction type (synthesis, combustion, acid-base, etc.).

### Stoichiometry
- `chemistry_engine.calculate_limiting_reactant(equation, reactants)`: Compute limiting reactant, excess remaining, and theoretical yields.
- `chemistry_engine.calculate_theoretical_yield(equation, reactants, target_product)`: Calculate theoretical yield for a target product.
- `chemistry_engine.calculate_percent_yield(actual, theoretical)`: Calculate percent yield from actual vs theoretical yield.
- `chemistry_engine.calculate_molarity(moles, volume_liters)`: Solve molarity, moles, or volume.
- `chemistry_engine.calculate_dilution(m1, v1, m2, v2)`: Solve $M_1 V_1 = M_2 V_2$.

### Search
- `chemistry_engine.search(query)`: Unified multi-domain search.
