import React from 'react'
import { Play, CheckCircle,  Lock} from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: number | string;
  title: string;
  description: string;
  totalLessons?: number;
  isLocked: boolean;
  isCompleted: boolean;
}

interface CourseModuleProps {
  module: Module;
  moduleIndex: number;
  courseId: string | number;
}

export const CourseModule = ({module, moduleIndex, courseId}: CourseModuleProps) => {


  return (
    <div key={module.id} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between">
        {/* Module Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10  bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <span className="text-sm font-bold text-blue-600  dark:text-blue-400">
                {moduleIndex + 1} 
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Module {moduleIndex + 1}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {module.description}
          </p>
          
          {/* Module Meta Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
      
            
            <div className="flex items-center space-x-1">
              <span>{module.totalLessons || 'Multiple'} topics</span>
            </div>
            
      
          </div>
        </div>

        {/* Module Actions */}
        <div className="flex items-center space-x-4">
          {/* Status Indicator */}
          <div className="text-center">
            {module.isLocked ? (
              <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            ) : module.isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            ) : (
              <Play className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {module.isLocked ? 'Locked' : module.isCompleted ? 'Completed' : 'Available'}
            </p>
          </div>

          {/* Start/Continue Button */}
          {!module.isLocked && (
            <Link 
              href={`/learning/courses/${courseId}/module/${module.id}`}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                module.isCompleted 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {module.isCompleted ? 'Review' : 'Start'}
            </Link>
          )}
          
          {module.isLocked && (
            <button 
              disabled
              className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            >
              Locked
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

