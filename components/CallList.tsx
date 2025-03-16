'use client'

import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useGetCallList } from '@/hooks/useGetCallList'
import Loader from './Loader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CallList = ({type} : {type : 'ended' | 'upcoming' | 'recorded'}) => {

    const Router = useRouter();
    const {endedCalls, upcomingCalls, recodedCalls, isCallLoading} = useGetCallList();
    const [callRecordings, setCallRecordings] = useState<CallRecording[]>([])
    const getCallS = () => {
        switch(type) {
            case 'ended':
                return endedCalls
            case 'upcoming':
                return upcomingCalls
            case 'recorded':
                return callRecordings
            default:
                return []
        }
    }


    const getNoCallMessages = () => {
        switch(type) {
            case 'ended':
                return 'No Previous Calls'
            case 'upcoming':
                return 'No Upcoming Calls'
            case 'recorded':
                return 'No Recorded Calls'
            default:
                return ''
        }
    }

    useEffect(() => {

        const fetchRecordings = async () => {
            const allRecordings  = await Promise.all(recodedCalls.map((meeting) => meeting.queryRecordings() ?? []));
            const recordings = allRecordings.filter((call) => call.recordings.length>0).flatMap((call) => call.recordings);
            setCallRecordings(recordings);
        }

        if(type==="recorded") fetchRecordings();
    }, [type, recodedCalls])

    if(isCallLoading) return <Loader />
 
    const calls = getCallS();
    const noCallMessages = getNoCallMessages();
  return (
    <div>
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => {
            return <MeetingCard 
                key={(meeting as Call)?.id}
                icon={type==="upcoming"? "/icons/upcoming.svg" : type=== "recorded" ? '/icons/recordings.svg' : '/icons/previous.svg'}
                title={(meeting as Call).state?.custom?.description || (meeting as CallRecording).filename?.substring(0,20) || "No Description"}
                date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time.toLocaleString() }
                isPreviousMeeting = {type === 'ended' ? true : false}
                buttonText= {type==="recorded"? "Play" : "Start"}
                buttonIcon = {type==="recorded" ? '/icons/play.svg' : undefined}
                link = {type==="recorded" ? `${(meeting as CallRecording).url}` :`${ process.env.NEXT_PUBLIC_BASE_URL }/meeting/${(meeting as Call)?.id}`}
                handleClick = {
                    type==="recorded" ? 
                    () => {Router.push(`${(meeting as CallRecording).url}`)} :
                    () => { Router.push(`/meeting/${(meeting as Call)?.id}`)}
                }
            />  
        }):  <div className='text-2xl'>{noCallMessages}</div>}
      </div>
    </div>
  )
}

export default CallList
