
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button' // assuming you're using shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'
import { RichTextEditor } from '../common/RichTextEditor'

interface NotesEditorProps {
  initialValue?: string
  onSave: (value: string) => void
  title?: string
  editable?: boolean
}

export const NotesEditor: React.FC<NotesEditorProps> = ({
  initialValue = '',
  onSave,
  title = 'Notes',
  editable = true
}) => {
  const [note, setNote] = useState(initialValue)
  const [editing, setEditing] = useState(false)

  const handleSave = () => {
    onSave(note)
    setEditing(false)
    // api call
  }

  const handleCancel = () => {
    setNote(initialValue)
    setEditing(false)
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
              
              <Button  onClick={handleSave}>
                Save Note
              </Button>
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
