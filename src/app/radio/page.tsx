"use client";

import React from "react";
import Link from "next/link";
import { Play, Pause, Radio as RadioIcon, Volume2, Globe, ExternalLink, Calendar } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import { RECURRING_SCHEDULE } from "@/lib/data/schedule";

export default function RadioPage() {
  const { isPlaying, toggle } = useRadioPlayer();

  return (
    <div className="bg-[var(--color-navy-900)] text-white min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            24/7 GLOBAL BROADCAST
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-4 tracking-tight">
            Asriel Radio Live
          </h1>
          <p className="text-base text-white/80 font-sans leading-relaxed">
            Streaming anointed preachings, intercessory worship, and prophetic revelations 24 hours a day across Kenya and the world.
          </p>
        </div>

        {/* Radio Player Hero Card (§K High Contrast Dark Background) */}
        <div className="bg-[var(--color-navy-700)] border border-[var(--color-line-dark)] rounded-[var(--radius-image)] p-8 sm:p-12 shadow-[var(--shadow-xl)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs uppercase tracking-wider">
                Live Broadcast Stream
              </span>
              <span className="text-xs text-white/60 font-mono">Zeno.fm Official Stream</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
              Asriel Radio Global Stream
            </h2>

            <p className="text-sm text-white/80 font-sans leading-relaxed">
              Listen live directly in your browser. Hosted on Zeno FM, broadcasting continuous prophetic teachings and prayer sessions.
            </p>

            {/* Play Button & Waveform */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => toggle()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-base hover:scale-105 transition-all shadow-md cursor-pointer"
              >
                {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
                <span>{isPlaying ? "Pause Stream" : "Listen Live Now"}</span>
              </button>

              {isPlaying && (
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[var(--color-accent)]">
                  <Volume2 size={16} />
                  <span>Streaming 128kbps AAC</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Portal Links (§K) */}
          <div className="lg:col-span-5 bg-[var(--color-navy-900)] border border-[var(--color-line-dark)] rounded-[var(--radius-eight)] p-6 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Globe size={18} className="text-[var(--color-accent)]" />
              <span>Official Radio Portal</span>
            </div>

            <p className="text-xs text-white/70 font-sans leading-relaxed">
              Visit <strong>asrielradio.com</strong> for our official radio schedules, station announcements, and additional broadcast mirrors.
            </p>

            <a
              href="https://asrielradio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              <span>Visit asrielradio.com</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </div>

        {/* Weekly Broadcast Schedule Grid (§J & §K Single Source of Truth) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={20} className="text-[var(--color-accent)]" />
            <h2 className="font-sans text-2xl font-bold text-white">
              Weekly Broadcast Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECURRING_SCHEDULE.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--color-navy-700)] border border-[var(--color-line-dark)] rounded-[var(--radius-eight)] p-6 space-y-3"
              >
                <span className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider block">
                  {item.dayName}
                </span>

                <h3 className="font-sans text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-white/90 font-semibold bg-white/10 px-3 py-1.5 rounded inline-block">
                  {item.startTime} – {item.endTime}
                </p>

                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  {item.description}
                </p>

                <p className="text-[11px] text-white/50 font-sans italic pt-2 border-t border-white/10">
                  Platform: {item.platform}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
