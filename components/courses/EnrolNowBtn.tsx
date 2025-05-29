'use client'

import { useGlobal } from '@/context/RootContext'
import { useUserStore } from '@/store/useUserStore'
import { Course } from '@/types'
import { FilePenLine, HeartPlus, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { postRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { generateSlug } from '@/lib/helper'
import { cn } from '@/lib/utils'

const EnrolNowBtn = ({ course }: { course: Course }) => {
  const { setCourseItem, setFallbackUrl } = useGlobal()
  const { user } = useUserStore()

  const fallbackUrl = course.isFree
    ? `/enroll?course=${course.alias}`
    : `/payment?course=${course.alias}`

  const buttonBase = 'h-12 rounded-md px-4 text-sm font-medium transition'

  const handleEnroll = async () => {
    setCourseItem(course)
    const { data, error } = await postRequest({
      body: {
        collectionId: appwriteConfig.coursesCollectionId, // changer to enrollments collection
        formData: {
          alias: generateSlug(course.title),
          courseId: course.alias,
        },
      },
    })
    // You might want to redirect or show a toast here
  }

  // Not logged in
  if (!user) {
    return (
      <Link
        href={`/auth?q=signin?fallback=${fallbackUrl}`}
        onClick={() => {
          setFallbackUrl(fallbackUrl)
          setCourseItem(course)
        }}
        className={cn(buttonBase, 'bg-primary text-white text-center w-full flex items-center justify-center')}
      >
        Login to Enroll
      </Link>
    )
  }

  // Free course
  if (course.isFree && user) {
    return (
      <div className="flex gap-2 items-center">
        <Button onClick={handleEnroll} className={cn(buttonBase, 'flex-1')}>
          Enroll for Free
        </Button>
        <HeartPlus
          size={28}
          className={cn(
            buttonBase,
            'w-12 text-primary hover:bg-primary/10 flex items-center justify-center p-2'
          )}
        />
      </div>
    )
  }

  // Paid course
  return (
    <div className="space-y-2">
      <Link
        href={`/payment?course=${course.alias}`}
        onClick={() => setCourseItem(course)}
        className={cn(
          buttonBase,
          'bg-primary text-white w-full flex items-center justify-center gap-2 text-base'
        )}
      >
        <FilePenLine size={18} />
        Enroll
      </Link>

      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          className={cn(
            buttonBase,
            'flex-1 border-primary text-primary hover:bg-primary/10'
          )}
        >
          <ShoppingBasket size={16} />
          Add to cart
        </Button>
        <HeartPlus
          size={28}
          className={cn(
            buttonBase,
            'w-12 text-primary hover:bg-primary/10 flex items-center justify-center p-2'
          )}
        />
      </div>
    </div>
  )
}

export default EnrolNowBtn
