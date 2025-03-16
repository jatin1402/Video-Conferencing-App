import CallList from '@/components/CallList'
import MeetingCard from '@/components/MeetingCard'
import React from 'react'

const Upcoming = () => {
  return (
    <div className='flex gap-10 text-white flex-col'>
        <h1 className='text-3xl font-bold'>
          <CallList type='upcoming' />
        </h1>
    </div>
  )
}

export default Upcoming
