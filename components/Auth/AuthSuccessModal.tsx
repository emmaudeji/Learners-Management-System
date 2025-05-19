"use client";

import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import React from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

const AuthSuccessModal = ({setIsOpen}:{setIsOpen:(g:boolean)=>void}) => {
  const {user} = useUserStore()

  return (
      <AlertDialogContent className="shad-alert-dialog text-center">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            You are all set
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            Choose where to go to
          </AlertDialogDescription>
        </AlertDialogHeader>

         <div className="flex justify-center gap-4 px-8">
          <Link href='/' onClick={()=>setIsOpen(false)} className="bg-brand-orange px-6 py-3 w-full  rounded-full">Home Page</Link>
          <Link href='/cms' onClick={()=>setIsOpen(false)} className="bg-brand px-6 py-3  w-full rounded-full" >Dashboard</Link>
         </div>

        <AlertDialogFooter className="text-sm italic">
           Logged in as <span className="text-brand-orange text">{user?.email}</span>
        </AlertDialogFooter>
      </AlertDialogContent>
  );
};

export default AuthSuccessModal;
