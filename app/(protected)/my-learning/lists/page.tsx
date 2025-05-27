'use client';

import React from 'react';
import { courses } from '@/data';
import EmptyList from '@/components/common/EmptyList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MySpecialList = () => {
  const specialCourses = courses.slice(0, 5); // 👈 Set to [] to trigger empty state for testing

  return (
    <section className="w-full py-12">
      <div className="padding space-y-6">
        <h2 className="text-2xl font-bold">Your Personalized Learning Path</h2>

        {specialCourses.length === 0 ? (
          <EmptyList
            heading="Your Special Course List is Empty"
            text="You haven’t customized your learning path yet. Tailor your journey by adding relevant courses."
            CTA={
              <Link href="/customize">
                <Button className="mt-4">Customize Your Course List</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialCourses.map((course) => (
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

export default MySpecialList;
