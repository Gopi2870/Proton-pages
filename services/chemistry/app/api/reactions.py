"""
Reaction API Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.schemas.reaction import (
    ReactionParseRequest, ReactionBalanceRequest, ReactionValidateRequest, ReactionClassifyRequest
)
from services.chemistry.app.models.reaction import (
    ParsedReaction, BalancedReaction, ReactionValidationResult, ReactionClassificationResult
)
from services.chemistry.app.services.reaction_parser import reaction_parser
from services.chemistry.app.services.equation_balancer import equation_balancer
from services.chemistry.app.services.reaction_validator import reaction_validator
from services.chemistry.app.core.exceptions import InvalidReactionError, UnsupportedChemistryOperationError

router = APIRouter(prefix="/reactions", tags=["Reactions"])


@router.post("/parse", response_model=ParsedReaction, summary="Parse chemical reaction equation string")
def parse_reaction(payload: ReactionParseRequest):
    try:
        return reaction_parser.parse(payload.equation)
    except InvalidReactionError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/balance", response_model=BalancedReaction, summary="Balance chemical equation")
def balance_reaction(payload: ReactionBalanceRequest):
    try:
        return equation_balancer.balance(payload.equation)
    except (InvalidReactionError, UnsupportedChemistryOperationError) as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/validate", response_model=ReactionValidationResult, summary="Validate chemical reaction balance")
def validate_reaction(payload: ReactionValidateRequest):
    return reaction_validator.validate_reaction(payload.equation)


@router.post("/classify", response_model=ReactionClassificationResult, summary="Classify chemical reaction type")
def classify_reaction(payload: ReactionClassifyRequest):
    try:
        return reaction_validator.classify_reaction(payload.equation)
    except InvalidReactionError as e:
        raise HTTPException(status_code=400, detail=e.message)
