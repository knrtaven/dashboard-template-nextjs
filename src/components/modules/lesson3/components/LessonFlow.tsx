'use client';

import React, { useState, useCallback } from 'react';
import PostVideoSurvey from './PostVideoSurvey';

type LearningPhase = 'lesson' | 'video' | 'survey' | 'completed';

interface LessonFlowProps {
  LessonComponent: React.ComponentType<{ onComplete: () => void; onBack?: () => void }>;
  lessonProps?: Record<string, unknown>;
  onBack?: () => void;
}

const LessonFlow: React.FC<LessonFlowProps> = ({ LessonComponent, lessonProps = {}, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('lesson');

  const handleLessonComplete = useCallback(() => {
    setCurrentPhase('survey');
  }, []);

  const handleSurveyComplete = useCallback(() => {
    setCurrentPhase('completed');
  }, []);

  const handleBackToLesson = useCallback(() => {
    setCurrentPhase('lesson');
  }, []);

  // Render lesson phase
  if (currentPhase === 'lesson') {
    return <LessonComponent {...lessonProps} onBack={onBack} onComplete={handleLessonComplete} />;
  }

  // Render survey phase
  if (currentPhase === 'survey') {
    return <PostVideoSurvey onSurveyComplete={handleSurveyComplete} />;
  }

  // Render completion phase
  if (currentPhase === 'completed') {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-6 md:min-h-[calc(100vh-81px)] dark:from-gray-900 dark:to-blue-900">
        <div className="w-full max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-xl md:p-12 xl:p-16 dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 md:h-28 md:w-28 xl:h-32 xl:w-32 dark:bg-green-900">
                <div className="text-green-600 dark:text-green-400">
                  <svg
                    className="h-12 w-12 md:h-14 md:w-14 xl:h-16 xl:w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl xl:text-5xl dark:text-white">
                🎉 Complete Learning Journey Finished!
              </h3>

              <div className="mb-8 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 md:px-6 md:py-3 md:text-base xl:text-lg dark:bg-green-900 dark:text-green-200">
                ALL PHASES COMPLETED
              </div>

              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-gray-600 md:text-xl xl:text-2xl dark:text-gray-300">
                Congratulations! You&apos;ve successfully completed both the interactive lesson and
                the video lesson with survey. You&apos;ve gained valuable insights into leadership
                and workplace culture.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleBackToLesson}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-700 md:px-10 md:py-5 md:text-lg"
                >
                  Try Different Lesson Choices
                </button>

                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center justify-center rounded-xl bg-gray-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-gray-700 md:px-10 md:py-5 md:text-lg"
                  >
                    Back to Module Selection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LessonFlow;
