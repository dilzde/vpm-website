import React from "react";
import Link from "next/link";
import { Play, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative bg-sky-50 overflow-hidden"
      id="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Identity sentence */}
          <h1 className="text-3xl md:text-4xl text-slate-800 leading-tight">
            Equipping believers, raising
            <br className="hidden sm:block" />
            intercessors, transforming nations.
          </h1>

          <p className="mt-6 text-base text-slate-600 max-w-prose leading-relaxed">
            Voice of the Potter&apos;s Messengers Ministry — a community of
            faith rooted in prayer, the prophetic word, and the power of the
            Gospel. Join us in worship and service.
          </p>

          {/* Two buttons max */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium
                         bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              id="hero-watch-live"
            >
              <Play size={16} strokeWidth={1.75} />
              Watch Live / Latest Sermon
            </Link>
            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium
                         bg-transparent text-sky-500 border border-sky-200 rounded-md
                         hover:bg-sky-100 transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              id="hero-plan-visit"
            >
              <MapPin size={16} strokeWidth={1.75} />
              Plan a Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle decorative shape (not a gradient blob — just a gentle curve) */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96
                    rounded-full border border-sky-200/40 hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-72 h-72
                    rounded-full border border-sky-200/20 hidden lg:block"
        aria-hidden="true"
      />
    </section>
  );
}
