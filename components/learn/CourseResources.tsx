'use client'

import { useState } from 'react'
import { FileText, ImageIcon, Download, FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

type Attachment = {
  id: string
  title: string
  description: string
  type: 'pdf' | 'image' | 'doc' | 'video' | 'audio' | 'other'
  url: string
}

const mockAttachments: Attachment[] = [
  {
    id: '1',
    title: 'Course Outline',
    description: 'Overview of all modules and expectations.',
    type: 'pdf',
    url: '/attachments/course-outline.pdf'
  },
  {
    id: '2',
    title: 'Illustration for Module 3',
    description: 'This image explains the key process diagram.',
    type: 'image',
    url: '/attachments/module3-diagram.png'
  },
  {
    id: '3',
    title: 'Glossary of Terms',
    description: 'Download the glossary used across all modules.',
    type: 'doc',
    url: '/attachments/glossary.docx'
  }
]

export default function CourseResources() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      
        <div className="mx-auto max-w-xl text-center">
            <h4 className="text-2xl font-bold mb-1">Course Resources</h4>
            <p className="text-muted-foreground mb-6">
        Access and download course attachments provided by your instructor for further clarity and enrichment.
            </p>
        </div>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {mockAttachments.map((file) => (
          <AttachmentCard key={file.id} attachment={file} />
        ))}
      </div>
    </div>
  )
}

interface AttachmentCardProps {
  attachment: Attachment
}

function AttachmentCard({ attachment }: AttachmentCardProps) {
  const renderPreview = () => {
    switch (attachment.type) {
      case 'image':
        return (
          <Image
            src={attachment.url}
            alt={attachment.title}
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-52"
          />
        )
      case 'pdf':
        return (
          <iframe
            src={attachment.url}
            title={attachment.title}
            className="w-full h-52 rounded-md border"
          />
        )
      case 'doc':
        return (
          <div className="flex items-center justify-center h-52 bg-muted rounded-md">
            <FileText className="w-10 h-10 text-muted-foreground" />
            <span className="ml-2 text-sm">DOC Preview not supported</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-52 bg-muted rounded-md">
            <FileIcon className="w-10 h-10 text-muted-foreground" />
            <span className="ml-2 text-sm capitalize">{attachment.type} file</span>
          </div>
        )
    }
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-lg">{attachment.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderPreview()}
        <p className="text-sm text-muted-foreground">{attachment.description}</p>
        <div className="flex justify-end">
          <Button asChild variant="outline" size="sm">
            <a href={attachment.url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
