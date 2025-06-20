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
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900   shadow-sm animate-pulse"
        >
          <div className="h-40 w-full bg-slate-200 dark:bg-slate-700 rounded-md mb-4" />
          <div className="p-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            <div className="flex gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              </div>
          </div>
        </div>
)