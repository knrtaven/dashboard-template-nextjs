import React from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  showQuestion: boolean;
  isMobile: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextChapter: () => void;
  onPrevChapter: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  volume,
  showQuestion,
  isMobile,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onNextChapter,
  onPrevChapter,
}) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <button 
        onClick={onPrevChapter}
        className="text-white hover:text-red-400 transition-colors"
        disabled={showQuestion}
      >
        <SkipBack size={isMobile ? 18 : 20} />
      </button>
      
      <button 
        onClick={onTogglePlay} 
        className="text-white hover:text-red-400 transition-colors"
        disabled={showQuestion}
      >
        {isPlaying ? <Pause size={isMobile ? 20 : 24} /> : <Play size={isMobile ? 20 : 24} />}
      </button>
      
      <button 
        onClick={onNextChapter}
        className="text-white hover:text-red-400 transition-colors"
        disabled={showQuestion}
      >
        <SkipForward size={isMobile ? 18 : 20} />
      </button>

      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleMute}
          className="text-white hover:text-red-400 transition-colors"
        >
          {isMuted ? <VolumeX size={isMobile ? 16 : 18} /> : <Volume2 size={isMobile ? 16 : 18} />}
        </button>
        
        {!isMobile && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={onVolumeChange}
            className="w-16 sm:w-20"
          />
        )}
      </div>
    </div>
  );
};