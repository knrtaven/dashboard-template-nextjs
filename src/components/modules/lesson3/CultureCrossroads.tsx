'use client';

import React, { useState, useCallback } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { getScenarioById, getNextScenario, initialState, ModuleState } from './data/scenarios';
import Stepper from './components/Stepper';
import ScenarioDisplay from './components/ScenarioDisplay';
import ChoiceButtons from './components/ChoiceButtons';

interface CultureCrossroadsProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const CultureCrossroads: React.FC<CultureCrossroadsProps> = ({ onBack, onComplete }) => {
  const [moduleState, setModuleState] = useState<ModuleState>(initialState);
  const [showChoices, setShowChoices] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleScenarioComplete = useCallback(() => {
    const currentScenario = getScenarioById(moduleState.currentScenario);

    if (currentScenario?.choices && !currentScenario.isEnd) {
      setTimeout(() => {
        setShowChoices(true);
      }, 500);
    } else if (currentScenario?.isEnd) {
      setModuleState((prev) => ({ ...prev, isComplete: true }));
    }
  }, [moduleState.currentScenario]);

  const handleChoice = (choiceId: string) => {
    const currentScenario = getScenarioById(moduleState.currentScenario);
    if (!currentScenario) return;

    const nextScenarioId = getNextScenario(currentScenario, choiceId);
    if (!nextScenarioId) return;

    setIsTransitioning(true);
    setShowChoices(false);

    // Update state with choice and move to next scenario
    setModuleState((prev) => {
      const newChoices = { ...prev.choices, [prev.currentStep]: choiceId };
      const nextScenario = getScenarioById(nextScenarioId);

      return {
        ...prev,
        currentStep: nextScenario?.step || prev.currentStep + 1,
        currentScenario: nextScenarioId,
        choices: newChoices,
        branch: nextScenario?.branch || prev.branch,
      };
    });

    // Small delay before showing next scenario
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handleRestart = () => {
    setModuleState(initialState);
    setShowChoices(false);
    setIsTransitioning(false);
  };

  const currentScenario = getScenarioById(moduleState.currentScenario);

  return (
    <div className="flex min-h-[calc(100vh-57px)] flex-col bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-6 md:min-h-[calc(100vh-140px)] dark:from-gray-900 dark:to-blue-900">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
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

        {/* Stepper */}
        <Stepper
          currentStep={moduleState.currentStep}
          totalSteps={4}
          className="mb-6 md:mb-8 xl:mb-10"
        />

        <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-white p-6 shadow-xl md:p-10 xl:p-12 dark:bg-gray-800">
          {/* Content Area */}
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            {/* Current Scenario */}
            {currentScenario && (
              <div className="mb-8 md:mb-10">
                <ScenarioDisplay
                  content={currentScenario.content}
                  isVisible={!isTransitioning}
                  onComplete={handleScenarioComplete}
                />
              </div>
            )}

            {/* Loading State */}
            {isTransitioning && (
              <div className="flex items-center justify-center py-8 md:py-12">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 animate-bounce rounded-full bg-blue-600 md:h-5 md:w-5"></div>
                  <div
                    className="h-4 w-4 animate-bounce rounded-full bg-purple-600 md:h-5 md:w-5"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-4 w-4 animate-bounce rounded-full bg-indigo-600 md:h-5 md:w-5"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            )}

            {/* Choice Buttons */}
            {currentScenario?.choices && !currentScenario.isEnd && (
              <ChoiceButtons
                choices={currentScenario.choices}
                onChoice={handleChoice}
                isVisible={showChoices && !isTransitioning}
                disabled={isTransitioning}
              />
            )}
          </div>

          {/* Module Complete */}
          {moduleState.isComplete && (
            <div className="animate-in fade-in-50 zoom-in-95 flex flex-1 flex-col justify-center py-6 text-center duration-500 md:py-8 xl:py-10">
              {(() => {
                const endingType = currentScenario?.endingType || 'POSITIVE';
                const endingConfig = {
                  POSITIVE: {
                    bgColor: 'bg-green-100 dark:bg-green-900',
                    textColor: 'text-green-600 dark:text-green-400',
                    icon: (
                      <svg
                        className="h-10 w-10"
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
                    ),
                    title: 'Excellent Leadership!',
                  },
                  MIXED: {
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
                    textColor: 'text-yellow-600 dark:text-yellow-400',
                    icon: (
                      <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    ),
                    title: 'Mixed Results',
                  },
                  NEGATIVE: {
                    bgColor: 'bg-red-100 dark:bg-red-900',
                    textColor: 'text-red-600 dark:text-red-400',
                    icon: (
                      <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ),
                    title: 'Leadership Challenge',
                  },
                };
                const config = endingConfig[endingType];

                return (
                  <>
                    <div
                      className={`h-20 w-20 md:h-24 md:w-24 xl:h-28 xl:w-28 ${config.bgColor} mx-auto mb-6 flex items-center justify-center rounded-full md:mb-8`}
                    >
                      <div className={config.textColor}>{config.icon}</div>
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900 md:mb-6 md:text-3xl xl:text-4xl dark:text-white">
                      {config.title}
                    </h3>

                    <div
                      className={`mb-6 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        endingType === 'POSITIVE'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : endingType === 'MIXED'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {endingType} ENDING
                    </div>

                    <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-gray-600 md:mb-10 md:text-lg xl:text-xl dark:text-gray-300">
                      You&apos;ve completed your leadership journey! Each choice you made shaped the
                      team culture and outcomes.
                      {endingType === 'POSITIVE' &&
                        ' Your collaborative and empathetic approach created a thriving workplace environment.'}
                      {endingType === 'MIXED' &&
                        ' Your leadership had both positive and negative impacts, showing areas for growth.'}
                      {endingType === 'NEGATIVE' &&
                        ' This path highlights important lessons about the consequences of certain leadership styles.'}
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
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CultureCrossroads;
