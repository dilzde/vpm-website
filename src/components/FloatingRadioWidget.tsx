"use client";

import React from "react";
import { Pause, Play } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function FloatingRadioWidget() {
  const { isPlaying, isBuffering, toggle } = useRadioPlayer();

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-end gap-2 font-sans">

      {/* Floating Radio Player Widget */}
      <div className="flex items-center gap-2.5 bg-[var(--color-navy-900)] text-white p-2 sm:p-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-[#29A3E4]/50 backdrop-blur-md">
        
        {/* Play Status Details (hidden on mobile, clear on desktop) */}
        <div className="pl-3 pr-1 text-left hidden sm:block">
          <p className="text-[10px] font-mono font-bold text-[#62B4EE] uppercase tracking-wider leading-none mb-1">
            {isPlaying ? (isBuffering ? "Connecting..." : "Live Broadcasting") : "Asriel Radio"}
          </p>
          <p className="text-xs font-extrabold text-white leading-none">
            {isPlaying ? "Prophetic Stream" : "Listen Live"}
          </p>
        </div>

        {/* Interactive Play/Pause Circle Button */}
        <button
          type="button"
          onClick={() => toggle()}
          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isPlaying
              ? "bg-[#29A3E4] text-white ring-4 ring-[#29A3E4]/50 scale-105 animate-pulse"
              : "bg-[#29A3E4] text-white hover:bg-[#1E87C2] hover:scale-108 active:scale-95"
          }`}
          aria-label={isPlaying ? "Pause Radio Stream" : "Play Radio Stream"}
          title={isPlaying ? "Playing Asriel Radio (Click to Pause)" : "Listen to Asriel Radio Live (Click to Play)"}
        >
          {isPlaying ? (
            <Pause size={20} className="fill-white text-white" />
          ) : (
            <Play size={20} className="ml-0.5 fill-white text-white" />
          )}
        </button>

      </div>

    </div>
  );
}
