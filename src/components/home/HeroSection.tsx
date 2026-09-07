"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Radio, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Reset index when images change (e.g. admin deletes one)
  useEffect(() => {
    setCurrent((p) => (count > 0 ? Math.min(p, count - 1) : 0));
  }, [count]);

  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] pt-10 pb-14 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24 border-b border-[var(--color-line)] relative overflow-hidden"
      id="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Left Column (Expertly arranged, clean and commanding on mobile) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-5 sm:space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-anchor-olive)] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#29A3E4] animate-pulse" />
            <span>Voice of The Potter&apos;s Messengers Ministry</span>
          </div>

          {/* Main Title */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] font-extrabold leading-[1.12] tracking-tight">
            Where Prophecies Come to Life
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-slate)] max-w-lg leading-relaxed font-sans font-normal">
            Experience the power of God&apos;s word through prophetic revelations, spiritual guidance, and a living community of prayer and revival.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-sans font-bold text-white bg-[var(--color-navy-900)] hover:bg-[#1A3A6B] hover:scale-[1.02] rounded-full transition-all shadow-md group text-center"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-sans font-semibold text-[var(--color-ink)] bg-white border border-[var(--color-line)] hover:bg-[var(--color-surface-alt)] hover:scale-[1.02] rounded-full transition-all text-center shadow-xs"
            >
              <span>Watch Sermons</span>
            </Link>
          </div>

          {/* Mobile-Only Live Radio Tap-to-Listen Card */}
          <div className="lg:hidden w-full pt-1">
            <Link
              href="/radio"
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#0F2540] to-[#1A3A6B] text-white border border-[#29A3E4]/30 shadow-md hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#29A3E4] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <Radio size={20} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-xs font-bold text-white">24/7 Asriel Radio Live</p>
                  </div>
                  <p className="text-[11px] text-white/75 font-sans">Broadcasting prophetic revival globally</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#62B4EE] flex items-center gap-1 shrink-0">
                Listen Live →
              </span>
            </Link>
          </div>

        </div>

        {/* Right Column: Hero image or carousel (Desktop only — removed from mobile to give a clean, fast, perfectly organized screen) */}
        <div className="hidden lg:block lg:w-1/2 relative">

          <div className="w-full h-[460px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
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
                <div className="absolute bottom-6 left-6 right-16 text-white pointer-events-none">
                  {images[current]?.caption && (
                    <p className="text-sm font-sans font-semibold">{images[current].caption}</p>
                  )}
                </div>

                {/* Prev/Next arrows */}
                {count > 1 && (
                  <>
                    <button
                      onClick={() => go(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
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
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                    Nairobi Ministry Headquarters — Mlolongo
                  </span>
                  <h3 className="font-sans text-xl font-bold">Worship &amp; Prophetic Service</h3>
                </div>
              </>
            )}
          </div>

          {/* Desktop floating badge */}
          <div className="absolute -bottom-5 -left-5 bg-white border border-[var(--color-line)] rounded-2xl p-4 shadow-xl flex items-center gap-3 z-20 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-[#29A3E4] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <Radio size={20} />
            </div>
            <div>
              <p className="text-xs font-sans font-bold text-[var(--color-ink)] leading-snug">
                24/7 Live Radio
              </p>
              <p className="text-[11px] font-sans text-[var(--color-slate)]">
                Broadcasting Global Faith Stream
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
