"use client";

import React from 'react';
import { Users, MessageCircle, BookOpen } from 'lucide-react';

interface VariantSelectorProps {
  onSelectVariant: (variant: 'culture-crossroads' | 'dialogue-scenarios' | 'story') => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ onSelectVariant }) => {
  return (
    <div className="min-h-[calc(100vh-57px)] md:min-h-[calc(100vh-140px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 py-6">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8 md:mb-10 xl:mb-12">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Learning Modules
          </h1>
          <p className="text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
Choose your learning path to explore workplace dynamics and leadership skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {/* Culture Crossroads Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 xl:p-10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group flex flex-col"
               onClick={() => onSelectVariant('culture-crossroads')}>
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={24} className="text-white md:w-7 md:h-7 xl:w-8 xl:h-8" />
              </div>
              
              <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Culture Crossroads
              </h2>
              
              <p className="text-xs md:text-sm xl:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
Navigate workplace scenarios through interactive storylines. Make leadership decisions and explore different outcomes.
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-8 flex-shrink-0">
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Multiple decision branches</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>8 different endings</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Leadership impact scenarios</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 md:py-4 xl:py-5 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105 text-xs md:text-sm xl:text-base">
                Start Culture Crossroads
              </button>
            </div>
          </div>

          {/* Dialogue Scenarios Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 xl:p-10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group flex flex-col"
               onClick={() => onSelectVariant('dialogue-scenarios')}>
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={24} className="text-white md:w-7 md:h-7 xl:w-8 xl:h-8" />
              </div>
              
              <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Dialogue Scenarios
              </h2>
              
              <p className="text-xs md:text-sm xl:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
Experience realistic workplace conversations and test your understanding through interactive dialogues.
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-8 flex-shrink-0">
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>3 workplace scenarios</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Interactive conversations</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Comprehension challenges</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 md:py-4 xl:py-5 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105 text-xs md:text-sm xl:text-base">
                Start Dialogue Scenarios
              </button>
            </div>
          </div>

          {/* Story Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 xl:p-10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group flex flex-col"
               onClick={() => onSelectVariant('story')}>
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} className="text-white md:w-7 md:h-7 xl:w-8 xl:h-8" />
              </div>
              
              <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mary&apos;s Story
              </h2>
              
              <p className="text-xs md:text-sm xl:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
Follow Mary&apos;s interactive journey about positive workplace culture with comprehension challenges.
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-8 flex-shrink-0">
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Progressive story slides</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Interactive quiz questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Workplace culture lesson</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 md:py-4 xl:py-5 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105 text-xs md:text-sm xl:text-base">
                Start Mary&apos;s Story
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10 xl:mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm xl:text-base">
            This is only for demonstration purposes. These are the three variants of the module.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;