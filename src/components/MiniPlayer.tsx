"use client";

import React from "react";
import { Play, Pause, X, Radio } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function MiniPlayer() {
  const { currentStation, isPlaying, isBuffering, toggle, stop, visible } = useRadioPlayer();

  if (!visible || !currentStation) return null;

  return (
    <>
      {/* Desktop: floating pill bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-3
                    bg-white border border-line rounded-full px-4 py-2.5
                    shadow-float transition-transform duration-300"
        role="region"
        aria-label="Radio mini player"
        id="mini-player-desktop"
      >
        <Radio size={16} strokeWidth={1.75} className="text-sky-500 shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-800 truncate max-w-36">{currentStation.name}</span>
          <span className="text-xs text-slate-600 truncate max-w-36">{isBuffering ? "Connecting…" : "Live Radio"}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-1.5 rounded-full hover:bg-sky-50 transition-colors text-slate-800
                       focus-visible:outline-2 focus-visible:outline-sky-500"
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isBuffering ? (
              <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            ) : isPlaying ? (
              <Pause size={16} strokeWidth={1.75} />
            ) : (
              <Play size={16} strokeWidth={1.75} />
            )}
          </button>
          <button
            onClick={stop}
            className="p-1.5 rounded-full hover:bg-sky-50 transition-colors text-slate-600
                       focus-visible:outline-2 focus-visible:outline-sky-500"
            aria-label="Close radio player"
          >
            <X size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Mobile: full-width bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden
                    bg-white border-t border-line shadow-float px-4 py-3 flex items-center gap-3"
        role="region"
        aria-label="Radio mini player"
        id="mini-player-mobile"
      >
        <Radio size={18} strokeWidth={1.75} className="text-sky-500 shrink-0" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-slate-800 truncate">{currentStation.name}</span>
          <span className="text-xs text-slate-600">{isBuffering ? "Connecting…" : "Live Radio"}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-sky-50 transition-colors text-slate-800
                       focus-visible:outline-2 focus-visible:outline-sky-500"
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isBuffering ? (
              <span className="inline-block w-5 h-5 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            ) : isPlaying ? (
              <Pause size={20} strokeWidth={1.75} />
            ) : (
              <Play size={20} strokeWidth={1.75} />
            )}
          </button>
          <button
            onClick={stop}
            className="p-2 rounded-full hover:bg-sky-50 transition-colors text-slate-600
                       focus-visible:outline-2 focus-visible:outline-sky-500"
            aria-label="Close radio player"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </>
  );
}
