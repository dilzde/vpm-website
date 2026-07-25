import React from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { getRecentVideos } from "@/lib/youtube";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

export default async function RecentSermons() {
  const allSermons = await getRecentVideos();
  const sermons = allSermons.slice(0, 4); // fetch 4 recent videos

  return (
    <section className="bg-[var(--color-cloud)] py-16 md:py-24" id="recent-sermons">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
              Watch & Listen
            </p>
            <h2 className="text-3xl text-[var(--color-ink)]">Recent Sermons</h2>
          </div>
          <Link
            href="/media"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-500)] hover:text-[var(--color-blue-700)] transition-colors"
          >
            View All
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sermons.map((sermon) => (
            <Link
              key={sermon.videoId}
              href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--color-blue-300)] transition-colors group flex flex-col shadow-sm h-full"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-mist)] shrink-0">
                {sermon.thumbnail ? (
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <PlaceholderSermon className="group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-blue-500)] shadow-sm">
                    <Play size={20} strokeWidth={2} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <h3 className="text-sm md:text-base font-bold text-[var(--color-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-blue-500)] transition-colors mb-2">
                  {sermon.title}
                </h3>
                <p className="text-xs text-[var(--color-slate)] mt-auto">
                  {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/media"
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[var(--color-blue-700)] border border-[var(--color-blue-300)] rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-100)] transition-colors"
          >
            View All Sermons
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
