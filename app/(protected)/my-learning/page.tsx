'use client';

import React, { useState, useMemo } from 'react';
import { courses } from '@/data'; // Assume this is user's enrolled courses and all courses
import { Course } from '@/types';
import { cn } from '@/lib/utils';
// import { Filter, SortAsc, SortDesc, UserCheck, CheckCircle2, ListDetails } from 'lucide-react';
import Link from 'next/link';

// Utility for filtering and sorting
const sortOptions = [
  { label: 'Recently Added', value: 'recent' },
  { label: 'Recently Enrolled', value: 'enrolled' },
  { label: 'A - Z', value: 'az' },
  { label: 'Z - A', value: 'za' },
];

const progressFilters = [
  { label: 'All', value: 'all' },
  { label: 'Started', value: 'started' },
  { label: 'Completed', value: 'completed' },
];

// Mock user enrollment info with progress
interface EnrolledCourse extends Course {
  enrolledAt: Date;
  progress: 'started' | 'completed' | 'not-started';
}

const userEnrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    instructor: 'Jane Doe',
    image: 'https://source.unsplash.com/featured/?coding',
    rating: 4.8,
    learners: '28,500+',
    description: 'Learn how to build dynamic, full-stack web applications using HTML, CSS, JavaScript, React, Node.js, and APIs.',
    category: 'Tech & Development',
    enrolledAt: new Date('2025-03-15'),
    progress: 'started',
  },
  {
    id: 2,
    slug: 'ui-ux-design',
    title: 'UI/UX Design Fundamentals',
    instructor: 'John Smith',
    image: 'https://source.unsplash.com/featured/?design',
    rating: 4.5,
    learners: '10,000+',
    description: 'Basics of user interface and user experience design for digital products.',
    category: 'Design',
    enrolledAt: new Date('2025-04-01'),
    progress: 'completed',
  },
  // Add more sample courses...
];

// Recommended courses (sample)
const recommendedCourses: any[] = courses.filter(
  (c) => !userEnrolledCourses.find((enrolled) => enrolled.id === c.id)
).slice(0, 4);

const MyLearningDashboard = () => {
  const [sortBy, setSortBy] = useState<string>('recent');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [instructorFilter, setInstructorFilter] = useState<string>('all');
  const [progressFilter, setProgressFilter] = useState<string>('all');

  // Extract unique categories and instructors from enrolled courses for filters
  const categories = Array.from(new Set(userEnrolledCourses.map((c) => c.category)));
  const instructors = Array.from(new Set(userEnrolledCourses.map((c) => c.instructor)));

  // Filter and sort enrolled courses
  const filteredCourses = useMemo(() => {
    let filtered = userEnrolledCourses;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((c) => c.category === categoryFilter);
    }
    if (instructorFilter !== 'all') {
      filtered = filtered.filter((c) => c.instructor === instructorFilter);
    }
    if (progressFilter !== 'all') {
      filtered = filtered.filter((c) => c.progress === progressFilter);
    }

    switch (sortBy) {
      case 'recent':
        filtered = filtered.sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime());
        break;
      case 'enrolled':
        filtered = filtered.sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime()); // same as recent for demo
        break;
      case 'az':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [categoryFilter, instructorFilter, progressFilter, sortBy]);

  // Quick Stats calculation
  const totalEnrolled = userEnrolledCourses.length;
  const completedCount = userEnrolledCourses.filter((c) => c.progress === 'completed').length;
  const startedCount = userEnrolledCourses.filter((c) => c.progress === 'started').length;
  const notStartedCount = userEnrolledCourses.filter((c) => c.progress === 'not-started').length;

  return (
    <section className="w-full p-6 max-w-7xl mx-auto space-y-10">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white shadow rounded-lg p-6 text-center">
        <div>
          <h3 className="text-2xl font-semibold">{totalEnrolled}</h3>
          <p className="text-gray-600">Courses Enrolled</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-green-600">{completedCount}</h3>
          <p className="text-gray-600">Courses Completed</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-yellow-600">{startedCount}</h3>
          <p className="text-gray-600">Courses In Progress</p>
        </div>
      </div>

      {/* Enrolled Courses List */}
      <div>
        <header className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-bold">Your Enrolled Courses</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              {sortOptions.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              <option value="all">All Instructors</option>
              {instructors.map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>

            <select
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              {progressFilters.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </header>

        {filteredCourses.length === 0 ? (
          <div className="text-center p-12 text-gray-500">
            No courses found matching the selected filters.
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <li
                key={course.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <Link href={`/learning/${course.slug}`} className="block group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded-t-lg w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                    <p className="text-sm text-gray-500">{course.category}</p>
                    <p className="text-sm">
                      Progress:{' '}
                      <span
                        className={cn(
                          'font-semibold',
                          course.progress === 'completed'
                            ? 'text-green-600'
                            : course.progress === 'started'
                            ? 'text-yellow-600'
                            : 'text-gray-400'
                        )}
                      >
                        {course.progress.charAt(0).toUpperCase() + course.progress.slice(1)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Enrolled on {course.enrolledAt.toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <li
              key={course.id}
              className="border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <Link href={`/courses/${course.slug}`} className="block group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-t-lg w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                  <p className="text-sm text-gray-500">{course.category}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MyLearningDashboard;
