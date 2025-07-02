import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question, UserAnswers } from './types';

interface QuestionOverlayProps {
  currentQuestion: Question;
  selectedAnswer: string | null;
  essayAnswer: string;
  wordCount: number;
  hasAnswered: boolean;
  userAnswers: UserAnswers;
  onAnswerSelect: (answer: string) => void;
  onEssayChange: (value: string) => void;
  onSubmitAnswer: () => void;
  onRatingSelect: (rating: number) => void;
}

export const QuestionOverlay: React.FC<QuestionOverlayProps> = ({
  currentQuestion,
  selectedAnswer,
  essayAnswer,
  wordCount,
  hasAnswered,
  userAnswers,
  onAnswerSelect,
  onEssayChange,
  onSubmitAnswer,
  onRatingSelect,
}) => {
  const renderQuestionContent = () => {
    if (currentQuestion.type === 'multiple-choice') {
      const mcQuestion = currentQuestion as any; // Type assertion for multiple choice
      return (
        <div className="space-y-3">
          {mcQuestion.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={hasAnswered}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAnswer === option.id
                  ? hasAnswered
                    ? option.correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-blue-100 border-blue-500'
                  : hasAnswered && option.correct
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {hasAnswered && selectedAnswer === option.id && (
                  option.correct ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />
                )}
                {hasAnswered && option.correct && selectedAnswer !== option.id && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      );
    } else if (currentQuestion.type === 'essay') {
      const essayQuestion = currentQuestion as any; // Type assertion for essay
      return (
        <div className="space-y-3">
          <textarea
            value={essayAnswer}
            onChange={(e) => onEssayChange(e.target.value)}
            placeholder={essayQuestion.placeholder}
            disabled={hasAnswered}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Words: {wordCount} / {essayQuestion.minWords} minimum
            </span>
            {wordCount < essayQuestion.minWords && (
              <span className="text-red-500">More words needed</span>
            )}
          </div>
        </div>
      );
    } else if (currentQuestion.type === 'rating') {
      const ratingQuestion = currentQuestion as any; // Type assertion for rating
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            {Array.from({ length: ratingQuestion.scale }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingSelect(rating)}
                disabled={hasAnswered}
                className={`w-12 h-12 rounded-full border-2 transition-colors ${
                  selectedAnswer === rating.toString()
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      );
    }
  };

  const canSubmit = () => {
    if (hasAnswered) return false;
    if (currentQuestion.type === 'essay') {
      const essayQuestion = currentQuestion as any;
      return wordCount >= essayQuestion.minWords;
    }
    return selectedAnswer !== null;
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-80 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
        
        {renderQuestionContent()}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onSubmitAnswer}
            disabled={!canSubmit()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              canSubmit()
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasAnswered ? (
              <span className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Submitted</span>
              </span>
            ) : (
              'Submit Answer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};