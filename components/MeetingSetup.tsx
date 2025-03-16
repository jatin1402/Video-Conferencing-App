'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupCompleted} : {setIsSetupCompleted : (value: boolean) => void}) => {

    const [isMicCamToggle, setIsMicCamToggle] = useState(false);

    const call = useCall();

    if(!call){
        throw new Error('Call is probably undefined and not passed in strem Video component');
    }

    useEffect(() => {

        if(isMicCamToggle){
            call.microphone.disable();
            call.camera.disable();
        } else {
            call.microphone.enable();
            call.camera.enable();
        }

    }, [isMicCamToggle, call?.microphone, call.microphone, call.camera])

  return (
    <div className='flex-center w-full h-screen flex-col gap-3'>
      <h1 className='text-white font-bolt text-3xl'>Setup</h1>
      <VideoPreview />
      <div className='flex-center h-16 gap-3'>
        <label className='text-white font-bold cursor-pointer'>
            <input type='checkbox' checked={isMicCamToggle} onChange={(e) => setIsMicCamToggle((e.target as HTMLInputElement).checked)} className='m-3'/>
            Join with camera and Mic off
        </label>
        <DeviceSettings />
      </div>
      <Button className='p-3 rounded bg-green-400 cursor-pointer' onClick={() => {call.join(); setIsSetupCompleted(true);}}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
