// components/CertificateTemplateB.tsx
import React from 'react'

interface Props {
  studentName: string
  courseTitle: string
  caption: string
  completionText: string
  date?: string
  instructorName?: string
  signatureUrl?: string
  sealUrl?: string
}

export default function CertificateTemplateB({
  studentName,
  courseTitle,
  caption,
  completionText,
  date,
  instructorName,
  signatureUrl,
  sealUrl,
}: Props) {
  return (
    <div className="w-full aspect-video border-8 border-blue-600 p-8 bg-gray-50 text-gray-800 relative shadow-inner font-sans">
      <div className="border border-gray-300 p-6 h-full flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold uppercase text-center mb-4 text-blue-800">{caption}</h1>

          <p className="text-center mb-2">Awarded to</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 underline mb-4">
            {studentName || 'Student Name'}
          </h2>

          <p className="text-center mb-4">
            {completionText || 'In recognition of completing the course'} <br />
            <strong>{courseTitle || 'Course Title'}</strong>
          </p>
        </div>

        <div className="flex justify-between items-end mt-6 text-sm">
          <div>
            {signatureUrl && (
              <img src={signatureUrl} alt="Signature" className="h-10 mb-1" />
            )}
            <p>{instructorName || 'Instructor Name'}</p>
          </div>

          <div className="text-right">
            <p>{date || 'June 7, 2025'}</p>
            {sealUrl && <img src={sealUrl} alt="Seal" className="h-10 mt-1" />}
          </div>
        </div>
      </div>
    </div>
  )
}
