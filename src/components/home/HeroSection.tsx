import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

export default function HeroSection() {
  return (
    <section
      className="bg-[var(--color-cream)] text-[var(--color-ink)] py-14 md:py-20 lg:py-24 border-b border-[var(--color-line)]"
      id="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: Restrained Editorial Text & Single CTA (Part C) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
          
          {/* Eyebrow with Part C Gold Thin Rule Accent */}
          <div className="flex flex-col items-start gap-2">
            <div className="w-6 h-[2px] bg-[var(--color-gold-500)]" />
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase">
              VPM International
            </span>
          </div>

          {/* Mixed-Weight Serif Headline Pairing (Fraunces 600 / 400) */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-[1.12] tracking-tight">
            <span className="font-semibold block sm:inline">You are welcome </span>
            <span className="font-normal text-[var(--color-slate)]">here.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[var(--color-slate)] max-w-lg leading-relaxed font-sans font-normal">
            A dynamic prophetic and evangelistic ministry dedicated to intercessory prayer, foundational teachings, and releasing God&apos;s manifest power across the nations.
          </p>

          {/* Single Gold Pill CTA Button (Part C) */}
          <div className="pt-2">
            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-sans font-bold text-[var(--color-ink)] bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-700)] rounded-full transition-all shadow-sm group"
            >
              <span>Plan Your Visit</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Asymmetric 3-Panel Photo Strip (Part C & Reference 1) */}
        <div className="w-full lg:w-1/2 grid grid-cols-12 gap-3 items-stretch h-[380px] sm:h-[440px]">
          
          {/* Main Large Photo Panel (7 cols) */}
          <div className="col-span-7 relative rounded-lg overflow-hidden border border-[var(--color-line)] bg-white shadow-sm group">
            <div className="w-full h-full object-cover">
              <PlaceholderCongregation />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/80 via-[var(--color-navy-900)]/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-[var(--color-cream)]">
              <p className="text-xs font-sans font-medium uppercase tracking-wider opacity-90">Potter&apos;s Sanctuary</p>
              <h3 className="font-serif text-lg font-semibold text-white">Worship & Intercession</h3>
            </div>
          </div>

          {/* Two Narrow Vertical Side Panels (5 cols) */}
          <div className="col-span-5 flex flex-col gap-3 h-full">
            
            {/* Upper Panel: Our Branches */}
            <Link
              href="/branches"
              className="flex-1 relative rounded-lg overflow-hidden border border-[var(--color-line)] bg-white shadow-sm group block"
            >
              <div className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300">
                <PlaceholderSermon />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[var(--color-cream)]">
                <span className="text-xs font-sans font-bold text-[var(--color-cream)] bg-[var(--color-navy-900)]/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 inline-block">
                  Our Branches →
                </span>
              </div>
            </Link>

            {/* Lower Panel: This Sunday */}
            <a
              href="#heartbeat-section"
              className="flex-1 relative rounded-lg overflow-hidden border border-[var(--color-line)] bg-white shadow-sm group block"
            >
              <div className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300">
                <PlaceholderCongregation />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[var(--color-cream)]">
                <span className="text-xs font-sans font-bold text-[var(--color-cream)] bg-[var(--color-navy-900)]/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 inline-block">
                  This Sunday →
                </span>
              </div>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
