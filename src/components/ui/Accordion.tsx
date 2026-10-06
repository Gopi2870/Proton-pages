import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  sections: AccordionSection[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ sections, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([sections[0]?.id || '']);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
      {sections.map((sec) => {
        const isOpen = openIds.includes(sec.id);
        return (
          <div key={sec.id} className="transition">
            <button
              onClick={() => handleToggle(sec.id)}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:bg-slate-800/30 transition"
            >
              <span>{sec.title}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 bg-slate-950/20">
                {sec.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
