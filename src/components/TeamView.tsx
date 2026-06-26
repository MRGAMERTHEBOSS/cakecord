import React from "react";
import { Github, Twitter, Mail, Code, Terminal, Server, ShieldCheck, Heart } from "lucide-react";

const TEAM_MEMBERS = [
  {
    discordId: "324646179134636043",
    name: "Connor200024",
    avatar: "/assets/pfps/Connor200024.webp",
    role: "Core Team & Lead Developer",
    badge: "FOUNDER",
    color: "from-pink-500 to-purple-600",
    desc: "Hey I'm Connor, the Founder and Lead Developer of Cakecord. I help oprate Cakecord and make sure everything runs smoothly.",
    icon: <Server size={14} className="text-pink-400" />,
    github: "https://github.com/Connor200024",
    twitter: "https://x.com/Connor200024",
    email: "connor@cakecord.co.uk"
  },
  {
    discordId: "259748906378723329",
    name: "Cxntrol",
    avatar: "/assets/pfps/cxntrol02.webp",
    role: "Core Team & Developer",
    badge: "CO-FOUNDER",
    color: "from-purple-500 to-indigo-600",
    desc: "Hi I'm Cxntrol, a Core Team Member and Developer at Cakecord. I help develop and maintain the bot, ensuring it stays up-to-date and runs smoothly.",
    icon: <Code size={14} className="text-purple-400" />,
    github: "https://github.com/Cxntrol02",
    twitter: "https://x.com/cxntrol_022",
    email: "cxntrol@cakecord.co.uk"
  },
  {
    discordId: "251736315001831425",
    name: "Harley200317",
    avatar: "/assets/pfps/harley200317.webp",
    role: "Senior Developer",
    badge: "SR DEV",
    color: "from-indigo-500 to-blue-600",
    desc: "Harley here! I'm the Senior Developer at Cakecord, always tinkering with new features and making sure the codebase is as sweet as the name suggests. If you spot something cool or quirky in Cakecord, there's a good chance I had a hand in it.",
    icon: <Terminal size={14} className="text-indigo-400" />,
    github: "https://github.com/Harley200317",
    twitter: "https://x.com/Harley200317",
    email: "#"
  },
  {
    discordId: "1025152864827473971",
    name: "J",
    avatar: "/assets/pfps/j.webp",
    role: "Operations",
    badge: "OPERATIONS",
    color: "from-blue-500 to-teal-500",
    desc: "J here! I'm part of the Operations team at Cakecord, ensuring everything runs smoothly behind the scenes.",
    icon: <ShieldCheck size={14} className="text-blue-400" />,
    github: "#",
    twitter: "#",
    email: "#"
  },
  {
    discordId: "1464640710476304406",
    name: "Qin",
    avatar: "/assets/pfps/qin.webp",
    role: "Operations",
    badge: "OPERATIONS",
    color: "from-teal-500 to-green-500",
    desc: "Yo I'm Qin! I'm part of the Operations team at Cakecord, helping to keep everything running smoothly.",
    icon: <Heart size={14} className="text-teal-400" />,
    github: "#",
    twitter: "#",
    email: "#"
  }
];

function buildDiscordAvatarUrl(userId: string) {
  const avatarIndex = Number(userId[userId.length - 1]) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${avatarIndex}.png`;
}

export default function TeamView() {
  return (
    <div className="relative py-8">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-3.5 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / THE HUMAN CORE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Meet the Team
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            The talented folks building, operating, and supporting CakeCord across core product design, systems engineering, database scaling, and active Discord community support.
          </p>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 hover:border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Avatar Placeholder with matching name letter */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shadow-lg flex items-center justify-center">
                  <img
                    src={member.avatar || buildDiscordAvatarUrl(member.discordId)}
                    alt={`${member.name} avatar`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-white text-base group-hover:text-pink-400 transition-colors">
                        {member.name}
                      </h3>
                      <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 tracking-wider">
                        {member.badge}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-0.5 flex items-center gap-1">
                      {member.icon}
                      <span>{member.role}</span>
                    </p>
                  </div>
                </div>

                {/* Description Biography */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {member.desc}
                </p>
              </div>

              {/* Social Channels / Action Handles */}
              <div className="border-t border-zinc-900/60 pt-4 flex items-center gap-3">
                {member.github !== "#" ? (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-zinc-100 transition-all"
                  >
                    <Github size={13} />
                  </a>
                ) : (
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-600 opacity-60">
                    <Github size={13} />
                  </span>
                )}

                {member.twitter !== "#" ? (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-zinc-100 transition-all"
                  >
                    <Twitter size={13} />
                  </a>
                ) : (
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-600 opacity-60">
                    <Twitter size={13} />
                  </span>
                )}

                {member.email !== "#" ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-zinc-100 transition-all ml-auto text-xs font-mono px-2.5 w-auto gap-1"
                  >
                    <Mail size={11} />
                    <span className="text-[10px] hidden sm:inline">Contact</span>
                  </a>
                ) : (
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-600 opacity-60 ml-auto">
                    <Mail size={11} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
