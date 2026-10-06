import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsNavProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
      <button className="hover:text-slate-200 transition flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-slate-500" />
      </button>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
          {item.active ? (
            <span className="text-teal-400 font-semibold">{item.label}</span>
          ) : (
            <button onClick={item.onClick} className="hover:text-slate-200 transition">
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
