"use client";
import { courses } from "@/data";
import React, { useState } from "react";
import SearchBar from "./Searchbar";
import Filters from "./FilteringCourses";
import CourseCard from "../common/CourseCard";
 

export default function CoursesListing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = [...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? course.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className=" ">
        <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-8 px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
        </section>
        <section className="padding py-20">
            <SearchBar value={search} onChange={setSearch} />
            <Filters categories={categories} selected={category} onSelect={setCategory} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course) => (
                <CourseCard key={course.slug} course={course} />
                ))}
                {filtered.length === 0 && <p className="text-gray-500 col-span-full">No courses found.</p>}
            </div>
        </section>
     
    </main>
  );
}
