// components/CertificateTemplateA.tsx
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

export default function CertificateTemplateA({
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
    <div className="w-full aspect-video border-4 border-gray-800 p-10 font-serif bg-white text-gray-900 relative">
      <h2 className="text-3xl font-bold text-center uppercase mb-6">{caption}</h2>

      <p className="text-center text-lg mb-2">This certificate is presented to</p>
      <h5 className="text-2xl text-center font-semibold underline decoration-dotted mb-4">
        {studentName || 'Student Name'}
      </h5>

      <p className="text-center mb-6">
        {completionText || 'For successfully completing the course'} <br />
        <strong>{courseTitle || 'Course Title'}</strong>
      </p>

      <div className="absolute bottom-8 left-10">
        {signatureUrl && (
          <img src={signatureUrl} alt="Signature" className="h-12 mb-1" />
        )}
        <p className="text-sm">{instructorName || 'Instructor Name'}</p>
      </div>

      <div className="absolute bottom-8 right-10 text-sm">
        <p>{date || 'June 7, 2025'}</p>
        {sealUrl && <img src={sealUrl} alt="Seal" className="h-12 mt-1" />}
      </div>
    </div>
  )
}
