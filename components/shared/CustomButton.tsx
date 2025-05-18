import { Button,   } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils' // optional, if you want to merge class names
import React from 'react'
import { ButtonProps } from 'react-day-picker'

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean
  loadingText?: string
}

export const CustomButton = ({
  children,
  isLoading,
  loadingText = 'Submiting...',
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('flex items-center gap-2 hover:cursor-pointer', className)}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {isLoading ? loadingText : children}
    </Button>
  )
}
