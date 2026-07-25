"use client";

import React from "react";
import { Play, Pause, ExternalLink, Radio, Volume2, Headphones } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import PlaceholderRadio from "@/components/placeholders/PlaceholderRadio";

export default function RadioPage() {
  const { stations, currentStation, isPlaying, isBuffering, play, pause } = useRadioPlayer();
  const directZenoUrl = process.env.NEXT_PUBLIC_RADIO_STATION_1_URL || "https://stream.zeno.fm/iy8v0envboitv";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Radio size={15} className="text-[var(--color-accent)]" />
            Listen Live 24/7
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Asriel FM <span className="highlight-block">Radio</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Listen to daily anointed teachings, heavenly worship, and intercessory prayer broadcasting continuously to strengthen your spirit wherever you go.
          </p>
        </div>
      </section>

      {/* Main Content & Radio Stations Band */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left: Stations Interactive Showcase (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
                <h2 className="text-2xl font-display font-extrabold text-[var(--color-ink)] tracking-tight">
                  Live Transmission Channels
                </h2>
                <span className="px-3 py-1 bg-green-500/10 text-green-700 font-display font-bold text-xs uppercase rounded-full flex items-center gap-1.5 border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
                  Stream Online
                </span>
              </div>

              <div className="space-y-6">
                {stations.map((station) => {
                  const active = currentStation?.id === station.id;
                  return (
                    <div
                      key={station.id}
                      className={`rounded-[var(--radius-lg)] p-8 transition-all duration-300 shadow-md ${
                        active 
                          ? "bg-[var(--color-navy-950)] border-2 border-[var(--color-accent)] text-white shadow-[var(--shadow-accent)]" 
                          : "bg-[var(--color-cloud)] border border-[var(--color-line)] hover:border-[var(--color-navy-900)] text-[var(--color-ink)] hover:shadow-xl"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {active && isPlaying && (
                              <span className="flex h-3 w-3 relative shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-80" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
                              </span>
                            )}
                            <h3 className={`text-2xl font-display font-extrabold ${active ? "text-white" : "text-[var(--color-ink)]"}`}>
                              {station.name}
                            </h3>
                          </div>
                          <p className={`text-base font-sans leading-relaxed ${active ? "text-slate-300" : "text-[var(--color-slate)]"}`}>
                            {station.description}
                          </p>
                          <div className="inline-block mt-4 px-3 py-1 rounded bg-white/10 text-[11px] font-mono uppercase tracking-wider font-semibold">
                            {station.schedule}
                          </div>
                        </div>

                        <button
                          onClick={() => (active && isPlaying ? pause() : play(station))}
                          className={`w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center rounded-full transition-all duration-300 shrink-0 cursor-pointer shadow-lg transform hover:scale-105 ${
                            active && isPlaying
                              ? "bg-[var(--color-accent)] text-white shadow-[0_0_25px_rgba(217,119,6,0.6)]"
                              : "bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-accent)]"
                          }`}
                          aria-label={active && isPlaying ? `Pause ${station.name}` : `Play ${station.name}`}
                        >
                          {isBuffering && active ? (
                            <span className="inline-block w-7 h-7 animate-spin rounded-full border-3 border-current border-t-transparent" />
                          ) : active && isPlaying ? (
                            <Pause size={28} strokeWidth={2.5} />
                          ) : (
                            <Play size={28} strokeWidth={2.5} className="ml-1 fill-current" />
                          )}
                        </button>
                      </div>

                      {/* Direct Zeno Stream fallback URL link for external listening */}
                      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between text-xs gap-3">
                        <span className={`font-mono ${active ? "text-slate-400" : "text-[var(--color-slate)]"}`}>
                          Stream Engine: Zeno Media
                        </span>
                        <a
                          href={directZenoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-accent)] font-display font-bold hover:underline flex items-center gap-1.5 uppercase tracking-wider"
                        >
                          <span>Open Direct Zeno Stream</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Programme Schedule & AsrielRadio.com Portal (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[var(--color-navy-950)] border border-white/15 rounded-[var(--radius-lg)] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[var(--color-accent)]/20 pointer-events-none">
                  <Volume2 size={120} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <p className="text-[var(--color-accent)] text-xs font-display font-bold uppercase tracking-widest mb-2">
                    Official Portal
                  </p>
                  <h2 className="text-3xl font-display font-extrabold mb-4">
                    Programme Schedule
                  </h2>
                  
                  <div className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-6 mb-8 mt-6">
                    <div className="flex items-center gap-4 mb-4 text-[var(--color-accent)]">
                      <Headphones size={26} />
                      <h4 className="font-display font-bold text-white text-lg">AsrielRadio.com</h4>
                    </div>
                    <p className="text-sm font-sans text-slate-300 leading-relaxed mb-6">
                      View our comprehensive daily broadcast timetables, upcoming worship gatherings, host pastor schedules, and exclusive audio archives directly on the official Asriel Radio web platform.
                    </p>
                    <a
                      href="https://asrielradio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] font-display font-bold text-xs uppercase tracking-wider rounded-[var(--radius-sm)] transition-all duration-200 shadow-[var(--shadow-accent)]"
                    >
                      <span>Visit AsrielRadio.com Portal</span>
                      <ExternalLink size={16} strokeWidth={2.5} />
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-400 font-sans">
                      Need help playing the stream? You can also paste our Zeno link (<code className="text-slate-200 font-mono text-[11px]">{directZenoUrl}</code>) directly into any modern audio player.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 flex items-center justify-center">
                <PlaceholderRadio />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

