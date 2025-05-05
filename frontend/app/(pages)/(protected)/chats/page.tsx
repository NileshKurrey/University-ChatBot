'use client'

import BotCard from "@/components/Chats/card"
import Navbar from "@/components/home/Navbar"
import { useBotStore } from "@/store/userBotStore"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
export default function Chats() {
  const {loading,error,bots, fetchBots}  = useBotStore()
  useEffect(()=>{
    fetchBots();
  },[fetchBots])
  const {user} = useUser()
  
  console.log(bots.data)
  return (
   <>
   <Navbar />
   <div className="h-40 bg-gradient-to-r text-white from-green-600 to-green-300 flex flex-col items-start justify-center pl-20">
    <h4 className="text-1xl font-bold">Hi, {user?.fullName}</h4>
    <h2 className="text-2xl font-bold">Welcome To ChatUniversity.AI</h2>
   </div>
    <div className="flex items-center justify-center  w-full ">
      <div className="flex gap-10 flex-wrap m-10  justify-center">
        {loading?<>Fetching College Bot</>:<>
        {error?<></>:<>
        {bots.data.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
        </>}
        </>}
        
        
      </div>
    </div>
   </>
  )
}
