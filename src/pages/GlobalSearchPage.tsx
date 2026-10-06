import React, { useState } from 'react';
import { Search, Atom, Flame, FlaskConical, BookOpen } from 'lucide-react';
import { COMPREHENSIVE_ELEMENTS } from '../data/elementsComprehensive';
import { COMPREHENSIVE_REACTIONS } from '../data/reactionsComprehensive';
import { COMPREHENSIVE_MOLECULES } from '../data/moleculesComprehensive';

export const GlobalSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const elements = COMPREHENSIVE_ELEMENTS.filter(e => e.name.toLowerCase().includes(query.toLowerCase()) || e.symbol.toLowerCase() === query.toLowerCase()).slice(0, 4);
  const reactions = COMPREHENSIVE_REACTIONS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.balancedEquation.includes(query)).slice(0, 4);
  const molecules = COMPREHENSIVE_MOLECULES.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.formula.includes(query)).slice(0, 4);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Universal Chemistry Knowledge Search</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search elements, reactions, 3D molecules, courses, or equations..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 shadow-xl"
          />
        </div>
      </div>

      {query.length > 0 && (
        <div className="space-y-6 max-w-4xl mx-auto pt-4">
          {/* Elements */}
          {elements.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-2">
                <Atom className="w-4 h-4 text-teal-400" /> Periodic Elements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {elements.map(e => (
                  <div key={e.number} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white">{e.name} ({e.symbol})</span>
                      <div className="text-[10px] text-slate-500">Atomic #{e.number} • {e.category}</div>
                    </div>
                    <span className="font-mono text-teal-400">{e.atomicMass} u</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reactions */}
          {reactions.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" /> Chemical Reactions
              </h3>
              <div className="space-y-2">
                {reactions.map(r => (
                  <div key={r.id} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                    <div className="font-semibold text-white">{r.title}</div>
                    <div className="font-mono text-teal-400 text-[11px] mt-1">{r.balancedEquation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
