"use client"

import { SignUp, useSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '@/components/Loader'

const SignUpPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDemoAccess = async () => {
    if (!isLoaded) return;
    
    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: "testclient1402@gmail.com",
        password: "testclient123",
      });
      if (result.status === "complete") {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        window.location.href = '/'; 
      }else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setIsLoading(false);
    } 
  }
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <main className='flex-center flex-col gap-4 mt-5'>
        <Button 
          variant="outline" 
          className="w-[300px] bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
          onClick={handleDemoAccess}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Demo Access'}
        </Button>
        <SignUp />
      </main>
    </>
  )
}

export default SignUpPage