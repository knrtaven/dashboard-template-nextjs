"use client";

import React from 'react';
import { Users, MessageCircle, BookOpen } from 'lucide-react';

interface VariantSelectorProps {
  onSelectVariant: (variant: 'culture-crossroads' | 'dialogue-scenarios' | 'story') => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ onSelectVariant }) => {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Interactive Learning Modules
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Choose your learning path to explore workplace dynamics and leadership skills.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Culture Crossroads Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
               onClick={() => onSelectVariant('culture-crossroads')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users size={24} className="text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Culture Crossroads
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
Navigate workplace scenarios through interactive storylines. Make leadership decisions and explore different outcomes.
              </p>
              
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Multiple decision branches</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>8 different endings</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Leadership impact scenarios</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105">
                Start Culture Crossroads
              </button>
            </div>
          </div>

          {/* Dialogue Scenarios Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
               onClick={() => onSelectVariant('dialogue-scenarios')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={24} className="text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Dialogue Scenarios
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
Experience realistic workplace conversations and test your understanding through interactive dialogues.
              </p>
              
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>3 workplace scenarios</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Interactive conversations</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Comprehension challenges</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105">
                Start Dialogue Scenarios
              </button>
            </div>
          </div>

          {/* Story Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
               onClick={() => onSelectVariant('story')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} className="text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Mary&apos;s Story
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
Follow Mary&apos;s interactive journey about positive workplace culture with comprehension challenges.
              </p>
              
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Progressive story slides</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Interactive quiz questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  <span>Workplace culture lesson</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-brand-500 to-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-primary-dark transition-all duration-200 transform group-hover:scale-105">
                Start Mary&apos;s Story
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            This is only for demonstration purposes. These are the three variants of the module.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;