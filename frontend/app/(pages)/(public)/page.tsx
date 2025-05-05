'use client';

import Loading from "@/app/loading";
import LandingPage from "@/components/home/Landingpage";
import { useState,useEffect } from "react";

const Page = () => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return <Loading />;
    return (
        <LandingPage/>
    );
};
export default Page