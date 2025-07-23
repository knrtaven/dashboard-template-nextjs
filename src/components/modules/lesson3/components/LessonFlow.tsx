'use client';

import React, { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import PostVideoSurvey from './PostVideoSurvey';
import VideoPlayerSkeleton from './VideoPlayerSkeleton';
import { chapters, questions, videoUrl } from '../data/videoLessonData';

const InteractiveVideoPlayer = dynamic(
  () => import('@/components/InteractiveVideoPlayer/InteractiveVideoPlayer'),
  {
    loading: () => <VideoPlayerSkeleton />,
    ssr: false,
  }
);

type LearningPhase = 'lesson' | 'video' | 'survey' | 'completed';

interface LessonFlowProps {
  LessonComponent: React.ComponentType<{onComplete: () => void, onBack?: () => void}>;
  lessonProps?: Record<string, unknown>;
  onBack?: () => void;
}

const LessonFlow: React.FC<LessonFlowProps> = ({ 
  LessonComponent, 
  lessonProps = {}, 
  onBack 
}) => {
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('lesson');
  const [showVideoSurvey, setShowVideoSurvey] = useState(false);

  const handleLessonComplete = useCallback(() => {
    setCurrentPhase('video');
  }, []);

  const handleVideoProgressUpdate = useCallback(
    (progress: { completedQuestions: number }) => {
      const totalQuestions = questions.length;
      const completedQuestions = progress.completedQuestions;

      if (completedQuestions === totalQuestions && !showVideoSurvey && currentPhase === 'video') {
        setTimeout(() => {
          setShowVideoSurvey(true);
          setCurrentPhase('survey');
        }, 2000);
      }
    },
    [showVideoSurvey, currentPhase]
  );

  const handleSurveyComplete = useCallback(() => {
    setCurrentPhase('completed');
    setShowVideoSurvey(false);
  }, []);

  const handleBackToLesson = useCallback(() => {
    setCurrentPhase('lesson');
    setShowVideoSurvey(false);
  }, []);

  // Render lesson phase
  if (currentPhase === 'lesson') {
    return (
      <LessonComponent 
        {...lessonProps}
        onBack={onBack} 
        onComplete={handleLessonComplete} 
      />
    );
  }

  // Render video phase
  if (currentPhase === 'video' && !showVideoSurvey) {
    return (
      <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-81px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 py-6">
        <div className="max-w-7xl w-full">
          <div className="flex justify-center">
            <div className="w-full max-w-sm md:max-w-md xl:max-w-lg 2xl:max-w-xl">
              <Suspense fallback={<VideoPlayerSkeleton />}>
                <InteractiveVideoPlayer
                  videoUrl={videoUrl}
                  chapters={chapters}
                  questions={questions}
                  muted={false}
                  autoPlay={false}
                  className="aspect-[9/16] shadow-2xl rounded-2xl overflow-hidden"
                  onProgressUpdate={handleVideoProgressUpdate}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render survey phase
  if (currentPhase === 'survey') {
    return <PostVideoSurvey onSurveyComplete={handleSurveyComplete} />;
  }

  // Render completion phase
  if (currentPhase === 'completed') {
    return (
      <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-81px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 py-6">
        <div className="max-w-5xl w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 xl:p-16">
            <div className="text-center">
              <div className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="text-green-600 dark:text-green-400">
                  <svg className="w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                🎉 Complete Learning Journey Finished!
              </h3>
              
              <div className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base xl:text-lg font-medium mb-8 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ALL PHASES COMPLETED
              </div>
              
              <p className="text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
                Congratulations! You&apos;ve successfully completed both the interactive lesson 
                and the video lesson with survey. You&apos;ve gained valuable insights into leadership 
                and workplace culture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBackToLesson}
                  className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base md:text-lg"
                >
                  Try Different Lesson Choices
                </button>
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold text-base md:text-lg"
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