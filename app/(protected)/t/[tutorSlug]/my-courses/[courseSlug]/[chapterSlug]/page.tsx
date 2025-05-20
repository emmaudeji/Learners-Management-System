import ChapterSlugForm from '@/components/courses/create/ChapterPage'
import CourseStep2 from '@/components/courses/create/CourseStep2'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { getDocumentById } from '@/lib/appwrite'
import { Chapter, Course } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const CoueseSlug = async ({params}:{
    params:{courseSlug:string, tutorSlug:string, chapterSlug:string}
}) => {
    const documentId = (await params).chapterSlug
    const { data, error } = await getDocumentById<Chapter>(appwriteConfig.chaptersCollectionId, documentId)
    // console.log( {data,error} )
    if(!data){ 
        const user = await getCurrentUser()
        redirect(`/t/${user?.id}/my-courses`)
    }
  return (
    <ChapterSlugForm chapter={data!} />
  )
}

export default CoueseSlug