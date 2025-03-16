import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between p-4 gap-6 z-50 bg-[#1C1F2E] w-full'>
      <Link href="/" className='flex items-center gap-1'>
        <Image src="/icons/logo.svg" width={32} height={32} alt='logo-main' />
        <p className='text-white font-bold text-2xl'>VCF</p>
      </Link>
      <div className='flex-between gap-6'>
        {/* Clerk Auth */}
        <SignedIn>
            <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
