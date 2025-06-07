// components/CertificatePreview.tsx
import CertificateTemplateA from './CertificateTemplateA'
import CertificateTemplateB from './CertificateTemplateB'

const templates = {
  A: CertificateTemplateA,
  B: CertificateTemplateB,
}

type Props = {
  template: keyof typeof templates
  values: {
    studentName: string
    courseTitle: string
    caption: string
    completionText: string
    date?: string
    instructorName?: string
    signatureUrl?: string
    sealUrl?: string
  }
}

export default function CertificatePreview({ template, values }: Props) {
  const TemplateComponent = templates[template]

  return (
    <div className="max-w-4xl mx-auto">
      <TemplateComponent {...values} />
    </div>
  )
}
