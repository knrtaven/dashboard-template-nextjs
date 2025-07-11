"use client";
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
      
        
      <div className="h-32 bg-purple-600 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${typeof module.banner === 'string' ? module.banner : module.banner?.src}')`
            }}
          />
          {/* Optional: Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute bottom-2 left-4 right-4">
            {courseName && (
              <div className="text-xs text-white font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md inline-block">
                {courseName}
              </div>
            )}
          </div>
        </div>
        
        <div className='p-4'>
          <div className='space-y-3'>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {module.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 max-w-96 truncate dark:text-gray-400 text-sm line-clamp-2">
              {module.description}
            </p>


            {/* Continue Button */}
            <div className="pt-2">
              <Link
                href={`/learning/courses/${courseId}`}
                className="inline-block w-full text-center px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-dark text-white font-medium transition-colors duration-200 text-sm"
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