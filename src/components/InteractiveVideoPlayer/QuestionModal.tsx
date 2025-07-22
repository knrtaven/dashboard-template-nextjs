import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Modal } from '../ui/modal';
import {
  Question,
  MultipleChoiceQuestion,
  EssayQuestion,
  RatingQuestion,
  TextInputQuestion,
} from './types';

interface QuestionModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (answer: string) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  isOpen,
  onClose,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [essayAnswer, setEssayAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Set<string>>(new Set());
  const [countdown, setCountdown] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset form when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setEssayAnswer('');
    setWordCount(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setWrongAnswers(new Set());
    setCountdown(null);

    // Clear any existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [question.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleEssayChange = useCallback((value: string) => {
    setEssayAnswer(value);
    const count = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(count);
  }, []);

  const checkAnswer = useCallback(
    (answer: string): boolean => {
      if (question.type === 'multiple-choice') {
        const mcQ = question as MultipleChoiceQuestion;
        const selectedOption = mcQ.options.find((opt) => opt.id === answer);
        return selectedOption?.correct || false;
      }

      if (question.type === 'text-input') {
        const textQ = question as TextInputQuestion;
        return answer.toLowerCase().trim() === textQ.correctAnswer.toLowerCase().trim();
      }

      // For other question types, assume correct for now
      return true;
    },
    [question]
  );

  const handleContinue = useCallback(() => {
    const finalAnswer =
      question.type === 'multiple-choice' || question.type === 'rating'
        ? selectedAnswer
        : essayAnswer;

    if (finalAnswer) {
      // Use setTimeout to defer the state update to avoid render phase issues
      setTimeout(() => {
        onAnswer(finalAnswer);
      }, 0);
    }
  }, [selectedAnswer, essayAnswer, question.type, onAnswer]);

  const startCountdown = useCallback(() => {
    setCountdown(5);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // Use setTimeout to defer the continue action
          setTimeout(() => {
            handleContinue();
          }, 0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleContinue]);

  const handleSubmit = useCallback(() => {
    let finalAnswer = '';

    if (question.type === 'multiple-choice' && selectedAnswer) {
      finalAnswer = selectedAnswer;
    } else if (question.type === 'essay' && essayAnswer.trim()) {
      const essayQ = question as EssayQuestion;
      if (wordCount >= essayQ.minWords) {
        finalAnswer = essayAnswer;
      }
    } else if (question.type === 'rating' && selectedAnswer) {
      finalAnswer = selectedAnswer;
    } else if (question.type === 'text-input' && essayAnswer.trim()) {
      finalAnswer = essayAnswer;
    }

    if (finalAnswer) {
      const correct = checkAnswer(finalAnswer);

      // Batch state updates to avoid multiple renders
      if (correct) {
        setIsCorrect(true);
        setIsAnswered(true);
        // Use timeout to defer the countdown start
        timeoutRef.current = setTimeout(() => {
          startCountdown();
        }, 100);
      } else {
        setIsCorrect(false);

        // Handle wrong answers
        if (question.type === 'multiple-choice') {
          setWrongAnswers((prev) => new Set([...prev, selectedAnswer]));
          setSelectedAnswer('');
        } else if (question.type === 'text-input') {
          setEssayAnswer('');
        }
      }
    }
  }, [question, selectedAnswer, essayAnswer, wordCount, checkAnswer, startCountdown]);

  const isSubmitDisabled = useMemo(() => {
    if (isAnswered) return true;

    if (question.type === 'multiple-choice' || question.type === 'rating') {
      return !selectedAnswer;
    }
    if (question.type === 'essay') {
      const essayQ = question as EssayQuestion;
      return wordCount < essayQ.minWords;
    }
    if (question.type === 'text-input') {
      return !essayAnswer.trim();
    }
    return true;
  }, [question, selectedAnswer, wordCount, essayAnswer, isAnswered]);

  const getOptionClassName = useCallback(
    (optionId: string, isSelected: boolean) => {
      const baseClass = 'w-full rounded-lg border-2 p-4 text-left transition-all hover:shadow-md';

      // Check if this option was previously selected and wrong
      const wasWrong = wrongAnswers.has(optionId);

      // If this option is the correct answer and we've answered correctly
      const mcQ = question as MultipleChoiceQuestion;
      const option = mcQ.options.find((opt) => opt.id === optionId);
      const isCorrectOption = option?.correct || false;

      if (isAnswered && isCorrect && isCorrectOption) {
        return `${baseClass} border-green-500 bg-green-50 text-green-800`;
      }

      // Show wrong answers in red (previously selected wrong answers)
      if (wasWrong) {
        return `${baseClass} border-red-500 bg-red-50 text-red-800`;
      }

      // Current selection styling
      if (isSelected && !isAnswered) {
        return `${baseClass} border-brand-500 bg-brand-50 text-brand-800`;
      }

      // Default styling
      if (isAnswered) {
        return `${baseClass} border-gray-200 bg-gray-50 text-gray-400`;
      }

      return `${baseClass} border-gray-200 bg-white hover:border-gray-300`;
    },
    [wrongAnswers, isAnswered, isCorrect, question]
  );

  const getTextInputClassName = useCallback(() => {
    const baseClass =
      'focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-lg border-2 border-gray-200 p-4 focus:ring-2 focus:outline-none';

    if (isAnswered && isCorrect !== null) {
      if (isCorrect) {
        return `${baseClass} border-green-500 bg-green-50`;
      } else {
        return `${baseClass} border-red-500 bg-red-50`;
      }
    }

    return baseClass;
  }, [isAnswered, isCorrect]);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      if (!isAnswered && !wrongAnswers.has(optionId)) {
        setSelectedAnswer(optionId);
      }
    },
    [isAnswered, wrongAnswers]
  );

  const handleRatingClick = useCallback(
    (rating: number) => {
      if (!isAnswered) {
        setSelectedAnswer(rating.toString());
      }
    },
    [isAnswered]
  );

  const handleTextInputChange = useCallback(
    (value: string) => {
      if (!isAnswered) {
        setEssayAnswer(value);
      }
    },
    [isAnswered]
  );

  const renderQuestionContent = useMemo(() => {
    switch (question.type) {
      case 'multiple-choice':
        const mcQ = question as MultipleChoiceQuestion;
        return (
          <div className="space-y-3">
            {mcQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={isAnswered || wrongAnswers.has(option.id)}
                className={getOptionClassName(option.id, selectedAnswer === option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
        );

      case 'essay':
        const essayQ = question as EssayQuestion;
        return (
          <div className="space-y-4">
            <textarea
              value={essayAnswer}
              onChange={(e) => handleEssayChange(e.target.value)}
              placeholder={essayQ.placeholder}
              disabled={isAnswered}
              className="focus:border-brand-500 focus:ring-brand-500/20 h-32 w-full resize-none rounded-lg border-2 border-gray-200 p-4 focus:ring-2 focus:outline-none disabled:bg-gray-50"
              aria-label="Essay answer"
            />
            <div
              className={`text-sm ${
                wordCount >= essayQ.minWords ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              Words: {wordCount} / {essayQ.minWords} minimum
            </div>
          </div>
        );

      case 'rating':
        const ratingQ = question as RatingQuestion;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: ratingQ.scale }, (_, i) => i + 1).map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingClick(rating)}
                  disabled={isAnswered}
                  className={`h-12 flex-1 rounded-lg border-2 font-bold transition-all hover:shadow-md ${
                    selectedAnswer === rating.toString()
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'hover:border-brand-300 hover:bg-brand-50 border-gray-300'
                  } disabled:opacity-60`}
                  aria-label={`Rating ${rating}`}
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

      case 'text-input':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={essayAnswer}
              onChange={(e) => handleTextInputChange(e.target.value)}
              placeholder="Enter your answer..."
              disabled={isAnswered}
              className={getTextInputClassName()}
              aria-label="Text input answer"
            />
          </div>
        );

      default:
        return null;
    }
  }, [
    question,
    selectedAnswer,
    essayAnswer,
    wordCount,
    handleEssayChange,
    isAnswered,
    wrongAnswers,
    getOptionClassName,
    getTextInputClassName,
    handleOptionClick,
    handleRatingClick,
    handleTextInputChange,
  ]);

  const renderFeedback = useMemo(() => {
    if (isCorrect === null) return null;

    const feedbackText = isCorrect ? question.feedback.correct : question.feedback.incorrect;

    return (
      <div
        className={`mt-4 rounded-lg border-l-4 p-4 ${
          isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
        }`}
      >
        <div className={`flex items-center ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full ${
              isCorrect ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            {isCorrect ? (
              <Check className="h-3 w-3 text-white" />
            ) : (
              <X className="h-3 w-3 text-white" />
            )}
          </div>
          <p className="text-sm font-medium whitespace-pre-line">{feedbackText}</p>
        </div>
      </div>
    );
  }, [isCorrect, question.feedback]);

  const renderButton = useMemo(() => {
    if (isAnswered && isCorrect && countdown !== null) {
      // Show progress button with countdown
      const progressPercentage = ((5 - countdown) / 5) * 100;

      return (
        <button
          onClick={handleContinue}
          className="relative overflow-hidden rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition-all hover:bg-green-700 hover:shadow-lg"
          aria-label="Continue"
        >
          {/* Progress bar background */}
          <div
            className="absolute inset-0 bg-green-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-2">
            <Check className="h-4 w-4" />
            <span>Continue ({countdown}s)</span>
          </div>
        </button>
      );
    }

    // Regular submit button
    return (
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className={`rounded-lg px-8 py-3 font-semibold transition-all ${
          !isSubmitDisabled
            ? 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-lg'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
        aria-label="Submit answer"
      >
        {isCorrect === false ? 'Try Again' : 'Submit Answer'}
      </button>
    );
  }, [isAnswered, isCorrect, countdown, handleContinue, handleSubmit, isSubmitDisabled]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="mx-4 w-full max-w-lg"
      isFullscreen={false}
    >
      {/* Scrollable container with max height */}
      <div className="flex max-h-[80vh] flex-col overflow-hidden">
        {/* Header - fixed at top */}
        <div className="flex-shrink-0 border-b border-gray-200 p-6 pb-4">
          <h3 className="text-xl font-bold text-gray-900">Question {question.id}</h3>
          <p className="mt-2 text-lg text-gray-700">{question.question}</p>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {renderQuestionContent}
          {renderFeedback}
        </div>

        {/* Footer - fixed at bottom */}
        <div className="flex-shrink-0 border-t border-gray-200 p-6 pt-4">
          <div className="flex justify-end">{renderButton}</div>
        </div>
      </div>
    </Modal>
  );
};
