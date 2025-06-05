import { cn } from '@/lib/utils'
import React from 'react'

const CardWrapper = ({ children, className }:{children:React.ReactNode, className?: string}) => {
  return (
    <div className={cn('py-6 px-4 border rounded-xl bg-white', className)}>{children}</div>
  )
}

export default CardWrapper