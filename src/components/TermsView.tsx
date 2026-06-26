import React from "react";
import { FileText, Mail, ShieldAlert } from "lucide-react";

export default function TermsView() {
  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-15 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-900">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/15">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Terms of Service</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Last updated: June 26, 2026</p>
          </div>
        </div>

        {/* Legal Text content */}
        <div className="flex flex-col gap-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          <p className="font-normal">
            By inviting CakeCord to your Discord server or utilizing any associated slash commands, you agree to be bound by the following Terms of Service. Please read them carefully.
          </p>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">1.</span> Acceptance of Terms
            </h3>
            <p className="font-normal text-zinc-400">
              Your interaction with CakeCord is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all server members, guild owners, and moderators who interact with our services.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">2.</span> Use of Service
            </h3>
            <p className="font-normal text-zinc-400">
              You agree to use CakeCord solely for legitimate birthday tracking and community celebration scheduling. You must comply with Discord's developer guidelines and standard terms of service when executing bot commands.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">3.</span> Prohibited Conduct
            </h3>
            <p className="font-normal text-zinc-400">
              Users are strictly forbidden from attempting to exploit bot commands, sending rapid automated spam requests, manipulating database payloads, or utilizing bot features to harass or stalk other server members.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">4.</span> Service Availability
            </h3>
            <p className="font-normal text-zinc-400">
              While we aim to maintain a 99.9% uptime SLA, CakeCord is provided 'as is' without warranties. We are not liable for transient network disruptions, unexpected Discord gateway outages, or temporary database scheduling delays.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">5.</span> Limitation of Liability
            </h3>
            <p className="font-normal text-zinc-400">
              To the maximum extent permitted by applicable law, CakeCord and its developers (Connor, Cxntrol, Harley) shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the bot.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">6.</span> Termination
            </h3>
            <p className="font-normal text-zinc-400">
              We reserve the right to suspend or block specific guilds, server owners, or individual members from using CakeCord if they are found in breach of these terms or engaging in malicious exploits.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">7.</span> Changes to Terms
            </h3>
            <p className="font-normal text-zinc-400">
              We may revise these terms of service at our discretion. If we make structural modifications, we will publish notice in our official Discord support server. Your continued use of CakeCord signifies acceptance of updated terms.
            </p>
          </section>

          <section className="flex flex-col gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 mt-2">
            <h3 className="text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <Mail size={14} className="text-pink-400" />
              <span>Contact & Legal Inquiries</span>
            </h3>
            <p className="text-zinc-400 text-[11px] sm:text-xs leading-normal">
              For administrative inquiries, formal GDPR data requests, or compliance audits, please reach out to our legal lead at:
            </p>
            <a href="mailto:legal@cakecord.co.uk" className="text-pink-400 hover:text-pink-300 transition-colors font-mono font-bold text-xs">
              legal@cakecord.co.uk
            </a>
          </section>
        </div>

      </div>
    </div>
  );
}
