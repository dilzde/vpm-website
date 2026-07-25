"use client";

import React from "react";
import { Play, Pause, ExternalLink } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import PlaceholderRadio from "@/components/placeholders/PlaceholderRadio";

export default function RadioPage() {
  const { stations, currentStation, isPlaying, isBuffering, play, pause } = useRadioPlayer();

  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Listen Live
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Radio</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Listen to daily teachings, worship, and prayer on our radio stations.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Stations */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Stations</h2>
              <div className="space-y-4">
                {stations.map((station) => {
                  const active = currentStation?.id === station.id;
                  return (
                    <div
                      key={station.id}
                      className={`bg-white border rounded-[var(--radius-lg)] p-6 transition-all shadow-sm ${
                        active ? "border-[var(--color-blue-500)] ring-1 ring-[var(--color-blue-500)]" : "border-[var(--color-line)] hover:border-[var(--color-blue-300)] hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {active && isPlaying && (
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-blue-400)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-blue-500)]"></span>
                              </span>
                            )}
                            <h3 className={`text-base font-bold ${active ? 'text-[var(--color-blue-500)]' : 'text-[var(--color-ink)]'}`}>
                              {station.name}
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-[var(--color-slate)] mt-1">{station.description}</p>
                          <p className="text-xs font-semibold text-[var(--color-slate)]/70 uppercase tracking-widest mt-2">{station.schedule}</p>
                        </div>
                        <button
                          onClick={() => active && isPlaying ? pause() : play(station)}
                          className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors shrink-0 ${
                            active && isPlaying
                              ? "bg-[var(--color-blue-500)] text-white shadow-md shadow-sky-500/30"
                              : "bg-[var(--color-mist)] text-[var(--color-blue-500)] hover:bg-[var(--color-blue-100)]"
                          }`}
                          aria-label={active && isPlaying ? `Pause ${station.name}` : `Play ${station.name}`}
                        >
                          {isBuffering && active ? (
                            <span className="inline-block w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : active && isPlaying ? (
                            <Pause size={20} strokeWidth={2} />
                          ) : (
                            <Play size={20} strokeWidth={2} className="ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                Programme Schedule
              </h2>
              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <PlaceholderRadio />
                </div>
                
                <div className="relative z-10">
                  <p className="text-base text-[var(--color-slate)] mb-8 max-w-md mx-auto leading-relaxed">
                    View our full daily broadcast schedule and learn more about our 
                    programs directly on the official Asriel Radio website.
                  </p>
                  <a 
                    href="https://asrielradio.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-bold bg-[var(--color-mist)] text-[var(--color-ink)] rounded-[var(--radius-md)] hover:bg-[var(--color-blue-100)] hover:text-[var(--color-blue-700)] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
                  >
                    <ExternalLink size={18} strokeWidth={2} />
                    Visit AsrielRadio.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
