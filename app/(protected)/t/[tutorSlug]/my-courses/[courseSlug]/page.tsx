import CreateCourseStep2 from '@/components/courses/create/CreateCourseStep1'
import CreateCourseWrapper from '@/components/courses/create/CreateCourseWrapper'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { getDocumentById } from '@/lib/appwrite'
import { Course } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const CoueseSlug = async ({params,searchParams}:{
    params:{courseSlug:string, tutorSlug:string}
    searchParams:{step:string,}
}) => {
    const documentId = (await params).courseSlug
    const step = (await searchParams).step
    const { data, error } = await getDocumentById<Course>(appwriteConfig.coursesCollectionId, documentId)
    // console.log( {data,error} )
    if(!data){ 
        const user = await getCurrentUser()
        if(!user) redirect(`/auth?q=sign-in`)
        redirect(`/t/${user?.id}/my-courses`)
    }
  return (
    <CreateCourseWrapper course={data!} step={Number(step||0)} />
  )
}

export default CoueseSlug