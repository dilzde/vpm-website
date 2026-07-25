"use client";

import React from "react";
import { Play, Pause, ExternalLink, Radio, Volume2, Clock } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function RadioPage() {
  const { stations, currentStation, isPlaying, play, pause } = useRadioPlayer();
  const directZenoUrl = "https://stream.zeno.fm/iy8v0envboitv";

  return (
    <div className="bg-[var(--color-charcoal-950)] text-white min-h-screen py-12 md:py-20 relative overflow-hidden">
      
      {/* Westside Mood: Plum Accent Gradient Scrim */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-plum)]/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-navy-900)]/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-gold-500)]/20 border border-[var(--color-gold-500)]/40 text-[var(--color-gold-500)] text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <Radio size={14} />
            <span>Listen Live 24/7</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-4">
            Asriel Radio Sanctuary
          </h1>
          <p className="text-base text-slate-300 font-sans leading-relaxed">
            Continuous prophetic teachings, intercessory prayer, and heavenly worship broadcasting 24 hours a day to build faith across the nations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Expanded Radio Player (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-serif text-2xl text-white font-semibold">
                Broadcast Channels
              </h2>
              {/* Animated CSS Waveform */}
              <div className="flex items-end gap-1 h-5">
                <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-pulse" : "h-2"}`} />
                <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-2"}`} />
                <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-6 animate-pulse delay-150" : "h-2"}`} />
                <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse delay-100" : "h-2"}`} />
              </div>
            </div>

            <div className="space-y-4">
              {stations.map((station) => {
                const active = currentStation?.id === station.id;
                return (
                  <div
                    key={station.id}
                    className={`p-6 rounded-lg border transition-all flex items-center justify-between ${
                      active
                        ? "bg-[var(--color-navy-900)] text-white border-[var(--color-gold-500)] shadow-lg"
                        : "bg-black/30 text-white border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-sans font-bold text-[var(--color-gold-500)] uppercase tracking-wider block mb-1">
                        {station.schedule}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-white">
                        {station.name}
                      </h3>
                      <p className="text-xs font-sans text-slate-300">
                        {station.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (active && isPlaying) pause();
                        else play(station);
                      }}
                      className="w-14 h-14 rounded-full bg-[var(--color-gold-500)] text-[var(--color-ink)] flex items-center justify-center shrink-0 hover:bg-[var(--color-gold-700)] transition-all cursor-pointer shadow-md"
                      aria-label={active && isPlaying ? "Pause" : "Play"}
                    >
                      {active && isPlaying ? (
                        <Pause size={24} className="fill-current" />
                      ) : (
                        <Play size={24} className="ml-1 fill-current" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Zeno Stream & Dedicated Domain (5 cols) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <h2 className="font-serif text-2xl text-white font-semibold border-b border-white/10 pb-4">
              Radio Portal & Links
            </h2>

            <p className="text-sm font-sans text-slate-300 leading-relaxed">
              Asriel FM radio streams 24/7 globally powered by Zeno Media. You can listen right here on the VPM platform or visit our standalone radio domain at <strong>asrielradio.com</strong>.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={directZenoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-4 rounded-lg bg-black/40 border border-white/15 text-sm font-sans font-bold text-white hover:border-[var(--color-gold-500)] transition-all"
              >
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-[var(--color-gold-500)]" />
                  <span>Direct Zeno Stream URL</span>
                </div>
                <ExternalLink size={16} className="text-[var(--color-gold-500)]" />
              </a>

              <a
                href="https://asrielradio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-4 rounded-lg bg-black/40 border border-white/15 text-sm font-sans font-bold text-white hover:border-[var(--color-gold-500)] transition-all"
              >
                <div className="flex items-center gap-2">
                  <Radio size={16} className="text-[var(--color-gold-500)]" />
                  <span>asrielradio.com Official Portal</span>
                </div>
                <ExternalLink size={16} className="text-[var(--color-gold-500)]" />
              </a>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 font-sans text-xs text-slate-300">
              <div className="flex items-center gap-2 text-[var(--color-gold-500)] font-bold">
                <Clock size={14} />
                <span>Weekly Schedule</span>
              </div>
              <p>• Daily Teachings: 6:00 AM – 6:00 PM</p>
              <p>• Prophetic Prayer & Revival: 8:00 PM – Midnight</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
