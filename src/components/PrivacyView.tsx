import React from "react";
import { ShieldCheck, Mail, ArrowLeft, FileText, Calendar } from "lucide-react";

export default function PrivacyView() {
  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-15 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-900">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/15">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Privacy Policy</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Last updated: June 26, 2026</p>
          </div>
        </div>

        {/* Legal Text content */}
        <div className="flex flex-col gap-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          <p className="font-normal">
            At CakeCord, we take your server privacy and personal data seriously. This Privacy Policy details how we collect, store, process, and delete information provided to our Discord application.
          </p>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">1.</span> Information We Collect
            </h3>
            <p className="font-normal text-zinc-400">
              CakeCord collects only the minimal data required to execute birthday trackers and roles:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 text-zinc-400 font-normal">
              <li>Your Discord User ID (to identify who to celebrate).</li>
              <li>Your birth date (Month and Day) as supplied via the <code>/birthdays set</code> command. We do NOT collect birth years by default unless explicitly supplied.</li>
              <li>Your preferred timezone offset (to schedule midnight announcements correctly).</li>
              <li>Guild Server configuration details (designated channel IDs, active role IDs).</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">2.</span> How We Use Your Data
            </h3>
            <p className="font-normal text-zinc-400">
              Your registered birthday details are utilized solely for scheduling daily celebration cards, dispatching greetings, and assigning highlighted server roles on your special day. We do not sell, rent, index, or distribute your private profiles to any external agencies or advertising services.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">3.</span> Data Storage
            </h3>
            <p className="font-normal text-zinc-400">
              All stored records are hosted on secure, cloud-hosted relational servers. Access keys to database nodes are securely shielded, locked down behind firewall clusters, and restricted exclusively to Connor and our core development operations team.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">4.</span> Data Deletion
            </h3>
            <p className="font-normal text-zinc-400">
              You are in full control of your private information. You can delete your birth date instantly at any time by running <code>/birthdays remove</code> inside Discord. In addition, when CakeCord is removed (kicked) from a server, all server-specific configurations are safely purged from our databases automatically.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">5.</span> Children's Privacy
            </h3>
            <p className="font-normal text-zinc-400">
              CakeCord is designed for communities in compliance with Discord's Terms of Service. We do not knowingly compile or track records from children under the age of 13. If you believe a minor has supplied personal data, please contact our legal counsel.
            </p>
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <span className="text-pink-400 text-sm font-mono">6.</span> Changes to This Policy
            </h3>
            <p className="font-normal text-zinc-400">
              We may revise this policy periodically to align with Discord Gateway changes or standard API updates. Major revisions will get notified directly inside our official support guild.
            </p>
          </section>

          <section className="flex flex-col gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 mt-2">
            <h3 className="text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <Mail size={14} className="text-pink-400" />
              <span>Legal & Administrative Contact</span>
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
