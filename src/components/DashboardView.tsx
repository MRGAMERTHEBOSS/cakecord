import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, Compass, Calendar, Sliders, CheckCircle2, ChevronRight, ShieldCheck, HelpCircle, Loader2, RefreshCw, Sparkles, LogOut, Check } from "lucide-react";

interface DashboardViewProps {
  isPremiumUnlocked: boolean;
  onUnlockPremium: () => void;
}

const CHANNELS = [
  { id: "chan-1", name: "#birthday-announcements" },
  { id: "chan-2", name: "#general-chat" },
  { id: "chan-3", name: "#moderator-logs" },
  { id: "chan-4", name: "#community-lounge" }
];

const ROLES = [
  { id: "role-1", name: "@Birthday Star", color: "text-pink-400" },
  { id: "role-2", name: "@VIP Celebrant", color: "text-purple-400" },
  { id: "role-3", name: "@Active Member", color: "text-blue-400" },
  { id: "role-4", name: "None (Disable role features)", color: "text-zinc-500" }
];

const SERVERS = [
  { id: "guild-1", name: "Horizon Gaming Guild", iconLetter: "H", members: "1,420", activeBirthdays: "42" },
  { id: "guild-2", name: "Connor's Sweet Cafe", iconLetter: "C", members: "250", activeBirthdays: "12" },
  { id: "guild-3", name: "The Dev Workspace", iconLetter: "D", members: "89", activeBirthdays: "4" }
];

export default function DashboardView({ isPremiumUnlocked, onUnlockPremium }: DashboardViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Dashboard panel state
  const [selectedServerIdx, setSelectedServerIdx] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState("chan-1");
  const [selectedRole, setSelectedRole] = useState("role-1");
  const [customMsg, setCustomMsg] = useState("🎉 Happy Birthday {user}! 🎂 We hope your day is filled with joy! ✨");
  const [timezone, setTimezone] = useState("Europe/London");
  
  const [gifsEnabled, setGifsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Redirect to real Discord OAuth login in a new tab
    window.open("https://discord.com/oauth2/authorize?client_id=1505549918436069477&scope=identify%20email%20guilds&response_type=code&redirect_uri=https%3A%2F%2Fdashboard.cakecord.co.uk%2Fapi%2Fauth%2Fcallback%2Fdiscord&state=rm35NuR5fY1e9NRhUEUri0oyv6iEXttV5moWHcOC1tY", "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 1200);
  };

  const currentServer = SERVERS[selectedServerIdx];

  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full glow-orb-1 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* If Not Logged In, Show Discord Login Portal */}
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto py-16 text-center"
            >
              <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md flex flex-col items-center gap-6">
                
                {/* Visual Lock/Discord Badge */}
                <div className="w-16 h-16 rounded-full bg-[#5865f2]/10 text-[#5865f2] border border-[#5865f2]/20 flex items-center justify-center shadow-lg">
                  <LogIn size={26} />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">CakeCord Server Dashboard</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed max-w-xs mx-auto">
                    Login securely with your Discord credentials to manage announcement channels, birthday role highlights, custom messages, and localized scheduling offsets.
                  </p>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full h-11 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#5865f2]/10"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      <span>Requesting Discord OAuth...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={14} />
                      <span>Login with Discord</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <ShieldCheck size={11} className="text-green-500" />
                  <span>Verified Safe • No password required</span>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* If Logged In, Show Administration Control Panel */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-8"
            >
              {/* Header profile bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                <div className="flex items-center gap-4">
                  {/* Mock user avatar */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-white text-sm">Alex#0001</span>
                      <span className="text-[9px] bg-[#5865f2]/10 text-[#5865f2] font-mono px-1.5 py-0.2 rounded font-bold">STAFF</span>
                    </div>
                    <p className="text-zinc-500 text-xs mt-0.5">Managing {SERVERS.length} communities</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto sm:ml-0">
                  {isPremiumUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold font-mono uppercase">
                      <Sparkles size={11} />
                      <span>Server Premium Active</span>
                    </span>
                  ) : (
                    <button
                      onClick={onUnlockPremium}
                      className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-pink-400 border border-zinc-700/80 hover:border-pink-500/30 text-[10px] font-bold font-mono uppercase transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles size={11} />
                      <span>Unlock Premium Features</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-red-500/20 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </div>

              {/* Server Select & Settings Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Servers Selector */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase">
                    / SELECT COMMUNITY
                  </h4>

                  <div className="flex flex-col gap-2.5">
                    {SERVERS.map((srv, idx) => {
                      const isSelected = selectedServerIdx === idx;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServerIdx(idx)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-zinc-900/80 border-pink-500/30 shadow-[0_4px_20px_rgba(236,72,153,0.04)]"
                              : "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 font-black flex items-center justify-center text-sm ${
                              isSelected ? "text-pink-400 border-pink-500/20 bg-pink-500/5" : "text-zinc-500"
                            }`}>
                              {srv.iconLetter}
                            </div>
                            <div>
                              <p className="font-bold text-white text-xs sm:text-sm leading-normal">{srv.name}</p>
                              <p className="text-zinc-500 text-xs mt-0.5">{srv.members} members • {srv.activeBirthdays} birthdays</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className={isSelected ? "text-pink-400" : "text-zinc-600"} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Server Administration form */}
                <div className="lg:col-span-8">
                  <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">{currentServer.name} Settings</h3>
                        <p className="text-zinc-500 text-xs mt-0.5">Modify parameters for direct Discord synchronization.</p>
                      </div>
                      <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2.5 py-0.5 rounded font-mono font-bold">
                        GUILD ID: {currentServer.id}
                      </span>
                    </div>

                    <form onSubmit={handleSave} className="flex flex-col gap-5">
                      
                      {/* Form rows */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Channel selector */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
                            <span>Announcement Channel</span>
                            {!isPremiumUnlocked && <span className="text-pink-400 font-extrabold text-[8px] tracking-wider uppercase">PREMIUM</span>}
                          </label>
                          <select
                            value={selectedChannel}
                            onChange={(e) => setSelectedChannel(e.target.value)}
                            disabled={!isPremiumUnlocked}
                            className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white disabled:opacity-50 focus:outline-none focus:border-pink-500/50"
                          >
                            {CHANNELS.map((ch) => (
                              <option key={ch.id} value={ch.id}>
                                {ch.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Birthday Role */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
                            <span>Birthday Highlight Role</span>
                            {!isPremiumUnlocked && <span className="text-pink-400 font-extrabold text-[8px] tracking-wider uppercase">PREMIUM</span>}
                          </label>
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            disabled={!isPremiumUnlocked}
                            className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white disabled:opacity-50 focus:outline-none focus:border-pink-500/50"
                          >
                            {ROLES.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Timezone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Server-wide Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                        >
                          <option value="Europe/London">Europe/London (GMT/BST)</option>
                          <option value="America/New_York">America/New_York (EST/EDT)</option>
                          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                          <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                          <option value="UTC">UTC / Greenwich Mean Time</option>
                        </select>
                      </div>

                      {/* Announcement message text */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
                          <span>Announcement Message Template</span>
                          <span className="text-zinc-600 lowercase font-normal">Supports {"{user}"} and {"{age}"} tags</span>
                        </label>
                        <textarea
                          rows={3}
                          value={customMsg}
                          onChange={(e) => setCustomMsg(e.target.value)}
                          placeholder="🎉 Happy Birthday {user}! 🎂 We appreciate you!"
                          className="w-full p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50 resize-none"
                        />
                      </div>

                      {/* Toggles */}
                      <div className="border-t border-zinc-900 pt-4 flex flex-col gap-3.5">
                        {/* Gif Toggle */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>Attach Animated Greetings Gifs</span>
                              {!isPremiumUnlocked && <span className="bg-pink-500/10 text-pink-400 font-bold font-mono text-[8px] px-1.5 py-0.2 rounded uppercase tracking-wider">PREMIUM</span>}
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Embed animated card reactions matching celebration themes.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => isPremiumUnlocked && setGifsEnabled(!gifsEnabled)}
                            disabled={!isPremiumUnlocked}
                            className={`w-10 h-6.5 rounded-full p-1 transition-all duration-300 disabled:opacity-40 cursor-pointer ${
                              gifsEnabled && isPremiumUnlocked ? "bg-pink-500 flex justify-end" : "bg-zinc-800 flex justify-start"
                            }`}
                          >
                            <div className="w-4.5 h-4.5 rounded-full bg-white" />
                          </button>
                        </div>

                        {/* Reminders Toggle */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>Early Announcement Reminders</span>
                              {!isPremiumUnlocked && <span className="bg-pink-500/10 text-pink-400 font-bold font-mono text-[8px] px-1.5 py-0.2 rounded uppercase tracking-wider">PREMIUM</span>}
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Ping administrators or moderators 24 hours prior to member birthdays.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => isPremiumUnlocked && setRemindersEnabled(!remindersEnabled)}
                            disabled={!isPremiumUnlocked}
                            className={`w-10 h-6.5 rounded-full p-1 transition-all duration-300 disabled:opacity-40 cursor-pointer ${
                              remindersEnabled && isPremiumUnlocked ? "bg-pink-500 flex justify-end" : "bg-zinc-800 flex justify-start"
                            }`}
                          >
                            <div className="w-4.5 h-4.5 rounded-full bg-white" />
                          </button>
                        </div>
                      </div>

                      {/* Save Panel button */}
                      <div className="border-t border-zinc-900 pt-5 flex items-center justify-end gap-3.5">
                        {saveStatus === "saved" && (
                          <span className="text-green-400 text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                            <Check size={14} />
                            <span>Saved to Discord server!</span>
                          </span>
                        )}

                        <button
                          type="submit"
                          disabled={saveStatus === "saving"}
                          className="px-6 h-11 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {saveStatus === "saving" ? (
                            <>
                              <RefreshCw className="animate-spin" size={13} />
                              <span>Syncing Configurations...</span>
                            </>
                          ) : (
                            <span>Save Settings</span>
                          )}
                        </button>
                      </div>

                    </form>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
