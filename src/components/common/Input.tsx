import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  unit?: string;
  shortcut?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, unit, shortcut, containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`relative flex items-center w-full ${containerClassName}`}>
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all py-2 ${
            icon ? 'pl-9' : 'pl-3'
          } ${unit || shortcut ? 'pr-14' : 'pr-3'} ${className}`}
          {...props}
        />
        {unit && (
          <span className="absolute right-3 font-code-sm text-code-sm text-outline pointer-events-none">
            {unit}
          </span>
        )}
        {shortcut && (
          <kbd className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-[10px] pointer-events-none">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
