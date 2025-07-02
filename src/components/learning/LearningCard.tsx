import React from 'react';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { 
  LearningCardData,
} from '../../constants/index';

export const  LearningCard: React.FC<LearningCardData> = ({
  title,
  description,
  progress,
  duration,
  instructor,
  level,
  bannerColor,
  category,
  totalLessons,
  completedLessons
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group hover:scale-[1.02]">
      {/* Banner Section */}
      <div className={`h-32 ${bannerColor} relative flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 backdrop-blur-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium opacity-90">{category}</div>
        </div>
        
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Course Details */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {/* <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{instructor}</span>
            </div> */}
          </div>
          
          {progress === 100 && (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
        </div>

        {/* Lesson Progress */}
        {totalLessons && completedLessons !== undefined && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{completedLessons}/{totalLessons}</span> lessons completed
          </div>
        )}
      </div>

      {/* Progress Bar Footer */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {progress}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out bg-[#7f56d9]`}
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Progress Text */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {progress === 100 
            ? 'Course completed!' 
            : progress >= 50 
            ? 'Great progress! Keep going.' 
            : 'Just getting started.'}
        </div>
      </div>
    </div>
  );
};