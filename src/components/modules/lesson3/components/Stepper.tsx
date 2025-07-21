import React from 'react';
import { Check } from 'lucide-react';
import { getStepTitle } from '../data/scenarios';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ 
  currentStep, 
  totalSteps = 4, 
  className = '' 
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white shadow-lg'
                        : isCurrent
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Step Title */}
                <div className="mt-2 text-center">
                  <p
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${
                        isCurrent
                          ? 'text-blue-600 dark:text-blue-400'
                          : isCompleted
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {getStepTitle(stepNumber)}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div
                  className={`
                    flex-1 h-0.5 mx-2 transition-colors duration-300
                    ${
                      stepNumber < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
          }}
        />
      </div>

      {/* Current Step Info */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default Stepper;