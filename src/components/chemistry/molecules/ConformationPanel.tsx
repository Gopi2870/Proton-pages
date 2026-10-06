import React, { useState } from 'react';
import { MoleculeData } from '../../../types/chemistry';

interface ConformationPanelProps {
  molecule: MoleculeData;
  onAskAi: (molecule: MoleculeData) => void;
}

export const ConformationPanel: React.FC<ConformationPanelProps> = ({
  molecule,
  onAskAi,
}) => {
  const [dihedralAngle, setDihedralAngle] = useState(65.4);
  const [copied, setCopied] = useState(false);

  const handleCopySmiles = () => {
    navigator.clipboard.writeText(molecule.smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">insights</span>
          <span className="font-headline-sm text-label-md font-bold text-on-surface">
            Conformation & Topology
          </span>
        </div>
        <button
          onClick={() => onAskAi(molecule)}
          className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[11px] font-bold flex items-center gap-1 hover:opacity-90"
          type="button"
        >
          <span className="material-symbols-outlined text-[13px]">psychology</span>
          <span>AI Insight</span>
        </button>
      </div>

      {/* Description & IUPAC */}
      <div className="space-y-1.5">
        <h4 className="font-headline-sm text-body-md font-bold text-on-surface">
          {molecule.iupacName}
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {molecule.description}
        </p>
      </div>

      {/* Identifiers (SMILES / InChIKey) */}
      <div className="p-3 rounded-lg bg-surface-container-low space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-[10px] text-outline uppercase font-semibold">
            Canonical SMILES
          </span>
          <button
            onClick={handleCopySmiles}
            type="button"
            className="text-primary hover:underline font-code-sm text-[11px] flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className="font-code-sm text-[11px] text-on-surface bg-surface-container-lowest p-2 rounded border border-surface-container-high truncate">
          {molecule.smiles}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-label-sm text-[10px] text-outline uppercase font-semibold">
            InChIKey
          </span>
          <span className="font-code-sm text-[10px] text-on-surface-variant truncate max-w-[200px]">
            {molecule.inchiKey}
          </span>
        </div>
      </div>

      {/* Physicochemical / Lipinski Metrics */}
      <div className="space-y-2">
        <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">
          Physicochemical Descriptors
        </span>
        <div className="grid grid-cols-2 gap-2 font-body-sm text-body-sm">
          <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
            <span className="text-[11px] text-outline">Molecular Weight</span>
            <span className="font-code-md text-code-md font-bold text-primary mt-1">
              {molecule.molecularWeight} <span className="text-xs font-normal">g/mol</span>
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
            <span className="text-[11px] text-outline">Lipophilicity (cLogP)</span>
            <span className="font-code-md text-code-md font-bold text-secondary mt-1">
              {molecule.logP > 0 ? `+${molecule.logP}` : molecule.logP}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
            <span className="text-[11px] text-outline">H-Bond Donors / Acc.</span>
            <span className="font-code-md text-code-md font-bold text-on-surface mt-1">
              {molecule.hBondDonors} / {molecule.hBondAcceptors}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
            <span className="text-[11px] text-outline">Polar Surface Area</span>
            <span className="font-code-md text-code-md font-bold text-on-surface mt-1">
              {molecule.polarSurfaceArea} <span className="text-xs font-normal">Å²</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Dihedral Angle Stepper */}
      <div className="p-3 rounded-lg bg-surface-container-low space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
            Torsion Dihedral Angle φ (N1-C2-N3-C4)
          </span>
          <span className="font-code-sm text-code-sm font-bold text-primary">
            {dihedralAngle.toFixed(1)}°
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="0.5"
          value={dihedralAngle}
          onChange={(e) => setDihedralAngle(Number(e.target.value))}
          className="w-full accent-primary h-1.5 bg-surface-container-high rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] font-code-sm text-outline">
          <span>0° (Eclipsed)</span>
          <span>180° (Anti)</span>
          <span>360°</span>
        </div>
      </div>
    </div>
  );
};
