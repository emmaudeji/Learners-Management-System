'use client'

import { useUserStore } from '@/store/useUserStore'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { StudentOnboardingModal } from './StudentOnboarding'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { useGlobal } from '@/context/RootContext'
import Image from 'next/image'

const LandingPageHeader = () => {
  const { user,   } = useUserStore()
  const {isNewUser} = useGlobal()
  
// console.log({user})
  if(!user) return null

  const fullName = user?.fullName || 'User'
  const firstName = fullName.split(' ')[0]
  const avatarText = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()


  return (
    <section className="py-10  padding flex gap-6 items-center">
      <div className="bg-primary text-white h-20 w-20 uppercase text-xl font-bold rounded-full flex items-center justify-center overflow-clip">
        {
          !user.avatar ? avatarText :
          <Image src={user.avatar} alt='user image' width={100} height={100} className='size-full object-cover' />
        }
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">
          {isNewUser ? `Welcome, ${firstName}` : `Welcome back, ${firstName}`}
        </h2>

        <div className="mt-1">
          <p className="text-sm md:text-base text-gray-700">
            {isNewUser
              ? 'Get started with courses curated just for you.'
              : 'Continue your learning journey tailored to you.'}
          </p>
           <StudentOnboardingModal />
        </div>
      </div>
    </section>
  )
}

export default LandingPageHeader
