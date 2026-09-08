import React from "react";
import { Sparkles, Heart, BookOpen, Flame } from "lucide-react";

const CORE_FOUNDATIONS = [
  {
    number: "01",
    title: "Jesus Christ",
    body: "Christ is the center, head, and eternal foundation of our prophetic altar, preaching, and walk of faith.",
    icon: Sparkles,
    accentColor: "from-amber-500/20 to-orange-500/5",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    number: "02",
    title: "Love",
    body: "We are called to love God and love one another above all else, ministering to the broken and seeking souls.",
    icon: Heart,
    accentColor: "from-rose-500/20 to-red-500/5",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
  },
  {
    number: "03",
    title: "The Word of God",
    body: "We stand uncompromised on the pure biblical revelation of Scripture as our ultimate divine authority.",
    icon: BookOpen,
    accentColor: "from-sky-500/20 to-blue-500/5",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
  },
  {
    number: "04",
    title: "Prophetic Revelation",
    body: "Graced by the Holy Spirit to reveal divine mysteries, unlock destinies, and bring supernatural deliverance.",
    icon: Flame,
    accentColor: "from-indigo-500/20 to-sky-500/5",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
];

export default function NumberedValues() {
  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] py-12 md:py-16 border-b border-[var(--color-line)] relative overflow-hidden"
      id="core-foundations"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-line)] text-xs font-sans font-bold text-[#1B5299] uppercase tracking-wider mb-2.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29A3E4]" />
            <span>Kingdom Pillars</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ink)] font-extrabold tracking-tight">
            What Drives Our Ministry
          </h2>
          <p className="text-sm text-[var(--color-slate)] font-sans mt-1.5 leading-relaxed">
            The enduring spiritual anchors guiding Voice of the Potter&apos;s Messengers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CORE_FOUNDATIONS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group relative bg-white border border-[var(--color-line)] hover:border-[var(--color-accent)] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Subtle Gradient Light Glow */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${pillar.accentColor}`} />

                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${pillar.iconBg} shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-sm font-extrabold text-[var(--color-slate)]/50 group-hover:text-[var(--color-accent)] transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="font-sans text-lg font-bold text-[var(--color-ink)] mb-2 group-hover:text-[#1B5299] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-slate)] font-sans leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
