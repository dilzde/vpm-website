"use client";

import React, { useState, useEffect } from "react";
import { Radio, Pause, X } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function FloatingRadioWidget() {
  const { isPlaying, toggle } = useRadioPlayer();
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isPlaying || dismissed) {
      setExpanded(false);
      return;
    }

    // Interval every 60s to expand reminder for 5 seconds (§H)
    const interval = setInterval(() => {
      setExpanded(true);
      setTimeout(() => {
        setExpanded(false);
      }, 5000);
    }, 60000);

    return () => clearInterval(interval);
  }, [isPlaying, dismissed]);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-2 font-sans">
      
      {/* Expanded Tooltip Pill */}
      {expanded && !isPlaying && (
        <div className="bg-[var(--color-navy-900)] text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-[var(--shadow-xl)] flex items-center gap-2 border border-[var(--color-accent)]/40 animate-fade-in">
          <button
            type="button"
            onClick={() => toggle()}
            className="flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            <span>🎧 Listen to Asriel Radio</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
              setExpanded(false);
            }}
            className="text-white/60 hover:text-white transition-colors ml-1 p-0.5"
            aria-label="Dismiss reminder"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        type="button"
        onClick={() => toggle()}
        className={`w-12 h-12 rounded-full border shadow-[var(--shadow-xl)] flex items-center justify-center transition-all cursor-pointer group ${
          isPlaying
            ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[var(--color-accent)] animate-pulse"
            : "bg-[var(--color-navy-900)] text-white border-[var(--color-line)] hover:scale-110"
        }`}
        aria-label={isPlaying ? "Pause Asriel Radio" : "Play Asriel Radio"}
        title={isPlaying ? "Playing Asriel Radio (Click to Pause)" : "Listen to Asriel Radio"}
      >
        {isPlaying ? (
          <Pause size={20} className="fill-current" />
        ) : (
          <Radio size={20} className="group-hover:rotate-12 transition-transform" />
        )}
      </button>

    </div>
  );
}
