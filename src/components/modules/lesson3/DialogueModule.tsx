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
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Module Selection
          </button>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Current Scenario */}
          {currentScenario && !moduleState.isComplete && (
            <div>
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
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          {/* Question Section */}
          {currentScenario && showQuestion && !moduleState.isComplete && (
            <div className="p-8">
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

          {/* Module Complete */}
          {moduleState.isComplete && (
            <div className="text-center p-8 animate-in fade-in-50 zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-green-600 dark:text-green-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Dialogue Scenarios Complete!
              </h3>
              
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ALL SCENARIOS COMPLETED
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                You&apos;ve successfully completed all {totalScenarios} dialogue scenarios! 
                You&apos;ve demonstrated your understanding of key workplace communication principles 
                through realistic workplace conversations.
              </p>
              
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Try Different Choices
                </button>
                
                {onComplete && (
                  <button
                    onClick={onComplete}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Continue to Video Lesson
                  </button>
                )}
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Module Selection
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scenario Counter */}
        {!moduleState.isComplete && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scenario {moduleState.currentScenario + 1} of {totalScenarios}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueModule;