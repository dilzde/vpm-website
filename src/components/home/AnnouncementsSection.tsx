"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import { Megaphone } from "lucide-react";

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
    <section className="bg-sky-50 py-16" id="announcements-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-8">
          <Megaphone size={20} strokeWidth={1.75} className="text-sky-500" />
          <h2 className="text-xl text-slate-800">Announcements</h2>
        </div>

        <Carousel ariaLabel="Announcements" autoPlay={6000}>
          {announcements.map((slide, i) => (
            <div
              key={i}
              className="bg-sky-500 text-white p-8 md:p-12 rounded-md min-h-48 flex flex-col justify-center"
            >
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
                {slide.headline}
              </h3>
              <p className="text-sm md:text-base text-sky-100 max-w-prose">
                {slide.body}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
