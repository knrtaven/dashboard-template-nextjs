import React from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: number | string;
  title: string;
  totalLessons?: number;
  description?: string;
  isLocked: boolean;
  isCompleted: boolean;
}

interface CourseModuleProps {
  module: Module;
  moduleIndex: number;
  courseId: string | number;
}

export const CourseModule = ({ module, moduleIndex, courseId }: CourseModuleProps) => {
  return (
    <div
      key={module.id}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Module Info */}
          <div className="flex-1">
            <div className="mb-3 flex items-center space-x-3">
              <div className="nax-h-5 flex min-h-5 max-w-5 min-w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <span className="text-brand-primary dark:text-brand-primary-dark text-sm font-bold">
                  {moduleIndex + 1}
                </span>
              </div>
              <div className="overflow-x-hidden text-ellipsis">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{module.description}</p>
              </div>
            </div>

            {/* <p className="text-gray-600 dark:text-gray-400 mb-4">
          </p> */}

            {/* Module Meta Info */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"></div>
          </div>

          {/* Module Actions */}
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="text-center">
              {module.isLocked ? (
                <Lock className="mx-auto mb-1 h-6 w-6 text-gray-400" />
              ) : module.isCompleted ? (
                <CheckCircle className="mx-auto mb-1 h-6 w-6 text-green-600" />
              ) : (
                <Play className="text-brand-primary mx-auto mb-1 h-6 w-6" />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {module.isLocked ? 'Locked' : module.isCompleted ? 'Completed' : 'Available'}
              </p>
            </div>

            {/* Start/Continue Button */}
            {!module.isLocked && (
              <Link
                href={`/learning/courses/${courseId}/module/${module.id}`}
                className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                  module.isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
                    : 'bg-brand-primary hover:bg-brand-primary-dark text-white'
                }`}
              >
                {module.isCompleted ? 'Review' : 'Start'}
              </Link>
            )}

            {module.isLocked && (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              >
                Locked
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
