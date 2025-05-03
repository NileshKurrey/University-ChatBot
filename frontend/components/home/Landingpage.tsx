'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import heroImg from '@/public/herosectioin.svg'
import { motion } from 'framer-motion';
import { MessageSquare, Clock, BookOpen, MapPin } from 'lucide-react';
export default function  LandingPage() {
    const { userId } = useAuth();
  return (
    <>

    {/* This is Navbar Section */}
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
      {/* --- 2. Features Grid --- */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Students Love ChatUniversity.AI
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Clock className="w-8 h-8 text-green-400" />,
                title: "Always Available",
                text: "Get help with deadlines and services anytime"
              },
              { 
                icon: <BookOpen className="w-8 h-8 text-green-400" />,
                title: "Course Companion", 
                text: "Instant access to syllabi and lecture notes"
              },
              { 
                icon: <MessageSquare className="w-8 h-8 text-green-400" />,
                title: "Get Letest Information of Colleges",
                text: "Never miss exams or payment deadlines"
              },
              { 
                icon: <MapPin className="w-8 h-8 text-green-400" />,
                title: "Campus Guide",
                text: "Find rooms and event locations instantly"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
