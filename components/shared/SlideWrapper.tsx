// components/common/StepTransition.tsx
import { ReactNode } from 'react'

const SlideWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="animate-fade-slide  [animation-delay:0.2s]">
      {children}
    </div>
  )
}

export default SlideWrapper
