import InstructorCourses from '@/components/Instructors/InstructorCourses'
import { fields } from '@/constants'
import { appwriteConfig } from '@/lib/actions/config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { fetchCollectionData } from '@/lib/appwrite'
import { Course } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

const MyCoursesPage = async ({searchParams}:{
  searchParams: {}
}) => {
  // List courses here
  const user = await getCurrentUser()
  if(!user) redirect('/career')

    // set up params for filtering
    const params = {}

  const {data,error,tableSize} = await fetchCollectionData<Course>(
    appwriteConfig.coursesCollectionId,
    {createdBy: user.id, ...params},
    fields.courses,
  )

  console.log({data,error, tableSize})
  return (
    <InstructorCourses courses={data||[]} error={error} tableSize={tableSize} />
  )
}

export default MyCoursesPage