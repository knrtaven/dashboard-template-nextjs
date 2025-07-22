import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Chapter,
  Question,
  UserAnswer,
  UserAnswers,
  VideoPlayerState,
  MultipleChoiceQuestion,
  TextInputQuestion,
} from './types';

interface UseInteractiveVideoPlayerProps {
  videoUrl: string;
  chapters: Chapter[];
  questions: Question[];
  onProgressUpdate?: (progress: ProgressData) => void;
  onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
  autoPlay?: boolean;
  muted?: boolean;
}

interface ProgressData {
  currentTime: number;
  duration: number;
  progress: number;
  currentChapter: number;
  score: number;
  totalQuestions: number;
  completedQuestions: number;
}

export const useInteractiveVideoPlayer = ({
  // videoUrl,
  chapters,
  questions,
  onProgressUpdate,
  onQuestionAnswered,
  autoPlay = false,
  muted = false,
}: UseInteractiveVideoPlayerProps) => {
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: muted,
    currentChapter: 0,
    showQuestion: false,
    currentQuestion: null,
    userAnswers: {},
    selectedAnswer: null,
    essayAnswer: '',
    wordCount: 0,
    hasAnswered: false,
    score: 0,
    totalQuestions: 0,
    showChapters: false,
    showControls: true,
    isMobile: false,
  });

  const [hoverPosition, setHoverPosition] = useState<{ x: number; time: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Computed values
  const progressPercentage = useMemo(
    () => (state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0),
    [state.currentTime, state.duration]
  );

  const currentChapterInfo = useMemo(
    () => chapters[state.currentChapter] || null,
    [chapters, state.currentChapter]
  );

  // Utility functions
  const formatTime = useCallback((time: number): string => {
    if (!time || isNaN(time) || time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Progress bar hover handlers
  const handleProgressHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (state.duration > 0) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const time = (percentage / 100) * state.duration;

        setHoverPosition({ x: percentage, time });
      }
    },
    [state.duration]
  );

  const handleProgressLeave = useCallback(() => {
    setHoverPosition(null);
  }, []);

  // Debounced progress update to avoid excessive callbacks
  const updateProgress = useCallback(() => {
    if (onProgressUpdate) {
      // Clear any pending timeout
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }

      // Debounce the progress update
      progressUpdateTimeoutRef.current = setTimeout(() => {
        const progressData: ProgressData = {
          currentTime: state.currentTime,
          duration: state.duration,
          progress: progressPercentage,
          currentChapter: state.currentChapter,
          score: state.score,
          totalQuestions: questions.length,
          completedQuestions: Object.keys(state.userAnswers).length,
        };
        onProgressUpdate(progressData);
      }, 100);
    }
  }, [state, progressPercentage, questions.length, onProgressUpdate]);

  // Video event handlers
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration || 0;

    // Use functional state update to avoid stale closures
    setState((prevState) => {
      const pendingQuestion = questions.find(
        (q) =>
          Math.abs(currentTime - q.triggerTime) < 0.5 &&
          !prevState.userAnswers[q.id] &&
          !prevState.showQuestion
      );

      const activeChapter = chapters.findIndex(
        (chapter) => currentTime >= chapter.startTime && currentTime < chapter.endTime
      );

      let newState = {
        ...prevState,
        currentTime,
        duration,
      };

      if (activeChapter !== -1 && activeChapter !== prevState.currentChapter) {
        newState.currentChapter = activeChapter;
      }

      if (pendingQuestion) {
        // Pause video immediately
        if (video && !video.paused) {
          video.pause();
        }

        newState = {
          ...newState,
          isPlaying: false,
          showQuestion: true,
          currentQuestion: pendingQuestion,
        };
      }

      return newState;
    });
  }, [questions, chapters]);

  // Video controls
  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video || state.showQuestion) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  }, [state.isPlaying, state.showQuestion]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || !state.duration || state.showQuestion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = Math.max(0, Math.min(pos * state.duration, state.duration));

      video.currentTime = newTime;
      setState((prev) => ({ ...prev, currentTime: newTime }));
    },
    [state.duration, state.showQuestion]
  );

  const handleVolumeChange = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume }));
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !state.isMuted;
      video.muted = newMuted;
      setState((prev) => ({ ...prev, isMuted: newMuted }));
    }
  }, [state.isMuted]);

  // Question handling
  const handleQuestionAnswer = useCallback(
    (answer: string) => {
      if (!state.currentQuestion) return;

      let isCorrect = false;
      if (state.currentQuestion.type === 'multiple-choice') {
        const mcQ = state.currentQuestion as MultipleChoiceQuestion;
        isCorrect = mcQ.options.find((opt) => opt.id === answer)?.correct || false;
      } else if (state.currentQuestion.type === 'text-input') {
        const textQ = state.currentQuestion as TextInputQuestion;
        isCorrect = answer.toLowerCase().trim() === textQ.correctAnswer.toLowerCase().trim();
      } else if (
        state.currentQuestion.type === 'essay' ||
        state.currentQuestion.type === 'rating'
      ) {
        isCorrect = true;
      }

      const userAnswer: UserAnswer = {
        answer,
        correct: isCorrect,
        timestamp: state.currentTime,
        type: state.currentQuestion.type,
      };

      const questionId = state.currentQuestion.id;

      // Update state
      setState((prev) => {
        const newAnswers: UserAnswers = {
          ...prev.userAnswers,
          [questionId]: userAnswer,
        };

        return {
          ...prev,
          userAnswers: newAnswers,
          hasAnswered: true,
          score:
            isCorrect &&
            (state.currentQuestion?.type === 'multiple-choice' ||
              state.currentQuestion?.type === 'text-input')
              ? prev.score + 1
              : prev.score,
          showQuestion: false,
          currentQuestion: null,
        };
      });

      // Call callbacks asynchronously to avoid render phase issues
      setTimeout(() => {
        if (onQuestionAnswered) {
          onQuestionAnswered(questionId, userAnswer);
        }

        // Resume video
        const video = videoRef.current;
        if (video) {
          setState((prev) => ({ ...prev, isPlaying: true }));
          video.play().catch(console.error);
        }
      }, 0);
    },
    [state.currentQuestion, state.currentTime, onQuestionAnswered]
  );

  const jumpToQuestion = useCallback((question: Question) => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = question.triggerTime;
      setState((prev) => ({
        ...prev,
        currentTime: question.triggerTime,
        isPlaying: false,
        showQuestion: true,
        currentQuestion: question,
      }));
    }
  }, []);

  const closeQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showQuestion: false,
      currentQuestion: null,
    }));
  }, []);

  // Chapter navigation
  const jumpToChapter = useCallback(
    (chapterIndex: number) => {
      if (state.showQuestion) return;

      const video = videoRef.current;
      if (!video || chapterIndex < 0 || chapterIndex >= chapters.length) return;

      const chapter = chapters[chapterIndex];
      video.currentTime = chapter.startTime;
      setState((prev) => ({ ...prev, currentChapter: chapterIndex }));
    },
    [state.showQuestion, chapters]
  );

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setState((prev) => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState((prev) => ({ ...prev, isPlaying: false }));
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setState((prev) => ({ ...prev, duration: video.duration }));
      }
    };
    const handleCanPlay = () => {
      if (autoPlay) {
        video.play().catch(console.error);
      }
    };
    const handleError = (e: Event) => {
      console.error('Video failed to load:', e);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [handleTimeUpdate, autoPlay]);

  // Update progress when relevant state changes
  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    state,
    videoRef,
    progressPercentage,
    currentChapterInfo,
    hoverPosition,

    // Actions
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleToggleMute,
    handleQuestionAnswer,
    jumpToQuestion,
    closeQuestion,
    jumpToChapter,
    handleProgressHover,
    handleProgressLeave,

    // Utilities
    formatTime,
  };
};
