import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, CreditCard, Shield, Sparkles, Loader2, DollarSign } from "lucide-react";

interface PremiumViewProps {
  isPremiumUnlocked: boolean;
  onUnlockPremium: () => void;
}

export default function PremiumView({ isPremiumUnlocked, onUnlockPremium }: PremiumViewProps) {
  const [isStripeCheckingOut, setIsStripeCheckingOut] = useState<boolean>(false);
  const [stripeForm, setStripeForm] = useState({ name: "", email: "", cardNum: "4242 •••• •••• 4242", expiry: "12/28", cvc: "123" });
  const [checkoutStep, setCheckoutStep] = useState<"form" | "processing" | "success">("form");

  const startCheckout = () => {
    if (isPremiumUnlocked) return;
    setIsStripeCheckingOut(true);
    setCheckoutStep("form");
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      setTimeout(() => {
        onUnlockPremium();
        setIsStripeCheckingOut(false);
      }, 1500);
    }, 2000);
  };

  const comparisonRows = [
    { name: "/birthdays list", free: true, premium: true, desc: "See upcoming birthdays in the server" },
    { name: "/birthdays me", free: true, premium: true, desc: "Check or register your own birth date" },
    { name: "/birthdays preview", free: true, premium: true, desc: "Preview your registered birthday setup" },
    { name: "/birthdays remove", free: true, premium: true, desc: "Remove your birthday from database" },
    { name: "/birthdays set", free: true, premium: true, desc: "Save or update your birthday" },
    { name: "/birthdays setup", free: true, premium: true, desc: "Run standard birthday system setup" },
    { name: "/birthdays timezone", free: true, premium: true, desc: "See list of available timezones" },
    { name: "/birthdays view", free: true, premium: true, desc: "View registered configuration for any user" },
    { name: "/template send", free: false, premium: true, desc: "Manually fire or test a birthday card" },
    { name: "/template list", free: false, premium: true, desc: "View all custom greeting card templates" },
    { name: "/template create", free: false, premium: true, desc: "Create multi-line rich message templates" },
    { name: "/settings create", free: false, premium: true, desc: "Construct advanced settings categories" },
    { name: "/settings status", free: false, premium: true, desc: "Audit server settings and logging parameters" },
    { name: "/settings setup", free: false, premium: true, desc: "Configure high-tier premium settings modules" },
    { name: "/settings role", free: false, premium: true, desc: "Specify temporary birthday highlight roles" },
    { name: "/settings reset", free: false, premium: true, desc: "Factory reset all bot data for the server" },
    { name: "/settings reminders", free: false, premium: true, desc: "Schedule separate member celebration reminders" },
    { name: "/settings premium", free: false, premium: true, desc: "Activate or audit lifetime premium state" },
    { name: "/settings channel", free: false, premium: true, desc: "Specify primary birthday feed channel" },
    { name: "/birthday", free: false, premium: true, desc: "Comprehensive shortcut command suite" },
  ];

  return (
    <div className="relative py-8">
      {/* Background Orbs */}
      <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full glow-orb-2 opacity-35 pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
        
        {/* Top Secure Badge */}
        <div className="mx-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-8">
          <CreditCard size={12} className="text-pink-400 animate-pulse" />
          <span>Stripe checkout Secure one-time payment</span>
          <span className="text-zinc-600">|</span>
          <span className="text-pink-400 font-semibold">Lifetime access</span>
        </div>

        <div className="flex flex-col items-center gap-3.5 mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Choose Your Plan.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            Lifetime access with a secure Stripe checkout. No recurring fees or sneaky monthly subscriptions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20 text-left">
          
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">STANDARD</span>
              <h3 className="text-2xl font-bold text-white mt-1">Free</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-2">
                Everything you need to get birthday tracking up and running in small communities.
              </p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">£0.00</span>
                <span className="text-zinc-500 text-xs font-mono ml-1.5">forever</span>
              </div>

              <div className="border-t border-zinc-800/80 pt-6 flex flex-col gap-3 text-xs text-zinc-400">
                <p className="font-semibold text-zinc-300">Available commands:</p>
                <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span>/birthdays list</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span>/birthdays me</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span>/birthdays set</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span>/birthdays setup</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-green-500" /><span>/birthdays timezone</span></div>
                <div className="text-zinc-600 italic">And essential configurations...</div>
              </div>
            </div>

            <button className="mt-8 w-full h-11 rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 text-xs font-semibold tracking-wide transition-all cursor-pointer">
              Already Active
            </button>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-pink-500/30 flex flex-col justify-between relative shadow-[0_20px_50px_rgba(236,72,153,0.1)]">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase">
              MOST POPULAR
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-pink-400 uppercase">EXCLUSIVE ACCESS</span>
              <h3 className="text-2xl font-bold text-white mt-1">Premium</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-2">
                Unlock custom message editing, role assignment, manual tests, and fine-grain administration.
              </p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">£5.00</span>
                <span className="text-zinc-500 text-xs font-mono ml-1.5">one-time payment</span>
              </div>

              <div className="border-t border-pink-500/10 pt-6 flex flex-col gap-3 text-xs text-zinc-400">
                <p className="font-semibold text-pink-400">Everything in Free, plus:</p>
                <div className="flex items-center gap-2"><Check size={14} className="text-pink-400" /><span>/template create (Unlimited design cards)</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-pink-400" /><span>/settings role (Dynamic role assignment)</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-pink-400" /><span>/settings reminders (Custom day-before pings)</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-pink-400" /><span>/template send (Instant manual testing)</span></div>
                <div className="flex items-center gap-2"><Check size={14} className="text-pink-400" /><span>/settings channel (Configurable announcements)</span></div>
                <div className="text-pink-500/80 italic font-medium">And all premium features unlocked!</div>
              </div>
            </div>

            {isPremiumUnlocked ? (
              <div className="mt-8 w-full h-11 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-semibold tracking-wide">
                Premium Active ✨ Thank you!
              </div>
            ) : (
              <button
                onClick={startCheckout}
                className="mt-8 w-full h-11 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/35 hover:scale-[1.01] active:scale-[0.99] text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CreditCard size={13} />
                <span>Purchase Premium</span>
              </button>
            )}
          </div>

        </div>

        {/* Detailed Command Comparison */}
        <div className="max-w-4xl mx-auto py-12 text-left">
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Command Comparison</h3>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              A clearer view of which commands are available on Free and which are exclusive to Premium.
            </p>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-900/60 text-zinc-500 font-mono tracking-wider border-b border-zinc-900">
                    <th className="p-4 font-bold text-[10px]">COMMAND NAME</th>
                    <th className="p-4 text-center font-bold text-[10px]">FREE EDITION</th>
                    <th className="p-4 text-center font-bold text-[10px]">PREMIUM EDITION</th>
                    <th className="p-4 hidden sm:table-cell font-bold text-[10px]">FUNCTIONAL OVERVIEW</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="p-4 font-mono font-semibold text-zinc-200">{row.name}</td>
                      <td className="p-4 text-center">
                        {row.free ? (
                          <Check size={14} className="text-green-500 mx-auto" />
                        ) : (
                          <X size={14} className="text-zinc-700 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Check size={14} className="text-pink-400 mx-auto" />
                      </td>
                      <td className="p-4 hidden sm:table-cell text-zinc-500">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Stripe Checkout Simulation Modal */}
      <AnimatePresence>
        {isStripeCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStripeCheckingOut(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#1f2023] rounded-2xl border border-zinc-800 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-left"
            >
              {/* Top Stripe style bar */}
              <div className="bg-[#635bff] px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} />
                  <span className="font-bold text-sm tracking-wide">Secure Checkout via Stripe</span>
                </div>
                <button
                  onClick={() => setIsStripeCheckingOut(false)}
                  className="text-white/80 hover:text-white hover:scale-105 transition-all text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {checkoutStep === "form" && (
                <form onSubmit={handleCheckoutSubmit} className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                    <div>
                      <h4 className="font-bold text-white text-base">CakeCord Premium Lifetime</h4>
                      <p className="text-zinc-500 text-xs">Secure one-time checkout</p>
                    </div>
                    <span className="text-lg font-extrabold text-white">£5.00</span>
                  </div>

                  {/* Customer Info */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={stripeForm.email}
                      onChange={(e) => setStripeForm({ ...stripeForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full h-10 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#635bff] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={stripeForm.name}
                      onChange={(e) => setStripeForm({ ...stripeForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-10 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#635bff] transition-colors"
                    />
                  </div>

                  {/* Card Credentials */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Card Information</label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={stripeForm.cardNum}
                        className="w-full h-10 pl-3 pr-16 rounded bg-zinc-950 border border-zinc-800 text-xs text-white select-none pointer-events-none"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono font-bold">
                        DEMO TEST
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">Expires</label>
                      <input
                        type="text"
                        readOnly
                        value={stripeForm.expiry}
                        className="w-full h-10 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 select-none pointer-events-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">CVC</label>
                      <input
                        type="text"
                        readOnly
                        value={stripeForm.cvc}
                        className="w-full h-10 px-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-normal">
                    By confirming, you agree to authorize Stripe to complete this simulation charge. Access gets synchronized to your server automatically.
                  </p>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-lg bg-[#635bff] hover:bg-[#5b51ea] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Pay £5.00 with Stripe</span>
                  </button>
                </form>
              )}

              {checkoutStep === "processing" && (
                <div className="p-12 flex flex-col items-center justify-center text-center gap-4">
                  <Loader2 className="animate-spin text-[#635bff]" size={36} />
                  <div>
                    <h4 className="font-bold text-white text-base">Processing Payment</h4>
                    <p className="text-zinc-500 text-xs mt-1">Interacting securely with Stripe network...</p>
                  </div>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="p-12 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Payment Confirmed!</h4>
                    <p className="text-zinc-500 text-xs mt-1">Welcome to CakeCord Premium. Unlocking features...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
