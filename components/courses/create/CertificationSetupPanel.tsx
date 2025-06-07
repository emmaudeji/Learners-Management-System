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
import { useState } from 'react'
import { cn } from '@/lib/utils'
 
import ModuleQuizeBadgesSetup from './ModuleQuizeBadgesSetup'
import CourseFinalStepSetup from './CourseExamProjectSetup'
import CertificateSetupForm from './certificateSetup/CertificateSetupForm'

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

  const [activeStep, setActiveStep] = useState('moduleBadge')
  const handleStepChange = (step: string) => {
    setActiveStep(step)
  }
  const isModuleBadgeStep = activeStep === 'moduleBadge'
  const isCertificateStep = activeStep === 'certificate'
  const isFinalExamStep = activeStep === 'finalExam'
  // const isAllStepsCompleted = isModuleBadgeStep && isCertificateStep && isFinalExamStep

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y- ">
      
      <div className="space-y-4 pb-10">
        <h4 className="text-3xl font-bold text-center">🎓 Certification Setup</h4>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Set up quizzes, badges, and the final exam to certify your learners. Every module must have assessments for its chapters before badges can be created. This is optional. You can skip this step and set it up later.
        </p>
      </div>

      <section className="border-y border-gray-300 grid sm:grid-cols-3 sm:divide-x max-sm:divide-y divide-gray-300">
        <button className={cn("h-12 w-full hover:bg-muted flex justify-center items-center", { "bg-primary/20 text-primary": isModuleBadgeStep })} onClick={() => handleStepChange('moduleBadge')}>Create Module Badge</button>
        <button className={cn("h-12 w-full hover:bg-muted flex justify-center items-center", { "bg-primary/20 text-primary": isFinalExamStep })} onClick={() => handleStepChange('finalExam')}>Create Final Exam</button>
        <button className={cn("h-12 w-full hover:bg-muted flex justify-center items-center", { "bg-primary/20 text-primary": isCertificateStep })} onClick={() => handleStepChange('certificate')}>Create Certificate</button>
      </section>
      {
        isModuleBadgeStep && (
          <ModuleQuizeBadgesSetup />
        )
      }

      {
        isFinalExamStep && (
          < CourseFinalStepSetup />
        )
      }

      {
        isCertificateStep && (
          <CertificateSetupForm />
        )
      }
       
    </div>
  )
}
