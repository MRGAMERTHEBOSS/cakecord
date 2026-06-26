import React, { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Check, X } from "lucide-react";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() || "";
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;
const defaultApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:4242";

interface PremiumViewProps {
  isPremiumUnlocked: boolean;
  onUnlockPremium: () => void;
}

interface StripeCheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

function StripeCheckoutForm({ onSuccess, onCancel }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setMessage("Stripe is still loading. Please wait a moment.");
      return;
    }

    setIsSubmitting(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setMessage(result.error.message || "Payment could not be completed.");
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
    } else {
      setMessage("Payment is processing. If the page does not update, refresh to confirm status.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5">
          <PaymentElement />
        </div>

        {message && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-pink-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing…" : "Complete Purchase"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto rounded-full border border-zinc-800 bg-zinc-900/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PremiumView({ isPremiumUnlocked, onUnlockPremium }: PremiumViewProps) {
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const apiBaseUrl = useMemo(() => defaultApiBaseUrl, []);

  const startCheckout = async () => {
    if (!stripePublicKey) {
      setCheckoutError("Stripe publishable key is not configured.");
      setCheckoutState("error");
      return;
    }

    setCheckoutState("loading");
    setCheckoutError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/stripe/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const payload = await response.json();

      if (!response.ok || !payload.clientSecret) {
        throw new Error(payload.error || "Unable to initialize Stripe checkout.");
      }

      setClientSecret(payload.clientSecret);
      setCheckoutState("ready");
    } catch (error) {
      setCheckoutError((error as Error).message || "Failed to start checkout.");
      setCheckoutState("error");
    }
  };

  const closeCheckout = () => {
    setCheckoutState("idle");
    setClientSecret(null);
    setCheckoutError(null);
  };

  const handleSuccess = () => {
    onUnlockPremium();
    closeCheckout();
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
      <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full glow-orb-2 opacity-35 pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full glow-orb-3 opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="mx-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-8">
          <span className="font-semibold text-pink-400">Lifetime access</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">One-time purchase, no subscription</span>
        </div>

        <div className="flex flex-col items-center gap-3.5 mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Choose Your Plan.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            Upgrade once and unlock powerful CakeCord controls with no recurring fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20 text-left">
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

          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-pink-500/30 flex flex-col justify-between relative shadow-[0_20px_50px_rgba(236,72,153,0.1)]">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase">
              MOST POPULAR
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-pink-400 uppercase">EXCLUSIVE ACCESS</span>
              <h3 className="text-2xl font-bold text-white mt-1">Premium</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-2">
                Unlock custom message editing, role assignment, manual tests, and fine-grained administration.
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
                <span>Purchase Premium</span>
              </button>
            )}
          </div>
        </div>

        {checkoutState !== "idle" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="absolute inset-0" onClick={closeCheckout} />
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/95 p-6 shadow-2xl shadow-black/40">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-pink-500">Secure checkout</p>
                  <h3 className="mt-2 text-xl font-bold text-white">CakeCord Premium Payment</h3>
                </div>
                <button
                  onClick={closeCheckout}
                  className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-zinc-700 hover:text-white"
                >
                  Close
                </button>
              </div>

              {checkoutError && (
                <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {checkoutError}
                </div>
              )}

              {checkoutState === "loading" && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 text-center text-sm text-zinc-300">
                  Preparing secure Stripe checkout…
                </div>
              )}

              {checkoutState === "ready" && clientSecret && stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCheckoutForm onSuccess={handleSuccess} onCancel={closeCheckout} />
                </Elements>
              ) : null}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto py-12 text-left">
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Command Comparison</h3>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              A clearer view of which commands are available on Free and which are exclusive to Premium.
            </p>
          </div>

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
    </div>
  );
}
