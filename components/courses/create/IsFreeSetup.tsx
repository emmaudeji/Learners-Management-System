'use client'

import { useState } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PopoverMenu } from '@/components/shared/PopoverMenu'
import { putRequest } from '@/utils/api'
import { toast } from 'react-toastify'

const statusOptions = [
  { label: 'Free', value: true, style: 'border-red-700/50 bg-red-600/10 text-red-700' },
  { label: 'Paid', value: false, style: 'border-blue-500/50 bg-blue-600/10 text-blue-700' },
]

export const IsFreeSetUp = ({
  currentIsFree,
  documentId,
  collectionId,
  callback,
}: {
  currentIsFree: boolean
  documentId: string
  collectionId: string
  callback?: (isFree: boolean) => void
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFree, setIsFree] = useState(currentIsFree)

  const currentOption = statusOptions.find((opt) => opt.value === isFree) ?? statusOptions[0]

  const updateStatus = async (newValue: boolean) => {
    setLoading(true)
    setIsFree(newValue)

    const { error } = await putRequest({
      body: {
        collectionId,
        documentId,
        formData: { isFree: newValue },
      },
    })

    if (error) {
      toast.error('Failed to update status.')
      setIsFree(currentIsFree)
    } else {
      toast.success(`Chapter marked as ${newValue ? 'Free' : 'Paid'}.`)
      callback?.(newValue)
    }

    setLoading(false)
  }

  return (
    <PopoverMenu
      open={open}
      setOpen={setOpen}
      align="end"
      className="w-40"
      trigerBtn={
        <p
          className={cn(
            'rounded-full px-2 py-0.5 text-sm border flex items-center gap-1 cursor-pointer transition-colors',
            currentOption.style
          )}
        >
          {currentOption.label}
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </p>
      }
    >
      <div className="py-3">
        <div className="px-4 pb-2 border-b">
          <p className="text-sm text-muted-foreground">Set chapter access</p>
        </div>
        <ul className="mt-2 space-y-1">
          {statusOptions.map((option) => (
            <li
              key={option.label}
              onClick={() => {
                setOpen(false)
                if (option.value !== isFree) updateStatus(option.value)
              }}
              className={cn(
                'px-4 py-1.5 text-sm cursor-pointer rounded hover:bg-accent transition-colors',
                isFree === option.value && 'bg-muted text-primary font-semibold'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </PopoverMenu>
  )
}

export default IsFreeSetUp
