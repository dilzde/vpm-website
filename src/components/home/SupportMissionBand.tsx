import React from "react";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

export default function SupportMissionBand() {
  return (
    <section
      className="bg-[var(--color-navy-900)] text-white py-16 md:py-24 border-b border-[var(--color-line-dark)] relative overflow-hidden"
      id="support-mission-band"
    >
      <div className="mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-gold-500)] text-[var(--color-ink)] flex items-center justify-center mb-6 shadow-lg">
          <Heart size={22} className="fill-current" />
        </div>
        
        <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase block mb-3">
          Kingdom Stewardship
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-semibold mb-4 leading-tight">
          Support the Mission
        </h2>
        
        <p className="text-slate-300 text-base max-w-xl mb-8 leading-relaxed font-sans">
          Your generous tithes and offerings fuel gospel outreach, territorial church planting, live radio broadcasts, and community assistance across Kenya.
        </p>

        <Link
          href="/give"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-sans font-bold text-[var(--color-ink)] bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-700)] rounded-full transition-all shadow-md group"
        >
          <span>Give to VPM International</span>
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
