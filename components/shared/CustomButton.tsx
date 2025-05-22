import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, PenLine, Plus, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/button'

type CustomButtonProps = {
  isLoading?: boolean
  editType?: string
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


export const TextButton = ({
  children,
  isLoading,
  loadingText = 'Submitting...',
  disabled,
  className,
  variant,
  size,
  editType,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('flex h-0 px-0 py-0 items-center gap-2 hover:cursor-pointer hover:bg-none hover:text-green-500 text-primary', className)}
      variant={"ghost"}
      size={size}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : editType==="add" ? <Plus className="w-4 h-4" /> : editType==="edit" ? <PenLine className="w-4 h-4" /> : editType==="save" ? <Save className="w-4 h-4" /> : null}
      {isLoading ? loadingText : children ? children : 
        editType==="edit" ? "Edit" : editType==="edit" ? "Add" : editType==="save" ? "Save" : ""
      }
    </Button>
  )
}


