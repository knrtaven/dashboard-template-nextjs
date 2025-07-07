"use client";
import { LEARNING_CARDS_DATA } from '@/constants';
import Image from 'next/image';
import React from 'react'

const LearningHeadline = () => {
  return (
    <div className="rounded-lg flex justify-evenly items-center gap-5 h-50 md:h-72 bg-[#7f56d9] relative overflow-hidden">
      {/* Background with gradient overlay - this will now respect the rounded boundaries */}
      {/* <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
        style={{
          backgroundImage: `url('/images/grid-image/image-03.png')`
        }}
      /> */}

        <Image
            src="/images/grid-image/image-01.png"
            alt=""
            fill
            className="object-cover"
            priority // if above the fold
          />
      <div className="absolute inset-0 bg-linear-45 from-0 via-purple-600/40 to-purple-600 " />
      
      {/* Left Side - positioned above background */}
      <div className='text-white relative z-10'>
        <h2 className="text-2xl font-bold text-white">
          Your Learning Path
        </h2>
        <p className="mt-1">
          Continue your courses and track your progress
        </p>
      </div>
      
      {/* Right Side - positioned above background */}
      <div className="hidden sm:flex items-center space-x-6 bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 relative z-10">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500 dark:text-blue-400">
            {LEARNING_CARDS_DATA.filter(course => course.progress === 100).length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600 dark:text-green-400">
            {LEARNING_CARDS_DATA.filter(course => course.progress > 0 && course.progress < 100).length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {LEARNING_CARDS_DATA.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Courses</div>
        </div>
      </div>
    </div>
  )
}

export default LearningHeadline