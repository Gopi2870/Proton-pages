"""
Unit tests for Organic Chemistry Reaction Mechanisms Service.
Tests curved-arrow models, transition state activation energies, and free energy interpolation.
"""

import pytest
from app.models.mechanisms import (
    MechanismClass,
    IntermediateType,
    StereochemicalOutcome,
    ArrowType,
    ReactionEnergyPoint,
)
from app.services.mechanism_service import MechanismService, ORGANIC_MECHANISMS


class TestMechanismService:
    def test_mechanisms_loading(self):
        mechanisms = MechanismService.get_mechanisms()
        assert len(mechanisms) >= 6
        sn2 = MechanismService.get_mechanism_by_id("sn2_bromoethane")
        assert sn2 is not None
        assert sn2.mechanism_class == MechanismClass.SN2
        assert sn2.stereochemical_outcome == StereochemicalOutcome.INVERSION

    def test_sn2_curved_arrows(self):
        sn2 = MechanismService.get_mechanism_by_id("sn2_bromoethane")
        assert len(sn2.steps) == 1
        step1 = sn2.steps[0]
        assert len(step1.curved_arrows) == 2
        # Nucleophilic attack + leaving group departure
        assert step1.curved_arrows[0].arrow_type == ArrowType.TWO_ELECTRON
        assert step1.curved_arrows[1].arrow_type == ArrowType.TWO_ELECTRON
        assert step1.activation_energy_kj_mol > 50.0

    def test_sn1_multi_step_intermediates(self):
        sn1 = MechanismService.get_mechanism_by_id("sn1_tertbutyl_chloride")
        assert sn1 is not None
        assert len(sn1.steps) == 3
        # Step 1: carbocation formation
        assert sn1.steps[0].intermediate_type == IntermediateType.CARBOCATION
        # Step 2: oxonium formation
        assert sn1.steps[1].intermediate_type == IntermediateType.OXONIUM
        # Step 3: neutral alcohol product
        assert sn1.steps[2].intermediate_type == IntermediateType.PRODUCT

    def test_eas_wheland_intermediate(self):
        eas = MechanismService.get_mechanism_by_id("eas_benzene_nitration")
        assert eas is not None
        assert eas.mechanism_class == MechanismClass.EAS
        assert eas.steps[0].intermediate_type == IntermediateType.ARENIUM_ION
        assert "Aromatic 6-pi sextet" in eas.steps[1].key_bonds_formed

    def test_energy_profile_interpolation(self):
        points = [
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants"),
            ReactionEnergyPoint(0.5, 80.0, "transition_state", "TS"),
            ReactionEnergyPoint(1.0, -40.0, "ground_state", "Products"),
        ]
        grid, curve = MechanismService.interpolate_reaction_coordinate(points, resolution=25)
        assert len(grid) == 25
        assert len(curve) == 25
        assert curve[0] == 0.0
        assert curve[-1] == -40.0
        # Peak around middle
        max_val = max(curve)
        assert pytest.approx(max_val, abs=5.0) == 80.0
