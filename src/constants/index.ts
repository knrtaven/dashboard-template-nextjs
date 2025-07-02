export interface LearningCardData {
    id: number;
    title: string;
    description: string;
    progress: number; // Progress percentage (0-100)
    duration: string;
    instructor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
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
      title: "Introduction to React Development",
      description: "Learn the fundamentals of React including components, state management, and modern hooks.",
      progress: 75,
      duration: "4 hours",
      instructor: "Sarah Johnson",
      level: "Beginner",
      bannerColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend"],
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-01-20",
      totalLessons: 12,
      completedLessons: 9
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      description: "Master advanced TypeScript concepts including generics, utility types, and design patterns.",
      progress: 45,
      duration: "6 hours",
      instructor: "Michael Chen",
      level: "Advanced",
      bannerColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      category: "Programming",
      tags: ["TypeScript", "Advanced", "Patterns"],
      enrolledDate: "2024-01-10",
      lastAccessed: "2024-01-18",
      totalLessons: 20,
      completedLessons: 9
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Explore modern design principles, user research, and prototyping techniques.",
      progress: 90,
      duration: "5 hours",
      instructor: "Emma Rodriguez",
      level: "Intermediate",
      bannerColor: "bg-gradient-to-r from-green-500 to-green-600",
      category: "Design",
      tags: ["UI", "UX", "Design", "Figma"],
      enrolledDate: "2024-01-05",
      lastAccessed: "2024-01-19",
      totalLessons: 15,
      completedLessons: 14
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js, Express, and database integration.",
      progress: 20,
      duration: "8 hours",
      instructor: "James Wilson",
      level: "Intermediate",
      bannerColor: "bg-gradient-to-r from-orange-500 to-orange-600",
      category: "Backend",
      tags: ["Node.js", "Express", "Database"],
      enrolledDate: "2024-01-12",
      lastAccessed: "2024-01-16",
      totalLessons: 25,
      completedLessons: 5
    },
    {
      id: 5,
      title: "Python Data Science Fundamentals",
      description: "Learn data analysis, visualization, and machine learning basics with Python.",
      progress: 60,
      duration: "7 hours",
      instructor: "Dr. Lisa Park",
      level: "Beginner",
      bannerColor: "bg-gradient-to-r from-teal-500 to-teal-600",
      category: "Data Science",
      tags: ["Python", "Data Analysis", "ML"],
      enrolledDate: "2024-01-08",
      lastAccessed: "2024-01-17",
      totalLessons: 18,
      completedLessons: 11
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description: "Create cross-platform mobile applications using React Native and modern development practices.",
      progress: 35,
      duration: "10 hours",
      instructor: "Alex Thompson",
      level: "Intermediate",
      bannerColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      category: "Mobile Development",
      tags: ["React Native", "Mobile", "Cross-platform"],
      enrolledDate: "2024-01-14",
      lastAccessed: "2024-01-21",
      totalLessons: 30,
      completedLessons: 10
    }
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
  
  export const getLearningCardsByLevel = (level: 'Beginner' | 'Intermediate' | 'Advanced'): LearningCardData[] => {
    return LEARNING_CARDS_DATA.filter(card => card.level === level);
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
    "Web Development",
    "Programming",
    "Design",
    "Backend",
    "Data Science",
    "Mobile Development",
    "DevOps",
    "Machine Learning",
    "Cybersecurity",
    "Project Management"
  ];