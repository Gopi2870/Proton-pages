"""
Chemical Reactions and Equation Balancer Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.reaction import (
    ParsedReaction, BalancedReaction, ReactionValidationResult, ReactionClassificationResult
)
from services.chemistry.app.schemas.reaction import (
    ReactionParseRequest, ReactionBalanceRequest, ReactionValidateRequest, ReactionClassifyRequest
)
from services.chemistry.app.core.exceptions import InvalidReactionError, UnbalancedReactionError

router = APIRouter(prefix="/reactions", tags=["Chemical Reactions"])

@router.post("/parse", response_model=ParsedReaction, summary="Parse Reaction Equation")
def parse_reaction(req: ReactionParseRequest):
    """
    Parse a chemical equation into structured reactants, products, phase states, and coefficients.
    """
    try:
        return chemistry_engine.parse_reaction(req.equation)
    except InvalidReactionError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/balance", response_model=BalancedReaction, summary="Balance Chemical Reaction")
def balance_reaction(req: ReactionBalanceRequest):
    """
    Balance a chemical reaction using exact matrix null-space Gaussian elimination.
    """
    try:
        return chemistry_engine.balance_reaction(req.equation)
    except (InvalidReactionError, UnbalancedReactionError) as e:
        raise HTTPException(status_code=422, detail={"code": getattr(e, "code", "BALANCE_ERROR"), "message": str(e)})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/validate", response_model=ReactionValidationResult, summary="Validate Reaction Conservation")
def validate_reaction(req: ReactionValidateRequest):
    """
    Verify mass, charge, and atom conservation across reactants and products.
    """
    try:
        return chemistry_engine.validate_reaction(req.equation)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@router.post("/classify", response_model=ReactionClassificationResult, summary="Classify Reaction Type")
def classify_reaction(req: ReactionClassifyRequest):
    """
    Classify reaction mechanism (synthesis, decomposition, single/double replacement, combustion, acid-base, redox).
    """
    try:
        return chemistry_engine.classify_reaction(req.equation)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
