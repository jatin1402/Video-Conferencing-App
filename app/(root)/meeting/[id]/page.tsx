'use client'

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const Meeting = () => {

  const { id } = useParams();
  const {isLoaded, user} = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  const {call, callIsLoading} = useGetCallById(id!);

  if(!isLoaded || callIsLoading) return <Loader />

  if(!call) return <div className='text-3xl text-white font-bold text-center'>Call Not Found</div>

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));
  if(notAllowed) return <div className='text-3xl text-white font-bold text-center'>You are not allowed to join the call</div>

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
