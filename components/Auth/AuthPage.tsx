import Image from "next/image";
 
import AuthForm from "./AuthForm";
import { Suspense } from "react";

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
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
}
