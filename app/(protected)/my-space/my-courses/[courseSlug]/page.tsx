import CreateCourseStep2 from '@/components/courses/create/CreateCourseStep1'
import CreateCourseWrapper from '@/components/courses/create/CreateCourseWrapper'
import { CreateCourseProvider } from '@/context/CreateCourseContext'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { getDocumentById } from '@/lib/appwrite'
import { getUrl } from '@/lib/helper'
import { Course } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const CoueseSlug = async ({params,searchParams}:{
    params:{courseSlug:string, }
    searchParams:{step:string, chapter:string, section:string,}
}) => {

    const documentId = (await params).courseSlug
    const step = (await searchParams).step
    const chapterAlias = (await searchParams).chapter
    const sectionAlias = (await searchParams).section

    const { data, error } = await getDocumentById<Course>(appwriteConfig.coursesCollectionId, documentId)
    // console.log( {data,error} )
    if(!data){ 
        const user = await getCurrentUser()
        if(!user) redirect(`/auth?q=sign-in`)
        redirect(getUrl(`my-courses`))
    }
    
    if(Number(step) > 1 && !data.sections?.[0]?.chapters?.length) redirect(getUrl(`my-courses/${documentId}?step=1`))

  return (
    <CreateCourseProvider
      course={data}
      step={Number(step||0)} 
      chapterAlias={chapterAlias} 
      sectionAlias={sectionAlias}
    >
      <CreateCourseWrapper  />
    </CreateCourseProvider>
  )
}

export default CoueseSlug