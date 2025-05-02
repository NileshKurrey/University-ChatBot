'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
export default function  LandingPage() {
    const { userId } = useAuth();
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center justify-items-start"> 
             <h1 className="m-4 text-4xl color font-bold text-black cursor-pointer">Logo</h1>
        </div>
        
        <div className="flex items-center justify-around w-[50%]">
          <ul className="flex space-x-4 text-black">
            <li className="text-2xl space-x-2 cursor-pointer">Home</li>
            <li  className="text-2xl space-x-2 cursor-pointer">About</li>
            <li  className="text-2xl  space-x-2 cursor-pointer">Contact</li>
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
    </>
  );
}
