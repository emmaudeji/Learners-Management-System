
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button' // assuming you're using shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'
import { RichTextEditor } from '../common/RichTextEditor'
import { postRequest, putRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { useUserStore } from '@/store/useUserStore'
import { useLearn } from '@/context/LearningContext'
import { generateSlug } from '@/lib/helper'
import { toast } from 'react-toastify'
import { fields } from '@/constants'
import { CustomButton } from '../shared/CustomButton'

 

export const NotesEditor = () => {
  const {user} = useUserStore()
  const {course, initialNote:initNote} = useLearn()

  const [note, setNote] = useState(initNote?.note||'')
  const [initialNote, setInitialNote] = useState(initNote)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      const {data, error} = 
        !initialNote ? await postRequest({
              body: {
                collectionId:appwriteConfig.notesCollectionId,
                fields:fields.note,
                formData:{
                  note,
                  createdBy: user?.id,
                  ownerId: user?.id,
                  courseId:course.id,
                  type:'LECTURE',
                  alias: generateSlug(note),
                }
              }
            })
          :
          await putRequest({
              body: {
                collectionId:appwriteConfig.notesCollectionId,
                documentId: initialNote.alias,
                fields:fields.note,
                formData:{
                  note,
                }
              }
            })
      console.log({data,error})
      if(!error) {
        setInitialNote(data)
        toast.success('Note saved!')
      } else {
        toast.error('Note was not saved, check your network and try again')
      }
    } catch (error) {
        toast.error('Note was not saved, check your network and try again')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setSaving(false)
  }

  return (
    <section className="max-w-3xl mx-auto py-12 space- -6">
        <div className="text- pb-8  space-y-2">
            <h6 className="text-xl font-semibold">My Notes</h6>
            <p className="text-muted-foreground">
                Capture your thoughts, key takeaways, or questions as you learn. Your notes stay saved so you can review and build on them anytime.
            </p>
            {/* <p className="text-muted-foreground italic">No notes yet. Start jotting down insights or reflections from this chapter to reinforce your understanding.</p> */}
        </div>


        <div className="space-y-4">
 
            <RichTextEditor value={note} onChange={setNote} modules={noteModules} />
            
            <div className="flex justify-end space-x-2  ">
              
              <CustomButton isLoading={saving} onClick={handleSave}>
                Save Note
              </CustomButton>
            </div>

        </div>
 </section>
  )
}

const noteModules = {
  toolbar: [
    // Font family and size
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],

    // Heading levels
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // Text styles
    ['bold', 'italic', 'underline', 'strike'],

    // Subscript / superscript
    [{ script: 'sub' }, { script: 'super' }],

    // Blockquote and code
    ['blockquote', 'code-block'],

    // Lists and indentation
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    // Text alignment
    [{ align: [] }],

    // Clear formatting
    ['clean'],
  ],
};
