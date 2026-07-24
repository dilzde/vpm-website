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
      <div className="overflow-hidden rounded-md border border-line">
        <div
          className="flex transition-transform duration-300 ease-out"
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
              className="p-2 rounded-md border border-line bg-cloud text-slate-600
                         hover:bg-sky-50 transition-colors focus-visible:outline-2 focus-visible:outline-sky-500"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} strokeWidth={1.75} />
            </button>
            <button
              onClick={() => go(1)}
              className="p-2 rounded-md border border-line bg-cloud text-slate-600
                         hover:bg-sky-50 transition-colors focus-visible:outline-2 focus-visible:outline-sky-500"
              aria-label="Next slide"
            >
              <ChevronRight size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex items-center gap-1.5" role="tablist">
            {children.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-sky-500" : "bg-sky-200"}`}
              />
            ))}
          </div>

          {autoPlay > 0 && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="p-2 rounded-md border border-line bg-cloud text-slate-600
                         hover:bg-sky-50 transition-colors focus-visible:outline-2 focus-visible:outline-sky-500"
              aria-label={paused ? "Play carousel" : "Pause carousel"}
            >
              {paused ? <Play size={16} strokeWidth={1.75} /> : <Pause size={16} strokeWidth={1.75} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
