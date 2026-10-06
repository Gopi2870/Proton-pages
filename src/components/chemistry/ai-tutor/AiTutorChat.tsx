import React, { useState } from 'react';
import { ConceptPills } from './ConceptPills';
import { MechanismCard } from './MechanismCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  mechanism?: {
    title: string;
    reactionEquation: string;
    simpleExplanation: string;
    molecularExplanation: string;
    relatedConcepts: string[];
  };
}

export const AiTutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Why does NaCl dissolve readily in water, and what is the thermodynamic driving force?',
      timestamp: '10:42 AM',
    },
    {
      id: 'msg-2',
      sender: 'tutor',
      text: 'Great thermodynamic question, Elena! The dissolution of sodium chloride (NaCl) is primarily governed by the balance between lattice energy and ion hydration enthalpy.',
      timestamp: '10:42 AM',
      mechanism: {
        title: 'Ion-Dipole Hydration & Dielectric Solvation',
        reactionEquation: 'NaCl(s) + H₂O(l) ➔ Na⁺(aq) + Cl⁻(aq)  [ΔH° = +3.88 kJ/mol]',
        simpleExplanation:
          'Although the lattice dissociation of NaCl is slightly endothermic (+3.88 kJ/mol), the process is overwhelmingly driven by the dramatic increase in entropy (ΔS° > 0) as the rigid crystalline lattice breaks down into dispersed, hydrated ions.',
        molecularExplanation:
          'Water has a very high dielectric constant (ε ≈ 78.4 at 25°C). The partially negative oxygen atoms of water coordinate around Na⁺ forming an octahedral solvation sphere, while the partially positive hydrogen atoms solvate Cl⁻ via hydrogen-bond-like electrostatic interactions. The resulting ion-dipole attractions overcome the electrostatic lattice energy.',
        relatedConcepts: ['Lattice Enthalpy', 'Born-Haber Cycle', 'Ion-Dipole Forces', 'Dielectric Constant'],
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI chemistry reasoning
    setTimeout(() => {
      let aiResponseText = `Here is the chemical analysis for your inquiry: "${text}".`;
      let mechanismData;

      if (text.toLowerCase().includes('grignard') || text.toLowerCase().includes('formaldehyde')) {
        aiResponseText =
          'In the Grignard addition to formaldehyde, the nucleophilic carbanion attacks the electrophilic carbonyl carbon to yield a primary alcohol after acidic workup.';
        mechanismData = {
          title: 'Grignard Addition to Formaldehyde',
          reactionEquation: 'R-MgX + H₂C=O ➔ R-CH₂-O⁻ [MgX]⁺ ➔ R-CH₂-OH',
          simpleExplanation:
            'The polarized carbon-magnesium bond (Cδ⁻—Mgδ⁺) acts as a strong nucleophile. Formaldehyde possesses no steric hindrance, ensuring rapid attack at room temperature.',
          molecularExplanation:
            'A 6-membered cyclic transition state involving two Grignard molecules is frequently observed in ether solvent, facilitating coordination of magnesium to carbonyl oxygen before nucleophilic carbanion transfer into the π* (LUMO) orbital.',
          relatedConcepts: ['Organometallics', 'Walden Inversion', 'Schlenk Equilibrium', 'Anhydrous Ethers'],
        };
      } else if (text.toLowerCase().includes('anhydrous') || text.toLowerCase().includes('ether')) {
        aiResponseText =
          'Ethers must be strictly anhydrous because Grignard reagents are extremely strong Brønsted-Lowry bases (pKa of conjugate alkanes ~ 50).';
        mechanismData = {
          title: 'Acid-Base Quenching of Grignard by Water',
          reactionEquation: 'R-MgX + H₂O ➔ R-H (alkane) + Mg(OH)X',
          simpleExplanation:
            'Any trace water immediately protonates the reagent into an unreactive alkane and magnesium hydroxy halide precipitate.',
          molecularExplanation:
            'The basic lone pair on the carbanion extracts H⁺ from water with an exceptionally negative Gibbs free energy (ΔG° << 0), completely destroying the nucleophile before carbonyl reaction can occur.',
          relatedConcepts: ['Brønsted Basicity', 'Protic vs Aprotic', 'Solvent Coordination'],
        };
      }

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mechanism: mechanismData,
      };

      setMessages((prev) => [...prev, tutorMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleResetThread = () => {
    setMessages([
      {
        id: 'msg-start',
        sender: 'tutor',
        text: 'Hello Elena! I am your AI Chemistry Co-Pilot. We can analyze reaction mechanisms, derive equations, explore molecular orbitals, or troubleshoot your lab titrations.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-surface">
      {/* Left Sidebar: Topic context & Prompt shortcuts (320px) */}
      <aside className="w-full lg:w-80 shrink-0 bg-surface-container-lowest border-r border-surface-container-low p-space-md flex flex-col justify-between overflow-y-auto">
        <ConceptPills onSelectPrompt={(p) => handleSendMessage(p)} />

        {/* Engine status indicator */}
        <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed ring-2 ring-secondary animate-pulse" />
            <span className="font-code-sm text-code-sm text-on-surface font-semibold">
              Chemist GPT-4o ChemEngine
            </span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
        </div>
      </aside>

      {/* Center: Conversation Workspace */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-surface">
        {/* Workspace Subheader */}
        <div className="h-12 px-space-lg bg-surface-container-lowest/90 backdrop-blur flex items-center justify-between border-b border-surface-container-low shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[11px] font-bold">
              Proton AI Tutor
            </span>
            <span className="text-outline text-xs">/</span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Organometallics & Reaction Kinetics
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetThread}
              className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Reset Thread</span>
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-space-md lg:p-space-lg space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-sm text-[11px] font-bold text-on-surface">
                  {msg.sender === 'user' ? 'Elena Rostova' : 'Proton AI Chemist'}
                </span>
                <span className="font-code-sm text-[10px] text-outline">{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl p-4 rounded-2xl shadow-xs text-body-md leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary-container text-on-primary rounded-tr-xs'
                    : 'bg-surface-container-lowest text-on-surface rounded-tl-xs border border-surface-container-low'
                }`}
              >
                {msg.text}
              </div>

              {/* Render chemistry mechanism breakdown card if provided */}
              {msg.mechanism && (
                <div className="w-full max-w-2xl mt-3">
                  <MechanismCard
                    title={msg.mechanism.title}
                    reactionEquation={msg.mechanism.reactionEquation}
                    simpleExplanation={msg.mechanism.simpleExplanation}
                    molecularExplanation={msg.mechanism.molecularExplanation}
                    relatedConcepts={msg.mechanism.relatedConcepts}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-surface-container-lowest rounded-xl max-w-xs border border-surface-container-low animate-pulse">
              <span className="material-symbols-outlined text-tertiary text-[20px] animate-spin">
                progress_activity
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Solving chemical equations & orbital flows...
              </span>
            </div>
          )}
        </div>

        {/* Bottom Input Form */}
        <div className="p-space-md bg-surface-container-lowest border-t border-surface-container-low shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about mechanisms, resonance structures, thermodynamic state functions..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                title="Attach Chemical Formula / SMILES"
              >
                <span className="material-symbols-outlined text-[20px]">attachment</span>
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
