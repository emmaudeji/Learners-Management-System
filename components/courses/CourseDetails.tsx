import { courses } from "@/data";
import React from "react";
import CourseCard from "../common/CourseCard";
import Link from "next/link";

export default function CourseIntro({ title, instructor, preview }: { title: string; instructor: string; preview: string }) {
  return (
    <section className="bg-gray-100 p-6 rounded-xl mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">By {instructor}</p>
          <video controls poster="/poster.jpg" className="w-full rounded-xl shadow-md">
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="lg:w-1/3 bg-white shadow-md p-4 rounded-xl h-fit">
          <h2 className="text-xl font-semibold mb-2">Ready to start learning?</h2>
          <p className="text-gray-600 mb-4">Join thousands of learners already enrolled.</p>
          <Link href="/enrollment" className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full block text-center font-semibold hover:bg-blue-700">
            Enroll Now
          </Link>
        </div>
      </div>
    </section>
  );
}


export function CourseOverview({ description, learningPoints }: { description: string; learningPoints: string[] }) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Course Overview</h2>
        <p className="text-gray-700 mb-4">{description}</p>
  
        <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {learningPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>
    );
  }
  
  type Lesson = {
    title: string;
    duration: string;
    isFree?: boolean;
  };
  
  type Section = {
    title: string;
    lessons: Lesson[];
  };
  
  export   function CourseContent({ sections }: { sections: Section[] }) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        {sections.map((section, i) => (
          <div key={i} className="mb-4 border rounded-xl p-4 bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              {section.lessons.map((lesson, j) => (
                <li key={j} className="flex justify-between">
                  <span>
                    {lesson.title} {lesson.isFree && <span className="text-green-600 text-xs ml-2">(Free Preview)</span>}
                  </span>
                  <span>{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  }
  

  export function InstructorInfo({ name, bio, photo }: { name: string; bio: string; photo: string }) {
    return (
      <section className="mb-8 flex items-start gap-4">
        <img src={photo} alt={name} className="w-24 h-24 object-cover rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600 mt-2">{bio}</p>
        </div>
      </section>
    );
  }
  type Review = {
    user: string;
    comment: string;
    rating: number;
  };
  
  export   function Reviews({ reviews }: { reviews: Review[] }) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Learner Reviews</h2>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <strong>{r.user}</strong>
                <span className="text-yellow-500">⭐ {r.rating}</span>
              </div>
              <p className="text-gray-700 mt-2">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
 

export  function SimilarCourses({ category }: { category: string }) {
  const similar = courses.filter((c) => c.category === category).slice(0, 4);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Similar Courses</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similar.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
