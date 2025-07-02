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

  return (
    <div className="px-4 pb-2">
      <div 
        className="w-full h-1 bg-white bg-opacity-30 rounded cursor-pointer hover:h-2 transition-all"
        onClick={showQuestion ? undefined : onSeek}
      >
        <div 
          className="h-full bg-red-500 rounded relative transition-all"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* Question markers */}
          {questions.map((question) => (
            <div
              key={question.id}
              className={`absolute top-0 w-1 h-full rounded ${
                userAnswers[question.id] ? 'bg-green-400' : 'bg-yellow-400'
              }`}
              style={{ left: `${(question.triggerTime / duration) * 100}%` }}
              title={`Question ${question.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};