import dynamic from 'next/dynamic';
import React from 'react'
const IoChatbubbles = dynamic(() => import('react-icons/io5').then(mod => mod.IoChatbubbles), { ssr: false });

export default function Footer() {
  return (
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
  )
}
