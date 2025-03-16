import { avatarImages } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { toast } from "sonner"



interface MeetingCardProps {
    icon: string,
    title: string,
    date: string,
    isPreviousMeeting?: boolean,
    buttonText?: string,
    buttonIcon?: string,
    handleClick?: ()=> void,
    link?: string
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonText,
    buttonIcon,
    handleClick,
    link
}: MeetingCardProps) => {
  return (
    <section className='flex flex-col justify-between min-h-[258px] w-full rounded xl:max-w-[540px] bg-[#1C1F2E] px-5 py-8 gap-10'>
        <article className='flex flex-col gap-5 '>
            <Image src={icon} width={28} height={28} alt={!isPreviousMeeting? 'upcoming' : 'ended'}/>
        
            <div className='flex flex-col justify-between gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-base font-bold'>{date}</p>
                <div></div>
            </div>
        </article>
        <article className='flex justify-between relative'>
            <div className='flex relative w-full max-sm:hidden'>
                {avatarImages.map((image, index) => {
                    return <Image 
                        src={image}
                        height={35}
                        width={35}
                        alt="ateendees"
                        className={cn("rounded-full", {absolute: index>0})}
                        style={{top: 0, left: index*28}}
                    />
                })}
                <div className='flex-center rounded-full left-[136px] top-0 size-10 bg-[#1E2757] border-[#252A41] absolute border-[5px] text-lg'>+5</div>
            </div>
        </article>
        {!isPreviousMeeting && 
            <div className='flex gap-2'>
                <Button  className='rounded bg-blue-400' onClick={handleClick}>
                    {buttonIcon && <Image src={buttonIcon} height={20} width={20} alt='feature' />}
                    &nbsp;{buttonText}
                </Button>
                {
                    link && <Button onClick={ () => {
                        navigator.clipboard.writeText(link)
                        toast("Link Copied")
                    }} 
                    ><Image src="/icons/copy.svg" height={20} width={20} alt='feature' /> &nbsp; Copy Link</Button>
                }
            </div>
        }
    </section>
  )
}

export default MeetingCard
