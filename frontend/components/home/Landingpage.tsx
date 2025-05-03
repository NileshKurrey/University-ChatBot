'use client'
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import heroImg from '@/public/herosectioin.svg'
import { motion } from 'framer-motion';
import {  Clock, BookOpen, MapPin } from 'lucide-react';
const features = [
  { 
    icon: <Clock />,
    title: "Always Available",
    text: "24/7 access to academic support and campus resources"
  },
  { 
    icon: <Clock className="w-8 h-8 text-blue-600" />,
    title: "Always Available",
    text: "Get help with deadlines and services anytime"
  },
  { 
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    title: "Course Companion", 
    text: "Instant access to syllabi and lecture notes"
  },

  { 
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: "Campus Guide",
    text: "Find rooms and event locations instantly"
  }
];
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

      <section className="flex items-strart justify-around w-full h-screen">
        <div className="flex flex-col items-start justify- mt-25 flex-wrap w-[50%]">
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
    {/* // Features Grid Section */}
<section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
  <div className="max-w-6xl mx-auto">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-16 text-gray-900"
    >
      Why Students <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Love</span> ChatUniversity.AI
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15
          }}
          className="group relative"
        >
          {/* Gradient Border Effect */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500 to-purple-500 opacity-0 group-hover:opacity-20 blur transition duration-1000 group-hover:duration-200" />
          
          {/* Main Card */}
          <div className="relative bg-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 h-full border border-gray-100">
            {/* Animated Icon Container */}
            <motion.div 
              className="mb-6 flex justify-center"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="p-4 bg-gradient-to-br from-green-200 to-purple-green rounded-2xl">
                {React.cloneElement(feature.icon, {
                  className: "w-12 h-12 text-green-600",
                  strokeWidth: 1.5
                })}
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {feature.title}
                <motion.div 
                  className="w-8 h-1 bg-green-600 mt-2 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.text}
              </p>
            </motion.div>

            {/* Hover Indicator */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
