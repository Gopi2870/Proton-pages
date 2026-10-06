import React from 'react';
import { HelpCircle, BookOpen, Terminal, Sparkles, ExternalLink } from 'lucide-react';

export const HelpDocsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary-400" /> Platform Documentation & Chemical Formula Reference
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete guide to keyboard shortcuts, reaction input formats, and laboratory simulations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400" /> Reaction Balancer Input Format
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter chemical reactions using standard stoichiometry syntax. For example, type <code className="font-mono text-teal-300">C3H8 + O2 -&gt; CO2 + H2O</code>. The balancing engine performs Gaussian row elimination on the atomic conservation matrix to compute the minimal integer coefficient solution.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-400" /> 3D WebGL Molecular View Controls
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Left-click and drag rotates the molecule along the Eulerian view axes. Scroll wheel adjusts zoom level. Right-click and drag translates the camera viewport across the plane.
          </p>
        </div>
      </div>
    </div>
  );
};
