import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from './ui/button'

interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void,
    onButtonClick: () => void,
    title: string,
    buttonText: string,
    children?: ReactNode
}
  

const MeetingModal = ({isOpen, onClose, onButtonClick, title, buttonText, children}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
            <h1 className='text-3xl text-center font-bold'>{title}</h1>
            </DialogHeader>
            {children}
            <Button className='bg-blue-500 text-white cursor-pointer' onClick={onButtonClick}>
                {buttonText}
            </Button>
        </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
