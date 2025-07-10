"use client";
import { LEARNING_CARDS_DATA } from '@/constants/index';
import { getCourseContent, calculateCourseProgress } from '@/constants/lessons';
import React from 'react';
import { IncompleteCard } from './IncompleteCard';

const IncompleteCards = () => {
  // Calculate dynamic progress and filter incomplete courses
  const incompleteCourses = LEARNING_CARDS_DATA.map(course => {
    const courseContent = getCourseContent(course.id);
    const dynamicProgress = courseContent ? calculateCourseProgress(courseContent) : course.progress;
    
    return {
      ...course,
      progress: dynamicProgress,
      completedLessons: courseContent ? courseContent.completedLessons : course.completedLessons,
      totalLessons: courseContent ? courseContent.totalLessons : course.totalLessons
    };
  }).filter(course => course.progress < 100); // Only show courses that aren't 100% complete

  if (incompleteCourses.length === 0) {
    return (
      <div className='w-full'>
        <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6'>
          <div className='text-center'>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              All caught up! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have completed all available courses.
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
          {incompleteCourses.length} incomplete course{incompleteCourses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mobile-first grid layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {incompleteCourses.map((course) => (
          <IncompleteCard
            key={course.id}
            module={{
              id: course.id,
              title: course.title,              
              description: course.description,
              banner:course.bannerImage,
              isCompleted: course.progress === 100,
              isLocked: false,
              order: course.id,
            }}
            courseId={course.id}
            courseName={course.category}
          />
        ))}
      </div>

      {/*Show total count on mobile*/}
      <div className='sm:hidden'>
        <div className='text-center pt-2 border-t border-gray-200 dark:border-gray-700'>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Showing {incompleteCourses.length} incomplete courses
          </span>
        </div>
      </div>
    </div>
  );
};

export default IncompleteCards;