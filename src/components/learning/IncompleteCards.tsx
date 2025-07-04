"use client";
import { getIncompleteWorkRiteModules } from '@/constants/lessons';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const IncompleteCards = () => {
  const incompleteWorkRite = getIncompleteWorkRiteModules();
  console.log(incompleteWorkRite)
  return (
    <div className='space-y-5'>

      <div className='border h-[600px] overflow-y-scroll md:h-52 '>

        <div>
          <span>Pick up where you left off</span>
        </div>

        <div className='flex items-center'>
          <div className=''>
            <div className='rounded-xl border border-gray-200 overflow-hidden'>
              <div className='p-3'>

                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-3 mb-3'>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Eiusmod Tempor
                        {/* {module.title} */}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      description
                        {/* {module.description} */}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>time</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <span>1 topics</span>
                        </div>
                        
                  
                      </div>
                  </div>

                  <div  className='flex items-center space-x-4'>
                    <div>
                    <Link
                          href={'/'}
                          // href={`/learning/courses/${courseId}/module/${module.id}`}
                          className={`px-6 py-3 rounded-lg bg-[#7f56d9] text-white font-medium transition-colors`}
                        >
                          Continue
                        </Link>
                    </div>

                  </div>
                  
                </div>
              </div>
            </div>
            {}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncompleteCards