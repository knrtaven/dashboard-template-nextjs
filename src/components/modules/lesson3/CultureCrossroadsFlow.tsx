'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import CultureCrossroads from './CultureCrossroads';
import { Chapter, Question } from '@/components/InteractiveVideoPlayer/types';

const InteractiveVideoPlayer = dynamic(
  () => import('@/components/InteractiveVideoPlayer/InteractiveVideoPlayer'),
  {
    loading: () => <VideoPlayerSkeleton />,
    ssr: false,
  }
);

type LearningPhase = 'scenario' | 'video' | 'survey' | 'completed';

interface CultureCrossroadsFlowProps {
  onBack?: () => void;
}

// Survey Component
const PostVideoSurvey = ({ onSurveyComplete }: { onSurveyComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showIntro, setShowIntro] = useState(true);

  const surveyQuestions = [
    {
      id: 1,
      header: "How's work?",
      question: 'We all work together to focus on achieving specific goals.',
      type: 'multiple-choice' as const,
      options: [
        { id: 'strongly-agree', text: 'Strongly Agree' },
        { id: 'neutral', text: 'Neutral' },
        { id: 'strongly-disagree', text: 'Strongly Disagree' },
      ],
    },
    {
      id: 2,
      header: "How's work?",
      question: 'Leaders encourage workforce contribution',
      type: 'multiple-choice' as const,
      options: [
        { id: 'strongly-agree', text: 'Strongly Agree' },
        { id: 'neutral', text: 'Neutral' },
        { id: 'strongly-disagree', text: 'Strongly Disagree' },
      ],
    },
    {
      id: 3,
      header: "How's work?",
      question: 'What goal(s) have your workforce worked together to achieve recently?',
      type: 'textarea' as const,
      placeholder: 'Tell us your thoughts',
    },
  ];

  const handleAnswer = useCallback((questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log('Survey completed with answers:', answers);
      onSurveyComplete();
    }
  }, [currentQuestion, surveyQuestions.length, answers, onSurveyComplete]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const canProceed = () => {
    const currentQuestionId = surveyQuestions[currentQuestion].id;
    const answer = answers[currentQuestionId];
    return answer && answer.trim().length > 0;
  };

  if (showIntro) {
    return (
      <div className="flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How&apos;s work?</h2>
          <p className="mb-8 text-gray-700">
            Now we&apos;re going to ask a couple of questions about your work life.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
          >
            Start Survey
          </button>
        </div>
      </div>
    );
  }

  const question = surveyQuestions[currentQuestion];

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {surveyQuestions.length}
            </span>
            <span>{Math.round(((currentQuestion + 1) / surveyQuestions.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900">{question.header}</h2>
        <p className="mb-6 text-gray-700">{question.question}</p>

        <div className="mb-8">
          {question.type === 'multiple-choice' ? (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
                    answers[question.id] === option.id
                      ? 'border-blue-600 text-blue-800 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="focus:border-blue-600 focus:ring-blue-600/20 w-full rounded-lg border-2 border-gray-200 p-4 focus:ring-2 focus:outline-none"
              rows={4}
            />
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`rounded-lg px-6 py-3 font-semibold transition-colors ${
              currentQuestion === 0
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`rounded-lg px-6 py-3 font-semibold transition-colors ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
            }`}
          >
            {currentQuestion === surveyQuestions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton component
function VideoPlayerSkeleton() {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-lg bg-gray-900 shadow-2xl">
      <div
        className="flex items-center justify-center bg-gray-800"
        style={{ width: 450, height: 800 }}
      >
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="mb-4 h-2 rounded bg-gray-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded bg-gray-600"></div>
            <div className="h-4 w-20 rounded bg-gray-600"></div>
          </div>
          <div className="h-4 w-16 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}

const CultureCrossroadsFlow: React.FC<CultureCrossroadsFlowProps> = ({ onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('scenario');
  const [showVideoSurvey, setShowVideoSurvey] = useState(false);

  // Video lesson data (extracted from ModulePage)
  const chapters: Chapter[] = [
    {
      id: 1,
      title: 'Welcome to Appellon',
      startTime: 0,
      endTime: 30,
      description: 'Course introduction',
    },
    {
      id: 2,
      title: 'Main Content',
      startTime: 30,
      endTime: 120,
      description: 'Core learning material',
    },
  ];

  const questions: Question[] = [
    {
      id: 1,
      triggerTime: 31,
      question: 'Appellon is about helping your organisation to develop',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'New Products', correct: false },
        { id: 'b', text: 'Better ways of working', correct: true },
        { id: 'c', text: 'Improve HR practices', correct: false },
        { id: 'd', text: 'Sales Strategies', correct: false },
      ],
      feedback: {
        correct: "That's right!\nAppellon is here to help your organization work better together",
        incorrect: 'Not quite!\nAppellon is here to help your organization work better together',
      },
      nextAction: 'continue',
    },
    {
      id: 2,
      triggerTime: 31,
      question: 'Do helpful behaviours release oxytocin?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Yes', correct: true },
        { id: 'b', text: 'No', correct: false },
      ],
      feedback: {
        correct:
          "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
        incorrect:
          'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
      },
      nextAction: 'continue',
    },
  ];

  const handleScenarioComplete = useCallback(() => {
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
    [questions.length, showVideoSurvey, currentPhase]
  );

  const handleSurveyComplete = useCallback(() => {
    setCurrentPhase('completed');
    setShowVideoSurvey(false);
  }, []);

  const handleBackToScenario = useCallback(() => {
    setCurrentPhase('scenario');
    setShowVideoSurvey(false);
  }, []);

  // Render scenario phase
  if (currentPhase === 'scenario') {
    return <CultureCrossroads onBack={onBack} onComplete={handleScenarioComplete} />;
  }

  // Render video phase
  if (currentPhase === 'video' && !showVideoSurvey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Video Lesson
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Continue your learning journey with this interactive video experience
            </p>
          </div>
          
          <div className="flex justify-center p-4">
            <div className="w-full max-w-md">
              <Suspense fallback={<VideoPlayerSkeleton />}>
                <InteractiveVideoPlayer
                  videoUrl="https://uvupczshcgzfnfdqadwc.supabase.co/storage/v1/object/public/public-storage//lesson1_2.mp4"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
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
                Congratulations! You&apos;ve successfully completed both the interactive scenario-based learning 
                and the video lesson with survey. You&apos;ve gained valuable insights into leadership 
                and workplace culture.
              </p>
              
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button
                  onClick={handleBackToScenario}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Different Scenario Choices
                </button>
                
                {onBack && (
                  <button
                    onClick={onBack}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Back to Courses
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

export default CultureCrossroadsFlow;