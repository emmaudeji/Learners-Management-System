'use client'

import React, { useState } from 'react'
import CourseFinalProjectSetup from './CourseFinalProject'
import CourseFinalExamSetup from './CourseFinalExamSetup'

const CourseFinalStepSetup: React.FC = () => { 
  const [step, setStep] = useState<string>('finalExam') //'finalExam' | 'project'

  // You can replace these with your actual save logic
  async function handleFinalExamSubmit(data: any) {
    // Simulate async save
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('Final Exam saved: ' + JSON.stringify(data, null, 2))
        resolve()
      }, 1000)
    })
  }

  async function handleProjectSubmit(data: any) {
    // Simulate async save
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('Project saved: ' + JSON.stringify(data, null, 2))
        resolve()
      }, 1000)
    })
  }

  return (
    <section className="py-12 space-y-8 divide-y divide-gray-300">

      <div className="  pb-6  ">
          <h4 className="text-3xl font-bold pb-2">Final Step: Project or Final Exam Setup (Optional)</h4>

          <p className="mb-6 text-gray-700">
            You may optionally set up a Final Exam or a Project for this course. Learners will need to successfully complete the chosen option to earn their course certificate.
             
            If you choose not to set either up, learners can complete the course without these assessments.
          </p>

          <div className="flex justify-  gap-4">
            {
              [ { key: 'finalExam', label: 'Final Exam Setup',},
                { key: 'project', label: 'Project Setup',  },
              ].map(({ key, label, }) => (
              <button
                key={key}
                onClick={() => setStep(key)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  step === key ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                type="button"
                aria-pressed={step === key}
              >
                {label}
              </button>
            ))}
          </div>

      </div>

      {step === 'finalExam' ? (
        <CourseFinalExamSetup  />
      ) : (
        <CourseFinalProjectSetup onSubmit={handleProjectSubmit} />
      )}
    </section>
  )
}

export default CourseFinalStepSetup
