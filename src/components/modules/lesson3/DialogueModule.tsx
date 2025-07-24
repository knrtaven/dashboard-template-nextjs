'use client';

import React, { useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import {
  getScenarioByIndex,
  getTotalScenarios,
  initialDialogueState,
  DialogueState,
} from './data/dialogue-scenarios';
import DialogueDisplay from './components/DialogueDisplay';
import QuestionSection from './components/QuestionSection';

interface DialogueModuleProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const DialogueModule: React.FC<DialogueModuleProps> = ({ onBack, onComplete }) => {
  const [moduleState, setModuleState] = useState<DialogueState>(initialDialogueState);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDialogueComplete = useCallback(() => {
    setTimeout(() => {
      setShowQuestion(true);
    }, 500);
  }, []);

  const handleAnswer = (optionId: string) => {
    setIsTransitioning(true);
    setShowQuestion(false);

    // Update state with answer
    setModuleState((prev) => {
      const newAnswers = { ...prev.answers, [prev.currentScenario]: optionId };
      const newCompletedScenarios = [...prev.completedScenarios];

      if (!newCompletedScenarios.includes(prev.currentScenario)) {
        newCompletedScenarios.push(prev.currentScenario);
      }

      const nextScenario = prev.currentScenario + 1;
      const totalScenarios = getTotalScenarios();

      return {
        ...prev,
        currentScenario: nextScenario < totalScenarios ? nextScenario : prev.currentScenario,
        completedScenarios: newCompletedScenarios,
        isComplete: nextScenario >= totalScenarios,
        answers: newAnswers,
      };
    });

    // Small delay before showing next scenario
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const handleRestart = () => {
    setModuleState(initialDialogueState);
    setShowQuestion(false);
    setIsTransitioning(false);
  };

  const currentScenario = getScenarioByIndex(moduleState.currentScenario);
  const totalScenarios = getTotalScenarios();

  return (
    <div className="flex min-h-[calc(100vh-57px)] flex-col bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-6 md:min-h-[calc(100vh-140px)] dark:from-gray-900 dark:to-blue-900">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900 md:mb-8 md:text-base dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2 md:h-5 md:w-5" />
            Back to Module Selection
          </button>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
          {/* Content Area */}
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Current Scenario */}
            {currentScenario && !moduleState.isComplete && (
              <div className="flex-1">
                {/* Dialogue Display */}
                <DialogueDisplay
                  dialogue={currentScenario.dialogue}
                  isVisible={!isTransitioning}
                  onComplete={handleDialogueComplete}
                  className=""
                />
              </div>
            )}

            {/* Loading State */}
            {isTransitioning && (
              <div className="flex flex-1 items-center justify-center py-8 md:py-12">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 animate-bounce rounded-full bg-green-600 md:h-5 md:w-5"></div>
                  <div
                    className="h-4 w-4 animate-bounce rounded-full bg-teal-600 md:h-5 md:w-5"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-4 w-4 animate-bounce rounded-full bg-blue-600 md:h-5 md:w-5"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            )}

            {/* Question Section */}
            {currentScenario && showQuestion && !moduleState.isComplete && (
              <div className="border-t border-gray-200 p-6 md:p-8 xl:p-10 dark:border-gray-600">
                <QuestionSection
                  question={currentScenario.question}
                  isVisible={!isTransitioning}
                  onAnswer={handleAnswer}
                  disabled={isTransitioning}
                  className=""
                  isLastScenario={moduleState.currentScenario === totalScenarios - 1}
                />
              </div>
            )}
          </div>

          {/* Module Complete */}
          {moduleState.isComplete && (
            <div className="animate-in fade-in-50 zoom-in-95 flex flex-1 flex-col justify-center p-6 text-center duration-500 md:p-10 xl:p-12">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 md:h-28 md:w-28 xl:h-32 xl:w-32 dark:bg-green-900">
                <div className="text-green-600 dark:text-green-400">
                  <svg
                    className="h-12 w-12 md:h-14 md:w-14 xl:h-16 xl:w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl xl:text-4xl dark:text-white">
                Dialogue Scenarios Complete!
              </h3>

              <div className="mb-8 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 md:px-6 md:py-3 md:text-base xl:text-lg dark:bg-green-900 dark:text-green-200">
                ALL SCENARIOS COMPLETED
              </div>

              <p className="mx-auto mb-10 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg xl:text-xl dark:text-gray-300">
                You&apos;ve successfully completed all {totalScenarios} dialogue scenarios!
                You&apos;ve demonstrated your understanding of key workplace communication
                principles through realistic workplace conversations.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-gray-700 md:px-10 md:py-5 md:text-lg"
                >
                  <RotateCcw size={18} className="mr-2 md:h-5 md:w-5" />
                  Try Different Choices
                </button>

                {onComplete && (
                  <button
                    onClick={onComplete}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-700 md:px-10 md:py-5 md:text-lg"
                  >
                    Continue
                  </button>
                )}

                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center justify-center rounded-xl bg-gray-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-gray-700 md:px-10 md:py-5 md:text-lg"
                  >
                    <ArrowLeft size={18} className="mr-2 md:h-5 md:w-5" />
                    Back to Module Selection
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scenario Counter */}
        {!moduleState.isComplete && (
          <div className="mt-6 text-center md:mt-8">
            <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">
              Scenario {moduleState.currentScenario + 1} of {totalScenarios}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueModule;
