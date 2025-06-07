'use client'

import DeleteCard from '@/components/common/DeleteCard'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
 
import SlideWrapper from '@/components/shared/SlideWrapper'
import CreateCourseStep1 from './CreateCourseStep1'
import { ChapterWrapper } from './ChapterWrapper'
import PriceForm from './PriceForm'
import { CourseSections } from './CourseSections'
import { useRouter } from 'next/navigation'
import CourseSetting from './CourseSetting'
import StatusSelect from './StatusSelect'
import { appwriteConfig } from '@/lib/actions/config'
import { deleteRequest } from '@/utils/api'
import { toast } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
 import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 
import { useCreateCourse } from '@/context/CreateCourseContext'
import CertificationSetupPanel from './CertificationSetupPanel'
import CourseAnnouncement from './CourseAnnouncement'

const stepTips = {
  1: "Provide basic course information like title, description, and category.",
  2: "Create and manage course modules or sections.",
  3: "Add chapters to your modules; organize content by chapters.",
  4: "Create certifications and badges for this course.",
  5: "Set pricing details for your course or chapter.",
  6: "Setup and send annuncements to learners.",
  7: "Configure publishing options like visibility and access.",
  8: "Review your course and launch it when ready.",
};

const CreateCourseWrapper = () => {
  const {
    currentStepIndex,
    setCurrentStepIndex,
    chapter,
    course,
  } = useCreateCourse()
  
  const hasChapter = !!chapter; // this means chapter exist and is true, we only disable if chapter does not exist, hence !hasChapter |  steps 3 to 6 will only be enabled after a chapter exists.

  const steps = [
    { step: 1, label: 'Basic Info', component: <CreateCourseStep1 />, disabled: false },
    { step: 2, label: 'Modules', component: <CourseSections/>, disabled: false },
    { step: 3, label: 'Chapters', component: <ChapterWrapper/>, disabled: !hasChapter },
    { step: 4, label: 'Certifications', component: <CertificationSetupPanel  />, disabled: !hasChapter },
    { step: 5, label: 'Pricing', component: <PriceForm />, disabled:  !hasChapter},  
    { step: 6, label: 'Announcement', component: <CourseAnnouncement />, disabled:  !hasChapter},  
    { step: 7, label: 'Publish Settings', component: <CourseSetting  />, disabled:  !hasChapter},
    { step: 8, label: 'Review & Launch', component: <div className='py-20 text-center w-full text-4xl'>Coming soon</div>, disabled:  !hasChapter, link:`/learning/${course.alias}?t=tutor` },
  ];

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
  const {replace, push} = useRouter()
  const {user} = useUserStore()
 
  const deleteCourse = async () => {
    const body = {
          documentId:course.id,
          collectionId: appwriteConfig.coursesCollectionId,
        }
    try {
      const { success } = await deleteRequest({
        body 
      });

      if (success) {
        toast.success('Course deleted successfully');
        push(`/t/${user?.id}/my-courses`)
      } else {
        toast.error('Course could not be deleted. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Unhandled error. Check your network and try again.');
    }
  };

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
                    <StatusSelect collectionId={appwriteConfig.coursesCollectionId} documentId={course.id} currentStatus={course.status} />
                    <DeleteCard
                    onDelete={deleteCourse}
                    trigger={
                        <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700 transition">
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    }
                    />
                </div>
                </div>
            </div>

            <div className="flex items-center justify-center sm:gap-4 mx-auto max-w-4x overflow-x-auto">
              <TooltipProvider>
                {steps.map(({ step, label, disabled, link }, index) => {
                  const isActive = step === steps[currentStepIndex]?.step
                  const isCompleted = step < steps[currentStepIndex]?.step

                  return (
                    <Tooltip key={step} >
                      <TooltipTrigger asChild>
                        <div
                          aria-disabled={disabled}
                          tabIndex={disabled ? -1 : 0}
                          onClick={() => {
                            if (disabled) return
                            // TODO: later add more conditions like course.cover image is required
                            if (link){ 
                              push(link) 
                              return
                            }
                            const i = steps.findIndex(s => s.step === step)
                            if (i !== -1) {
                              setCurrentStepIndex(i)
                              replace(`?step=${i}`)
                            }
                          }}
                          className={`flex items-center sm:gap-2 ${
                            disabled
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer " +
                                (isCompleted || isActive
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground")
                          }`}
                        >
                          <div
                            className={`w-5 h-5 shrink-0 rounded-full text-xs flex items-center justify-center border transition
                              ${
                                disabled
                                  ? "bg-gray-200 text-gray-400 border-gray-200"
                                  : isCompleted || isActive
                                  ? "bg-primary text-white border-primary"
                                  : "bg-gray-100 text-gray-500 border-gray-300"
                              }`}
                          >
                            {step}
                          </div>
                          <span className="text-[8px] lg:text-xs 2xl:text-sm hidden sm:inline">{label}</span>
                          {step < steps.length && <span className={` w-4 md:w-6 h-0.5 ${isCompleted || isActive
                                  ? "bg-primary text-white border-primary":'bg-gray-300'} `} />}
                        </div>
                      </TooltipTrigger>


                      <TooltipContent side="top" align="center" className="max-w-60  text-center ">
                        <p>{stepTips[step as keyof typeof stepTips]}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </TooltipProvider>
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
