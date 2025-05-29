import React from 'react';

interface CourseSkeletonProps {
  count?: number;
}

const CourseSkeleton: React.FC<CourseSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CourseSkeleton;


export const CourseCardSkeleton = () => (
  <div
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm animate-pulse"
        >
          <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-4" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
)