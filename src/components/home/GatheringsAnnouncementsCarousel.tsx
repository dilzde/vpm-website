"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, Calendar, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { getCurrentOrNextService, CurrentOrNextService, RECURRING_SCHEDULE } from "@/lib/data/schedule";

export interface AnnouncementSlide {
  id: string;
  type: "schedule" | "announcement";
  title: string;
  subtitle: string;
  time: string;
  tag: string;
  isHighImportance?: boolean;
  platform?: string;
}

const CAROUSEL_SLIDES: AnnouncementSlide[] = [
  {
    id: "prophetic-teaching",
    type: "schedule",
    tag: "TUESDAY – FRIDAY",
    title: "Prophetic Teaching Hour",
    subtitle: "Prophet Dr. Samo Mtishiby holds live teachings streaming online. Listen live on YouTube & Asriel Radio.",
    time: "8:00 PM – 10:00 PM",
    platform: "YouTube (Asriel TV) & asrielradio.com",
    isHighImportance: true,
  },
  {
    id: "prophetic-checking",
    type: "schedule",
    tag: "EVERY WEDNESDAY",
    title: "Prophetic Checking",
    subtitle: "Personal prophetic guidance, consultation, and prayer check-in with the ministry presbytery.",
    time: "11:00 AM – 3:00 PM",
    platform: "Sanctuary Altars",
    isHighImportance: false,
  },
  {
    id: "deliverance-service",
    type: "schedule",
    tag: "EVERY FRIDAY",
    title: "Deliverance Service",
    subtitle: "Intercessory warfare, breaking strongholds, and deliverance prayer for all believers.",
    time: "4:00 PM – 6:00 PM",
    platform: "Sanctuary Altars",
    isHighImportance: false,
  },
  {
    id: "sunday-interactive",
    type: "schedule",
    tag: "EVERY SUNDAY MORNING",
    title: "Worship & Interactive Session",
    subtitle: "A wonderful morning worship and interactive session with Prophet Dr. Samo Mtishiby.",
    time: "5:30 AM – 8:00 AM",
    platform: "Asriel Radio Live",
    isHighImportance: true,
  },
  {
    id: "sunday-official",
    type: "schedule",
    tag: "EVERY SUNDAY MAIN",
    title: "Official Sunday Service",
    subtitle: "Main weekly celebration service, prophetic word, and territorial worship. All believers are encouraged to join!",
    time: "8:30 AM – 4:00 PM",
    platform: "Nairobi Mlolongo & All Sanctuaries",
    isHighImportance: true,
  },
  {
    id: "announcement-convention",
    type: "announcement",
    tag: "SPECIAL MINISTRY ANNOUNCEMENT",
    title: "Prophetic Revival Convention",
    subtitle: "Special regional gathering and intercessory prayer convention. Purpose to attend and bring family.",
    time: "Coming Soon",
    platform: "Nairobi Sanctuary (Family Bank, Mlolongo)",
    isHighImportance: true,
  },
];

export default function GatheringsAnnouncementsCarousel() {
  const [scheduleState, setScheduleState] = useState<CurrentOrNextService | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScheduleState(getCurrentOrNextService());
    const interval = setInterval(() => {
      setScheduleState(getCurrentOrNextService());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <section
      className="bg-[var(--color-surface-alt)] text-[var(--color-ink)] py-12 md:py-16 border-b border-[var(--color-line)] relative overflow-hidden"
      id="gatherings-announcements-carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Real-Time "Happening Now / Next Service" Visitor Banner (§J) */}
        {scheduleState && (
          <div className="bg-[var(--color-navy-900)] text-white rounded-[var(--radius-eight)] p-4 sm:p-5 shadow-md border border-[var(--color-line-dark)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 ${
                scheduleState.isHappeningNow
                  ? "bg-[var(--color-live)] text-white animate-pulse"
                  : "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
              }`}>
                {scheduleState.isHappeningNow ? <Clock size={14} /> : <Sparkles size={14} />}
                <span>{scheduleState.isHappeningNow ? "Happening Now Live" : "Up Next For You"}</span>
              </div>

              <div className="text-left font-sans">
                <p className="text-sm font-bold text-white">
                  {scheduleState.service.title}
                </p>
                <p className="text-xs text-white/80 font-medium">
                  {scheduleState.displayTime} • {scheduleState.service.platform}
                </p>
              </div>
            </div>

            <Link
              href="/radio"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-xs hover:scale-105 transition-all shrink-0"
            >
              <span>Listen / Join Broadcast</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-1">
              GATHERINGS & ANNOUNCEMENTS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[var(--color-ink)] font-extrabold">
              Weekly Schedule & Ministry Events
            </h2>
          </div>

          {/* Carousel Arrows & View All */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Previous announcement slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Next announcement slide"
            >
              <ChevronRight size={20} />
            </button>

            <Link
              href="/events"
              className="text-xs font-sans font-bold text-[var(--color-ink)] hover:underline ml-2"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Interactive Carousel Cards Row */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
            {[0, 1, 2].map((offset) => {
              const slideIndex = (currentIndex + offset) % CAROUSEL_SLIDES.length;
              const slide = CAROUSEL_SLIDES[slideIndex];

              return (
                <div
                  key={`${slide.id}-${offset}`}
                  className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all ${
                    slide.isHighImportance
                      ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                      : "border-[var(--color-line)]"
                  }`}
                >
                  <div>
                    {/* Badge Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block font-sans font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider ${
                        slide.isHighImportance
                          ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                          : "bg-[var(--color-surface-alt)] text-[var(--color-terracotta)]"
                      }`}>
                        {slide.tag}
                      </span>
                      {slide.isHighImportance && (
                        <span className="text-[10px] font-mono text-[var(--color-terracotta)] font-bold">
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>

                    <h3 className="font-sans text-xl font-extrabold text-[var(--color-ink)] mb-2 leading-snug">
                      {slide.title}
                    </h3>

                    <p className="text-xs text-[var(--color-slate)] leading-relaxed font-sans mb-4">
                      {slide.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-line)] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-[var(--color-ink)]">
                      <Clock size={14} className="text-[var(--color-slate)] shrink-0" />
                      <span>{slide.time}</span>
                    </div>
                    {slide.platform && (
                      <p className="text-[11px] font-sans text-[var(--color-slate)] italic">
                        {slide.platform}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "w-8 bg-[var(--color-ink)]" : "w-2 bg-[var(--color-line)] hover:bg-[var(--color-slate)]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
