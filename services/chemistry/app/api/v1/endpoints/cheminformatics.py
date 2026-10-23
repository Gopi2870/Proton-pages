"""
Cheminformatics API Endpoints.
FastAPI router providing endpoints for molecular graph inspection, Morgan circular fingerprints,
pairwise chemical similarity, substructure isomorphism queries, and library screening.
"""
from typing import List
from fastapi import APIRouter, HTTPException, status

from services.chemistry.app.models.cheminformatics import (
    AtomNode,
    BondEdge,
    MolecularGraph,
    SimilarityMetric,
)
from services.chemistry.app.schemas.cheminformatics import (
    CircularEnvironmentSchema,
    FingerprintRequest,
    LibraryScreeningHitSchema,
    LibraryScreeningRequest,
    LibraryScreeningResponse,
    MolecularGraphSchema,
    MorganFingerprintResponse,
    SimilarityMatrixRequest,
    SimilarityMatrixResponse,
    SimilarityRequest,
    SimilarityResponse,
    SubstructureRequest,
    SubstructureResponse,
)
from services.chemistry.app.services.cheminformatics_service import (
    ELEMENT_ATOMIC_NUMBERS,
    cheminformatics_service,
)

router = APIRouter(prefix="/cheminformatics", tags=["cheminformatics"])


def _schema_to_domain_graph(schema: MolecularGraphSchema) -> MolecularGraph:
    """Converts MolecularGraphSchema to internal domain MolecularGraph."""
    atoms = []
    for a in schema.atoms:
        z = a.atomic_number or ELEMENT_ATOMIC_NUMBERS.get(a.element, 6)
        atoms.append(AtomNode(
            index=a.index,
            element=a.element,
            atomic_number=z,
            formal_charge=a.formal_charge,
            implicit_hydrogens=a.implicit_hydrogens,
            aromatic=a.aromatic,
            in_ring=a.in_ring,
            ring_sizes=list(a.ring_sizes),
            valence=a.valence,
            hybridization=a.hybridization,
            x=a.x,
            y=a.y,
            z=a.z,
        ))

    bonds = [
        BondEdge(
            source=b.source,
            target=b.target,
            order=b.order,
            aromatic=b.aromatic,
            in_ring=b.in_ring
        )
        for b in schema.bonds
    ]

    return MolecularGraph(
        id=schema.id,
        name=schema.name,
        smiles=schema.smiles,
        formula=schema.formula,
        molecular_weight=schema.molecular_weight,
        atoms=atoms,
        bonds=bonds,
        description=schema.description
    )


def _domain_to_schema_graph(domain: MolecularGraph) -> MolecularGraphSchema:
    """Converts domain MolecularGraph to MolecularGraphSchema."""
    return MolecularGraphSchema(
        id=domain.id,
        name=domain.name,
        smiles=domain.smiles,
        formula=domain.formula,
        molecular_weight=domain.molecular_weight,
        description=domain.description,
        atoms=[
            {
                "index": a.index,
                "element": a.element,
                "atomic_number": a.atomic_number,
                "formal_charge": a.formal_charge,
                "implicit_hydrogens": a.implicit_hydrogens,
                "aromatic": a.aromatic,
                "in_ring": a.in_ring,
                "ring_sizes": a.ring_sizes,
                "valence": a.valence,
                "hybridization": a.hybridization,
                "x": a.x,
                "y": a.y,
                "z": a.z,
            }
            for a in domain.atoms
        ],
        bonds=[
            {
                "source": b.source,
                "target": b.target,
                "order": b.order,
                "aromatic": b.aromatic,
                "in_ring": b.in_ring,
            }
            for b in domain.bonds
        ]
    )


@router.get("/library", response_model=List[MolecularGraphSchema])
def get_library() -> List[MolecularGraphSchema]:
    """Retrieves all molecules in the curated cheminformatics library."""
    mols = cheminformatics_service.get_library()
    return [_domain_to_schema_graph(m) for m in mols]


@router.get("/library/{molecule_id}", response_model=MolecularGraphSchema)
def get_library_molecule(molecule_id: str) -> MolecularGraphSchema:
    """Retrieves a specific library molecule by identifier."""
    mol = cheminformatics_service.get_molecule_by_id(molecule_id)
    if not mol:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Molecule with ID '{molecule_id}' not found in library"
        )
    return _domain_to_schema_graph(mol)


@router.get("/fragments", response_model=List[MolecularGraphSchema])
def get_fragments() -> List[MolecularGraphSchema]:
    """Retrieves standard curated functional group query fragments."""
    frags = cheminformatics_service.get_fragments()
    return [_domain_to_schema_graph(f) for f in frags]


@router.post("/fingerprint", response_model=MorganFingerprintResponse)
def compute_fingerprint(req: FingerprintRequest) -> MorganFingerprintResponse:
    """Computes Morgan circular fingerprint (ECFP equivalent) with bit folding and circular environments."""
    if req.molecule_id:
        mol = cheminformatics_service.get_molecule_by_id(req.molecule_id)
        if not mol:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Molecule ID '{req.molecule_id}' not found"
            )
    elif req.graph:
        mol = _schema_to_domain_graph(req.graph)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Either 'molecule_id' or 'graph' must be provided"
        )

    fp = cheminformatics_service.generate_morgan_fingerprint(
        mol, radius=req.radius, n_bits=req.n_bits
    )

    return MorganFingerprintResponse(
        molecule_id=fp.molecule_id,
        radius=fp.radius,
        n_bits=fp.n_bits,
        active_bits=fp.active_bits,
        bit_counts={str(k): v for k, v in fp.bit_counts.items()},
        bit_hex=fp.bit_hex,
        density=fp.density,
        environments=[
            CircularEnvironmentSchema(
                atom_index=env.atom_index,
                radius=env.radius,
                feature_id=env.feature_id,
                bit_index=env.bit_index,
                participating_atoms=env.participating_atoms,
                participating_bonds=[[b[0], b[1]] for b in env.participating_bonds],
                notation=env.notation
            )
            for env in fp.environments
        ]
    )


@router.post("/similarity", response_model=SimilarityResponse)
def calculate_similarity(req: SimilarityRequest) -> SimilarityResponse:
    """Calculates pairwise Tanimoto, Dice, Cosine, and Tversky similarity between two molecules."""
    # Resolve Molecule A
    if req.molecule_a_id:
        mol_a = cheminformatics_service.get_molecule_by_id(req.molecule_a_id)
        if not mol_a:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Molecule A with ID '{req.molecule_a_id}' not found"
            )
    elif req.graph_a:
        mol_a = _schema_to_domain_graph(req.graph_a)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Molecule A must be specified via 'molecule_a_id' or 'graph_a'"
        )

    # Resolve Molecule B
    if req.molecule_b_id:
        mol_b = cheminformatics_service.get_molecule_by_id(req.molecule_b_id)
        if not mol_b:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Molecule B with ID '{req.molecule_b_id}' not found"
            )
    elif req.graph_b:
        mol_b = _schema_to_domain_graph(req.graph_b)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Molecule B must be specified via 'molecule_b_id' or 'graph_b'"
        )

    fp_a = cheminformatics_service.generate_morgan_fingerprint(mol_a, radius=req.radius, n_bits=req.n_bits)
    fp_b = cheminformatics_service.generate_morgan_fingerprint(mol_b, radius=req.radius, n_bits=req.n_bits)

    sim = cheminformatics_service.calculate_similarity(
        fp_a, fp_b, tversky_alpha=req.tversky_alpha, tversky_beta=req.tversky_beta
    )

    return SimilarityResponse(
        molecule_a_id=sim.molecule_a_id,
        molecule_b_id=sim.molecule_b_id,
        tanimoto=sim.tanimoto,
        dice=sim.dice,
        cosine=sim.cosine,
        tversky=sim.tversky,
        shared_bits=sim.shared_bits,
        bits_a_only=sim.bits_a_only,
        bits_b_only=sim.bits_b_only,
        euclidean_distance=sim.euclidean_distance,
        manhattan_distance=sim.manhattan_distance
    )


@router.post("/substructure-search", response_model=SubstructureResponse)
def match_substructure(req: SubstructureRequest) -> SubstructureResponse:
    """Executes subgraph isomorphism search with fast bitmask pre-filtering."""
    # Resolve Target
    if req.target_id:
        target = cheminformatics_service.get_molecule_by_id(req.target_id)
        if not target:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Target molecule '{req.target_id}' not found"
            )
    elif req.target_graph:
        target = _schema_to_domain_graph(req.target_graph)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Target must be specified via 'target_id' or 'target_graph'"
        )

    # Resolve Query Fragment
    if req.fragment_id:
        fragment = cheminformatics_service.get_fragment_by_id(req.fragment_id)
        if not fragment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Query fragment '{req.fragment_id}' not found"
            )
    elif req.query_graph:
        fragment = _schema_to_domain_graph(req.query_graph)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query fragment must be specified via 'fragment_id' or 'query_graph'"
        )

    match = cheminformatics_service.match_substructure(target, fragment)

    return SubstructureResponse(
        target_molecule_id=match.target_molecule_id,
        target_molecule_name=match.target_molecule_name,
        query_fragment_id=match.query_fragment_id,
        query_fragment_name=match.query_fragment_name,
        matched=match.matched,
        filter_passed=match.filter_passed,
        atom_mappings=[{str(k): v for k, v in m.items()} for m in match.atom_mappings],
        matched_target_atoms=match.matched_target_atoms,
        matched_target_bonds=[[b[0], b[1]] for b in match.matched_target_bonds],
        execution_time_ms=match.execution_time_ms
    )


@router.post("/screen-library", response_model=LibraryScreeningResponse)
def screen_library(req: LibraryScreeningRequest) -> LibraryScreeningResponse:
    """Screens the curated library against a query molecule, returning ranked matches."""
    if req.query_id:
        query_mol = cheminformatics_service.get_molecule_by_id(req.query_id)
        if not query_mol:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Query molecule '{req.query_id}' not found"
            )
    elif req.query_graph:
        query_mol = _schema_to_domain_graph(req.query_graph)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query must be specified via 'query_id' or 'query_graph'"
        )

    metric_enum = SimilarityMetric.TANIMOTO
    if req.metric.lower() == "dice":
        metric_enum = SimilarityMetric.DICE
    elif req.metric.lower() == "cosine":
        metric_enum = SimilarityMetric.COSINE
    elif req.metric.lower() == "tversky":
        metric_enum = SimilarityMetric.TVERSKY

    hits = cheminformatics_service.screen_library_similarity(
        query_mol, metric=metric_enum, min_threshold=req.min_threshold
    )

    return LibraryScreeningResponse(
        query_id=query_mol.id,
        metric=req.metric,
        hits=[
            LibraryScreeningHitSchema(
                molecule_id=h.molecule_id,
                molecule_name=h.molecule_name,
                formula=h.formula,
                smiles=h.smiles,
                score=h.score,
                rank=h.rank,
                matched_substructure=h.matched_substructure,
                matched_atoms=h.matched_atoms
            )
            for h in hits
        ],
        total_screened=len(cheminformatics_service.get_library())
    )


@router.post("/similarity-matrix", response_model=SimilarityMatrixResponse)
def compute_similarity_matrix(req: SimilarityMatrixRequest) -> SimilarityMatrixResponse:
    """Computes all-against-all similarity matrix for selected molecules."""
    metric_enum = SimilarityMetric.TANIMOTO
    if req.metric.lower() == "dice":
        metric_enum = SimilarityMetric.DICE
    elif req.metric.lower() == "cosine":
        metric_enum = SimilarityMetric.COSINE
    elif req.metric.lower() == "tversky":
        metric_enum = SimilarityMetric.TVERSKY

    res = cheminformatics_service.compute_similarity_matrix(
        molecule_ids=req.molecule_ids, metric=metric_enum
    )

    return SimilarityMatrixResponse(
        molecule_ids=res.molecule_ids,
        molecule_names=res.molecule_names,
        metric=res.metric,
        matrix=res.matrix
    )
