"""
Database Integration Tests: Models, Relationships, Constraints, and Rollback.
"""
import pytest
from datetime import datetime, timezone, timedelta
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

from services.chemistry.app.db.base import Base
from services.chemistry.app.db.models import User, UserSession, ChemicalBookmark, ExperimentRecord
from services.chemistry.app.core.security import hash_password, verify_password, hash_token

@pytest.fixture(scope="function")
def db_session():
    """Create a fresh in-memory SQLite database for each test."""
    test_engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(bind=test_engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=test_engine)

class TestDatabaseModels:
    def test_create_user_with_hashed_password(self, db_session):
        raw_password = "SecureScientificPassword123!"
        hashed = hash_password(raw_password)

        user = User(
            email="marie.curie@radium.ac.fr",
            username="mcurie",
            full_name="Marie Curie",
            hashed_password=hashed,
            role="researcher",
            institution="Sorbonne University",
            department="Physics and Chemistry"
        )
        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)

        assert user.id is not None
        assert user.email == "marie.curie@radium.ac.fr"
        # Verify plaintext password is NEVER stored
        assert user.hashed_password != raw_password
        assert user.hashed_password.startswith("pbkdf2_sha256$")
        # Verify cryptographic password verification
        assert verify_password(raw_password, user.hashed_password) is True
        assert verify_password("WrongPassword!", user.hashed_password) is False

    def test_unique_user_constraints(self, db_session):
        user1 = User(
            email="linus@caltech.edu",
            username="lpauling",
            full_name="Linus Pauling",
            hashed_password=hash_password("PaulingRule1")
        )
        db_session.add(user1)
        db_session.commit()

        # Duplicate email
        duplicate_email = User(
            email="linus@caltech.edu",
            username="linus2",
            full_name="Linus 2",
            hashed_password=hash_password("Pass123456")
        )
        db_session.add(duplicate_email)
        with pytest.raises(IntegrityError):
            db_session.commit()
        db_session.rollback()

        # Duplicate username
        duplicate_username = User(
            email="another@caltech.edu",
            username="lpauling",
            full_name="Another User",
            hashed_password=hash_password("Pass123456")
        )
        db_session.add(duplicate_username)
        with pytest.raises(IntegrityError):
            db_session.commit()
        db_session.rollback()

    def test_user_session_and_token_hash(self, db_session):
        user = User(
            email="feynman@caltech.edu",
            username="rfeynman",
            full_name="Richard Feynman",
            hashed_password=hash_password("QuantumElectrodynamics!")
        )
        db_session.add(user)
        db_session.commit()

        raw_token = "sess_secret_token_abc123xyz"
        token_digest = hash_token(raw_token)

        session = UserSession(
            user_id=user.id,
            token_hash=token_digest,
            ip_address="127.0.0.1",
            user_agent="Proton-Pages-Workbench/2.4",
            expires_at=datetime.now(timezone.utc) + timedelta(days=7)
        )
        db_session.add(session)
        db_session.commit()
        db_session.refresh(session)

        assert session.id is not None
        assert session.user.username == "rfeynman"
        assert session.token_hash == token_digest

    def test_chemical_bookmarks_and_unique_constraint(self, db_session):
        user = User(
            email="mendeleev@stpete.ru",
            username="dmendeleev",
            full_name="Dmitri Mendeleev",
            hashed_password=hash_password("PeriodicLaw1869")
        )
        db_session.add(user)
        db_session.commit()

        bookmark = ChemicalBookmark(
            user_id=user.id,
            item_type="element",
            item_identifier="Ga", # Gallium (Eka-aluminium)
            notes="Predicted properties match eka-aluminium perfectly."
        )
        db_session.add(bookmark)
        db_session.commit()

        # Attempt to add exact duplicate bookmark
        duplicate_bookmark = ChemicalBookmark(
            user_id=user.id,
            item_type="element",
            item_identifier="Ga"
        )
        db_session.add(duplicate_bookmark)
        with pytest.raises(IntegrityError):
            db_session.commit()
        db_session.rollback()

    def test_experiment_record_persistence(self, db_session):
        user = User(
            email="lavoisier@paris.fr",
            username="alavoisier",
            full_name="Antoine Lavoisier",
            hashed_password=hash_password("ConservationOfMass")
        )
        db_session.add(user)
        db_session.commit()

        experiment = ExperimentRecord(
            user_id=user.id,
            title="Combustion of Phosphorus in Enclosed Bell Jar",
            experiment_type="calorimetry",
            status="completed",
            state_data='{"temperature_initial": 293.15, "mass_initial_g": 10.0, "mass_final_g": 10.0}',
            observations="Total mass within closed system remained strictly conserved before and after combustion."
        )
        db_session.add(experiment)
        db_session.commit()
        db_session.refresh(experiment)

        assert experiment.id is not None
        assert experiment.user.username == "alavoisier"
        assert "conserved" in experiment.observations

    def test_cascade_delete_on_user(self, db_session):
        user = User(
            email="temporary@research.org",
            username="tempuser",
            full_name="Temporary User",
            hashed_password=hash_password("TempPassword123!")
        )
        db_session.add(user)
        db_session.commit()

        # Add session, bookmark, and experiment
        session = UserSession(
            user_id=user.id,
            token_hash="hash123",
            expires_at=datetime.now(timezone.utc) + timedelta(hours=1)
        )
        bookmark = ChemicalBookmark(
            user_id=user.id,
            item_type="compound",
            item_identifier="H2O"
        )
        experiment = ExperimentRecord(
            user_id=user.id,
            title="Trial Experiment",
            experiment_type="titration"
        )
        db_session.add_all([session, bookmark, experiment])
        db_session.commit()

        # Delete user
        db_session.delete(user)
        db_session.commit()

        # Verify child records were cascade-deleted
        sessions_remaining = db_session.scalars(select(UserSession).where(UserSession.user_id == user.id)).all()
        bookmarks_remaining = db_session.scalars(select(ChemicalBookmark).where(ChemicalBookmark.user_id == user.id)).all()
        experiments_remaining = db_session.scalars(select(ExperimentRecord).where(ExperimentRecord.user_id == user.id)).all()

        assert len(sessions_remaining) == 0
        assert len(bookmarks_remaining) == 0
        assert len(experiments_remaining) == 0
