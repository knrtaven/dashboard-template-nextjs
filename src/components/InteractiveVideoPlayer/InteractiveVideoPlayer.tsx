'use client';

import React from 'react';
import { Pause, Play, Loader2 } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { useInteractiveVideoPlayer } from './useInteractiveVideoPlayer';
import { QuestionModal } from './QuestionModal';
import { InteractiveVideoPlayerProps } from './types';

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  videoUrl,
  chapters,
  questions,
  onProgressUpdate,
  onQuestionAnswered,
  className = '',
  width = 320,
  height = 240,
  poster,
  captions = [],
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  const {
    state,
    videoRef,
    progressPercentage,
    currentChapterInfo,
    hoverPosition,
    handlePlayPause,
    handleSeek,
    handleQuestionAnswer,
    jumpToQuestion,
    closeQuestion,
    handleProgressHover,
    handleProgressLeave,
    formatTime,
  } = useInteractiveVideoPlayer({
    videoUrl,
    chapters,
    questions,
    onProgressUpdate,
    onQuestionAnswered,
    autoPlay,
    muted,
  });

  const {
    isOpen: isQuestionModalOpen,
    openModal: openQuestionModal,
    closeModal: closeQuestionModal,
  } = useModal();

  // Handle question modal state
  React.useEffect(() => {
    if (state.showQuestion && state.currentQuestion && !isQuestionModalOpen) {
      openQuestionModal();
    } else if (!state.showQuestion && isQuestionModalOpen) {
      closeQuestionModal();
    }
  }, [
    state.showQuestion,
    state.currentQuestion,
    isQuestionModalOpen,
    openQuestionModal,
    closeQuestionModal,
  ]);

  const handleModalClose = React.useCallback(() => {
    closeQuestion();
    closeQuestionModal();
  }, [closeQuestion, closeQuestionModal]);

  // Determine if we should use height from props or aspect ratio
  const useCustomHeight =
    height === '100%' ||
    height === '100vh' ||
    (typeof height === 'string' && height.includes('calc'));

  const containerAspectRatio = useCustomHeight ? '' : 'aspect-[9/16] sm:aspect-video';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-black shadow-2xl ${containerAspectRatio} ${className}`}
      style={useCustomHeight ? { height: height } : undefined}
    >
      {/* Video Element with proper aspect ratio handling */}
      <video
        ref={videoRef}
        width={width}
        height={useCustomHeight ? '100%' : height}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={state.isMuted}
        onClick={handlePlayPause}
        preload="metadata"
        playsInline
        controls={false}
        aria-label="Interactive video player"
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        {captions.map((caption, index) => (
          <track
            key={index}
            src={caption.src}
            kind={caption.kind || 'subtitles'}
            srcLang={caption.srcLang}
            label={caption.label}
            default={index === 0}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Question Modal */}
      {state.currentQuestion && (
        <QuestionModal
          question={state.currentQuestion}
          isOpen={isQuestionModalOpen}
          onClose={handleModalClose}
          onAnswer={(answer) => {
            handleQuestionAnswer(answer);
          }}
        />
      )}

      {/* Video Controls Overlay */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
        {/* Progress Bar */}
        <div className="relative mb-4">
          <div
            className="bg-opacity-30 h-2 w-full cursor-pointer rounded bg-white transition-all hover:h-3"
            onClick={handleSeek}
            onMouseMove={handleProgressHover}
            onMouseLeave={handleProgressLeave}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={state.duration}
            aria-valuenow={state.currentTime}
            aria-label="Video progress"
          >
            {/* Progress fill */}
            <div
              className="bg-brand-500 h-full rounded transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Hover Circle Marker */}
            {hoverPosition && (
              <div
                className="bg-brand-500 absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-75"
                style={{ left: `${hoverPosition.x}%` }}
              />
            )}

            {/* Question Markers */}
            {questions.map((question) => {
              const markerPosition =
                state.duration > 0 ? (question.triggerTime / state.duration) * 100 : 0;
              const isAnswered = state.userAnswers[question.id];

              return (
                <div
                  key={question.id}
                  className={`absolute top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-all duration-200 hover:scale-125 ${
                    isAnswered ? 'bg-green-400' : 'bg-blue-400'
                  }`}
                  style={{
                    left: `${Math.max(0, Math.min(100, markerPosition))}%`,
                  }}
                  title={`Question ${question.id} at ${formatTime(question.triggerTime)} ${
                    isAnswered ? '(Answered)' : '(Click to answer)'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToQuestion(question);
                  }}
                />
              );
            })}
          </div>

          {/* Timestamp Popup */}
          {hoverPosition && (
            <div
              className="absolute bottom-full z-30 mb-2 -translate-x-1/2 transform rounded bg-black/90 px-2 py-1 text-xs text-white shadow-lg"
              style={{ left: `${hoverPosition.x}%` }}
            >
              {formatTime(hoverPosition.time)}
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-black/90" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              disabled={state.showQuestion}
              className={`hover:text-brand-500 text-white transition-colors ${
                state.showQuestion ? 'cursor-not-allowed opacity-50' : ''
              }`}
              aria-label={state.isPlaying ? 'Pause video' : 'Play video'}
            >
              {state.isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <span className="font-mono text-sm">
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </span>

            {currentChapterInfo && (
              <span className="hidden text-sm sm:block">{currentChapterInfo.title}</span>
            )}
          </div>

          <div className="text-sm">
            Score: {state.score}/{questions.length}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {state.duration === 0 && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex items-center space-x-2 text-white">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveVideoPlayer;
