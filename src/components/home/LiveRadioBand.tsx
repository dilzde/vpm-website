"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Radio, Calendar, Video, Volume2, ExternalLink } from "lucide-react";
import { getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import type { LivestreamConfig } from "@/lib/livestream-types";

export default function LiveRadioBand({
  initialLivestreamConfig,
}: {
  initialLivestreamConfig?: LivestreamConfig | null;
}) {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const [radioConfig, setRadioConfig] = useState<LivestreamConfig | null>(initialLivestreamConfig || null);
  const { isPlaying, toggle } = useRadioPlayer();

  useEffect(() => {
    getLiveStatus().then(setLiveVideo).catch(console.error);
    if (initialLivestreamConfig) {
      setRadioConfig(initialLivestreamConfig);
    }
  }, [initialLivestreamConfig]);

  return (
    <section
      className="w-full bg-[var(--color-surface)] text-[var(--color-ink)] py-5 sm:py-6 border-b border-[var(--color-line)] relative"
      id="live-radio-band"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#D5E3F0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Left: Sanctuary Services / Broadcast Schedule */}
          <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1B5299] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Calendar size={20} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-sans font-extrabold text-[#1B5299] uppercase tracking-wider">
                  Sanctuary Gatherings
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-xs text-[var(--color-slate)] font-sans">
                  Nairobi HQ (Mlolongo) &amp; Branches
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm font-sans font-bold text-[var(--color-ink)]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B5299]" />
                  Sunday Service: 8:30 AM – 4:00 PM
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29A3E4]" />
                  Wed Checking: 11:00 AM – 3:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sleek Asriel Radio Player Bar */}
          <div className="w-full md:w-auto flex items-center justify-between sm:justify-end gap-3.5 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--color-line)] shrink-0">
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-sans font-extrabold text-[var(--color-ink)] leading-none">
                  Asriel Radio
                </p>
                <span className="text-[10px] font-mono font-bold text-[#1B5299] uppercase">
                  24/7 Live
                </span>
              </div>
              <p className="text-[11px] font-sans text-[var(--color-slate)] mt-0.5">
                {isPlaying ? "Broadcasting on air" : "Global prophetic stream"}
              </p>
            </div>

            {/* Compact Play Button */}
            <button
              type="button"
              onClick={() => toggle()}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold font-sans transition-all cursor-pointer shadow-xs ${
                isPlaying
                  ? "bg-[#29A3E4] text-white ring-2 ring-[#29A3E4]/40"
                  : "bg-[var(--color-navy-900)] hover:bg-[#1A3A6B] text-white hover:scale-102"
              }`}
              aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
            >
              {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
              <span>{isPlaying ? "Pause Radio" : "Listen Live"}</span>
            </button>

            <a
              href="https://asrielradio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#1B5299] hover:underline hidden sm:inline-flex items-center gap-0.5"
            >
              <span>asrielradio.com</span>
              <ExternalLink size={11} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
