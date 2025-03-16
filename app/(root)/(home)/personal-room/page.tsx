"use client"

import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import {toast} from 'sonner'


const Table = ({title, description}: {title: string; description?: string;}) => {
  return (
    <div className='flex max-sm:flex-col gap-3'>
      <div className='text-sm'>{title}:</div>
      <div className='font-bold truncate'>{description}</div>
    </div>
  );
}

const PersonalRoom = () => {

  const { user } = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const {call} = useGetCallById(meetingId!);
  const router = useRouter();
  const startNewMeeting = async () => {
    if(!client || !user) return;

    if(!call){
      const newCall  = client.call("default", meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      });
      router.push(`/meeting/${meetingId}?personal=true`)
    }
  };

  return (
    <div className='flex gap-10 text-white flex-col'>
        <h1 className='text-3xl font-bold'>
          Personal Room
        </h1>
        <div className='flex flex-col gap-5 xl:max-w-[900px]'>
          <Table title='Topic' description={`${user?.username || user?.emailAddresses}'s Meeting Room`} />
          <Table title='Meeting Id' description={meetingId} />
          <Table title='Invitation Link' description={meetingLink} />
          <div className='flex gap-5'>
            <Button className='bg-blue-400 cursor-pointer' onClick={startNewMeeting}>Start Meeting</Button>
            <Button className='bg-gray-800 cursor-pointer' onClick={ () => {
                        navigator.clipboard.writeText(meetingLink)
                        toast("Link Copied")
                    }} >Copy Invitation Link</Button>
          </div>
        </div>
    </div>
  )
}

export default PersonalRoom
