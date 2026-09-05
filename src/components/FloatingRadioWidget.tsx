"use client";

import React from "react";
import { Pause, Play } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function FloatingRadioWidget() {
  const { isPlaying, isBuffering, toggle } = useRadioPlayer();

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3 font-sans">

      {/* Hovering Bottom-Right Floating Radio Player Card Button */}
      <div className="flex items-center gap-3 bg-[var(--color-navy-900)] text-white p-2.5 rounded-full shadow-[var(--shadow-xl)] border border-[var(--color-accent)]/60">
        
        {/* Play Status Details */}
        <div className="pl-3 pr-1 text-left hidden sm:block">
          <p className="text-[10px] font-mono font-bold text-[var(--color-accent)] uppercase tracking-wider leading-none mb-1">
            {isPlaying ? (isBuffering ? "Connecting..." : "Live Broadcasting") : "Asriel Radio"}
          </p>
          <p className="text-xs font-extrabold text-white leading-none">
            {isPlaying ? "Prophetic Stream" : "Listen Live"}
          </p>
        </div>

        {/* Large Interactive Play/Pause Circle Button */}
        <button
          type="button"
          onClick={() => toggle()}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
            isPlaying
              ? "bg-[#29A3E4] text-white ring-4 ring-[#29A3E4]/50 scale-105"
              : "bg-[#29A3E4] text-white hover:bg-[#1E87C2] hover:scale-110 active:scale-95"
          }`}
          aria-label={isPlaying ? "Pause Radio Stream" : "Play Radio Stream"}
          title={isPlaying ? "Playing Asriel Radio (Click to Pause)" : "Listen to Asriel Radio Live (Click to Play)"}
        >
          {isPlaying ? (
            <Pause size={24} className="fill-white text-white" />
          ) : (
            <Play size={24} className="ml-1 fill-white text-white" />
          )}
        </button>

      </div>

    </div>
  );
}
