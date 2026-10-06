import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'primary' | 'teal' | 'emerald' | 'amber';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'primary', height = 'md', showLabel }) => {
  const clamped = Math.max(0, Math.min(100, value));
  const heightCls = height === 'sm' ? 'h-1.5' : height === 'lg' ? 'h-3' : 'h-2';
  const colorCls = color === 'teal' ? 'bg-teal-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-primary-600';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightCls}`}>
        <div className={`${heightCls} rounded-full transition-all duration-300 ${colorCls}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
};
