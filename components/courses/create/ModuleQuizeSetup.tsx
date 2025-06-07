import { useCreateCourse } from '@/context/CreateCourseContext'
import React from 'react'
import QuizeSetupWrapper from './QuizeSetupWrapper'
import { Section } from '@/types'

const ModuleQuizeSetup = ({section}:{section:Section}) => {
        const {
          currentStepIndex,
          setCurrentStepIndex,
          chapter,
          course,
          setSections
        } = useCreateCourse()
  
  return (
    <section className='space-y-6'>
      <div className="">
        <p className="text-gray-700  ">
          Optionally, you can add a quiz to this module or section. Learners will need to pass the quiz before earning the module’s badge.  
          To enable this, first set up the badge that will be awarded upon successful completion of the module quiz.
        </p>
      </div>
{/* TODO: Add section quize list */}
      <QuizeSetupWrapper relationship={{section:section.alias}} quizeList={[]} />
      
    </section>
  )
}

export default ModuleQuizeSetup