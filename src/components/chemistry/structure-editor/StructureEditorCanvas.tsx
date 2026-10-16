import React, { useState, useRef, useEffect } from 'react';
import {
  CanvasAtom,
  CanvasBond,
  MoleculeGraph,
  StructureValidationReport
} from '../../../types/structureEditor';
import { StructureEditorService } from '../../../services/structureEditorService';

interface StructureEditorCanvasProps {
  onAskAi?: (question: string) => void;
  onExportSmiles?: (smiles: string) => void;
}

const ELEMENT_COLORS: Record<string, string> = {
  C: '#2C302E',
  N: '#3B82F6',
  O: '#EF4444',
  H: '#94A3B8',
  F: '#10B981',
  Cl: '#059669',
  Br: '#991B1B',
  I: '#7C3AED',
  S: '#F59E0B',
  P: '#F97316'
};

export const StructureEditorCanvas: React.FC<StructureEditorCanvasProps> = ({
  onAskAi,
  onExportSmiles
}) => {
  const [graph, setGraph] = useState<MoleculeGraph>(() =>
    StructureEditorService.createBenzeneStamp(320, 240, 55)
  );

  const [activeTool, setActiveTool] = useState<
    'select' | 'atom' | 'bond' | 'charge' | 'erase' | 'stamp_benzene' | 'stamp_cyclohexane'
  >('select');

  const [selectedElement, setSelectedElement] = useState<string>('C');
  const [bondOrder, setBondOrder] = useState<1 | 2 | 3>(1);
  const [chargeValue, setChargeValue] = useState<1 | -1 | 0>(1);

  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [hoveredAtomId, setHoveredAtomId] = useState<string | null>(null);

  // SMILES Import Modal
  const [showImportModal, setShowImportModal] = useState(false);
  const [importSmilesText, setImportSmilesText] = useState('CCO');

  const [report, setReport] = useState<StructureValidationReport>(() =>
    StructureEditorService.validateStructure(graph)
  );

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    setReport(StructureEditorService.validateStructure(graph));
  }, [graph]);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (activeTool === 'stamp_benzene') {
      const stamp = StructureEditorService.createBenzeneStamp(x, y, 50);
      setGraph((prev) => ({
        atoms: [...prev.atoms, ...stamp.atoms],
        bonds: [...prev.bonds, ...stamp.bonds]
      }));
      setActiveTool('select');
      return;
    }

    if (activeTool === 'stamp_cyclohexane') {
      const stamp = StructureEditorService.createCyclohexaneStamp(x, y, 50);
      setGraph((prev) => ({
        atoms: [...prev.atoms, ...stamp.atoms],
        bonds: [...prev.bonds, ...stamp.bonds]
      }));
      setActiveTool('select');
      return;
    }

    if (activeTool === 'atom') {
      const newAtom: CanvasAtom = {
        id: `atm_${Date.now()}_${graph.atoms.length}`,
        element: selectedElement,
        x,
        y,
        charge: 0
      };
      setGraph((prev) => ({
        atoms: [...prev.atoms, newAtom],
        bonds: prev.bonds
      }));
    } else {
      setSelectedAtomId(null);
    }
  };

  const handleAtomClick = (atom: CanvasAtom, e: React.MouseEvent) => {
    e.stopPropagation();

    if (activeTool === 'erase') {
      setGraph((prev) => ({
        atoms: prev.atoms.filter((a) => a.id !== atom.id),
        bonds: prev.bonds.filter((b) => b.atom1Id !== atom.id && b.atom2Id !== atom.id)
      }));
      return;
    }

    if (activeTool === 'charge') {
      setGraph((prev) => ({
        atoms: prev.atoms.map((a) => (a.id === atom.id ? { ...a, charge: a.charge === chargeValue ? 0 : chargeValue } : a)),
        bonds: prev.bonds
      }));
      return;
    }

    if (activeTool === 'bond') {
      if (!selectedAtomId) {
        setSelectedAtomId(atom.id);
      } else if (selectedAtomId === atom.id) {
        setSelectedAtomId(null);
      } else {
        // Connect bond between selectedAtomId and clicked atom
        const existingBondIndex = graph.bonds.findIndex(
          (b) =>
            (b.atom1Id === selectedAtomId && b.atom2Id === atom.id) ||
            (b.atom1Id === atom.id && b.atom2Id === selectedAtomId)
        );

        if (existingBondIndex >= 0) {
          // Toggle or update bond order
          setGraph((prev) => {
            const nextBonds = [...prev.bonds];
            nextBonds[existingBondIndex] = {
              ...nextBonds[existingBondIndex],
              order: bondOrder
            };
            return { atoms: prev.atoms, bonds: nextBonds };
          });
        } else {
          // Create new bond
          const newBond: CanvasBond = {
            id: `bnd_${Date.now()}`,
            atom1Id: selectedAtomId,
            atom2Id: atom.id,
            order: bondOrder
          };
          setGraph((prev) => ({
            atoms: prev.atoms,
            bonds: [...prev.bonds, newBond]
          }));
        }
        setSelectedAtomId(null);
      }
      return;
    }

    if (activeTool === 'select') {
      setSelectedAtomId(atom.id === selectedAtomId ? null : atom.id);
    }
  };

  const handleBondClick = (bond: CanvasBond, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTool === 'erase') {
      setGraph((prev) => ({
        atoms: prev.atoms,
        bonds: prev.bonds.filter((b) => b.id !== bond.id)
      }));
      return;
    }

    // Cycle bond order 1 -> 2 -> 3 -> 1
    const nextOrder = bond.order === 1 ? 2 : bond.order === 2 ? 3 : 1;
    setGraph((prev) => ({
      atoms: prev.atoms,
      bonds: prev.bonds.map((b) => (b.id === bond.id ? { ...b, order: nextOrder as 1 | 2 | 3 } : b))
    }));
  };

  const handleClear = () => {
    setGraph({ atoms: [], bonds: [] });
    setSelectedAtomId(null);
  };

  const handleImportSmiles = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importSmilesText.trim()) return;
    const imported = StructureEditorService.importSimpleSmiles(importSmilesText.trim());
    setGraph(imported);
    setShowImportModal(false);
  };

  const handleCopySmiles = () => {
    if (report.smiles) {
      navigator.clipboard?.writeText(report.smiles);
      if (onExportSmiles) onExportSmiles(report.smiles);
      alert(`Copied SMILES: ${report.smiles}`);
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden bg-surface">
      {/* Top Header & Structure Metrics HUD */}
      <div className="h-16 px-space-md lg:px-space-lg bg-surface-container-lowest border-b border-surface-container-low flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-xs">
            <span className="material-symbols-outlined text-[20px]">draw</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-label-md font-bold text-on-surface">
              2D Chemical Structure Canvas
            </h1>
            <div className="flex items-center gap-2 font-code-sm text-[11px] text-outline">
              <span>{report.totalAtoms} Atoms</span>
              <span>•</span>
              <span>{report.totalBonds} Bonds</span>
              {report.formula && (
                <>
                  <span>•</span>
                  <span className="text-secondary font-bold">{report.formula}</span>
                  <span>•</span>
                  <span>{report.molecularWeight} g/mol</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SMILES Bar & Actions */}
        <div className="flex items-center gap-2">
          {report.smiles && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container font-code-sm text-xs text-on-surface">
              <span className="text-outline">SMILES:</span>
              <span className="font-bold text-primary">{report.smiles}</span>
            </div>
          )}

          <button
            onClick={handleCopySmiles}
            disabled={!report.smiles}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copy SMILES</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition"
          >
            <span className="material-symbols-outlined text-[16px]">input</span>
            <span>Import SMILES</span>
          </button>

          {onAskAi && report.formula && (
            <button
              onClick={() => onAskAi(`Explain the reactivity, hybridization, and synthesis of ${report.formula}`)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95 shadow-xs transition"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Analyze with AI</span>
            </button>
          )}

          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-rose-500/20 text-xs font-semibold text-outline hover:text-rose-500 transition"
            title="Clear Canvas"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          </button>
        </div>
      </div>

      {/* Main Drawing Area: Tool Palette Sidebar + Interactive SVG Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Toolbar */}
        <div className="w-16 lg:w-48 bg-surface-container-lowest border-r border-surface-container-low p-2 lg:p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            {/* Primary Action Tools */}
            <div className="space-y-1">
              <span className="hidden lg:block text-[10px] font-bold text-outline uppercase tracking-wider px-1">
                Tools
              </span>
              <button
                onClick={() => setActiveTool('select')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold transition ${
                  activeTool === 'select' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface hover:bg-surface-container'
                }`}
                title="Select Atom"
              >
                <span className="material-symbols-outlined text-[18px]">near_me</span>
                <span className="hidden lg:inline">Select</span>
              </button>
              <button
                onClick={() => setActiveTool('atom')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold transition ${
                  activeTool === 'atom' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface hover:bg-surface-container'
                }`}
                title="Place Atom"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span className="hidden lg:inline">Add Atom</span>
              </button>
              <button
                onClick={() => setActiveTool('bond')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold transition ${
                  activeTool === 'bond' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface hover:bg-surface-container'
                }`}
                title="Connect Bond"
              >
                <span className="material-symbols-outlined text-[18px]">timeline</span>
                <span className="hidden lg:inline">Draw Bond</span>
              </button>
              <button
                onClick={() => setActiveTool('charge')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold transition ${
                  activeTool === 'charge' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface hover:bg-surface-container'
                }`}
                title="Formal Charge"
              >
                <span className="material-symbols-outlined text-[18px]">exposure</span>
                <span className="hidden lg:inline">Charge (+/-)</span>
              </button>
              <button
                onClick={() => setActiveTool('erase')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold transition ${
                  activeTool === 'erase' ? 'bg-rose-500 text-white shadow-xs' : 'text-on-surface hover:bg-surface-container'
                }`}
                title="Erase"
              >
                <span className="material-symbols-outlined text-[18px]">backspace</span>
                <span className="hidden lg:inline">Erase</span>
              </button>
            </div>

            {/* Element Palette */}
            <div className="space-y-1">
              <span className="hidden lg:block text-[10px] font-bold text-outline uppercase tracking-wider px-1">
                Elements
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                {['C', 'N', 'O', 'H', 'F', 'Cl', 'Br', 'S', 'P', 'I'].map((el) => (
                  <button
                    key={el}
                    onClick={() => {
                      setSelectedElement(el);
                      setActiveTool('atom');
                    }}
                    className={`p-1.5 rounded font-code-sm text-xs font-bold transition border ${
                      selectedElement === el && activeTool === 'atom'
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>

            {/* Bond Order Selector */}
            <div className="space-y-1">
              <span className="hidden lg:block text-[10px] font-bold text-outline uppercase tracking-wider px-1">
                Bond Order
              </span>
              <div className="flex gap-1">
                {([1, 2, 3] as const).map((bo) => (
                  <button
                    key={bo}
                    onClick={() => {
                      setBondOrder(bo);
                      setActiveTool('bond');
                    }}
                    className={`flex-1 py-1 rounded font-code-sm text-xs font-bold transition border ${
                      bondOrder === bo && activeTool === 'bond'
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {bo === 1 ? '—' : bo === 2 ? '═' : '≡'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ring Template Stamps */}
            <div className="space-y-1">
              <span className="hidden lg:block text-[10px] font-bold text-outline uppercase tracking-wider px-1">
                Templates
              </span>
              <button
                onClick={() => setActiveTool('stamp_benzene')}
                className={`w-full flex items-center gap-1.5 p-1.5 rounded text-xs font-semibold border ${
                  activeTool === 'stamp_benzene'
                    ? 'border-secondary bg-secondary text-on-secondary'
                    : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">hexagon</span>
                <span className="hidden lg:inline">Benzene</span>
              </button>
              <button
                onClick={() => setActiveTool('stamp_cyclohexane')}
                className={`w-full flex items-center gap-1.5 p-1.5 rounded text-xs font-semibold border ${
                  activeTool === 'stamp_cyclohexane'
                    ? 'border-secondary bg-secondary text-on-secondary'
                    : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">polymer</span>
                <span className="hidden lg:inline">Cyclohexane</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive SVG Drawing Canvas */}
        <div className="flex-1 bg-surface-container-lowest relative overflow-hidden">
          <svg
            ref={svgRef}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-crosshair select-none"
          >
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-surface-container-high/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Render Bonds */}
            {graph.bonds.map((bond) => {
              const a1 = graph.atoms.find((a) => a.id === bond.atom1Id);
              const a2 = graph.atoms.find((a) => a.id === bond.atom2Id);
              if (!a1 || !a2) return null;

              const dx = a2.x - a1.x;
              const dy = a2.y - a1.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist === 0) return null;

              // Perpendicular normal for multi-bonds
              const px = -dy / dist;
              const py = dx / dist;

              return (
                <g key={bond.id} onClick={(e) => handleBondClick(bond, e)} className="cursor-pointer group">
                  {/* Invisible wide hit target */}
                  <line
                    x1={a1.x}
                    y1={a1.y}
                    x2={a2.x}
                    y2={a2.y}
                    stroke="transparent"
                    strokeWidth={14}
                  />

                  {/* Single Bond */}
                  {bond.order === 1 && (
                    <line
                      x1={a1.x}
                      y1={a1.y}
                      x2={a2.x}
                      y2={a2.y}
                      stroke="currentColor"
                      strokeWidth={3}
                      className="text-on-surface group-hover:text-primary transition-colors"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Double Bond */}
                  {bond.order === 2 && (
                    <>
                      <line
                        x1={a1.x + px * 3}
                        y1={a1.y + py * 3}
                        x2={a2.x + px * 3}
                        y2={a2.y + py * 3}
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="text-on-surface group-hover:text-primary transition-colors"
                        strokeLinecap="round"
                      />
                      <line
                        x1={a1.x - px * 3}
                        y1={a1.y - py * 3}
                        x2={a2.x - px * 3}
                        y2={a2.y - py * 3}
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="text-on-surface group-hover:text-primary transition-colors"
                        strokeLinecap="round"
                      />
                    </>
                  )}

                  {/* Triple Bond */}
                  {bond.order === 3 && (
                    <>
                      <line
                        x1={a1.x}
                        y1={a1.y}
                        x2={a2.x}
                        y2={a2.y}
                        stroke="currentColor"
                        strokeWidth={2}
                        className="text-on-surface group-hover:text-primary transition-colors"
                      />
                      <line
                        x1={a1.x + px * 4.5}
                        y1={a1.y + py * 4.5}
                        x2={a2.x + px * 4.5}
                        y2={a2.y + py * 4.5}
                        stroke="currentColor"
                        strokeWidth={2}
                        className="text-on-surface group-hover:text-primary transition-colors"
                      />
                      <line
                        x1={a1.x - px * 4.5}
                        y1={a1.y - py * 4.5}
                        x2={a2.x - px * 4.5}
                        y2={a2.y - py * 4.5}
                        stroke="currentColor"
                        strokeWidth={2}
                        className="text-on-surface group-hover:text-primary transition-colors"
                      />
                    </>
                  )}
                </g>
              );
            })}

            {/* Render Atoms */}
            {graph.atoms.map((atom) => {
              const isSelected = atom.id === selectedAtomId;
              const isHovered = atom.id === hoveredAtomId;
              const color = ELEMENT_COLORS[atom.element] || '#2C302E';

              return (
                <g
                  key={atom.id}
                  onClick={(e) => handleAtomClick(atom, e)}
                  onMouseEnter={() => setHoveredAtomId(atom.id)}
                  onMouseLeave={() => setHoveredAtomId(null)}
                  className="cursor-pointer group"
                >
                  {/* Selection / Hover Aura */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={atom.x}
                      cy={atom.y}
                      r={18}
                      fill="none"
                      stroke={isSelected ? '#D47942' : '#8B572A'}
                      strokeWidth={2}
                      strokeDasharray={isSelected ? '4 2' : 'none'}
                      className="animate-pulse"
                    />
                  )}

                  {/* Atom Disk Background */}
                  <circle
                    cx={atom.x}
                    cy={atom.y}
                    r={12}
                    fill="#FDF8F5"
                    stroke={color}
                    strokeWidth={2}
                  />

                  {/* Element Text Label */}
                  <text
                    x={atom.x}
                    y={atom.y + 4}
                    textAnchor="middle"
                    fill={color}
                    fontSize={12}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {atom.element}
                  </text>

                  {/* Formal Charge Badge */}
                  {atom.charge !== 0 && (
                    <g transform={`translate(${atom.x + 8}, ${atom.y - 8})`}>
                      <circle r={6} fill={atom.charge > 0 ? '#3B82F6' : '#EF4444'} />
                      <text
                        x={0}
                        y={3}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize={9}
                        fontWeight="bold"
                      >
                        {atom.charge > 0 ? '+' : '−'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Valence Warnings Overlay */}
          {report.valenceWarnings.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 max-w-xl p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-on-surface shadow-md space-y-1 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>Valence Violation Detected</span>
              </div>
              {report.valenceWarnings.map((w, idx) => (
                <p key={idx} className="text-[11px] text-on-surface-variant">
                  {w}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Import SMILES */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-xl p-6 max-w-md w-full shadow-lg space-y-4">
            <h3 className="text-base font-bold text-on-surface">Import Chemical Structure from SMILES</h3>
            <form onSubmit={handleImportSmiles} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  SMILES String
                </label>
                <input
                  type="text"
                  placeholder="e.g. c1ccccc1, C=C, CCO, CC(=O)O"
                  value={importSmilesText}
                  onChange={(e) => setImportSmilesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container font-code-sm text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95"
                >
                  Render 2D Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
