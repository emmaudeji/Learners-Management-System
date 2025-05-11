import Link from 'next/link';
import React from 'react';

type Props = {
  course: {
    title: string;
    instructor: string;
    image: string;
    rating: number;
    learners: string;
    description: string;
    category: string;
    slug: string;
  };
};

export default function CourseCard({ course }: Props) {
  return (
    <div className="bg-white group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <Link href={`/courses/${course.category}/${course.slug}`}>
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link href={`/courses/${course.category}/${course.slug}`}><h3 className="text-lg font-bold group-hover:underline ">
          {course.title}</h3>
        </Link>
        <p className="text-sm text-gray-500">{course.instructor}</p>
        <p className="text-sm mt-2">{course.description.slice(0, 80)}...</p>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{course.category}</span>
          <span className="text-yellow-500 font-medium">⭐ {course.rating}</span>
        </div>
      </div>
    </div>
  );
}
