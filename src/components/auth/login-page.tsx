"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Lottie from "lottie-react";
import booksAndGirl from "@/assets/lottie/PhoneAnimation.json";
import { useAuth } from "@/context/authContext";
import { useNotification } from "../shared/notification/notificationProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, loading } = useAuth();
  const {showNotification} =useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      showNotification("Login Successfull","success");
      router.push("/feed");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      showNotification(err.message,"error");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Section - Illustration and Branding */}
      <div className="hidden flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-8 lg:flex">
        <div className="w-full max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Lottie
              animationData={booksAndGirl}
              loop={true}
              className="w-full h-full"
            />
          </div>
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
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold text-slate-900">Campus Link</h1>
            <p className="mt-1 text-sm text-slate-600">Join Us Today</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              size="lg"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-300"></div>
            <span className="text-sm text-slate-500">OR</span>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          <div className="text-center">
            <Link
              href="/authentication/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-600">
              Don’t have an account?{" "}
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
