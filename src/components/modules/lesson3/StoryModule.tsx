"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { storySlides, quizQuestions, StorySlide, QuizQuestion } from './data/story';

interface StoryModuleProps {
  onBack: () => void;
}

const StoryModule: React.FC<StoryModuleProps> = ({ onBack }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<StorySlide[]>([]);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const latestSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storySlides.length > 0) {
      setVisibleSlides([storySlides[0]]);
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
  }, [visibleSlides]);

  const handleNextSlide = () => {
    if (currentSlideIndex < storySlides.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      setVisibleSlides(prev => [...prev, storySlides[nextIndex]]);
    } else {
      setIsStoryComplete(true);
    }
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-orange-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Congratulations!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              You've successfully completed Mary's Story and demonstrated your understanding of positive workplace culture.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
            >
              Return to Module Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isStoryComplete) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-orange-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Module Selection</span>
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Knowledge Check
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Let's see what you learned from Mary's story about positive workplace culture.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
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
                        : showFeedback && option.isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
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
                      {showFeedback && option.isCorrect && selectedAnswer !== option.id && (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-orange-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back to Module Selection</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mary's Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A lesson in positive workplace culture
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: '100%', maxWidth: '400px' }}>
              <div
                className="bg-orange-800 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / storySlides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div
            ref={storyContainerRef}
            className="h-96 overflow-y-auto p-8 space-y-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {visibleSlides.map((slide, index) => (
              <div
                key={slide.id}
                ref={index === visibleSlides.length - 1 ? latestSlideRef : null}
                className="flex items-center space-x-6 animate-fade-in"
              >
                <div className="w-32 h-32 bg-gray-400 dark:bg-gray-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-500 dark:bg-gray-700 rounded"></div>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                    {slide.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 p-6 flex justify-end">
            <button
              onClick={handleNextSlide}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{currentSlideIndex < storySlides.length - 1 ? 'Next' : 'Continue to Quiz'}</span>
              <ChevronRight size={20} />
            </button>
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
      `}</style>
    </div>
  );
};

export default StoryModule;