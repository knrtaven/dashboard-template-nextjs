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

export default PostVideoSurvey;