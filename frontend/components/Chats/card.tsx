import React from 'react'
import Image from 'next/image'
import {Card, CardContent, CardFooter, CardTitle} from '@/components/ui/card'
import { Button } from '../ui/button'
import link from '@/public/bot.png'
interface Bot {
  id: string;
  name: string;
  logo: string;
  description: string;
  // add other properties as needed
}
interface BotCardProps {
  bot: Bot;             // Optional className for styling
}
function BotCard({bot}:BotCardProps) {

  return (

    <>
   <Card className='w-2xs'>
    
      <Image src={link}alt="College Bot" width={100} height={100} className="rounded-full m-auto"/>
      <CardTitle className='m-auto'>{bot.name}</CardTitle>
    
    <CardContent>
     <p className='text-gray-700 text-wrap '>{bot.description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="default" className='bg-gradient-to-r text-white from-green-600 to-green-300 w-full cursor-pointer'>Start Chat</Button>
    </CardFooter>
   </Card>
    </>
  )
}

export default BotCard