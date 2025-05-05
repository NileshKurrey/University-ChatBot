'use client'

import BotCard from "@/components/Chats/card"
import Navbar from "@/components/home/Navbar"
import { useUser } from "@clerk/nextjs"

export default function Chats() {
  const {user} = useUser()
  return (
   <>
   <Navbar />
   <div className="h-40 bg-gradient-to-r text-white from-green-600 to-green-300 flex flex-col items-start justify-center pl-20">
    <h4 className="text-1xl font-bold">Hi, {user?.fullName}</h4>
    <h2 className="text-2xl font-bold">Welcome To ChatUniversity.AI</h2>
   </div>
    <div className="flex items-center justify-center mt-5">
      <div className="flex gap-10 flex-wrap">
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
        <BotCard/>
      </div>
    </div>
   </>
  )
}
