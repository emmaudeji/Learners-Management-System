import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const CourseDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left (Main) */}
      <div className="lg:col-span-2 space-y-10">
        {/* Course Header */}
        <section className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex md:hidden items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </section>

        {/* Course Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>

        {/* Skills You'll Learn */}
        <section>
          <Skeleton className="h-6 w-48 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-36 rounded-full" />
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section>
          <Skeleton className="h-6 w-48 mb-3" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-64" />
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section>
          <Skeleton className="h-6 w-48 mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </section>

        {/* Instructor */}
        <section className="flex items-start gap-6">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>

        {/* What Makes This Course Different */}
        <section className="space-y-4">
          <Skeleton className="h-6 w-60" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside>
        <section className="space-y-6 sticky top-24">
          <Skeleton className="w-full h-44 rounded-md hidden md:block" />

          <div className="p-6 border rounded-xl bg-white dark:bg-muted space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-48" />
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-muted space-y-2">
            <Skeleton className="h-5 w-40 mb-2" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default CourseDetailsSkeleton;
