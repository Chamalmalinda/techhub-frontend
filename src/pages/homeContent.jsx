import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SLOGANS = [
  "Custom-built rigs for work, study, and play.",
  "Genuine parts. Reliable service. Zero drama.",
  "From student laptops to pro workstations — we’ve got you."
];

// Large orbit for the "Ready to Level Up?" section (bleeds off the edge)
const ORBIT_ITEMS = [
  { radius: 110, duration: 16, angle: 0, icon: "laptop" },
  { radius: 110, duration: 16, angle: 180, icon: "mouse" },
  { radius: 170, duration: 24, angle: 90, icon: "chip" },
  { radius: 170, duration: 24, angle: 270, icon: "ram" },
];

function OrbitIcon({ type }) {
  const stroke = "#67e8f9";
  switch (type) {
    case "laptop":
      return (
        <g>
          <rect x="-10" y="-7" width="20" height="13" rx="1.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M-13 7 H13 L11 10.5 H-11 Z" fill="none" stroke={stroke} strokeWidth="1.4" />
        </g>
      );
    case "mouse":
      return (
        <g>
          <rect x="-5" y="-9" width="10" height="16" rx="5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <line x1="0" y1="-9" x2="0" y2="-2" stroke={stroke} strokeWidth="1.2" />
        </g>
      );
    case "chip":
      return (
        <g>
          <rect x="-9" y="-9" width="18" height="18" rx="2" fill="none" stroke={stroke} strokeWidth="1.4" />
          <rect x="-3" y="-3" width="6" height="6" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="-9" y1="-4" x2="-13" y2="-4" stroke={stroke} strokeWidth="1" />
          <line x1="-9" y1="4" x2="-13" y2="4" stroke={stroke} strokeWidth="1" />
          <line x1="9" y1="-4" x2="13" y2="-4" stroke={stroke} strokeWidth="1" />
          <line x1="9" y1="4" x2="13" y2="4" stroke={stroke} strokeWidth="1" />
        </g>
      );
    case "ram":
    default:
      return (
        <g>
          <rect x="-3" y="-11" width="6" height="22" rx="1" fill="none" stroke={stroke} strokeWidth="1.4" />
          <line x1="-1.5" y1="-6" x2="1.5" y2="-6" stroke={stroke} strokeWidth="1" />
          <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke={stroke} strokeWidth="1" />
          <line x1="-1.5" y1="6" x2="1.5" y2="6" stroke={stroke} strokeWidth="1" />
        </g>
      );
  }
}

function MiniOrbit() {
  return (
    <svg viewBox="0 0 600 600" className="w-full h-full">
      {[110, 170].map((r) => (
        <circle
          key={r}
          cx="300" cy="300" r={r}
          fill="none"
          stroke="#67e8f9"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      ))}
      <circle cx="300" cy="300" r="30" fill="#22d3ee" opacity="0.12" />

      {ORBIT_ITEMS.map((item, i) => (
        <motion.g
          key={i}
          style={{ transformBox: "view-box", transformOrigin: "300px 300px" }}
          initial={{ rotate: item.angle }}
          animate={{ rotate: item.angle + 360 }}
          transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
        >
          <g transform={`translate(${300 + item.radius}, 300)`}>
            <motion.g
              initial={{ rotate: -item.angle }}
              animate={{ rotate: -item.angle - 360 }}
              transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
            >
              <g transform="scale(1.7)">
                <OrbitIcon type={item.icon} />
              </g>
            </motion.g>
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
    
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 mb-4">
            Tech Hub • Since 2015
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            Upgrade Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Tech Game
            </span>
            .<br />
            With Trusted Hardware & Service.
          </h1>

  
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mt-10 min-h-[3rem] text-lg sm:text-xl md:text-2xl font-medium text-cyan-100"
          >
            {SLOGANS[activeIndex]}
          </motion.p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold text-slate-900 shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/60 hover:scale-105"
            >
              Shop Products
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-white/5 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold text-slate-100 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-white/10 hover:scale-105"
            >
              Learn About Us
            </Link>
          </div>
        </motion.div>
      </section>

 
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-wide text-cyan-300">
              Laptops & Desktops
            </p>
            <p className="mt-3 text-xl font-semibold">Branded & Custom Builds</p>
            <p className="mt-4 text-gray-300">From budget-friendly to high-performance machines tailored to your needs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-8 backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-wide text-cyan-300">
              Repairs, Upgrades & Guidance
            </p>
            <p className="mt-3 text-xl font-semibold">Diagnostics, SSD, RAM & More</p>
            <p className="mt-4 text-gray-300">Fast, reliable service with genuine parts and expert advice.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-wide text-cyan-300">
              Support
            </p>
            <p className="mt-3 text-xl font-semibold">Friendly Guidance for Every Customer</p>
            <p className="mt-4 text-gray-300">We’re here to help — before, during, and long after your purchase.</p>
          </motion.div>
        </div>
      </section>

    
      <section className="py-20 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-black/40 p-10 backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Hot Right Now
              </p>
              <p className="mt-4 text-2xl font-bold text-white">
                Student & Work-from-Home Packs
              </p>
              <p className="mt-3 text-gray-300">
                Pre-configured laptops tuned for assignments, Zoom, and everyday productivity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-10 backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Gaming & Creators
              </p>
              <p className="mt-4 text-2xl font-bold text-white">
                High FPS, Low Latency Builds
              </p>
              <p className="mt-3 text-cyan-100">
                RTX-powered systems with fast SSDs and optimized cooling for peak performance.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-10 backdrop-blur-md text-center"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Our Service Promise
            </p>
            <p className="mt-4 text-2xl font-bold text-white">
              Transparent pricing, genuine parts, and clear communication on every job.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <span className="rounded-full bg-white/10 px-5 py-2">Warranty-backed hardware</span>
              <span className="rounded-full bg-white/10 px-5 py-2">Data-safe repairs</span>
              <span className="rounded-full bg-white/10 px-5 py-2">Island-wide customers</span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <Link
                to="/contacts"
                className="underline-offset-4 hover:underline text-cyan-300"
              >
                Talk to our team
              </Link>
              <span className="text-slate-400">•</span>
              <Link
                to="/orders"
                className="underline-offset-4 hover:underline text-slate-200"
              >
                Track your orders
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-indigo-900/30 to-violet-900/30" />

        {/* large orbiting computer-parts animation — half bleeds off the right edge */}
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] opacity-70">
          <MiniOrbit />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8">
            Ready to Level Up?
          </h2>
          <p className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto justify-center">
            Whether you're a student, gamer, creator, or professional, we’ll help you find or build the perfect setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold text-slate-900 shadow-2xl shadow-cyan-500/50 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/70 hover:scale-110"
            >
              START SHOPPING NOW
            </Link>
            <a
              href="https://wa.me/94712222222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-cyan-400 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold text-cyan-400 backdrop-blur-md transition-all hover:bg-cyan-400/10 hover:scale-110"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}