# Proton Pages — Local Development & Environment Setup Guide

## System Overview
Proton Pages is organized as a modular monorepo consisting of:
1. **Frontend**: React 18, TypeScript, Vite, Tailwind CSS (port `5173`).
2. **Backend Gateway**: FastAPI, Pydantic, Python 3.12+ (port `8000`).
3. **Scientific Core Library**: `ChemistryEngine` deterministic calculation facade.
4. **Persistence Layer**: PostgreSQL 16, SQLAlchemy 2.x, Alembic migrations (port `5432`).

---

## 1. Quickstart with Docker Compose (Recommended)

### Prerequisites
- Docker Engine $\ge 24.0$ and Docker Compose v2.

### Starting the Platform
```bash
# 1. Clone & copy environment configuration
cp .env.example .env

# 2. Build and start all services in background
docker compose up --build -d

# 3. View service status & health probes
docker compose ps
```

Services will become available at:
- Frontend UI: `http://localhost:5173`
- Backend API & Interactive OpenAPI Docs: `http://localhost:8000/docs`
- Health Probe: `http://localhost:8000/health`
- PostgreSQL: `localhost:5432`

### Stopping Services
```bash
docker compose down
# To remove volume data:
# docker compose down -v
```

---

## 2. Local Manual Development (Without Docker)

### Frontend
```bash
# Install dependencies
npm ci

# Start Vite dev server
npm run dev

# Run Vitest test suite
npm test

# Run TypeScript type check and production bundle
npm run build
```

### Backend & Chemistry Gateway
```bash
# Ensure Python 3.12+ is active
pip install -e services/chemistry
# or install dependencies directly:
pip install "pydantic>=2.0.0" "fastapi>=0.110.0" "uvicorn[standard]>=0.28.0" "sqlalchemy>=2.0.0" "alembic>=1.13.0" "psycopg2-binary>=2.9.0" pytest pytest-cov httpx

# Run database migrations (or use SQLite by setting DATABASE_URL=sqlite:///local.db)
python -m alembic -c services/chemistry/alembic.ini upgrade head

# Start FastAPI server with live reload
uvicorn services.chemistry.app.server:app --host 0.0.0.0 --port 8000 --reload
```

---

## 3. Database Migrations (Alembic)

```bash
# Apply all pending migrations to head
python -m alembic -c services/chemistry/alembic.ini upgrade head

# View pending migration SQL without executing
python -m alembic -c services/chemistry/alembic.ini upgrade head --sql

# Revert last migration
python -m alembic -c services/chemistry/alembic.ini downgrade -1

# Generate new migration after editing SQLAlchemy models
python -m alembic -c services/chemistry/alembic.ini revision --autogenerate -m "describe_changes"
```

---

## 4. Test Execution & Quality Gates

### Running All Python Unit, Property, and API Tests
```bash
python -m pytest services/chemistry/tests --cov=services.chemistry.app --cov-report=term-missing
```

### Running Frontend Tests
```bash
npm test
```

### Measuring Codebase Lines of Code (LOC)
```bash
python scripts/count_loc.py
```

---

## 5. Troubleshooting & FAQ

- **Database connection error on startup**:
  Ensure PostgreSQL is running and healthy. With Docker Compose, `depends_on` waits for `pg_isready` before launching the backend.
- **ModuleNotFoundError: No module named 'services'**:
  Set `PYTHONPATH=.` or ensure `pythonpath = [".", "../.."]` is configured in `pyproject.toml`.
- **Port conflicts (5173, 8000, 5432)**:
  Configure `FASTAPI_PORT` or `PORT` in your `.env` file.
