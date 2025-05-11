"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Apple } from "lucide-react";

export default function AuthComponent() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side – Visual / Benefits */}
      <div className="relative hidden lg:flex flex-col justify-center items-center bg-primary text-white px-10 py-16">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-snug">Level up your skills</h1>
          <p className="text-lg">
            Join thousands of learners achieving their goals. Learn at your own pace,
            anytime, anywhere.
          </p>
          <ul className="space-y-2 text-base">
            <li>✅ Expert instructors</li>
            <li>✅ Progress tracking</li>
            <li>✅ Certifications</li>
          </ul>
        </div>

        <Image
          src="/images/learning-people.png"
          alt="People learning"
          width={500}
          height={500}
          className="absolute bottom-8 right-8 opacity-30"
        />
      </div>

      {/* Right Side – Auth Form */}
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Log in to continue learning
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full flex items-center gap-2">
               G Continue with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Apple className="h-5 w-5" /> Continue with Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or sign in with email</span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="text-right text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
