import CenterModal from '@/components/shared/CenterModal'
import { Badge } from '@/types'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import CourseBadge from '@/components/common/CourseBadge'

interface EditBadgeModalProps {
  trigger: React.ReactNode
  badge: Badge
  onSave?: (updated: Partial<Badge>) => void
}

const EditBadgeModal = ({ trigger, badge, onSave }: EditBadgeModalProps) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(badge)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) onSave(formData)
    setOpen(false)
  }

  return (
    <CenterModal open={open} setOpen={setOpen} triggerBtn={trigger}>
        
      <CourseBadge badge={formData}/>

      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
        <p className="font-semibold  text-gray-700">
        Customize the badge details or simply save to keep it as is.
        </p>
        <div>
          <label className="text-sm font-medium">Label</label>
          <Input
            name="label"
            value={formData.label}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Save and submit</Button>
        </div>
      </form>
    </CenterModal>
  )
}

export default EditBadgeModal
