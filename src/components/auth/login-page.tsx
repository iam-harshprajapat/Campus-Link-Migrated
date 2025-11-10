"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Lottie from "lottie-react";
import booksAndGirl from "@/assets/lottie/PhoneAnimation.json";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Section - Illustration and Branding */}
      <div className="hidden flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-8 lg:flex">
        <div className="w-full max-w-md text-center">
          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <Lottie
              animationData={booksAndGirl}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* Branding */}
          <h1 className="text-4xl font-bold text-slate-900">Campus Link</h1>
          <p className="mt-2 text-xl font-semibold text-slate-700">
            Join Us Today
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Connect with your educational community and unlock new opportunities
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo - visible on small screens */}
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold text-slate-900">Campus Link</h1>
            <p className="mt-1 text-sm text-slate-600">Join Us Today</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-300 placeholder:text-slate-400 text-slate-900 caret-slate-900  focus-visible:ring-0
    focus-visible:ring-offset-0
    focus:border-blue-500
    outline-none"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-slate-300 placeholder:text-slate-400 text-slate-900 caret-slate-900  focus-visible:ring-0
    focus-visible:ring-offset-0
    focus:border-blue-500
    outline-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              size="lg"
            >
              Log in
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-300"></div>
            <span className="text-sm text-slate-500">OR</span>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Link
              href="/authentication/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                href="/authentication/signup"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
