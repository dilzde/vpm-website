"use client";

import React from "react";
import { Play, Pause, Headphones, Clock } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

const SCHEDULE = [
  { time: "6:00 AM", program: "Morning Devotion", duration: "1 hour" },
  { time: "7:00 AM", program: "Praise and Worship", duration: "1 hour" },
  { time: "8:00 AM", program: "Word of the Day", duration: "1 hour" },
  { time: "9:00 AM", program: "Main Teaching", duration: "2 hours" },
  { time: "11:00 AM", program: "Testimonies and Prayer", duration: "1 hour" },
  { time: "12:00 PM", program: "Midday Intercession", duration: "1 hour" },
  { time: "1:00 PM", program: "Afternoon Teaching", duration: "2 hours" },
  { time: "3:00 PM", program: "Healing and Deliverance", duration: "1 hour" },
  { time: "4:00 PM", program: "Prophetic Hour", duration: "1 hour" },
  { time: "5:00 PM", program: "Evening Devotion", duration: "1 hour" },
];

export default function RadioPage() {
  const { stations, currentStation, isPlaying, isBuffering, play, pause } = useRadioPlayer();

  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Radio</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Listen to daily teachings, worship, and prayer on our radio stations.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stations */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-serif font-bold text-slate-800 mb-4">Stations</h2>
              {stations.map((station) => {
                const active = currentStation?.id === station.id;
                return (
                  <div
                    key={station.id}
                    className={`bg-cloud border rounded-md p-5 transition-colors ${
                      active ? "border-sky-500" : "border-line hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">{station.name}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">{station.description}</p>
                        <p className="text-xs text-slate-600/70 mt-1">{station.schedule}</p>
                      </div>
                      <button
                        onClick={() => active && isPlaying ? pause() : play(station)}
                        className={`p-3 rounded-full transition-colors ${
                          active && isPlaying
                            ? "bg-sky-500 text-white"
                            : "bg-sky-50 text-sky-500 hover:bg-sky-100"
                        }`}
                        aria-label={active && isPlaying ? `Pause ${station.name}` : `Play ${station.name}`}
                      >
                        {isBuffering && active ? (
                          <span className="inline-block w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : active && isPlaying ? (
                          <Pause size={20} strokeWidth={1.75} />
                        ) : (
                          <Play size={20} strokeWidth={1.75} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Schedule */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-serif font-bold text-slate-800 mb-4">
                Today&apos;s Schedule — Asriel FM
              </h2>
              <div className="bg-cloud border border-line rounded-md overflow-hidden">
                <div className="divide-y divide-line">
                  {SCHEDULE.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-sky-50/50 transition-colors">
                      <span className="text-xs font-mono text-slate-600/70 w-20 shrink-0">{item.time}</span>
                      <div className="flex-1">
                        <span className="text-sm text-slate-800">{item.program}</span>
                      </div>
                      <span className="text-xs text-slate-600/50 flex items-center gap-1">
                        <Clock size={12} strokeWidth={1.75} />
                        {item.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
