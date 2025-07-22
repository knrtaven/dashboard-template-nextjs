export interface Chapter {
  id: number;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuestionFeedback {
  correct?: string;
  incorrect?: string;
  submitted?: string;
  tooShort?: string;
  low?: string;
  medium?: string;
  high?: string;
}

export interface QuestionBranches {
  low?: { jumpTo: number };
  medium?: { jumpTo: number };
  high?: { jumpTo: number };
}

export type QuestionType = 'multiple-choice' | 'essay' | 'rating' | 'text-input';
export type NextAction = 'continue' | 'branch';

export interface BaseQuestion {
  id: number;
  triggerTime: number;
  question: string;
  type: QuestionType;
  feedback: QuestionFeedback;
  nextAction: NextAction;
  branches?: QuestionBranches;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
}

export interface EssayQuestion extends BaseQuestion {
  type: 'essay';
  minWords: number;
  placeholder: string;
}

export interface RatingQuestion extends BaseQuestion {
  type: 'rating';
  scale: number;
}

export interface TextInputQuestion extends BaseQuestion {
  type: 'text-input';
  correctAnswer: string;
}

export type Question = MultipleChoiceQuestion | EssayQuestion | RatingQuestion | TextInputQuestion;

export interface UserAnswer {
  answer: string;
  correct: boolean;
  timestamp: number;
  type: QuestionType;
}

export interface UserAnswers {
  [questionId: number]: UserAnswer;
}

export interface VideoPlayerState {
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
  showChapters: boolean;
  showControls: boolean;
  isMobile: boolean;
}

export interface ProgressData {
  currentTime: number;
  duration: number;
  progress: number;
  currentChapter: number;
  score: number;
  totalQuestions: number;
  completedQuestions: number;
}

export interface InteractiveVideoPlayerProps {
  videoUrl: string;
  chapters: Chapter[];
  questions: Question[];
  onProgressUpdate?: (progress: ProgressData) => void;
  onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
  className?: string;
  width?: number;
  height?: number;
  poster?: string;
  captions?: {
    src: string;
    srcLang: string;
    label: string;
    kind?: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  }[];
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}
