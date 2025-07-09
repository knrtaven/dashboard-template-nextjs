/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { moduleBanner} from '../../../public/images/lessonAssets/wellnessBeing';
import { Aged_Care_Model, asset_1, asset_2, asset_3 } from '../../../public/images/lessonAssets/fiveDaysHealthierYou';

const FiveDaysToAHealthierYou = () => {
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
      Aged Care - Your well-being at work - Lesson 2
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
              Let's be honest: a lot of us don't take the time to think about our habits until it's too late. 
              By that point, we might already be feeling sick, unhappy, or completely exhausted.
              This week, we're going to guide you through a straightforward approach to developing fresh, healthier, and more beneficial habits in the workplace. 
              Get ready to be inspired!
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

  // Free scrolling content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Introduction */}
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

      {/* content 1 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        
              <h3 className="text-purple-600 text-lg font-medium mb-3 italic">Day 1</h3>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Learn the Work-Rite Behaviours & Principles</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you don't know these behaviours already, take the time to learn them by heart. Your 
                task today is to be able to speak to your behaviours without any prompts.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Give yourself a pat on the back or a little treat when you achieve this goal.
              </p>
              
              <Image
                src={Aged_Care_Model}
                alt='ageCareModel'
              />
              
           
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4">
        <div className="w-px h-16 bg-gray-300"></div>
      </div>

       {/* Day 2 */}
       <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
           
              <h3 className="text-purple-600 text-lg font-medium mb-3 italic">Day 2</h3>

              <h4 className="text-xl font-bold text-gray-800 mb-4">Recognise the Work-Rite Behaviours & Principles</h4>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Let's start with something simple today. Look out for someone who is demonstrating 
                one of the Work-Rite behaviours and compliment them by saying something like 'hey, I 
                saw you do x today' then follow up with 'That is a great example of [y behaviour]'.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                If you are feeling adventurous, login and showcase their achievement, or personally 
                thank them and tell them how much you appreciate what they have done.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                This is your chance to make someone's day by giving them and you a dose of 
                Oxytocin!
              </p>
              
             
              <div className="rounded-lg">
              <Image
                className='rounded-lg'
                src={asset_1}
                alt='ageCareModel'
              />
              </div>
           
          </div>
        </div>
      </section>

       {/* Section Divider */}
       <div className="flex justify-center py-4">
        <div className="w-px h-16 bg-gray-300"></div>
      </div>

      {/* Day 3 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          
              <h3 className="text-purple-600 text-lg font-medium mb-3 italic">Day 3</h3>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Connect with your Colleagues</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                People who seek to connect with their colleagues generally experience more positive 
                workplace outcomes. One 2010 study found that people who have more substantive 
                conversations rather than small talk report higher well-being and quality of life scores.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Today, try coming up with a fun way you can positively apply the Work-Rite 
                behaviours with your colleagues.
              </p>
              
       
              <div className="rounded-lg">
                 <Image
                className='rounded-lg'
                src={asset_2}
                alt='ageCareModel'
                />
              </div>
       
          </div>
        </div>
      </section>

       {/* Section Divider */}
       <div className="flex justify-center py-4">
        <div className="w-px h-16 bg-gray-300"></div>
      </div>

      {/* Day 4 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          
              <h3 className="text-purple-600 text-lg font-medium mb-3 italic">Day 4</h3>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Make time for yourself</h4>
              
                <iframe 
                className='h-96 w-full mb-5'
                src='https://embed.ted.com/embed/guy_winch_why_we_all_need_to_practice_emotional_first_aid' 
                />
           
              <p className="text-gray-700 mb-6 leading-relaxed">
              We often get so busy that we forget to take time to reflect. 
              Sometimes we don’t even realise we have not been reflecting until we begin to feel tired and worn out. 
              Do you get enough sleep? Are you allowing time for fun? When did you last engage in an activity that gave you personal enjoyment? 
              Write down one action you can take today to take care of yourself.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Want to know more?  
                This video from psychologist Dr Guy Winch makes the case for the importance of caring for your psychological health and emotional well-being.
              </p>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex justify-center py-4">
        <div className="w-px h-16 bg-gray-300"></div>
      </div>

      {/* Day 5 */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          
              <h3 className="text-purple-600 text-lg font-medium mb-3 italic">Day 5</h3>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Reflect on how you went</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Did you follow all the daily tasks this week? If you did, how do you feel? 
                Do you feel better having taken the time to connect with yourself and your colleagues?
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                If you didn't, you can always choose to have a go next week.
              </p>

              <div className="rounded-lg">
                 <Image
                className='rounded-lg'
                src={asset_3}
                alt='ageCareModel'
                />
              </div>
        
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 ">Reflection</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
              Start acknowledging the choices and actions you make that affect your personal well-being. 
              Are these choices helpful or harmful to your well-being? 
              The most important thing is to gain clarity on the decisions we make 
              and the actions we can take to improve our own well-being and overall quality of life experience. 
              </p>

            
        
          </div>
        </div>
      </section>
   

      {/* Completion Section */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 sm:w-24 h-1 bg-purple-600 mx-auto mb-6 sm:mb-8"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
            You’re so close to the finish line for this lesson, keep it up!
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

export default FiveDaysToAHealthierYou;