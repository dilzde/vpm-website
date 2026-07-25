import React from "react";
import Link from "next/link";
import { getRecentVideos } from "@/lib/youtube";
import VideoCard from "./VideoCard";

export default async function RecentSermons() {
  const videos = await getRecentVideos();

  return (
    <section
      className="bg-[var(--color-cream)] text-[var(--color-ink)] py-16 md:py-24 border-b border-[var(--color-line)]"
      id="watch-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase block mb-2">
              Media & Teachings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-900)] font-semibold">
              Recent Messages
            </h2>
          </div>
          <Link
            href="/media"
            className="text-sm font-sans font-semibold text-[var(--color-gold-700)] hover:underline transition-colors shrink-0"
          >
            Explore all teachings →
          </Link>
        </div>

        {/* Video Cards Grid with In-Place Iframe Playback (Part E Spec) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 6).map((video) => (
            <VideoCard key={video.videoId} sermon={video} />
          ))}
        </div>

      </div>
    </section>
  );
}
