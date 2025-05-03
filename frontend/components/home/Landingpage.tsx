'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import heroImg from '@/public/herosectioin.svg'
export default function  LandingPage() {
    const { userId } = useAuth();
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center justify-items-start"> 
             <h1 className="m-4 text-4xl color font-bold text-black cursor-pointer">University.Ai</h1>
        </div>
        
        <div className="flex items-center justify-around w-[50%]">
          <ul className="flex space-x-4 text-black">
            <li className="text-2xl space-x-2 font-medium cursor-pointer hover:text-gray-800">Home</li>
            <li  className="text-2xl space-x-2 font-medium cursor-pointer hover:text-gray-800">About</li>
            <li  className="text-2xl  space-x-2 font-medium cursor-pointer hover:text-gray-800">Contact</li>
          </ul>
          
           {userId ? <><UserButton appearance={{elements: {
          // For the avatar container
            userButtonAvatarBox: {
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            },
        },
        }}/></>:<>
            <div className="flex items-center justify-around space-x-4">
           <Link href='/sign-in'>
            <Button variant={"outline"} className="cursor-pointer">Sign In</Button>
            </Link>
            <Link href='/sign-up'>
            <Button variant={"default"} className="cursor-pointer">Sign Up</Button>
            </Link></div></>}
        </div>
      </nav>

      <section className="flex items-center justify-around w-full">
        <div className="flex flex-col items-start justify-center flex-wrap w-[50%] p-10">
          <h1 className="text-6xl font-bold text-black">Meet Your 24/7 Campus Companion 🤖</h1>
          <p className="text-wrap text-[1.5rem] font-normal text-gray-500 mt-4">
          Get instant answers, academic support, and campus updates – powered by AI.
          </p>
          {userId ? <>
            <Link href="/chats">
            <Button variant={"default"} className="mt-5 pr-10 pl-10 cursor-pointer">Ask Your Question Now →</Button>
          </Link>
          </> :
            <Link href="/sign-in">
            <Button variant={"default"} className="mt-5 pr-10 pl-10 cursor-pointer">Sign In</Button>
          </Link>
           
           }
          
        </div>
        <div>
          <Image src={heroImg} alt="Landing Page Image" className="w-[500px] h-[500px] object-cover" />
        </div>
      </section>
    </>
  );
}
