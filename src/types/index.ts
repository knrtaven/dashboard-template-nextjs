// // Core Video Player Types
// export interface Chapter {
//     id: number;
//     title: string;
//     startTime: number;
//     endTime: number;
//     description: string;
//   }
  
//   export interface MultipleChoiceOption {
//     id: string;
//     text: string;
//     correct: boolean;
//   }
  
//   export interface QuestionFeedback {
//     correct?: string;
//     incorrect?: string;
//     submitted?: string;
//     tooShort?: string;
//     low?: string;
//     medium?: string;
//     high?: string;
//   }
  
//   export interface QuestionBranches {
//     low?: { jumpTo: number };
//     medium?: { jumpTo: number };
//     high?: { jumpTo: number };
//   }
  
//   export type QuestionType = 'multiple-choice' | 'essay' | 'rating';
//   export type NextAction = 'continue' | 'branch';
  
//   export interface BaseQuestion {
//     id: number;
//     triggerTime: number;
//     question: string;
//     type: QuestionType;
//     feedback: QuestionFeedback;
//     nextAction: NextAction;
//     branches?: QuestionBranches;
//   }
  
//   export interface MultipleChoiceQuestion extends BaseQuestion {
//     type: 'multiple-choice';
//     options: MultipleChoiceOption[];
//   }
  
//   export interface EssayQuestion extends BaseQuestion {
//     type: 'essay';
//     minWords: number;
//     placeholder: string;
//   }
  
//   export interface RatingQuestion extends BaseQuestion {
//     type: 'rating';
//     scale: number;
//   }
  
//   export type Question = MultipleChoiceQuestion | EssayQuestion | RatingQuestion;
  
//   export interface UserAnswer {
//     answer: string;
//     correct: boolean;
//     timestamp: number;
//     type: QuestionType;
//   }
  
//   export interface UserAnswers {
//     [questionId: number]: UserAnswer;
//   }
  
//   export interface VideoPlayerState {
//     isPlaying: boolean;
//     currentTime: number;
//     duration: number;
//     volume: number;
//     isMuted: boolean;
//     currentChapter: number;
//     showQuestion: boolean;
//     currentQuestion: Question | null;
//     userAnswers: UserAnswers;
//     selectedAnswer: string | null;
//     essayAnswer: string;
//     wordCount: number;
//     hasAnswered: boolean;
//     score: number;
//     totalQuestions: number;
//   }
  
//   // PWA Types
//   export interface PWAHookReturn {
//     isOnline: boolean;
//     installPrompt: BeforeInstallPromptEvent | null;
//     isInstalled: boolean;
//     registration: ServiceWorkerRegistration | null;
//     installApp: () => Promise<boolean>;
//     canInstall: boolean;
//   }
  
//   export interface OfflineStorageHookReturn {
//     saveOfflineData: (key: string, data: any) => void;
//     getOfflineData: (key: string) => any;
//     clearOfflineData: (key: string) => void;
//     offlineData: Record<string, any>;
//   }
  
//   export interface BackgroundSyncHookReturn {
//     requestSync: (tag: string) => Promise<void>;
//   }
  
//   // Service Worker Types
//   export interface SyncEvent extends ExtendableEvent {
//     tag: string;
//     lastChance: boolean;
//   }
  
//   export interface NotificationPayload {
//     title: string;
//     body: string;
//     icon?: string;
//     badge?: string;
//     data?: any;
//   }
  
//   export interface PushMessageData {
//     body?: string;
//     title?: string;
//     icon?: string;
//     data?: any;
//   }
  
//   // Extended Window interface for PWA
//   declare global {
//     interface Window {
//       workbox?: any;
//     }
  
//     interface BeforeInstallPromptEvent extends Event {
//       prompt(): Promise<void>;
//       userChoice: Promise<{
//         outcome: 'accepted' | 'dismissed';
//         platform: string;
//       }>;
//     }
  
//     interface Navigator {
//       standalone?: boolean;
//     }
//   }
  
//   // Component Props Types
//   export interface InstallBannerProps {
//     className?: string;
//   }
  
//   export interface NetworkStatusProps {
//     className?: string;
//     position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
//   }
  
//   export interface OfflineNoticeProps {
//     className?: string;
//   }
  
//   export interface UpdateBannerProps {
//     className?: string;
//   }
  
//   export interface NotificationPermissionProps {
//     className?: string;
//   }
  
//   export interface SyncStatusProps {
//     className?: string;
//   }
  
//   export interface PWAWrapperProps {
//     children: React.ReactNode;
//   }
  
//   // Video Player Component Props
//   export interface InteractiveVideoPlayerProps {
//     videoUrl?: string;
//     chapters?: Chapter[];
//     questions?: Question[];
//     onProgressUpdate?: (progress: VideoPlayerState) => void;
//     onQuestionAnswered?: (questionId: number, answer: UserAnswer) => void;
//     className?: string;
//   }
  
//   // API Response Types
//   export interface SyncAnswersRequest {
//     answers: Array<{
//       questionId: number;
//       answer: UserAnswer;
//       timestamp: number;
//     }>;
//   }
  
//   export interface SyncAnswersResponse {
//     success: boolean;
//     synced: number;
//     errors?: string[];
//   }
  
//   // Storage Types
//   export interface OfflineAnswer {
//     questionId: number;
//     answer: string;
//     correct: boolean;
//     timestamp: number;
//     type: QuestionType;
//     synced: boolean;
//   }
  
//   export interface OfflineProgress {
//     videoId: string;
//     currentTime: number;
//     completedQuestions: number[];
//     score: number;
//     lastUpdated: number;
//   }
  
//   export interface OfflineData {
//     answers: OfflineAnswer[];
//     progress: OfflineProgress[];
//     metadata: {
//       version: string;
//       lastSync: number;
//     };
//   }
  
//   // Utility Types
//   export type DeepPartial<T> = {
//     [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
//   };
  
//   export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
  
//   export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  
//   // Event Types
//   export interface VideoEvent {
//     type: 'play' | 'pause' | 'seek' | 'ended' | 'timeupdate';
//     currentTime: number;
//     duration: number;
//   }
  
//   export interface QuestionEvent {
//     type: 'question-shown' | 'question-answered' | 'question-skipped';
//     questionId: number;
//     answer?: string;
//     correct?: boolean;
//   }
  
//   export interface PWAEvent {
//     type: 'install-prompt' | 'installed' | 'online' | 'offline' | 'sync';
//     data?: any;
//   }