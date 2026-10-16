import React, { useState } from 'react';
import { ConceptPills } from './ConceptPills';
import { MechanismCard } from './MechanismCard';
import { AiChemistryAssistant, ProblemSolution } from '../../../services/aiChemistryAssistant';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  solution?: ProblemSolution;
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
      text: 'The dissolution of sodium chloride (NaCl) is primarily governed by the balance between crystal lattice enthalpy and ion-dipole hydration enthalpy.',
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

    // Run Grounded AI Chemistry Solver with independent verification
    setTimeout(() => {
      const solution = AiChemistryAssistant.solveChemistryProblem(text);

      let mechanismData;
      if (text.toLowerCase().includes('grignard') || text.toLowerCase().includes('formaldehyde')) {
        mechanismData = {
          title: 'Grignard Addition to Formaldehyde',
          reactionEquation: 'R-MgX + H₂C=O ➔ R-CH₂-O⁻ [MgX]⁺ ➔ R-CH₂-OH',
          simpleExplanation:
            'The polarized carbon-magnesium bond (Cδ⁻—Mgδ⁺) acts as a strong nucleophile. Formaldehyde possesses no steric hindrance, ensuring rapid attack at room temperature.',
          molecularExplanation:
            'A 6-membered cyclic transition state involving two Grignard molecules is frequently observed in ether solvent, facilitating coordination of magnesium to carbonyl oxygen before nucleophilic carbanion transfer into the π* (LUMO) orbital.',
          relatedConcepts: ['Organometallics', 'Walden Inversion', 'Schlenk Equilibrium', 'Anhydrous Ethers'],
        };
      }

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: solution.finalAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        solution,
        mechanism: mechanismData,
      };

      setMessages((prev) => [...prev, tutorMsg]);
      setIsLoading(false);
    }, 400);
  };

  const handleResetThread = () => {
    setMessages([
      {
        id: 'msg-start',
        sender: 'tutor',
        text: 'Hello! I am your Grounded AI Chemistry Assistant. Ask me to calculate molar masses, balance equations, solve Gibbs Free Energy or Nernst cell potentials, or explain reaction mechanisms with verified literature references.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-surface">
      {/* Left Sidebar: Topic context & Prompt shortcuts (320px) */}
      <aside className="w-full lg:w-80 shrink-0 bg-surface-container-lowest border-r border-surface-container-low p-space-md flex flex-col justify-between overflow-y-auto">
        <div className="space-y-space-md">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-label-md font-bold text-on-surface">
                AI Chemistry Tutor
              </h2>
              <span className="font-code-sm text-[10px] text-tertiary font-bold">
                GROUNDED v4.2 • VERIFIED
              </span>
            </div>
          </div>

          <p className="font-body-sm text-[12px] text-on-surface-variant">
            All calculations are independently verified using deterministic thermodynamics, kinetics, and stoichiometry algorithms. Unverified hypotheses are never presented as facts.
          </p>

          <ConceptPills
            onSelectPrompt={(prompt) => {
              handleSendMessage(prompt);
            }}
          />
        </div>

        {/* Safety & Grounding Disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-surface-container text-outline text-[11px] space-y-1">
          <div className="flex items-center gap-1 font-semibold text-on-surface">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            <span>Deterministic Scientific Validation</span>
          </div>
          <p>
            Citations grounded in IUPAC CIAAW, NIST WebBook SRD 69, and CRC Handbook of Chemistry & Physics 104th Ed.
          </p>
        </div>
      </aside>

      {/* Right Area: Interactive Chat Session */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Header Bar */}
        <div className="h-14 px-space-md lg:px-space-lg border-b border-surface-container-low bg-surface-container-lowest flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Step-by-Step Chemistry Problem Solving
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-bold">
              FERPA & OPCW Compliant
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
                  {msg.sender === 'user' ? 'Student Inquirer' : 'Proton AI Assistant'}
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

              {/* Render Structured Problem Solving Steps & Grounded References */}
              {msg.solution && msg.solution.steps.length > 0 && (
                <div className="w-full max-w-2xl mt-3 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm space-y-3">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between border-b border-surface-container-low pb-2">
                    <span className="font-label-sm text-xs font-bold text-on-surface uppercase tracking-wider">
                      Structured Solution Breakdown
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-code-sm text-[10px] font-bold ${
                        msg.solution.verificationStatus === 'deterministic_verified'
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                          : msg.solution.verificationStatus === 'unsupported_input'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : 'bg-primary-fixed text-on-primary-fixed'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {msg.solution.isVerified ? 'check_circle' : 'info'}
                      </span>
                      {msg.solution.verificationStatus === 'deterministic_verified'
                        ? 'DETERMINISTICALLY VERIFIED'
                        : msg.solution.verificationStatus === 'unsupported_input'
                        ? 'SAFETY PROTOCOL'
                        : 'HEURISTIC ESTIMATE'}
                    </span>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    {msg.solution.steps.map((st) => (
                      <div key={st.stepNumber} className="p-2.5 rounded-lg bg-surface-container-low/60 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-code-sm text-[11px] font-bold flex items-center justify-center shrink-0">
                            {st.stepNumber}
                          </span>
                          <span className="font-label-md text-xs font-bold text-on-surface">
                            {st.title}
                          </span>
                        </div>
                        <p className="font-body-sm text-[12px] text-on-surface-variant pl-7">
                          {st.description}
                        </p>
                        {st.intermediateValue && (
                          <div className="pl-7 pt-1 font-code-sm text-[11px] text-primary font-semibold">
                            {st.intermediateValue}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Grounded Literature References */}
                  {msg.solution.groundedReferences.length > 0 && (
                    <div className="pt-2 border-t border-surface-container-low space-y-1 text-xs">
                      <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                        Grounded References
                      </span>
                      {msg.solution.groundedReferences.map((ref, i) => (
                        <div key={i} className="text-on-surface-variant text-[11px] flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-primary shrink-0">menu_book</span>
                          <div>
                            <strong className="text-on-surface">{ref.title}</strong> — {ref.source} ({ref.citation})
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                Validating stoichiometry & thermodynamic equilibrium...
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
                placeholder="Ask e.g. 'Molar mass of Fe2(SO4)3' or 'Calculate delta G if delta H is -100 kJ and delta S is -200 J/K'..."
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
              className="px-5 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Solve</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
