"use client";

import React, { useState, useEffect } from "react";
import { Play, Search, Video } from "lucide-react";
import { getRecentVideos, getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [sermons, setSermons] = useState<YouTubeVideo[]>([]);
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recent, live] = await Promise.all([getRecentVideos(), getLiveStatus()]);
        setSermons(recent);
        setLiveVideo(live);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredSermons = sermons.filter((s) =>
    searchQuery ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Watch & Listen
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-4">Sermons & Media</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Watch our latest sermons, past teachings, and live services.
          </p>
        </div>
      </section>

      {/* Live embed */}
      <section className="bg-[var(--color-navy-900)] py-12 border-y border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {liveVideo ? (
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-black rounded-[var(--radius-md)] overflow-hidden mb-6 shadow-md border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
                  title={liveVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-sm font-bold text-red-500 uppercase tracking-widest">Live Now</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{liveVideo.title}</h2>
              <p className="text-[var(--color-slate)] text-sm">{liveVideo.channelTitle}</p>
            </div>
          ) : (
            <div className="aspect-video max-w-4xl mx-auto bg-black/40 rounded-[var(--radius-md)] flex items-center justify-center border border-white/5">
              <div className="text-center text-white/30">
                <Video size={48} strokeWidth={1.5} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm font-bold tracking-wide uppercase">Livestream player</p>
                <p className="text-xs mt-2 opacity-75">Appears here when a service is live</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search & filter */}
      <section className="py-8 bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input
              type="search"
              placeholder="Search sermons…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm font-medium border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-[var(--color-mist)] text-[var(--color-ink)]
                         focus:outline-none focus:border-[var(--color-blue-500)] focus:ring-1 focus:ring-[var(--color-blue-500)] transition-all placeholder:text-[var(--color-slate)]"
              id="sermon-search"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {["week", "month", "year"].map((f) => (
              <button
                key={f}
                onClick={() => setDateFilter(dateFilter === f ? null : f)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[var(--radius-sm)] border transition-colors whitespace-nowrap ${
                  dateFilter === f
                    ? "bg-[var(--color-blue-500)] text-white border-[var(--color-blue-500)]"
                    : "bg-white text-[var(--color-slate)] border-[var(--color-line)] hover:border-[var(--color-blue-300)] hover:text-[var(--color-ink)]"
                }`}
              >
                This {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="inline-block w-8 h-8 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--color-blue-500)]" />
            </div>
          ) : filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSermons.map((sermon) => (
                <a 
                  key={sermon.videoId} 
                  href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--color-blue-300)] hover:shadow-md transition-all group block flex flex-col h-full"
                >
                  <div className="relative aspect-video bg-[var(--color-mist)] overflow-hidden">
                    {sermon.thumbnail ? (
                      <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <PlaceholderSermon />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={24} strokeWidth={2} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-[var(--color-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-blue-500)] transition-colors mb-3">
                      {sermon.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto text-xs font-medium text-[var(--color-slate)]">
                      <span>{new Date(sermon.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="line-clamp-1 text-right ml-2 bg-[var(--color-mist)] px-2 py-1 rounded-md">{sermon.channelTitle}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] shadow-sm">
              <Video size={48} strokeWidth={1} className="mx-auto mb-4 text-[var(--color-slate)] opacity-50" />
              <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">No sermons found</h3>
              <p className="text-[var(--color-slate)]">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
