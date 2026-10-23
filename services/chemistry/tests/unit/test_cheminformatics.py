"""
Unit Tests for Cheminformatics Service.
Verifies molecular graph topological perception, Morgan circular fingerprints (ECFP),
chemical similarity coefficients (Tanimoto, Dice, Cosine, Tversky),
and subgraph isomorphism substructure matching.
"""
import pytest
from services.chemistry.app.models.cheminformatics import (
    AtomNode,
    BondEdge,
    MolecularGraph,
    SimilarityMetric,
)
from services.chemistry.app.services.cheminformatics_service import (
    CheminformaticsService,
    cheminformatics_service,
)


@pytest.fixture
def service() -> CheminformaticsService:
    return cheminformatics_service


def test_library_initialization(service: CheminformaticsService):
    """Verifies that the curated reference library is initialized with standard molecules."""
    library = service.get_library()
    assert len(library) >= 10

    aspirin = service.get_molecule_by_id("aspirin")
    assert aspirin is not None
    assert aspirin.formula == "C9H8O4"
    assert len(aspirin.atoms) == 13
    assert len(aspirin.bonds) == 13

    benzene = service.get_molecule_by_id("benzene")
    assert benzene is not None
    assert benzene.formula == "C6H6"


def test_fragments_initialization(service: CheminformaticsService):
    """Verifies that curated functional group fragments are available."""
    fragments = service.get_fragments()
    assert len(fragments) >= 6

    cooh = service.get_fragment_by_id("frag_carboxylic_acid")
    assert cooh is not None
    assert len(cooh.atoms) == 3

    benzene_frag = service.get_fragment_by_id("frag_benzene")
    assert benzene_frag is not None
    assert len(benzene_frag.atoms) == 6


def test_graph_perception_rings_and_aromaticity(service: CheminformaticsService):
    """Verifies ring detection, cycle perception, and Hückel aromaticity labeling."""
    benzene = service.get_molecule_by_id("benzene")
    assert benzene is not None
    perceived = service.perceive_graph_properties(benzene)

    for atom in perceived.atoms:
        assert atom.in_ring is True
        assert 6 in atom.ring_sizes
        assert atom.aromatic is True
        assert atom.hybridization == "sp2"


def test_morgan_fingerprint_generation(service: CheminformaticsService):
    """Tests generation of Morgan circular fingerprints (ECFP equivalent)."""
    aspirin = service.get_molecule_by_id("aspirin")
    assert aspirin is not None

    # Radius 0 (ECFP0)
    fp0 = service.generate_morgan_fingerprint(aspirin, radius=0, n_bits=1024)
    assert len(fp0.active_bits) > 0
    assert fp0.radius == 0
    assert fp0.n_bits == 1024

    # Radius 2 (ECFP4)
    fp2 = service.generate_morgan_fingerprint(aspirin, radius=2, n_bits=1024)
    assert len(fp2.active_bits) >= len(fp0.active_bits)
    assert len(fp2.environments) > len(fp0.environments)
    assert fp2.density > 0.0
    assert len(fp2.bit_hex) == 256  # 1024 bits / 4 bits per hex char = 256 chars


def test_fingerprint_determinism(service: CheminformaticsService):
    """Verifies that generating fingerprints on identical graphs produces identical active bits."""
    caffeine = service.get_molecule_by_id("caffeine")
    assert caffeine is not None

    fp_run1 = service.generate_morgan_fingerprint(caffeine, radius=2, n_bits=512)
    fp_run2 = service.generate_morgan_fingerprint(caffeine, radius=2, n_bits=512)

    assert fp_run1.active_bits == fp_run2.active_bits
    assert fp_run1.bit_hex == fp_run2.bit_hex


def test_self_similarity_and_symmetry(service: CheminformaticsService):
    """Verifies self-similarity equals 1.0 and pairwise similarity is symmetric."""
    dopamine = service.get_molecule_by_id("dopamine")
    paracetamol = service.get_molecule_by_id("paracetamol")
    assert dopamine is not None and paracetamol is not None

    fp_dopamine = service.generate_morgan_fingerprint(dopamine, radius=2, n_bits=1024)
    fp_paracetamol = service.generate_morgan_fingerprint(paracetamol, radius=2, n_bits=1024)

    # Self-similarity
    sim_self = service.calculate_similarity(fp_dopamine, fp_dopamine)
    assert sim_self.tanimoto == 1.0
    assert sim_self.dice == 1.0
    assert sim_self.cosine == 1.0
    assert sim_self.tversky == 1.0
    assert len(sim_self.bits_a_only) == 0
    assert len(sim_self.bits_b_only) == 0
    assert sim_self.euclidean_distance == 0.0

    # Cross-similarity symmetry
    sim_ab = service.calculate_similarity(fp_dopamine, fp_paracetamol)
    sim_ba = service.calculate_similarity(fp_paracetamol, fp_dopamine)

    assert sim_ab.tanimoto == sim_ba.tanimoto
    assert sim_ab.dice == sim_ba.dice
    assert sim_ab.cosine == sim_ba.cosine
    assert 0.0 < sim_ab.tanimoto < 1.0


def test_substructure_matching_carboxylic_acid(service: CheminformaticsService):
    """Verifies that -COOH fragment matches Aspirin and Benzoic acid, but NOT Benzene or Phenol."""
    cooh = service.get_fragment_by_id("frag_carboxylic_acid")
    aspirin = service.get_molecule_by_id("aspirin")
    benzoic = service.get_molecule_by_id("benzoic_acid")
    benzene = service.get_molecule_by_id("benzene")
    phenol = service.get_molecule_by_id("phenol")

    assert cooh is not None and aspirin is not None and benzoic is not None

    # Aspirin has -COOH
    match_aspirin = service.match_substructure(aspirin, cooh)
    assert match_aspirin.matched is True
    assert len(match_aspirin.matched_target_atoms) >= 3

    # Benzoic acid has -COOH
    match_benzoic = service.match_substructure(benzoic, cooh)
    assert match_benzoic.matched is True
    assert len(match_benzoic.matched_target_atoms) >= 3

    # Benzene does NOT have -COOH
    assert benzene is not None
    match_benzene = service.match_substructure(benzene, cooh)
    assert match_benzene.matched is False

    # Phenol does NOT have -COOH
    assert phenol is not None
    match_phenol = service.match_substructure(phenol, cooh)
    assert match_phenol.matched is False


def test_substructure_matching_benzene_ring(service: CheminformaticsService):
    """Verifies that the aromatic benzene fragment matches aromatic molecules."""
    benzene_frag = service.get_fragment_by_id("frag_benzene")
    assert benzene_frag is not None

    for mol_id in ["benzene", "aspirin", "paracetamol", "dopamine", "phenol", "benzoic_acid", "ibuprofen"]:
        target = service.get_molecule_by_id(mol_id)
        assert target is not None
        match = service.match_substructure(target, benzene_frag)
        assert match.matched is True, f"Failed to match benzene ring in {mol_id}"
        assert len(match.matched_target_atoms) >= 6


def test_substructure_matching_catechol(service: CheminformaticsService):
    """Verifies that catechol (ortho-dihydroxybenzene) matches Dopamine but not Phenol."""
    catechol = service.get_fragment_by_id("frag_catechol")
    dopamine = service.get_molecule_by_id("dopamine")
    phenol = service.get_molecule_by_id("phenol")

    assert catechol is not None and dopamine is not None and phenol is not None

    match_dopamine = service.match_substructure(dopamine, catechol)
    assert match_dopamine.matched is True

    match_phenol = service.match_substructure(phenol, catechol)
    assert match_phenol.matched is False


def test_library_similarity_screening(service: CheminformaticsService):
    """Verifies screening library for nearest chemical analogs."""
    aspirin = service.get_molecule_by_id("aspirin")
    assert aspirin is not None

    hits = service.screen_library_similarity(aspirin, metric=SimilarityMetric.TANIMOTO, min_threshold=0.1)
    assert len(hits) >= 1
    # Rank #1 should be aspirin itself with score 1.0
    assert hits[0].molecule_id == "aspirin"
    assert hits[0].score == 1.0
    assert hits[0].rank == 1


def test_library_substructure_screening(service: CheminformaticsService):
    """Verifies screening entire library for substructure matches."""
    cooh = service.get_fragment_by_id("frag_carboxylic_acid")
    assert cooh is not None

    hits = service.screen_library_substructure(cooh)
    matched_ids = {h.molecule_id for h in hits}

    assert "aspirin" in matched_ids
    assert "benzoic_acid" in matched_ids
    assert "ibuprofen" in matched_ids
    assert "benzene" not in matched_ids


def test_pairwise_similarity_matrix(service: CheminformaticsService):
    """Verifies all-against-all similarity matrix computation."""
    selected = ["benzene", "phenol", "benzoic_acid", "aspirin"]
    res = service.compute_similarity_matrix(selected, metric=SimilarityMetric.TANIMOTO)

    assert len(res.matrix) == 4
    for i in range(4):
        assert len(res.matrix[i]) == 4
        # Diagonal is 1.0
        assert res.matrix[i][i] == 1.0
        for j in range(4):
            # Symmetric
            assert res.matrix[i][j] == res.matrix[j][i]
