'use client';

import { Chapter, Question } from '@/components/InteractiveVideoPlayer/types';
import React, { Suspense, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const InteractiveVideoPlayer = dynamic(
  () => import('@/components/InteractiveVideoPlayer/InteractiveVideoPlayer'),
  {
    loading: () => <VideoPlayerSkeleton />,
    ssr: false,
  }
);

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
      // Survey completed
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
            className="bg-brand-500 hover:bg-brand-600 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
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
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {surveyQuestions.length}
            </span>
            <span>{Math.round(((currentQuestion + 1) / surveyQuestions.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div
              className="bg-brand-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question header */}
        <h2 className="mb-2 text-xl font-bold text-gray-900">{question.header}</h2>

        {/* Question text */}
        <p className="mb-6 text-gray-700">{question.question}</p>

        {/* Answer options */}
        <div className="mb-8">
          {question.type === 'multiple-choice' ? (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
                    answers[question.id] === option.id
                      ? 'border-brand-500 text-brand-800 bg-blue-50'
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
              className="focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-lg border-2 border-gray-200 p-4 focus:ring-2 focus:outline-none"
              rows={4}
            />
          )}
        </div>

        {/* Navigation buttons */}
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
                ? 'bg-brand-500 hover:bg-brand-600 text-white'
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

      {/* Controls skeleton */}
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

export default function ModulePage() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

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
    // First trigger time
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

    // Second trigger time
    {
      id: 3,
      triggerTime: 62,
      question: 'Every decision we make falls on continuum',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'True', correct: true },
        { id: 'b', text: 'False', correct: false },
      ],
      feedback: {
        correct:
          "That's right!\nEvery decision falls somewhere on the continuum of helpful and harmful behaviours.",
        incorrect:
          'Not quite!\nEvery decision falls somewhere on the continuum of helpful and harmful behaviours.',
      },
      nextAction: 'continue',
    },
    {
      id: 4,
      triggerTime: 62,
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

    // Third trigger time
    {
      id: 5,
      triggerTime: 99,
      question: 'We can improve our connection, performance, achievement and ______',
      type: 'text-input',
      correctAnswer: 'wellbeing',
      feedback: {
        correct:
          "That's right!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.",
        incorrect:
          'Not quite!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.',
      },
      nextAction: 'continue',
    },
    {
      id: 6,
      triggerTime: 99,
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

    // Fourth trigger time
    {
      id: 7,
      triggerTime: 139,
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
      id: 8,
      triggerTime: 139,
      question: 'We can improve our connection, performance, achievement and ______',
      type: 'text-input',
      correctAnswer: 'wellbeing',
      feedback: {
        correct:
          "That's right!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.",
        incorrect:
          'Not quite!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.',
      },
      nextAction: 'continue',
    },

    // Fifth trigger time
    {
      id: 9,
      triggerTime: 176,
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
    {
      id: 10,
      triggerTime: 176,
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

    // Sixth trigger time
    {
      id: 11,
      triggerTime: 203,
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
      id: 12,
      triggerTime: 203,
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

  const handleProgressUpdate = useCallback(
    (progress: any) => {
      // Check if all questions are answered
      const totalQuestions = questions.length;
      const completedQuestions = progress.completedQuestions;

      if (completedQuestions === totalQuestions && !showSurvey && !surveyCompleted) {
        // Small delay to let the last question complete
        setTimeout(() => {
          setShowSurvey(true);
        }, 2000);
      }
    },
    [questions.length, showSurvey, surveyCompleted]
  );

  const handleSurveyComplete = useCallback(() => {
    setSurveyCompleted(true);
    setShowSurvey(false);
  }, []);

  if (showSurvey) {
    return <PostVideoSurvey onSurveyComplete={handleSurveyComplete} />;
  }

  if (surveyCompleted) {
    return (
      <div className="flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Congratulations!</h2>
          <p className="mb-6 text-gray-600">
            You&apos;ve finished this lesson.
            <br />
            What did you think?
          </p>
          <button
            onClick={() => (window.location.href = '/learning/courses')}
            className="bg-brand-500 hover:bg-brand-600 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
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
            onProgressUpdate={handleProgressUpdate}
          />
        </Suspense>
      </div>
    </div>
  );
}
