'use client'
import React from 'react'
// import { BoltLoader } from "react-awesome-loaders";
import {motion}  from "framer-motion";
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
    <motion.div
      className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </div>
  )
}
