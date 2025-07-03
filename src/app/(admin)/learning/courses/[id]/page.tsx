"use client";
import { getLearningCardById } from "@/constants/index";
import { getCourseContent } from "@/constants/lessons";
import PageBreadcrumb from "@/components/references/common/PageBreadCrumb";
// import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Clock, Play, CheckCircle, ArrowLeft, Lock, Users } from 'lucide-react';
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

// Generate metadata dynamically based on the course
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//     const courseId = parseInt(params.id);
//     const course = getLearningCardById(courseId);
  
//     if (!course) {
//       return {
//         title: "Course Not Found | TailAdmin",
//         description: "The requested course could not be found.",
//       };
//     }
  
//     return {
//       title: `${course.title} | TailAdmin - Next.js Dashboard Template`,
//       description: course.description,
//     };
//   }
  
export default function CoursePage({ params }: PageProps) {
  const courseId = parseInt(params.id);
  const course = getLearningCardById(courseId);
  const courseContent = getCourseContent(courseId);

  // If course doesn't exist, show 404
  if (!course || !courseContent) {
    notFound();
  }

  
 
  const formatDuration = (duration: string) => {
    return duration.replace('minutes', 'min');
  };

  return (
    <div>
      <PageBreadcrumb 
        pageTitle={course.title}
        breadcrumbs={[
          { label: "Learning", href: "/learning" },
          { label: "Courses", href: "/learning/courses" },
          { label: course.title, href: `/learning/courses/${course.id}` }
        ]}
      />
      
      <div className="space-y-6 mb-5">
        {/* Back Button */}
        <Link 
          href="/learning"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning</span>
        </Link>

        {/* Course Header */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          {/* Banner */}
          <div className={`h-48 ${course.bannerColor} relative flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-lg opacity-90">{course.category}</p>
            </div>
          </div>

          {/* Course Overview */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Course Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Overall Progress */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Your Progress
                    </h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {courseContent.completedModules}/{courseContent.totalModules} modules completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.progress}% Complete
                    </span>
                    {course.progress === 100 && (
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Stats Sidebar */}
              <div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Course Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Duration</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {courseContent.estimatedTotalTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Modules</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {courseContent.totalModules}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {courseContent.totalLessons}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Course Modules
          </h2>
          
          <div className="grid gap-6">
            {courseContent.modules.map((module, moduleIndex) => (
              <div key={module.id} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Module Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {moduleIndex + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Module {moduleIndex + 1}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {module.description}
                      </p>
                      
                      {/* Module Meta Info */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(module.duration)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{module.totalLessons || 'Multiple'} lessons</span>
                        </div>
                        
                  
                      </div>
                    </div>

                    {/* Module Actions */}
                    <div className="flex items-center space-x-4">
                      {/* Status Indicator */}
                      <div className="text-center">
                        {module.isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        ) : module.isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        ) : (
                          <Play className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {module.isLocked ? 'Locked' : module.isCompleted ? 'Completed' : 'Available'}
                        </p>
                      </div>

                      {/* Start/Continue Button */}
                      {!module.isLocked && (
                        <Link 
                          href={`/learning/courses/${courseId}/module/${module.id}`}
                          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                            module.isCompleted 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {module.isCompleted ? 'Review' : 'Start'}
                        </Link>
                      )}
                      
                      {module.isLocked && (
                        <button 
                          disabled
                          className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                        >
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}