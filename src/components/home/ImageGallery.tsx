"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useCarouselImages } from "@/lib/hooks/useCarouselImages";

export default function ImageGallery() {
  const { images, loading } = useCarouselImages("gallery");
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  // Don't render the section if there are no images and we're done loading
  if (!loading && images.length === 0) return null;

  return (
    <section className="band-white py-16 md:py-24 border-t border-[var(--color-line)]" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <Camera size={15} className="text-[var(--color-accent)]" />
              Kingdom Moments
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--color-ink)] tracking-tight">
              Ministry <span className="highlight-block">Photo Gallery</span>
            </h2>
          </div>
          <div className="hidden sm:flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-[var(--color-line)] bg-white flex items-center justify-center text-[var(--color-navy-900)] hover:bg-[var(--color-navy-900)] hover:text-white transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-[var(--color-line)] bg-white flex items-center justify-center text-[var(--color-navy-900)] hover:bg-[var(--color-navy-900)] hover:text-white transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          {loading ? (
            /* Skeleton loader while Firestore connects */
            <div className="flex gap-6 px-4 sm:px-0">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-80 h-80 sm:w-96 sm:h-96 shrink-0 rounded-[var(--radius-lg)] bg-[var(--color-mist)] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 sm:px-0 pb-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="relative w-80 h-80 sm:w-96 sm:h-96 shrink-0 snap-start rounded-[var(--radius-lg)] overflow-hidden shadow-md border border-[var(--color-line)] bg-[var(--color-mist)] group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption || `Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm font-semibold drop-shadow">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
