'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Chapter, Section } from '@/types'
import { putRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'

import { RichTextEditor } from '@/components/common/RichTextEditor'
import { Label } from '@/components/ui/label'
import { CustomButton } from '@/components/shared/CustomButton'
import { CustomInput } from '@/components/shared/CustomInput'

import { ChevronLeftCircle, ChevronRightCircle, Menu } from 'lucide-react'

const MIN_CONTENT_LENGTH = 20

const ChapterContentForm = ({ chapter }: { chapter: Chapter }) => {
  const [form, setForm] = useState({
    label: chapter.label || '',
    content: chapter.content || '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
//   const [isEdit, setIsEdit] = useState(!chapter.content?.length)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!form.label.trim()) newErrors.label = 'Title is required.'
    if (form.content.trim().length < MIN_CONTENT_LENGTH)
      newErrors.content = 'Content must be at least 20 characters.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { error } = await putRequest({
        body: {
          collectionId: appwriteConfig.chaptersCollectionId,
          documentId: chapter.id,
          formData: form,
        },
      })

      if (error) {
        toast.error(error || 'Failed to update chapter.')
        return
      }

      toast.success('Chapter updated successfully!')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full py-10 mx-auto max-w-4xl ">
        <div className="flex justify-end">
            <CustomButton
            isLoading={isLoading}
            loadingText="Saving..."
            type="submit"
            // variant="outline"
            disabled={isLoading}
            className='bg-black'
            >
            Save
            </CustomButton>
        </div>

        <div className="space-y-6">
            {/* Chapter Title */}
            <div className="space-y-2">
                <Label htmlFor="label" className="text-lg font-semibold">
                Chapter Title
                </Label>
                <p className="text-sm text-muted-foreground">
                Make it clear and captivating. This will be the first impression learners get.
                </p>
                <CustomInput
                id="label"
                value={form.label}
                error={errors.label}
                disabled={isLoading}
                onChange={(e) => handleChange('label', e.target.value)}
                name="label"
                wrapper="max-w-xl"
                />
            </div>

            {/* Chapter Content */}
            <div className="space-y-2">
                <Label htmlFor="content" className="text-lg font-semibold">
                Chapter Content
                </Label>
                <RichTextEditor
                    value={form.content}
                    onChange={(val) => handleChange('content', val)}
                    className={errors.content ? 'border border-red-500' : ''}
                    disabled={isLoading}
                />
                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
            </div>
        </div>
      {/* Placeholder for future extensibility */}
      {/* <AttachmentsForm chapterId={chapter.id} /> */}
      {/* <ChapterResourcesForm /> */}
    </form>
  )
}

export default ChapterContentForm


 
import clsx from 'clsx'
import { useChapters } from '@/hooks'

export const ChapterWrapper = ({ chapter, }: { chapter: Chapter,  }) => {
  const [slideOut, setSlideOut] = useState(true)

  const res = useChapters({chapter})
 
  
// console.log({section})
  return (
    <section className="md:flex relative">
      {/* Sidebar */}
      <ChaptersSideNav setSlideOut={setSlideOut} slideOut={slideOut} clasName='absolute top-0 z-10 bg-white md:hidden shadow border-r' />
      <ChaptersSideNav setSlideOut={setSlideOut} slideOut={slideOut} clasName='max-md:hidden' />

      {/* Main Content */}
      <article className="relative flex-1  py-8 px-4 sm:px-6 lg:px-10 border-l h-full">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSlideOut((prev) => !prev)}
          className="absolute left-3 top-3 text-gray-500 flex gap-1 items-center"
          aria-label="Toggle Sidebar"
        >
          <ChevronRightCircle className={` w-6 h-6 ${slideOut ? "rotate-180" : ""} transition-all duration-500 ease `} />
          {!slideOut&&<p className=" ">Sections</p>}
        </button>

        <ChapterContentForm chapter={chapter} />
      </article>
    </section>
  )
}


export const ChaptersSideNav = ({slideOut, clasName, setSlideOut}:{
    slideOut:boolean, clasName:string,
    setSlideOut:Dispatch<SetStateAction<boolean>>
}) => {
    return (
              <aside
        className={clsx(
          'h-full overflow-hidden transition-all duration-500 ease-in-out ',
          slideOut ? 'w-60 xl:w-80' : 'w-0', clasName
        )}
      >
        <button
          onClick={() => setSlideOut((prev) => !prev)}
          className="flex justify-self-end pt-3 pr-3 md:hidden"
          aria-label="Toggle Sidebar"
        >
          <ChevronLeftCircle className="w-6 h-6 hover:text-gray-700 text-gray-400" />
        </button>

        <div
          className={clsx(
            'transition-opacity duration-300 ease-in-out delay-100 px-6 pb-8 pt-4 md:pt-8 space-y-4',
            slideOut ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <h4 className="text-muted-foreground">Sections</h4>
          {[
            'Section - 1',
            'Section - 2',
            'Section - 3',
            'Section - 4',
            'Section - 5',
            'Section - 6',
            'Section - 7',
          ].map((section, i) => (
            <div key={i} className="truncate">
              {section}
            </div>
          ))}
        </div>

      </aside>
    )
}
