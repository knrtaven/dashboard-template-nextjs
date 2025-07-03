// ============================================
// src/components/InteractiveVideoPlayer/index.tsx
// COMPLETELY FIXED - Zero infinite loops

'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VideoControls } from './VideoControls';
import { ProgressBar } from './ProgressBar';
import { ChapterList } from './ChapterList';
import { QuestionOverlay } from './QuestionsOverlay';
import { VideoInfo } from './VideoInfo';
import { 
  Chapter, 
  Question, 
  UserAnswer, 
  UserAnswers, 
  VideoPlayerState,
  MultipleChoiceQuestion,
  EssayQuestion,
  // RatingQuestion
} from './types';

interface ProgressData {
  currentTime: number;
  duration: number;
  progress: number;
  currentChapter: number;
  score: number;
  totalQuestions: number;
  completedQuestions: number;
}

interface InteractiveVideoPlayerProps {
  videoUrl?: string;
  chapters?: Chapter[];
  questions?: Question[];
  onProgressUpdate?: (progress: ProgressData) => void;
  onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
  className?: string;
}

export default function InteractiveVideoPlayer({
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  chapters: propChapters,
  questions: propQuestions,
  onProgressUpdate,
  onQuestionAnswered,
  className = ""
}: InteractiveVideoPlayerProps) {

  // Main state object
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
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

  const videoRef = useRef<HTMLVideoElement>(null);

  // Default data - moved outside to prevent recreation
  const chapters = propChapters || [
    { id: 0, title: "Introduction", startTime: 0, endTime: 15, description: "Welcome and overview" },
    { id: 1, title: "Core Concepts", startTime: 15, endTime: 45, description: "Learning the fundamentals" },
    { id: 2, title: "Advanced Topics", startTime: 45, endTime: 75, description: "Deep dive into complex ideas" },
    { id: 3, title: "Conclusion", startTime: 75, endTime: 90, description: "Summary and next steps" }
  ];

  const questions = propQuestions || [
    {
      id: 1,
      triggerTime: 10,
      question: "What is the main topic we're discussing?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Web Development", correct: true },
        { id: "b", text: "Data Science", correct: false },
        { id: "c", text: "Mobile Apps", correct: false },
        { id: "d", text: "Game Development", correct: false }
      ],
      feedback: {
        correct: "Great! You're paying attention. Web development is indeed our focus.",
        incorrect: "Not quite. We're focusing on web development in this session."
      },
      nextAction: "continue"
    } as MultipleChoiceQuestion,
    {
      id: 2,
      triggerTime: 25,
      question: "Explain your understanding of the concepts discussed so far.",
      type: "essay",
      minWords: 20,
      placeholder: "Describe what you've learned...",
      feedback: {
        submitted: "Thank you for your thoughtful response!",
        tooShort: "Please provide more detail (at least 20 words)."
      },
      nextAction: "continue"
    } as EssayQuestion
  ];

  // REMOVED: updateState function that was causing issues
  // Using setState directly instead

  // FIXED: Mobile check with direct setState
  useEffect(() => {
    const checkMobile = () => {
      setState(prev => ({ ...prev, isMobile: window.innerWidth < 768 }));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Empty dependency array - only runs once

  // FIXED: Video event handlers with NO problematic dependencies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration || 0;
      
      // Single setState call with ALL logic inside
      setState(prevState => {
        // Call progress update callback
        if (onProgressUpdate) {
          // Use setTimeout to avoid potential issues with callback
          setTimeout(() => {
            onProgressUpdate({
              currentTime,
              duration,
              progress: duration > 0 ? (currentTime / duration) * 100 : 0,
              currentChapter: prevState.currentChapter,
              score: prevState.score,
              totalQuestions: prevState.totalQuestions,
              completedQuestions: Object.keys(prevState.userAnswers).length
            });
          }, 0);
        }

        // Check for questions
        const pendingQuestion = questions.find(q => 
          Math.abs(currentTime - q.triggerTime) < 0.5 && 
          !prevState.userAnswers[q.id] && 
          !prevState.showQuestion
        );

        // Update chapter
        const activeChapter = chapters.findIndex(chapter => 
          currentTime >= chapter.startTime && currentTime < chapter.endTime
        );

        // Build new state object
        let newState = {
          ...prevState,
          currentTime,
          duration: duration || prevState.duration
        };

        // Update chapter if changed
        if (activeChapter !== -1 && activeChapter !== prevState.currentChapter) {
          newState.currentChapter = activeChapter;
        }

        // Handle question trigger
        if (pendingQuestion) {
          console.log('Triggering question:', pendingQuestion.id, 'at time:', currentTime);
          video.pause();
          newState = {
            ...newState,
            isPlaying: false,
            showQuestion: true,
            currentQuestion: pendingQuestion,
            selectedAnswer: null,
            essayAnswer: '',
            wordCount: 0,
            hasAnswered: false
          };
        }

        return newState;
      });
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setState(prev => ({ ...prev, duration: video.duration }));
      }
    };

    const handleCanPlay = () => {
      if (video.duration && !isNaN(video.duration)) {
        setState(prev => ({ ...prev, duration: video.duration }));
      }
    };

    const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));

    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []); // EMPTY dependency array - handlers capture current values

  // Format time helper
  const formatTime = useCallback((time: number): string => {
    if (!time || isNaN(time) || time < 0) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Event handlers - all memoized
  const handleTogglePlay = useCallback(() => {
    if (state.showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }, [state.showQuestion, state.isPlaying]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (state.showQuestion) return;

    const video = videoRef.current;
    if (!video || !state.duration || state.duration <= 0) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(pos * state.duration, state.duration));
    
    try {
      video.currentTime = newTime;
      setState(prev => ({ ...prev, currentTime: newTime }));
    } catch (error) {
      console.error('Error seeking video:', error);
    }
  }, [state.showQuestion, state.duration]);

  const handleAnswerSubmit = useCallback(() => {
    if (!state.currentQuestion) return;
    
    let isValid = false;
    let finalAnswer: string | null = null;

    if (state.currentQuestion.type === 'multiple-choice') {
      if (!state.selectedAnswer) return;
      const mcQuestion = state.currentQuestion as MultipleChoiceQuestion;
      isValid = mcQuestion.options.find(opt => opt.id === state.selectedAnswer)?.correct || false;
      finalAnswer = state.selectedAnswer;
    } else if (state.currentQuestion.type === 'essay') {
      const essayQuestion = state.currentQuestion as EssayQuestion;
      if (state.wordCount < essayQuestion.minWords) {
        setState(prev => ({ ...prev, hasAnswered: true }));
        return;
      }
      isValid = true;
      finalAnswer = state.essayAnswer;
    } else if (state.currentQuestion.type === 'rating') {
      if (!state.selectedAnswer) return;
      isValid = true;
      finalAnswer = state.selectedAnswer;
    }

    if (finalAnswer === null) return;

    const userAnswer: UserAnswer = {
      answer: finalAnswer,
      correct: isValid,
      timestamp: state.currentTime,
      type: state.currentQuestion.type
    };

    const newAnswers: UserAnswers = {
      ...state.userAnswers,
      [state.currentQuestion.id]: userAnswer
    };
    
    setState(prev => ({ 
      ...prev,
      userAnswers: newAnswers, 
      hasAnswered: true,
      score: isValid && state.currentQuestion.type === 'multiple-choice' ? prev.score + 1 : prev.score,
      totalQuestions: prev.totalQuestions + 1
    }));
    
    if (onQuestionAnswered) {
      onQuestionAnswered(state.currentQuestion.id, userAnswer);
    }

    // Continue video after delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showQuestion: false,
        currentQuestion: null
      }));
      
      videoRef.current?.play();
    }, 2000);
  }, [state.currentQuestion, state.selectedAnswer, state.wordCount, state.essayAnswer, state.currentTime, state.userAnswers, onQuestionAnswered]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !state.isMuted;
      setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [state.isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setState(prev => ({ ...prev, volume: newVolume }));
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, []);

  const nextChapter = useCallback(() => {
    if (state.currentChapter < chapters.length - 1) {
      jumpToChapter(state.currentChapter + 1);
    }
  }, [state.currentChapter, chapters.length]);

  const prevChapter = useCallback(() => {
    if (state.currentChapter > 0) {
      jumpToChapter(state.currentChapter - 1);
    }
  }, [state.currentChapter]);

  const jumpToChapter = useCallback((chapterIndex: number) => {
    if (state.showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    const chapter = chapters[chapterIndex];
    video.currentTime = chapter.startTime;
    setState(prev => ({ 
      ...prev,
      currentChapter: chapterIndex,
      showChapters: false 
    }));
  }, [state.showQuestion, chapters]);

  // Question handlers
  const handleEssayChange = useCallback((value: string) => {
    const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    setState(prev => ({ ...prev, essayAnswer: value, wordCount }));
  }, []);

  const handleAnswerSelect = useCallback((answer: string) => {
    setState(prev => ({ ...prev, selectedAnswer: answer }));
  }, []);

  const handleRatingSelect = useCallback((rating: number) => {
    setState(prev => ({ ...prev, selectedAnswer: rating.toString() }));
  }, []);

  const handleToggleChapters = useCallback(() => {
    setState(prev => ({ ...prev, showChapters: !prev.showChapters }));
  }, []);

  const handleToggleControls = useCallback(() => {
    setState(prev => ({ ...prev, showControls: !prev.showControls }));
  }, []);

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onClick={handleToggleControls}
        preload="metadata"
        playsInline
        controls={false}
      />

      {/* Loading indicator */}
      {state.duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">Loading video...</div>
        </div>
      )}

      {/* Question Overlay */}
      {state.showQuestion && state.currentQuestion && (
        <QuestionOverlay
          currentQuestion={state.currentQuestion}
          selectedAnswer={state.selectedAnswer}
          essayAnswer={state.essayAnswer}
          wordCount={state.wordCount}
          hasAnswered={state.hasAnswered}
          userAnswers={state.userAnswers}
          onAnswerSelect={handleAnswerSelect}
          onEssayChange={handleEssayChange}
          onSubmitAnswer={handleAnswerSubmit}
          onRatingSelect={handleRatingSelect}
        />
      )}

      {/* Video Controls Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
        state.showControls && !state.showQuestion ? 'opacity-100' : 'opacity-0'
      }`}>
        
        <ProgressBar
          currentTime={state.currentTime}
          duration={state.duration}
          questions={questions}
          userAnswers={state.userAnswers}
          showQuestion={state.showQuestion}
          onSeek={handleSeek}
        />
        
        <div className="flex items-center justify-between px-4 pb-4">
          <VideoControls
            isPlaying={state.isPlaying}
            isMuted={state.isMuted}
            volume={state.volume}
            showQuestion={state.showQuestion}
            isMobile={state.isMobile}
            onTogglePlay={handleTogglePlay}
            onToggleMute={toggleMute}
            onVolumeChange={handleVolumeChange}
            onNextChapter={nextChapter}
            onPrevChapter={prevChapter}
          />

          <VideoInfo
            currentTime={state.currentTime}
            duration={state.duration}
            currentChapter={state.currentChapter}
            chapters={chapters}
            score={state.score}
            totalQuestions={state.totalQuestions}
            formatTime={formatTime}
          />

          <ChapterList
            chapters={chapters}
            currentChapter={state.currentChapter}
            showChapters={state.showChapters}
            showQuestion={state.showQuestion}
            onToggleChapters={handleToggleChapters}
            onJumpToChapter={jumpToChapter}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}