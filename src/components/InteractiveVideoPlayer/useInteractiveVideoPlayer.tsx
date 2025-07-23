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
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const progressPercentage = useMemo(
    () => (state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0),
    [state.currentTime, state.duration]
  );

  const currentChapterInfo = useMemo(
    () => questions[state.currentChapter] || null,
    [chapters, state.currentChapter]
  );

  const formatTime = useCallback((time: number): string => {
    if (!time || isNaN(time) || time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const fadeInVolume = useCallback(() => {
    const video = videoRef.current;
    if (!video || state.isMuted) return;

    let currentVolume = 0;
    const targetVolume = state.volume;
    const fadeSteps = 30;
    const fadeInterval = 1500 / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    video.volume = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentVolume += volumeStep;

      if (currentVolume >= targetVolume) {
        currentVolume = targetVolume;
        video.volume = currentVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      } else {
        video.volume = currentVolume;
      }
    }, fadeInterval);
  }, [state.volume, state.isMuted]);

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

  const updateProgress = useCallback(() => {
    if (onProgressUpdate) {
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }

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

  const getQuestionsAtTime = useCallback(
    (time: number) => {
      return questions.filter((q) => Math.abs(time - q.triggerTime) < 0.5);
    },
    [questions]
  );

  const getUnansweredQuestionsAtTime = useCallback(
    (time: number, userAnswers: UserAnswers) => {
      return getQuestionsAtTime(time).filter((q) => !userAnswers[q.id]);
    },
    [getQuestionsAtTime]
  );

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration || 0;

    setState((prevState) => {
      const unansweredQuestionsAtCurrentTime = getUnansweredQuestionsAtTime(
        currentTime,
        prevState.userAnswers
      );
      const pendingQuestion = unansweredQuestionsAtCurrentTime.find((q) => !prevState.showQuestion);

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

      if (pendingQuestion && !prevState.showQuestion) {
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
  }, [questions, chapters, getUnansweredQuestionsAtTime]);

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

  const handleVolumeChange = useCallback(
    (volume: number) => {
      setState((prev) => ({ ...prev, volume }));
      if (videoRef.current && !state.isMuted) {
        videoRef.current.volume = volume;
      }
    },
    [state.isMuted]
  );

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !state.isMuted;
      video.muted = newMuted;
      setState((prev) => ({ ...prev, isMuted: newMuted }));
    }
  }, [state.isMuted]);

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

      setState((prev) => {
        const newAnswers: UserAnswers = {
          ...prev.userAnswers,
          [questionId]: userAnswer,
        };

        const remainingQuestionsAtTime = getUnansweredQuestionsAtTime(prev.currentTime, newAnswers);
        const nextQuestion = remainingQuestionsAtTime.find((q) => q.id !== questionId);

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
          showQuestion: !!nextQuestion,
          currentQuestion: nextQuestion || null,
        };
      });

      setTimeout(() => {
        if (onQuestionAnswered) {
          onQuestionAnswered(questionId, userAnswer);
        }

        setState((prev) => {
          const remainingQuestions = getUnansweredQuestionsAtTime(
            prev.currentTime,
            prev.userAnswers
          );

          if (remainingQuestions.length === 0) {
            const video = videoRef.current;
            if (video) {
              setState((prevState) => ({ ...prevState, isPlaying: true }));
              fadeInVolume();
              video.play().catch(console.error);
            }
          }

          return prev;
        });
      }, 0);
    },
    [
      state.currentQuestion,
      state.currentTime,
      onQuestionAnswered,
      fadeInVolume,
      getUnansweredQuestionsAtTime,
    ]
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setState((prev) => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState((prev) => ({ ...prev, isPlaying: false }));
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setState((prev) => ({ ...prev, duration: video.duration }));
        video.volume = state.volume;
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
  }, [handleTimeUpdate, autoPlay, state.volume]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  useEffect(() => {
    return () => {
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return {
    state,
    videoRef,
    progressPercentage,
    currentChapterInfo,
    hoverPosition,
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
    formatTime,
  };
};
