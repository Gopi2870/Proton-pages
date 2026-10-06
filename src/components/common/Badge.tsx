import React from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'error'
  | 'success'
  | 'warning'
  | 'live';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-code-sm';

  const variantMap: Record<BadgeVariant, string> = {
    primary: 'bg-primary-fixed text-on-primary-fixed font-code-sm',
    secondary: 'bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed font-code-sm',
    outline: 'bg-surface-container text-on-surface-variant font-code-sm',
    error: 'bg-error-container text-on-error-container font-code-sm',
    success: 'bg-emerald-100 text-emerald-800 font-code-sm',
    warning: 'bg-amber-100 text-amber-800 font-code-sm',
    live: 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold flex items-center gap-1',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${sizeClasses} ${variantMap[variant]} ${className}`}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
      )}
      {children}
    </span>
  );
};
