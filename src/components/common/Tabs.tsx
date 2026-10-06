import React from 'react';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  count?: number | string;
  icon?: string;
}

interface TabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
}: TabsProps<T>) {
  const sizeClasses = size === 'sm' ? 'py-1 px-2 text-label-sm' : 'py-1.5 px-3 text-label-md';

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 bg-surface-container-low rounded-xl text-center select-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
            className={`flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all ${sizeClasses} ${
              isActive
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
            }`}
          >
            {tab.icon && (
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full font-code-sm text-[10px] ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
