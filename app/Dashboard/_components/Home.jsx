"use client"
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

function HomePage() {
    const { user } = useUser();
    return (

        <div className='p-5 bg-teal-700 mt-2 w-full text-white rounded-lg flex items-center gap-6'>
            <Image src={'/book1.jpg'} alt='book' width={100} height={100} />
            <div>
                <h2 className='font-bold text-3xl'>
                    Hello, {user?.fullName}!
                </h2>
                <p className=''>
                Dive into personalized learning powered by AI and take your skills to the next level.                </p>

            </div>


        </div>
    )
}

export default HomePage