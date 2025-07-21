import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { DialogueQuestion } from '../data/dialogue-scenarios';

interface QuestionSectionProps {
  question: DialogueQuestion;
  isVisible: boolean;
  onAnswer: (optionId: string) => void;
  disabled?: boolean;
  className?: string;
  isLastScenario?: boolean;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  question,
  isVisible,
  onAnswer,
  disabled = false,
  className = '',
  isLastScenario = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (disabled || hasAnswered) return;
    
    setSelectedOption(optionId);
    setShowResult(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setHasAnswered(false);
  };

  // Reset when question changes
  React.useEffect(() => {
    resetQuestion();
  }, [question.question]);

  if (!isVisible) return null;

  const selectedAnswer = selectedOption ? question.options.find(opt => opt.id === selectedOption) : null;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Question
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
          {question.question}
        </p>
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = showResult && option.isCorrect;
          const showIncorrect = showResult && isSelected && !option.isCorrect;
          
          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={disabled || hasAnswered}
              className={`
                group relative p-6 rounded-xl border-2 text-left transition-all duration-300 transform
                ${
                  disabled || hasAnswered
                    ? 'cursor-not-allowed'
                    : 'hover:scale-[1.02] hover:shadow-lg cursor-pointer'
                }
                ${
                  showCorrect
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                    : showIncorrect
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : isSelected
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0
                    ${
                      showCorrect
                        ? 'bg-green-600'
                        : showIncorrect
                        ? 'bg-red-600'
                        : isSelected
                        ? 'bg-blue-600'
                        : 'bg-gray-500'
                    }
                  `}
                >
                  {showResult && option.isCorrect ? (
                    <Check size={20} />
                  ) : showResult && isSelected && !option.isCorrect ? (
                    <X size={20} />
                  ) : (
                    option.id
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {option.text}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Result explanation */}
      {showResult && selectedAnswer && (
        <div className="max-w-4xl mx-auto mt-8 animate-in fade-in-50 zoom-in-95 duration-500">
          <div 
            className={`
              p-6 rounded-xl border-2
              ${
                selectedAnswer.isCorrect
                  ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-400 bg-red-50 dark:bg-red-900/20'
              }
            `}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${
                    selectedAnswer.isCorrect
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }
                `}
              >
                {selectedAnswer.isCorrect ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <X size={20} className="text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 
                  className={`
                    font-semibold mb-2
                    ${
                      selectedAnswer.isCorrect
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }
                  `}
                >
                  {selectedAnswer.isCorrect ? 'Correct!' : 'Not quite right'}
                </h4>
                <p 
                  className={`
                    ${
                      selectedAnswer.isCorrect
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }
                  `}
                >
                  {selectedAnswer.explanation}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={handleNext}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium transform hover:scale-105"
            >
              {isLastScenario ? 'Complete Module' : 'Next Scenario'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSection;