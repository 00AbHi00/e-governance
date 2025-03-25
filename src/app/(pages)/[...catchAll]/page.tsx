"use client";

import {redirect} from "next/navigation";
import { useEffect, useState } from "react";

export default function Others() {
    
    return (
    <div className="min-h-screen grid content-center justify-items-center  bg-black">
      <div className="">
        Page you are looking for is not available
      </div>
      <div className=" ">
        <Redirect time={5}/>
      </div>
    </div>
  );
}

export const Redirect = ({time}:{time:number})=>
{
    const [timer,setTimer]=useState(time)
    useEffect(()=>{
    
        if(window)
        {
            if(timer===0) 
            {
                redirect("/")
            }
            const timeHandler= window.setTimeout(()=>{
                setTimer((oldTime)=>oldTime-1)
            },1000)
            return(()=>clearTimeout(timeHandler))
        }
    },[timer])
    
    return(
        <p className="text-blue-300"> Redirecting in {timer}s </p>
    )
}
