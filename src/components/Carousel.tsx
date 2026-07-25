"use client";

import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: number;
  className?: string;
  ariaLabel?: string;
}

export default function Carousel({
  children,
  autoPlay = 5000,
  className = "",
  ariaLabel = "Carousel",
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = children.length;

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((prev) => (prev + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (!autoPlay || paused || count <= 1) {
      timerRef.current && clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => go(1), autoPlay);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [autoPlay, paused, count, go]);

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: (e: React.FocusEvent) => {
      if (!containerRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
    },
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      {...pauseHandlers}
      onKeyDown={handleKeyDown}
    >
      <div className="overflow-hidden rounded-md border border-[var(--color-line)] shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
              aria-hidden={i !== current}
              tabIndex={i === current ? 0 : -1}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="p-2 rounded-md border border-[var(--color-line)] bg-white text-[var(--color-ink)]
                         hover:bg-[var(--color-mist)] hover:border-[var(--color-accent)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] shadow-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => go(1)}
              className="p-2 rounded-md border border-[var(--color-line)] bg-white text-[var(--color-ink)]
                         hover:bg-[var(--color-mist)] hover:border-[var(--color-accent)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] shadow-xs"
              aria-label="Next slide"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist">
            {children.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[var(--color-accent)]" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>

          {autoPlay > 0 && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="p-2 rounded-md border border-[var(--color-line)] bg-white text-[var(--color-ink)]
                         hover:bg-[var(--color-mist)] hover:border-[var(--color-accent)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] shadow-xs"
              aria-label={paused ? "Play carousel" : "Pause carousel"}
            >
              {paused ? <Play size={16} strokeWidth={2} /> : <Pause size={16} strokeWidth={2} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
