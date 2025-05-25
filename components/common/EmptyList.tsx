import { cn } from '@/lib/utils'
import { FolderOpen } from 'lucide-react'
import React from 'react'

const EmptyList = ({
  size,
  icon,
  heading,
  text,
  className,
  CTA,
}: {
  size?: string | number
  icon?: React.ReactNode
  text?: string
  heading?: string
  className?: string
  CTA?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-96 w-full flex text-center flex-col gap-2 justify-center items-center',
        className
      )}
    >
      {icon || (
        <FolderOpen
          size={size || 40}
          className="text-green-700/50 bg-green-200/30 p-2 rounded-full"
        />
      )}

      {heading ? (
        <p
          className="text-2xl font-bold"
          style={{
            background: 'linear-gradient(90deg, #22c55e 0%, #15803d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {heading}
        </p>
      ) : null}

      <p className="max-w-sm text-gray-700 text-sm">{text || 'No items found'}</p>

      {CTA}
    </div>
  )
}

export default EmptyList
