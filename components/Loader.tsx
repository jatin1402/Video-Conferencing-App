import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center w-full h-screen'>
      <Image src="/icons/loading-circle.svg" alt="loader" width={70} height={70} />
    </div>
  )
}

export default Loader
