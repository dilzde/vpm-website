"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Radio, Calendar, Video, Volume2 } from "lucide-react";
import { getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function LiveRadioBand() {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const { isPlaying, toggle, currentStation } = useRadioPlayer();

  useEffect(() => {
    getLiveStatus().then(setLiveVideo).catch(console.error);
  }, []);

  return (
    <section
      className="w-full bg-[var(--color-charcoal-950)] text-white py-14 md:py-20 border-b border-white/10 relative overflow-hidden"
      id="live-radio-band"
    >
      {/* Westside Mood: Subtle Plum Accent Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-plum)]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-navy-900)]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Live Sanctuary Status or Next Gathering (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                {liveVideo ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-live)]/20 border border-[var(--color-live)]/40 text-[var(--color-live)] text-xs font-sans font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-live)] animate-ping" />
                    <span>Live Now</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[var(--color-gold-500)] text-xs font-sans font-bold uppercase tracking-wider">
                    <Calendar size={13} />
                    <span>Next Sanctuary Gathering</span>
                  </div>
                )}
                <span className="text-xs font-mono text-slate-400">Asriel TV Broadcast</span>
              </div>

              {liveVideo ? (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4 leading-tight">
                    {liveVideo.title}
                  </h3>
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black border border-white/15">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${liveVideo.videoId}?autoplay=1`}
                      title={liveVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    Sunday Worship & Prophetic Word
                  </h3>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed max-w-lg">
                    Join us live from Githurai Main Altar for intercessory prayer, worship, and foundational preaching every Sunday at 9:00 AM.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-sans font-bold text-[var(--color-gold-500)] uppercase">Sunday Gathering</p>
                      <p className="text-lg font-sans font-bold text-white mt-1">9:00 AM – 1:00 PM</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-sans font-bold text-[var(--color-gold-500)] uppercase">Wednesday Midweek</p>
                      <p className="text-lg font-sans font-bold text-white mt-1">5:30 PM – 7:30 PM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-sans text-slate-400">
              <span className="flex items-center gap-1.5">
                <Video size={14} className="text-[var(--color-gold-500)]" />
                <span>Broadcasting to Nations</span>
              </span>
              <span>Channel A & B</span>
            </div>
          </div>

          {/* Right Column: Prominent Radio Player (5 cols, Part D §3 Spec) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-gold-500)] text-[var(--color-ink)] flex items-center justify-center font-bold shadow-md">
                    <Radio size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-white leading-none">Asriel Radio</h3>
                    <span className="text-[11px] font-mono text-[var(--color-gold-500)] uppercase tracking-wider">24/7 Live Stream</span>
                  </div>
                </div>

                {/* Animated CSS Audio Waveform Indicator */}
                <div className="flex items-end gap-1 h-5">
                  <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-pulse" : "h-2"}`} />
                  <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-2"}`} />
                  <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-6 animate-pulse delay-150" : "h-2"}`} />
                  <span className={`w-1 bg-[var(--color-gold-500)] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse delay-100" : "h-2"}`} />
                </div>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-lg p-6 text-center my-4">
                <p className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  Now Broadcasting
                </p>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  Anointed Preaching & Worship
                </h4>
                <p className="text-xs text-[var(--color-gold-500)] font-sans">
                  Streaming live via Zeno.fm
                </p>

                {/* Large Circular Play/Pause Button in Gold (Part D §3) */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => toggle()}
                    className="w-16 h-16 rounded-full bg-[var(--color-gold-500)] text-[var(--color-ink)] flex items-center justify-center shadow-lg hover:scale-105 hover:bg-[var(--color-gold-700)] transition-all cursor-pointer"
                    aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
                  >
                    {isPlaying ? (
                      <Pause size={28} className="fill-current" />
                    ) : (
                      <Play size={28} className="ml-1 fill-current" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-slate-300">
              <span className="flex items-center gap-1">
                <Volume2 size={14} className="text-[var(--color-gold-500)]" />
                <span>Continuous Stream</span>
              </span>
              <a
                href="https://asrielradio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-500)] hover:underline font-semibold"
              >
                asrielradio.com →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
