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
      <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center p-4">
            <div className="w-full max-w-md">
              <Suspense fallback={<VideoPlayerSkeleton />}>
                <InteractiveVideoPlayer
                  videoUrl={videoUrl}
                  chapters={chapters}
                  questions={questions}
                  muted={false}
                  autoPlay={false}
                  className="aspect-[9/16]"
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
      <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-green-600 dark:text-green-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎉 Complete Learning Journey Finished!
              </h3>
              
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ALL PHASES COMPLETED
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Congratulations! You&apos;ve successfully completed both the interactive lesson 
                and the video lesson with survey. You&apos;ve gained valuable insights into leadership 
                and workplace culture.
              </p>
              
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button
                  onClick={handleBackToLesson}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Different Lesson Choices
                </button>
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
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