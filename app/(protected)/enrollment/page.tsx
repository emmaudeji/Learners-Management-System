'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

// Fake data for now
const dummyCourse = {
  id: 'course_abc123',
  title: 'Mastering TypeScript',
  isPaid: true,
  price: 199,
}

const dummyUser = {
  id: 'user_123',
  isLoggedIn: true,
}

export default function CourseEnrollment() {
  const router = useRouter()

  const [stage, setStage] = useState(0) // 0 = checkout, 1 = intent, 2 = success
  const [isLoading, setIsLoading] = useState(false)
  const [userIntent, setUserIntent] = useState('')

  useEffect(() => {
    // 💡 Redirect to login if user is not logged in
    if (!dummyUser.isLoggedIn) {
      router.push('/login')
    }
  }, [])

  const handleCheckout = async () => {
    setIsLoading(true)

    // 🧾 Simulate checkout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // ✅ After successful checkout (real logic with Stripe, Paddle, etc.)
    setIsLoading(false)
    setStage(1)
  }

  const handleSaveIntent = async () => {
    setIsLoading(true)

    // 💾 Save intent to backend (e.g., Supabase, Firestore, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setStage(2)
  }

  const handleSkipIntent = () => {
    setStage(2)
  }

  const handleStartLearning = () => {
    router.push(`/courses/${dummyCourse.id}`)
  }

  const handleGoToMyLearning = () => {
    router.push('/my-learning')
  }

  const handleExploreMore = () => {
    router.push('/courses?relatedTo=' + dummyCourse.id)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Enroll in: {dummyCourse.title}</h2>

      {stage === 0 && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="text-sm">
              {dummyCourse.isPaid
                ? `This course costs $${dummyCourse.price}. Proceed to checkout to start learning.`
                : 'This course is free. Click to enroll now.'}
            </p>
            <Button onClick={handleCheckout} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {dummyCourse.isPaid ? 'Checkout' : 'Enroll Now'}
            </Button>
          </CardContent>
        </Card>
      )}

      {stage === 1 && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Optional: What’s your main goal for taking this course?
            </p>
            <Textarea
              placeholder="e.g. I want to become a full-stack dev using TypeScript"
              value={userIntent}
              onChange={(e) => setUserIntent(e.target.value)}
            />
            <div className="flex justify-between gap-2">
               
              <Button onClick={handleSkipIntent} variant="outline">
                Skip
              </Button>
              <Button onClick={handleSaveIntent} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                Save & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === 2 && (
        <>
        
        <Card>
          <CardContent className="p-4 space-y-4 text-center">
            <h3 className="text-lg font-semibold">🎉 Congratulations!</h3>
            <p>You’re now enrolled in <strong>{dummyCourse.title}</strong>.</p>
            <div className="flex flex-col md:flex-row gap-2 justify-center mt-4">
            <Link href={`/s/my-learning/${dummyCourse.title}`}>
              <Button onClick={handleStartLearning}>Start Learning</Button></Link>
              <Link href={`/s/my-learning`}><Button variant="outline" onClick={handleGoToMyLearning}>
                Go to My Learning
              </Button></Link>
              <Button
                variant="ghost"
                onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('related-courses')
                    if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                }}
                >
                Explore Related Courses
             </Button>

            </div>
          </CardContent>
        </Card>

        <section className="padding pt-24">
            <h2 id='related-courses' className="pb-40  font-bold">Similar courses</h2>
            <h2 className="pb-40  font-bold">Recommended courses</h2>
        </section>
        </>
      )}
    </div>
  )
}
