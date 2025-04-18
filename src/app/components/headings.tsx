"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";


export const NavigationBar = () => {
//  On the basis of JWT token this is set as true or false
  const isAdmin = true;
  const isValid = true;
  const router= useRouter()

  const routeToHome= () =>
  {
    router.push('/')
  }
  const checkRole=()=>
  {
    if(isAdmin)
    {
      return(
        "Admin"
      )
    }else if(isValid){
      return("Valid User")
    }else{
      return("Unverified User")
    }
  }
  return (
    <nav className="fixed w-screen  bg-slate-800/35 backdrop-blur-sm p-4  shadow-lg">
      <div className="container md:px-6 lg:px-8 mx-auto flex justify-between items-center">
        <button  onClick={routeToHome} className="text-white flex flex-col items-center font-bold">
        <Image src="/Images/government_image.png"
        alt="Government of Nepal Image"
        width={40}
        height={32}
        >

        </Image>
            Polling System
        </button>
        
        <span>
          {checkRole()}  
        </span>
        
        <div className="flex space-x-4">
          {(isValid || isAdmin) && (
            <Link href="/user-profile" className="text-white hover:underline">
              User Profile
            </Link>
          )}
          <Link href="/current-issues" className="text-white hover:underline">
            Current Issues
          </Link>
          <Link href="/reports" className="text-white hover:underline">
            Reports
          </Link>
          {(isValid || isAdmin) && (
            <Link href="/add-issue" className="text-white hover:underline">
              Add Issue
            </Link>
          )}
          {isAdmin && (
            <Link href="/pending-users" className="text-white hover:underline">
              View Pending Users
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-red-700/55 p-3 text-balance text-center  text-white w-full">
      Copyright {"©"} 2024 Government of Nepal, Department of Freedom of Speech Insurance (DFSI). All Rights Reserved. Gangabu, Kathmandu
    </footer>
  );
};
