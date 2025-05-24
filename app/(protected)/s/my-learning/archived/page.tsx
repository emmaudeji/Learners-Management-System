'use client';

import React from 'react';
import { courses } from '@/data';
import EmptyList from '@/components/common/EmptyList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Archived = () => {
  // Simulate archived courses: set to 0 to test empty state
  const archivedCourses = courses.slice(0, 0); // e.g., slice(0, 2) to simulate available items

  return (
    <section className="w-full py-12">
      <div className="padding space-y-6">
        <h2 className="text-2xl font-bold">Archived Courses</h2>

        {archivedCourses.length === 0 ? (
          <EmptyList
            heading="No Archived Courses"
            text="Courses you archive will appear here. You can restore them later or explore new ones to learn."
            CTA={
              <Link href="/all-courses">
                <Button className="mt-4">Explore Courses</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/learning/${course.slug}`}
                className="bg-white rounded-md shadow hover:shadow-md transition-all"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-t-md w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.description.slice(0, 80)}...
                  </p>
                  <div className="text-xs text-gray-500">
                    {course.instructor} &middot; ⭐ {course.rating} &middot; {course.learners}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Archived;
