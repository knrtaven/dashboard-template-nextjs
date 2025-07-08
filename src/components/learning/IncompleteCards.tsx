"use client";
import { getIncompleteWorkRiteModules, getIncompleteLeadRiteModules } from '@/constants/lessons';
import { getLearningCardById } from '@/constants/index';
import React from 'react';
import { IncompleteCard } from './IncompleteCard';

const IncompleteCards = () => {
  const incompleteWorkRite = getIncompleteWorkRiteModules();
  const incompleteLeadRite = getIncompleteLeadRiteModules();
  
  // Combine all incomplete modules
  const allIncompleteModules = [...incompleteWorkRite, ...incompleteLeadRite];
  
  // Flatten modules for easier rendering with proper course names
  const flattenedModules = allIncompleteModules.flatMap(courseData => 
    courseData.modules.map(module => {
      // Get the actual course data for more complete information
      const actualCourseData = getLearningCardById(courseData.courseId);
      
      return {
        ...module,
        courseId: courseData.courseId,
        courseName: actualCourseData?.title || courseData.courseName || `Course ${courseData.courseId}`
      };
    })
  );

  if (flattenedModules.length === 0) {
    return (
      <div className='w-full'>
        <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6'>
          <div className='text-center'>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              All caught up! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have no incomplete modules at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full space-y-6'>
      {/* Header */}
      <div className='px-1'>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          Pick up where you left off
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {flattenedModules.length} incomplete module{flattenedModules.length !== 1 ? 's' : ''} across {allIncompleteModules.length} course{allIncompleteModules.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mobile-first grid layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {flattenedModules.map((moduleWithCourse, index) => (
          <IncompleteCard
            key={`${moduleWithCourse.courseId}-${moduleWithCourse.id}-${index}`}
            module={moduleWithCourse}
            courseId={moduleWithCourse.courseId}
            courseName={moduleWithCourse.courseName}
          />
        ))}
      </div>

     
    </div>
  );
};

export default IncompleteCards;