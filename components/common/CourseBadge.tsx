'use client'

import React from 'react'
import { Badge } from '@/types'
import { cn } from '@/lib/utils'

const categoryColors: Record<number, string> = {
  1: '#FFD700', // Gold
  2: '#3B82F6', // Blue
  3: '#A855F7', // Purple
  4: '#EF4444', // Red
}

type Props = {
  badge: Badge
  className?: string
}

const CourseBadge: React.FC<Props> = ({ badge, className,   }) => {
  const color = categoryColors[badge.category] || '#ccc'

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'relative w-44 h-44 rounded-full shadow-inner border border-white/20 p-4 flex flex-col items-center justify-center group transform hover:scale-105 transition-transform duration-300',
          className
        )}
        style={{
          background: color
            ? `linear-gradient(135deg, ${color} 0%, ${color} 80%)`
            : 'transparent',
        }}
      >
        {/* Glowing pulse background */}
        <div
          className="absolute inset-0 rounded-full blur-xl animate-pulse z-0"
          style={{ boxShadow: `0 0 30px ${color}` }}
        />

        {/* Inner soft shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/10 blur-md z-0" />

        {/* Icon */}
        <div
          className="relative z-10 text-5xl drop-shadow-xl mb-2"
          style={{ color }}
        >
          {badge.icon}
        </div>

        {/* Label */}
        <h4 className="relative z-10 text-lg font-bold text-white tracking-wide text-center drop-shadow">
          {badge.label}
        </h4>
      </div>

      {/* Description */}
      <p className="text-sm text-center px-2 mt-1">{badge.description}</p>
    </div>
  )
}

export default CourseBadge
