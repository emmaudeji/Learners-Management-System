'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { useLearn } from '@/context/LearningContext'
import { Dispatch, SetStateAction } from 'react'

interface CourseOverviewProps {
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  rating: number
  studentsCount: number
  totalHours: number
  updatedAt: string
  objectives: string[]
  level: string
  language: string
  tags?: string[]
  includes?: string[]
  prerequisites?: string[]
}

export const CourseOverview = ({setActiveTab}:{
  setActiveTab:Dispatch<SetStateAction<string>>
}) => {
  const {course, setChapter} = useLearn()

  const {
  title,
  description,
  createdBy:instructor,

  count,
  rating,
  imageUrl,

  lastUpdate,
  // totalHours,
  updatedAt,
  objectives,
  // level,
  // language,
  // tags = [],
  // includes = [],
  // prerequisites = [],
} = course
  return (
    <div className=" px-2 bg-white dark:bg-muted rounded-xl space-y-6 max-w-4xl mx-auto">

      {/* Title & Basic Info */}
      <div className="space-y-2">
        <h5 className="text-3xl font-bold">{title}</h5>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
          <span>
            <Star className="inline w-4 h-4 text-yellow-500 mr-1" />
            {/* {rating.toFixed(1)} · {studentsCount} students */}
            {rating} · {count} students
          </span>
          <span>{3} total hours</span>
          <span>Last updated {formatDistanceToNow(new Date(lastUpdate!))} ago</span>
        </div>
      </div>

      <Image src={imageUrl} alt='course-image' aria-description='Course image' width={400} height={400} className='h-60 w-full mx-auto max-w-2xl object-fit overflow-clip' />

      {/* Instructor */}
      <div className="flex items-center gap-3">
        <Image
          src={instructor?.avatar!}
          alt={instructor.fullName}
          width={40}
          height={40}
          className="rounded-full text-[7px]"
        />
        <p className="text-sm text-muted-foreground">
          Created by <span className="font-medium text-foreground">{instructor.fullName}</span>
        </p>
      </div>

      {/* Course Includes */}
      {/* {includes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">This course includes:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {includes.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )} */}

      {/* Objectives */}
      <div>
        <h3 className="text-lg font-semibold mb-2">What you'll learn</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-muted-foreground">
          {objectives.map((goal, i) => <li key={i}>{goal}</li>)}
        </ul>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Course Description</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Prerequisites */}
      {/* {prerequisites.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            {prerequisites.map((pre, i) => <li key={i}>{pre}</li>)}
          </ul>
        </div>
      )} */}

      {/* Tags & Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4 border-t pt-4">
        {/* <span>Level: <strong className="text-foreground">{level}</strong></span> */}
        <span>Language: <strong className="text-foreground">{'English'}</strong></span>
      </div>

      {/* CTA */}
      <div onClick={()=>{
        setActiveTab('content')
        setChapter(course?.sections[0]?.chapters[0])
      }} className="pt-4 border-t text-center">
        <button className="bg-primary h-12 text-white px-6 py-2 rounded-lg text-sm hover:bg-primary/90 transition">
          Start Course
        </button>
      </div>
    </div>
  )
}



// const exampleCourse = {
//   title: "Mastering JavaScript in 2025",
//   description: "This comprehensive course covers all aspects of JavaScript, from fundamentals to advanced concepts, ES2025 features, async patterns, and modern best practices.",
//   instructor: {
//     name: "Alex Devson",
//     avatar: "/avatars/alex.jpg",
//   },
//   rating: 4.8,
//   studentsCount: 12450,
//   totalHours: 18.5,
//   updatedAt: "2025-03-10",
//   level: "Intermediate",
//   language: "English",
//   objectives: [
//     "Understand core JavaScript concepts",
//     "Work with modern ES features",
//     "Master async programming",
//     "Build scalable JS applications",
//   ],
//   includes: [
//     "18.5 hours on-demand video",
//     "12 downloadable resources",
//     "Certificate of completion",
//     "Quizzes & practice exercises"
//   ],
//   prerequisites: [
//     "Basic HTML & CSS knowledge",
//     "A laptop with a modern browser",
//   ],
//   tags: ["JavaScript", "WebDev", "ES2025", "Frontend"],
// }
