import React from 'react';
import { ArrowRight, Atom, BookOpen, FlaskConical, Sparkles, Award, ShieldCheck, Cpu } from 'lucide-react';

interface LandingPageProps {
  onExploreClick?: () => void;
  onSignInClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExploreClick, onSignInClick }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Atom className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">Proton<span className="text-teal-400">Pages</span></span>
              <span className="ml-2 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20">v2.4 Enterprise</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-slate-200 transition">Features</a>
            <a href="#curriculum" className="hover:text-slate-200 transition">Curriculum</a>
            <a href="#virtual-lab" className="hover:text-slate-200 transition">Virtual Lab</a>
            <a href="#research" className="hover:text-slate-200 transition">Research Data</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onSignInClick} className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition">
              Sign In
            </button>
            <button onClick={onExploreClick} className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20 transition flex items-center gap-1.5">
              Launch Platform <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Next-Generation Computational Chemistry & Virtual Simulation Suite
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master Molecular Sciences with <span className="bg-gradient-to-r from-primary-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Rigorous Precision</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400">
            From 118-element IUPAC quantum datasets and 3D WebGL molecular dynamics to real-time titration curves and thermodynamics balancing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button onClick={onExploreClick} className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm shadow-xl shadow-primary-600/25 transition flex items-center gap-2">
              Start Exploring Free <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onExploreClick} className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition">
              View Syllabus & Datasets
            </button>
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Full-Spectrum Chemical Science Architecture</h2>
          <p className="text-sm text-slate-400 mt-2">Built for university chemistry departments, researchers, and competitive students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 flex items-center justify-center mb-4">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Simulated Wet Lab Instruments</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Titration rigs with real-time pH response, calorimeter chambers, FTIR/UV-Vis spectrophotometers, and chemical mixer dropzones.
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Thermodynamic & Reaction Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gaussian elimination matrix stoich-balancer, Gibbs free energy derivations, van 't Hoff temperature models, and Arrhenius activation plots.
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Accredited ACS Curricula</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eight comprehensive university curricula spanning General, Organic, Physical, Inorganic, and Chemical Biology with step-by-step problem rationales.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>© 2026 Proton Pages Platform. High-fidelity chemistry education and computation.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Academic Citation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
