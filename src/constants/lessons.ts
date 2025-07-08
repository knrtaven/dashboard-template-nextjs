import { getLearningCardById } from './index';
export interface ModuleData {
    id: number;
    title: string;
    description: string;
    duration: string; // e.g., "45 minutes"
    isCompleted: boolean;
    isLocked: boolean;
    order: number;
    estimatedTime: string;
    contentType: 'video' | 'reading' | 'mixed' | 'interactive';
    totalLessons?: number; // Optional: for display purposes
  }
  
  export interface CourseContent {
    courseId: number;
    modules: ModuleData[];
    totalModules: number;
    completedModules: number;
    estimatedTotalTime: string;
    totalLessons: number; // Total lessons across all modules
    completedLessons: number; // Completed lessons across all modules
  }
  
  // Generic modules for Work-Rite courses
  const WORK_RITE_MODULES: CourseContent = {
    courseId: 1, // Can be mapped to any Work-Rite course
    estimatedTotalTime: "4 hours",
    totalModules: 3,
    completedModules: 2,
    totalLessons: 12,
    completedLessons: 9,
    modules: [
      {
        id: 1,
        title: "Lorem Ipsum Module",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        duration: "90 minutes",
        estimatedTime: "1.5 hours",
        isCompleted: true,
        isLocked: false,
        order: 1,
        contentType: "mixed",
        totalLessons: 4
      },
      {
        id: 2,
        title: "Eiusmod Tempor",
        description: "Eiusmod tempor incididunt ut labore et dolore magna",
        duration: "90 minutes",
        estimatedTime: "1.5 hours",
        isCompleted: true,
        isLocked: false,
        order: 2,
        contentType: "video",
        totalLessons: 4
      },
      {
        id: 3,
        title: "Duis Aute",
        description: "Duis aute irure dolor in reprehenderit voluptate",
        duration: "60 minutes",
        estimatedTime: "1 hour",
        isCompleted: false,
        isLocked: false,
        order: 3,
        contentType: "interactive",
        totalLessons: 4
      }
    ]
  };
  
  // Generic modules for Lead-Rite courses
  const LEAD_RITE_MODULES: CourseContent = {
    courseId: 5, // Can be mapped to any Lead-Rite course
    estimatedTotalTime: "7 hours",
    totalModules: 3,
    completedModules: 2,
    totalLessons: 18,
    completedLessons: 11,
    modules: [
      {
        id: 1,
        title: "Lorem Fundamentals",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing",
        duration: "150 minutes",
        estimatedTime: "2.5 hours",
        isCompleted: true,
        isLocked: false,
        order: 1,
        contentType: "mixed",
        totalLessons: 5
      },
      {
        id: 2,
        title: "Dolor Ipsum",
        description: "Dolor ipsum enim ad minim veniam quis",
        duration: "120 minutes",
        estimatedTime: "2 hours",
        isCompleted: true,
        isLocked: false,
        order: 2,
        contentType: "video",
        totalLessons: 6
      },
      {
        id: 3,
        title: "Advanced Lorem",
        description: "Advanced lorem ipsum techniques and applications",
        duration: "150 minutes",
        estimatedTime: "2.5 hours",
        isCompleted: false,
        isLocked: false,
        order: 3,
        contentType: "interactive",
        totalLessons: 7
      }
    ]
  };
  
  // Helper functions to get course content
  export const getCourseContent = (courseId: number): CourseContent | null => {
    // Map course IDs to their respective content
    const courseContentMap: { [key: number]: CourseContent } = {
      1: WORK_RITE_MODULES,
      2: WORK_RITE_MODULES, // Reuse for other Work-Rite courses
      3: WORK_RITE_MODULES,
      4: WORK_RITE_MODULES,
      5: LEAD_RITE_MODULES,
      6: LEAD_RITE_MODULES, // Reuse for other Lead-Rite courses
    };
  
    return courseContentMap[courseId] || null;
  };
  
  export const getModuleById = (courseId: number, moduleId: number): ModuleData | null => {
    const courseContent = getCourseContent(courseId);
    if (!courseContent) return null;
  
    return courseContent.modules.find(module => module.id === moduleId) || null;
  };
  
  export const getNextModule = (courseId: number, currentModuleId: number): ModuleData | null => {
    const courseContent = getCourseContent(courseId);
    if (!courseContent) return null;
  
    const sortedModules = courseContent.modules.sort((a, b) => a.order - b.order);
    const currentIndex = sortedModules.findIndex(module => module.id === currentModuleId);
    
    return currentIndex !== -1 && currentIndex < sortedModules.length - 1 
      ? sortedModules[currentIndex + 1] 
      : null;
  };
  
  export const getPreviousModule = (courseId: number, currentModuleId: number): ModuleData | null => {
    const courseContent = getCourseContent(courseId);
    if (!courseContent) return null;
  
    const sortedModules = courseContent.modules.sort((a, b) => a.order - b.order);
    const currentIndex = sortedModules.findIndex(module => module.id === currentModuleId);
    
    return currentIndex > 0 ? sortedModules[currentIndex - 1] : null;
  };
  
  export const calculateCourseProgress = (courseContent: CourseContent): number => {
    const completedModules = courseContent.modules.filter(module => module.isCompleted).length;
    return Math.round((completedModules / courseContent.totalModules) * 100);
  };
  
  // Helper function to get incomplete modules for a specific course
  export const getIncompleteModules = (courseId: number): ModuleData[] => {
    const courseContent = getCourseContent(courseId);
    if (!courseContent) return [];

    return courseContent.modules
      .filter(module => !module.isCompleted && !module.isLocked)
      .sort((a, b) => a.order - b.order);
  };

  // Helper function to get incomplete modules across all Work-Rite courses
export const getIncompleteWorkRiteModules = (): { courseId: number, modules: ModuleData[], courseName?: string }[] => {
  const workRiteCourseIds = [1, 2, 3, 4]; // Work-Rite course IDs
  const incompleteModulesData: { courseId: number, modules: ModuleData[], courseName?: string }[] = [];

  workRiteCourseIds.forEach(courseId => {
    const incompleteModules = getIncompleteModules(courseId);
    if (incompleteModules.length > 0) {
      // Get the actual course data to get the real title
      const courseData = getLearningCardById(courseId);
      
      incompleteModulesData.push({
        courseId,
        modules: incompleteModules,
        courseName: courseData?.title || `Work-Rite Course ${courseId}` // Use real title or fallback
      });
    }
  });

  return incompleteModulesData;
};

// Improved helper function to get incomplete modules across all Lead-Rite courses
export const getIncompleteLeadRiteModules = (): { courseId: number, modules: ModuleData[], courseName?: string }[] => {
  const leadRiteCourseIds = [5, 6]; // Lead-Rite course IDs
  const incompleteModulesData: { courseId: number, modules: ModuleData[], courseName?: string }[] = [];

  leadRiteCourseIds.forEach(courseId => {
    const incompleteModules = getIncompleteModules(courseId);
    if (incompleteModules.length > 0) {
      // Get the actual course data to get the real title
      const courseData = getLearningCardById(courseId);
      
      incompleteModulesData.push({
        courseId,
        modules: incompleteModules,
        courseName: courseData?.title || `Lead-Rite Course ${courseId}` // Use real title or fallback
      });
    }
  });

  return incompleteModulesData;
};