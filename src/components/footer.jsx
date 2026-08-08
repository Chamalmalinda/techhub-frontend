import { Link } from "react-router-dom";
import { BiMapPin, BiPhone, BiMailSend, BiChevronRight } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-auto">
      {/* Signature gradient line — echoes the header */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-60" />

      {/* Top Section - Main Content */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* Brand & Logo */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center shadow-md shadow-black/30">
                  <img
                    src="/logo.png"
                    alt="Tech Hub Logo"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Premium custom PC builds, genuine components, expert repairs, and trusted IT solutions across Sri Lanka since 2015.
              </p>
              <p className="text-xs font-medium text-cyan-400">
                Your vision. Our expertise. Built to perform.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:ml-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <BiChevronRight className="text-cyan-400" />
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-6"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-6"></span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-6"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="text-slate-300 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-6"></span>
                    Contact
                  </Link>
                </li>

              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <BiChevronRight className="text-cyan-400" />
                Our Services
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>Custom PC Building</li>
                <li>Gaming Rig Assembly</li>
                <li>Laptop & Desktop Repairs</li>
                <li>Component Upgrades</li>
                <li>On-site IT Support</li>
                <li>Data Recovery</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <BiChevronRight className="text-cyan-400" />
                Get in Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <BiMapPin className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">
                    58/40/A, Hiripitiya,<br />
                    Pannipitiya, Sri Lanka
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <BiPhone className="text-cyan-400" />
                  <a href="tel:+94701771543" className="text-slate-300 hover:text-cyan-400 transition">
                    070 177 1543
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BiMailSend className="text-cyan-400" />
                  <a href="mailto:info@techhub.com" className="text-slate-300 hover:text-cyan-400 transition">
                    info@techhub.com
                  </a>
                </li>
                <li className="flex items-center gap-3">

                  <a 
                    href="https://wa.me/94701771543" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-cyan-400 transition font-medium"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="bg-black/60 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-cyan-400">Tech Hub</span>. 
            All rights reserved. | Crafted with precision in Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
}