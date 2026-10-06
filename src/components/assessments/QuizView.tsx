import React, { useState, useEffect } from 'react';
import { QuizAssessment } from '../../types/learning';
import { QUIZ_ASSESSMENT_DATA } from '../../data/quizData';
import { ReactionPathwaySvg } from './ReactionPathwaySvg';

export const QuizView: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizAssessment>(QUIZ_ASSESSMENT_DATA);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-6-a');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(42);
  const [timeLeft, setTimeLeft] = useState(quiz.timeRemainingSeconds);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = quiz.questions[quiz.currentQuestionIndex] || quiz.questions[5];

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setQuiz((prev) => ({
      ...prev,
      answeredQuestions: {
        ...prev.answeredQuestions,
        [currentQ.id]: optionId,
      },
    }));
  };

  const handleNext = () => {
    if (quiz.currentQuestionIndex < quiz.questions.length - 1) {
      setQuiz((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (quiz.currentQuestionIndex > 0) {
      setQuiz((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
      setShowHint(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top Assessment Header matching Stitch */}
      <section className="px-space-md lg:px-space-lg py-3 bg-surface-container-lowest border-b border-surface-container-low shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">quiz</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-body-md font-bold text-on-surface">
              {quiz.title}
            </h1>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {quiz.courseCode} • 12 Questions Total (100 Points)
            </span>
          </div>
        </div>

        {/* Question Palette & Timer */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Question Stepper Pills */}
          <div className="flex items-center gap-1">
            {Array.from({ length: quiz.totalQuestions }).map((_, i) => {
              const qNum = i + 1;
              const isAnswered = i < quiz.currentQuestionIndex;
              const isActive = i === quiz.currentQuestionIndex;

              return (
                <div
                  key={qNum}
                  onClick={() => setQuiz((prev) => ({ ...prev, currentQuestionIndex: i }))}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    isActive
                      ? 'w-10 bg-primary-container animate-pulse shadow-xs'
                      : isAnswered
                      ? 'w-7 bg-secondary'
                      : 'w-6 bg-surface-container-high'
                  }`}
                  title={`Question ${qNum}: ${isActive ? 'Active' : isAnswered ? 'Answered' : 'Unanswered'}`}
                />
              );
            })}
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container font-code-sm text-code-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-error">timer</span>
            <span>{formatTimer(timeLeft)}</span>
          </div>
        </div>
      </section>

      {/* Main Assessment Split View */}
      <div className="max-w-7xl mx-auto w-full p-space-md lg:p-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Center Workspace (Col 8) */}
          <section className="lg:col-span-8 flex flex-col gap-space-md">
            {/* Question Card */}
            <article className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg border border-surface-container-low shadow-sm flex flex-col gap-space-md">
              {/* Tags & Points */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    {currentQ.topic}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-medium">
                    {currentQ.subtopic}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-error-container/60 text-error font-code-sm text-code-sm font-semibold">
                    Difficulty: {currentQ.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm text-outline font-semibold">
                    Points: {currentQ.points}
                  </span>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
                    title="Bookmark Question"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                  </button>
                </div>
              </div>

              {/* Prompt Typography */}
              <div className="space-y-1.5">
                <div className="font-label-sm text-[11px] text-outline uppercase font-semibold">
                  Question {currentQ.number} of {quiz.totalQuestions}
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-relaxed">
                  {currentQ.prompt}
                </h2>
              </div>

              {/* Mechanistic Vector Diagram Surface */}
              <ReactionPathwaySvg />

              {/* Multiple Choice Radio Options */}
              <div className="space-y-3 pt-2">
                <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">
                  Select Configuration & Product Nomenclature:
                </span>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary shadow-xs'
                            : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name={`q-${currentQ.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(opt.id)}
                            className="mt-1 accent-primary w-4 h-4"
                          />
                          <div className="flex-1">
                            <div className="font-label-md text-label-md font-bold text-on-surface">
                              {opt.label}
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                              {opt.nomenclature}
                            </div>

                            {/* Show detailed rationale if selected */}
                            {isSelected && (
                              <div
                                className={`mt-2.5 p-2.5 rounded-lg text-body-sm font-body-sm ${
                                  opt.isCorrect
                                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                    : 'bg-error-container/40 text-on-error-container border border-error-container'
                                }`}
                              >
                                <div className="font-bold mb-0.5 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[16px]">
                                    {opt.isCorrect ? 'check_circle' : 'cancel'}
                                  </span>
                                  <span>{opt.isCorrect ? 'Correct Scientific Rationale' : 'Rationale'}</span>
                                </div>
                                <p className="leading-relaxed">{opt.rationale}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-surface-container-low">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-primary hover:underline font-label-md text-label-md font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span>{showHint ? 'Hide Hint' : 'View Mechanistic Hint'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={quiz.currentQuestionIndex === 0}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
                    className="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md font-semibold disabled:opacity-50"
                  >
                    Next Question
                  </button>
                </div>
              </div>

              {/* Hint Card */}
              {showHint && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-body-sm space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                    Hint:
                  </span>
                  <p>{currentQ.hint}</p>
                </div>
              )}
            </article>
          </section>

          {/* Right Sidebar: Assessment Summary (Col 4) */}
          <aside className="lg:col-span-4 space-y-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
              <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
                Assessment Summary
              </h3>

              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between font-code-sm">
                <span className="text-on-surface-variant">Completed Questions</span>
                <span className="font-bold text-primary">
                  {Object.keys(quiz.answeredQuestions).length} / {quiz.totalQuestions}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between font-code-sm">
                <span className="text-on-surface-variant">Current Estimated Score</span>
                <span className="font-bold text-emerald-600">{score} / 100 Pts</span>
              </div>

              <button
                type="button"
                onClick={() => alert('Assessment finalized! Score submitted to gradebook: 92/100 (Tier A).')}
                className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-xs"
              >
                Submit Assessment
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
