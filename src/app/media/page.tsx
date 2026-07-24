"use client";

import React, { useState } from "react";
import { Metadata } from "next";
import { Play, Search, Filter, Video } from "lucide-react";

// Placeholder sermons - in production, fetched from YouTube API via server action
const SERMONS = [
  { videoId: "1", title: "The Power of Prayer in Difficult Seasons", publishedAt: "2024-12-15", duration: "45:30" },
  { videoId: "2", title: "Walking in Faith: A Prophetic Declaration", publishedAt: "2024-12-08", duration: "38:12" },
  { videoId: "3", title: "Understanding Your Purpose in God's Kingdom", publishedAt: "2024-12-01", duration: "52:18" },
  { videoId: "4", title: "The Anointing That Breaks Every Yoke", publishedAt: "2024-11-24", duration: "41:05" },
  { videoId: "5", title: "Revival Fire: A Call to the Nations", publishedAt: "2024-11-17", duration: "49:22" },
  { videoId: "6", title: "Standing on the Promises of God", publishedAt: "2024-11-10", duration: "36:45" },
  { videoId: "7", title: "Healing and Deliverance Through the Word", publishedAt: "2024-11-03", duration: "55:10" },
  { videoId: "8", title: "The Cost of Discipleship", publishedAt: "2024-10-27", duration: "43:30" },
];

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const filteredSermons = SERMONS.filter((s) =>
    searchQuery ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="bg-sky-50">
      {/* Hero */}
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Sermons & Media</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Watch our latest sermons, past teachings, and live services.
          </p>
        </div>
      </section>

      {/* Live embed placeholder */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-video max-w-4xl mx-auto bg-slate-800 rounded-md flex items-center justify-center">
            <div className="text-center text-white/30">
              <Video size={48} strokeWidth={1.5} className="mx-auto mb-3" />
              <p className="text-sm font-medium">Livestream player</p>
              <p className="text-xs mt-1">Appears here when a service is live</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & filter */}
      <section className="py-8 bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600/50" />
            <input
              type="search"
              placeholder="Search sermons…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-line rounded-md bg-white text-slate-800
                         focus:outline-none focus:border-sky-500 transition-colors"
              id="sermon-search"
            />
          </div>
          <div className="flex items-center gap-2">
            {["week", "month", "year"].map((f) => (
              <button
                key={f}
                onClick={() => setDateFilter(dateFilter === f ? null : f)}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                  dateFilter === f
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-cloud text-slate-600 border-line hover:border-sky-200"
                }`}
              >
                This {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSermons.map((sermon) => (
              <article key={sermon.videoId} className="bg-cloud border border-line rounded-md overflow-hidden hover:border-sky-200 transition-colors group">
                <div className="relative aspect-video bg-sky-100">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600/30 group-hover:text-sky-500/50 transition-colors">
                    <Play size={32} strokeWidth={1.5} />
                  </div>
                  {sermon.duration && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-slate-900/80 text-white text-xs rounded-sm">{sermon.duration}</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-800 leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">{sermon.title}</h3>
                  <p className="text-xs text-slate-600/70 mt-2">
                    {new Date(sermon.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
