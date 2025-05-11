import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <section className='fixed inset-0 h-screen flex justify-center items-center'>
        <Loader2 className='text-green-700 animate-spin'/>
    </section >
  )
}

export default loading