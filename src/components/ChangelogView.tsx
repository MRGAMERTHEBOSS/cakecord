import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash, AlertCircle, FileText, Calendar, User, Sparkles, Sliders } from "lucide-react";
import { ChangelogEntry } from "../types";

export default function ChangelogView() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // New entry form state
  const [version, setVersion] = useState("v2.4.1");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"feature" | "improvement" | "fix">("feature");
  const [author, setAuthor] = useState("Connor200024");

  const handleAddEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newEntry: ChangelogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      version,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      title,
      content,
      category,
      author
    };

    setEntries([newEntry, ...entries]);
    setIsAddingEntry(false);
    // Reset form
    setTitle("");
    setContent("");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const seedSampleUpdates = () => {
    const samples: ChangelogEntry[] = [
      {
        id: "seed-1",
        version: "v2.4.0",
        date: "24 Jun 2026",
        title: "Multi-Line Message Templates Unlocked",
        content: "We have completely redesigned custom templates! Server administrators can now write beautiful multiline messages, assign dynamic target mention parameters (like {user} and {age}), and link animated birthday gifs directly from standard Giphy catalogs.",
        category: "feature",
        author: "Connor200024"
      },
      {
        id: "seed-2",
        version: "v2.3.9",
        date: "12 Jun 2026",
        title: "Optimized Timezone Checks & Daily Cron Speed",
        content: "Reduced database querying times during daily midnight schedules by 40%. The bot now queues timezone offsets incrementally, avoiding rate mutes on highly active guilds.",
        category: "improvement",
        author: "Cxntrol"
      },
      {
        id: "seed-3",
        version: "v2.3.8",
        date: "04 Jun 2026",
        title: "Fixed Discord API Client Crash on Reconnects",
        content: "Resolved a rare connection loss event where active shard threads crashed if Discord's gateway server underwent sudden scheduled rollouts.",
        category: "fix",
        author: "Harley200317"
      }
    ];
    setEntries(samples);
  };

  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header and Simulator Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
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

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-3.5 h-9 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                isAdminMode 
                  ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-100"
              }`}
            >
              <Sliders size={12} />
              <span>{isAdminMode ? "Admin Console ON" : "Open Admin Panel"}</span>
            </button>

            {entries.length === 0 && (
              <button
                onClick={seedSampleUpdates}
                className="px-3.5 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
              >
                Seed History
              </button>
            )}
          </div>
        </div>

        {/* Admin simulator dashboard banner */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Sparkles size={14} className="text-pink-400" />
                    <span>Changelog Simulator Controller</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Add releases directly to the view below!</span>
                </div>

                {!isAddingEntry ? (
                  <button
                    onClick={() => setIsAddingEntry(true)}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs tracking-wide shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Create Release Entry</span>
                  </button>
                ) : (
                  <form onSubmit={handleAddEntrySubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Version Tag</label>
                        <input
                          type="text"
                          value={version}
                          onChange={(e) => setVersion(e.target.value)}
                          className="w-full h-9 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full h-9 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 focus:outline-none focus:border-pink-500/50"
                        >
                          <option value="feature">New Feature</option>
                          <option value="improvement">Improvement</option>
                          <option value="fix">Bug Fix</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Author Handle</label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full h-9 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">Release Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Redesigned timezone calendar triggers..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-10 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">Content Description</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Detail the improvements, modules restructured, and files changed..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/40">
                      <button
                        type="button"
                        onClick={() => setIsAddingEntry(false)}
                        className="px-4 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 h-9 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold shadow-md shadow-pink-500/10 cursor-pointer"
                      >
                        Publish Release Log
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Changelog Entries Display Feed */}
        <div className="relative border-l border-zinc-900 pl-4 sm:pl-8 flex flex-col gap-10">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-3.5 h-3.5 rounded-full border border-pink-500 bg-zinc-950 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-mono font-bold text-pink-400">{entry.version}</span>
                    <span className="text-zinc-600 font-mono text-xs">•</span>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar size={11} /> {entry.date}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs">•</span>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <User size={11} /> {entry.author}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase ml-auto sm:ml-0 ${
                      entry.category === "feature"
                        ? "bg-pink-500/10 text-pink-400 border border-pink-500/10"
                        : entry.category === "improvement"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/10"
                        : "bg-red-500/10 text-red-400 border border-red-500/10"
                    }`}>
                      {entry.category}
                    </span>

                    {isAdminMode && (
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 text-zinc-600 hover:text-red-400 rounded transition-colors ml-auto cursor-pointer"
                        title="Delete log"
                      >
                        <Trash size={12} />
                      </button>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">{entry.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {entry.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            /* Default empty-state layout exactly as requested */
            <div className="py-16 text-center max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 border border-zinc-800">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-bold">0 changelog entries</p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  No changelog entries available. Add your first entry to start sharing release updates. Try opening the Admin Panel on the top right to seed sample data!
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
