import React from "react";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

export default function SupportMissionBand() {
  return (
    <section
      className="bg-[var(--color-surface)] py-16 md:py-24 border-b border-[var(--color-line)]"
      id="support-mission-band"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Anchor Band: Inset Container in Deep Olive */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[var(--shadow-xl)]">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10">
            
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mb-6 shadow-md">
              <Heart size={22} className="fill-current" />
            </div>

            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-3">
              KINGDOM STEWARDSHIP
            </span>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold mb-4 leading-tight">
              Support the Mission
            </h2>

            <p className="text-white/85 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed font-sans">
              Your faithful tithes and offerings directly fuel territorial church planting, gospel outreach, 24/7 radio broadcasts, and community relief across Kenya.
            </p>

            {/* Single Button per §E (No secondary link) */}
            <div className="flex items-center justify-center">
              <Link
                href="/give"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-sans font-bold text-[var(--color-accent-ink)] bg-[var(--color-accent)] hover:scale-105 rounded-full transition-all shadow-md group"
              >
                <span>Share with VPM International</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
