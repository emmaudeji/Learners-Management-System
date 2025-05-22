'use client'

import React, { useState } from 'react'
import AttachmentUploader from '@/components/common/AttachmentUploader'
import EmptyList from '@/components/common/EmptyList'
import { Attachment, Chapter } from '@/types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, LinkIcon, UploadCloud } from 'lucide-react'

type Props = {
  chapter: Chapter
}

const ChapterAttachments = ({ chapter }: Props) => {
  const [mode, setMode] = useState<'list' | 'upload'>('list')
  const [chapterAttachments, setChapterAttachments] = useState<string[]>(
    chapter.attachments || []
  )

  const handleSelect = (att: Attachment) => {
    setChapterAttachments((prev) => [...prev, att.url])
    // toast.success('Attachment added successfully')
    setMode('list')
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="attachments" className="text-lg font-semibold">
          Chapter Attachments
        </Label>
        <p className="text-muted-foreground text-sm mt-1">
          Add or update attachments for this chapter. Learners can download or preview them.
        </p>
      </div>

      {/* Action Toggle Buttons */}
      <div className="flex gap-4">
        <Button
          variant={mode === 'list' ? 'default' : 'outline'}
          onClick={() => setMode('list')}
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          View Existing
        </Button>
        <Button
          variant={mode === 'upload' ? 'default' : 'outline'}
          onClick={() => setMode('upload')}
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          Upload New
        </Button>
      </div>

      {/* Existing Attachments View */}
      {mode === 'list' && (
        <>
          {chapterAttachments.length === 0 ? (
            <EmptyList
              heading="No Attachments Yet"
              text="You haven't added any files to this chapter. Upload materials like guides, PDFs, or templates to support learners."
              size={70}
              CTA={
                <Button onClick={() => setMode('upload')} className="mt-2">
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Upload Attachment
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {chapterAttachments.map((url, i) => (
                <Card key={i} className="border hover:shadow-md transition">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      File {i + 1}
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline text-primary"
                    >
                      Preview
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Upload Attachment View */}
      {mode === 'upload' && (
        <div className="mt-4">
          <AttachmentUploader
            attachments={dummyAttachments}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  )
}

export default ChapterAttachments

// Dummy fallback data
const dummyAttachments: Attachment[] = [
  { id: '1', name: 'Invoice Jan.pdf', url: '/invoices/invoice-jan.pdf', type: 'pdf', alias: 'gtsfe34vd' },
  { id: '2', name: 'Summary Guide.pdf', url: '/guides/summary-guide.pdf', type: 'pdf', alias: 'gtsfe34vd' },
  { id: '3', name: 'Worksheet A.pdf', url: '/worksheets/a.pdf', type: 'pdf', alias: 'gtsfe34vd' },
  { id: '4', name: 'Project Brief.pdf', url: '/briefs/project-brief.pdf', type: 'pdf', alias: 'gtsfe34vd' },
]
