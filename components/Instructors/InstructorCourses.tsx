import { Course } from '@/types'
import React from 'react'
import EmptyList from '../common/EmptyList'
import Link from 'next/link'
import { getUrl } from '@/lib/helper'
import { Plus } from 'lucide-react'

const InstructorCourses = ({courses, error, tableSize}:{courses:Course[], error:string|null, tableSize:number}) => {
  return (
    <section className="padding py-14 pb-20 space-y-8 relative min-h-[90vh]" >
        <div className='text-center'>
            <h4 className="">My Courses Page</h4>
        </div>

        <section className="">
            {
                error ? 
                <></>
                :
                !courses.length ?
                <EmptyList
                    text='Start creating courses' 
                    heading='You have not created any course' 
                    CTA={<Link className='bg-primary py-3 rounded-md px-4 flex items-center' href={getUrl('create-course')}> <Plus/> Create a course</Link>}
                />
                :
                <section className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   w-full mx-auto gap-6">
                    {
                        courses.map((course,index)=>{
                            return(
                                <div key={index} className="p-6 border rounded space-y-4">
                                    <h6 className="">{course.title}</h6>
                                    <div className="flex gap-2 items-center">
                                        <Link href={getUrl(`my-courses/${course.alias}`)} className='text-green-700' >Edit</Link>
                                        <Link href={ `/learning/${course.alias}?t=tutor`} className='text-blue-700' >Preview</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            }
        </section>

    </section>
  )
}

export default InstructorCourses