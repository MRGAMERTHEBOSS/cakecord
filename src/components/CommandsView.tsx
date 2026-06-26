import React, { useState } from "react";
import { Search, Sparkles, Code, Terminal, Compass, Check, ShieldAlert, ArrowRight } from "lucide-react";

const COMMAND_LIST = [
  {
    name: "/birthdays set",
    usage: "/birthdays set month: <MM> day: <DD> [timezone: <string>]",
    desc: "Register or update your birth date in the system's database.",
    category: "free",
    params: [
      { name: "month", desc: "The month of your birthday (1-12)", required: true },
      { name: "day", desc: "The day of your birthday (1-31)", required: true },
      { name: "timezone", desc: "Your local timezone (e.g. Europe/London, America/New_York)", required: false }
    ],
    example: "/birthdays set month: 09 day: 24 timezone: Europe/London"
  },
  {
    name: "/birthdays remove",
    usage: "/birthdays remove",
    desc: "Remove your registered birth date completely from the bot's memory.",
    category: "free",
    params: [],
    example: "/birthdays remove"
  },
  {
    name: "/birthdays view",
    usage: "/birthdays view user: [@member]",
    desc: "View the birthday details and configurations for a specific server member.",
    category: "free",
    params: [
      { name: "user", desc: "The member you want to inspect", required: true }
    ],
    example: "/birthdays view user: @Connor200024"
  },
  {
    name: "/birthdays list",
    usage: "/birthdays list [page: <number>]",
    desc: "See a chronologically ordered list of upcoming birthdays in your community.",
    category: "free",
    params: [
      { name: "page", desc: "Page number to view (defaults to 1)", required: false }
    ],
    example: "/birthdays list page: 1"
  },
  {
    name: "/birthdays timezone",
    usage: "/birthdays timezone",
    desc: "Explore lists of available timezone tags compatible with birthday scheduling.",
    category: "free",
    params: [],
    example: "/birthdays timezone"
  },
  {
    name: "/birthdays setup",
    usage: "/birthdays setup",
    desc: "Triggers the standard server setup wizard to configure basic parameters.",
    category: "free",
    params: [],
    example: "/birthdays setup"
  },
  {
    name: "/template create",
    usage: "/template create id: <string> message: <string>",
    desc: "Create customized and rich multiline message templates.",
    category: "premium",
    params: [
      { name: "id", desc: "The identifier tag for this template", required: true },
      { name: "message", desc: "The custom text (supports {user} and {age})", required: true }
    ],
    example: "/template create id: epic_card message: Happy Birthday {user}! 🎂 We appreciate you! 🎉"
  },
  {
    name: "/template send",
    usage: "/template send template_id: <string> target_user: [@member]",
    desc: "Manually fire or test a selected birthday announcement template in chat.",
    category: "premium",
    params: [
      { name: "template_id", desc: "The ID tag of the template to trigger", required: true },
      { name: "target_user", desc: "The member who gets targeted", required: true }
    ],
    example: "/template send template_id: epic_card target_user: @Connor200024"
  },
  {
    name: "/template list",
    usage: "/template list",
    desc: "Lists all registered active custom templates saved in your server database.",
    category: "premium",
    params: [],
    example: "/template list"
  },
  {
    name: "/settings role",
    usage: "/settings role assign_role: [@role]",
    desc: "Configure the decorative birthday highlight role given to celebrated members.",
    category: "premium",
    params: [
      { name: "assign_role", desc: "The server role assigned dynamically", required: true }
    ],
    example: "/settings role assign_role: @Birthday Star"
  },
  {
    name: "/settings channel",
    usage: "/settings channel text_channel: [#channel]",
    desc: "Configures the specific text channel where birthday announcements are logged.",
    category: "premium",
    params: [
      { name: "text_channel", desc: "Announcements landing channel", required: true }
    ],
    example: "/settings channel text_channel: #announcements"
  },
  {
    name: "/settings reminders",
    usage: "/settings reminders enable: <boolean> time: <HH:MM>",
    desc: "Toggle and configure advanced early reminder alerts for community administrators.",
    category: "premium",
    params: [
      { name: "enable", desc: "Toggle reminders active or inactive", required: true },
      { name: "time", desc: "Standard hour-minute tag (24h clock)", required: true }
    ],
    example: "/settings reminders enable: true time: 09:00"
  }
];

export default function CommandsView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "free" | "premium">("all");
  const [selectedCommandIdx, setSelectedCommandIdx] = useState(0);

  const filteredCommands = COMMAND_LIST.filter((cmd) => {
    const matchesSearch = cmd.name.toLowerCase().includes(search.toLowerCase()) || 
                          cmd.desc.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || cmd.category === filter;
    return matchesSearch && matchesFilter;
  });

  const selectedCmd = COMMAND_LIST[selectedCommandIdx] || COMMAND_LIST[0];

  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full glow-orb-1 opacity-25 pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="flex flex-col items-start gap-3.5 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / TELEMETRY & CONTROLS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Control CakeCord With Slash Commands
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Configure your birthday workflow directly inside Discord. These commands are simple, fast, type-safe, and built with standard autocomplete for moderators.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Commands Navigation & Search */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50 transition-colors"
                />
              </div>

              {/* Filter */}
              <div className="flex rounded-xl bg-zinc-900/40 border border-zinc-800 p-1 shrink-0">
                {(["all", "free", "premium"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFilter(mode)}
                    className={`px-4.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      filter === mode
                        ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                        : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Command List */}
            <div className="flex flex-col gap-2.5 max-h-[550px] overflow-y-auto no-scrollbar pr-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => {
                  const originalIdx = COMMAND_LIST.findIndex((c) => c.name === cmd.name);
                  const isSelected = selectedCommandIdx === originalIdx;
                  return (
                    <div
                      key={cmd.name}
                      onClick={() => setSelectedCommandIdx(originalIdx)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                        isSelected
                          ? "bg-zinc-900/80 border-pink-500/30 shadow-[0_4px_20px_rgba(236,72,153,0.04)]"
                          : "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono font-bold text-sm text-white">{cmd.name}</span>
                        <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                          cmd.category === "premium" ? "bg-pink-500/10 text-pink-400" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {cmd.category}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed">{cmd.desc}</p>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 rounded-xl border border-dashed border-zinc-800 text-center text-zinc-500 text-xs">
                  No matching commands found.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0d0e] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] font-mono text-left">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Terminal size={14} className="text-pink-400" />
                  <span>Interactive Command Shell</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Shell Content */}
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <p className="text-zinc-600 mb-1"># Command Signature</p>
                  <p className="text-pink-400 font-bold">{selectedCmd.name}</p>
                </div>

                <div>
                  <p className="text-zinc-600 mb-1"># Complete Usage</p>
                  <p className="text-zinc-200 select-all p-2 rounded bg-zinc-950 border border-zinc-900 leading-normal">
                    {selectedCmd.usage}
                  </p>
                </div>

                {/* Parameters Breakdown */}
                {selectedCmd.params.length > 0 && (
                  <div>
                    <p className="text-zinc-600 mb-2"># Parameters List</p>
                    <div className="flex flex-col gap-2 bg-zinc-950/40 p-3 rounded border border-zinc-900">
                      {selectedCmd.params.map((param, pIdx) => (
                        <div key={pIdx} className="flex flex-col gap-0.5 border-b border-zinc-900 pb-1.5 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-300 font-bold">
                              {param.name}
                            </span>
                            <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                              param.required ? "bg-red-500/10 text-red-400" : "bg-zinc-800 text-zinc-500"
                            }`}>
                              {param.required ? "required" : "optional"}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-normal">{param.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-zinc-600 mb-1"># Shell Example</p>
                  <div className="p-3.5 rounded-lg bg-[#070708] border border-zinc-900 flex items-center justify-between group">
                    <span className="text-zinc-400 overflow-x-auto whitespace-pre no-scrollbar">{selectedCmd.example}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>CakeCord Handlers v2.4.0</span>
                  <span className="text-pink-500">Auto-suggest active</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
