import React, { useState, useRef, useEffect } from 'react';
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
  RatingQuestion
} from './types';

interface InteractiveVideoPlayerProps {
  videoUrl?: string;
  chapters?: Chapter[];
  questions?: Question[];
  onProgressUpdate?: (progress: any) => void;
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

  // Default chapters
  const defaultChapters: Chapter[] = [
    {
      id: 0,
      title: "Introduction",
      startTime: 0,
      endTime: 15,
      description: "Welcome and overview"
    },
    {
      id: 1,
      title: "Core Concepts",
      startTime: 15,
      endTime: 45,
      description: "Learning the fundamentals"
    },
    {
      id: 2,
      title: "Advanced Topics",
      startTime: 45,
      endTime: 75,
      description: "Deep dive into complex ideas"
    },
    {
      id: 3,
      title: "Conclusion",
      startTime: 75,
      endTime: 90,
      description: "Summary and next steps"
    }
  ];

  // Default questions
  const defaultQuestions: Question[] = [
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
      minWords: 30,
      placeholder: "Describe what you've learned...",
      feedback: {
        submitted: "Thank you for your thoughtful response!",
        tooShort: "Please provide more detail (at least 30 words)."
      },
      nextAction: "continue"
    } as EssayQuestion,
    {
      id: 3,
      triggerTime: 60,
      question: "How would you rate your understanding so far?",
      type: "rating",
      scale: 5,
      feedback: {
        low: "No worries! Let's review some key concepts.",
        medium: "Good progress! Keep going.",
        high: "Fantastic! You're really getting it."
      },
      nextAction: "branch",
      branches: {
        low: { jumpTo: 45 },
        medium: { jumpTo: 65 },
        high: { jumpTo: 75 }
      }
    } as RatingQuestion
  ];

  const chapters = propChapters || defaultChapters;
  const questions = propQuestions || defaultQuestions;

  // Handler functions
  const updateState = (updates: Partial<VideoPlayerState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      updateState({ isMobile: window.innerWidth < 768 });
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Question notification sound (optional)
  const playNotificationSound = () => {
    // You can add a subtle notification sound here
    // const audio = new Audio('/sounds/notification.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {}); // Ignore if autoplay is blocked
  };

  // Enhanced question trigger with smooth transition
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = (): void => {
      const time = video.currentTime;
      updateState({ currentTime: time });
      
      // Check for questions with smoother detection
      const question = questions.find(q => 
        Math.abs(time - q.triggerTime) < 0.3 && 
        !state.userAnswers[q.id] && 
        !state.showQuestion
      );
      
      if (question) {
        // Smooth pause and question show
        video.pause();
        updateState({ isPlaying: false });
        
        // Small delay for smooth transition
        setTimeout(() => {
          updateState({
            currentQuestion: question,
            showQuestion: true,
            selectedAnswer: null,
            essayAnswer: '',
            wordCount: 0,
            hasAnswered: false
          });
          playNotificationSound();
        }, 100);
      }
      
      // Update current chapter
      const activeChapter = chapters.findIndex(chapter => 
        time >= chapter.startTime && time < chapter.endTime
      );
      if (activeChapter !== -1) {
        updateState({ currentChapter: activeChapter });
      }
    };

    const updateDuration = (): void => {
      updateState({ duration: video.duration });
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [state.showQuestion, state.userAnswers, questions, chapters]);

  // Auto-hide controls when question is shown
  useEffect(() => {
    updateState({ showControls: !state.showQuestion });
  }, [state.showQuestion]);

  // Handle keyboard navigation for questions
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!state.showQuestion || !state.currentQuestion) return;
      
      if (state.currentQuestion.type === 'multiple-choice') {
        const options = (state.currentQuestion as MultipleChoiceQuestion).options;
        const currentIndex = options.findIndex(opt => opt.id === state.selectedAnswer);
        
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % options.length;
            updateState({ selectedAnswer: options[nextIndex].id });
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
            updateState({ selectedAnswer: options[prevIndex].id });
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (state.selectedAnswer && !state.hasAnswered) {
              handleAnswerSubmit();
            }
            break;
        }
      }
      
      if (state.currentQuestion.type === 'rating') {
        const scale = (state.currentQuestion as RatingQuestion).scale;
        const current = parseInt(state.selectedAnswer || '0');
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault();
            if (current < scale) {
              updateState({ selectedAnswer: (current + 1).toString() });
            }
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault();
            if (current > 1) {
              updateState({ selectedAnswer: (current - 1).toString() });
            }
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (state.selectedAnswer && !state.hasAnswered) {
              handleAnswerSubmit();
            }
            break;
        }
      }
    };

    if (state.showQuestion) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [state.showQuestion, state.currentQuestion, state.selectedAnswer, state.hasAnswered]);

  const handleAnswerSubmit = (): void => {
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
        updateState({ hasAnswered: true });
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
    
    updateState({ 
      userAnswers: newAnswers, 
      hasAnswered: true,
      score: isValid && state.currentQuestion.type === 'multiple-choice' ? state.score + 1 : state.score,
      totalQuestions: state.totalQuestions + 1
    });
    
    if (onQuestionAnswered) {
      onQuestionAnswered(state.currentQuestion.id, userAnswer);
    }

    // Handle branching logic
    setTimeout(() => {
      if (state.currentQuestion?.nextAction === 'branch' && state.currentQuestion.branches) {
        const rating = parseInt(state.selectedAnswer || '0');
        let branch;
        
        if (rating <= 2) branch = state.currentQuestion.branches.low;
        else if (rating <= 3) branch = state.currentQuestion.branches.medium;
        else branch = state.currentQuestion.branches.high;
        
        if (branch && videoRef.current) {
          videoRef.current.currentTime = branch.jumpTo;
        }
      }
      
      updateState({
        showQuestion: false,
        currentQuestion: null
      });
      
      videoRef.current?.play();
      updateState({ isPlaying: true });
    }, 2500);
  };

  const handleTogglePlay = () => {
    if (state.showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    updateState({ isPlaying: !state.isPlaying });
  };

  const jumpToChapter = (chapterIndex: number): void => {
    if (state.showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    const chapter = chapters[chapterIndex];
    video.currentTime = chapter.startTime;
    updateState({ 
      currentChapter: chapterIndex,
      showChapters: false 
    });
  };

  const nextChapter = (): void => {
    if (state.currentChapter < chapters.length - 1) {
      jumpToChapter(state.currentChapter + 1);
    }
  };

  const prevChapter = (): void => {
    if (state.currentChapter > 0) {
      jumpToChapter(state.currentChapter - 1);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (state.showQuestion) return;

    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * state.duration;
  };

  const toggleMute = (): void => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !state.isMuted;
    updateState({ isMuted: !state.isMuted });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    updateState({ volume: newVolume });
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onClick={() => updateState({ showControls: !state.showControls })}
        onPlay={() => updateState({ isPlaying: true })}
        onPause={() => updateState({ isPlaying: false })}
      />

      {/* Question Overlay */}
      {state.showQuestion && state.currentQuestion && (
        <QuestionOverlay
          currentQuestion={state.currentQuestion}
          selectedAnswer={state.selectedAnswer}
          essayAnswer={state.essayAnswer}
          wordCount={state.wordCount}
          hasAnswered={state.hasAnswered}
          userAnswers={state.userAnswers}
          onAnswerSelect={(answer) => updateState({ selectedAnswer: answer })}
          onEssayChange={(value) => {
            const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
            updateState({ essayAnswer: value, wordCount });
          }}
          onSubmitAnswer={handleAnswerSubmit}
          onRatingSelect={(rating) => updateState({ selectedAnswer: rating.toString() })}
        />
      )}

      {/* Video Controls Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
        state.showControls ? 'opacity-100' : 'opacity-0'
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
            onToggleChapters={() => updateState({ showChapters: !state.showChapters })}
            onJumpToChapter={jumpToChapter}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}