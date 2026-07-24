import React from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

// Placeholder sermon data — in production, fetched from YouTube API
const PLACEHOLDER_SERMONS = [
  {
    videoId: "placeholder-1",
    title: "The Power of Prayer in Difficult Seasons",
    thumbnailUrl: "",
    publishedAt: "2024-12-15",
    duration: "45:30",
  },
  {
    videoId: "placeholder-2",
    title: "Walking in Faith: A Prophetic Declaration",
    thumbnailUrl: "",
    publishedAt: "2024-12-08",
    duration: "38:12",
  },
  {
    videoId: "placeholder-3",
    title: "Understanding Your Purpose in God's Kingdom",
    thumbnailUrl: "",
    publishedAt: "2024-12-01",
    duration: "52:18",
  },
  {
    videoId: "placeholder-4",
    title: "The Anointing That Breaks Every Yoke",
    thumbnailUrl: "",
    publishedAt: "2024-11-24",
    duration: "41:05",
  },
];

export default function RecentSermons() {
  const sermons = PLACEHOLDER_SERMONS;

  return (
    <section className="bg-sky-50 py-16" id="recent-sermons">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl text-slate-800">Recent Sermons</h2>
          <Link
            href="/media"
            className="flex items-center gap-1.5 text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sermons.map((sermon) => (
            <article
              key={sermon.videoId}
              className="bg-cloud border border-line rounded-md overflow-hidden hover:border-sky-200 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-sky-100">
                {sermon.thumbnailUrl ? (
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600/30">
                    <Play size={32} strokeWidth={1.5} />
                  </div>
                )}
                {sermon.duration && (
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-slate-900/80 text-white text-xs rounded-sm">
                    {sermon.duration}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-slate-800 leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-xs text-slate-600/70 mt-2">
                  {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
