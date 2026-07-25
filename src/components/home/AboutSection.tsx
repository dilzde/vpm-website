import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

export default function AboutSection() {
  return (
    <section
      className="bg-[var(--color-navy-900)] text-white py-16 md:py-24 border-b border-[var(--color-line-dark)]"
      id="about-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Staggered/Overlapping Photo Collage (Reference 2 Device) */}
          <div className="w-full lg:w-1/2 relative h-[360px] sm:h-[420px]">
            {/* Primary Large Panel */}
            <div className="w-4/5 h-4/5 rounded-lg overflow-hidden border border-white/15 bg-[var(--color-navy-700)] shadow-xl relative">
              <PlaceholderCongregation />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 to-transparent" />
            </div>
            
            {/* Secondary Offset Overlapping Panel */}
            <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-lg overflow-hidden border border-white/20 bg-[var(--color-navy-700)] shadow-2xl z-10">
              <PlaceholderSermon />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/80 to-transparent" />
            </div>
          </div>

          {/* Mission Copy & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase">
              Who We Are
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-semibold leading-tight">
              A Prophetic Voice to the Nations
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-sans">
              Voice of the Potter&apos;s Messengers (VPM International) is a kingdom movement led by Apostle Asriel. Rooted in intense intercessory prayer and territorial evangelism, VPM nurtures believers to fulfill their divine calling and experience supernatural transformation.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              From our main altar in Githurai, Nairobi, to our expanding branch networks across Kenya, we remain dedicated to equipping souls for God&apos;s end-time harvest.
            </p>
            
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[var(--color-gold-500)] hover:underline group"
              >
                <span>Learn more about our lineage and mission</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
