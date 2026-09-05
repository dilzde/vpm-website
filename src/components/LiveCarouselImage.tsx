"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarouselImages } from "@/lib/hooks/useCarouselImages";
import type { CarouselSlot } from "@/lib/firestore";

interface LiveCarouselImageProps {
  slot: CarouselSlot;
  /** Shown on top of the image (e.g. location label) */
  eyebrow?: string;
  /** Shown as the caption heading */
  caption?: string;
  /** Fallback component rendered when no images are in this slot */
  fallback?: React.ReactNode;
  className?: string;
  /** Auto-advance interval in ms. Default 5000 */
  autoPlayMs?: number;
}

/**
 * LiveCarouselImage — drops into any page image slot.
 * Subscribes to a Firestore carousel slot in real time and auto-rotates
 * through uploaded images. Falls back to `fallback` when no images exist.
 */
export default function LiveCarouselImage({
  slot,
  eyebrow,
  caption,
  fallback,
  className = "w-full h-full",
  autoPlayMs = 5000,
}: LiveCarouselImageProps) {
  const { images } = useCarouselImages(slot);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((p) => (p + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => go(1), autoPlayMs);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [count, go, autoPlayMs]);

  useEffect(() => {
    setCurrent((p) => (count > 0 ? Math.min(p, count - 1) : 0));
  }, [count]);

  if (count === 0) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img.id} className="w-full h-full shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || `${slot} image ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient + text overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent pointer-events-none" />
      {(eyebrow || caption || images[current]?.caption) && (
        <div className="absolute bottom-6 left-6 right-12 text-white pointer-events-none">
          {eyebrow && (
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
              {eyebrow}
            </span>
          )}
          {(caption || images[current]?.caption) && (
            <h3 className="font-sans text-xl font-bold">{caption || images[current]?.caption}</h3>
          )}
        </div>
      )}

      {/* Nav arrows */}
      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
