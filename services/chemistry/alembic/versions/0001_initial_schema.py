"""initial schema for users, sessions, bookmarks, and experiment records

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-10-15 12:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "0001_initial_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Users table
    op.create_table(
        "users",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("full_name", sa.String(length=128), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=32), server_default="student", nullable=False),
        sa.Column("institution", sa.String(length=128), nullable=True),
        sa.Column("department", sa.String(length=128), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id", name="pk_users")
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_username", "users", ["username"], unique=True)

    # User Sessions table
    op.create_table(
        "user_sessions",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("token_hash", sa.String(length=64), nullable=False),
        sa.Column("ip_address", sa.String(length=45), nullable=True),
        sa.Column("user_agent", sa.String(length=255), nullable=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_user_sessions_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id", name="pk_user_sessions")
    )
    op.create_index("ix_user_sessions_token_hash", "user_sessions", ["token_hash"])
    op.create_index("ix_user_sessions_lookup", "user_sessions", ["user_id", "token_hash"])

    # Chemical Bookmarks table
    op.create_table(
        "chemical_bookmarks",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("item_type", sa.String(length=32), nullable=False),
        sa.Column("item_identifier", sa.String(length=128), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("metadata_json", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_chemical_bookmarks_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id", name="pk_chemical_bookmarks"),
        sa.UniqueConstraint("user_id", "item_type", "item_identifier", name="uq_user_bookmark_item")
    )
    op.create_index("ix_chemical_bookmarks_item_identifier", "chemical_bookmarks", ["item_identifier"])
    op.create_index("ix_user_bookmarks_by_type", "chemical_bookmarks", ["user_id", "item_type"])

    # Experiment Records table
    op.create_table(
        "experiment_records",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("experiment_type", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=32), server_default="draft", nullable=False),
        sa.Column("state_data", sa.Text(), nullable=True),
        sa.Column("observations", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_experiment_records_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id", name="pk_experiment_records")
    )
    op.create_index("ix_experiments_user_type", "experiment_records", ["user_id", "experiment_type"])
    op.create_index("ix_experiments_created_at", "experiment_records", ["created_at"])

def downgrade() -> None:
    op.drop_table("experiment_records")
    op.drop_table("chemical_bookmarks")
    op.drop_table("user_sessions")
    op.drop_table("users")
