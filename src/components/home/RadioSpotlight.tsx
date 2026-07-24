"use client";

import React from "react";
import Link from "next/link";
import { Radio, Play, Headphones } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function RadioSpotlight() {
  const { play, stations, isPlaying, currentStation } = useRadioPlayer();
  const station = stations[0];

  return (
    <section className="bg-white py-16" id="radio-spotlight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-cloud border border-line rounded-md overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icon & Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-md bg-sky-50">
                <Headphones size={28} strokeWidth={1.75} className="text-sky-500" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-800">
                  Listen to Asriel FM
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Daily teachings, worship, and prayer — streaming live.
                </p>
                <p className="text-xs text-slate-600/70 mt-1">
                  {station?.schedule || "Daily · 6:00 AM – 6:00 PM"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => station && play(station)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                           bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                id="radio-play-btn"
              >
                {isPlaying && currentStation?.id === station?.id ? (
                  <>
                    <Radio size={16} strokeWidth={1.75} />
                    Playing
                  </>
                ) : (
                  <>
                    <Play size={16} strokeWidth={1.75} />
                    Listen Now
                  </>
                )}
              </button>
              <Link
                href="/radio"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                           text-sky-500 border border-sky-200 rounded-md
                           hover:bg-sky-100 transition-colors
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
