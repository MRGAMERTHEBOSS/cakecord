import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Shield, Users, Compass, Sliders, Clock, ArrowRight, Play, Cake, Sparkles, AlertCircle } from "lucide-react";
import CakeLogo from "./CakeLogo";

interface HomeViewProps {
  onTabChange: (tab: string) => void;
  onInviteClick: () => void;
}

const TEMPLATES = [
  {
    text: "🎉 Happy Birthday {user}! 🎂 We hope your day is filled with joy, laughter, and lots of delicious cake! Enjoy your special day! 🎈✨",
    color: "border-pink-500/30",
    bgColor: "bg-pink-500/10",
    tagColor: "text-pink-400 bg-pink-500/10",
    gif: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    text: "🎈 Let's celebrate! 🎉 Happy Birthday to our awesome community member {user}! 🥳 Have a fantastic year ahead! 🍰💖",
    color: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    tagColor: "text-purple-400 bg-purple-500/10",
    gif: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80"
  },
  {
    text: "🎂 It's a special day! 🎉 Sending warmest wishes and a giant slice of virtual cake to {user}! Happy Birthday! 🧁🎊",
    color: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    tagColor: "text-blue-400 bg-blue-500/10",
    gif: "https://images.unsplash.com/photo-1464349110296-4d53f8151671?auto=format&fit=crop&w=400&q=80"
  }
];

export default function HomeView({ onTabChange, onInviteClick }: HomeViewProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState<number>(0);
  const [typedName, setTypedName] = useState<string>("Alex");

  const steps = [
    {
      number: "01",
      title: "Invite CakeCord",
      subtitle: "One-Click Quick Integration",
      description: "Add CakeCord to your Discord server with our simple setup link. Grant standard channel and role permissions to get started.",
      highlight: "Active in server member list"
    },
    {
      number: "02",
      title: "Set Channel & Role",
      subtitle: "Setting up Server Feeds",
      description: "Define where birthday cards get announced and assign an optional server role to celebrate members dynamically.",
      highlight: "#announcements linked"
    },
    {
      number: "03",
      title: "Add Birthdays",
      subtitle: "Member Self-Registration",
      description: "Let your community register their birthdays easily with timezone-aware slash commands. GDPR-compliant and fully secure.",
      highlight: "/birthdays set <MM-DD>"
    },
    {
      number: "04",
      title: "Celebrate Automatically",
      subtitle: "Set & Forget System",
      description: "Sit back and relax. CakeCord fires daily checks, assigns birthday roles, posts customized cards, and clears roles when the day ends.",
      highlight: "Daily automatic posting"
    }
  ];

  const currentTemplate = TEMPLATES[activeTemplateIdx];

  const renderAnnounceText = (text: string, name: string) => {
    const parts = text.split("{user}");
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <span className={`px-1.5 py-0.5 rounded font-semibold text-xs transition-colors ${currentTemplate.tagColor}`}>
          @{name}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="relative py-8">
      {/* Glow Orbs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full glow-orb-2 opacity-40 pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-96 h-96 rounded-full glow-orb-1 opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 pb-16">
        {/* Left column info */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold w-fit"
          >
            <CakeLogo size={14} className="animate-pulse" />
            <span>Discord Birthday Automation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Keep Every Celebration <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              On Time & Effortless.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl"
          >
            CakeCord handles birthday tracking, announcements, and temporary role rewards in one clean, beautiful workflow built for real Discord communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={onInviteClick}
              className="px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Invite To Server</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onTabChange("commands")}
              className="px-6 py-3 rounded-full text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
            >
              View Commands
            </button>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-900 max-w-md mt-4"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">28</p>
              <p className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider">Active Servers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">99.9%</p>
              <p className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider">Bot Uptime</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">10k+</p>
              <p className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider">Celebrations</p>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive Discord Mockup */}
        <div className="lg:col-span-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full rounded-2xl border border-zinc-800 bg-[#1e1f22] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Discord Header */}
            <div className="bg-[#111214] px-4 py-3 flex items-center justify-between border-b border-zinc-950">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-zinc-500 font-semibold font-mono ml-2"># birthday-announcements</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 font-semibold px-2 py-0.5 rounded">BOT</span>
            </div>

            {/* Discord Chat Area */}
            <div className="p-4 flex flex-col gap-4 text-left">
              {/* Message 1 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow p-0.5 overflow-hidden shrink-0">
                  <CakeLogo size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-sm text-pink-300">CakeCord</span>
                    <span className="text-[10px] bg-[#5865f2] text-white font-bold px-1 py-0.2 rounded leading-tight">BOT</span>
                    <span className="text-[10px] text-zinc-500">Today at 12:00 AM</span>
                  </div>

                  {/* Embed Design */}
                  <div className={`mt-2 border-l-4 rounded-r-md p-3.5 bg-[#2b2d31] flex flex-col sm:flex-row gap-4 items-start ${currentTemplate.color}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                        <Sparkles size={12} className="text-pink-400" />
                        <span>Today's Celebration!</span>
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed">
                        {renderAnnounceText(currentTemplate.text, typedName)}
                      </p>
                    </div>

                    {/* Embed Thumbnail / Image */}
                    {currentTemplate.gif && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/5 shrink-0 self-center sm:self-start">
                        <img referrerPolicy="no-referrer" src={currentTemplate.gif} alt="Birthday Celebration" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Live interactive inputs inside mockup */}
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-col gap-3">
                <p className="text-xs font-semibold text-zinc-400">Interactive Preview Controller</p>
                
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Target Member Name</label>
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      placeholder="Type name..."
                      className="w-full h-8 px-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50 transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Choose Announcement Template</label>
                    <button
                      onClick={() => setActiveTemplateIdx((prev) => (prev + 1) % TEMPLATES.length)}
                      className="w-full h-8 px-3 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center justify-between border border-zinc-700 transition-all cursor-pointer"
                    >
                      <span>Template #{activeTemplateIdx + 1}</span>
                      <Play size={10} className="text-zinc-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Slider / Ticker */}
      <div className="border-y border-zinc-900 bg-zinc-950/40 py-6 mb-16 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-around gap-y-4 gap-x-8 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span>Used by gaming communities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Built for mod teams</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Reliable daily scheduling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span>Fast slash-command setup</span>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-center">
        <div className="flex flex-col items-center gap-3.5 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / SIMPLE INTEGRATION
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Setup Once, Celebrate Forever
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            A focused 4-step flow keeps onboarding clean and prevents your server setup from feeling cluttered.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-6 rounded-2xl transition-all duration-300 border cursor-pointer ${
                activeStep === idx
                  ? "bg-zinc-900/90 border-pink-500/30 shadow-[0_15px_30px_rgba(236,72,153,0.06)]"
                  : "bg-zinc-900/30 border-zinc-800/60 hover:border-zinc-800 hover:bg-zinc-900/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono font-bold tracking-wider ${
                  activeStep === idx ? "text-pink-400" : "text-zinc-600"
                }`}>
                  STEP {step.number}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  activeStep === idx ? "bg-pink-500/10 text-pink-400" : "bg-zinc-800/40 text-zinc-500"
                }`}>
                  {step.highlight}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-1">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Feature Highlights */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 text-center mt-8">
        <div className="flex flex-col items-center gap-3.5 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / CORE CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Everything Needed For Birthday Management
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            Four focused features keep your server clean while showing exactly why CakeCord is the ultimate helper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex gap-4 items-start hover:border-zinc-800/80 transition-colors">
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/15 shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">Automatic Birthday Messages</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Post customized embedding templates and matching gifs automatically inside your designated birthday channel. No manual checks or reminders needed.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex gap-4 items-start hover:border-zinc-800/80 transition-colors">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/15 shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">Timezone-Aware Scheduling</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Celebrate every user at the exact beginning of their local day. CakeCord supports global timezones so announcements happen right on time, no matter where members reside.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex gap-4 items-start hover:border-zinc-800/80 transition-colors">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">Temporary Birthday Roles</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Assign a decorative birthday role to highlighted members automatically when their day arrives, and strip it when their birthday concludes. Excellent for community engagement!
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex gap-4 items-start hover:border-zinc-800/80 transition-colors">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/15 shrink-0">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">Slash Command Setup</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Configure channels, decorative roles, custom templates, and global timezones directly from Discord using intuitive Slash Commands. No confusing external consoles required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
