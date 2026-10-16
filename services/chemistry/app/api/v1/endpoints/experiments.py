"""
Virtual Lab Experiment Records and Laboratory History Endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from services.chemistry.app.db.session import get_db
from services.chemistry.app.db.models.user import User
from services.chemistry.app.db.models.experiment import ExperimentRecord
from services.chemistry.app.schemas.experiment import (
    ExperimentCreate,
    ExperimentUpdate,
    ExperimentResponse,
)
from services.chemistry.app.core.dependencies import get_current_user_or_guest

router = APIRouter(prefix="/experiments", tags=["Virtual Laboratory Notebook"])

@router.get("", response_model=List[ExperimentResponse])
def list_experiments(
    experiment_type: Optional[str] = Query(None, description="Filter by type: mixer, titration, calorimetry, etc."),
    status_filter: Optional[str] = Query(None, alias="status", description="draft, in_progress, completed"),
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Retrieve virtual lab experiment history and notebook entries."""
    query = db.query(ExperimentRecord).filter(ExperimentRecord.user_id == user.id)
    if experiment_type:
        query = query.filter(ExperimentRecord.experiment_type == experiment_type.lower())
    if status_filter:
        query = query.filter(ExperimentRecord.status == status_filter.lower())
    
    experiments = query.order_by(ExperimentRecord.created_at.desc()).all()
    return [ExperimentResponse.model_validate(e) for e in experiments]

@router.post("", response_model=ExperimentResponse, status_code=status.HTTP_201_CREATED)
def record_experiment(
    payload: ExperimentCreate,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Save an experiment trial or chemical mixer simulation to the notebook."""
    experiment = ExperimentRecord(
        user_id=user.id,
        title=payload.title,
        experiment_type=payload.experiment_type.lower(),
        status=payload.status.lower(),
        state_data=payload.state_data,
        observations=payload.observations,
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    return ExperimentResponse.model_validate(experiment)

@router.get("/{experiment_id}", response_model=ExperimentResponse)
def get_experiment(
    experiment_id: str,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Fetch details of a single virtual experiment."""
    experiment = db.query(ExperimentRecord).filter(
        ExperimentRecord.id == experiment_id,
        ExperimentRecord.user_id == user.id
    ).first()

    if not experiment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Experiment record '{experiment_id}' not found."
        )
    return ExperimentResponse.model_validate(experiment)

@router.patch("/{experiment_id}", response_model=ExperimentResponse)
def update_experiment(
    experiment_id: str,
    payload: ExperimentUpdate,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Update title, observations, or apparatus state for an experiment."""
    experiment = db.query(ExperimentRecord).filter(
        ExperimentRecord.id == experiment_id,
        ExperimentRecord.user_id == user.id
    ).first()

    if not experiment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Experiment record '{experiment_id}' not found."
        )

    if payload.title is not None:
        experiment.title = payload.title
    if payload.status is not None:
        experiment.status = payload.status.lower()
    if payload.state_data is not None:
        experiment.state_data = payload.state_data
    if payload.observations is not None:
        experiment.observations = payload.observations

    db.commit()
    db.refresh(experiment)
    return ExperimentResponse.model_validate(experiment)

@router.delete("/{experiment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_experiment(
    experiment_id: str,
    user: User = Depends(get_current_user_or_guest),
    db: Session = Depends(get_db)
):
    """Delete an experiment record."""
    deleted_count = db.query(ExperimentRecord).filter(
        ExperimentRecord.id == experiment_id,
        ExperimentRecord.user_id == user.id
    ).delete()

    if not deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Experiment record '{experiment_id}' not found."
        )
    db.commit()
    return None
