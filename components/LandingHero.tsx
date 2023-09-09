"use client"

import React from 'react'
import TypewriterComponent from "typewriter-effect"
import { useAuth } from "@clerk/nextjs"
import Link from 'next/link'
import { Button } from './ui/button'
 
const LandingHero = () => {
    const { isSignedIn } = useAuth()
  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
            <h1>The Best AI tool for</h1>
            <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 h-fit
            pb-2'>
                <TypewriterComponent
                    options={{
                        strings:[
                            "Chatbot.",
                            "Image Generation.",
                            "Video Generation.",
                            "Music Generation.",
                            "Code Generation.",
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
        </div>
        <div className='text-sm md:text-xl font-light text-zinc-400'>
            Create content with AI 10x faster
        </div>
        <div>
            <Link href={isSignedIn? "/dashboard": "/sign-up"}>
                <Button variant="secondary" className='text-black'>
                    Start Generating for free
                </Button>
            </Link>
        </div>
        <div className='text-zinc-400 text-xs md:text-sm font-normal'>
            No credit card required
        </div>
    </div>
  )
}

export default LandingHero