"use client";
import React from 'react';
import { 
  LEARNING_CARDS_DATA,
  getCompletedCourses,
  getInProgressCourses
} from '../../constants/index';
import { LearningCard } from './LearningCard';


const LearningCards: React.FC = () => {
  const completedCourses = getCompletedCourses();
  const inProgressCourses = getInProgressCourses();
  const totalCourses = LEARNING_CARDS_DATA.length;

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {LEARNING_CARDS_DATA.map((course) => (
          <LearningCard key={course.id} {...course} />
        ))}
      </div>

      {/* Mobile Stats */}
      <div className="sm:hidden bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-500 dark:text-blue-400">
              {completedCourses.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-600 dark:text-green-400">
              {inProgressCourses.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
          <div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {totalCourses}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCards;