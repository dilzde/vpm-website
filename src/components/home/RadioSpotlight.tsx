"use client";

import React from "react";
import Link from "next/link";
import { Radio, Play } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import PlaceholderRadio from "../placeholders/PlaceholderRadio";

export default function RadioSpotlight() {
  const { play, stations, isPlaying, currentStation } = useRadioPlayer();
  const station = stations[0];

  return (
    <section className="bg-[var(--color-mist)] py-16 md:py-24" id="radio-spotlight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden flex flex-col md:flex-row w-full shadow-sm">
          
          {/* Left: Illustration (~140px width on desktop) */}
          <div className="w-full md:w-40 h-32 md:h-auto shrink-0 relative">
            <PlaceholderRadio />
          </div>

          {/* Right: Info and Actions */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="text-[var(--color-live)] text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-live)] animate-live-pulse" />
                Live Broadcast
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-1">
                Listen to Asriel FM
              </h2>
              <p className="text-sm md:text-base text-[var(--color-slate)]">
                Daily teachings, worship, and prayer — streaming 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => station && play(station)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold
                           bg-[var(--color-blue-500)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-700)] transition-colors w-full sm:w-auto
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
                id="radio-play-btn"
              >
                {isPlaying && currentStation?.id === station?.id ? (
                  <>
                    <Radio size={18} strokeWidth={2} />
                    Playing
                  </>
                ) : (
                  <>
                    <Play size={18} strokeWidth={2} />
                    Listen Now
                  </>
                )}
              </button>
              <Link
                href="/radio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold
                           text-[var(--color-blue-700)] border border-[var(--color-blue-300)] rounded-[var(--radius-sm)] w-full sm:w-auto
                           hover:bg-[var(--color-blue-100)] transition-colors
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
              >
                Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
