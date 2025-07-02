import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Chapter } from './types';

interface ChaptersListProps {
  chapters: Chapter[];
  currentChapter: number;
  showChapters: boolean;
  showQuestion: boolean;
  onToggleChapters: () => void;
  onJumpToChapter: (chapterIndex: number) => void;
  formatTime: (time: number) => string;
}

export const ChapterList: React.FC<ChaptersListProps> = ({
  chapters,
  currentChapter,
  showChapters,
  showQuestion,
  onToggleChapters,
  onJumpToChapter,
  formatTime,
}) => {
  return (
    <div className="relative">
      <button 
        onClick={onToggleChapters}
        className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors text-sm"
        disabled={showQuestion}
      >
        <span className="hidden sm:inline">Chapters</span>
        <ChevronDown size={16} className={`transform transition-transform ${showChapters ? 'rotate-180' : ''}`} />
      </button>
      
      {showChapters && (
        <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-3 min-w-48 max-w-64">
          <div className="space-y-1">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => onJumpToChapter(index)}
                className={`w-full text-left p-2 rounded text-sm hover:bg-white hover:bg-opacity-20 transition-colors ${
                  currentChapter === index ? 'bg-red-500 bg-opacity-50' : ''
                }`}
              >
                <div className="font-medium">{chapter.title}</div>
                <div className="text-xs text-gray-400">
                  {formatTime(chapter.startTime)} - {formatTime(chapter.endTime)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
