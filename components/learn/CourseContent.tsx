import { Chapter } from '@/types'
import React from 'react'
import { RichTextRead } from '../common/RichTextEditor'
import { useLearn } from '@/context/LearningContext'

const CourseContent = () => {
    const {chapter} = useLearn()
  return (
    <section className='mx-auto max-w-4xl px-4 space-y-8 py-10'>
        <h4 className="capitalize">{chapter?.label || 'Chapter tile'}</h4>

        {/* video component if available */}
        <video
              src={chapter?.videoUrl}
              controls
              className="w-full rounded-lg mb-4"
              aria-label="Chapter video"
            />
        <section className="">
            <RichTextRead content={chapter.content||''} className='' />
        </section>
        
    </section>
  )
}

export default CourseContent