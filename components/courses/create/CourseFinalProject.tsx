'use client'

import { CustomInput } from '@/components/shared/CustomInput'
import React, { useState } from 'react'

type ProjectFormData = {
  projectTitle: string
  projectDescription: string
  submissionDeadline: string
  maxScore: string
}

type Props = {
  onSubmit: (
    data: Omit<ProjectFormData, 'submissionDeadline' | 'maxScore'> & {
      submissionDeadline?: string
      maxScore?: number
    }
  ) => Promise<void> | void
  defaultValues?: Partial<ProjectFormData>
}

const CourseFinalProjectSetup: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectTitle: defaultValues?.projectTitle || '',
    projectDescription: defaultValues?.projectDescription || '',
    submissionDeadline: defaultValues?.submissionDeadline || '',
    maxScore: defaultValues?.maxScore?.toString() || '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  function validate() {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {}

    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = 'Project title is required'
    }

    if (formData.submissionDeadline.trim()) {
      const deadlineDate = new Date(formData.submissionDeadline)
      if (isNaN(deadlineDate.getTime())) {
        newErrors.submissionDeadline = 'Invalid submission deadline date'
      }
    }

    if (formData.maxScore.trim()) {
      const max = Number(formData.maxScore)
      if (isNaN(max) || max < 1) {
        newErrors.maxScore = 'Maximum score must be a number greater than 0'
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
      await onSubmit({
        projectTitle: formData.projectTitle.trim(),
        projectDescription: formData.projectDescription.trim(),
        submissionDeadline: formData.submissionDeadline.trim() || undefined,
        maxScore: formData.maxScore.trim() ? Number(formData.maxScore) : undefined,
      })
      setSubmitSuccess(true)
    } catch (error) {
      alert('Failed to save project setup. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h6 className="pb-3">Project setup (optional)</h6>
        <p className="text-gray-700 mb-4">
          Set up a project for your course. Learners will need to complete and pass this project to earn their certificate.
          <br />
          This is optional but highly recommended to enhance learner engagement.
        </p>
      </div>

      <CustomInput
        label="Project Title"
        name="projectTitle"
        value={formData.projectTitle}
        onChange={handleChange}
        required
        placeholder="E.g., Build a React Portfolio Website"
        error={errors.projectTitle}
        disabled={loading}
      />

      <CustomInput
        label="Project Description"
        name="projectDescription"
        isTextArea
        value={formData.projectDescription}
        onChange={handleChange}
        placeholder="Describe what the project should entail"
        disabled={loading}
      />

      <CustomInput
        label="Submission Deadline (optional)"
        name="submissionDeadline"
        type="date"
        value={formData.submissionDeadline}
        onChange={handleChange}
        min={new Date().toISOString().split('T')[0]}
        error={errors.submissionDeadline}
        disabled={loading}
      />

      <CustomInput
        label="Maximum Score (optional)"
        name="maxScore"
        type="number"
        value={formData.maxScore}
        onChange={handleChange}
        min={1}
        placeholder="E.g., 100"
        error={errors.maxScore}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md text-white font-semibold transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Saving...' : 'Save Project Setup'}
      </button>

      {submitSuccess && (
        <p className="mt-3 text-green-600 font-semibold">Project setup saved successfully!</p>
      )}
    </form>
  )
}

export default CourseFinalProjectSetup
