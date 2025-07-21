import React, { useState, useEffect, useRef } from 'react';
import { DialogueLine } from '../data/dialogue-scenarios';

interface DialogueDisplayProps {
  dialogue: DialogueLine[];
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

const DialogueDisplay: React.FC<DialogueDisplayProps> = ({
  dialogue,
  isVisible,
  onComplete,
  className = ''
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    if (isVisible && dialogue.length > 0) {
      setIsAnimating(true);
      setVisibleLines(0);

      // Reset scroll to top when starting new dialogue
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }

      // Show lines one by one with delays
      const showNextLine = (index: number) => {
        if (index < dialogue.length) {
          const currentLine = dialogue[index];
          const delay = index === 0 ? 500 : (currentLine.delay || 1000);
          
          const timeout = setTimeout(() => {
            setVisibleLines(index + 1);
            
            // Only auto-scroll after the first few messages to keep them visible
            if (index >= 2 && chatContainerRef.current) {
              chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
              });
            }
            
            showNextLine(index + 1);
          }, delay);
          
          timeoutsRef.current.push(timeout);
        } else {
          // Animation complete
          setIsAnimating(false);
          if (onComplete) {
            onComplete();
          }
        }
      };

      // Start animation from the first line
      showNextLine(0);
    } else {
      setVisibleLines(0);
      setIsAnimating(false);
    }

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [isVisible, dialogue, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={className}>
      {/* Chat Header with Speaker Names */}
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-lg">
        <div className="text-left">
          <span className="font-semibold text-gray-900 dark:text-white">
            Jamie Miller
          </span>
          <span className="block text-sm text-gray-600 dark:text-gray-400">
            Team Lead
          </span>
        </div>
        <div className="text-right">
          <span className="font-semibold text-gray-900 dark:text-white">
            Alex Taylor
          </span>
          <span className="block text-sm text-gray-600 dark:text-gray-400">
            New Team Member
          </span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="h-80 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-800"
      >
        {dialogue.map((line, index) => {
          const isJamie = line.speaker === 'Jamie';
          const isVisible = index < visibleLines;
          
          return (
            <div
              key={index}
              className={`
                flex ${isJamie ? 'justify-start' : 'justify-end'}
                transition-all duration-500 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div
                className={`
                  max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
                  ${isJamie 
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-bl-sm' 
                    : 'bg-blue-600 text-white rounded-br-sm'
                  }
                `}
              >
                <p className="text-sm leading-relaxed">
                  {line.text}
                </p>
              </div>
            </div>
          );
        })}

        {/* Loading indicator while animating */}
        {isAnimating && visibleLines < dialogue.length && (
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-2 opacity-60">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                     style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                     style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                     style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                Typing...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueDisplay;