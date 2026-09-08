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
        
        {/* Left Column: Heading, Value Proposition & Actions with warm mobile backdrop */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-5 sm:space-y-6 relative p-5 sm:p-0 rounded-3xl sm:rounded-none bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA]/85 to-[#F5EFE0]/60 sm:bg-transparent sm:bg-none border border-[#EBE3D0] sm:border-0 shadow-sm sm:shadow-none overflow-hidden">
          
          {/* Warm Mobile Ambient Glows */}
          <div className="sm:hidden absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-amber-400/20 via-orange-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="sm:hidden absolute -bottom-12 -left-12 w-44 h-44 bg-gradient-to-tr from-sky-400/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Eyebrow Pill */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-alt)] sm:bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-anchor-olive)] uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#29A3E4] animate-pulse" />
            <span>Voice of The Potter&apos;s Messengers</span>
          </div>

          {/* Main Title */}
          <h1 className="relative z-10 font-sans text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] font-extrabold leading-[1.14] tracking-tight">
            Where Prophecies Come to Life
          </h1>

          {/* Subtitle */}
          <p className="relative z-10 text-sm sm:text-base md:text-lg text-[var(--color-slate)] max-w-lg leading-relaxed font-sans font-normal">
            Experience the power of God&apos;s word through prophetic revelations, spiritual guidance, and an active national prayer altar led by Prophet Dr. Samo Mtishiby.
          </p>

          {/* Primary Action Buttons */}
          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-sans font-bold text-white bg-[var(--color-navy-900)] hover:bg-[#1A3A6B] hover:scale-[1.02] rounded-full transition-all shadow-md group text-center"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-sans font-semibold text-[var(--color-ink)] bg-white border border-[var(--color-line)] hover:bg-[var(--color-surface-alt)] hover:scale-[1.02] rounded-full transition-all text-center shadow-xs"
            >
              <span>Watch Sermons</span>
            </Link>
          </div>

          {/* Mobile-Only Live Radio Tap-to-Listen Card */}
          <div className="relative z-10 lg:hidden w-full pt-2">
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

        {/* Right Column: Hero Visual Image / Carousel */}
        <div className="w-full lg:w-1/2 relative mt-4 lg:mt-0">
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
