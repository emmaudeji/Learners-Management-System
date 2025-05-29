import React, { Suspense } from 'react'
import CourseSkeleton from '../common/CourseSkeleton'
import { fetchCollectionData } from '@/lib/appwrite'
import { appwriteConfig } from '@/lib/actions/config'
import { fields } from '@/constants'
import { Course } from '@/types'
import Image from 'next/image'
import Link from 'next/link'



const RecommendedForYou = () => {
    // Component to show recommended courses for the user
    // This can be based on user preferences, history, or popular courses
  return (
    <Suspense fallback={
       <section id="courses" className="py-16 px-4 bg-white padding ">
            <h4 className="text-3xl font-bold text-center mb-12">Explore Our Top Courses</h4>
            <CourseSkeleton/>
        </section>
    }>
        <RecommendedCourses />
  </Suspense>
  )
}

export default RecommendedForYou

const RecommendedCourses = async () => {
    const {data,error} = await fetchCollectionData<Course>(
        appwriteConfig.coursesCollectionId,
        {
            // filtering by userPreferences stored in the userStore
        },
        fields.courselisting
    ) 
    const courses = data??[]
  return (
    <section id="courses" className="py-16 px-4 bg-white padding">
    <h4 className="text-3xl font-bold text-center mb-12">Recommended for you</h4>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[...courses, {
        title: 'Full-Stack Web Development',
        createdBy:{fullName: 'Jane Doe'},
        imageUrl: 'https://source.unsplash.com/featured/?coding',
        rating: 4.8,
        count: '28,500+',
        description: '',
        ctegory: '',
        alias: 'full-stack-web-development',
        category: 'web-development',
      }, {
        title: 'Digital Marketing Mastery',
        createdBy:{fullName: 'John Smith'},
        imageUrl: 'https://source.unsplash.com/featured/?marketing',
        rating: 4.7,
        count: '19,000+',
        alias: 'digital-marketing-mastery',
        category: 'digital-marketing',
      }, {
        title: 'Data Science & Machine Learning',
        createdBy:{fullName: 'Sarah Lee'},
        imageUrl: 'https://source.unsplash.com/featured/?data',
        rating: 4.9, 
        alias: 'data-science-machine-learning',
        count: '34,200+',
        category: 'data-science',
      }].map(({ title, alias, category, createdBy:{fullName}, imageUrl, rating, count },i) => (
        <Link href={`/courses/${category??'category'}/${alias}`}  key={i}  className="bg-white border overflow-hidden flex flex-col h-full">
          <Image src={imageUrl} alt={title} width={400} height={400} className="w-full bg-slate-50 h-48 object-cover" />
          <div className="flex-1 p-4 flex flex-col h justify-between">
            <div className="">
                <h6 className="text-xl font-semibold mb-2">{title}</h6>
                <p className="text-gray-600 text-sm mb-1">{fullName}</p>
                <p className="text-yellow-500 font-medium mb-2">⭐ {rating} ({count}+)</p>
            </div>

            {/* <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enroll Now</button> */}
          </div>
        </Link >
      ))}
    </div>
  </section>
  )
}