import React from "react";
import Link from "next/link";
import { ArrowUpRight, Radio } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";

export default function HeroSection() {
  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] section-gap border-b border-[var(--color-line)] relative overflow-hidden"
      id="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: Bold Headline & Dual CTAs (§4 & §5 Entry) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
          
          {/* Eyebrow Label: All-caps, tracking-widest */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase">
              GLOBAL NETWORK · SINCE 1994
            </span>
          </div>

          {/* Bold Hanken Grotesk Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] font-extrabold leading-[1.08] tracking-tight">
            A Prophetic Voice to awaken nations.
          </h1>

          {/* Body Copy */}
          <p className="text-base sm:text-lg text-[var(--color-slate)] max-w-lg leading-relaxed font-sans font-normal">
            Voice of the Potter&apos;s Messengers (VPM International) is a kingdom movement dedicated to intercessory prayer, foundational biblical teachings, and territorial evangelism across Kenya and the world.
          </p>

          {/* Dual CTAs (§4 & §7) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-sans font-bold text-white bg-[var(--color-navy-900)] hover:scale-105 rounded-full transition-all shadow-md group"
            >
              <span>Plan Your Visit</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-sans font-semibold text-[var(--color-ink)] bg-white border border-[var(--color-line)] hover:bg-[var(--color-surface-alt)] hover:scale-105 rounded-full transition-all"
            >
              <span>Watch Sermons</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Floating Hero Image (R12 / SHADOW-XL) with Overlapping Floating Badge (§4) */}
        <div className="w-full lg:w-1/2 relative pt-6">
          
          {/* Main Floating Hero Container (R12 / SHADOW-XL) */}
          <div className="w-full h-[380px] sm:h-[460px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
            <PlaceholderCongregation />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                Githurai Main Sanctuary
              </span>
              <h3 className="font-sans text-xl font-bold">Worship & Intercessory Prayer</h3>
            </div>
          </div>

          {/* Signature Floating Badge Pattern (§4 & §7) — Overlaps Image Top-Left Corner */}
          <div className="absolute -top-2 -left-2 sm:-left-4 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-4 shadow-[var(--shadow-xl)] flex items-center gap-3 z-20 max-w-xs">
            <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold shrink-0">
              <Radio size={20} />
            </div>
            <div>
              <p className="text-xs font-sans font-bold text-[var(--color-ink)] leading-snug">
                24/7 Live Radio
              </p>
              <p className="text-[11px] font-sans text-[var(--color-slate)]">
                Broadcasting Global Faith Stream
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
