"""
Pytest configuration and shared fixtures for Chemistry Engine tests.
"""
import pytest
from services.chemistry.app.main import chemistry_engine

@pytest.fixture
def engine():
    return chemistry_engine
