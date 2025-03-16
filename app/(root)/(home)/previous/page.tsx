import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <div className='flex gap-10 text-white flex-col'>
        <h1 className='text-3xl font-bold'>
          <CallList type='ended' />
        </h1>
    </div>
  )
}

export default Previous
