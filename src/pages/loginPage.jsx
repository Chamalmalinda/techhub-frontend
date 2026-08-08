import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../components/loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios 
        .post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);

          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }

          toast.success("Login successful!.");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Google login failed. Please try again.");
          setIsLoading(false);
        });
    },
    onError: () => {
      toast.error("Google Login Failed");
    },
    onNonOAuthError: () => {
      toast.error("Google Login Failed");
    },
  });

  async function login() {
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);
    setIsLoading(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful! Welcome back.");
      setIsLoading(false);
    } catch (err) {
      toast.error("Login failed! Please check your credentials and try again.");
      console.log("Error during login:");
      console.log(err);
      setIsLoading(false);
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
            Welcome back
          </h2>

          {/* Email Input */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          {/* Forgot Password */}
          <p className="text-slate-400 text-right mb-4 text-xs">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-cyan-300 hover:underline">
              Reset it here
            </Link>
          </p>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full h-11 mb-3 bg-cyan-500 text-slate-900 font-bold text-sm rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full h-11 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <GrGoogle className="text-base" />
            Login with Google
          </button>

          {/* Register Link */}
          <p className="text-slate-400 text-center mt-5 text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-300 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && <Loader />}
    </div>
  );
}