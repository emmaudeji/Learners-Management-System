'use client'

import {
  CheckCircle,
  FileCheck,
  FileQuestion,
  PlusCircle,
  Lock,
  Award,
  ScrollText,
  CircleHelp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type Chapter = {
  id: string
  title: string
  quizCreated: boolean
}

type Module = {
  id: string
  title: string
  chapters: Chapter[]
  badgeCreated: boolean
}

type CourseSetup = {
  modules: Module[]
  finalExamCreated: boolean
  certificateCreated: boolean
}

const mockData: CourseSetup = {
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Wine',
      badgeCreated: false,
      chapters: [
        { id: 'chap1', title: 'What is Wine?', quizCreated: true },
        { id: 'chap2', title: 'History of Wine', quizCreated: false },
      ],
    },
    {
      id: 'mod2',
      title: 'Modern Wine Making',
      badgeCreated: true,
      chapters: [
        { id: 'chap3', title: 'Fermentation Process', quizCreated: true },
        { id: 'chap4', title: 'Aging and Bottling', quizCreated: true },
      ],
    },
  ],
  finalExamCreated: false,
  certificateCreated: false,
}

export default function CertificationSetupPanel() {
  const { modules, finalExamCreated, certificateCreated } = mockData

  const isAllModulesCompleted = modules.every(
    (mod) =>
      mod.badgeCreated &&
      mod.chapters.every((chap) => chap.quizCreated)
  )

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center">🎓 Certification Setup</h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Set up quizzes, badges, and the final exam to certify your learners. Every module must have assessments for its chapters before badges can be created.
      </p>

      {/* Modules Section */}
      <div className="space-y-6">
        {modules.map((mod) => {
          const allQuizzesDone = mod.chapters.every((c) => c.quizCreated)

          return (
            <Card key={mod.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    📘 {mod.title}
                    {mod.badgeCreated ? (
                      <Badge className="bg-green-500">Badge Ready</Badge>
                    ) : (
                      <Badge variant="outline">No Badge Yet</Badge>
                    )}
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Edit Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mod.chapters.map((chap) => (
                  <div key={chap.id} className="flex items-center justify-between border p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileQuestion className="text-blue-500" size={20} />
                      <span>{chap.title}</span>
                    </div>
                    {chap.quizCreated ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={18} />
                        <span>Quiz Created</span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Create Quiz
                      </Button>
                    )}
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="text-yellow-500" />
                    <span className="font-medium">Module Badge</span>
                  </div>
                  {mod.badgeCreated ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={18} />
                      <span>Badge Created</span>
                    </div>
                  ) : allQuizzesDone ? (
                    <Button>
                      <PlusCircle className="mr-2" size={16} />
                      Create Badge
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock size={18} />
                      <span>Complete quizzes first</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Final Exam Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            📝 Final Exam Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Create a final assessment learners must pass to earn the certificate.
          </p>
          {finalExamCreated ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              <span>Created</span>
            </div>
          ) : isAllModulesCompleted ? (
            <Button>
              <PlusCircle className="mr-2" size={16} />
              Create Final Exam
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock size={18} />
              <span>Complete modules first</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certificate Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            📜 Course Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Design and activate a certificate learners will earn after passing the final exam.
          </p>
          {certificateCreated ? (
            <div className="flex items-center gap-2 text-green-600">
              <FileCheck size={18} />
              <span>Certificate Created</span>
            </div>
          ) : finalExamCreated ? (
            <Button>
              <PlusCircle className="mr-2" size={16} />
              Create Certificate
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock size={18} />
              <span>Final exam required</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
