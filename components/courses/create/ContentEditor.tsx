import { RichTextEditor } from '@/components/common/RichTextEditor'
import { CustomButton } from '@/components/shared/CustomButton'
import { Button } from '@/components/ui/button'
import { appwriteConfig } from '@/lib/actions/config'
import { Chapter } from '@/types'
import { putRequest } from '@/utils/api'
import { Label } from '@radix-ui/react-label'
import { Disc, Save } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const MIN_CONTENT_LENGTH = 20

const ContentEditor = ({ chapter }: { chapter: Chapter }) => {
     const [form, setForm] = useState({
        content: chapter.content || '',
      })
    
      const [errors, setErrors] = useState<{ [key: string]: string }>({})
      const [isLoading, setIsLoading] = useState(false)
    
      const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: '' }))
        }
      }
    
      const validateForm = () => {
        const newErrors: typeof errors = {}
    
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
   <form onSubmit={handleSubmit} className="space-y-2">
        <Label htmlFor="content" className="text-lg font-semibold">
            Chapter Content
        </Label>

        <CustomButton
            isLoading={isLoading}
            loadingText="Saving..."
            disabled={isLoading}
            className=' text-primary justify-self-end'
            variant={'outline'}
            >
                <Save/> Save edit 
        </CustomButton>
        
        <RichTextEditor
            value={form.content}
            onChange={(val) => handleChange('content', val)}
            className={errors.content ? 'border border-red-500' : ''}
            disabled={isLoading}
        />
        {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
    </form>
  )
}

export default ContentEditor