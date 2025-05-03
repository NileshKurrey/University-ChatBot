'use client'
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import heroImg from '@/public/herosectioin.svg'
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MessageSquare = dynamic(() => import('lucide-react').then(mod => mod.MessageSquare), { ssr: false });
const ArrowRight = dynamic(() => import('lucide-react').then(mod => mod.ArrowRight), { ssr: false });
const Bot = dynamic(() => import('lucide-react').then(mod => mod.Bot), { ssr: false });
const Send = dynamic(() => import('lucide-react').then(mod => mod.Send), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then(mod => mod.Clock), { ssr: false });
const BookOpen = dynamic(() => import('lucide-react').then(mod => mod.BookOpen), { ssr: false });
const MapPin = dynamic(() => import('lucide-react').then(mod => mod.MapPin), { ssr: false });
const Users = dynamic(() => import('lucide-react').then(mod => mod.Users), { ssr: false });
const IoChatbubbles = dynamic(() => import('react-icons/io5').then(mod => mod.IoChatbubbles), { ssr: false });

const features = [
  
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
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    title: "Smart Reminders",
    text: "Never miss exams or payment deadlines"
  },
  {
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: "Campus Guide",
    text: "Find rooms and event locations instantly"
  }
];

export default function LandingPage() {

  const { userId } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>

      {/* This is Navbar Section */}
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

      <section className="flex items-strart justify-around w-full h-screen">
        <div className="flex flex-col items-start justify- mt-25 flex-wrap w-[50%]">
          <h1 className="text-6xl font-bold text-black">Meet Your 24/7 Campus Companion 🤖</h1>
          <p className="text-wrap text-[1.5rem] font-normal text-gray-500 mt-4">
            Get instant answers, academic support, and campus updates by our college specifics chatbors  – powered by AI.
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
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-900"
          >
            Why Students <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Love</span> ChatUniversity.AI
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="mb-6 flex justify-center"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0], // Multiple keyframes
                }}
                transition={{
                  type: "tween",
                  duration: 0.8,
                  ease: "easeIn",
                  times: [0, 0.25, 0.75, 1]
                }}

              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500 to-purple-500 opacity-0 group-hover:opacity-20 blur transition duration-1000 group-hover:duration-200" />

                {/* Main Card */}
                <div className="relative bg-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 h-full border border-gray-100">
                  {/* Animated Icon Container */}
                  <motion.div
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ type: "tween", duration: 0.5 }}
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
      {/* // Interactive Demo Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-purple-50 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col lg:flex-row gap-12 items-stretch"
          >
            {/* Questions Panel */}
            <motion.div
              className="flex-1 p-8 bg-white rounded-3xl shadow-2xl"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ type: "tween" }}
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ask Me Anything!
              </h2>

              <div className="space-y-4">
                {[
                  "Who is HOD of CSIT Department?",
                  "Where's the Admin building?",
                  "When admissions open?",
                  "How do I contact financial aid?"
                ].map((question, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gray-50 rounded-xl cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 hover:opacity-100 transition-all" />
                    <div className="flex items-center gap-3 relative">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">&quot;{question}&quot;</span>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-4 bg-green-50 rounded-xl flex items-center gap-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    <span className="text-lg">1,234+</span> students asked this today
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <div className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b flex items-center gap-4 bg-gradient-to-r from-green-600 to-green-300">
                  <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">CampusBot</h3>
                    <p className="text-sm text-white/80">Online now</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <p>Hi! I&apos;m CampusBot 🤖 Ready to help with:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Course schedules</li>
                          <li>Campus navigation</li>
                          <li>Deadline reminders</li>
                        </ul>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </motion.div>

                  {/* Sample Message Thread */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* User Message */}
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-[70%]">
                        <div className="bg-green-600 text-white p-4 rounded-2xl">
                          Where&apos;s the library?
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block text-right">2s ago</span>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="max-w-[70%]">
                        <div className="bg-gray-100 p-4 rounded-2xl">
                          <p>The main library is in <strong>Building A, Floor 2</strong></p>
                          <div className="mt-2 p-2 bg-white rounded-lg border">
                            <p className="text-sm font-medium">🗓 Open Hours:</p>
                            <p className="text-sm">Mon-Fri: 8AM - 11PM</p>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2 items-center">
                          <span className="text-xs text-gray-500">Was this helpful?</span>
                          <button className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            👍 Yes
                          </button>
                          <button className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                            👎 No
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* --- 4. Footer --- */}
      <footer className="bg-white text-black py-8 px-4 mt-10">
       <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="flex items-center gap-1 text-4xl font-bold text-black cursor-pointer"><IoChatbubbles/>ChatUniversity.AI</h1>
            <p className="text-gray-500 mt-2">Your AI-powered campus companion.</p>
          </div>
          <div>
            <ul className="flex space-x-4 text-black">
              <li className="text-lg font-medium cursor-pointer text-gray-800 hover:text-gray-900">Privacy Policy</li>
              <li className="text-lg font-medium cursor-pointer text-gray-800 hover:text-gray-900">Terms of Service</li>
              <li className="text-lg font-medium cursor-pointer text-gray-800 hover:text-gray-900">Contact Us</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between max-w-6xl mx-auto mt-4">
          <p className="text-gray-500">Made with ❤️ by ChatUniversity.AI Team</p>
          <p className="text-gray-500"> © {new Date().getFullYear()} ChatUniversity.AI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
