'use client'
// creating new course stage 1 

import { useState } from 'react'
import { toast } from 'react-toastify'
import { postRequest } from '@/utils/api'
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

const CreateCourseStep1 = ({course}:{
  course:Course
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {
      title: form.title.trim() ? '' : 'Course title is required.',
      description: form.description.trim() ? '' : 'Course description is required.',
    }
    setErrors(newErrors)
    return !newErrors.title && !newErrors.description
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix the errors before submitting.')
      return
    }

    try {
      setIsLoading(true)

      // Simulate API request
      const {data,error} = await postRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          formData: {
            ...form,
            alias: generateSlug(form.title)
          },
          fields: fields.courses,
        }
      })

      if(error){
        toast.error(error||"Unsuccessful, check network and try again")
        return 
      }

      toast.success('Course details saved! Proceed to next step.')

      // Proceed to next step or reset form
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <section className="pb-20 pt-8 max-w-3xl mx-auto flex flex-col items-center  gap-8 ">
          <Heading title='Customize your course' icon={<LayoutGrid/>} />
          <TitleForm course={course} />
          <DescriptionForm course={course} />
          <CourseObjectivesForm course={course}/>
          <CoverImageForm course={course}  />
      </section>
 
  )
}

export default CreateCourseStep1