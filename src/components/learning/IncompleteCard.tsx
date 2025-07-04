"use client";
import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ModuleData } from '@/constants/lessons';

interface IncompleteCardProps {
  module: ModuleData;
  courseId: number;
  courseName?: string;
}

export const IncompleteCard: React.FC<IncompleteCardProps> = ({ 
  module, 
  courseId, 
  courseName 
}) => {
  return (
    <div className='w-full'>
      <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200'>
        <div className='p-4'>
          <div className='space-y-3'>
            {/* Course Name (if provided) */}
            {courseName && (
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {courseName}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {module.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {module.description}
            </p>

            {/* Duration */}
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{module.duration}</span>
            </div>

            {/* Continue Button */}
            <div className="pt-2">
              <Link
                href={`/learning/courses/${courseId}/module/${module.id}`}
                className="inline-block w-full text-center px-4 py-2 rounded-lg bg-[#7f56d9] hover:bg-[#6d48c7] text-white font-medium transition-colors duration-200 text-sm"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};