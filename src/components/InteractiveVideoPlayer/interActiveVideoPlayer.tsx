import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, CheckCircle, XCircle, ChevronDown, Menu } from 'lucide-react';

// TypeScript interfaces
interface Chapter {
  id: number;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
}

interface MultipleChoiceOption {
  id: string;
  text: string;
  correct: boolean;
}

interface QuestionFeedback {
  correct?: string;
  incorrect?: string;
  submitted?: string;
  tooShort?: string;
  low?: string;
  medium?: string;
  high?: string;
}

interface QuestionBranches {
  low?: { jumpTo: number };
  medium?: { jumpTo: number };
  high?: { jumpTo: number };
}

type QuestionType = 'multiple-choice' | 'essay' | 'rating';
type NextAction = 'continue' | 'branch';

interface BaseQuestion {
  id: number;
  triggerTime: number;
  question: string;
  type: QuestionType;
  feedback: QuestionFeedback;
  nextAction: NextAction;
  branches?: QuestionBranches;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
}

interface EssayQuestion extends BaseQuestion {
  type: 'essay';
  minWords: number;
  placeholder: string;
}

interface RatingQuestion extends BaseQuestion {
  type: 'rating';
  scale: number;
}

type Question = MultipleChoiceQuestion | EssayQuestion | RatingQuestion;

interface UserAnswer {
  answer: string;
  correct: boolean;
  timestamp: number;
  type: QuestionType;
}

interface UserAnswers {
  [questionId: number]: UserAnswer;
}

interface InteractiveVideoPlayerProps {
  videoUrl?: string;
  chapters?: Chapter[];
  questions?: Question[];
  onProgressUpdate?: (progress: any) => void;
  onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
  className?: string;
}

export default function interactiveVideoPlayer({
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  chapters: propChapters,
  questions: propQuestions,
  onProgressUpdate,
  onQuestionAnswered,
  className = ""
}: InteractiveVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [essayAnswer, setEssayAnswer] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showChapters, setShowChapters] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      setCurrentTime(time);
      
      // Check for questions with smoother detection
      const question = questions.find(q => 
        Math.abs(time - q.triggerTime) < 0.3 && 
        !userAnswers[q.id] && 
        !showQuestion
      );
      
      if (question) {
        // Smooth pause and question show
        video.pause();
        setIsPlaying(false);
        
        // Small delay for smooth transition
        setTimeout(() => {
          setCurrentQuestion(question);
          setShowQuestion(true);
          setSelectedAnswer(null);
          setEssayAnswer('');
          setWordCount(0);
          setHasAnswered(false);
          playNotificationSound();
        }, 100);
      }
      
      // Update current chapter
      const activeChapter = chapters.findIndex(chapter => 
        time >= chapter.startTime && time < chapter.endTime
      );
      if (activeChapter !== -1) setCurrentChapter(activeChapter);
    };

    const updateDuration = (): void => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [showQuestion, userAnswers, questions, chapters]);

  // Auto-hide controls when question is shown
  useEffect(() => {
    if (showQuestion) {
      setShowControls(false);
    } else {
      setShowControls(true);
    }
  }, [showQuestion]);

  // Handle keyboard navigation for questions
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showQuestion || !currentQuestion) return;
      
      if (currentQuestion.type === 'multiple-choice') {
        const options = (currentQuestion as MultipleChoiceQuestion).options;
        const currentIndex = options.findIndex(opt => opt.id === selectedAnswer);
        
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % options.length;
            setSelectedAnswer(options[nextIndex].id);
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
            setSelectedAnswer(options[prevIndex].id);
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (selectedAnswer && !hasAnswered) {
              handleAnswerSubmit();
            }
            break;
        }
      }
      
      if (currentQuestion.type === 'rating') {
        const scale = (currentQuestion as RatingQuestion).scale;
        const current = parseInt(selectedAnswer || '0');
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault();
            if (current < scale) {
              setSelectedAnswer((current + 1).toString());
            }
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault();
            if (current > 1) {
              setSelectedAnswer((current - 1).toString());
            }
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (selectedAnswer && !hasAnswered) {
              handleAnswerSubmit();
            }
            break;
        }
      }
    };

    if (showQuestion) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showQuestion, currentQuestion, selectedAnswer, hasAnswered]);

  const handleAnswerSubmit = (): void => {
    if (!currentQuestion) return;
    
    let isValid = false;
    let finalAnswer: string | null = null;

    if (currentQuestion.type === 'multiple-choice') {
      if (!selectedAnswer) return;
      const mcQuestion = currentQuestion as MultipleChoiceQuestion;
      isValid = mcQuestion.options.find(opt => opt.id === selectedAnswer)?.correct || false;
      finalAnswer = selectedAnswer;
    } else if (currentQuestion.type === 'essay') {
      const essayQuestion = currentQuestion as EssayQuestion;
      if (wordCount < essayQuestion.minWords) {
        setHasAnswered(true);
        return;
      }
      isValid = true;
      finalAnswer = essayAnswer;
    } else if (currentQuestion.type === 'rating') {
      if (!selectedAnswer) return;
      isValid = true;
      finalAnswer = selectedAnswer;
    }

    if (finalAnswer === null) return;

    const userAnswer: UserAnswer = {
      answer: finalAnswer,
      correct: isValid,
      timestamp: currentTime,
      type: currentQuestion.type
    };

    const newAnswers: UserAnswers = {
      ...userAnswers,
      [currentQuestion.id]: userAnswer
    };
    
    setUserAnswers(newAnswers);
    setHasAnswered(true);
    
    if (onQuestionAnswered) {
      onQuestionAnswered(currentQuestion.id, userAnswer);
    }
    
    if (isValid && currentQuestion.type === 'multiple-choice') {
      setScore(prev => prev + 1);
    }
    
    setTotalQuestions(prev => prev + 1);

    // Handle branching logic
    setTimeout(() => {
      if (currentQuestion.nextAction === 'branch' && currentQuestion.branches) {
        const rating = parseInt(selectedAnswer || '0');
        let branch;
        
        if (rating <= 2) branch = currentQuestion.branches.low;
        else if (rating <= 3) branch = currentQuestion.branches.medium;
        else branch = currentQuestion.branches.high;
        
        if (branch && videoRef.current) {
          videoRef.current.currentTime = branch.jumpTo;
        }
      }
      
      setShowQuestion(false);
      setCurrentQuestion(null);
      videoRef.current?.play();
      setIsPlaying(true);
    }, 2500);
  };

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    setEssayAnswer(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const togglePlay = (): void => {
    if (showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const jumpToChapter = (chapterIndex: number): void => {
    if (showQuestion) return;
    
    const video = videoRef.current;
    if (!video) return;

    const chapter = chapters[chapterIndex];
    video.currentTime = chapter.startTime;
    setCurrentChapter(chapterIndex);
    setShowChapters(false);
  };

  const nextChapter = (): void => {
    if (currentChapter < chapters.length - 1) {
      jumpToChapter(currentChapter + 1);
    }
  };

  const prevChapter = (): void => {
    if (currentChapter > 0) {
      jumpToChapter(currentChapter - 1);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (showQuestion) return;

    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const toggleMute = (): void => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.4s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse-subtle {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .question-glow {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      {/* Mobile-First Layout: Stack vertically on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row">
        
        {/* Video Player Section - Full width on mobile */}
        <div className="relative w-full lg:flex-1">
          {/* Video Element */}
          <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Question Overlay - Positioned within video area with enhanced animations */}
            {showQuestion && currentQuestion && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
                {/* Question Card - Enhanced with glass effect and animations */}
                <div className="bg-white/95 glass-effect dark:bg-gray-900/95 rounded-2xl p-5 sm:p-7 w-full max-w-xl mx-auto shadow-2xl border border-white/30 dark:border-gray-700/50 question-glow animate-slide-in-up">
                  {/* Question Header with progress indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{currentQuestion.id}</span>
                        <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-pulse-subtle"></div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium block">
                          Question {currentQuestion.id} of {questions.length}
                        </span>
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: questions.length }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-1 rounded-full transition-all duration-300 ${
                                i < currentQuestion.id ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {formatTime(currentQuestion.triggerTime)}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                      {currentQuestion.question}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                  </div>

                  {/* Multiple Choice Options */}
                  {currentQuestion.type === 'multiple-choice' && (
                    <div className="space-y-3 mb-6">
                      {(currentQuestion as MultipleChoiceQuestion).options.map((option, index) => (
                        <label 
                          key={option.id} 
                          className="group flex items-center space-x-4 p-4 rounded-xl border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <div className="relative flex-shrink-0">
                            <input
                              type="radio"
                              name="answer"
                              value={option.id}
                              checked={selectedAnswer === option.id}
                              onChange={(e) => setSelectedAnswer(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                              selectedAnswer === option.id
                                ? 'border-blue-600 bg-blue-600 shadow-lg'
                                : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400 group-hover:scale-110'
                            }`}>
                              {selectedAnswer === option.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse-subtle"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold mr-3">
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option.text}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Essay Input */}
                  {currentQuestion.type === 'essay' && (
                    <div className="mb-6">
                      <div className="relative">
                        <textarea
                          value={essayAnswer}
                          onChange={handleEssayChange}
                          placeholder={(currentQuestion as EssayQuestion).placeholder}
                          className="w-full h-32 sm:h-36 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800/50 dark:text-white placeholder:text-gray-400 shadow-inner"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full transition-colors ${
                            wordCount >= (currentQuestion as EssayQuestion).minWords 
                              ? 'bg-green-500 animate-pulse-subtle' 
                              : 'bg-orange-400'
                          }`}></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full backdrop-blur-sm">
                            {wordCount}/{(currentQuestion as EssayQuestion).minWords}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          wordCount >= (currentQuestion as EssayQuestion).minWords 
                            ? 'bg-green-500 shadow-lg shadow-green-200' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {wordCount >= (currentQuestion as EssayQuestion).minWords 
                            ? 'Minimum word count reached ✓'
                            : `${(currentQuestion as EssayQuestion).minWords - wordCount} more words needed`
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rating Scale */}
                  {currentQuestion.type === 'rating' && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <span>😔</span>
                          <span>Poor</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>🤩</span>
                          <span>Excellent</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        {Array.from({ length: (currentQuestion as RatingQuestion).scale }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setSelectedAnswer((i + 1).toString())}
                            className={`flex-1 h-14 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                              selectedAnswer === (i + 1).toString()
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50 scale-105'
                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:shadow-md'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback Message */}
                  {hasAnswered && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700/50 animate-slide-in-up">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                          {currentQuestion.feedback.correct || currentQuestion.feedback.submitted || 'Thank you for your answer!'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                      {hasAnswered ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
                          <span>Auto-continuing in 3s...</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-subtle"></div>
                          <span>Select your answer</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={(!selectedAnswer && !essayAnswer) || hasAnswered}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                    >
                      {hasAnswered ? (
                        <span className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        'Submit Answer'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Progress Bar */}
              <div className="px-4 pb-2">
                <div 
                  className="w-full h-1 bg-white bg-opacity-30 rounded cursor-pointer hover:h-2 transition-all"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-red-500 rounded relative transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {/* Question markers */}
                    {questions.map((question) => (
                      <div
                        key={question.id}
                        className={`absolute top-0 w-1 h-full rounded ${
                          userAnswers[question.id] ? 'bg-green-400' : 'bg-yellow-400'
                        }`}
                        style={{ left: `${(question.triggerTime / duration) * 100}%` }}
                        title={`Question ${question.id}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between px-4 pb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button 
                    onClick={prevChapter}
                    className="text-white hover:text-red-400 transition-colors"
                    disabled={showQuestion}
                  >
                    <SkipBack size={isMobile ? 18 : 20} />
                  </button>
                  
                  <button 
                    onClick={togglePlay} 
                    className="text-white hover:text-red-400 transition-colors"
                    disabled={showQuestion}
                  >
                    {isPlaying ? <Pause size={isMobile ? 20 : 24} /> : <Play size={isMobile ? 20 : 24} />}
                  </button>
                  
                  <button 
                    onClick={nextChapter}
                    className="text-white hover:text-red-400 transition-colors"
                    disabled={showQuestion}
                  >
                    <SkipForward size={isMobile ? 18 : 20} />
                  </button>
                  
                  {/* Time display - hide on very small screens */}
                  <span className="text-white text-xs sm:text-sm hidden xs:block">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Score - hide on small screens */}
                  <div className="text-white text-xs sm:text-sm hidden sm:block">
                    Score: {score}/{Object.keys(userAnswers).filter(id => userAnswers[parseInt(id)].correct).length}
                  </div>
                  
                  {/* Volume - hide on mobile */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <button onClick={toggleMute} className="text-white hover:text-red-400 transition-colors">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Chapters button for mobile */}
                  <button
                    onClick={() => setShowChapters(!showChapters)}
                    className="text-white hover:text-red-400 transition-colors lg:hidden"
                  >
                    <Menu size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section - Below video on mobile, side on desktop */}
        <div className={`w-full lg:w-80 bg-gray-800 ${showChapters || !isMobile ? 'block' : 'hidden lg:block'}`}>
          {/* Mobile chapter header */}
          <div className="lg:hidden bg-gray-700 p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Chapters & Progress</h3>
              <button
                onClick={() => setShowChapters(false)}
                className="text-gray-400 hover:text-white"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          </div>

          {/* Score section */}
          <div className="p-4 bg-gray-700 border-b border-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-sm text-gray-300">
                Correct Answers / {Object.keys(userAnswers).length} Total
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Progress: {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="p-4">
            <h4 className="text-white font-medium mb-3">Chapters</h4>
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => jumpToChapter(index)}
                  disabled={showQuestion}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentChapter === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium text-sm">{chapter.title}</div>
                  <div className="text-xs opacity-75 mt-1">{chapter.description}</div>
                  <div className="text-xs mt-1">
                    {formatTime(chapter.startTime)} - {formatTime(chapter.endTime)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Questions Progress */}
          <div className="p-4 border-t border-gray-600">
            <h4 className="text-white font-medium mb-3">Questions</h4>
            <div className="space-y-2">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`p-2 rounded text-xs ${
                    userAnswers[question.id]?.correct
                      ? 'bg-green-800 text-green-100'
                      : userAnswers[question.id]
                      ? question.type === 'essay' 
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-red-800 text-red-100'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Question {question.id}</span>
                    <span>{formatTime(question.triggerTime)}</span>
                  </div>
                  {userAnswers[question.id] && (
                    <div className="mt-1 opacity-75">
                      {question.type === 'essay' ? '✓ Submitted' :
                       userAnswers[question.id].correct ? '✓ Correct' : 
                       question.type === 'rating' ? '✓ Answered' : '✗ Incorrect'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}