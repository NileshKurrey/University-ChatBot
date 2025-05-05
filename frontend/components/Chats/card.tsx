import React from 'react'
import Image from 'next/image'
import {Card, CardContent, CardFooter, CardTitle} from '@/components/ui/card'
import { Button } from '../ui/button'
import link from '@/public/bot.png'
function BotCard() {

  return (
    <>
   <Card>
    
      <Image src={link}alt="College Bot" width={100} height={100} className="rounded-full m-auto"/>
      <CardTitle className='m-auto'>College Bot name</CardTitle>
    
    <CardContent>
     <p className='text-gray-700 text-wrap '>College bot description</p>
    </CardContent>
    <CardFooter>
      <Button variant="default" className='bg-gradient-to-r text-white from-green-600 to-green-300 w-full'>Start Chat</Button>
    </CardFooter>
   </Card>
    </>
  )
}

export default BotCard