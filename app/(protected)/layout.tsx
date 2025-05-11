import { Header } from '@/components/common/Header'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default layout