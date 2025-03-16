'use client'

import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className='sticky flex flex-col justify-between w-fit left-0 top-0 h-screen max-sm:hidden lg:w-[264px] bg-[#1C1F2E] p-6 pt-28 text-white'>
      <div className='flex flex-1 flex-col gap-6'>
        {sideBarLinks.map((link) => {
          const isActive = pathname === link.route ;
          return <Link 
            href={link.route}
            key={link.label}
            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
              'bg-[#007bff]': isActive
            })}
          >
            <Image src={link.imageUrl} alt={link.label} width={24} height={24} />
            <p className='text-lg px-4 max-lg:hidden'>{link.label}</p>
          </Link>
        })}
      </div>
    </section>
  )
}

export default Sidebar
