"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import PlaceholderAnnouncement from "../placeholders/PlaceholderAnnouncement";

const FALLBACK_SLIDES = [
  {
    headline: "Welcome to Voice of the Potter's Messengers",
    body: "An apostolic and evangelistic ministry dedicated to prayer, prophecy, and releasing the uncompromised power of the Gospel.",
  },
  {
    headline: "Join Our Intercessory Prayer Shield",
    body: "Submit your urgent prayer needs online; our dedicated ministers stand with you in constant intercession.",
  },
  {
    headline: "Asriel TV & FM Broadcasting 24/7",
    body: "Stream high-definition sermons and live spiritual encouragement directly from anywhere across the globe.",
  },
];

export default function AnnouncementsSection() {
  const announcements = FALLBACK_SLIDES;

  return (
    <section className="band-white py-16 md:py-24" id="announcements-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2">
            Kingdom Updates & News
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--color-ink)] tracking-tight">
            Ministry <span className="highlight-block">Announcements</span>
          </h2>
        </div>

        <Carousel ariaLabel="Announcements" autoPlay={6000}>
          {announcements.map((slide, i) => (
            <div
              key={i}
              className="relative w-full aspect-[16/9] md:aspect-[21/8] rounded-[var(--radius-lg)] overflow-hidden group border border-[var(--color-line)] shadow-md"
            >
              <PlaceholderAnnouncement />
              
              {/* Deep navy scrim gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-900)]/70 to-transparent opacity-90" />
              
              {/* Editorial content overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 flex flex-col justify-end">
                <span className="w-12 h-1 bg-[var(--color-accent)] mb-4 rounded-full" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white mb-3 leading-tight tracking-tight">
                  {slide.headline}
                </h3>
                <p className="text-sm md:text-lg text-slate-200 max-w-3xl line-clamp-2 md:line-clamp-1 font-sans">
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
