import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, CheckCircle, XCircle } from 'lucide-react';

// TypeScript interfaces and types
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

interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  currentChapter: number;
  showQuestion: boolean;
  currentQuestion: Question | null;
  userAnswers: UserAnswers;
  selectedAnswer: string | null;
  essayAnswer: string;
  wordCount: number;
  hasAnswered: boolean;
  score: number;
  totalQuestions: number;
}

interface InteractiveVideoPlayerProps {
  videoUrl?: string;
  chapters?: Chapter[];
  questions?: Question[];
  onProgressUpdate?: (progress: VideoPlayerState) => void;
  onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
  className?: string;
}

export default function InteractiveVideoPlayer({
  videoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      question: "Explain in your own words what you understand about the concepts discussed so far. What questions do you have?",
      type: "essay",
      minWords: 25,
      placeholder: "Share your thoughts, understanding, and any questions you might have...",
      feedback: {
        submitted: "Thank you for your thoughtful response! Your reflection helps reinforce learning.",
        tooShort: "Please provide a more detailed response (at least 25 words)."
      },
      nextAction: "continue"
    } as EssayQuestion,
    {
      id: 3,
      triggerTime: 45,
      question: "Which technology is most important for frontend development?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Python", correct: false },
        { id: "b", text: "JavaScript", correct: true },
        { id: "c", text: "Java", correct: false },
        { id: "d", text: "C++", correct: false }
      ],
      feedback: {
        correct: "Excellent! JavaScript is the backbone of frontend development.",
        incorrect: "JavaScript is actually the key language for frontend development."
      },
      nextAction: "continue"
    } as MultipleChoiceQuestion,
    {
      id: 4,
      triggerTime: 60,
      question: "Based on what you've learned, describe a real-world scenario where you might apply these web development concepts. Be specific about the problem you're solving and the approach you'd take.",
      type: "essay",
      minWords: 50,
      placeholder: "Describe a specific scenario, problem, and your approach...",
      feedback: {
        submitted: "Excellent! Applying concepts to real scenarios shows deep understanding.",
        tooShort: "Please provide more detail about your scenario and approach (at least 50 words)."
      },
      nextAction: "continue"
    } as EssayQuestion,
    {
      id: 5,
      triggerTime: 75,
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
        medium: { jumpTo: 80 },
        high: { jumpTo: 85 }
      }
    } as RatingQuestion
  ];

  const chapters = propChapters || defaultChapters;
  const questions = propQuestions || defaultQuestions;

  // Check for questions at current time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = (): void => {
      const time = video.currentTime;
      setCurrentTime(time);
      
      // Check if we hit a question trigger
      const question = questions.find(q => 
        Math.abs(time - q.triggerTime) < 0.5 && 
        !userAnswers[q.id] && 
        !showQuestion
      );
      
      if (question) {
        video.pause();
        setIsPlaying(false);
        setCurrentQuestion(question);
        setShowQuestion(true);
        setSelectedAnswer(null);
        setEssayAnswer('');
        setWordCount(0);
        setHasAnswered(false);
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

  // Notify parent component of progress updates
  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate({
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        currentChapter,
        showQuestion,
        currentQuestion,
        userAnswers,
        selectedAnswer,
        essayAnswer,
        wordCount,
        hasAnswered,
        score,
        totalQuestions
      });
    }
  }, [
    isPlaying, currentTime, duration, volume, isMuted, currentChapter,
    showQuestion, currentQuestion, userAnswers, selectedAnswer,
    essayAnswer, wordCount, hasAnswered, score, totalQuestions,
    onProgressUpdate
  ]);

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
    
    // Notify parent component
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

  const isMultipleChoice = (question: Question): question is MultipleChoiceQuestion => {
    return question.type === 'multiple-choice';
  };

  const isEssay = (question: Question): question is EssayQuestion => {
    return question.type === 'essay';
  };

  const isRating = (question: Question): question is RatingQuestion => {
    return question.type === 'rating';
  };

  return (
    <div className={`max-w-6xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            className="w-full h-auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster="https://via.placeholder.com/800x450/333/fff?text=Interactive+Learning+Video"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Question Overlay */}
          {showQuestion && currentQuestion && (
            <div className="absolute inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-full overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800">
                  Question {currentQuestion.id}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 
                    currentQuestion.type === 'essay' ? 'Essay Question' : 'Rating'}
                </span>
                <p className="text-gray-700 mb-6 leading-relaxed">{currentQuestion.question}</p>
                
                {/* Multiple Choice Options */}
                {isMultipleChoice(currentQuestion) && (
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedAnswer === option.id
                            ? 'bg-blue-100 border-blue-500'
                            : 'hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option.id}
                          checked={selectedAnswer === option.id}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {/* Essay Question */}
                {isEssay(currentQuestion) && (
                  <div className="mb-6">
                    <textarea
                      value={essayAnswer}
                      onChange={handleEssayChange}
                      placeholder={currentQuestion.placeholder}
                      className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                      <span>
                        Words: {wordCount} / {currentQuestion.minWords} minimum
                      </span>
                      <span className={wordCount >= currentQuestion.minWords ? 'text-green-600' : 'text-orange-600'}>
                        {wordCount >= currentQuestion.minWords ? '✓ Ready to submit' : 'Need more words'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Rating Scale */}
                {isRating(currentQuestion) && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Poor</span>
                      <span className="text-sm text-gray-600">Excellent</span>
                    </div>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSelectedAnswer(rating.toString())}
                          className={`w-12 h-12 rounded-full border-2 font-bold transition-colors ${
                            selectedAnswer === rating.toString()
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'hover:bg-blue-100 border-gray-300 text-gray-700'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Feedback */}
                {hasAnswered && (
                  <div className={`p-4 rounded-lg mb-4 ${
                    currentQuestion.type === 'essay' && isEssay(currentQuestion) && wordCount < currentQuestion.minWords
                      ? 'bg-orange-100 text-orange-800'
                      : userAnswers[currentQuestion.id]?.correct 
                      ? 'bg-green-100 text-green-800'
                      : currentQuestion.type === 'essay'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className="flex items-center mb-2">
                      {currentQuestion.type === 'essay' && isEssay(currentQuestion) && wordCount < currentQuestion.minWords ? (
                        <>
                          <XCircle className="mr-2" size={20} />
                          <span className="font-semibold">Response too short</span>
                        </>
                      ) : userAnswers[currentQuestion.id]?.correct ? (
                        <>
                          <CheckCircle className="mr-2" size={20} />
                          <span className="font-semibold">
                            {currentQuestion.type === 'essay' ? 'Thank you!' : 
                             currentQuestion.type === 'rating' ? 'Thanks for your feedback!' : 'Correct!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-2" size={20} />
                          <span className="font-semibold">Not quite right</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm">
                      {currentQuestion.type === 'essay' && isEssay(currentQuestion) && wordCount < currentQuestion.minWords
                        ? currentQuestion.feedback.tooShort
                        : currentQuestion.type === 'essay' 
                        ? currentQuestion.feedback.submitted
                        : currentQuestion.type === 'rating' 
                        ? selectedAnswer && parseInt(selectedAnswer) <= 2 ? currentQuestion.feedback.low :
                          selectedAnswer && parseInt(selectedAnswer) <= 3 ? currentQuestion.feedback.medium : 
                          currentQuestion.feedback.high
                        : userAnswers[currentQuestion.id]?.correct 
                          ? currentQuestion.feedback.correct 
                          : currentQuestion.feedback.incorrect}
                    </p>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  onClick={handleAnswerSubmit}
                  disabled={
                    hasAnswered && 
                    !(currentQuestion.type === 'essay' && isEssay(currentQuestion) && wordCount < currentQuestion.minWords) ||
                    (currentQuestion.type === 'multiple-choice' && !selectedAnswer) ||
                    (currentQuestion.type === 'rating' && !selectedAnswer) ||
                    (currentQuestion.type === 'essay' && essayAnswer.trim().length === 0)
                  }
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {hasAnswered && !(currentQuestion.type === 'essay' && isEssay(currentQuestion) && wordCount < currentQuestion.minWords)
                    ? 'Continuing...' 
                    : 'Submit Answer'}
                </button>
              </div>
            </div>
          )}
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div 
              className="w-full h-2 bg-gray-600 rounded cursor-pointer mb-3"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-500 rounded relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Question markers */}
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={`absolute top-0 w-2 h-full rounded ${
                      userAnswers[question.id] ? 'bg-green-400' : 'bg-yellow-400'
                    }`}
                    style={{ left: `${(question.triggerTime / duration) * 100}%` }}
                    title={`Question ${question.id}: ${question.question}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={prevChapter}
                  className="hover:text-red-500"
                  disabled={showQuestion}
                >
                  <SkipBack size={20} />
                </button>
                
                <button 
                  onClick={togglePlay} 
                  className="hover:text-red-500"
                  disabled={showQuestion}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button 
                  onClick={nextChapter}
                  className="hover:text-red-500"
                  disabled={showQuestion}
                >
                  <SkipForward size={20} />
                </button>
                
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  Score: {score}/{Object.keys(userAnswers).filter(id => userAnswers[parseInt(id)].correct).length}
                </div>
                <button onClick={toggleMute} className="hover:text-red-500">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-80 bg-gray-900 text-white">
          {/* Progress Summary */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold mb-2">Learning Progress</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Chapter: {chapters[currentChapter]?.title}</div>
              <div>Questions Answered: {Object.keys(userAnswers).length}/{questions.length}</div>
              <div>Score: {score}/{totalQuestions || questions.length}</div>
            </div>
          </div>
          
          {/* Chapters */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="font-semibold mb-3">Chapters</h4>
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    currentChapter === index 
                      ? 'bg-red-600' 
                      : 'hover:bg-gray-800'
                  } ${showQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => jumpToChapter(index)}
                  disabled={showQuestion}
                >
                  <div className="font-medium">{chapter.title}</div>
                  <div className="text-xs text-gray-400">{formatTime(chapter.startTime)}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Questions Status */}
          <div className="p-4">
            <h4 className="font-semibold mb-3">Interactive Questions</h4>
            <div className="space-y-2">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`p-2 rounded text-sm ${
                    userAnswers[question.id]?.correct
                      ? 'bg-green-800 text-green-100'
                      : userAnswers[question.id]
                      ? question.type === 'essay' 
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-red-800 text-red-100'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Question {question.id}</span>
                    <span className="text-xs">
                      {formatTime(question.triggerTime)}
                    </span>
                  </div>
                  {userAnswers[question.id] && (
                    <div className="text-xs mt-1 opacity-75">
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