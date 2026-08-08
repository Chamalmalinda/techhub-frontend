import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgetPasswordPage() {
const [otpSent, setOtpSent] = useState(false);
const [loading, setLoading] = useState(false);
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [email, setEmail] = useState("");
const navigate = useNavigate();


async function resetPassword() {
    if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    setLoading(true);
    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
            email: email,
            otp: otp,
            newPassword: newPassword
        });
        toast.success("Password reset successful");
        setLoading(false);
        navigate("/login");
    } catch (err) {
        console.log(err);
        toast.error("Error resetting the password. Try again later.");
        setLoading(false);
    }
}

async function sendOtp() {
    setLoading(true);
    try {
        await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
        toast.success("OTP sent to your email");
        setLoading(false);
        setOtpSent(true);
    } catch (err) {
        console.log(err);
        toast.error("Error sending OTP. Try again later");
        setLoading(false);
    }
}

return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-4 py-10">
        {/* Ambient background, consistent with login/register */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        {loading && <Loader />}

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
            </div>

            {otpSent ? (
                /** RESET PASSWORD FORM (AFTER OTP SENT) */
                <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/50 p-6 sm:p-7">
                    <h2 className="text-lg font-semibold text-white text-center mb-1">
                        Enter OTP &amp; New Password
                    </h2>
                    <p className="text-xs text-slate-400 text-center mb-5">
                        Code sent to <span className="text-cyan-300">{email}</span>
                    </p>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter New Password"
                        className="w-full h-11 mb-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full h-11 mb-4 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        onClick={resetPassword}
                        disabled={loading}
                        className="w-full h-11 bg-cyan-500 text-slate-900 font-bold text-sm rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Reset Password
                    </button>

                    <button
                        onClick={() => setOtpSent(false)}
                        className="w-full mt-3 text-center text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                        ← Use a different email
                    </button>
                </div>
            ) : (
                /** SEND OTP FORM (BEFORE OTP SENT) */
                <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/50 p-6 sm:p-7">
                    <h2 className="text-lg font-semibold text-white text-center mb-5">
                        Reset Your Password
                    </h2>

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full h-11 mb-4 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={sendOtp}
                        disabled={loading}
                        className="w-full h-11 bg-cyan-500 text-slate-900 font-bold text-sm rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Send OTP
                    </button>
                </div>
            )}
        </motion.div>
    </div>
);


}