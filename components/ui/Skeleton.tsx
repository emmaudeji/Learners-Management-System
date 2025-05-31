import { cn } from '@/lib/utils'
import React from 'react'

const Skeleton = ({className}:{className?:string}) => {
  return (
    <div className={cn('bg-slate-200 animate-pulse h-10 rounded w-full', className)}> </div>
  )
}

export default Skeleton