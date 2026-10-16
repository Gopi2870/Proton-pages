"""
Security and Cryptographic Utilities.
Handles secure password hashing and token generation without exposing plaintext credentials.
"""
import hashlib
import os
import secrets

def hash_password(password: str) -> str:
    """
    Hash password using PBKDF2-HMAC-SHA256 with 100,000 iterations and a 16-byte random salt.
    Format: pbkdf2_sha256$iterations$salt_hex$hash_hex
    """
    salt = secrets.token_bytes(16)
    iterations = 100_000
    derived = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return f"pbkdf2_sha256${iterations}${salt.hex()}${derived.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a stored PBKDF2 hash using constant-time comparison.
    """
    try:
        parts = hashed_password.split("$")
        if len(parts) != 4 or parts[0] != "pbkdf2_sha256":
            return False
        iterations = int(parts[1])
        salt = bytes.fromhex(parts[2])
        expected_hash = bytes.fromhex(parts[3])

        candidate_hash = hashlib.pbkdf2_hmac(
            "sha256", plain_password.encode("utf-8"), salt, iterations
        )
        return secrets.compare_digest(candidate_hash, expected_hash)
    except Exception:
        return False

def hash_token(token: str) -> str:
    """
    Compute SHA-256 hash of a session token for secure database storage.
    """
    return hashlib.sha256(token.encode("utf-8")).hexdigest()
