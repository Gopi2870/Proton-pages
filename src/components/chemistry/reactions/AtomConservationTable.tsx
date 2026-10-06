import React from 'react';
import { ChemicalReaction } from '../../../types/chemistry';

interface AtomConservationTableProps {
  reaction: ChemicalReaction;
}

export const AtomConservationTable: React.FC<AtomConservationTableProps> = ({
  reaction,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
          <h4 className="font-headline-sm text-label-md font-bold text-on-surface">
            Atom Conservation & Matrix Balancing
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-code-sm text-[11px] font-bold">
          Strictly Conserved (ΣReactants = ΣProducts)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead>
            <tr className="border-b border-surface-container-low text-outline font-label-sm text-[11px] uppercase">
              <th className="py-2 px-3">Element</th>
              <th className="py-2 px-3">Reactant Atoms</th>
              <th className="py-2 px-3">Product Atoms</th>
              <th className="py-2 px-3 text-center">Net Balance</th>
              <th className="py-2 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low font-code-sm">
            {reaction.atomBalance.map((item) => (
              <tr key={item.element} className="hover:bg-surface-container-low/50">
                <td className="py-2.5 px-3 font-bold text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
                    {item.element}
                  </span>
                  <span>{item.element}</span>
                </td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">
                  {item.reactantCount} mol-atoms
                </td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">
                  {item.productCount} mol-atoms
                </td>
                <td className="py-2.5 px-3 text-center text-outline">
                  Δ = {item.productCount - item.reactantCount}
                </td>
                <td className="py-2.5 px-3 text-right">
                  {item.balanced ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-error font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px]">error</span>
                      <span>Unbalanced</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
