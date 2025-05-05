import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Link } from 'lucide-react'
import dynamic from 'next/dynamic';


const IoChatbubbles = dynamic(() => import('react-icons/io5').then(mod => mod.IoChatbubbles), { ssr: false });
function Navbar() {
      const { userId } = useAuth();
  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
    <div className="flex items-center justify-items-start">
      <h1 className="flex items-center gap-1 m-4 text-4xl color font-bold text-black cursor-pointer"><IoChatbubbles/>ChatUniversity.AI</h1>
    </div>

    <div className="flex items-center justify-around w-[50%]">
      <ul className="flex space-x-4 text-black">
        <li className="text-2xl space-x-2 font-medium cursor-pointer hover:text-gray-800">Home</li>
        <li className="text-2xl space-x-2 font-medium cursor-pointer hover:text-gray-800">About</li>
        <li className="text-2xl  space-x-2 font-medium cursor-pointer hover:text-gray-800">Contact</li>
      </ul>

      {userId ? <><UserButton appearance={{
        elements: {
          // For the avatar container
          userButtonAvatarBox: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          },
        },
      }} /></> : <>
        <div className="flex items-center justify-around space-x-4">
          <Link href='/sign-in'>
            <Button variant={"outline"} className="cursor-pointer">Sign In</Button>
          </Link>
          <Link href='/sign-up'>
            <Button variant={"default"} className="cursor-pointer">Sign Up</Button>
          </Link></div></>}
    </div>
  </nav>
  )
}

export default Navbar