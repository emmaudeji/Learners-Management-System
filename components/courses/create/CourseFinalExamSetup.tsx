'use client'

import React, { useState } from 'react'
import QuizeSetupWrapper from './QuizeSetupWrapper'
import { CustomInput } from '@/components/shared/CustomInput'

type FinalExamFormData = {
  examTitle: string
  examDescription: string
  passingScore: string // keep as string for easy input handling
  timeLimitMinutes: string
}

type Props = {
//   onSubmit: (data: Omit<FinalExamFormData, 'timeLimitMinutes'> & { timeLimitMinutes?: number }) => Promise<void> | void
  defaultValues?: Partial<FinalExamFormData>
}

const CourseFinalExamSetup: React.FC<Props> = ({  defaultValues }) => {
  const [formData, setFormData] = useState<FinalExamFormData>({
    examTitle: defaultValues?.examTitle || '',
    examDescription: defaultValues?.examDescription || '',
    passingScore: defaultValues?.passingScore?.toString() || '',
    timeLimitMinutes: defaultValues?.timeLimitMinutes?.toString() || '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FinalExamFormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  function validate() {
    const newErrors: Partial<Record<keyof FinalExamFormData, string>> = {}

    if (!formData.examTitle.trim()) {
      newErrors.examTitle = 'Exam title is required'
    }

    const passing = Number(formData.passingScore)
    if (formData.passingScore.trim() === '') {
      newErrors.passingScore = 'Passing score is required'
    } else if (isNaN(passing) || passing < 0 || passing > 100) {
      newErrors.passingScore = 'Passing score must be a number between 0 and 100'
    }

    if (formData.timeLimitMinutes.trim() !== '') {
      const time = Number(formData.timeLimitMinutes)
      if (isNaN(time) || time < 1) {
        newErrors.timeLimitMinutes = 'Time limit must be a number greater than 0 or left empty'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitSuccess(false)

    if (!validate()) return

    setLoading(true)
    try {
    //   await onSubmit({
    //     examTitle: formData.examTitle.trim(),
    //     examDescription: formData.examDescription.trim(),
    //     passingScore: Number(formData.passingScore),
    //     timeLimitMinutes: formData.timeLimitMinutes.trim() ? Number(formData.timeLimitMinutes) : undefined,
    //   })
      setSubmitSuccess(true)
    } catch (err) {
      setErrors({ examTitle: 'Failed to save. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [step, setStep] = useState('intro') // intro | quize

  return (
    <section className=" space-y-6">

      <div className="">
        <h6 className="text-2xl font-semibold mb-2">Set Up Final Exam</h6>
        <p className="mb-6 text-gray-700">
          Create the final exam quiz for this course. Learners must pass this exam to complete the course and earn the badge.
        </p>

        <div className="flex justify-  gap-4">
            {
              [ { key: 'intro', label: 'Initial setup',},
                { key: 'quize', label: 'Exam quize',  },
              ].map(({ key, label, }) => (
              <button
                key={key}
                onClick={() => setStep(key)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  step === key ? 'border border-primary text-primary shadow-md hover:bg-green-50' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                type="button"
                aria-pressed={step === key}
              >
                {label}
              </button>
            ))}
          </div>
      </div>

      {step === 'intro' && (
        <form onSubmit={handleSubmit} noValidate>
          <CustomInput
            label="Exam Title"
            name="examTitle"
            value={formData.examTitle}
            onChange={handleChange}
            error={errors.examTitle}
            disabled={loading}
          />

          <CustomInput
            label="Exam Description"
            name="examDescription"
            type="textarea"
            value={formData.examDescription}
            onChange={handleChange}
            error={errors.examDescription}
            disabled={loading}
            placeholder="Briefly describe the exam content or instructions"
          />

          <CustomInput
            label="Passing Score (%)"
            name="passingScore"
            type="number"
            value={formData.passingScore}
            onChange={handleChange}
            error={errors.passingScore}
            disabled={loading}
          />

          <CustomInput
            label="Time Limit (minutes)"
            name="timeLimitMinutes"
            type="number"
            value={formData.timeLimitMinutes}
            onChange={handleChange}
            error={errors.timeLimitMinutes}
            disabled={loading}
            placeholder="Optional — leave blank for no time limit"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Saving...' : 'Save Final Exam'}
          </button>
        </form>
      )}


      {
        step === 'quize' && <QuizeSetupWrapper relationship={{course:''}} quizeList={[]} />
      }

    </section>
  )
}

export default CourseFinalExamSetup
