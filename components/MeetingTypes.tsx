"use client"

import React, { useState } from 'react'
import MeetingTypeCard from './MeetingTypeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import DatePicker from "react-datepicker";
import { Input } from './ui/input'


const MeetingTypes = () => {
    const [meetingState, setMeetingState] = useState<'isNewMeeting' | 'isJoinMeeting' | 'isScheduleMeeting' | undefined>();
    const router = useRouter();
    const user = useUser();
    const client = useStreamVideoClient();
    const [value, setValue] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const createMeeting = async () => {
        if(!client || !user ) return;

        try{
            const callId = crypto.randomUUID();
            const call = client.call('default', callId);
            
            if(!call) throw new Error('something went wrong with the call');

            const startsAt = value.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = value.description || 'Instant Meeting';

            call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            });

            setCallDetails(call);
            if(!value.description){
                router.push(`/meeting/${call?.id}`);
                toast("Meeting room has been created.")
            }
            
        } catch (err) {
            console.log(err);
            toast("there is an error creating meeting");

        }
    };
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer'>
        <MeetingTypeCard img="icons/add-meeting.svg" title="New Meeting" description="Start an Instant meeting" bgColor="bg-orange-200" textColor="text-amber-700" imgBgColor="bg-amber-700" handleClick={() => {setMeetingState('isNewMeeting')}}/>
        <MeetingTypeCard img="icons/join-meeting.svg" title="Join Meeting" description="via invitation link" bgColor="bg-blue-200" textColor="text-blue-700" imgBgColor="bg-blue-700" handleClick={() => {setMeetingState('isJoinMeeting')}}/>
        <MeetingTypeCard img="icons/schedule.svg" title="Schedule Meeting" description="Plan your meetings" bgColor="bg-pink-200" textColor="text-pink-700" imgBgColor="bg-pink-700" handleClick={() => {setMeetingState('isScheduleMeeting')}}/>
        <MeetingTypeCard img="icons/recordings.svg" title="Recodings" description="Check out the recordings" bgColor="bg-green-200" textColor="text-green-700" imgBgColor="bg-green-700" handleClick={() => {router.push('/recordings')}}/>

        {!callDetails ? <MeetingModal 
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            buttonText="Schedule Meeting"
            onButtonClick={createMeeting}
        >
            <div className='flex w-full flex-col gap-2.5'>
                <label className='text-base text-normal leading-[22px]'>Add a description</label>
                <textarea className='bg-[#161925] rounded h-[70px] text-white p-2 focus-visible:ring-0 text-sm' onChange={(e) => {
                    setValue({...value, description: e.target.value})
                }}/>
            </div>
            <div className='flex w-full flex-col gap-2.5'>
                <label className='text-base text-normal leading-[22px]'>Select a Time and Date</label>
                <DatePicker 
                    selected={value.dateTime}
                    onChange={(date) => {
                        setValue({...value, dateTime: date!})
                    }}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='time'
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className='w-full rounded p-2 text-white bg-[#161925] focus:outline-none'
                />
            </div>
        </MeetingModal> : <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        buttonText="Copy Link"
        onButtonClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast('Link Copied');
        }}
    />}

        <MeetingModal
            isOpen={meetingState === 'isNewMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            buttonText="Start Meeting"
            onButtonClick={createMeeting}
        />

        <MeetingModal
            isOpen={meetingState === 'isJoinMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            buttonText="Join Meeting"
            onButtonClick={()=>router.push(value.link)}
        >
            <Input className='w-full text-white bg-[#161925]' onChange={(e) => setValue({...value, link: (e.target as HTMLInputElement).value})}/>
        </MeetingModal>
    </section>
  )
}

export default MeetingTypes
