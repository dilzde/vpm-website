"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import PlaceholderAnnouncement from "../placeholders/PlaceholderAnnouncement";

// Fallback slides when Firestore has no announcements
const FALLBACK_SLIDES = [
  {
    headline: "Welcome to VPM International",
    body: "We are a ministry rooted in prayer, the prophetic word, and the transforming power of the Gospel.",
  },
  {
    headline: "Join Us in Prayer",
    body: "Submit your prayer request and our team of intercessors will stand with you in faith.",
  },
  {
    headline: "Watch & Listen",
    body: "Stream sermons, tune into our radio station, and stay connected wherever you are.",
  },
];

export default function AnnouncementsSection() {
  // In production, this reads from Firestore announcements collection
  const announcements = FALLBACK_SLIDES;

  return (
    <section className="bg-[var(--color-mist)] py-16 md:py-24" id="announcements-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            News & Updates
          </p>
          <h2 className="text-3xl text-[var(--color-ink)]">Announcements</h2>
        </div>

        <Carousel ariaLabel="Announcements" autoPlay={6000}>
          {announcements.map((slide, i) => (
            <div
              key={i}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[var(--radius-lg)] overflow-hidden group"
            >
              <PlaceholderAnnouncement />
              
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)] via-[#0B2540]/60 to-transparent" />
              
              {/* Content overlaid at bottom-left */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight">
                  {slide.headline}
                </h3>
                <p className="text-sm md:text-base text-[var(--color-blue-100)] max-w-2xl line-clamp-2 md:line-clamp-1">
                  {slide.body}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
