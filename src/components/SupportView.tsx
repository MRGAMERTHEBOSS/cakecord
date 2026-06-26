import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I register my birthday?",
    answer: "You can save your birth date by running the `/birthdays set` slash command directly inside Discord. Provide your birth month (1-12) and day (1-31). You can also include your local timezone tag so your birthday pings right at midnight local time."
  },
  {
    question: "Can I update or delete my registered birthday?",
    answer: "Absolutely. Simply run the `/birthdays set` command again with your updated credentials to change your birthday. If you wish to completely purge your records from CakeCord's secure server cluster, write `/birthdays remove`."
  },
  {
    question: "Does CakeCord support temporary birthday roles?",
    answer: "Yes, this is an exclusive feature of CakeCord Premium! Once activated, administrators can set up a special decorative role (e.g., '@Birthday Star') using `/settings role`. CakeCord will grant this role to celebrated members at their local midnight and remove it automatically when the day ends."
  },
  {
    question: "How do I link a designated text channel for announcements?",
    answer: "To set the channel where daily greetings are dispatched, run `/settings channel` (available in Premium) and tag your preferred channel. Members will get celebrated there dynamically in a beautiful styled embedded card."
  },
  {
    question: "Is there any subscription fee for Premium?",
    answer: "No, CakeCord Premium operates entirely on a single lifetime payment model! Paid securely once via Stripe checkout, you get lifetime access across your authorized guilds without recurring bills."
  }
];

export default function SupportView() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full glow-orb-2 opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full glow-orb-1 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-3.5 mb-12">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-pink-500 uppercase">
            / HELP & COMMUNICATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Support Center
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Need assistance with CakeCord setup, premium features, or command usage? Start with the FAQ below or join our support server.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <HelpCircle size={18} className="text-pink-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="flex flex-col gap-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-900 bg-zinc-900/10 overflow-hidden hover:border-zinc-800 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-zinc-100 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-pink-400" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-500" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 pt-0 border-t border-zinc-900/60 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#5865f2]/10 rounded-xl border border-[#5865f2]/25 text-[#5865f2]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Need Direct Support?</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Join our Discord support server to speak with the team about setup, premium checkout, or custom bot behavior.
                  </p>
                </div>
              </div>
              <a
                href="https://discord.gg/8rA3Zeuqct"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold uppercase tracking-[0.16em] py-3 transition-all"
              >
                Join Discord Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
