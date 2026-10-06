import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ai' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-2.5 py-1 text-label-sm rounded-md gap-1',
    md: 'px-3.5 py-2 text-label-md rounded-lg gap-1.5',
    lg: 'px-5 py-2.5 text-body-md rounded-xl gap-2',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-container text-on-primary font-semibold hover:bg-primary transition-all shadow-sm active:scale-[0.98]',
    secondary:
      'bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-medium',
    ai:
      'bg-gradient-to-r from-tertiary-container to-tertiary text-on-tertiary font-semibold hover:opacity-95 shadow-sm transition-all',
    outline:
      'border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container transition-colors',
    ghost:
      'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors',
    danger:
      'bg-error text-on-error font-semibold hover:opacity-95 transition-opacity shadow-sm',
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all select-none disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};
