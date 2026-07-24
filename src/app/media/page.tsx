"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import { Play, Search, Filter, Video } from "lucide-react";
import { getRecentVideos, getLiveStatus, YouTubeVideo } from "@/lib/youtube";

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
    <div className="bg-sky-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Sermons & Media</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Watch our latest sermons, past teachings, and live services.
          </p>
        </div>
      </section>

      {/* Live embed */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {liveVideo ? (
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
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
              <h2 className="text-xl font-bold text-white">{liveVideo.title}</h2>
              <p className="text-slate-400 text-sm mt-1">Live now on {liveVideo.channelTitle}</p>
            </div>
          ) : (
            <div className="aspect-video max-w-4xl mx-auto bg-slate-800 rounded-md flex items-center justify-center">
              <div className="text-center text-white/30">
                <Video size={48} strokeWidth={1.5} className="mx-auto mb-3" />
                <p className="text-sm font-medium">Livestream player</p>
                <p className="text-xs mt-1">Appears here when a service is live</p>
              </div>
            </div>
          )}
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
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="inline-block w-8 h-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />
            </div>
          ) : filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSermons.map((sermon) => (
                <a 
                  key={sermon.videoId} 
                  href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cloud border border-line rounded-md overflow-hidden hover:border-sky-200 transition-colors group block"
                >
                  <div className="relative aspect-video bg-slate-200">
                    {sermon.thumbnail ? (
                      <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Video size={24} />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={40} strokeWidth={1.5} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">{sermon.title}</h3>
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <span>{new Date(sermon.publishedAt).toLocaleDateString()}</span>
                      <span className="line-clamp-1 text-right ml-2">{sermon.channelTitle}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No videos found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
