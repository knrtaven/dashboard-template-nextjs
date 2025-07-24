'use client';

import { BookOpen, MessageCircle, Users } from 'lucide-react';
import React from 'react';

interface VariantSelectorProps {
  onSelectVariant: (variant: 'culture-crossroads' | 'dialogue-scenarios' | 'story') => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ onSelectVariant }) => {
  return (
    <div className="flex h-[calc(100vh-57px)] items-start justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-6 md:h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] lg:py-2 xl:h-[calc(100vh-140px)] xl:py-6 dark:from-gray-900 dark:to-blue-900">
      <div className="w-full max-w-7xl">
        <div className="mb-8 text-center md:mb-10 lg:mb-0 xl:mb-6 2xl:mb-10">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-xl xl:text-3xl 2xl:text-4xl dark:text-white">
            Interactive Learning Modules
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-sm lg:leading-tight xl:text-lg 2xl:text-xl dark:text-gray-300">
            Choose your learning path to explore workplace dynamics and leadership skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-2 xl:grid-cols-3 xl:gap-8 2xl:gap-10">
          {/* Culture Crossroads Variant */}
          <div
            className="group flex transform cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8 lg:p-2 xl:p-6 2xl:p-8 dark:bg-gray-800"
            onClick={() => onSelectVariant('culture-crossroads')}
          >
            <div className="flex flex-1 flex-col text-center">
              <div className="from-brand-500 to-brand-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 lg:h-12 lg:w-12 lg:mb-1 xl:mb-4 xl:h-24 xl:w-24 2xl:mb-6">
                <Users size={24} className="text-white md:h-7 md:w-7 xl:h-8 xl:w-8" />
              </div>

              <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl lg:text-base lg:mb-2 xl:text-xl 2xl:text-2xl dark:text-white">
                Culture Crossroads
              </h2>

              <p className="mb-6 flex-1 text-xs leading-relaxed text-gray-600 md:text-sm lg:text-xs lg:mb-3 lg:leading-tight xl:text-base dark:text-gray-300">
                Navigate workplace scenarios through interactive storylines. Make leadership
                decisions and explore different outcomes.
              </p>

              <div className="mb-8 flex-shrink-0 space-y-2 md:space-y-3 lg:mb-2 lg:space-y-1 xl:mb-6 2xl:mb-8">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Multiple decision branches</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>8 different endings</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Leadership impact scenarios</span>
                </div>
              </div>

              <button className="from-brand-500 to-brand-primary hover:from-brand-600 hover:to-brand-primary-dark w-full transform rounded-lg bg-gradient-to-r px-6 py-3 text-xs font-semibold text-white transition-all duration-200 group-hover:scale-105 md:py-4 md:text-sm lg:py-1 lg:text-xs xl:py-4 xl:text-base 2xl:py-5">
                Start Culture Crossroads
              </button>
            </div>
          </div>

          {/* Dialogue Scenarios Variant */}
          <div
            className="group flex transform cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8 lg:p-2 xl:p-6 2xl:p-8 dark:bg-gray-800"
            onClick={() => onSelectVariant('dialogue-scenarios')}
          >
            <div className="flex flex-1 flex-col text-center">
              <div className="from-brand-500 to-brand-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 lg:h-12 lg:w-12 lg:mb-1 xl:mb-4 xl:h-24 xl:w-24 2xl:mb-6">
                <MessageCircle size={24} className="text-white md:h-7 md:w-7 xl:h-8 xl:w-8" />
              </div>

              <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl lg:text-base lg:mb-2 xl:text-xl 2xl:text-2xl dark:text-white">
                Dialogue Scenarios
              </h2>

              <p className="mb-6 flex-1 text-xs leading-relaxed text-gray-600 md:text-sm lg:text-xs lg:mb-3 lg:leading-tight xl:text-base dark:text-gray-300">
                Experience realistic workplace conversations and test your understanding through
                interactive dialogues.
              </p>

              <div className="mb-8 flex-shrink-0 space-y-2 md:space-y-3 lg:mb-2 lg:space-y-1 xl:mb-6 2xl:mb-8">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>3 workplace scenarios</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Interactive conversations</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Comprehension challenges</span>
                </div>
              </div>

              <button className="from-brand-500 to-brand-primary hover:from-brand-600 hover:to-brand-primary-dark w-full transform rounded-lg bg-gradient-to-r px-6 py-3 text-xs font-semibold text-white transition-all duration-200 group-hover:scale-105 md:py-4 md:text-sm lg:py-1 lg:text-xs xl:py-4 xl:text-base 2xl:py-5">
                Start Dialogue Scenarios
              </button>
            </div>
          </div>

          {/* Story Variant */}
          <div
            className="group flex transform cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8 lg:p-2 xl:p-6 2xl:p-8 dark:bg-gray-800"
            onClick={() => onSelectVariant('story')}
          >
            <div className="flex flex-1 flex-col text-center">
              <div className="from-brand-500 to-brand-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 lg:h-12 lg:w-12 lg:mb-1 xl:mb-4 xl:h-24 xl:w-24 2xl:mb-6">
                <BookOpen size={24} className="text-white md:h-7 md:w-7 xl:h-8 xl:w-8" />
              </div>

              <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl lg:text-base lg:mb-2 xl:text-xl 2xl:text-2xl dark:text-white">
                Mary&apos;s Story
              </h2>

              <p className="mb-6 flex-1 text-xs leading-relaxed text-gray-600 md:text-sm lg:text-xs lg:mb-3 lg:leading-tight xl:text-base dark:text-gray-300">
                Follow Mary&apos;s interactive journey about positive workplace culture with
                comprehension challenges.
              </p>

              <div className="mb-8 flex-shrink-0 space-y-2 md:space-y-3 lg:mb-2 lg:space-y-1 xl:mb-6 2xl:mb-8">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Progressive story slides</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Interactive quiz questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
                  <span className="bg-brand-500 h-2 w-2 rounded-full"></span>
                  <span>Workplace culture lesson</span>
                </div>
              </div>

              <button className="from-brand-500 to-brand-primary hover:from-brand-600 hover:to-brand-primary-dark w-full transform rounded-lg bg-gradient-to-r px-6 py-3 text-xs font-semibold text-white transition-all duration-200 group-hover:scale-105 md:py-4 md:text-sm lg:py-1 lg:text-xs xl:py-4 xl:text-base 2xl:py-5">
                Start Mary&apos;s Story
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:mt-10 lg:mt-0 xl:mt-6 2xl:mt-10">
          <p className="text-xs text-gray-500 md:text-sm xl:text-base dark:text-gray-400">
            This is only for demonstration purposes. These are the three variants of the module.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;
