"use client";
import { getIncompleteWorkRiteModules } from '@/constants/lessons';

import React from 'react'
import { IncompleteCard } from './IncompleteCard';

const IncompleteCards = () => {
  const incompleteWorkRite = getIncompleteWorkRiteModules();
  console.log(incompleteWorkRite)
  return (
    <div className='space-y-5'>

      <div className='border h-[600px] overflow-y-scroll md:h-52 '>

        <div>
          <span>Pick up where you left off</span>
        </div>

          <IncompleteCard/>
      </div>
    </div>
  )
}

export default IncompleteCards