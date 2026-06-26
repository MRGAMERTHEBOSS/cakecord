import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Sparkles, LogIn } from "lucide-react";
import CakeLogo from "./CakeLogo";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onInviteClick: () => void;
}

export default function Navbar({ activeTab, onTabChange, onInviteClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { name: "Home", tab: "home" },
    { name: "Premium", tab: "premium" },
    { name: "Commands", tab: "commands" },
    { name: "Team", tab: "team" },
    { name: "Changelog", tab: "changelog" },
    { name: "Support", tab: "support" }
  ];

  const handleLinkClick = (tab: string) => {
    setIsMobileMenuOpen(false);
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-5 pointer-events-none md:pt-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl pointer-events-auto rounded-full bg-[#0b0c10]/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
            {/* Logo */}
            <div
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-2 cursor-pointer group shrink-0"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-white/10 p-0.5">
                <CakeLogo size={28} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                CakeCord<span className="text-pink-400 font-bold">.</span>
              </span>
            </div>

            {/* Desktop Center Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.tab;
                return (
                  <button
                    key={link.tab}
                    onClick={() => handleLinkClick(link.tab)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                      isActive ? "text-pink-400" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-pink-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Mobile Hamburger */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              
              {/* Invite Bot CTA */}
              <button
                onClick={onInviteClick}
                className="relative hidden sm:inline-flex items-center justify-center px-4 h-9 text-xs font-semibold tracking-wide rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_4px_12px_rgba(236,72,153,0.15)] hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Invite Bot <ArrowRight size={12} className="text-pink-100" />
                </span>
              </button>

              {/* Dashboard Route button */}
              <button
                onClick={() => handleLinkClick("dashboard")}
                className={`px-4 h-9 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "dashboard"
                    ? "bg-pink-500/15 border-pink-500/30 text-pink-400"
                    : "bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                }`}
              >
                <LogIn size={12} />
                <span>Dashboard</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Glass Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 md:hidden flex flex-col justify-between bg-[#030303]/98 backdrop-blur-2xl px-6 pt-24 pb-8 text-left"
          >
            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full glow-orb-2 opacity-35 pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10 mt-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                / NAVIGATION MENU
              </span>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, idx) => {
                  const isActive = activeTab === link.tab;
                  return (
                    <motion.button
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, ease: "easeOut" }}
                      key={link.tab}
                      onClick={() => handleLinkClick(link.tab)}
                      className={`text-left py-1.5 text-xl font-bold tracking-tight border-b border-zinc-900/40 flex items-center justify-between group cursor-pointer ${
                        isActive ? "text-pink-400" : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={15} className="text-zinc-600 group-hover:text-white transition-colors -translate-x-2 group-hover:translate-x-0" />
                    </motion.button>
                  );
                })}

                {/* Mobile Dashboard */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, ease: "easeOut" }}
                  onClick={() => handleLinkClick("dashboard")}
                  className={`text-left py-1.5 text-xl font-bold tracking-tight border-b border-zinc-900/40 flex items-center justify-between group cursor-pointer ${
                    activeTab === "dashboard" ? "text-pink-400" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>Guild Dashboard</span>
                  <ArrowRight size={15} className="text-zinc-600 group-hover:text-white transition-colors" />
                </motion.button>
              </nav>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onInviteClick();
                }}
                className="w-full h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-xs text-white shadow-lg shadow-pink-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                Invite CakeCord Bot <Sparkles size={12} className="ml-1 text-pink-100" />
              </button>
              <div className="text-center">
                <p className="text-[10px] font-mono text-zinc-500">
                  © {new Date().getFullYear()} CakeCord. Birthdays Made Easy.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
