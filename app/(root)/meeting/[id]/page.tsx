'use client'

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({ params }: { params: {id: string} }) => {

  const {isLoaded} = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  const {call, callIsLoading} = useGetCallById(params?.id);

  if(!isLoaded || callIsLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupCompleted ? <MeetingRoom /> : <MeetingSetup setIsSetupCompleted={setIsSetupCompleted}/>}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
