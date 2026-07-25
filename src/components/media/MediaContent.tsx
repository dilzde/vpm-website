"use client";

import React, { useState } from "react";
import { Play, Search, Video, Tv, Radio, Sparkles, ExternalLink, Calendar, Filter } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

interface MediaContentProps {
  initialSermons: YouTubeVideo[];
  liveVideo: YouTubeVideo | null;
}

export default function MediaContent({ initialSermons, liveVideo }: MediaContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const channelAId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_A_ID || "UC5z_MlBqT0-uB9Y6IQlD68A";
  const channelBId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_B_ID || "UCcvFW-VNXVDJBTYYDLTM6qw";

  const tabs = [
    { id: "all", label: "All Sermons & Streams" },
    { id: "channelA", label: "Asriel TV (Channel A)", filter: channelAId, fallbackTitle: "Asriel TV" },
    { id: "channelB", label: "Voice of the Potter (Channel B)", filter: channelBId, fallbackTitle: "Voice of the Potter" },
  ];

  const filteredSermons = initialSermons.filter((video) => {
    const matchesSearch = searchQuery
      ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channelTitle.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    if (!matchesSearch) return false;

    if (activeTab === "channelA") {
      return video.channelId === channelAId || video.channelTitle?.toLowerCase().includes("asriel");
    }
    if (activeTab === "channelB") {
      return video.channelId === channelBId || video.channelTitle?.toLowerCase().includes("voice of the potter");
    }

    return true;
  });

  const featuredVideo = filteredSermons.length > 0 ? filteredSermons[0] : null;
  const remainingVideos = filteredSermons.length > 1 ? filteredSermons.slice(1) : [];

  return (
    <div className="flex flex-col">
      {/* Live Stream Showcase Band */}
      <section className="band-navy py-12 md:py-16 border-b border-white/10" id="live-showcase">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {liveVideo ? (
            <div className="bg-white/5 border border-[var(--color-accent)]/40 rounded-[var(--radius-lg)] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-7/12 aspect-video bg-black rounded-[var(--radius-md)] overflow-hidden shadow-lg border border-white/15">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
                    title={liveVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-display font-bold uppercase tracking-widest mb-4 w-fit">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    Live Sanctuary Transmission
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3 tracking-tight">
                    {liveVideo.title}
                  </h2>
                  <p className="text-sm font-sans text-slate-300 mb-6 leading-relaxed">
                    Broadcasting live from {liveVideo.channelTitle || "Voice of the Potter's Messengers Sanctuary"}. Connect with us in worship, word, and prophetic miracles happening right now.
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-display font-bold uppercase tracking-wider rounded-[var(--radius-sm)] transition-all shadow-[var(--shadow-accent)] w-fit"
                  >
                    <span>Open on YouTube Live</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-[var(--radius-lg)] p-8 md:p-12 text-center relative overflow-hidden shadow-xl backdrop-blur-md">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-5">
                  <Tv size={30} strokeWidth={1.8} />
                </div>
                <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2">
                  Live Stream Status
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  No Live Broadcast Currently Off-Air
                </h3>
                <p className="text-slate-300 text-sm md:text-base font-sans mb-8 leading-relaxed">
                  Our live sanctuary television streams activate automatically during scheduled worship gatherings and prophetic deliverance meetings. In the meantime, immerse yourself in our rich treasury of revival teachings below.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://www.youtube.com/@AsrielTV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-display font-bold uppercase tracking-wider rounded-[var(--radius-sm)] transition-all shadow-[var(--shadow-accent)]"
                  >
                    Subscribe to Asriel TV →
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCcvFW-VNXVDJBTYYDLTM6qw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-display font-bold uppercase tracking-wider rounded-[var(--radius-sm)] transition-all"
                  >
                    Voice of the Potter Channel
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Tabs & Search Band */}
      <section className="band-white py-8 border-b border-[var(--color-line)] sticky top-[72px] z-30 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          
          {/* Pills Sub-navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-display font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[var(--color-navy-900)] text-[var(--color-accent)] shadow-sm scale-102 border border-[var(--color-navy-900)]"
                    : "bg-[var(--color-cloud)] text-[var(--color-slate)] hover:bg-[var(--color-mist)] hover:text-[var(--color-ink)] border border-[var(--color-line)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input
              type="search"
              placeholder="Search sermons & broadcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-sans font-medium bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-full
                         text-[var(--color-ink)] placeholder-[var(--color-slate)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Gallery Section */}
      <section className="band-mist py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {filteredSermons.length > 0 ? (
            <div className="space-y-12">
              
              {/* Primary Feature Span (Latest Release) */}
              {featuredVideo && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4">
                    <Sparkles size={16} />
                    <span>Featured Latest Release</span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${featuredVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 shadow-sm hover:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 transform hover:-translate-y-1"
                  >
                    {/* Visual Thumb Frame (7 columns) */}
                    <div className="lg:col-span-7 aspect-video lg:aspect-auto relative bg-[var(--color-navy-950)] min-h-[280px] sm:min-h-[380px]">
                      {featuredVideo.thumbnail ? (
                        <img
                          src={featuredVideo.thumbnail}
                          alt={featuredVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <PlaceholderSermon className="group-hover:scale-105 transition-transform duration-700" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:hidden" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.6)] transform group-hover:scale-110 transition-transform">
                          <Play size={26} strokeWidth={2.5} className="ml-1 fill-current" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--color-navy-900)]/90 backdrop-blur-md text-white border border-white/15 rounded text-[11px] font-display font-bold uppercase tracking-wider">
                        New Release
                      </div>
                    </div>

                    {/* Editorial Content Frame (5 columns) */}
                    <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-slate)] uppercase tracking-wider mb-4">
                          <Calendar size={14} className="text-[var(--color-accent)] shrink-0" />
                          <span>
                            {new Date(featuredVideo.publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors leading-tight mb-4">
                          {featuredVideo.title}
                        </h3>
                        <p className="text-sm font-sans text-[var(--color-slate)] line-clamp-3 leading-relaxed mb-8">
                          Experience this anointed teaching from our ministry pulpit. Join believers worldwide as we break bread from God&apos;s eternal word and receive prophetic impartation.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[var(--color-line)] flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-[var(--color-cloud)] text-[var(--color-navy-900)] text-xs font-display font-bold rounded-md border border-[var(--color-line)]">
                          {featuredVideo.channelTitle}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-display font-bold text-[var(--color-navy-900)] uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                          Watch Message →
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Uniform Bento Grid Cards */}
              {remainingVideos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-[var(--color-slate)] mb-6">
                    <Filter size={14} />
                    <span>Recent Ministry Archives ({remainingVideos.length} Messages)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {remainingVideos.map((sermon) => (
                      <a
                        key={sermon.videoId}
                        href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 group flex flex-col shadow-xs hover:shadow-xl transform hover:-translate-y-1.5 h-full"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-navy-950)] shrink-0">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/40 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(217,119,6,0.5)] transform group-hover:scale-110 transition-transform">
                              <Play size={18} strokeWidth={2.5} className="ml-0.5 fill-current" />
                            </div>
                          </div>
                        </div>

                        {/* Card copy */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="text-[11px] font-mono text-[var(--color-slate)] mb-2 uppercase tracking-wide">
                            {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <h4 className="text-lg font-display font-bold text-[var(--color-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors mb-6">
                            {sermon.title}
                          </h4>
                          <div className="mt-auto pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs text-[var(--color-slate)] font-sans">
                            <span className="font-semibold text-[var(--color-navy-900)] px-2.5 py-0.5 bg-[var(--color-cloud)] rounded border border-[var(--color-line)]">
                              {sermon.channelTitle}
                            </span>
                            <span className="text-[11px] font-display font-bold uppercase text-[var(--color-accent)] tracking-wider">
                              Watch Now →
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-28 bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] shadow-sm max-w-2xl mx-auto p-8">
              <Video size={52} strokeWidth={1} className="mx-auto mb-4 text-[var(--color-slate)] opacity-60" />
              <h3 className="text-2xl font-display font-bold text-[var(--color-ink)] mb-2">No Messages Found</h3>
              <p className="text-[var(--color-slate)] font-sans text-base mb-6">
                We couldn&apos;t find any sermons matching &ldquo;{searchQuery}&rdquo; in this channel category.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                className="px-6 py-2.5 bg-[var(--color-navy-900)] text-white text-xs font-display font-bold uppercase tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
