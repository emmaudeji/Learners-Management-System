import CourseStep2 from '@/components/courses/create/CourseStep2'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { getDocumentById } from '@/lib/appwrite'
import { Course } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const CoueseSlug = async ({params}:{
    params:{courseSlug:string, tutorSlug:string}
}) => {
    const documentId = (await params).courseSlug
    const { data, error } = await getDocumentById<Course>(appwriteConfig.coursesCollectionId, documentId)
    // console.log( {data,error} )
    if(!data){ 
        const user = await getCurrentUser()
        redirect(`/t/${user?.id}/my-courses`)
    }
  return (
    <CourseStep2 course={data!} />
  )
}

export default CoueseSlug