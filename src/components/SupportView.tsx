import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Send, Sparkles, Loader2, CheckCircle2, MessageSquare } from "lucide-react";

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
  
  // Ticket form state
  const [serverName, setServerName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("technical");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      // Reset after brief timing
      setServerName("");
      setEmail("");
      setMessage("");
    }, 1800);
  };

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
            Need assistance setting up timezones, templates, or premium features? Explore our frequently asked questions or file an official technical support ticket.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: FAQ Accordion */}
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

            {/* Direct Discord Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center gap-5 mt-4">
              <div className="p-3 bg-[#5865f2]/10 rounded-xl border border-[#5865f2]/25 text-[#5865f2]">
                <MessageSquare size={20} />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-bold text-white text-sm">Need Direct Support?</h4>
                <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                  Join our verified Discord Community Server to speak with Connor or our operations support staff directly.
                </p>
              </div>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-4.5 h-10 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all shrink-0 flex items-center justify-center cursor-pointer"
              >
                Join Discord
              </a>
            </div>
          </div>

          {/* Right Column: Ticket Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <Mail size={16} className="text-pink-400 animate-pulse" />
                <span>Submit Support Ticket</span>
              </h3>
              <p className="text-zinc-500 text-xs mb-6">
                Fill in your details and our team will get back to you within 12-24 hours via email.
              </p>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center flex flex-col items-center gap-3 bg-green-500/5 border border-green-500/10 rounded-xl"
                >
                  <CheckCircle2 size={32} className="text-green-400" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Ticket Created Successfully!</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                      Your technical query has been successfully dispatched to Connor and Cxntrol. Please check your contact email for ticket tracking updates.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Submit another ticket
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="flex flex-col gap-4">
                  {/* Server name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Discord Server Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Horizon Gaming Guild"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      disabled={formState === "submitting"}
                      className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Contact Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formState === "submitting"}
                      className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={formState === "submitting"}
                      className="w-full h-10 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 focus:outline-none focus:border-pink-500/50"
                    >
                      <option value="technical">Technical Setup Bug</option>
                      <option value="premium">Premium Activation Checkout</option>
                      <option value="billing">Refunds / Invoicing Query</option>
                      <option value="other">General Partnership Query</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Description of Problem</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide precise details, including active shards or commands attempted..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={formState === "submitting"}
                      className="w-full p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-pink-500/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs tracking-wide shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Dispatching Support Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Submit Ticket Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
