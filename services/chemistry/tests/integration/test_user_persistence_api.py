"""
Integration Tests for Authentication, Bookmarks, and Virtual Lab Experiments API.
"""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from starlette.testclient import TestClient

from services.chemistry.app.db.base import Base
from services.chemistry.app.db.session import get_db
from services.chemistry.app.server import app

# Create in-memory SQLite database with StaticPool so all connections share the same memory instance
test_engine = create_engine(
    "sqlite:///:memory:",
    echo=False,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

@pytest.fixture(autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=test_engine)
    
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield
    Base.metadata.drop_all(bind=test_engine)
    app.dependency_overrides.clear()

@pytest.fixture
def client():
    return TestClient(app)

class TestAuthAPI:
    def test_register_and_profile_flow(self, client):
        payload = {
            "email": "linus.pauling@caltech.edu",
            "username": "lpauling",
            "full_name": "Linus Pauling",
            "password": "MolecularBonding456!",
            "role": "researcher",
            "institution": "California Institute of Technology",
            "department": "Chemistry and Chemical Engineering"
        }
        res = client.post("/api/v1/auth/register", json=payload)
        assert res.status_code == 201
        data = res.json()
        assert "access_token" in data
        assert data["user"]["email"] == "linus.pauling@caltech.edu"
        token = data["access_token"]

        # Access profile using token
        me_res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert me_res.status_code == 200
        me_data = me_res.json()
        assert me_data["username"] == "lpauling"
        assert me_data["role"] == "researcher"

    def test_duplicate_email_conflict(self, client):
        payload = {
            "email": "curie@sorbonne.fr",
            "username": "mcurie",
            "full_name": "Marie Curie",
            "password": "Radioactivity123!"
        }
        res1 = client.post("/api/v1/auth/register", json=payload)
        assert res1.status_code == 201

        # Duplicate email
        res2 = client.post("/api/v1/auth/register", json=payload)
        assert res2.status_code == 409

    def test_login_invalid_password(self, client):
        reg_payload = {
            "email": "mendel@brno.org",
            "username": "gmendel",
            "full_name": "Gregor Mendel",
            "password": "GeneticsLaw789!"
        }
        client.post("/api/v1/auth/register", json=reg_payload)

        login_res = client.post("/api/v1/auth/login", json={
            "email_or_username": "gmendel",
            "password": "WrongPassword!"
        })
        assert login_res.status_code == 401

class TestBookmarksAPI:
    def test_bookmark_lifecycle(self, client):
        # 1. Register a user
        reg = client.post("/api/v1/auth/register", json={
            "email": "student@proton.org",
            "username": "pro_student",
            "full_name": "Proton Student",
            "password": "TestPassword123!"
        })
        token = reg.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Add an element bookmark
        bm1 = client.post("/api/v1/bookmarks", json={
            "item_type": "element",
            "item_identifier": "Fe",
            "notes": "Transition metal with multiple oxidation states (+2, +3)."
        }, headers=headers)
        assert bm1.status_code == 201
        bm1_id = bm1.json()["id"]

        # 3. Add a compound bookmark
        bm2 = client.post("/api/v1/bookmarks", json={
            "item_type": "compound",
            "item_identifier": "H2SO4",
            "notes": "Sulfuric acid diprotic titration analyte."
        }, headers=headers)
        assert bm2.status_code == 201

        # 4. List bookmarks
        list_res = client.get("/api/v1/bookmarks", headers=headers)
        assert list_res.status_code == 200
        items = list_res.json()
        assert len(items) == 2

        # Filter by type
        filter_res = client.get("/api/v1/bookmarks?item_type=element", headers=headers)
        assert len(filter_res.json()) == 1
        assert filter_res.json()[0]["item_identifier"] == "Fe"

        # 5. Delete by ID
        del_res = client.delete(f"/api/v1/bookmarks/{bm1_id}", headers=headers)
        assert del_res.status_code == 204

        # 6. Delete by item
        del_item_res = client.delete("/api/v1/bookmarks/by-item/compound/H2SO4", headers=headers)
        assert del_item_res.status_code == 204

        # Verify empty
        empty_res = client.get("/api/v1/bookmarks", headers=headers)
        assert len(empty_res.json()) == 0

class TestVirtualLabExperimentsAPI:
    def test_experiment_recording_and_updates(self, client):
        # 1. Register researcher
        reg = client.post("/api/v1/auth/register", json={
            "email": "chemist@lab.org",
            "username": "lab_chemist",
            "full_name": "Virtual Lab Chemist",
            "password": "ChemistSecret456!"
        })
        token = reg.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Record chemical mixer experiment
        exp_payload = {
            "title": "Aqueous Neutralization of HCl and NaOH",
            "experiment_type": "mixer",
            "status": "completed",
            "state_data": '{"vessels": [{"formula": "HCl", "volume": 50, "molarity": 1.0}, {"formula": "NaOH", "volume": 50, "molarity": 1.0}], "final_ph": 7.0, "delta_temp": 6.7}',
            "observations": "Clear solution, neutral litmus indicator (pH 7.0), significant enthalpy release."
        }
        create_res = client.post("/api/v1/experiments", json=exp_payload, headers=headers)
        assert create_res.status_code == 201
        exp_data = create_res.json()
        exp_id = exp_data["id"]
        assert exp_data["title"] == "Aqueous Neutralization of HCl and NaOH"
        assert exp_data["status"] == "completed"

        # 3. Retrieve experiment details
        get_res = client.get(f"/api/v1/experiments/{exp_id}", headers=headers)
        assert get_res.status_code == 200
        assert get_res.json()["experiment_type"] == "mixer"

        # 4. Update observations
        patch_res = client.patch(f"/api/v1/experiments/{exp_id}", json={
            "observations": "Updated: Solution cooled down to room temperature after 15 minutes."
        }, headers=headers)
        assert patch_res.status_code == 200
        assert "Updated:" in patch_res.json()["observations"]

        # 5. List experiments
        list_res = client.get("/api/v1/experiments?experiment_type=mixer", headers=headers)
        assert list_res.status_code == 200
        assert len(list_res.json()) == 1

        # 6. Delete experiment
        del_res = client.delete(f"/api/v1/experiments/{exp_id}", headers=headers)
        assert del_res.status_code == 204

        # Verify not found
        get_deleted = client.get(f"/api/v1/experiments/{exp_id}", headers=headers)
        assert get_deleted.status_code == 404
