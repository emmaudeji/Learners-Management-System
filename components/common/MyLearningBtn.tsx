'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { courses } from '@/data';
import { Course } from '@/types';
import EmptyList from './EmptyList';
import { cn } from '@/lib/utils';
import { useGlobal } from '@/context/RootContext';

const HorizontalCoursePreviewCard = ({ course }: { course: any }) => {
  return (
    <Link
      href={`/learning/${course.slug}?category=${course.category}`}
      className="flex items-start gap-3 hover:bg-muted/70 rounded-md p-2 transition-all"
    >
      <Image
        src={course.image || '/placeholder.jpg'}
        alt={course.title}
        width={48}
        height={48}
        className="rounded object-cover flex-shrink-0  text-xs w-24"
      />
      <div className="space-y-1 text-sm">
        <p className="font-semibold">{course.title}</p>
        <p className="text-muted-foreground text-xs">by {course.instructor}</p>
      </div>
    </Link>
  );
};

const MyLearningBtn = ({triger, className}:{triger?:React.ReactNode, className?:string}) => {
  const myCourses = courses.slice(0, 4);
    const {setOpenNav, openNav} = useGlobal();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  

    const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenNav('learningBtn');
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenNav('');
    }, 1000); // delay hiding by 200ms
  };
  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     {triger ? triger :
     <Link href="/my-learning" 
        className={cn("text-sm hover:text-primary transition", className)}
        aria-label="My learning dashboard"
     >
        My Learning
      </Link>}

        <div
          className={cn(
            'absolute right-0 mt-2 z-50 w-72 bg-white dark:bg-background border divide-y rounded-md shadow-xl p-4 space-y-3',
            'transition-all duration-300 ease-out',
            openNav==='learningBtn' ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
          )}
          role="menu"
        >
          {myCourses.length > 0 ? (
            <div className="space-y-2 divide-y">
              {myCourses.map((course) => (
                <HorizontalCoursePreviewCard key={course.id} course={course} />
              ))}
              <div className="pt-2 text-center">
                <Link
                  href={myCourses.length ? "/s/my-learning" : "#courses"}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View all courses
                </Link>
              </div>
            </div>
          ) : (
            <EmptyList
              className="h-40 flex flex-col items-center justify-center"
              text="You have not enrolled for any course."
              CTA={
                <Link
                  href="/#courses"
                  className="text-sm text-blue-600 underline mt-2"
                >
                  Browse Courses
                </Link>
              }
            />
          )}
        </div>
    </div>
  );
};

export default MyLearningBtn;
