'use client'

import { useState } from 'react'
import { CheckCircle, Lock, Award } from 'lucide-react'
import Image from 'next/image'

type Badge = {
  id: string
  title: string
  description: string
  image: string
  completed: boolean
}

const mockBadges: Badge[] = [
  {
    id: 'badge1',
    title: 'Getting Started',
    description: 'Introductory concepts and orientation',
    image: '/badges/badge1.png',
    completed: true,
  },
  {
    id: 'badge2',
    title: 'Core Knowledge',
    description: 'Learn the fundamental skills',
    image: '/badges/badge2.png',
    completed: true,
  },
  {
    id: 'badge3',
    title: 'Assessment Badge',
    description: 'Complete the quiz to earn this badge',
    image: '/badges/badge3.png',
    completed: false,
  },
]

export default function CertificationProgress() {
  const [badges] = useState(mockBadges)

  const allBadgesCompleted = badges.every((b) => b.completed)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <h4 className="text-3xl font-bold text-center">🎓 Certification Progress</h4>
      <p className="text-center text-gray-600">
        Earn all the badges to unlock your certificate of completion.
      </p>

      {/* Badge Progress Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {badges.map((badge, index) => {
          const isUnlocked = index === 0 || badges[index - 1].completed
          return (
            <div
              key={badge.id}
              className={`border rounded-2xl p-4 shadow transition bg-white relative ${
                badge.completed ? 'border-green-500' : isUnlocked ? 'border-yellow-500' : 'border-gray-300 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={badge.image}
                    alt={badge.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{badge.title}</h3>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {badge.completed ? (
                  <CheckCircle className="text-green-500" />
                ) : isUnlocked ? (
                  <span className="text-yellow-500 font-medium text-sm">In Progress</span>
                ) : (
                  <Lock className="text-gray-400" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Certificate Section */}
      <div className="mt-10 p-6 border rounded-2xl bg-white shadow-md text-center space-y-4">
        <div className="w-28 h-20 mx-auto relative">
          <Image
            src="/certificate-placeholder.png"
            alt="Certificate"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold">🏅 Course Certificate</h2>
        {allBadgesCompleted ? (
          <>
            <p className="text-green-600 font-semibold">
              Congratulations! You've unlocked your certificate.
            </p>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              Download Certificate
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              Complete all badges to unlock your certificate.
            </p>
            <div className="flex justify-center">
              <Lock className="text-gray-400" size={28} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
