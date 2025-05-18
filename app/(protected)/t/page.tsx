import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    // redirect to careers with alert: Page not found
    redirect(`/career`)
}

export default page