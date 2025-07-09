/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { moduleBanner} from '../../../public/images/lessonAssets/wellnessBeing';
import { Marilu_Henner, temp_item } from '../../../public/images/lessonAssets/InmpactStressWP';

const ImpactofStressintheWorkplace = () => {
  const [currentSection, setCurrentSection] = useState(0);

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
      Aged Care - Your well-being at work - Lesson 3
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
              Workplace stress varies by environment and has common triggers like interpersonal conflicts and unclear priorities, which can increase anxiety. 
              While some stress can enhance focus and motivation, excessive and prolonged stress is detrimental to health and productivity. 
              It's crucial to monitor stress levels, recognise when they're overwhelming, and take action to maintain well-being.
              </p>


                <iframe 
                className='h-52 w-full'
                src='https://d28opw2vjq3clc.cloudfront.net/assets/Well-being%20at%20Work.mp4?v=1' 
                />


              {/* <button 
                onClick={() => navigateToSection(2)}
                className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-base sm:text-lg"
              >
                Let's get started!
              </button> */}
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
      <div className="relative -mx-4 md:-mx-3 -mt-12 md:-mt-16">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">The Effects of Work-Related Stress</h2>
          
          </div>
          
          <div className="p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            When stress isn’t well-controlled, individuals and even entire organisations can suffer the outcomes. 
            Drag the slider below to see the impacts of work-related stress on absenteeism, overall performance, and employer costs.
            </p>
          </div>

          <Image
                      className=' w-full h-full object-cover'
                      src={temp_item}
                      alt='ageCareModel'
                    />
        </div>
      </section>


      
       {/* Quote */}
       <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">


              <div className='flex gap-10'>

                <div className=''>
                  <div className='w-20 h-20 overflow-hidden rounded-full'>
                    <Image
                      className=' w-20 h-20 object-cover'
                      src={Marilu_Henner}
                      alt='ageCareModel'
                    />

                  </div>
                
                </div>

                <div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                    "Being in control of your life and choices you make, 
                    having realistic expectations about how to achieve your day-to-day challenges are the critical keys to stress management, 
                    which is perhaps the most important ingredient to living a happy, healthy, and rewarding life."
                    </p>

                    <p>Marilu Henner</p>
                </div>
              </div>
             

           
          </div>
        </div>
      </section>


      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 font-stretch-75%">Reflection</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
              Explore a little more about the impacts that stressors have on our overall quality of life and productivity. 
              Remember the choices are always ours to make. How can you continue to make good objective choices that are helpful to yourself 
              and others and support the development of workforce conditions based on achievement and connection? 
              </p>

              
        
          </div>
        </div>
      </section>
   

      {/* Completion Section */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 sm:w-24 h-1 bg-purple-600 mx-auto mb-6 sm:mb-8"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
            You're nearly done with this lesson!
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

export default ImpactofStressintheWorkplace;