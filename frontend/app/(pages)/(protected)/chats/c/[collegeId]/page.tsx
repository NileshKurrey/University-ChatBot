'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { useBotStore } from '@/store/userBotStore';

export default function Page() {
  const {collegeId} = useParams();
  const {getBotById,currentBot} = useBotStore();
   useEffect(()=>{
    if (typeof collegeId === 'string') {
      getBotById(collegeId);
    }
   },[collegeId, getBotById]) 
  return (
    <div>This Is chat Component of Id {collegeId}, {currentBot?.name}  </div>
  )
}
