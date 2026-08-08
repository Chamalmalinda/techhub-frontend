import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse, LuX } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import UserData from "./userData";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contacts", label: "Contacts" },
];

export function Header(){
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return(
        <header className="sticky top-0 z-30">
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-[100px] bg-black/95 backdrop-blur-xl flex items-center px-4 lg:px-8 gap-4"
            >
                {/* Mobile menu trigger */}
                <button
                    onClick={()=>{setSideBarOpen(true)}}
                    className="lg:hidden flex items-center justify-center h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
                    aria-label="Open menu"
                >
                    <LuListCollapse className="text-xl" />
                </button>

                {/* Logo */}
                <div className="h-[60%] shrink-0 bg-white rounded-xl px-3 py-2 inline-flex items-center items-cente shadow-md shadow-black/30">
                    <img src="/logo.png" className="h-[70%] w-auto object-contain" alt="logo"/>
                </div>

                {/* Desktop nav */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${
                                isActive(link.to) ? "text-white" : "text-slate-300 hover:text-white"
                            }`}
                        >
                            {isActive(link.to) && (
                                <motion.span
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 border border-cyan-400/30"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right cluster */}
                <div className="flex items-center gap-3 lg:gap-5 ml-auto lg:ml-0">
                    <div className="hidden lg:flex items-center">
                        <UserData />
                    </div>

                    <Link
                        to="/cart"
                        className="flex items-center justify-center h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-white text-lg hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
                        aria-label="Cart"
                    >
                        <BiShoppingBag/>
                    </Link>
                </div>
            </motion.div>

            {/* Signature gradient line — echoes the homepage hero gradient */}
            <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-60" />

            {/* Mobile drawer */}
            <AnimatePresence>
            {sideBarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/70 backdrop-blur-sm z-40"
                    onClick={() => setSideBarOpen(false)}
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="relative w-[290px] h-screen bg-black border-r border-white/10 flex flex-col overflow-hidden shadow-2xl shadow-black/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* decorative glow, matches homepage's promo-banner treatment */}
                        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-10 -left-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                        <div className="relative w-full h-[100px] flex items-center justify-between px-5 border-b border-white/10">
                            <div className="h-[56%] flex items-center bg-white rounded-xl px-3 shadow-md shadow-black/30">
                                <img src="/logo.png" className="h-[70%] w-auto object-contain" alt="logo"/>
                            </div>
                            <button
                                onClick={()=>{ setSideBarOpen(false)}}
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-cyan-300 transition-colors"
                                aria-label="Close menu"
                            >
                                <LuX className="text-xl" />
                            </button>
                        </div>

                        <nav className="relative flex flex-col gap-1 px-4 pt-6">
								<a
									className={`px-4 py-3 rounded-lg text-base transition-colors border-l-2 ${isActive('/') ? 'text-white font-semibold bg-gradient-to-r from-cyan-500/15 to-transparent border-cyan-400' : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white'}`}
									href="/"
									onClick={() => setSideBarOpen(false)}
								>
									Home
								</a>
								<a
									className={`px-4 py-3 rounded-lg text-base transition-colors border-l-2 ${isActive('/products') ? 'text-white font-semibold bg-gradient-to-r from-cyan-500/15 to-transparent border-cyan-400' : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white'}`}
									href="/products"
									onClick={() => setSideBarOpen(false)}
								>
									Products
								</a>
								<a
									className={`px-4 py-3 rounded-lg text-base transition-colors border-l-2 ${isActive('/about') ? 'text-white font-semibold bg-gradient-to-r from-cyan-500/15 to-transparent border-cyan-400' : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white'}`}
									href="/about"
									onClick={() => setSideBarOpen(false)}
								>
									About
								</a>
                                <a
									className={`px-4 py-3 rounded-lg text-base transition-colors border-l-2 ${isActive('/contacts') ? 'text-white font-semibold bg-gradient-to-r from-cyan-500/15 to-transparent border-cyan-400' : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white'}`}
									href="/contacts"
									onClick={() => setSideBarOpen(false)}
								>
									Contact
								</a>
                        </nav>

                        <div className="relative mt-auto p-5 border-t border-white/10">
                            <div className="flex justify-center items-center bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-300">
								<UserData />
							</div>
                        </div>
                    </motion.div>
                </motion.div>
             )}
             </AnimatePresence>
        </header>
    )
}