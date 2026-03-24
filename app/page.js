"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email & password");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 animate-gradient opacity-90" />

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full top-[-120px] left-[-100px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full bottom-[-100px] right-[-80px] animate-pulse" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-black text-center">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400 text-center mt-2 mb-6 text-sm">
          Sign in to continue to your dashboard
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-black-300 text-sm mb-1 block">Email</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <HiOutlineMail className="text-black-400 text-lg" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 bg-transparent text-black placeholder-gray-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-black-300 text-sm mb-1 block">Password</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <HiOutlineLockClosed className="text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-transparent text-black placeholder-gray-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* 🔥 Premium Login Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleLogin}
          disabled={loading}
          className="relative w-full p-[2px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative bg-slate-900 text-white p-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </div>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400 text-xs">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* 🔥 Google Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white/90 backdrop-blur text-gray-800 p-3 rounded-xl font-medium hover:bg-white transition shadow-md hover:shadow-lg"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </motion.button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 Secure App. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}