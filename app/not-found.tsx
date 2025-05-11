import { redirect } from 'next/navigation'
import React from 'react'

const NotFoundPage = () => {
   redirect(`/courses?msg=The page was not found. Keep browsing for more`)
}

export default NotFoundPage