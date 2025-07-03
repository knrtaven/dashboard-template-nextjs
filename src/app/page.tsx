'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // or 'next/router' for Pages Router

const Page = () => {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/signin')
  }, [])
  return (
    <div>Redirecting to sign in..</div>
  )
}

export default Page