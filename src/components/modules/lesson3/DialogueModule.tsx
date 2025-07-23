"use client";

import React, { useState, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { 
  getScenarioByIndex,
  getTotalScenarios,
  initialDialogueState,
  DialogueState 
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
    setModuleState(prev => {
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
        answers: newAnswers
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
    <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-140px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex flex-col px-4 py-6">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 md:mb-8 inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={16} className="mr-2 md:w-5 md:h-5" />
            Back to Module Selection
          </button>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex-1 flex flex-col min-h-0">
          {/* Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
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
              <div className="flex items-center justify-center py-8 md:py-12 flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-green-600 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            {/* Question Section */}
            {currentScenario && showQuestion && !moduleState.isComplete && (
              <div className="p-6 md:p-8 xl:p-10 border-t border-gray-200 dark:border-gray-600">
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
            <div className="text-center p-6 md:p-10 xl:p-12 animate-in fade-in-50 zoom-in-95 duration-500 flex-1 flex flex-col justify-center">
              <div className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="text-green-600 dark:text-green-400">
                  <svg className="w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Dialogue Scenarios Complete!
              </h3>
              
              <div className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base xl:text-lg font-medium mb-8 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ALL SCENARIOS COMPLETED
              </div>
              
              <p className="text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
                You&apos;ve successfully completed all {totalScenarios} dialogue scenarios! 
                You&apos;ve demonstrated your understanding of key workplace communication principles 
                through realistic workplace conversations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold text-base md:text-lg"
                >
                  <RotateCcw size={18} className="mr-2 md:w-5 md:h-5" />
                  Try Different Choices
                </button>
                
                {onComplete && (
                  <button
                    onClick={onComplete}
                    className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base md:text-lg"
                  >
                    Continue to Video Lesson
                  </button>
                )}
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold text-base md:text-lg"
                  >
                    <ArrowLeft size={18} className="mr-2 md:w-5 md:h-5" />
                    Back to Module Selection
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scenario Counter */}
        {!moduleState.isComplete && (
          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Scenario {moduleState.currentScenario + 1} of {totalScenarios}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueModule;