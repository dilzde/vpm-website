"use client";

import React, { useState, useEffect } from "react";
import { Radio, Pause, Play, X, Sparkles, Volume2 } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function FloatingRadioWidget() {
  const { isPlaying, isBuffering, toggle } = useRadioPlayer();
  const [showTooltip, setShowTooltip] = useState(true);
  const [userDismissed, setUserDismissed] = useState(false);

  useEffect(() => {
    if (isPlaying || userDismissed) {
      setShowTooltip(false);
      return;
    }

    // Show popup tooltip on page load
    setShowTooltip(true);

    // Auto hide popup after 12 seconds if not clicked
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    // Recur popup every 60 seconds to prompt user
    const interval = setInterval(() => {
      if (!isPlaying && !userDismissed) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 12000);
      }
    }, 60000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [isPlaying, userDismissed]);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* Eye-Catching Popup Tooltip Prompting Visitor */}
      {showTooltip && !isPlaying && (
        <div className="bg-[var(--color-navy-900)] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-[var(--shadow-xl)] flex items-center gap-3 border-2 border-[var(--color-accent)] animate-bounce">
          <button
            type="button"
            onClick={() => {
              toggle();
              setShowTooltip(false);
            }}
            className="flex items-center gap-2 text-white hover:text-[var(--color-accent)] transition-colors cursor-pointer text-left"
          >
            <Sparkles size={16} className="text-[var(--color-accent)] shrink-0 animate-spin" />
            <div>
              <p className="font-extrabold text-sm text-[var(--color-accent)] leading-tight">
                Asriel Radio 24/7
              </p>
              <p className="font-medium text-xs text-white/90">
                Want to listen to divine knowledge?
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setUserDismissed(true);
              setShowTooltip(false);
            }}
            className="text-white/60 hover:text-white transition-colors p-1 shrink-0"
            aria-label="Dismiss message"
          >
            <X size={14} />
          </button>
        </div>
      )}

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
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isPlaying
              ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] ring-4 ring-[var(--color-accent)]/40"
              : "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:scale-110"
          }`}
          aria-label={isPlaying ? "Pause Radio Stream" : "Play Radio Stream"}
          title={isPlaying ? "Playing Asriel Radio (Click to Pause)" : "Listen to Asriel Radio Live (Click to Play)"}
        >
          {isPlaying ? (
            <Pause size={24} className="fill-current" />
          ) : (
            <Play size={24} className="ml-1 fill-current" />
          )}
        </button>

      </div>

    </div>
  );
}
