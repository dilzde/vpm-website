"use client";

import React, { useState, useEffect } from "react";
import { Radio, Pause, Play, X, Sparkles } from "lucide-react";
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

    // Initial popup after 10s if not playing
    const timer = setTimeout(() => {
      setExpanded(true);
      setTimeout(() => setExpanded(false), 6000);
    }, 10000);

    // Interval every 60s to show popup asking if they want to listen to divine knowledge
    const interval = setInterval(() => {
      setExpanded(true);
      setTimeout(() => {
        setExpanded(false);
      }, 6000);
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isPlaying, dismissed]);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3 font-sans">
      
      {/* Expanded Popup Tooltip Every Minute */}
      {expanded && !isPlaying && (
        <div className="bg-[var(--color-navy-900)] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-[var(--shadow-xl)] flex items-center gap-2 border border-[var(--color-accent)]/50 animate-bounce cursor-pointer">
          <button
            type="button"
            onClick={() => toggle()}
            className="flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            <span>Want to listen to divine knowledge?</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
              setExpanded(false);
            }}
            className="text-white/60 hover:text-white transition-colors ml-1 p-0.5"
            aria-label="Dismiss popup"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Hovering Bottom-Right Floating Radio Player Button */}
      <button
        type="button"
        onClick={() => toggle()}
        className={`w-14 h-14 rounded-full border shadow-[var(--shadow-xl)] flex items-center justify-center transition-all cursor-pointer group ${
          isPlaying
            ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/30 animate-pulse"
            : "bg-[var(--color-navy-900)] text-white border-[var(--color-accent)] hover:scale-110"
        }`}
        aria-label={isPlaying ? "Pause Asriel Radio" : "Play Asriel Radio"}
        title={isPlaying ? "Playing Asriel Radio (Click to Pause)" : "Listen to Asriel Radio Live"}
      >
        {isPlaying ? (
          <Pause size={24} className="fill-current" />
        ) : (
          <Radio size={24} className="group-hover:rotate-12 transition-transform text-[var(--color-accent)]" />
        )}
      </button>

    </div>
  );
}
