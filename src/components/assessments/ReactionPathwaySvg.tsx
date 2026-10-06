import React from 'react';

export const ReactionPathwaySvg: React.FC = () => {
  return (
    <div className="rounded-xl bg-surface-container-low p-5 flex flex-col gap-4 border border-surface-container-high">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">
            mobile_rotate_lock
          </span>
          <span className="font-label-md text-label-md font-semibold text-on-surface">
            Reaction Pathway & Transition State Geometry
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[11px]">
            DMSO (Polar Aprotic)
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[11px]">
            T = 298.15 K
          </span>
        </div>
      </div>

      {/* SVG Diagram Surface matching Stitch */}
      <div className="w-full bg-surface-container-lowest rounded-lg p-4 shadow-inner flex flex-col items-center justify-center overflow-x-auto">
        <svg
          className="w-full max-w-[720px] h-48 select-none"
          viewBox="0 0 720 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid */}
          <defs>
            <pattern id="chem-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#c3c6d7" opacity="0.3" />
            </pattern>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#004ac6" />
            </marker>
          </defs>
          <rect width="720" height="180" fill="url(#chem-grid)" rx="8" />

          {/* 1. Reactant: (2R)-2-bromobutane + :CN- */}
          <g transform="translate(40, 40)">
            <text x="0" y="20" fill="#131b2e" className="font-mono text-[13px] font-bold">
              NC:⁻
            </text>
            <path
              d="M 35 15 Q 65 -5 85 25"
              fill="none"
              stroke="#004ac6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            {/* Skeletal carbon with Br on wedge */}
            <line x1="85" y1="35" x2="115" y2="15" stroke="#131b2e" strokeWidth="2.5" />
            <line x1="115" y1="15" x2="145" y2="35" stroke="#131b2e" strokeWidth="2.5" />
            <line x1="145" y1="35" x2="175" y2="15" stroke="#131b2e" strokeWidth="2.5" />
            {/* Br wedge */}
            <polygon points="115,15 112,-15 118,-15" fill="#ba1a1a" />
            <text x="110" y="-20" fill="#ba1a1a" className="font-mono text-[12px] font-bold">
              Br
            </text>
            <text x="75" y="80" fill="#737686" className="font-sans text-[11px]">
              (2R)-Reactant
            </text>
          </g>

          {/* Arrow 1 to Transition State */}
          <path
            d="M 230 70 L 270 70"
            fill="none"
            stroke="#737686"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />

          {/* 2. Transition State: [NC···C···Br]‡ */}
          <g transform="translate(290, 30)">
            <rect
              x="0"
              y="0"
              width="150"
              height="90"
              fill="none"
              stroke="#585be6"
              strokeWidth="1.5"
              strokeDasharray="4,3"
              rx="6"
            />
            <text x="135" y="20" fill="#585be6" className="font-mono text-[14px] font-bold">
              ‡
            </text>
            <text x="15" y="50" fill="#006780" className="font-mono text-[12px] font-bold">
              NC
            </text>
            <line x1="38" y1="46" x2="65" y2="46" stroke="#006780" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="75" cy="46" r="6" fill="#131b2e" />
            <line x1="85" y1="46" x2="112" y2="46" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="3,3" />
            <text x="118" y="50" fill="#ba1a1a" className="font-mono text-[12px] font-bold">
              Br
            </text>
            <text x="35" y="105" fill="#585be6" className="font-sans text-[11px] font-semibold">
              Trigonal Bipyramidal TS
            </text>
          </g>

          {/* Arrow 2 to Inverted Product */}
          <path
            d="M 465 70 L 505 70"
            fill="none"
            stroke="#737686"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />

          {/* 3. Inverted Product: (2S)-2-methylbutanenitrile */}
          <g transform="translate(525, 40)">
            <line x1="20" y1="35" x2="50" y2="15" stroke="#131b2e" strokeWidth="2.5" />
            <line x1="50" y1="15" x2="80" y2="35" stroke="#131b2e" strokeWidth="2.5" />
            <line x1="80" y1="35" x2="110" y2="15" stroke="#131b2e" strokeWidth="2.5" />
            {/* CN on dash (inverted stereocenter) */}
            <line x1="50" y1="15" x2="50" y2="-12" stroke="#006780" strokeWidth="3" strokeDasharray="3,3" />
            <text x="42" y="-18" fill="#006780" className="font-mono text-[12px] font-bold">
              CN
            </text>
            <text x="120" y="20" fill="#ba1a1a" className="font-mono text-[12px] font-bold">
              + :Br⁻
            </text>
            <text x="25" y="80" fill="#004ac6" className="font-sans text-[11px] font-bold">
              (2S)-Inverted Product
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
