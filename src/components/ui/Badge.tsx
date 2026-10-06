import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'sm' }) => {
  const variantCls = {
    primary: 'bg-primary-500/15 text-primary-400 border-primary-500/30',
    teal: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    slate: 'bg-slate-800 text-slate-400 border-slate-700'
  }[variant];

  const sizeCls = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${variantCls} ${sizeCls}`}>
      {children}
    </span>
  );
};
