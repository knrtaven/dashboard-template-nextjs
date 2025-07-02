import React from 'react';
import { Chapter } from './types';

interface VideoInfoProps {
  currentTime: number;
  duration: number;
  currentChapter: number;
  chapters: Chapter[];
  score: number;
  totalQuestions: number;
  formatTime: (time: number) => string;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  currentTime,
  duration,
  currentChapter,
  chapters,
  score,
  totalQuestions,
  formatTime,
}) => {
  return (
    <div className="flex items-center justify-between text-white text-sm">
      <div className="flex items-center space-x-4">
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        <span className="hidden sm:block">
          Chapter: {chapters[currentChapter]?.title}
        </span>
      </div>
      <div className="text-right">
        <span>Score: {score}/{totalQuestions}</span>
      </div>
    </div>
  );
};