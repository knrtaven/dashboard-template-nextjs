"use client";

import React from 'react';
import { Users, MessageCircle } from 'lucide-react';

interface VariantSelectorProps {
  onSelectVariant: (variant: 'culture-crossroads' | 'dialogue-scenarios') => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ onSelectVariant }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Learning Modules
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your learning experience. Both modules explore workplace dynamics and leadership through different interactive approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Culture Crossroads Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
               onClick={() => onSelectVariant('culture-crossroads')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={32} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Culture Crossroads
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Navigate complex workplace scenarios through branching storylines. Make leadership decisions that shape team culture and see how different paths lead to various outcomes.
              </p>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Multiple decision branches</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>8 different endings</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Leadership impact scenarios</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform group-hover:scale-105">
                Start Culture Crossroads
              </button>
            </div>
          </div>

          {/* Dialogue Scenarios Variant */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
               onClick={() => onSelectVariant('dialogue-scenarios')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={32} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Dialogue Scenarios
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Experience realistic workplace conversations and test your understanding. Watch dialogues unfold and demonstrate your comprehension through targeted questions.
              </p>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>3 workplace scenarios</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Interactive conversations</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Comprehension challenges</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform group-hover:scale-105">
                Start Dialogue Scenarios
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            This is only for demonstration purposes. These are the three variants of the module.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;