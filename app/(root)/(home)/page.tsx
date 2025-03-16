import MeetingTypes from '@/components/MeetingTypes'
import React from 'react'

const Home = () => {
  const now= new Date;
  const time= now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
  const date= now.toLocaleDateString('en-us', {dateStyle: 'full'})
  return (
    <div className='flex gap-10 text-white flex-col'>
        <div className="flex flex-col hero-background w-full h-[300px] rounded-[12px] ">
          <div className='flex justify-between flex-col h-full max-md:px-5 max-md:py-8 p-11'>
            <h2 className='bg-slate-700 w-[270px] px-2 text-center text-base font-normal rounded'>Upcoming meeting at: 12:30pm</h2>
            <div>
              <div className='font-extrabold text-4xl lg:text-7xl py-2'>{time}</div>
              <div className='font-medium text-2xl lg:text-3xl'>{date}</div>
            </div>
          </div>
        </div>
        <MeetingTypes />
    </div>
  )
}

export default Home
