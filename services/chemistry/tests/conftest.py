"""
Pytest configuration and shared fixtures for Chemistry Engine tests.
"""
import pytest
from fastapi.testclient import TestClient
from services.chemistry.app.main import app

@pytest.fixture
def api_client():
    return TestClient(app)
