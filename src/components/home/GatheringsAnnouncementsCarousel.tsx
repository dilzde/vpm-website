"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, Calendar, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import {
  getCurrentOrNextService,
  CurrentOrNextService,
  getWeeklyGatheringSlides,
  WeeklyGatheringSlide,
} from "@/lib/data/schedule";
import type { Announcement } from "@/lib/announcement-types";
import type { SiteEvent } from "@/lib/event-types";

export interface AnnouncementSlide {
  id: string;
  type: "schedule" | "announcement" | "event";
  title: string;
  subtitle: string;
  time: string;
  tag: string;
  platform?: string;
  isHappeningNow?: boolean;
  isToday?: boolean;
  isTomorrow?: boolean;
  isThisWeek?: boolean;
  distinctDay?: string;
  orderScore: number;
}

export default function GatheringsAnnouncementsCarousel({
  initialAnnouncements,
  initialEvents,
}: {
  initialAnnouncements?: Announcement[];
  initialEvents?: SiteEvent[];
}) {
  const [scheduleState, setScheduleState] = useState<CurrentOrNextService | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    setScheduleState(getCurrentOrNextService());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setScheduleState(getCurrentOrNextService());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 1. Dynamic recurring weekly schedule, calculated relative to now (Today, Tomorrow, Thursday, Friday, Sunday...)
  const weeklySlides: AnnouncementSlide[] = getWeeklyGatheringSlides(currentTime);

  // 2. Dynamic non-recurring special events from Bazu
  const nowMs = currentTime.getTime();
  const dynamicEventSlides: AnnouncementSlide[] = (initialEvents || [])
    .filter((e) => e.active && !e.isRecurring)
    .map((e) => {
      const dateObj = e.date ? new Date(e.date) : null;
      const hasValidDate = dateObj && !isNaN(dateObj.getTime());
      // Skip events that ended more than 24 hours ago
      if (hasValidDate && dateObj.getTime() < nowMs - 24 * 60 * 60 * 1000) {
        return null;
      }

      const dateTag = hasValidDate
        ? dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase()
        : "SPECIAL GATHERING";

      return {
        id: e.id,
        type: "event" as const,
        tag: dateTag,
        title: e.title,
        subtitle: e.description,
        time: e.time || "Schedule TBA",
        platform: e.location || (e.isOnline ? "Online Live Stream" : "Sanctuary"),
        distinctDay: dateTag,
        orderScore: hasValidDate ? dateObj.getTime() : 9999999999999,
      };
    })
    .filter(Boolean) as AnnouncementSlide[];

  // 3. Dynamic announcements
  const dynamicAnnouncementSlides: AnnouncementSlide[] = (initialAnnouncements || []).map((a, idx) => ({
    id: a.id,
    type: "announcement" as const,
    tag: a.dateBadge || "MINISTRY UPDATE",
    title: a.headline,
    subtitle: a.body,
    time: a.time || "Notice",
    platform: "VPM Sanctuaries & Online",
    orderScore: 50000 + idx * 100,
  }));

  // Combine: Upcoming recurring weekly schedule first (chronological from today), followed by special events and announcements
  const activeSlides: AnnouncementSlide[] = [
    ...weeklySlides,
    ...dynamicEventSlides,
    ...dynamicAnnouncementSlides,
  ];

  useEffect(() => {
    setScheduleState(getCurrentOrNextService());
    const interval = setInterval(() => {
      setScheduleState(getCurrentOrNextService());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const renderSlideCard = (slide: AnnouncementSlide, key: string | number) => {
    return (
      <div
        key={key}
        className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all ${
          slide.isHappeningNow
            ? "border-red-400 ring-2 ring-red-100 shadow-md"
            : slide.isToday
            ? "border-emerald-400 ring-2 ring-emerald-100 shadow-md"
            : "border-[var(--color-line)] hover:border-[var(--color-accent)]"
        }`}
      >
        <div>
          {/* Badge Pill with Distinct Day Formatting & Highlights */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 font-sans font-extrabold text-[11px] uppercase px-3 py-1 rounded-full tracking-wider shadow-2xs ${
                  slide.isHappeningNow
                    ? "bg-red-600 text-white animate-pulse"
                    : slide.isToday
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-300/50"
                    : slide.isTomorrow
                    ? "bg-[#1B5299] text-white"
                    : "bg-[var(--color-surface-alt)] text-[#1B5299] border border-[#1B5299]/30 font-bold"
                }`}
              >
                {slide.isHappeningNow && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                {slide.isToday && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                <span>{slide.tag}</span>
              </span>

              {slide.isThisWeek && !slide.isToday && !slide.isTomorrow && !slide.isHappeningNow && (
                <span className="text-[10px] font-sans font-extrabold text-[var(--color-slate)] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  This Week
                </span>
              )}
            </div>

            {slide.isToday && (
              <span className="text-[11px] font-sans font-bold text-emerald-600 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Next Up</span>
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
          {/* Mobile: Single focused slide */}
          <div className="block md:hidden">
            {(() => {
              const slide = activeSlides[currentIndex % activeSlides.length];
              if (!slide) return null;
              return renderSlideCard(slide, slide.id);
            })()}
          </div>

          {/* Desktop: 3-column carousel */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 transition-all duration-300">
            {[0, 1, 2].map((offset) => {
              const slideIndex = (currentIndex + offset) % activeSlides.length;
              const slide = activeSlides[slideIndex];
              if (!slide) return null;
              return renderSlideCard(slide, `${slide.id}-${offset}`);
            })}
          </div>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {activeSlides.map((_, idx) => (
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
