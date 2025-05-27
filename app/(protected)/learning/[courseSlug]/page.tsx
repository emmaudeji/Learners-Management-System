import LearnerDashboard from '@/components/learn/LearningDashboard'
import { fields } from '@/constants'
import { LearningProvider } from '@/context/LearningContext'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { fetchCollectionData, getDocumentById } from '@/lib/appwrite'
import { Course, Note } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const CourseLearningPage = async ({params,searchParams}:{
    params:{courseSlug:string, }
    searchParams:{t:string}
}) => {
    // protect page
    const documentId = (await params).courseSlug
    const user = await getCurrentUser()
    const {data } = await getDocumentById<Course>(appwriteConfig.coursesCollectionId, documentId, fields.courses)

    if(!data) redirect(`/courses?msg=The url does not match any course, browse other courses`)
    const {data:initialNote , error} = await fetchCollectionData<Note>(appwriteConfig.notesCollectionId, 
          {ownerId:user?.id, courseId:data?.alias}, 
          fields.note)
    console.log({initialNote,error})
  return (
    <LearningProvider course={data} initialNote={initialNote[0]}  >
      <LearnerDashboard />
    </LearningProvider>
  )
}

export default CourseLearningPage