'use client'

import { useState } from 'react'
import DeleteCard from '@/components/common/DeleteCard'
import { Button } from '@/components/ui/button'
import { Course } from '@/types'
import { Trash2 } from 'lucide-react'
 
import SlideWrapper from '@/components/shared/SlideWrapper'
import CreateCourseStep1 from './CreateCourseStep1'
import { ChapterWrapper } from './ChapterWrapper'
import PriceForm from './PriceForm'
import { CourseSections } from './CourseSections'
import { useRouter } from 'next/navigation'
 

const CreateCourseWrapper = ({ course, step }: { course: Course, step:number }) => {
    const [chapter, setChapter] = useState(course.sections?.[0].chapters?.[0])
  const [currentStepIndex, setCurrentStepIndex] = useState(step||0)

 const steps = [
    { step: 1, label: 'Basic Info', component: <CreateCourseStep1 course={course}/> },
    { step: 2, label: 'Modules', component:  <CourseSections course={course} setChapter={setChapter} setCurrentStepIndex={setCurrentStepIndex} /> },
            
    { step: 3, label: 'Chapters', component: <ChapterWrapper chapter={chapter} /> },
    { step: 4, label: 'Pricing', component:<PriceForm course={course}/> },
    // { step: 4, label: 'Pricing', component: CreateCourseStep4 },
 ]

  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }


  const { label, component } = steps[currentStepIndex]
const {replace} = useRouter()
  return (
    <section className="w-full pt-12 ">


    <header className="px-4  border-b w-full pb-10">
        <section className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Setup your course</h2>
                <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Progress: <span className="font-medium">Step {steps[currentStepIndex].step} of 6</span>
                </p>

                <div className="flex items-center gap-2">
                    <Button className="bg-primary text-white hover:bg-primary/90 transition">Publish</Button>
                    <DeleteCard
                    onDelete={async () => {}}
                    trigger={
                        <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700 transition">
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    }
                    />
                </div>
                </div>
            </div>

            {/* Stepper UI */}
            <div className="flex items-center gap-4 mx-auto max-w-4xl overflow-x-auto">
                {[
                ...steps,
                // { step: 4, label: 'Pricing' },
                { step: 5, label: 'Publish Settings' },
                { step: 6, label: 'Review & Launch' }
                ].map(({ step, label }, index) => {
                const isActive = step === steps[currentStepIndex]?.step
                const isCompleted = step < steps[currentStepIndex]?.step

                return (
                    <div
                    key={step}
                    onClick={() => {
                        const i = steps.findIndex(s => s.step === step)
                        if (i !== -1) {
                            setCurrentStepIndex(i)
                            replace(`?step=${i}`)
                        }
                    }}
                    className={`flex items-center gap-2 cursor-pointer ${isCompleted || isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                    >
                    <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center border transition
                        ${isCompleted || isActive ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>
                        {step}
                    </div>
                    <span className="text-sm hidden sm:inline">{label}</span>
                    {step < 6 && <span className="w-6 h-0.5 bg-gray-300" />}
                    </div>
                )
                })}
            </div>
        </section>
    </header>

      {/* Step Content */}
    <SlideWrapper key={currentStepIndex}>
        {component}
    </SlideWrapper>

      {/* <footer className="flex max-w-6xl mx-auto justify-center pt-8 gap-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStepIndex === 0}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={currentStepIndex === totalSteps - 1}>
            Next
          </Button>
        </footer> */}
    </section>
  )
}

export default CreateCourseWrapper
