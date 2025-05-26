import LearnerDashboard from '@/components/learn/LearningDashboard'
import React from 'react'

const CourseLearningPage = async ({params,searchParams}:{
    params:{courseSlug:string, }
    searchParams:{t:string}
}) => {
    // protect page
    const documentId = (await params).courseSlug
    const isTutor = (await searchParams).t
  return (
    <LearnerDashboard/>
  )
}

export default CourseLearningPage