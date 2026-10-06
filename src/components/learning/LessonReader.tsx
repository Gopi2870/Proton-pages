import React, { useState } from 'react';
import { BookOpen, CheckCircle, ArrowRight, ArrowLeft, Lightbulb, HelpCircle } from 'lucide-react';
import { CurriculumLesson } from '../../types/comprehensiveChemistry';

interface LessonReaderProps {
  lesson?: CurriculumLesson;
  onComplete?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const DEFAULT_LESSON: CurriculumLesson = {
  id: 'les-chem102-m1-l1',
  lessonNumber: '1.1',
  title: 'Chemical Kinetics & Differential Rate Equations',
  durationMinutes: 45,
  summary: 'Mathematical formulation of collision frequency, transition state theory, and empirical reaction order determination.',
  theoryContent: [
    'Chemical kinetics investigates the rates at which chemical processes occur and elucidates the mechanistic elementary steps that transform reactants into products.',
    'Under the collision model, reacting molecules must possess kinetic energy greater than or equal to the activation energy (Ea) and align with correct steric geometry during the collision encounter.',
    'The instantaneous reaction rate is mathematically expressed as the derivative of reactant or product concentration with respect to time, normalized by stoichiometric coefficients: Rate = -(1/a)*d[A]/dt = (1/b)*d[B]/dt.',
    'Differential rate laws relate the reaction rate to reactant concentrations raised to empirical reaction orders determined exclusively via experiment.'
  ],
  keyEquations: [
    'Rate = k * [A]^m * [B]^n',
    'ln[A]t = -kt + ln[A]0 (First-order integrated rate law)',
    '1/[A]t = kt + 1/[A]0 (Second-order integrated rate law)',
    'k = A * exp(-Ea / RT) (Arrhenius equation)'
  ],
  learningObjectives: [
    'Distinguish between reaction rate and the specific reaction rate constant k.',
    'Determine reaction orders using the initial rates method across multiple trials.',
    'Plot linearized integrated rate law data to extract rate constants and half-lives.',
    'Calculate activation energy from experimental Arrhenius temperature-dependent rate constants.'
  ],
  checkpointQuestion: {
    prompt: 'For a reaction that follows second-order kinetics with respect to reactant A, what graphical plot yields a straight line with slope equal to +k?',
    options: [
      '[A] versus time t',
      'ln[A] versus time t',
      '1/[A] versus time t',
      '1/[A]^2 versus time t'
    ],
    correctIndex: 2,
    explanation: 'Integrating the second-order rate equation -d[A]/dt = k[A]^2 yields 1/[A]t = kt + 1/[A]0, which possesses the standard linear form y = mx + c with slope m = +k.'
  }
};

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson = DEFAULT_LESSON,
  onComplete,
  onNext,
  onPrev
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
  };

  const isCorrect = selectedOption === lesson.checkpointQuestion.correctIndex;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-slate-950 text-slate-100">
      {/* Lesson Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20">
            Lesson {lesson.lessonNumber}
          </span>
          <span className="text-xs text-slate-500 font-mono">• {lesson.durationMinutes} min read</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{lesson.title}</h1>
        <p className="text-sm text-slate-400 leading-relaxed">{lesson.summary}</p>
      </div>

      {/* Learning Objectives */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-xs uppercase font-semibold tracking-wider text-teal-400 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Core Learning Objectives
        </h3>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>

      {/* Theory Sections */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs text-slate-400">
          Theoretical Derivation & Principles
        </h2>
        {lesson.theoryContent.map((paragraph, i) => (
          <p key={i} className="text-sm text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-lg border border-slate-900">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Equations Reference */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-xs uppercase font-semibold tracking-wider text-primary-400">
          Canonical Formulae & Mathematical Laws
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {lesson.keyEquations.map((eq, i) => (
            <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
              {eq}
            </div>
          ))}
        </div>
      </div>

      {/* Checkpoint Comprehension Check */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-400">
          <HelpCircle className="w-4 h-4" /> Comprehension Checkpoint Question
        </div>
        <p className="text-sm font-semibold text-white">{lesson.checkpointQuestion.prompt}</p>

        <div className="space-y-2">
          {lesson.checkpointQuestion.options.map((opt, idx) => {
            let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
            if (hasAnswered) {
              if (idx === lesson.checkpointQuestion.correctIndex) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
              } else if (idx === selectedOption) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3 text-left text-xs rounded-lg border transition flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {hasAnswered && idx === lesson.checkpointQuestion.correctIndex && (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className={`p-4 rounded-lg border text-xs leading-relaxed ${
            isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <span className="font-bold">{isCorrect ? 'Correct! ' : 'Incorrect. '}</span>
            {lesson.checkpointQuestion.explanation}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-800 flex justify-between">
        <button
          onClick={onPrev}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Previous Lesson
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition flex items-center gap-1.5"
        >
          Next Lesson <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
