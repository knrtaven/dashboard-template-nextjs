"use client";
import React from 'react'
import InteractiveVideoPlayer from '../InteractiveVideoPlayer/interActiveVideoPlayer';

const LearningCards = () => {
  return (
    <div className="rounded-lg flex justify-evenly gap-5 h-50 bg-[#7f56d9]">
        <InteractiveVideoPlayer/>

        {/* <div>
        <span>Your learning Path</span>

        <p>Please complete your lessons each month.</p>
        </div>
        
        <div className="bg-[#0205d3] h-10 boredr">
          items here
        </div> */}

      </div>
  )
}

export default LearningCards