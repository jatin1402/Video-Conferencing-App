import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex-center mt-5'>
      <SignIn />
    </main>
  )
}

export default SignInPage
