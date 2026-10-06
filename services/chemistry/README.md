# Proton Pages — Chemistry Engine (Member 3)

The **Proton Pages Chemistry Engine** is a deterministic, high-performance scientific computing Python library built with Python 3.12, Pydantic V2, and Pytest.

It provides foundational chemistry intelligence for element dataset inspection, formula parsing/validation, molar mass calculation, percent composition, empirical formula calculation, chemical reaction parsing, mathematical equation balancing via matrix null-space solver over rational numbers ($\mathbb{Q}$), reaction type classification, stoichiometry calculation (limiting reactant, yields, molarity, dilution), and unified search.

---

## 🏛️ Architecture & Directory Structure

```
services/chemistry/
├── app/
│   ├── __init__.py
│   ├── main.py                  # Main Python Library Facade (ChemistryEngine)
│   ├── core/                    # System configurations, exceptions, constants, & unit conversions
│   │   ├── config.py
│   │   ├── exceptions.py
│   │   ├── constants.py
│   │   └── units.py
│   ├── models/                  # Domain dataclasses & Pydantic models
│   │   ├── element.py
│   │   ├── compound.py
│   │   ├── formula.py
│   │   ├── reaction.py
│   │   └── stoichiometry.py
│   ├── schemas/                 # Pydantic schemas & request/response types
│   ├── services/                # Deterministic scientific engines
│   │   ├── element_service.py   # 118 Elements lookup & multi-attribute filter engine
│   │   ├── compound_service.py  # Compound library & search service
│   │   ├── formula_parser.py    # Chemical formula Lexer + AST Parser
│   │   ├── formula_validator.py # Formula syntax & element verifier
│   │   ├── molecular_mass.py    # Exact molar mass calculator
│   │   ├── composition.py       # Percent composition & empirical formula solver
│   │   ├── reaction_parser.py   # Chemical equation lexer & species extractor
│   │   ├── equation_balancer.py # Rational null-space matrix solver (Fraction exact arithmetic)
│   │   ├── reaction_validator.py# Atom conservation validator & reaction classifier
│   │   ├── stoichiometry.py     # Limiting reactant, theoretical yield, molarity & dilution
│   │   └── chemistry_search.py  # Unified multi-domain search
│   └── data/                    # Validated JSON datasets
│       ├── elements/elements.json
│       ├── compounds/compounds.json
│       └── reactions/reactions.json
├── tests/                       # Comprehensive Pytest suite
│   ├── unit/                    # Unit tests for all services
│   ├── property/                # Invariant property tests (atom conservation, etc.)
│   └── integration/             # Integration tests for ChemistryEngine Python library
├── scripts/
│   └── validate_chemistry_data.py # Dataset integrity verification CLI script
└── README.md
```

---

## 💻 Python Library Code Example

```python
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.stoichiometry import ReactantAmountInput

# 1. Element Lookup
h = chemistry_engine.get_element("H")
print(h.name, h.atomic_mass)  # Hydrogen 1.008

# 2. Formula Mass & Composition
mass_res = chemistry_engine.calculate_molecular_mass("Ca(OH)2")
print(mass_res.molecular_mass)  # 74.092 g/mol

# 3. Chemical Equation Balancing
balanced = chemistry_engine.balance_reaction("CH4 + O2 -> CO2 + H2O")
print(balanced.balanced_equation)  # CH4 + 2O2 -> CO2 + 2H2O

# 4. Stoichiometric Limiting Reactant Calculation
inputs = [
    ReactantAmountInput(formula="H2", amount=4.0, unit="g"),
    ReactantAmountInput(formula="O2", amount=16.0, unit="g")
]
lim_result = chemistry_engine.calculate_limiting_reactant("2H2 + O2 -> 2H2O", inputs)
print(lim_result.limiting_reactant)  # O2
```

---

## 🚀 Running Verification & Tests

### Data Integrity Check
```bash
python services/chemistry/scripts/validate_chemistry_data.py
```

### Run Test Suite
```bash
python -m pytest services/chemistry/tests -v
```
