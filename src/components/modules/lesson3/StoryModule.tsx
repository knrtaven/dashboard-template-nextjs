'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { storySlides, quizQuestions, StorySlide } from './data/story';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';

interface StoryModuleProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const StoryModule: React.FC<StoryModuleProps> = ({ onBack, onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [allSlides, setAllSlides] = useState<StorySlide[]>([]);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<number, boolean>>({});

  const storyContainerRef = useRef<HTMLDivElement>(null);
  const latestSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storySlides.length > 0) {
      setAllSlides([storySlides[0]]);
      // Initialize loading state for first slide
      setImageLoadingStates({ 1: true });
    }
  }, []);

  useEffect(() => {
    if (latestSlideRef.current && storyContainerRef.current) {
      const container = storyContainerRef.current;
      const slide = latestSlideRef.current;
      const containerHeight = container.offsetHeight;
      const slideHeight = slide.offsetHeight;
      const slideOffsetTop = slide.offsetTop;

      const scrollTop = slideOffsetTop - containerHeight / 2 + slideHeight / 2;

      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [allSlides]);

  const handleNextSlide = () => {
    if (currentSlideIndex < storySlides.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      setAllSlides((prev) => [...prev, storySlides[nextIndex]]);
      // Initialize loading state for new slide
      setImageLoadingStates((prev) => ({ ...prev, [storySlides[nextIndex].id]: true }));
    } else {
      setIsStoryComplete(true);
    }
  };

  const handleImageLoad = (slideId: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [slideId]: false }));
  };

  const handleImageError = (slideId: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [slideId]: false }));
    setImageErrorStates((prev) => ({ ...prev, [slideId]: true }));
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find((opt) => opt.id === answerId);
    const isCorrect = selectedOption?.isCorrect || false;

    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
          setShowFeedback(false);
        } else {
          setIsQuizComplete(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setShowFeedback(false);
      }, 2000);
    }
  };

  if (isQuizComplete) {
    return (
      <div className="h-[calc(100vh-140px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex items-center justify-center px-4 py-6">
        <div className="max-w-5xl w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 xl:p-16">
            <div className="w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10">
              <svg className="w-14 h-14 md:w-16 md:h-16 xl:w-18 xl:h-18 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:mb-8 md:text-5xl xl:text-6xl dark:text-white">
              Congratulations!
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-gray-600 md:mb-12 md:text-2xl xl:text-3xl dark:text-gray-300">
              You&apos;ve successfully completed Mary&apos;s Story and demonstrated your
              understanding of positive workplace culture.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {onComplete && (
                <Button
                  onClick={onComplete}
                  variant="primary"
                  className="px-8 py-4 text-base md:px-10 md:py-5 md:text-lg"
                >
                  Continue
                </Button>
              )}

              {onBack && (
                <Button
                  onClick={onBack}
                  variant="primary"
                  className="px-8 py-4 text-base md:px-10 md:py-5 md:text-lg"
                >
                  Return to Module Selection
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isStoryComplete) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <div className="h-[calc(100vh-140px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex flex-col px-4 py-6">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 flex items-center space-x-2 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 md:mb-8 md:text-base dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft size={20} className="md:h-6 md:w-6" />
              <span>Back to Module Selection</span>
            </button>
          )}

          <div className="flex flex-1 flex-col rounded-2xl bg-white p-6 shadow-xl md:p-10 xl:p-12 dark:bg-gray-800">
            <div className="mb-8 text-center md:mb-10">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl xl:text-5xl dark:text-white">
                Knowledge Check
              </h1>
              <p className="text-lg text-gray-600 md:text-xl xl:text-2xl dark:text-gray-300">
                Let&apos;s see what you learned from Mary&apos;s story about positive workplace
                culture.
              </p>
              <div className="mt-6 flex justify-center md:mt-8">
                <Badge variant="light" color="primary">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </Badge>
              </div>
            </div>

            <div className="mx-auto flex max-w-4xl flex-1 flex-col">
              <h2 className="mb-8 text-center text-xl font-bold text-gray-900 md:mb-10 md:text-2xl xl:text-3xl dark:text-white">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => !showFeedback && handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full rounded-xl border-2 p-6 text-left transition-all duration-200 ${
                      selectedAnswer === option.id
                        ? showFeedback
                          ? isAnswerCorrect
                            ? 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 bg-gray-50 hover:border-orange-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-orange-600'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {option.text}
                      </span>
                      {showFeedback && selectedAnswer === option.id && (
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {isAnswerCorrect ? (
                            <svg
                              className="h-4 w-4 text-white"
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
                          ) : (
                            <svg
                              className="h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div
                  className={`mt-6 rounded-lg p-4 text-center ${
                    isAnswerCorrect
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                  }`}
                >
                  {isAnswerCorrect
                    ? 'Correct! Great understanding of the story.'
                    : 'Not quite right. Try again!'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex flex-col px-4 py-6">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center space-x-2 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 md:mb-8 md:text-base dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft size={20} className="md:h-6 md:w-6" />
            <span>Back to Module Selection</span>
          </button>
        )}

        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl xl:text-5xl dark:text-white">
            Mary&apos;s Story
          </h1>
          <p className="text-lg text-gray-600 md:text-xl xl:text-2xl dark:text-gray-300">
            A lesson in positive workplace culture
          </p>

          <div className="mt-6 flex justify-center md:mt-8">
            <div className="bg-brand-500 h-2 w-full max-w-md rounded-full md:h-3 xl:max-w-lg">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300 md:h-3"
                style={{ width: `${((currentSlideIndex + 1) / storySlides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
          <div className="flex min-h-0 flex-1 items-center justify-center p-6 md:p-8 xl:p-12">
            {allSlides.length > 0 && (
              <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 xl:space-x-12 max-w-5xl w-full">
                <div className="w-full lg:w-64 xl:w-80 h-64 xl:h-80 flex-shrink-0 relative rounded-xl overflow-hidden">
                  {/* Loading skeleton overlay */}
                  {imageLoadingStates[allSlides[currentSlideIndex]?.id] && (
                    <div className="absolute inset-0 z-10 animate-pulse bg-gray-300 dark:bg-gray-600">
                      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  )}

                  {/* Error fallback overlay */}
                  {imageErrorStates[allSlides[currentSlideIndex]?.id] && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <div className="text-center">
                        <svg
                          className="mx-auto mb-2 h-12 w-12 text-gray-400 xl:h-16 xl:w-16 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-gray-500 xl:text-sm dark:text-gray-400">
                          Image unavailable
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Current slide image */}
                  {allSlides[currentSlideIndex] && (
                    <Image
                      src={allSlides[currentSlideIndex].imageUrl}
                      alt={`Mary's story illustration ${allSlides[currentSlideIndex].id}`}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        imageLoadingStates[allSlides[currentSlideIndex].id] ||
                        imageErrorStates[allSlides[currentSlideIndex].id]
                          ? 'opacity-0'
                          : 'opacity-100'
                      }`}
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 256px, 320px"
                      onLoad={() => handleImageLoad(allSlides[currentSlideIndex].id)}
                      onError={() => handleImageError(allSlides[currentSlideIndex].id)}
                    />
                  )}
                </div>

                <div className="flex flex-1 items-center">
                  {allSlides[currentSlideIndex] && (
                    <p className="text-lg leading-relaxed text-gray-700 md:text-xl xl:text-2xl dark:text-gray-200">
                      {allSlides[currentSlideIndex].content}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end border-t border-gray-200 p-6 md:p-8 dark:border-gray-600">
            <Button
              onClick={handleNextSlide}
              variant="primary"
              endIcon={<ChevronRight size={20} className="md:h-6 md:w-6" />}
              className="px-6 py-3 text-base md:px-8 md:py-4 md:text-lg"
            >
              {currentSlideIndex < storySlides.length - 1 ? 'Next' : 'Continue to Quiz'}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default StoryModule;
