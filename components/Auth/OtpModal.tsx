"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP, getCurrentUser } from "@/lib/actions/user.actions";

import { Loader2, X } from "lucide-react";
import AuthSuccessModal from "./AuthSuccessModal";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { urls } from "@/constants/admin";
import { toast } from "react-toastify";

const OtpModal = ({
  accountId,
  email,
  setAccountId,
}: {
  accountId: string;
  email: string;
  setAccountId: Dispatch<SetStateAction<string | null>>
}) => {
  const  {push} = useRouter()
  const {setUser} = useUserStore()
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
  
    if (!accountId || !password) {
      toast.error("Credentials are missing. Try again.");
      setIsOpen(false);
      setAccountId(null);
      return;
    }
  
    try {
      setIsLoading(true);
      const sessionId = await verifySecret({ accountId, password });
  
      if (sessionId) {
        const data = await getCurrentUser();
  
        if(data){ 
          setUser(data);
          setAccountId(null)
          push(urls.basePath)
        }
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isResending, setIsResending] = useState(false)
  const handleResendOtp = async () => {
    try {
      setIsResending(true)
      await sendEmailOTP({ email });
    } catch (error) {
      console.log(error)
    } finally{
      setIsResending(false)
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-8 py-10 bg-white outline-none">
            <AlertDialogHeader className="relative flex justify-center">
              <AlertDialogTitle className="h2 text-center">
                Enter Your OTP
                < X
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-4 -right-4 text-slate-300 hover:text-slate-500 duration-300"
                />
              </AlertDialogTitle>
              <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                We&apos;ve sent a code to{" "}
                <span className="pl-1 text-primary">{email}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <InputOTP maxLength={6} value={password} onChange={setPassword}>
              <InputOTPGroup className="gap-2 text-xl font-semibold">
                <InputOTPSlot index={0} className="rounded-md size-12 border" />
                <InputOTPSlot index={1} className="rounded-md size-12 border" />
                <InputOTPSlot index={2} className="rounded-md size-12 border" />
                <InputOTPSlot index={3} className="rounded-md size-12 border" />
                <InputOTPSlot index={4} className="rounded-md size-12 border" />
                <InputOTPSlot index={5} className="rounded-md size-12 border" />
              </InputOTPGroup>
            </InputOTP>

            <AlertDialogFooter>
              <div className="flex w-full flex-col gap-4">
                <AlertDialogAction
                  onClick={handleSubmit}
                  className="shad-submit-btn h-12"
                  type="button"
                >
                  Submit
                  {isLoading && (
                    < Loader2
                      className="ml-2 animate-spin text-white/70"
                    />
                  )}
                </AlertDialogAction>

                <div className="subtitle-2 mt-2 text-center text-light-100">
                  Didn&apos;t get a code?
                  <Button
                    type="button"
                    variant="link"
                    className="pl-1 text-primary"
                    onClick={handleResendOtp}
                  >
                    Click to resend {isResending && <span><Loader2 size={14} className="shrink-0 animate-spin ml-1   text-primary" /></span>}
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
