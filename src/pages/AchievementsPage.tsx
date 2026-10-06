import React from 'react';
import { Award, Trophy, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  tier: 'Gold' | 'Platinum' | 'Diamond';
  xp: number;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'ac-1', title: 'Walden Inversion Master', description: 'Correctly mapped backside SN2 nucleophilic attack in 25 chiral centers.', icon: '⚡', unlockedAt: 'Yesterday', tier: 'Gold', xp: 500 },
  { id: 'ac-2', title: 'Equilibrium Virtuoso', description: 'Solved 50 Henderson-Hasselbalch and Le Chatelier equilibrium simulations with zero hints.', icon: '🧪', unlockedAt: '3 days ago', tier: 'Platinum', xp: 1200 },
  { id: 'ac-3', title: 'Spectroscopic Elucidator', description: 'Deciphered 15 unknown constitutional isomers via coupled 1H-NMR and FTIR spectra.', icon: '🔬', unlockedAt: 'Oct 02, 2026', tier: 'Diamond', xp: 2500 },
  { id: 'ac-4', title: 'Perfect Titration Curve', description: 'Arrested burette titrant delivery within 0.02 mL of true stoichiometric equivalence point.', icon: '🎯', unlockedAt: 'Sep 29, 2026', tier: 'Gold', xp: 750 }
];

export const AchievementsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" /> Chemistry Honours & Badges
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Milestone certificates, laboratory competencies, and cognitive mastery achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total XP Earned" value="18,450 XP" change="Level 24 Scholar" isPositive icon={<Zap className="w-4 h-4 text-amber-400" />} />
        <StatCard title="Badges Unlocked" value="28 / 35" subtitle="80% total awards" icon={<Award className="w-4 h-4 text-primary-400" />} />
        <StatCard title="Department Rank" value="#4 of 420" change="Top 1%" isPositive icon={<Trophy className="w-4 h-4 text-teal-400" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS_DATA.map((ach) => (
          <div key={ach.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner">
              {ach.icon}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  +{ach.xp} XP
                </span>
              </div>
              <p className="text-xs text-slate-400">{ach.description}</p>
              <div className="pt-2 text-[10px] text-slate-500 flex justify-between">
                <span>Tier: {ach.tier}</span>
                <span>Unlocked {ach.unlockedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
