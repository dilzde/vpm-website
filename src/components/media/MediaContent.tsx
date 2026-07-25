"use client";

import React, { useState } from "react";
import { Search, Tv, Radio, MessageSquare, Play, Pause, ExternalLink, Video } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import VideoCard from "@/components/home/VideoCard";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

interface MediaContentProps {
  initialSermons: YouTubeVideo[];
  liveVideo: YouTubeVideo | null;
}

const CHANNEL_A_ID = "UC5z_MlBqT0-uB9Y6IQlD68A";
const CHANNEL_B_ID = "UCcvFW-VNXVDJBTYYDLTM6qw";

export default function MediaContent({ initialSermons, liveVideo }: MediaContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "channelA" | "channelB">("all");
  const { isPlaying, toggle } = useRadioPlayer();

  const tabs = [
    { id: "all", label: "All Sermons" },
    { id: "channelA", label: "Asriel TV (Channel A)", channelId: CHANNEL_A_ID, url: `https://www.youtube.com/channel/${CHANNEL_A_ID}` },
    { id: "channelB", label: "Voice of the Potter (Channel B)", channelId: CHANNEL_B_ID, url: `https://www.youtube.com/channel/${CHANNEL_B_ID}` },
  ];

  // Robust filtering across search and channel tabs
  const filteredSermons = initialSermons.filter((video) => {
    const titleLower = video.title.toLowerCase();
    const channelLower = video.channelTitle.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = searchQuery
      ? titleLower.includes(searchLower) || channelLower.includes(searchLower)
      : true;

    if (!matchesSearch) return false;

    if (activeTab === "channelA") {
      return (
        video.channelId === CHANNEL_A_ID ||
        channelLower.includes("asriel") ||
        channelLower.includes("channel a")
      );
    }
    if (activeTab === "channelB") {
      return (
        video.channelId === CHANNEL_B_ID ||
        channelLower.includes("voice of the potter") ||
        channelLower.includes("channel b")
      );
    }

    return true;
  });

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Entry: Utility Search Entry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-line)]">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              ARCHIVE & BROADCASTS
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold tracking-tight">
              Sermons & Media Vault
            </h1>
          </div>

          {/* Search Input Widget */}
          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder="Search sermons, topics, or series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm font-sans focus:outline-none focus:border-[var(--color-ink)] transition-colors"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-[var(--color-slate)]" />
          </div>
        </div>

        {/* Live Broadcast Card & Compact Asriel Radio Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Featured Live Card */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-ink)] uppercase tracking-wider">
                <Tv size={14} className="text-[var(--color-anchor-olive)]" />
                <span>{liveVideo ? "Live Broadcast" : "Featured Teaching"}</span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--color-slate)]">Asriel TV & YouTube</span>
            </div>

            {liveVideo ? (
              <div className="w-full aspect-video rounded-[var(--radius-eight)] overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${liveVideo.videoId}?autoplay=1`}
                  title={liveVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="space-y-3 py-2">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[var(--color-ink)]">
                  Prophetic Teaching & Worship — Prophet Dr. Samo Mtishiby
                </h3>
                <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
                  Join Prophet Dr. Samo Mtishiby for live teachings streaming every Tuesday through Friday from 8:00 PM to 10:00 PM on YouTube and Asriel Radio.
                </p>
              </div>
            )}
          </div>

          {/* Right: Asriel Radio Widget */}
          <div className="lg:col-span-5 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 flex flex-col justify-between shadow-[var(--shadow-card)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold">
                    <Radio size={18} />
                  </div>
                  <span className="font-sans font-extrabold text-base text-[var(--color-ink)]">Asriel Radio Live</span>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--color-anchor-olive)]">24/7 Stream</span>
              </div>

              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Stream continuous prophetic teachings and intercessory worship directly in your browser without leaving the page.
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggle()}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--color-navy-900)] text-white font-sans font-bold text-sm hover:scale-105 transition-all shadow-xs cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? "Pause Asriel Radio" : "Listen Live Now"}</span>
            </button>
          </div>

        </div>

        {/* Tab Sub-Navigation Pills & Direct YouTube Channel Links */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-3">
            
            {/* Interactive Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-sm font-sans font-extrabold uppercase tracking-wider relative py-2 transition-colors whitespace-nowrap cursor-pointer ${
                      active ? "text-[var(--color-ink)]" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {tab.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-accent)] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* External Channel Links */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_A_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-sans font-bold hover:bg-red-100 transition-colors border border-red-200"
              >
                <Video size={14} />
                <span>Channel A YouTube</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={`https://www.youtube.com/channel/${CHANNEL_B_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-sans font-bold hover:bg-red-100 transition-colors border border-red-200"
              >
                <Video size={14} />
                <span>Channel B YouTube</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        </div>

        {/* Video Cards Bento Grid */}
        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((video) => (
              <VideoCard key={video.videoId} sermon={video} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-12 text-center max-w-xl mx-auto space-y-3">
            <h3 className="font-sans font-bold text-lg text-[var(--color-ink)]">No Sermons Found</h3>
            <p className="text-sm text-[var(--color-slate)] font-sans">
              No videos matched your active search or channel tab filter. Try resetting your search or selecting another channel tab.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-navy-900)] text-white text-xs font-bold font-sans"
            >
              Show All Sermons
            </button>
          </div>
        )}

        {/* Community Testimonies Section */}
        <div className="pt-8 border-t border-[var(--color-line)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-1">
                COMMUNITY TESTIMONIES
              </span>
              <h2 className="font-sans text-2xl font-bold text-[var(--color-ink)]">
                Believer Encounters
              </h2>
            </div>
            <span className="text-xs font-sans text-[var(--color-slate)]">Moderated via Admin Desk</span>
          </div>

          <div className="bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] p-8 text-center max-w-xl mx-auto space-y-3">
            <MessageSquare size={24} className="mx-auto text-[var(--color-slate)]" />
            <h3 className="font-sans font-bold text-base text-[var(--color-ink)]">Share Your Testimony</h3>
            <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
              Have you experienced God&apos;s healing or transformation through VPM International? Submit your verified testimony to be featured.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
