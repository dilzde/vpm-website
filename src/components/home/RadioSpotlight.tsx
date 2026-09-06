"use client";

import React from "react";
import Link from "next/link";
import { Radio, Play, Volume2 } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import PlaceholderRadio from "../placeholders/PlaceholderRadio";

export default function RadioSpotlight() {
  const { play, stations, isPlaying, currentStation } = useRadioPlayer();
  const station = stations[0];

  return (
    <section className="band-navy py-20 md:py-28 relative overflow-hidden" id="radio-spotlight">
      {/* Background radial glow */}
      <div className="absolute -left-20 -bottom-20 w-[450px] h-[450px] rounded-full bg-[var(--color-accent)]/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden flex flex-col lg:flex-row w-full shadow-2xl backdrop-blur-sm">
          
          {/* Left: Illustration Showcase */}
          <div className="w-full lg:w-80 h-56 lg:h-auto shrink-0 relative bg-[var(--color-navy-950)] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 p-6">
            <PlaceholderRadio />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)] text-white text-[10px] font-display font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
              Live 24/7
            </div>
          </div>

          {/* Right: Info and Actions */}
          <div className="p-8 md:p-12 flex flex-col md:flex-row flex-1 items-start md:items-center justify-between gap-8">
            <div className="flex-1 max-w-xl">
              <p className="text-[var(--color-accent)] text-xs font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <Volume2 size={16} strokeWidth={2.5} className="text-[var(--color-accent)]" />
                Global Audio Transmission
              </p>
              <h2
                className="text-3xl sm:text-4xl font-display font-extrabold !text-white mb-4 tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                Stream <span className="highlight-block">Asriel FM Radio</span>
              </h2>
              <p
                className="text-base md:text-lg !text-white leading-relaxed font-sans"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                Tune in to powerful daily sermons, prophetic intercession, and heavenly worship broadcasting continuously to encourage your faith wherever you go.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
              <button
                onClick={() => station && play(station)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-display font-bold uppercase tracking-wider
                           bg-[#29A3E4] text-white rounded-[var(--radius-sm)] hover:bg-[#1E87C2] 
                           transition-all duration-200 shadow-[var(--shadow-accent)] transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
                id="radio-play-btn"
              >
                {isPlaying && currentStation?.id === station?.id ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span>Now Playing Live</span>
                  </>
                ) : (
                  <>
                    <Play size={18} strokeWidth={2.5} className="fill-current" />
                    <span>Listen Live Now</span>
                  </>
                )}
              </button>
              <Link
                href="/radio"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-display font-bold uppercase tracking-wider
                           text-white bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40
                           rounded-[var(--radius-sm)] transition-all duration-200 w-full sm:w-auto"
              >
                <span>View Schedule</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
