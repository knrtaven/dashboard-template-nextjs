"use client";

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
      
      const scrollTop = slideOffsetTop - (containerHeight / 2) + (slideHeight / 2);
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [allSlides]);

  const handleNextSlide = () => {
    if (currentSlideIndex < storySlides.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      setAllSlides(prev => [...prev, storySlides[nextIndex]]);
      // Initialize loading state for new slide
      setImageLoadingStates(prev => ({ ...prev, [storySlides[nextIndex].id]: true }));
    } else {
      setIsStoryComplete(true);
    }
  };

  const handleImageLoad = (slideId: number) => {
    setImageLoadingStates(prev => ({ ...prev, [slideId]: false }));
  };

  const handleImageError = (slideId: number) => {
    setImageLoadingStates(prev => ({ ...prev, [slideId]: false }));
    setImageErrorStates(prev => ({ ...prev, [slideId]: true }));
  };


  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.id === answerId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
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
      <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-140px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex items-center justify-center px-4 py-6">
        <div className="max-w-5xl w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 xl:p-16">
            <div className="w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10">
              <svg className="w-14 h-14 md:w-16 md:h-16 xl:w-18 xl:h-18 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
              Congratulations!
            </h1>
            <p className="text-xl md:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-10 md:mb-12 leading-relaxed">
              You&apos;ve successfully completed Mary&apos;s Story and demonstrated your understanding of positive workplace culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {onComplete && (
                <Button
                  onClick={onComplete}
                  variant="primary"
                  className="text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
                >
                  Continue to Video Lesson
                </Button>
              )}
              
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="primary"
                  className="text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
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
      <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-81px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex flex-col px-4 py-6">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 md:mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm md:text-base"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" />
              <span>Back to Module Selection</span>
            </button>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 xl:p-12 flex-1 flex flex-col">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Knowledge Check
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">
                Let&apos;s see what you learned from Mary&apos;s story about positive workplace culture.
              </p>
              <div className="mt-6 md:mt-8 flex justify-center">
                <Badge variant="light" color="primary">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </Badge>
              </div>
            </div>

            <div className="max-w-4xl mx-auto flex-1 flex flex-col">
              <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-8 md:mb-10 text-center">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => !showFeedback && handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === option.id
                        ? showFeedback
                          ? isAnswerCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                          : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-orange-300 dark:hover:border-orange-600'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {option.text}
                      </span>
                      {showFeedback && selectedAnswer === option.id && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isAnswerCorrect ? (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className={`mt-6 p-4 rounded-lg text-center ${
                  isAnswerCorrect
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}>
                  {isAnswerCorrect
                    ? "Correct! Great understanding of the story."
                    : "Not quite right. Try again!"
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900 flex flex-col px-4 py-6">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 md:mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm md:text-base"
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
            <span>Back to Module Selection</span>
          </button>
        )}

        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mary&apos;s Story
          </h1>
          <p className="text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">
            A lesson in positive workplace culture
          </p>
          
          <div className="mt-6 md:mt-8 flex justify-center">
            <div className="bg-brand-500 h-2 md:h-3 rounded-full w-full max-w-md xl:max-w-lg">
              <div
                className="bg-brand-600 h-2 md:h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / storySlides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex items-center justify-center p-6 md:p-8 xl:p-12 min-h-0">
            {allSlides.length > 0 && (
              <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 xl:space-x-12 max-w-5xl w-full">
                <div className="w-full lg:w-64 xl:w-80 h-64 xl:h-80 flex-shrink-0 relative rounded-xl overflow-hidden">
                  {/* Loading skeleton overlay */}
                  {imageLoadingStates[allSlides[currentSlideIndex]?.id] && (
                    <div className="absolute inset-0 z-10 bg-gray-300 dark:bg-gray-600 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  )}
                  
                  {/* Error fallback overlay */}
                  {imageErrorStates[allSlides[currentSlideIndex]?.id] && (
                    <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 xl:w-16 xl:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400">Image unavailable</p>
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
                        imageLoadingStates[allSlides[currentSlideIndex].id] || imageErrorStates[allSlides[currentSlideIndex].id] 
                          ? 'opacity-0' : 'opacity-100'
                      }`}
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 256px, 320px"
                      onLoad={() => handleImageLoad(allSlides[currentSlideIndex].id)}
                      onError={() => handleImageError(allSlides[currentSlideIndex].id)}
                    />
                  )}
                </div>
                
                <div className="flex-1 flex items-center">
                  {allSlides[currentSlideIndex] && (
                    <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl xl:text-2xl leading-relaxed">
                      {allSlides[currentSlideIndex].content}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 p-6 md:p-8 flex justify-end">
            <Button
              onClick={handleNextSlide}
              variant="primary"
              endIcon={<ChevronRight size={20} className="md:w-6 md:h-6" />}
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
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