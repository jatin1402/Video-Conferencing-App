'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';

const EndCallButton = () => {
    const call= useCall();
    const router = useRouter();

    const { useLocalParticipant }  = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner  = localParticipant && localParticipant.userId === call?.state?.createdBy?.id;
    if(!isMeetingOwner) return;

  return (
    <div className='cursor-pointer'>
      <Button className="bg-red-500" onClick={async () => {
        await call.endCall();
        router.push("/")
      }}>
        End call for everyone
      </Button>
    </div>
  )
}

export default EndCallButton
