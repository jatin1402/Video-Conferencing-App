"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
  

const MobileNav = () => {
  const pathname= usePathname();
  return (
    <section className='w-full sm:hidden'>
        <Sheet>
            <SheetTrigger>
                <Image src="/icons/hamburger.svg" width={32} height={32} alt="hamburger-logo" className='cursor-pointer'/>
            </SheetTrigger>
            <SheetContent side='left' className='bg-[#1C1F2E] w-fit'>
                <section className='p-3'>
                    <Link href="/" className='flex items-center gap-1'>
                        <Image src="/icons/logo.svg" width={32} height={32} alt='logo-main' />
                        <p className='text-white font-bold text-xl'>VCF</p>
                    </Link>
                </section>
                <section className='flex flex-col gap-6 pt-8 text-white'>
                    {sideBarLinks.map((link) => {
                        const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                        return <div className='flex px-3 ' key={link.label}>
                            <SheetClose asChild key={link.route}>
                                <Link 
                                    href={link.route}
                                    key={link.label}
                                    className={cn('flex gap-4 items-center p-4 rounded-lg', {
                                    'bg-[#007bff] w-full max-w-60': isActive
                                    })}
                                >
                                <Image src={link.imageUrl} alt={link.label} width={20} height={20} />
                                <p className='text-lg px-4'>{link.label}</p>
                            </Link>
                        </SheetClose>
                        </div>
                        
                    })}
                </section>
                
            </SheetContent>
        </Sheet> 
    </section>
  )
}

export default MobileNav
