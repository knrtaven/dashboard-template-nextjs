import React from 'react';
import { Question, UserAnswers } from './types';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  questions: Question[];
  userAnswers: UserAnswers;
  showQuestion: boolean;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  questions,
  userAnswers,
  showQuestion,
  onSeek,
}) => {
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showQuestion) return;
    onSeek(e);
  };

  return (
    <div className="px-4 pb-2">
      <div 
        className="w-full h-2 bg-white bg-opacity-30 rounded cursor-pointer hover:h-3 transition-all relative"
        onClick={handleClick}
      >
        <div 
          className="h-full bg-red-500 rounded relative transition-all"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* Progress thumb */}
          <div 
            className="absolute top-1/2 right-0 w-3 h-3 bg-red-500 rounded-full transform -translate-y-1/2 translate-x-1/2"
          />
        </div>
        
        {/* Question markers */}
        {questions.map((question) => {
          const markerPosition = duration > 0 ? (question.triggerTime / duration) * 100 : 0;
          return (
            <div
              key={question.id}
              className={`absolute top-0 w-2 h-full rounded ${
                userAnswers[question.id] ? 'bg-green-400' : 'bg-yellow-400'
              }`}
              style={{ left: `${markerPosition}%` }}
              title={`Question ${question.id} at ${Math.floor(question.triggerTime / 60)}:${(question.triggerTime % 60).toString().padStart(2, '0')}`}
            />
          );
        })}
      </div>
    </div>
  );
};