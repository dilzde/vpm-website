"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The gallery images can be added here. When empty, the component won't render.
const GALLERY_IMAGES: string[] = [
  // Example: "/images/gallery-1.jpg",
];

export default function ImageGallery() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  if (!GALLERY_IMAGES || GALLERY_IMAGES.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[var(--color-mist)] py-16 md:py-24 border-t border-[var(--color-line)]" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
              Our Moments
            </p>
            <h2 className="text-3xl text-[var(--color-ink)] font-bold">Gallery</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-slate)] hover:text-[var(--color-blue-500)] hover:border-[var(--color-blue-500)] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-slate)] hover:text-[var(--color-blue-500)] hover:border-[var(--color-blue-500)] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-0 pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {GALLERY_IMAGES.map((src, idx) => (
              <div 
                key={idx} 
                className="relative w-72 h-72 sm:w-80 sm:h-80 shrink-0 snap-start rounded-[var(--radius-lg)] overflow-hidden shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src} 
                  alt={`Gallery image ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
