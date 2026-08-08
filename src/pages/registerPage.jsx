import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../components/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
    if (firstName.trim() === "") {
      toast.error("First name is required");
      return;
    }
    if (lastName.trim() === "") {
      toast.error("Last name is required");
      return;
    }
    if (email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      toast.success("Registration successful! Welcome to I computers.");
      navigate("/login");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      
      // Handle specific error responses
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Registration failed! Please check your data and try again.");
      } else if (err.response?.status === 409) {
        toast.error("This email is already registered. Please use a different email or try logging in.");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Registration failed! Please check your data and try again.");
      }
      console.log(err);
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-4 py-10">
      {/* Ambient background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-130"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/92 to-black" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Compact brand header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-white rounded-xl px-4 py-2 mb-4 shadow-lg shadow-black/40">
            <img src="/logo.png" alt="logo" className="h-10 object-contain" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Tech Hub
          </p>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold text-white">
            Plug In. Power Up. Play Hard.
          </h1>
        </div>

        {/* Form card */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/50 p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-white text-center mb-5">
            Create your account
          </h2>

          {/* First Name */}
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Your first name"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Last Name */}
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Your last name"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Email */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Password */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Confirm Password */}
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full h-11 mb-4 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Register Button */}
          <button
            onClick={register}
            disabled={isLoading}
            className="w-full h-11 mb-3 bg-cyan-500 text-slate-900 font-bold text-sm rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Register Now
          </button>

          {/* Login Link */}
          <p className="text-slate-400 text-center mt-2 text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>

      {isLoading && <Loader />}
    </div>
  );
}