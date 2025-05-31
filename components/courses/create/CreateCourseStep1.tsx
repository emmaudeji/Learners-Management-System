'use client'
// creating new course stage 1 

import { useState } from 'react'
import { toast } from 'react-toastify'
import { postRequest, putRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { fields } from '@/constants'
import { generateSlug } from '@/lib/helper'
import { Course } from '@/types'
import { Button } from '@/components/ui/button'
import { LayoutGrid, LayoutList, Trash2 } from 'lucide-react'
 
import Heading from '@/components/common/Heading'
import TitleForm from './TitleForm'
import DescriptionForm from './DescriptionForm'
import CoverImageForm from './CoverImageForm'
 
import { CourseObjectivesForm } from './CourseObj'
import { useCreateCourse } from '@/context/CreateCourseContext'
import CourseSkillsForm from './CourseSkillsForm'
import CourseCategorySelect from './SelectCategoryForm'
import CategorySelectForm from './SelectCategoryForm'
import { FileUploader } from '@/components/common/TempFileUploader'

const CreateCourseStep1 = () => {
    const {course,} = useCreateCourse()
 
  return (
      <section className="py-20 max-w-6xl mx-auto px-4 space-y-8  " >
          <Heading title='Customize your course' icon={<LayoutGrid />} className='justify-center' />
      <section className="  grid md:grid-cols-12 gap-12   ">
        <div className="space-y-8 col-span-7">
          <TitleForm course={course} />
          <DescriptionForm course={course} />
          <CourseObjectivesForm course={course}/>
        </div>
        <div className="space-y-8 col-span-5">
          <CategorySelectForm course={course} />
          <CourseSkillsForm course={course} />
          <CoverImageForm course={course}  />
          <FileUploader course={course} />
        </div>
          
      </section>
      </section>
 
  )
}

export default CreateCourseStep1
 