# Proton Pages — Chemistry Engine (Member 3)

The **Proton Pages Chemistry Engine** is a deterministic, high-performance scientific computing microservice built with Python 3.12, FastAPI, Pydantic V2, and Pytest.

It provides foundational chemistry intelligence for element dataset inspection, formula parsing/validation, molar mass engine, percent composition, empirical formula calculation, chemical reaction parsing, mathematical equation balancing via matrix null-space solver over rational numbers ($\mathbb{Q}$), reaction type classification, stoichiometry calculation (limiting reactant, yields, molarity, dilution), and unified search.

---

## 🏛️ Architecture & Directory Structure

```
services/chemistry/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI application entry point & exception handlers
│   ├── api/                     # REST API routers
│   │   ├── elements.py          # GET /api/v1/chemistry/elements
│   │   ├── compounds.py         # GET /api/v1/chemistry/compounds
│   │   ├── formulas.py          # POST /api/v1/chemistry/formulas/*
│   │   ├── reactions.py         # POST /api/v1/chemistry/reactions/*
│   │   ├── stoichiometry.py     # POST /api/v1/chemistry/stoichiometry/*
│   │   └── search.py            # GET /api/v1/chemistry/search
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
│   ├── schemas/                 # OpenAPI Pydantic request/response schemas
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
│   └── integration/             # FastAPI HTTP TestClient integration tests
├── scripts/
│   └── validate_chemistry_data.py # Dataset integrity verification CLI script
└── README.md
```

---

## ⚡ Core Engines & Algorithms

### 1. Element Database (118 Elements)
- Complete dataset covering all 118 IUPAC chemical elements.
- Attributes: `atomic_number`, `symbol`, `name`, `atomic_mass`, `group`, `period`, `block`, `category`, `state_at_room_temperature`, `electron_configuration`, `electronegativity`, `density`, `melting_point`, `boiling_point`, `oxidation_states`, `valence_electrons`, `discovery_year`, `discoverer`, `common_uses`.
- Lookup by Z, case-insensitive symbol ("h", "H", "fe", "Fe"), or English name.

### 2. Formula Lexer & AST Parser
- Tokenizer + Recursive Descent Parser architecture.
- Handles nested groups `(OH)2`, `[Fe(CN)6]4-`, hydrates `CuSO4.5H2O`, charges `Fe+3`, `SO4-2`.
- Validates element existence against Element Database.
- Rejects malformed formulas (`Xx2`, `H0`, `C-2`, `()`, `Ca(`, `2H`, `NaCl)`).

### 3. Molecular Mass & Percent Composition
- Molar mass calculated by summing atomic weights.
- Elemental contributions with mass percentage breakdown.
- Empirical formula solver from mass percentages or elemental masses using continued fraction multipliers.

### 4. Mathematical Equation Balancer
- Builds stoichiometric matrix $M \in \mathbb{Q}^{E \times S}$ (elements $\times$ species).
- Solves null-space equation $M \cdot c = 0$ using Gaussian elimination over exact rational numbers (`fractions.Fraction`) to prevent floating point instability.
- Converts to minimal positive integer coefficient vector $c \in \mathbb{Z}^+$.

### 5. Stoichiometry Engine
- Limiting reactant determination with step-by-step calculation breakdown.
- Theoretical yield and percent yield calculation.
- Solution molarity solver and dilution calculator ($M_1 V_1 = M_2 V_2$).

---

## 🚀 Running the Service & Tests

### Data Integrity Check
```bash
python services/chemistry/scripts/validate_chemistry_data.py
```

### Run Test Suite (85 Tests, 100% Pass)
```bash
python -m pytest services/chemistry/tests -v
```

### Run Dev Server
```bash
uvicorn services.chemistry.app.main:app --reload --port 8000
```
Interactive OpenAPI documentation will be accessible at: [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🤝 Integration Contracts for Other Team Members

- **Member 2 (Frontend UI)**: Consume OpenAPI JSON schemas from `/api/v1/chemistry/*`.
- **Member 4 (Molecular Visualizer)**: Consume parsed formula composition and element properties.
- **Member 5 (Virtual Laboratory)**: Invoke stoichiometric calculations and reaction balancing APIs for lab simulation models.
- **Member 6 (AI Chemistry Co-Pilot)**: Query deterministic chemistry endpoints for ground-truth calculation backings.
