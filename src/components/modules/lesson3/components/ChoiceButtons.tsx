import React, { useState } from 'react';
import { Choice } from '../data/scenarios';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoice: (choiceId: string) => void;
  isVisible: boolean;
  disabled?: boolean;
  className?: string;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  choices,
  onChoice,
  isVisible,
  disabled = false,
  className = ''
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleChoiceClick = (choiceId: string) => {
    if (disabled) return;
    
    setSelectedChoice(choiceId);
    setIsConfirming(true);
  };

  const handleConfirm = () => {
    if (selectedChoice) {
      onChoice(selectedChoice);
      setSelectedChoice(null);
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setSelectedChoice(null);
    setIsConfirming(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Choice Selection */}
      {!isConfirming && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            What do you choose to do?
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceClick(choice.id)}
                disabled={disabled}
                className={`
                  group relative p-6 rounded-xl border-2 text-left transition-all duration-300 transform
                  ${
                    disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-[1.02] hover:shadow-lg cursor-pointer'
                  }
                  ${
                    index === 0
                      ? 'border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:hover:border-blue-600'
                      : 'border-purple-200 bg-purple-50 hover:border-purple-400 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-900/20 dark:hover:border-purple-600'
                  }
                `}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0
                      ${
                        index === 0
                          ? 'bg-blue-600 group-hover:bg-blue-700'
                          : 'bg-purple-600 group-hover:bg-purple-700'
                      }
                    `}
                  >
                    {index === 0 ? 'A' : 'B'}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {choice.text}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {choice.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div
                  className={`
                    absolute top-3 right-3 w-4 h-4 rounded-full transition-all duration-300
                    ${
                      disabled
                        ? 'bg-gray-300'
                        : index === 0
                        ? 'bg-blue-600 group-hover:bg-blue-700'
                        : 'bg-purple-600 group-hover:bg-purple-700'
                    }
                    opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirming && selectedChoice && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 shadow-lg animate-in fade-in-50 zoom-in-95 duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Confirm Your Choice
          </h3>
          
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-200">
              {choices.find(c => c.id === selectedChoice)?.description}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to proceed with this choice? This will determine the direction of your scenario.
          </p>
          
          <div className="flex space-x-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Confirm Choice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceButtons;