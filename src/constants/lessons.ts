import { getLearningCardById } from './index';
import { StaticImageData } from "next/image";
export interface ModuleData {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    isLocked: boolean;
    order: number;
    banner?:StaticImageData | string;
  }
  
  export interface CourseContent {
    courseId: number;
    modules: ModuleData[];
    totalModules: number;
    completedModules: number;
    totalLessons: number; // Total lessons across all modules
    completedLessons: number; // Completed lessons across all modules
  }
  
  // Course-specific modules that match the real course data from index.ts
  const COURSE_MODULES_DATA: { [key: number]: CourseContent } = {
    // Course 1: Blame Busting
    1: {
      courseId: 1,
      totalModules: 4,
      completedModules: 0,
      totalLessons: 4,
      completedLessons: 0,
      modules: [
        {
          id: 1,
          title: "Wellbeing Quiz",
          // description: "Learn to identify common blame patterns in workplace communication",
          isCompleted: false,
          isLocked: false,
          order: 1,
        },
        {
          id: 2,
          title: "5 Days to a Healthier You",
          // description: "Transform blame-based conversations into accountability discussions",
          isCompleted: false,
          isLocked: false,
          order: 2

        },
        {
          id: 3,
          title: "Impact of Stress in the Workplace",
          // description: "Use empathy and understanding to strengthen workplace relationships",
          isCompleted: false,
          isLocked: false,
          order: 3,
        },
        {
          id: 4,
          title: "Reducing Stress at Work",
          // description: "Real-world scenarios and practice exercises for blame-free communication",
          isCompleted: false,
          isLocked: false,
          order: 4,

        }
      ]
    },
    
    // Course 2: Kindness
    2: {
      courseId: 2,
      totalModules: 4,
      completedModules: 0,
      totalLessons: 4,
      completedLessons: 0,
      modules: [
        {
          id: 1,
          title: "Why does kindness matter?",
          // description: "Understand the psychological and physiological benefits of kindness",
          isCompleted: false,
          isLocked: false,
          order: 1,
        },
        {
          id: 2,
          title: "The Ripple Effect of Kindness",
          // description: "Apply kindness principles in workplace interactions and leadership",
          isCompleted: false,
          isLocked: false,
          order: 2,
        },
        {
          id: 3,
          title: "Why kindness matter?",
          // description: "Learn how small acts of kindness create positive organizational change",
          isCompleted: false,
          isLocked: false,
          order: 3,
   
        },
        {
          id: 4,
          title: "Self-kindness",
          // description: "Build systems and practices that embed kindness into company culture",
          isCompleted: false,
          isLocked: false,
          order: 4,
  
        }
      ]
    },
    
    // Course 3: The Art of Giving Compliments
    3: {
      courseId: 3,
      totalModules: 4,
      completedModules: 0,
      totalLessons: 4,
      completedLessons: 0,
      modules: [
        {
          id: 1,
          title: "Compliments and Wellbeing (Oxytocin)",
          // description: "Understanding what makes compliments effective and meaningful",
          isCompleted: false,
          isLocked: false,
          order: 1,
  
        },
        {
          id: 2,
          title: "Six Compliments that Land",
          // description: "Learn when and how to deliver compliments for maximum impact",
          isCompleted: false,
          isLocked: false,
          order: 2,
      
        },
        {
          id: 3,
          title: "Tall Poppy Syndrome",
          // description: "Craft specific, actionable compliments that drive performance",
          isCompleted: false,
          isLocked: false,
          order: 3,
      
        },
        {
          id: 4,
          title: "Creating a Compliment Rich Workplace",
          // description: "Foster an environment where appreciation and recognition thrive",
          isCompleted: false,
          isLocked: false,
          order: 4,
        
        }
      ]
    },
    
    // Course 4: Achievement & Connection
    4: {
      courseId: 4,
      totalModules: 4,
      completedModules: 0,
      totalLessons: 4,
      completedLessons: 0,
      modules: [
        {
          id: 1,
          title: "The Magic of Achievement & Connection",
          // description: "Learn to drive high performance while maintaining strong connections",
          isCompleted: false,
          isLocked: false,
          order: 1,
        },
        {
          id: 2,
          title: "Boosting Self-Worth",
          // description: "Explore frameworks for collective success and individual growth",
          isCompleted: false,
          isLocked: false,
          order: 2,
          
        },
        {
          id: 3,
          title: "Fostering Achievement & Connection",
          // description: "Lead through relationship-building and emotional intelligence",
          isCompleted: false,
          isLocked: false,
          order: 3,
       
        },
        {
          id: 4,
          title: "Building Connections",
          // description: "Create systems that maintain both achievement and team connection",
          isCompleted: false,
          isLocked: false,
          order: 4,
         
        }
      ]
    },

    5: {
      courseId: 5,
      totalModules: 4,
      completedModules: 0,
      totalLessons: 4,
      completedLessons: 0,
      modules: [
        {
          id: 1,
          title: "Are you a blamer?",
          // description: "Learn to identify common blame patterns in workplace communication",
          isCompleted: false,
          isLocked: false,
          order: 1,
        },
        {
          id: 2,
          title: "How blame affects us?",
          // description: "Transform blame-based conversations into accountability discussions",
          isCompleted: false,
          isLocked: false,
          order: 2

        },
        {
          id: 3,
          title: "Keeping blame in check",
          // description: "Use empathy and understanding to strengthen workplace relationships",
          isCompleted: false,
          isLocked: false,
          order: 3,
        },
        {
          id: 4,
          title: "Elevating wellbeing by letting go of blame",
          // description: "Real-world scenarios and practice exercises for blame-free communication",
          isCompleted: false,
          isLocked: false,
          order: 4,

        }
      ]
    },
  };
  
  // Helper functions to get course content
  export const getCourseContent = (courseId: number): CourseContent | null => {
    return COURSE_MODULES_DATA[courseId] || null;
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
          courseName: courseData?.title || `Work-Rite Course ${courseId}` // Use real title
        });
      }
    });

    return incompleteModulesData;
  };

  // Helper function to get incomplete modules across all Lead-Rite courses
  export const getIncompleteLeadRiteModules = (): { courseId: number, modules: ModuleData[], courseName?: string }[] => {
    const leadRiteCourseIds = [5, 6]; // Lead-Rite course IDs (if you add Lead-Rite courses later)
    const incompleteModulesData: { courseId: number, modules: ModuleData[], courseName?: string }[] = [];

    leadRiteCourseIds.forEach(courseId => {
      const incompleteModules = getIncompleteModules(courseId);
      if (incompleteModules.length > 0) {
        // Get the actual course data to get the real title
        const courseData = getLearningCardById(courseId);
        
        incompleteModulesData.push({
          courseId,
          modules: incompleteModules,
          courseName: courseData?.title || `Lead-Rite Course ${courseId}`
        });
      }
    });

    return incompleteModulesData;
  };