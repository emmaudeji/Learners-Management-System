'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadCloud, FileText } from 'lucide-react'
import { Attachment } from '@/types'
import { generateSlug } from '@/lib/helper'
import { cn } from '@/lib/utils'

type AttachmentUploaderProps = {
  attachments: Attachment[]
  onSelect: (attachment: Attachment) => void
}

export default function AttachmentUploader({
  attachments,
  onSelect,
}: AttachmentUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [customName, setCustomName] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)

    setTimeout(() => {
      const finalName = customName.trim() || file.name
      const fakeAttachment: Attachment = {
        id: Date.now().toString(),
        name: finalName,
        url: URL.createObjectURL(file),
        alias: generateSlug(finalName),
        type: file.type,
      }

      onSelect(fakeAttachment)
      setUploading(false)
      setFile(null)
      setCustomName('')
    }, 1500)
  }

  return (
    <Tabs defaultValue="select" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="select">Select from List</TabsTrigger>
        <TabsTrigger value="upload">Upload New</TabsTrigger>
      </TabsList>

      {/* Existing Attachments */}
      <TabsContent value="select">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {attachments.map((att) => (
            <Card
              key={att.id}
              className="hover:ring-2 ring-primary cursor-pointer transition-all"
              onClick={() => onSelect(att)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium truncate">
                  {att.name}
                </CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <a
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Preview
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Upload New */}
      <TabsContent value="upload">
        <div className="border border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 bg-muted/20">
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
          <Label htmlFor="file-upload" className="text-sm font-medium">
            {file
              ? `Selected: ${file.name}`
              : uploading
              ? 'Uploading...'
              : 'Click or drag a file to upload'}
          </Label>

          {/* Hidden file input */}
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />

          <Button
            type="button"
            onClick={() =>
              document.getElementById('file-upload')?.click()
            }
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </Button>

          {/* Custom name input */}
          {file && (
            <div className="w-full mt-4 space-y-2">
              <Label htmlFor="custom-name" className="text-sm">
                Custom File Name
              </Label>
              <Input
                id="custom-name"
                placeholder="Enter a display name for the file"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                disabled={uploading}
              />
            </div>
          )}

          {file && (
            <Button
              type="button"
              className="mt-4"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </Button>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
