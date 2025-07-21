"use client";

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { 
  getScenarioById, 
  getNextScenario, 
  initialState,
  ModuleState 
} from './data/scenarios';
import Stepper from './components/Stepper';
import ScenarioDisplay from './components/ScenarioDisplay';
import ChoiceButtons from './components/ChoiceButtons';

const CultureCrossroads = () => {
  const [moduleState, setModuleState] = useState<ModuleState>(initialState);
  const [showChoices, setShowChoices] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);



  const handleScenarioComplete = () => {
    const currentScenario = getScenarioById(moduleState.currentScenario);
    
    if (currentScenario?.choices && !currentScenario.isEnd) {
      setTimeout(() => {
        setShowChoices(true);
      }, 500);
    } else if (currentScenario?.isEnd) {
      setModuleState(prev => ({ ...prev, isComplete: true }));
    }
  };

  const handleChoice = (choiceId: string) => {
    const currentScenario = getScenarioById(moduleState.currentScenario);
    if (!currentScenario) return;

    const nextScenarioId = getNextScenario(currentScenario, choiceId);
    if (!nextScenarioId) return;

    setIsTransitioning(true);
    setShowChoices(false);

    // Update state with choice and move to next scenario
    setModuleState(prev => {
      const newChoices = { ...prev.choices, [prev.currentStep]: choiceId };
      const nextScenario = getScenarioById(nextScenarioId);
      
      return {
        ...prev,
        currentStep: nextScenario?.step || prev.currentStep + 1,
        currentScenario: nextScenarioId,
        choices: newChoices,
        branch: nextScenario?.branch || prev.branch
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <Stepper 
          currentStep={moduleState.currentStep} 
          totalSteps={4}
          className="mb-12"
        />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Current Scenario */}
          {currentScenario && (
            <div className="mb-8">
              <ScenarioDisplay
                content={currentScenario.content}
                isVisible={!isTransitioning}
                onComplete={handleScenarioComplete}
              />
            </div>
          )}

          {/* Loading State */}
          {isTransitioning && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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

          {/* Module Complete */}
          {moduleState.isComplete && (
            <div className="text-center py-8 animate-in fade-in-50 zoom-in-95 duration-500">
              {(() => {
                const endingType = currentScenario?.endingType || 'POSITIVE';
                const endingConfig = {
                  POSITIVE: {
                    bgColor: 'bg-green-100 dark:bg-green-900',
                    textColor: 'text-green-600 dark:text-green-400',
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    title: 'Excellent Leadership!'
                  },
                  MIXED: {
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
                    textColor: 'text-yellow-600 dark:text-yellow-400',
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    ),
                    title: 'Mixed Results'
                  },
                  NEGATIVE: {
                    bgColor: 'bg-red-100 dark:bg-red-900',
                    textColor: 'text-red-600 dark:text-red-400',
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ),
                    title: 'Leadership Challenge'
                  }
                };
                const config = endingConfig[endingType];
                
                return (
                  <>
                    <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <div className={config.textColor}>
                        {config.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {config.title}
                    </h3>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                      endingType === 'POSITIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      endingType === 'MIXED' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {endingType} ENDING
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                      You&apos;ve completed your leadership journey! Each choice you made shaped the team culture and outcomes. 
                      {endingType === 'POSITIVE' && ' Your collaborative and empathetic approach created a thriving workplace environment.'}
                      {endingType === 'MIXED' && ' Your leadership had both positive and negative impacts, showing areas for growth.'}
                      {endingType === 'NEGATIVE' && ' This path highlights important lessons about the consequences of certain leadership styles.'}
                    </p>
                    
                    <div className="space-y-4">
                      <button
                        onClick={handleRestart}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <RotateCcw size={18} className="mr-2" />
                        Try Different Choices
                      </button>
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