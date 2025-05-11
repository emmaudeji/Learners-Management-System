import InstructorNav from '@/components/Instructors/NavBar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className='flex flex-col md:flex-row '>
        <InstructorNav/>
        {children}
    </section>
  )
}

export default layout