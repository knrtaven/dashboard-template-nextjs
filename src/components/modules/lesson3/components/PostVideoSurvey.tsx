'use client';

import React, { useState, useCallback } from 'react';

interface PostVideoSurveyProps {
  onSurveyComplete: () => void;
}

const PostVideoSurvey: React.FC<PostVideoSurveyProps> = ({ onSurveyComplete }) => {
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
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-8 md:p-12 text-center shadow-xl">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">How&apos;s work?</h2>
          <p className="mb-10 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Now we&apos;re going to ask a couple of questions about your work life.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-10 py-4 md:px-12 md:py-5 font-semibold text-white text-base md:text-lg transition-colors"
          >
            Start Survey
          </button>
        </div>
      </div>
    );
  }

  const question = surveyQuestions[currentQuestion];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 p-8 md:p-12 shadow-xl">
        <div className="mb-8 md:mb-10">
          <div className="flex justify-between text-sm md:text-base text-gray-600 dark:text-gray-400">
            <span>
              Question {currentQuestion + 1} of {surveyQuestions.length}
            </span>
            <span>{Math.round(((currentQuestion + 1) / surveyQuestions.length) * 100)}%</span>
          </div>
          <div className="mt-3 h-2 md:h-3 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <div
              className="bg-blue-600 h-2 md:h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="mb-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{question.header}</h2>
        <p className="mb-8 md:mb-10 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{question.question}</p>

        <div className="mb-10 md:mb-12">
          {question.type === 'multiple-choice' ? (
            <div className="space-y-4">
              {question.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className={`w-full rounded-xl border-2 p-6 text-left transition-all hover:shadow-md text-base md:text-lg ${
                    answers[question.id] === option.id
                      ? 'border-blue-600 text-blue-800 bg-blue-50 dark:border-blue-400 dark:text-blue-200 dark:bg-blue-900/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:text-gray-200'
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
              className="focus:border-blue-600 focus:ring-blue-600/20 dark:focus:border-blue-400 w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-6 focus:ring-2 focus:outline-none text-base md:text-lg"
              rows={5}
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`rounded-xl px-8 py-4 font-semibold transition-colors text-base md:text-lg ${
              currentQuestion === 0
                ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-500'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`rounded-xl px-8 py-4 font-semibold transition-colors text-base md:text-lg ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-500'
            }`}
          >
            {currentQuestion === surveyQuestions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostVideoSurvey;