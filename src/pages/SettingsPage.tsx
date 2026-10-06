import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, Shield, Sliders } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [siUnits, setSiUnits] = useState(true);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-400" /> Platform Preferences & Calculations
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize simulation units, visualization shaders, notifications, and accessibility modes.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl divide-y divide-slate-800/60">
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-200">Standard SI Thermodynamic Units</h3>
            <p className="text-[11px] text-slate-400">Display energy in Joules (kJ/mol) and temperature in Kelvin (K).</p>
          </div>
          <input
            type="checkbox"
            checked={siUnits}
            onChange={(e) => setSiUnits(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-0"
          />
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-200">High-Contrast Orbital & Grid Shaders</h3>
            <p className="text-[11px] text-slate-400">Increases contrast on 3D molecular meshes and periodic table blocks.</p>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-0"
          />
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-200">Coursework Deadline Notifications</h3>
            <p className="text-[11px] text-slate-400">Receive alerts 24 hours prior to virtual lab assignment due dates.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-teal-600 focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};
