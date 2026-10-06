import React from 'react';
import { TitrationDataPoint } from '../../../types/chemistry';

interface TitrationChartProps {
  dataPoints: TitrationDataPoint[];
  currentVolume: number;
  currentPh: number;
}

export const TitrationChart: React.FC<TitrationChartProps> = ({
  dataPoints,
  currentVolume,
  currentPh,
}) => {
  const width = 320;
  const height = 180;
  const padding = { top: 15, right: 15, bottom: 25, left: 35 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Scale: X = 0 to 50 mL, Y = 0 to 14 pH
  const scaleX = (vol: number) => padding.left + (vol / 50) * innerWidth;
  const scaleY = (ph: number) => padding.top + innerHeight - (ph / 14) * innerHeight;

  // Generate SVG path for logged data points
  const pathD =
    dataPoints.length > 0
      ? dataPoints
          .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(pt.volumeAdded)} ${scaleY(pt.pH)}`)
          .join(' ')
      : `M ${scaleX(0)} ${scaleY(1.0)}`;

  // Phenolphthalein transition zone: pH 8.2 to 10.0
  const zoneTop = scaleY(10.0);
  const zoneHeight = scaleY(8.2) - scaleY(10.0);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-low shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between pb-1 border-b border-surface-container-low">
        <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">
          Titration Curve (pH vs Volume Added)
        </span>
        <span className="font-code-sm text-[11px] text-secondary font-bold">
          Equiv @ 25.00 mL
        </span>
      </div>

      <div className="w-full flex justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[340px] h-auto select-none"
        >
          {/* Background grid lines */}
          {[0, 3.5, 7, 10.5, 14].map((ph) => (
            <g key={ph}>
              <line
                x1={padding.left}
                y1={scaleY(ph)}
                x2={width - padding.right}
                y2={scaleY(ph)}
                stroke="#e2e8f0"
                strokeDasharray="2,2"
              />
              <text
                x={padding.left - 6}
                y={scaleY(ph) + 3}
                textAnchor="end"
                className="fill-outline font-mono text-[9px]"
              >
                {ph}
              </text>
            </g>
          ))}

          {/* Volume tick labels */}
          {[0, 10, 20, 25, 30, 40, 50].map((vol) => (
            <text
              key={vol}
              x={scaleX(vol)}
              y={height - 8}
              textAnchor="middle"
              className="fill-outline font-mono text-[9px]"
            >
              {vol}
            </text>
          ))}

          {/* Phenolphthalein color change zone */}
          <rect
            x={padding.left}
            y={zoneTop}
            width={innerWidth}
            height={zoneHeight}
            fill="#ec4899"
            opacity="0.12"
          />
          <text
            x={width - padding.right - 4}
            y={zoneTop + 10}
            textAnchor="end"
            className="fill-pink-600 font-mono text-[8px] font-semibold"
          >
            Pink Endpt (8.2-10)
          </text>

          {/* Theoretical inflection guide */}
          <line
            x1={scaleX(25)}
            y1={padding.top}
            x2={scaleX(25)}
            y2={height - padding.bottom}
            stroke="#0891b2"
            strokeDasharray="3,3"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Real-time Titration Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current cursor indicator */}
          <circle
            cx={scaleX(currentVolume)}
            cy={scaleY(currentPh)}
            r="4.5"
            fill="#0891b2"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] font-code-sm pt-1 border-t border-surface-container-low text-on-surface-variant">
        <span>V = {currentVolume.toFixed(2)} mL</span>
        <span className="font-bold text-primary">pH = {currentPh.toFixed(2)}</span>
      </div>
    </div>
  );
};
