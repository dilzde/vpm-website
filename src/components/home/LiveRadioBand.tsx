"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Radio, Calendar, Video, Volume2, ExternalLink } from "lucide-react";
import { getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function LiveRadioBand() {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const { isPlaying, toggle } = useRadioPlayer();

  useEffect(() => {
    getLiveStatus().then(setLiveVideo).catch(console.error);
  }, []);

  return (
    <section
      className="w-full bg-[var(--color-navy-900)] text-white py-14 md:py-20 border-b border-[var(--color-line-dark)] relative overflow-hidden"
      id="live-radio-band"
    >
      {/* Subtle Ambient Decorative Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Live Sanctuary Status or Next Gathering (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[var(--color-navy-700)] border border-[var(--color-line-dark)] rounded-[var(--radius-eight)] p-6 sm:p-8 shadow-[var(--shadow-xl)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                {liveVideo ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-live)] text-white text-xs font-sans font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Live Now</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] text-xs font-sans font-bold uppercase tracking-wider shadow-xs">
                    <Calendar size={13} />
                    <span>Next Sanctuary Gathering</span>
                  </div>
                )}
                <span className="text-xs font-mono text-white/70">Asriel TV Broadcast</span>
              </div>

              {liveVideo ? (
                <div>
                  <h3 className="font-sans text-2xl font-bold text-white mb-4 leading-tight">
                    {liveVideo.title}
                  </h3>
                  <div className="w-full aspect-video rounded-[var(--radius-eight)] overflow-hidden bg-black border border-white/20">
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
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Sunday Worship & Prophetic Word
                  </h3>
                  <p className="text-sm font-sans text-white/85 leading-relaxed max-w-lg">
                    Join us live from Nairobi Main Sanctuary (Family Bank, Mlolongo) for intercessory prayer, prophetic worship, and foundational preaching every Sunday at 8:30 AM.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-[var(--radius-eight)] bg-white/10 border border-white/15">
                      <p className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider">
                        Official Sunday Service
                      </p>
                      <p className="text-lg font-sans font-extrabold text-white mt-1">
                        8:30 AM – 4:00 PM
                      </p>
                    </div>
                    <div className="p-4 rounded-[var(--radius-eight)] bg-white/10 border border-white/15">
                      <p className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider">
                        Prophetic Checking (Wed)
                      </p>
                      <p className="text-lg font-sans font-extrabold text-white mt-1">
                        11:00 AM – 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/15 mt-6 flex items-center justify-between text-xs font-sans text-white/70">
              <span className="flex items-center gap-1.5 font-medium">
                <Video size={14} className="text-[var(--color-accent)]" />
                <span>Broadcasting to Nations</span>
              </span>
              <span className="font-mono text-white/90">Asriel TV (Channel A & B)</span>
            </div>
          </div>

          {/* Right Column: Prominent Asriel Radio Player (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--color-navy-700)] border border-[var(--color-line-dark)] rounded-[var(--radius-eight)] p-6 sm:p-8 shadow-[var(--shadow-xl)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold shadow-md">
                    <Radio size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-extrabold text-white leading-none">Asriel Radio</h3>
                    <span className="text-[11px] font-mono font-bold text-[var(--color-accent)] uppercase tracking-wider block mt-1">
                      24/7 Live Stream
                    </span>
                  </div>
                </div>

                {/* Animated CSS Audio Waveform Indicator */}
                <div className="flex items-end gap-1 h-5">
                  <span className={`w-1 bg-[var(--color-accent)] rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-pulse" : "h-2 opacity-50"}`} />
                  <span className={`w-1 bg-[var(--color-accent)] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-2 opacity-50"}`} />
                  <span className={`w-1 bg-[var(--color-accent)] rounded-full transition-all duration-300 ${isPlaying ? "h-6 animate-pulse delay-150" : "h-2 opacity-50"}`} />
                  <span className={`w-1 bg-[var(--color-accent)] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse delay-100" : "h-2 opacity-50"}`} />
                </div>
              </div>

              {/* Player Inner Card */}
              <div className="bg-[var(--color-navy-900)] border border-white/15 rounded-[var(--radius-eight)] p-6 text-center my-4 space-y-3">
                <span className="text-[11px] font-sans font-bold text-white/60 uppercase tracking-widest block">
                  NOW BROADCASTING
                </span>
                <h4 className="font-sans text-xl font-extrabold text-white">
                  Anointed Preaching & Worship
                </h4>
                <p className="text-xs text-[var(--color-accent)] font-sans font-medium">
                  Streaming live via Zeno.fm
                </p>

                {/* Large Circular Play/Pause Button in Lime Accent */}
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => toggle()}
                    className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
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

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-sans text-white/80">
              <span className="flex items-center gap-1.5 font-medium">
                <Volume2 size={14} className="text-[var(--color-accent)]" />
                <span>Continuous Stream</span>
              </span>
              <a
                href="https://asrielradio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[var(--color-accent)] hover:underline"
              >
                <span>asrielradio.com</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
