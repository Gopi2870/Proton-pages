import React, { useState } from 'react';

export const StereoViewer: React.FC = () => {
  const [priorityOrder, setPriorityOrder] = useState<'R' | 'S'>('R');
  const [rotated, setRotated] = useState(false);

  return (
    <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            model_training
          </span>
          <h4 className="font-headline-sm text-label-md font-bold text-on-surface">
            Chiral Stereocenter Simulator (Cahn-Ingold-Prelog)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
            Configuration: ({priorityOrder})
          </span>
        </div>
      </div>

      {/* Visual Tetrahedral Representation (SVG) */}
      <div className="w-full h-44 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
        <svg
          viewBox="0 0 300 160"
          className={`w-64 h-36 transition-transform duration-700 ${
            rotated ? 'rotate-180' : ''
          }`}
        >
          {/* Bonds */}
          {/* In-plane bond: C - OH (Top) */}
          <line x1="150" y1="80" x2="150" y2="25" stroke="#334155" strokeWidth="3" />
          {/* In-plane bond: C - COOH (Bottom Right) */}
          <line x1="150" y1="80" x2="210" y2="120" stroke="#334155" strokeWidth="3" />
          {/* Wedge bond (pointing toward viewer): C - CH3 (Bottom Left) */}
          <polygon points="150,80 90,125 100,135" fill="#2563eb" />
          {/* Dash bond (pointing away): C - H (Middle Left) */}
          <line x1="150" y1="80" x2="105" y2="55" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3,3" />

          {/* Central Chiral Carbon Atom */}
          <circle cx="150" cy="80" r="10" fill="#334155" />
          <text x="150" y="84" textAnchor="middle" fill="#ffffff" className="font-mono text-[10px] font-bold">
            C*
          </text>

          {/* Priority #1: -OH */}
          <circle cx="150" cy="22" r="14" fill="#ef4444" />
          <text x="150" y="26" textAnchor="middle" fill="#ffffff" className="font-mono text-[10px] font-bold">
            -OH (1)
          </text>

          {/* Priority #2: -COOH */}
          <circle cx="215" cy="122" r="16" fill="#0891b2" />
          <text x="215" y="126" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">
            -COOH (2)
          </text>

          {/* Priority #3: -CH3 */}
          <circle cx="92" cy="130" r="14" fill="#3b82f6" />
          <text x="92" y="134" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">
            -CH₃ (3)
          </text>

          {/* Priority #4: -H (in back) */}
          <circle cx="100" cy="52" r="11" fill="#cbd5e1" />
          <text x="100" y="56" textAnchor="middle" fill="#1e293b" className="font-mono text-[9px] font-bold">
            -H (4)
          </text>

          {/* Circular arrow 1 -> 2 -> 3 */}
          <path
            d="M 130 35 A 45 45 0 0 1 190 95"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="4,2"
            markerEnd="url(#arrow)"
          />
        </svg>

        <span className="absolute bottom-2 right-3 font-code-sm text-[10px] text-outline">
          Wedge: toward | Dash: away
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
          <span>Direction 1 ➔ 2 ➔ 3:</span>
          <span className="font-bold text-primary">
            {priorityOrder === 'R' ? 'Clockwise (Rectus / R)' : 'Counter-Clockwise (Sinister / S)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRotated(!rotated)}
            className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[11px] transition-colors"
          >
            Rotate View 180°
          </button>
          <button
            onClick={() => setPriorityOrder(priorityOrder === 'R' ? 'S' : 'R')}
            className="px-3 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold hover:bg-primary transition-colors"
          >
            Invert Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
