'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const VideoPlayerSkeleton: React.FC = () => {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-lg bg-gray-900 shadow-2xl">
      <div
        className="flex items-center justify-center bg-gray-800"
        style={{ width: 450, height: 800 }}
      >
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="mb-4 h-2 rounded bg-gray-600"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded bg-gray-600"></div>
            <div className="h-4 w-20 rounded bg-gray-600"></div>
          </div>
          <div className="h-4 w-16 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSkeleton;