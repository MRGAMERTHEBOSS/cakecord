import React from "react";
import { ArrowUp, Sparkles, Github, Twitter, Mail, ShieldCheck } from "lucide-react";
import CakeLogo from "./CakeLogo";

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const scrollToTopAndChange = (tab: string) => {
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-14 md:py-16 px-4 md:px-8 border-t border-zinc-900 bg-zinc-950/20 overflow-hidden text-left">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-14">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div
              onClick={() => scrollToTopAndChange("home")}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-white/10 p-0.5">
                <CakeLogo size={28} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-zinc-100 group-hover:text-white transition-colors">
                CakeCord<span className="text-pink-400 font-bold">.</span>
              </span>
            </div>
            
            <p className="text-zinc-500 text-xs sm:text-sm font-normal leading-relaxed max-w-xs">
              Automatic Discord birthday trackers, custom template card announcements, and dynamic birthday roles in one clean, timezone-aware flow.
            </p>

            <div className="flex items-center gap-2.5 mt-2">
              {[
                { icon: <Github size={13} />, url: "https://github.com" },
                { icon: <Twitter size={13} />, url: "https://twitter.com" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/5 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Links Cols */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            
            {/* Capabilities Col */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                / LEGAL DOCUMENTS
              </span>
              <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <button
                  onClick={() => scrollToTopAndChange("privacy")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => scrollToTopAndChange("terms")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span className="text-zinc-600 italic">GDPR Compliant</span>
              </div>
            </div>

            {/* Studio Navigation Col */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                / NAVIGATION
              </span>
              <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <button
                  onClick={() => scrollToTopAndChange("home")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Home Landing
                </button>
                <button
                  onClick={() => scrollToTopAndChange("premium")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Premium Plan
                </button>
                <button
                  onClick={() => scrollToTopAndChange("commands")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Slash Commands
                </button>
                <button
                  onClick={() => scrollToTopAndChange("team")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Meet the Team
                </button>
                <button
                  onClick={() => scrollToTopAndChange("changelog")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Changelog Releases
                </button>
                <button
                  onClick={() => scrollToTopAndChange("support")}
                  className="text-left hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Help Desk Support
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10px] font-mono text-zinc-500">
            <span>© {new Date().getFullYear()} CakeCord. All rights reserved.</span>
            <span className="hidden sm:inline-block text-zinc-800">|</span>
            <span className="flex items-center gap-1">
              <Sparkles size={10} className="text-pink-400" /> Crafted for Discord Communities
            </span>
          </div>

          {/* Back to top click trigger */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp size={11} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
