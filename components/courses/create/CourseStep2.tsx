'use client'
// creating new course stage 1 

import { useState } from 'react'
import { CustomInput } from '@/components/shared/CustomInput'
import { toast } from 'react-toastify'
import { CustomButton } from '@/components/shared/CustomButton'
import { postRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { fields } from '@/constants'
import { generateSlug } from '@/lib/helper'
import { Course } from '@/types'
import { Button } from '@/components/ui/button'
import { LayoutGrid, LayoutList, Trash2 } from 'lucide-react'
import DeleteCard from '@/components/common/DeleteCard'
import { Card } from '@/components/ui/card'
import Heading from '@/components/common/Heading'
import TitleForm from './TitleForm'
import DescriptionForm from './DescriptionForm'
import CoverImageForm from './CoverImageForm'
import { CourseChapters } from './CourseChapters'
import PriceForm from './PriceForm'

const CourseStep2 = ({course}:{
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
    <section className="padding py-12 w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold pb-3">Setup course </h2>
        <p className="text-sm text-muted-foreground">
          Completed 2/6
        </p>
      </div>

      <div className="flex justify-self-end gap-4">
        <Button className='bg-black'>Publish</Button>
        <DeleteCard onDelete={async ()=>{}} trigger={<Button variant='outline' className='border border-red-400 text-red-400 hover:text-red-700 duration-300 '><Trash2/></Button>}/>
      </div>

      <section className="grid gap-8 md:grid-cols-2">
         <div className="space-y-4">

          <Heading title='Customize your course' icon={<LayoutGrid/>} />
          <TitleForm course={course} />
          <DescriptionForm course={course} />
          <CoverImageForm course={course}  />

         </div>




         <div className="space-y-4">
          <Heading title='Course Chapters' icon={<LayoutList/>} />

          <CourseChapters course={course} />

          <PriceForm course={course}/>

         </div>
      </section>

 
    </section>
  )
}

export default CourseStep2
