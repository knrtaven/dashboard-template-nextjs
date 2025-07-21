import React, { useState, useEffect } from 'react';

interface ScenarioDisplayProps {
  content: string[];
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({
  content,
  isVisible,
  onComplete,
  className = ''
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible && content.length > 0) {
      setIsAnimating(true);
      setVisibleLines(0);

      // Show lines one by one with a delay
      const showNextLine = (index: number) => {
        if (index < content.length) {
          setTimeout(() => {
            setVisibleLines(index + 1);
            showNextLine(index + 1);
          }, 800); // 800ms delay between lines
        } else {
          // Animation complete
          setIsAnimating(false);
          onComplete?.();
        }
      };

      showNextLine(0);
    } else {
      setVisibleLines(0);
      setIsAnimating(false);
    }
  }, [isVisible, content]);

  if (!isVisible) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {content.map((line, index) => (
        <div
          key={index}
          className={`
            text-lg leading-relaxed transition-all duration-700 ease-out
            ${
              index < visibleLines
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }
            ${
              index === 0
                ? 'text-xl font-semibold text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-200'
            }
          `}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          {line}
        </div>
      ))}

      {/* Loading indicator while animating */}
      {isAnimating && visibleLines < content.length && (
        <div className="flex items-center space-x-2 opacity-60">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Continuing...
          </span>
        </div>
      )}
    </div>
  );
};

export default ScenarioDisplay;