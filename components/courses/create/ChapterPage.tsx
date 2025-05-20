import { Chapter } from '@/types'
import React from 'react'
import ChapterTitleForm from './ChapterTitleForm'
import TiptapEditor from './RichCourseEditor'

const ChapterSlugForm = ({chapter}:{chapter:Chapter}) => {
  return (
     <main className="py-14 w-full space-y-6">
        <header className="border-b pb-4 mb-4 w-full padding">
            <h2 className="">Setup course chapter</h2>
            <p className="">Lorem ipsum dolor sit amet consectetur.</p>
        </header>

        <article className="max-w-4xl w-full mx-auto space-y-4">
            <ChapterTitleForm chapter={chapter} />

            <TiptapEditor />

        </article>
     </main>
  )
}

export default ChapterSlugForm