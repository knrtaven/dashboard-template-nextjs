/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { moduleBanner, question1, question2, question3 } from '../../../public/images/lessonAssets/wellnessBeing';

const WorkplaceWellbeingLesson = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [, setQuizAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState('');

  const handleQuizAnswer = (questionId: string, answer: string | number) => {
    setQuizAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const navigateToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  // Only lock scrolling for hero and intro sections
  useEffect(() => {
    if (currentSection <= 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; 
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentSection]);

  const lockedSections = [
    // Hero Section
    {
      id: 'hero',
      content: (
        <div className="min-h-screen relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-black bg-opacity-0"></div>
  <div className="absolute inset-0 opacity-20">
    <Image
      className="w-full h-full object-cover"
      src={moduleBanner}
      alt="moduleBanner"
      fill
      sizes="100vw"
      priority
    />
  </div>
  <div className="relative z-10 text-center px-4 py-20">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
      Aged Care - Your well-being at work - Lesson 1
    </h1>
  </div>
  <button 
    onClick={() => navigateToSection(1)}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-200 transition-colors animate-bounce"
  >
    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
  </button>
</div>
      )
    },
    // Introduction Section
    {
      id: 'introduction',
      content: (
        <div className="h-screen bg-gray-50 flex items-center justify-center px-4 relative">
          <button 
            onClick={() => navigateToSection(0)}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          
          <div className="container mx-auto max-w-4xl text-center">
            <div className=" p-6 sm:p-8 lg:p-12">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                We all play a part in making our workplace healthy and happy. By being aware of how we act, 
                we can improve our well-being and help others too. This reduces stress and anxiety, allowing 
                us to focus on our work and relationships better. This course will provide you with tools to 
                check your well-being and teach basic psychology to support your journey.
              </p>
              <button 
                onClick={() => navigateToSection(2)}
                className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg"
              >
                Let's get started!
              </button>
            </div>
          </div>

          <button 
            onClick={() => navigateToSection(2)}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-gray-800 transition-colors animate-bounce"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      )
    }
  ];

  // Show locked sections with controlled navigation
  if (currentSection <= 1) {
    return (
      <div className="relative -mx-4 md:-mx-3 -mt-4 md:-mt-16">
        <div 
          className="transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateY(-${currentSection * 100}vh)`,
            height: `${lockedSections.length * 100}vh`
          }}
        >
          {lockedSections.map((section, index) => (
            <div key={section.id} className="relative">
              {section.content}
            </div>
          ))}
        </div>
        
        {/* Section indicators - only for locked sections */}
        <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-50">
          {lockedSections.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`w-2 h-8 sm:w-3 sm:h-12 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'bg-purple-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Free scrolling quiz content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quiz Introduction */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Workplace Well-being Quiz</h2>
            <p className="text-gray-600 text-base sm:text-lg">This week's objective is to complete a quiz.</p>
          </div>
          
          <div className="p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Now that you know the basic Work-Rite principles and behaviors, and understand how 
              oxytocin and cortisol affect our well-being at work, let's take a short quiz to see what you've 
              learned. Once you finish the quiz, you're done for the week.
            </p>
          </div>
        </div>
      </section>

      {/* Question 1 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
              Myth or Fact - I am a victim of the circumstances that surround me
            </h3>
            
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-[70%] h-[70%] sm:w-[100%] sm:h-[100%] bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">

                  <Image
                  className='w-full h-full'
                  src={question1}
                  alt="moduleBanner"
                  />

              </div>
            </div>

            <div className="max-w-md mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="radio" 
                  name="q1" 
                  value="myth"
                  onChange={() => handleQuizAnswer('q1', 'myth')}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 text-base sm:text-lg">Myth</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="radio" 
                  name="q1" 
                  value="fact"
                  onChange={() => handleQuizAnswer('q1', 'fact')}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 text-base sm:text-lg">Fact</span>
              </label>
            </div>

            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg w-full sm:w-auto">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Question 2 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
              How often do people make judgments of others?
            </h3>
            
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-[70%] h-[70%] sm:w-[100%] sm:h-[100%] bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">

                  <Image
                  className='w-full h-full'
                  src={question2}
                  alt="moduleBanner"
                  />

              </div>
            </div>

            <div className="max-w-md mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {['1-2 times per week', '3-4 times per week', '4-5 times per week', 'Every day'].map((option, idx) => (
                <label key={idx} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="q2" 
                    value={option}
                    onChange={() => handleQuizAnswer('q2', option)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-lg">{option}</span>
                </label>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg w-full sm:w-auto">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Matching Exercise */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
              Match each behavior on the left to its corresponding impact on the right.
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <div className="space-y-3">
                  {[
                    'Negative thoughts',
                    'Lack of restful sleep', 
                    'Positive thoughts',
                    'Working alone',
                    'Have no control',
                    'Regular reflection'
                  ].map((behavior, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                      <span className="text-gray-700 font-medium text-sm sm:text-base">≡</span>
                      <span className="text-gray-800 flex-1 mx-2 sm:mx-4 text-sm sm:text-base">{behavior}</span>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-200 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="space-y-3">
                  {[
                    'Better decisions',
                    'Tired and cranky',
                    'Feelings of isolation', 
                    'Powerlessness',
                    'Bad experiences',
                    'Great experiences'
                  ].map((impact, idx) => (
                    <div key={idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg border-r-4 border-blue-500">
                      <span className="text-gray-800 text-sm sm:text-base">{impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg w-full sm:w-auto">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Question */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
              Who is ultimately responsible for your well-being at work?
            </h3>
            
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-[70%] h-[70%] sm:w-[100%] sm:h-[100%] bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">

                  <Image
                  className='w-full h-full'
                  src={question3}
                  alt="moduleBanner"
                  />

              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <textarea 
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Type your answer here"
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg resize-none h-24 sm:h-32 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-lg"
              />
            </div>

            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg w-full sm:w-auto">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Completion Section */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 sm:w-24 h-1 bg-purple-600 mx-auto mb-6 sm:mb-8"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
            You're powering through this lesson, almost done!
          </h2>
          
          <div className=" p-6 sm:p-8 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Complete</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Click the button to finalise your module completion.</p>
              <button className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg w-full">
                COMPLETE HERE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-8 sm:h-16"></div>

      {/* Back to top button for quiz section */}
      <button 
        onClick={() => navigateToSection(0)}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      >
        <ChevronUp className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default WorkplaceWellbeingLesson;