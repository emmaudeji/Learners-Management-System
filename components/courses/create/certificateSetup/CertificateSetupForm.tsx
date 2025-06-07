// components/CertificateSetupForm.tsx
'use client'

import { useState } from 'react'
import CertificatePreview from './CertificatePreview'
import { CustomInput } from '@/components/shared/CustomInput'

const presetCaptions = [
  'Certificate of Completion',
  'Certificate of Achievement',
  'Certificate of Excellence',
]

export default function CertificateSetupForm() {
  const [formData, setFormData] = useState({
    studentName: 'Jane Doe',
    courseTitle: 'React for Beginners',
    caption: presetCaptions[0],
    customCaption: '',
    completionText: 'Has successfully completed the course',
    instructorName: 'Instructor Name',
    date: new Date().toLocaleDateString(),
    signatureUrl: '',
    sealUrl: '',
  })

  const [template, setTemplate] = useState<'A' | 'B'>('A')

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const effectiveCaption = formData.customCaption || formData.caption
  const [step, setStep] = useState<string>('preview') //'preview' | 'setup'

  return (
    <div className="space-y-8 py-12">

        <div className="text-center w-full border-b pb-6 flex flex-col items-center  ">
            <h5 className="text-2xl font-semibold mb-">Certificate Preview & Setup</h5>
            <p className="text-muted-foreground pb-4 mx-auto max-w-xl text-center">
                Preview course certificate and customize to your preferrence
            </p>

            <div className="flex justify-  gap-2">
            {
              [ { key: 'preview', label: 'Peview',},
                { key: 'setup', label: 'Customize ',  },
              ].map(({ key, label, }) => (
              <button
                key={key}
                onClick={() => setStep(key)}
                className={`px-4 py-2 rounded-full text-sm transition ${
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
      
      { step === 'setup' &&
      <div>
        <h6 className="font-semibold text-lg mb-4">Customize Certificate</h6>

        <div className="max-w-md mx-auto">
        <label className="block font-medium mb-1">Choose Template</label>
        <select
          value={template}
          onChange={e => setTemplate(e.target.value as 'A' | 'B')}
          className="mb-4 w-full border rounded px-2 py-1"
        >
          <option value="A">Elegant Minimal</option>
          <option value="B">Modern Accent</option>
        </select>

        <label className="block font-medium mb-1">Certificate Caption</label>
        <select
          value={formData.caption}
          onChange={e => setFormData(prev => ({ ...prev, caption: e.target.value, customCaption: '' }))}
          className="w-full border rounded px-2 py-1 mb-2"
        >
          {presetCaptions.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="">Other...</option>
        </select>

        {formData.caption === '' && (
          <CustomInput
            label="Custom Caption"
            name="customCaption"
            value={formData.customCaption}
            onChange={update}
          />
        )}

        <CustomInput
          label="Completion Text"
          name="completionText"
          type="textarea"
          value={formData.completionText}
          onChange={update}
        />
      </div>
      </div>
}
      {step === 'preview' && <div>
        <h6 className="font-semibold text-lg mb-4">Certificate Preview</h6>
        <CertificatePreview
          template={template}
          values={{ ...formData, caption: effectiveCaption }}
        />
      </div>}
    </div>
  )
}
