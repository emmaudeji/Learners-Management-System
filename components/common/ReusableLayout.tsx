'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type DashboardLayoutProps = {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
  asideClassName?: string
  contentClassName?: string
}

export default function ReusableLayout({
  sidebar,
  children,
  className,
  asideClassName,
  contentClassName,
}: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const Toggler = ({ position }: { position?: string }) => (
    <button
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
      className={cn(
        "absolute z-40 flex items-center gap-2 bg-primary top-0 text-white px-2 py-2 text-sm shadow-md ",
        position
      )}
    >
      {isOpen ? <ChevronLeft size={20} className='shrink-0' /> : <ChevronRight size={20} className='shrink-0' />}
      <span className="flex-1 md:inline text-nowrap">{!isOpen && 'Open Menu'}</span>
    </button>
  )

  return (
    <div className={cn("flex min-h-screen relative", className)}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:block h-full bg-slate-50 border-r transition-all duration-300 overflow-hidden",
          isOpen ? "w-64" : "w-0",
          asideClassName
        )}
      >
        <div className="relative h-full">
          {sidebar}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-30 w-64 bg-slate-50 border-r transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          asideClassName
        )}
      >
        <div className="relative h-full">
          {sidebar}
          <Toggler position="top-  left-64  " />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 z-20 bg-black/10   md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <main className={cn("flex-1 p-4 bg-white relative", contentClassName)}>
        <div className="pt-10">
            {children}
        </div>
        <Toggler position="top-  left-0 max-md:hidden" />
      </main>
    </div>
  )
}
