import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/button'

type CustomButtonProps = {
  isLoading?: boolean
  loadingText?: string
} & React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export const CustomButton = ({
  children,
  isLoading,
  loadingText = 'Submitting...',
  disabled,
  className,
  variant,
  size,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('flex items-center gap-2 hover:cursor-pointer', className)}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  )
}
