import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question, UserAnswers, MultipleChoiceQuestion, EssayQuestion, RatingQuestion } from './types';

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
      const mcQuestion = currentQuestion as MultipleChoiceQuestion;
      return (
        <div className="space-y-3">
          {mcQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option.id
                  ? hasAnswered
                    ? option.correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-blue-100 border-blue-500 text-blue-800'
                  : hasAnswered && option.correct
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.text}</span>
                {hasAnswered && selectedAnswer === option.id && (
                  option.correct ? 
                    <CheckCircle className="w-5 h-5 text-green-600" /> : 
                    <XCircle className="w-5 h-5 text-red-600" />
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
      const essayQuestion = currentQuestion as EssayQuestion;
      return (
        <div className="space-y-4">
          <textarea
            value={essayAnswer}
            onChange={(e) => onEssayChange(e.target.value)}
            placeholder={essayQuestion.placeholder}
            disabled={hasAnswered}
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
          <div className="flex justify-between text-sm">
            <span className={wordCount >= essayQuestion.minWords ? 'text-green-600' : 'text-gray-600'}>
              Words: {wordCount} / {essayQuestion.minWords} minimum
            </span>
            {wordCount < essayQuestion.minWords && (
              <span className="text-red-500">Need {essayQuestion.minWords - wordCount} more words</span>
            )}
          </div>
        </div>
      );
    } else if (currentQuestion.type === 'rating') {
      const ratingQuestion = currentQuestion as RatingQuestion;
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-2">
            {Array.from({ length: ratingQuestion.scale }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingSelect(rating)}
                disabled={hasAnswered}
                className={`flex-1 h-12 rounded-lg border-2 transition-all font-bold ${
                  selectedAnswer === rating.toString()
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
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
      const essayQuestion = currentQuestion as EssayQuestion;
      return wordCount >= essayQuestion.minWords;
    }
    return selectedAnswer !== null;
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-96 overflow-y-auto shadow-2xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Question {currentQuestion.id}
          </h3>
          <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
        </div>
        
        {renderQuestionContent()}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onSubmitAnswer}
            disabled={!canSubmit()}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              canSubmit()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasAnswered ? (
              <span className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
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