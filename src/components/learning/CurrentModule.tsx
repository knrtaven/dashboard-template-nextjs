import { getLearningCardById } from '@/constants';
import { getCourseContent } from '@/constants/lessons';
import { BookOpen, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { CourseModule } from '../course/CourseModule';

const CurrentModule = ({ id }: { id: string }) => {
  const courseId = parseInt(id);

  const course = getLearningCardById(courseId);
  const courseContent = getCourseContent(courseId);

  // If course doesn't exist, show 404
  if (!course || !courseContent) {
    notFound();
  }
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="px-1">
        <h2 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
          Pick up where you left off
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Banner */}

        <div className={`h-48 ${course.bannerColor} relative flex items-center justify-center`}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${typeof course.bannerImage === 'string' ? course.bannerImage : course.bannerImage?.src}')`,
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>
            <p className="text-lg opacity-90">{course.category}</p>
          </div>
        </div>

        {/* Course Overview */}
        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Course Description */}
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Module Overview
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                {course.description}
              </p>

              {/* Overall Progress */}
              <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Your Progress
                  </h3>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {courseContent.completedModules}/{courseContent.totalModules} modules completed
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-3 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.progress}% Complete
                  </span>
                  {course.progress === 100 && (
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Course Stats Sidebar */}
            <div className="">
              <div className="rounded-xl bg-gray-50 p-6 lg:pb-24 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Lesson Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {courseContent.totalModules}
                    </span>
                  </div>

                  <div className="flex h-5 items-center justify-between">
                    {/* <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.category}
                      </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lessons</h2>

        <div className="grid gap-6">
          {courseContent.modules.map((module, moduleIndex) => (
            <CourseModule
              key={moduleIndex}
              module={module}
              moduleIndex={moduleIndex}
              courseId={courseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentModule;
