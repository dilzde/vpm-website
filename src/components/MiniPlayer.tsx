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
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-3.5
                    bg-[var(--color-navy-900)]/95 backdrop-blur-md border border-white/15 text-white rounded-full px-5 py-3
                    shadow-[0_8px_30px_rgba(10,17,40,0.5)] transition-all duration-300 hover:border-[var(--color-accent)]"
        role="region"
        aria-label="Radio mini player"
        id="mini-player-desktop"
      >
        <div className="p-2 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center">
          <Radio size={16} strokeWidth={2} className="animate-pulse" />
        </div>
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-xs font-display font-bold text-white truncate max-w-40">{currentStation.name}</span>
          <span className="text-xs text-[var(--color-accent)] truncate max-w-40 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
            {isBuffering ? "Connecting…" : "Live Radio Stream"}
          </span>
        </div>
        <div className="flex items-center gap-1 border-l border-white/15 pl-2">
          <button
            onClick={toggle}
            className="p-2 rounded-full bg-white/10 hover:bg-[var(--color-accent)] transition-all text-white shadow-sm
                       focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isBuffering ? (
              <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
            ) : isPlaying ? (
              <Pause size={15} strokeWidth={2} className="fill-current" />
            ) : (
              <Play size={15} strokeWidth={2} className="fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={stop}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white
                       focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Close radio player"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile: full-width bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden
                    bg-[var(--color-navy-900)] text-white border-t border-white/15 shadow-2xl px-4 py-3 flex items-center gap-3"
        role="region"
        aria-label="Radio mini player"
        id="mini-player-mobile"
      >
        <div className="p-2 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
          <Radio size={18} strokeWidth={2} className="animate-pulse" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-display font-bold text-white truncate">{currentStation.name}</span>
          <span className="text-xs text-[var(--color-accent)] flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
            {isBuffering ? "Connecting…" : "Live Radio Stream"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2.5 rounded-full bg-[var(--color-accent)] text-white shadow-md transition-colors
                       focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isBuffering ? (
              <span className="inline-block w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isPlaying ? (
              <Pause size={18} strokeWidth={2} className="fill-current" />
            ) : (
              <Play size={18} strokeWidth={2} className="fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={stop}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300
                       focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Close radio player"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
