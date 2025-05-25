'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UploadCloud, Video, ImageIcon } from 'lucide-react'
import { Chapter } from '@/types'

interface ChapterMediaUploadProps {
  onImageUpload?: (file: File) => void
  onVideoUpload?: (file: File) => void
  initialImagePreview?: string
  initialVideoName?: string
  chapter:Chapter
}

export default function ChapterMediaUpload({
  onImageUpload,
  onVideoUpload,
  initialImagePreview,
  chapter,
  initialVideoName,
}: ChapterMediaUploadProps) {
  const [imagePreview, setImagePreview] = useState(initialImagePreview || '')
  const [videoName, setVideoName] = useState(initialVideoName || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      onImageUpload?.(file)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoName(file.name)
      onVideoUpload?.(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Chapter Media</h3>
        <p className="text-sm text-muted-foreground">
          You can structure this chapter using a <strong>script only</strong>, a <strong>video only</strong>,
          or combine <strong>both script and video</strong>. Choose what best fits your teaching style and
          take full advantage of the platform’s flexibility.
        </p>
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="cover-image">Cover Image (optional)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="cover-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="w-24 h-24 border rounded bg-muted overflow-hidden flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Cover preview" className="object-cover w-full h-full" />
            ) : (
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          This image will represent the chapter visually on the course page.
        </p>
      </div>

      {/* Video Upload */}
      <div className="space-y-2">
        <Label htmlFor="chapter-video">Chapter Video (optional)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="chapter-video"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="w-4 h-4" />
            {videoName || 'No video selected'}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload a video lecture for this chapter if applicable.
        </p>
      </div>
    </div>
  )
}
