import React from "react";
import { Metadata } from "next";
import { Heart, Smartphone, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Support the Mission | VPM International",
  description: "Partner with Voice of the Potter's Messengers International's mission through giving. M-Pesa details and information about how your generosity fuels kingdom revival.",
};

export default function GivePage() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";

  return (
    <div className="bg-[var(--color-navy-900)] text-white min-h-screen py-16 md:py-24 border-b border-[var(--color-line-dark)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-3">
            Kingdom Partnership
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-semibold mb-4">
            Support the Mission
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
            Your faithful giving enables VPM International to take the Gospel across Kenya and the nations, sustain intercessory prayer altars, and broadcast life-changing prophetic ministry.
          </p>
        </div>

        {/* Dedicated M-Pesa Card (Reference 2 Pattern) */}
        <div className="bg-[var(--color-navy-700)] border border-[var(--color-line-dark)] rounded-xl p-8 sm:p-12 text-left max-w-2xl mx-auto shadow-2xl mb-12">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)] text-[var(--color-navy-900)] flex items-center justify-center shrink-0">
              <Smartphone size={24} />
            </div>
            <div>
              <span className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider block">
                M-Pesa Direct Giving
              </span>
              <h2 className="font-sans text-xl font-bold text-white">
                Official Ministry Account
              </h2>
            </div>
          </div>

          <div className="bg-[var(--color-navy-900)] p-6 rounded-lg border border-white/10 mb-6 text-center">
            <p className="text-xs font-sans font-semibold text-slate-300 uppercase tracking-wider mb-1">
              M-Pesa Number
            </p>
            <p className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--color-accent)] tracking-widest">
              {mpesaNumber}
            </p>
          </div>

          <div className="space-y-3 font-sans text-sm text-slate-300">
            <p className="font-bold text-white mb-2">Step-by-step M-Pesa Instructions:</p>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[var(--color-accent)] shrink-0" />
              <span>Go to your M-Pesa Menu and select <strong>Send Money</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[var(--color-accent)] shrink-0" />
              <span>Enter Phone Number: <strong className="text-white font-mono">{mpesaNumber}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[var(--color-accent)] shrink-0" />
              <span>Enter the Amount you wish to give and your M-Pesa PIN</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[var(--color-accent)] shrink-0" />
              <span>Confirm transaction — Voice of the Potter&apos;s Messengers</span>
            </div>
          </div>
        </div>

        {/* Scriptural Assurance */}
        <p className="text-xs font-serif italic text-slate-400 max-w-lg mx-auto leading-relaxed">
          &ldquo;Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.&rdquo; — 2 Corinthians 9:7
        </p>

      </div>
    </div>
  );
}
