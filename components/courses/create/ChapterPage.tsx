'use client'

import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
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
   
  const [type, setType] = useState<"content" | "quizes" | "attachments">('content') // "content" | "quizes" | "attachments"

  return (
    <section  className="w-full py-10 mx-auto max-w-4xl ">
        <div className="flex justify-end gap-2 items-center w-full pb-4 border-b mb-4 flex-wrap">
            <Button type='button' onClick={()=>setType("content")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="content" ? 'bg-green-100':''} `}>Content</Button>
            /
            <Button type='button' onClick={()=>setType("quizes")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="quizes" ? 'bg-green-100':''} `}>Quizes</Button>
            /
            <Button type='button' onClick={()=>setType("attachments")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="attachments" ? 'bg-green-100':''} `}>Attachments</Button>
        </div>

        <div className="space-y-8">
            <ChapterTitleForm chapter={chapter} type='chapter' />

             {
              type==="content" ? 
               <ContentEditor chapter={chapter}/>
              :
              type==="quizes" ? 
              <div className="space-y-2">
                <div className="">
                  <Label htmlFor="content" className="text-lg font-semibold">
                    Chapter Quize
                  </Label>
                  <p className="text-gray-600">Add a new question or update existing one.</p>
                </div>

                 <ChapterQuizeWrapper chapter={chapter} />
            </div>
              :
              type==="attachments" ? 
              <ChapterAttachments chapter={chapter}/>
              : null
             }
        </div>
      {/* Placeholder for future extensibility */}
      {/* <AttachmentsForm chapterId={chapter.id} /> */}
      {/* <ChapterResourcesForm /> */}
    </section>
  )
}

export default ChapterContentForm


 
import clsx from 'clsx'
import { useChapters } from '@/hooks'
import { Button } from '@/components/ui/button'
import ChapterQuizForm from './ChapterQuizForm'
import ContentEditor from './ContentEditor'
import ChapterTitleForm from './ChapterTitleForm'
import ChapterQuizeWrapper from './ChapterQuizeWrapper'
import ChapterAttachments from './ChapterAttachments'

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
