'use client'
// creating new course stage 1 

import { useState } from 'react'
import { CustomInput } from '@/components/shared/CustomInput'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { CustomButton } from '@/components/shared/CustomButton'
import { postRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { fields } from '@/constants'
import { generateSlug } from '@/lib/helper'
import { useParams, useRouter } from 'next/navigation'
import { Course } from '@/types'
import { useUserStore } from '@/store/useUserStore'

const CourseStep1 = ( ) => {
   const {push} = useRouter()
   const {user} = useUserStore()
 
    
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
            alias: generateSlug(form.title),
            createdBy: user?.id,
          },
          fields: fields.courses,
        }
      })

      if(error){
        toast.error(error||"Unsuccessful, check network and try again")
        return 
      }

      toast.success('Course details saved! Proceed to next step.')
      push(`/t/${user?.id}/my-courses/${data.id}`)

      // Proceed to next step or reset form
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full max-w-xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold pb-3">Add a new course</h2>
        <p className="text-sm text-muted-foreground">
          Begin by entering your course title and a compelling description. This helps learners understand what your course is about.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          label="Course Title"
          description="Make it short, clear, and enticing. This will be the first impression learners get."
          name="title"
          value={form.title}
          error={errors.title}
          onChange={handleChange}
        />

        <CustomInput
          label="Course Description"
          description="Write a structured overview. Use keywords that improve SEO and attract the right audience."
          name="description"
          value={form.description}
          error={errors.description}
          onChange={handleChange}
          isTextArea
        />

        <CustomButton type="submit" isLoading={isLoading} loadingText='Saving...'>
           Save and Continue 
        </CustomButton>
      </form>
    </section>
  )
}

export default CourseStep1
