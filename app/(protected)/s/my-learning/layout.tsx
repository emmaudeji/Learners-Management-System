import MyLearningHeader from '@/components/students/MyLerningHeader'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    < >
        <MyLearningHeader/>
        {children}
    </ >
  )
}

export default layout