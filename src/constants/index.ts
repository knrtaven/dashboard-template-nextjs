export interface LearningCardData {
  id: number;
  title: string;
  description: string;
  progress: number; // Progress percentage (0-100)
  duration: string;

  bannerColor: string; // Solid background color for banner
  category: string;
  tags?: string[];
  enrolledDate?: string;
  lastAccessed?: string;
  totalLessons?: number;
  completedLessons?: number;
}

export const LEARNING_CARDS_DATA: LearningCardData[] = [
  {
    id: 1,
    title: "Your Wellbeing at Work",
    description: "How to create workplace conditions that support personal wellbeing.",
    progress: 0,
    duration: "4 hours",

    bannerColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    category: "Work-Rite",
    tags: ["A", "B", "C"],
    enrolledDate: "2024-01-15",
    lastAccessed: "2024-01-20",
    totalLessons: 4,
    completedLessons: 0
  },
  {
    id: 2,
    title: "Kindness",
    description: "Kindness strengthens connection and wellbeing by uncovering its deeper value, sparking ripple effects... ",
    progress: 0,
    duration: "6 hours",

    bannerColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    category: "Work-Rite",
    tags: ["A", "B", "C"],
    enrolledDate: "2024-01-10",
    lastAccessed: "2024-01-18",
    totalLessons: 4,
    completedLessons: 0
  },
  {
    id: 3,
    title: "The Art of Giving Compliments",
    description: "Boosting wellbeing starts with meaningful recognition, where compliments that land...",
    progress: 0,
    duration: "5 hours",

    bannerColor: "bg-gradient-to-r from-green-500 to-green-600",
    category: "Work-Rite",
    tags: ["A", "B", "C"],
    enrolledDate: "2024-01-05",
    lastAccessed: "2024-01-19",
    totalLessons: 4,
    completedLessons: 0
  },
  {
    id: 4,
    title: "Achievement & Connection",
    description: "How to harness achievement and connection to improve workplace wellbeing and achievement.",
    progress: 0,
    duration: "8 hours",

    bannerColor: "bg-gradient-to-r from-orange-500 to-orange-600",
    category: "Work-Rite",
    tags: ["A", "B", "C"],
    enrolledDate: "2024-01-12",
    lastAccessed: "2024-01-16",
    totalLessons: 4,
    completedLessons: 5
  },
  {
    id: 5,
    title: "Blame Busting",
    description: "How to identify blame and flip it to improve connection and wellbeing",
    progress: 0,
    duration: "4 hours",

    bannerColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    category: "Work-Rite",
    tags: ["A", "B", "C"],
    enrolledDate: "2024-01-15",
    lastAccessed: "2024-01-20",
    totalLessons: 4,
    completedLessons: 0
  },
];

// Helper functions for data manipulation
export const getLearningCardById = (id: number): LearningCardData | undefined => {
  return LEARNING_CARDS_DATA.find(card => card.id === id);
};

export const getLearningCardsByCategory = (category: string): LearningCardData[] => {
  return LEARNING_CARDS_DATA.filter(card => 
    card.category.toLowerCase() === category.toLowerCase()
  );
};

export const getCompletedCourses = (): LearningCardData[] => {
  return LEARNING_CARDS_DATA.filter(card => card.progress === 100);
};

export const getInProgressCourses = (): LearningCardData[] => {
  return LEARNING_CARDS_DATA.filter(card => card.progress > 0 && card.progress < 100);
};

export const getNotStartedCourses = (): LearningCardData[] => {
  return LEARNING_CARDS_DATA.filter(card => card.progress === 0);
};

export const getAverageProgress = (): number => {
  const totalProgress = LEARNING_CARDS_DATA.reduce((sum, card) => sum + card.progress, 0);
  return Math.round(totalProgress / LEARNING_CARDS_DATA.length);
};

export const getTotalStudyTime = (): string => {
  const totalMinutes = LEARNING_CARDS_DATA.reduce((sum, card) => {
    const hours = parseInt(card.duration.split(' ')[0]);
    return sum + (hours * 60);
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

// Banner color options for new courses
export const BANNER_COLORS = [
  "bg-gradient-to-r from-blue-500 to-blue-600",
  "bg-gradient-to-r from-purple-500 to-purple-600",
  "bg-gradient-to-r from-green-500 to-green-600",
  "bg-gradient-to-r from-orange-500 to-orange-600",
  "bg-gradient-to-r from-teal-500 to-teal-600",
  "bg-gradient-to-r from-indigo-500 to-indigo-600",
  "bg-gradient-to-r from-pink-500 to-pink-600",
  "bg-gradient-to-r from-red-500 to-red-600",
  "bg-gradient-to-r from-yellow-500 to-yellow-600",
  "bg-gradient-to-r from-cyan-500 to-cyan-600"
];

// Course categories
export const COURSE_CATEGORIES = [
  "Work-Rite", "Lead-Rite"
];