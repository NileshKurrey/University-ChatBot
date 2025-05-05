'use client'
import React from 'react'
import { useParams } from 'next/navigation'

export default function Page() {
  const {collegeId} = useParams();
    
  return (
    <div>This Is chat Component of Id {collegeId}  </div>
  )
}
