import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { LayoutList, User, Users } from 'lucide-react';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
  

type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid'

const MeetingRoom = () => {

    const router = useRouter();

    const [callLayout, setCallLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const isPersonal = !!searchParams.get('personal');

    const {useCallCallingState} =  useCallStateHooks();
    const callingState  = useCallCallingState();

    if(callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch(callLayout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }

  return (
    <section className='relative overflow-hidden w-full h-screen pt-4 text-white'>
      <div className='relative flex-center size-full'>
        <div className='size-full flex items-center max-w-[1000px]'>
            <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] ml-2', {
            'show-block': showParticipants, 'hidden': !showParticipants
          })}
        >            <CallParticipantsList onClose={() => setShowParticipants(false)}/>
        </div>
      </div>
      <div className='fixed bottom-0 w-full flex-center flex-wrap gap-5'>
        <CallControls onLeave={() => {router.push("/")}}/>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='rounded bg-[#19232d] cursor-pointer'>
                    <LayoutList size={20} className='text-white'/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='text-white border-black'>
                {['Speaker Left', 'Speaker Right', 'Grid'].map((item, index) => {
                    return <DropdownMenuItem key={index} className='cursor-pointer text-black' onClick={() => setCallLayout(item.toLowerCase() as CallLayoutType)}>{item}</DropdownMenuItem>
                })}
            </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipants((prev) => !prev) }>
          <div className='rounded-2xl cursor-pointer'>
            <Users size={20} className='text-white' />
          </div>
        </Button>
        {/* if user has a priavte room */}

        {!isPersonal && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
