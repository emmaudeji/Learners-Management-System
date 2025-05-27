'use client'


export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correctAnswer: string | string[] // single or multiple answers
  explanation?: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  difficulty?: string
}


import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function QuizQuestionCard({ question, onAnswer }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [shortAnswer, setShortAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const correctAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer]

  const correctAnswersLower = correctAnswers.map((ans) => ans.toLowerCase())

  const handleSelect = (option: string) => {
    if (submitted) return
    setSelectedAnswer((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleSubmit = () => {
    if (submitted) return

    const userAnswer =
      question.type === 'short-answer'
        ? [shortAnswer.trim().toLowerCase()]
        : selectedAnswer.map((s) => s.toLowerCase())

    const isCorrectAnswer =
      question.type === 'short-answer'
        ? correctAnswersLower.includes(userAnswer[0])
        : arraysEqualIgnoreOrder(userAnswer, correctAnswersLower)

    setIsCorrect(isCorrectAnswer)
    setSubmitted(true)
    onAnswer(isCorrectAnswer)
  }

  const isOptionSelected = (option: string) => selectedAnswer.includes(option)

  return (
    <div className=" space-y-4   pb-6">
      <div className="  ">
        <p className="text-lg font-semibold">{question.question}</p>
        <small className="text-xs text-muted-foreground capitalize">
          {question.difficulty ?? 'Easy'} • {question.type.replace('-', ' ')}
        </small>
      </div>

      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          {question.options.map((option) => {
            const isSelected = isOptionSelected(option)
            const isCorrectOption = correctAnswersLower.includes(option.toLowerCase())
            const showCorrect = submitted && isCorrectOption
            const showIncorrect = submitted && isSelected && !isCorrectOption

            return (
              <label
                key={option}
                className={cn(
                  'flex items-center gap-3 p-2 border rounded-md cursor-pointer',
                  isSelected && 'bg-muted',
                  showCorrect && 'border-green-600 bg-green-50',
                  showIncorrect && 'border-red-600 bg-red-50'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleSelect(option)}
                  disabled={submitted}
                />
                {option}
              </label>
            )
          })}
        </div>
      )}

      {question.type === 'true-false' && (
        <div className="flex gap-4">
          {['True', 'False'].map((opt) => {
            const isSelected = selectedAnswer.includes(opt)
            const isCorrectOption = correctAnswersLower.includes(opt.toLowerCase())
            const showCorrect = submitted && isCorrectOption
            const showIncorrect = submitted && isSelected && !isCorrectOption

            return (
              <label
                key={opt}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer',
                  isSelected && 'bg-muted',
                  showCorrect && 'border-green-600 bg-green-50',
                  showIncorrect && 'border-red-600 bg-red-50'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => setSelectedAnswer([opt])}
                  disabled={submitted}
                />
                {opt}
              </label>
            )
          })}
        </div>
      )}

      {question.type === 'short-answer' && (
        <Input
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          placeholder="Type your answer..."
          disabled={submitted}
        />
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={
            (question.type === 'short-answer' && shortAnswer.trim() === '') ||
            (question.type !== 'short-answer' && selectedAnswer.length === 0)
          }
        >
          Submit Answer
        </Button>
      )}

      {submitted && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            {isCorrect ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Correct</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-red-700">Incorrect</span>
              </>
            )}
          </div>
          {question.explanation && (
            <p className="text-sm text-muted-foreground italic">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  )
}

function arraysEqualIgnoreOrder(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  const normalize = (arr: string[]) => arr.map((s) => s.trim().toLowerCase()).sort()
  return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b))
}





import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Propss = {
  open: boolean
  onClose: () => void
  score: number
  total: number
}

export function QuizSummaryDialog({ open, onClose, score, total }: Propss) {
  const passed = score >= total * 0.6

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz Completed</DialogTitle>
        </DialogHeader>

        <p className="text-sm mt-2">
          You scored {score} out of {total}. {passed ? '🎉 Great job!' : 'Try again to pass.'}
        </p>

        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


import { Card } from '@/components/ui/card'
import { Lock } from 'lucide-react'

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary purpose of a greenhouse?',
    options: ['Storage', 'Climate control for plants', 'Drying produce', 'Animal shelter'],
    correctAnswer: 'Climate control for plants',
    type: 'multiple-choice'
  },
  {
    id: 'q2',
    question: 'Which soil type is best for drainage?',
    options: ['Clay', 'Silt', 'Loam', 'Sand'],
    correctAnswer: 'Sand',
    type: 'multiple-choice'
  }
]

const totalChapters = 3
const completedChapters = 2

export default function ChapterQuizPage() {
  const [score, setScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [chapterCompleted, setChapterCompleted] = useState(false)

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1)
    setAnsweredCount((c) => c + 1)

    if (answeredCount + 1 === sampleQuestions.length) {
      setTimeout(() => {
        setShowSummary(true)
        setChapterCompleted(true)
      }, 500)
    }
  }

  const allChaptersCompleted = completedChapters + (chapterCompleted ? 1 : 0) >= totalChapters

  return (
    <div className="max-w-3xl mx-auto p-6">
        
        <div className="mx-auto max-w-xl text-center">
            <h4 className="text-2xl font-bold mb-1">Chapter Quiz</h4>
            <p className="text-muted-foreground mb-6">
               Test your knowledge level
            </p>
        </div>

        <section className="space-y-8 divide-">
            {sampleQuestions.map((q) => (
                <QuizQuestionCard key={q.id} question={q} onAnswer={handleAnswer} />
                ))}
        </section>

      <QuizSummaryDialog
        open={showSummary}
        onClose={() => setShowSummary(false)}
        score={score}
        total={sampleQuestions.length}
      />

      <div className="border-t mt-10 pt-6">
        <h2 className="text-xl font-semibold mb-2">📘 Module Quiz</h2>
        <p className="text-muted-foreground mb-4">
          Complete all chapters in this module to unlock the module quiz and earn a badge.
        </p>

        <Card
          className={cn(
            'p-6 border-dashed',
            !allChaptersCompleted && 'opacity-60 cursor-not-allowed'
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Module Quiz</h3>
              <p className="text-sm text-muted-foreground">
                Test your knowledge across all chapters to earn a badge.
              </p>
            </div>

            {allChaptersCompleted ? (
              <Button>Start Quiz</Button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-5 h-5" />
                <span>
                  {completedChapters + (chapterCompleted ? 1 : 0)} / {totalChapters} chapters
                  completed
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
