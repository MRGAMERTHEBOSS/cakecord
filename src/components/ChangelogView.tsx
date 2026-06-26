import React from "react";
import { FileText } from "lucide-react";

export default function ChangelogView() {
  return (
    <div className="relative py-8">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-left">
        <div className="mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / RELEASES & UPDATES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-1.5">
            Changelog
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-lg">
            Keep up with the latest CakeCord improvements, database optimizations, bug fixes, and feature launches.
          </p>
        </div>

        <div className="py-16 text-center max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 border border-zinc-800">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-white text-sm font-bold">0 changelog entries</p>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
              No changelog entries available. There are currently no release notes to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
