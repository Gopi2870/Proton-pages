import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { UserProfile } from '../../types/navigation';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [tempUnit, setTempUnit] = useState<'K' | 'C'>('K');
  const [gpuAcceleration, setGpuAcceleration] = useState(true);
  const [precisionDigits, setPrecisionDigits] = useState(4);
  const [autoBalance, setAutoBalance] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Workbench Preferences & Profile" icon="settings">
      <div className="space-y-6">
        {/* User Profile Card */}
        <div className="p-4 rounded-xl bg-surface-container-low flex items-center gap-4">
          <img
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-container"
            src={user.avatarUrl}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
              {user.name}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              {user.role} • {user.institution}
            </p>
            <div className="flex items-center gap-3 mt-1.5 font-code-sm text-code-sm">
              <span className="text-primary font-semibold">🔥 {user.streakDays}-Day Streak</span>
              <span className="text-secondary font-semibold">⚡ {user.xpEarned} XP</span>
            </div>
          </div>
        </div>

        {/* Scientific Configuration */}
        <div className="space-y-4">
          <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Scientific Computational Settings
          </h4>

          {/* Temperature unit */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low">
            <div>
              <div className="font-label-md text-label-md font-semibold text-on-surface">
                Thermodynamic Temperature Scale
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Display enthalpy and equilibrium units in Kelvin (K) or Celsius (°C)
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setTempUnit('K')}
                className={`px-3 py-1 rounded-md font-code-sm text-code-sm font-semibold transition-all ${
                  tempUnit === 'K'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
              >
                Kelvin (K)
              </button>
              <button
                type="button"
                onClick={() => setTempUnit('C')}
                className={`px-3 py-1 rounded-md font-code-sm text-code-sm font-semibold transition-all ${
                  tempUnit === 'C'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
              >
                Celsius (°C)
              </button>
            </div>
          </div>

          {/* GPU WebGL Acceleration */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low">
            <div>
              <div className="font-label-md text-label-md font-semibold text-on-surface">
                Hardware GPU Acceleration (WebGL 2.0)
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Enables 60fps 3D ball-and-stick and space-filling molecular shader rendering
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGpuAcceleration(!gpuAcceleration)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                gpuAcceleration ? 'bg-secondary' : 'bg-surface-container-high'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-surface-container-lowest transition-transform ${
                  gpuAcceleration ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Significant Digits */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low">
            <div>
              <div className="font-label-md text-label-md font-semibold text-on-surface">
                Stoichiometric Numeric Precision
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Molar masses and volumetric decimal places
              </div>
            </div>
            <select
              value={precisionDigits}
              onChange={(e) => setPrecisionDigits(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-code-sm text-code-sm border border-surface-container-high focus:outline-none"
            >
              <option value={2}>2 Decimal Places</option>
              <option value={3}>3 Decimal Places</option>
              <option value={4}>4 Significant Figures (Standard)</option>
              <option value={6}>6 High Precision (Analytical)</option>
            </select>
          </div>

          {/* Auto matrix balancing */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low">
            <div>
              <div className="font-label-md text-label-md font-semibold text-on-surface">
                Auto Matrix Inversion Balancer
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Solve stoichiometric conservation coefficients in real time while typing
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoBalance(!autoBalance)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                autoBalance ? 'bg-primary' : 'bg-surface-container-high'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-surface-container-lowest transition-transform ${
                  autoBalance ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-low">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </Modal>
  );
};
