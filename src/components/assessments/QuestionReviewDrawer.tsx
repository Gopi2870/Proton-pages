import React from 'react';
import { X, CheckCircle, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import { ComprehensiveQuestion } from '../../types/comprehensiveChemistry';

interface QuestionReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  question?: ComprehensiveQuestion;
  selectedOptionId?: string;
}

export const QuestionReviewDrawer: React.FC<QuestionReviewDrawerProps> = ({
  isOpen,
  onClose,
  question,
  selectedOptionId
}) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20 font-semibold">
                {question.courseCode} • {question.curriculumStandard}
              </span>
              <h2 className="text-base font-bold text-white mt-1.5">{question.topic}</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {/* Prompt */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-200">
              {question.prompt}
            </div>

            {/* Step-by-Step Rationale */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase text-teal-400 tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Comprehensive Solution Rationale
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-lg border border-slate-900">
                {question.detailedStepByStepSolution}
              </p>
            </div>

            {/* Options Evaluation */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Distractor Analysis
              </h3>
              {question.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-3 rounded-lg border text-xs space-y-1 ${
                    opt.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : opt.id === selectedOptionId
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{opt.text}</span>
                    {opt.isCorrect && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] opacity-80">{opt.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Close Review Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
