import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface MeetingTypeProps {
    img: string,
    title : string,
    description : string,
    bgColor : string,
    textColor : string,
    imgBgColor: string,
    handleClick: () => void,
}

const MeetingTypeCard = ({img, title, description, bgColor, textColor, imgBgColor, handleClick}: MeetingTypeProps) => {
  return (
    
        <div className={cn("flex flex-col justify-between h-[240px] w-full rounded p-3", bgColor)} onClick={handleClick}>
            <div className={cn(`p-2 w-fit rounded m-2`, imgBgColor)}>
                <Image src={img} alt={title} width={32} height={32} /> 
            </div>
            <div className='p-2'>
                <h2 className={cn(`text-3xl font-bold`, textColor)}>
                    {title}
                </h2>
                <p className={cn(`text-xl font-bold`, textColor)}>
                    {description}
                </p>
            </div>
        </div>
  )
}

export default MeetingTypeCard
