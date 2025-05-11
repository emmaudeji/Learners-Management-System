'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const dummyCourse = {
  title: 'Mastering React & TypeScript',
  instructor: 'Jane Doe',
  sections: [
    {
      title: 'Introduction',
      lessons: [
        { id: 1, title: 'Welcome to the Course', duration: '4:12' },
        { id: 2, title: 'Course Structure & Goals', duration: '5:30' },
      ],
    },
    {
      title: 'React Basics',
      lessons: [
        { id: 3, title: 'JSX & Components', duration: '10:45' },
        { id: 4, title: 'Props & State', duration: '8:20' },
      ],
    },
  ],
  reviews: [
    { user: 'Sam', comment: 'Great course!', rating: 5 },
    { user: 'Lee', comment: 'Very detailed and helpful.', rating: 4 },
  ],
}

export default function CourseLearningPage() {
  const [selectedLesson, setSelectedLesson] = useState(dummyCourse.sections[0].lessons[0])
  const [tab, setTab] = useState('lesson')

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-8">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <ScrollArea className="h-[80vh] rounded-md border">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Course Content</h2>
            {dummyCourse.sections.map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-sm text-muted-foreground">{section.title}</h4>
                <ul className="space-y-2 pl-2 mt-2">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        className={`text-left w-full text-sm ${
                          selectedLesson.id === lesson.id ? 'font-bold' : ''
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        {lesson.title} <span className="text-muted-foreground">({lesson.duration})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="md:col-span-3 space-y-4">
        {/* Video & Tabs */}
        <div className="aspect-video bg-black rounded-md shadow-md">{/* Video player goes here */}</div>

        {/* Navigation Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card><CardContent className="p-4">This course teaches you React and TypeScript from scratch with hands-on examples. Perfect for beginners and intermediates.</CardContent></Card>
          </TabsContent>

          <TabsContent value="lesson">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{selectedLesson.title}</h3>
                <p>This is where the lesson script or summary would go. Explain concepts, add examples, and include relevant diagrams or code snippets.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card><CardContent className="p-4">Q&A functionality will go here. Users can ask and answer questions about the course.</CardContent></Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card><CardContent className="p-4">Comments thread will go here. Let learners discuss this lesson or course topics.</CardContent></Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-4 space-y-2">
                {dummyCourse.reviews.map((review, i) => (
                  <div key={i} className="border-b pb-2">
                    <strong>{review.user}</strong> - ⭐ {review.rating}<br />
                    <span>{review.comment}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor">
            <Card><CardContent className="p-4">Instructor: <strong>{dummyCourse.instructor}</strong><br />
              Jane is a senior frontend engineer with 10+ years building React apps and teaching developers.
            </CardContent></Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" disabled>Previous</Button>
          <Button>Mark Complete & Next Lesson</Button>
        </div>
      </main>
    </div>
  )
}
