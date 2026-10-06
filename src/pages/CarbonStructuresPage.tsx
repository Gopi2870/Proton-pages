import React, { useState } from 'react';
import { COMPREHENSIVE_CARBON_STRUCTURES } from '../data/carbonStructuresComprehensive';
import { CarbonStructure } from '../types/carbonStructures';
import { Layers, Zap, Shield, Sparkles } from 'lucide-react';

export const CarbonStructuresPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [activeItem, setActiveItem] = useState<CarbonStructure>(COMPREHENSIVE_CARBON_STRUCTURES[0]);

  const types = ['All', 'Allotrope', 'Fullerene / Nanocarbon'];

  const filtered = COMPREHENSIVE_CARBON_STRUCTURES.filter((item) => {
    return selectedType === 'All' || item.type === selectedType;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-teal-400" /> Carbon Structures & Nanomaterials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore allotropes, fullerenes, carbon nanotubes, and 2D graphene lattices with rigorous bonding physics.
          </p>
        </div>
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedType === t ? 'bg-primary-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3 overflow-y-auto max-h-[700px] pr-2">
          {filtered.map((item) => {
            const isSelected = item.id === activeItem.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  isSelected ? 'bg-teal-500/10 border-teal-500 shadow-sm' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 font-mono">
                    {item.hybridization}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-500">
                  <span>C-C: {item.cCBondLengthPm} pm</span>
                  <span>Mohs: {item.hardnessMohs ?? 'N/A'}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-start justify-between">
            <div>
              <span className="text-xs uppercase font-mono text-teal-400">{activeItem.type}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{activeItem.name}</h2>
              <div className="text-sm font-mono text-slate-400 mt-1">Formula: {activeItem.formula}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                {activeItem.electricalConductivity}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Bond Length</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeItem.cCBondLengthPm} pm</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Bond Energy</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeItem.cCBondEnergyKjMol} kJ/mol</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Thermal Cond.</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeItem.thermalConductivityWmK} W/(m·K)</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Band Gap</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeItem.bandGapEv ?? 0.0} eV</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2">Electronic Delocalization & Symmetry</h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-lg border border-slate-800">
              {activeItem.delocalizationDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2">Industrial Applications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeItem.applications.map((app, i) => (
                <div key={i} className="text-xs text-slate-300 p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
