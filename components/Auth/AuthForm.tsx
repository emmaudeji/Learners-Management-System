'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "./OtpModal";
import { CustomInput } from "../shared/CustomInput";
import { urls } from "@/constants/admin";
import { Loader2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ErrorCard } from "../common/ErrorCard";
import { useGlobal } from "@/context/RootContext";

const AuthForm = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('q') || "sign-in"
  const {  setIsNewUser} = useGlobal()

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (type === "sign-up" && !formData.fullName.trim()) {
      setErrorMessage("Full name is required");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Valid email is required");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const response = type === "sign-up"
        ? await createAccount({ fullName: formData.fullName, email: formData.email })
        : await signInUser({ email: formData.email });
  
      // console.log(response);
  
      if (response.success) {
        setAccountId(response.accountId || "");
        type === "sign-up" && setIsNewUser(true)
      } else {
        setErrorMessage(response.error || "Authentication failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage((error as Error)?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="mx-auto w-full max-w-md flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

        <h4 className="font-bold text-4xl pb-4 text-center">
          {type === "sign-in" ? 
          "Sign in to continue learning" : 
          "Sign up with email"}
        </h4>

        {type === "sign-up" && (
          <CustomInput
            label="Full name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="h-12 text-lg font-medium "
          />
        )}
        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
            className="h-12 text-lg font-medium "
          required
        />


        <Button type="submit" className="h-12 text-lg" disabled={isLoading}>
          {isLoading ?  
            <Loader2 className="ml-2 size-6 animate-spin" /> :
            <Mail className="size-6"/>
           }
          Continue with email
        </Button>

        <div className="flex w-full items-center gap-4"><hr className="border flex-1"/> 
           <span className="shrink-0  ">or </span>
        <hr className="border flex-1"/></div>

        <Button variant={'outline'} type="submit" className="h-12 border- text-lg bg-transparent text-foreground" disabled={isLoading}>
          <Mail className="size-6"/>
          Continue with Gmail
        </Button>


        {errorMessage && <ErrorCard message={errorMessage} /> }

        <div className="body-2 flex justify-center">
          <p className="">
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href={type === "sign-in" ? `?q=sign-up` : `?q=sign-in`} className="ml-1 font-medium text-primary underline">
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </div>

      </form>
      {accountId && <OtpModal email={formData.email} accountId={accountId} setAccountId={setAccountId} />}
    </section>
  );
};

export default AuthForm;
