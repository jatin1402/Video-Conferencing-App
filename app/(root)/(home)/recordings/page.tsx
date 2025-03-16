import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <div className='flex gap-10 text-white flex-col'>
        <h1 className='text-3xl font-bold'>
          Recordings
        </h1>

        <CallList type='recorded' />
    </div>
  )
}

export default Recordings
