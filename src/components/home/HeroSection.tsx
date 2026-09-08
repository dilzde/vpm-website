"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Radio, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";
import { useCarouselImages } from "@/lib/hooks/useCarouselImages";

export default function HeroSection() {
  const { images } = useCarouselImages("hero");
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((p) => (p + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => go(1), 5000);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [count, go]);

  useEffect(() => {
    setCurrent((p) => (count > 0 ? Math.min(p, count - 1) : 0));
  }, [count]);

  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] pt-8 pb-12 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24 border-b border-[var(--color-line)] relative overflow-hidden"
      id="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Left Column: Heading, Value Proposition & Actions with warm mobile sanctuary image backdrop */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-5 sm:space-y-6 relative p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none lg:bg-transparent border border-white/10 lg:border-0 shadow-lg lg:shadow-none overflow-hidden">
          
          {/* Mobile Sanctuary Background Image with Legibility Tint Overlay */}
          <div className="lg:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-sanctuary-mobile.jpg"
              alt="Worship Sanctuary"
              className="w-full h-full object-cover scale-105"
            />
            {/* Dark translucent gradient scrim ensuring 100% crystal-clear legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/95 via-[#0B0F17]/85 to-[#0B0F17]/75" />
          </div>

          {/* Eyebrow Pill */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 lg:bg-[var(--color-surface-alt)] border border-white/20 lg:border-[var(--color-line)] text-xs font-sans font-bold text-white lg:text-[var(--color-anchor-olive)] uppercase tracking-wider shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#29A3E4] animate-pulse" />
            <span>Voice of The Potter&apos;s Messengers</span>
          </div>

          {/* Main Title */}
          <h1 className="relative z-10 font-sans text-3xl sm:text-5xl lg:text-6xl text-white lg:text-[var(--color-ink)] font-extrabold leading-[1.14] tracking-tight">
            Where Prophecies Come to Life
          </h1>

          {/* Subtitle */}
          <p className="relative z-10 text-sm sm:text-base md:text-lg text-white/90 lg:text-[var(--color-slate)] max-w-lg leading-relaxed font-sans font-normal">
            Experience the power of God&apos;s word through prophetic revelations, spiritual guidance, and an active national prayer altar led by Prophet Dr. Samo Mtishiby.
          </p>

          {/* Primary Action Buttons */}
          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-sans font-bold text-[#0B0F17] lg:text-white bg-white lg:bg-[var(--color-navy-900)] hover:bg-[#FAF7F2] lg:hover:bg-[#1A3A6B] hover:scale-[1.02] rounded-full transition-all shadow-md group text-center"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-sans font-semibold text-white lg:text-[var(--color-ink)] bg-white/15 lg:bg-white border border-white/25 lg:border-[var(--color-line)] hover:bg-white/25 lg:hover:bg-[var(--color-surface-alt)] hover:scale-[1.02] rounded-full transition-all text-center shadow-xs backdrop-blur-xs"
            >
              <span>Watch Sermons</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Hero Visual Image / Carousel (hidden on mobile to prevent image above image) */}
        <div className="hidden lg:block w-full lg:w-1/2 relative mt-4 lg:mt-0">
          <div className="w-full h-64 sm:h-80 lg:h-[460px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
            {count > 0 ? (
              <>
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
                        alt={img.caption || `Hero slide ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-16 text-white pointer-events-none sm:bottom-6 sm:left-6">
                  {images[current]?.caption && (
                    <p className="text-xs sm:text-sm font-sans font-semibold">{images[current].caption}</p>
                  )}
                </div>

                {/* Prev/Next arrows */}
                {count > 1 && (
                  <>
                    <button
                      onClick={() => go(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <PlaceholderCongregation />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6">
                  <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                    Nairobi Ministry Headquarters — Mlolongo
                  </span>
                  <h3 className="font-sans text-base sm:text-xl font-bold">Worship &amp; Prophetic Service</h3>
                </div>
              </>
            )}
          </div>

          {/* Desktop floating status badge */}
          <div className="hidden md:flex absolute -top-3.5 -right-3.5 bg-white border border-[var(--color-line)] rounded-2xl p-3 shadow-lg items-center gap-3 z-20">
            <div className="w-9 h-9 rounded-xl bg-[#29A3E4] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <Radio size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-sans font-bold text-[var(--color-ink)] leading-none">
                  24/7 Live Radio
                </p>
              </div>
              <p className="text-[11px] font-sans text-[var(--color-slate)] mt-0.5">
                Asriel Global Broadcast
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
