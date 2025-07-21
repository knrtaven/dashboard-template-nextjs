"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
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
  const [currentSection, setCurrentSection] = useState(0);
  const [moduleState, setModuleState] = useState<ModuleState>(initialState);
  const [showChoices, setShowChoices] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  // Lock scrolling for hero and intro sections
  useEffect(() => {
    if (currentSection <= 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; 
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentSection]);

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
    setCurrentSection(2); // Go back to interactive section
    setShowChoices(false);
    setIsTransitioning(false);
  };

  const currentScenario = getScenarioById(moduleState.currentScenario);

  const sections = [
    // Hero Section
    {
      id: 'hero',
      content: (
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              Culture Crossroads
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              Your decisions shape the workplace culture
            </p>
            <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-500">
              <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
                Navigate through challenging workplace scenarios and discover how your leadership choices impact team dynamics, collaboration, and organizational culture.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" 
               onClick={() => navigateToSection(1)}>
            <ChevronDown size={32} className="text-white opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )
    },

    // Introduction Section
    {
      id: 'intro',
      content: (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Interactive Leadership Journey
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Read Scenarios</h3>
                <p className="text-gray-600 dark:text-gray-300">Experience realistic workplace challenges as they unfold</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Make Choices</h3>
                <p className="text-gray-600 dark:text-gray-300">Decide how to respond to each leadership challenge</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Learn Outcomes</h3>
                <p className="text-gray-600 dark:text-gray-300">Discover the impact of your decisions on team culture</p>
              </div>
            </div>

            <button
              onClick={() => navigateToSection(2)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Begin Interactive Journey
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronUp 
              size={32} 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" 
              onClick={() => navigateToSection(0)}
            />
          </div>
        </div>
      )
    },

    // Interactive Section
    {
      id: 'interactive',
      content: (
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
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Journey Complete!
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    You&apos;ve navigated through the workplace scenarios and experienced how different leadership approaches can shape team culture. 
                    Your choices in branch &ldquo;{moduleState.branch}&rdquo; led to valuable insights about {moduleState.branch === 'option1' ? 'proactive leadership and inclusive decision-making' : 'reactive leadership and its workplace consequences'}.
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
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => navigateToSection(1)}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronUp size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`transition-opacity duration-500 ${
            currentSection === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
          }`}
        >
          {section.content}
        </div>
      ))}
    </div>
  );
};

export default CultureCrossroads;