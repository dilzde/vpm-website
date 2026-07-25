"use client";

import React, { useState } from "react";
import { Search, Tv, Radio, MessageSquare, Play, Pause } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import VideoCard from "@/components/home/VideoCard";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

interface MediaContentProps {
  initialSermons: YouTubeVideo[];
  liveVideo: YouTubeVideo | null;
}

export default function MediaContent({ initialSermons, liveVideo }: MediaContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const { isPlaying, toggle } = useRadioPlayer();

  const channelAId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_A_ID || "UC5z_MlBqT0-uB9Y6IQlD68A";
  const channelBId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_B_ID || "UCcvFW-VNXVDJBTYYDLTM6qw";

  const tabs = [
    { id: "all", label: "All Sermons" },
    { id: "channelA", label: "Asriel TV (Channel A)", filter: channelAId },
    { id: "channelB", label: "Voice of the Potter (Channel B)", filter: channelBId },
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

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Entry: Utility Search Entry Header (§5 & §9) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-line)]">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              ARCHIVE & RESOURCES
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold tracking-tight">
              Media Vault & Broadcasts
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

        {/* Transition/Context: Featured Live Card & Compact Radio Widget Side-by-Side (§9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Live Status / Featured Service Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-ink)] uppercase tracking-wider">
                <Tv size={14} className="text-[var(--color-slate)]" />
                <span>{liveVideo ? "Live Broadcast" : "Featured Message"}</span>
              </div>
              <span className="text-xs font-sans text-[var(--color-slate)]">Asriel TV</span>
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
              <div className="space-y-2">
                <h3 className="font-sans text-xl font-bold text-[var(--color-ink)]">
                  Sunday Morning Prophetic & Worship Service
                </h3>
                <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
                  Join Apostle Asriel live from Githurai Main Altar every Sunday at 9:00 AM for foundational word and territorial prayer.
                </p>
              </div>
            )}
          </div>

          {/* Right: Compact Live Radio Widget (§9) */}
          <div className="lg:col-span-5 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 flex flex-col justify-between shadow-[var(--shadow-card)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold">
                    <Radio size={18} />
                  </div>
                  <span className="font-sans font-bold text-base text-[var(--color-ink)]">Asriel Radio 24/7</span>
                </div>
                <span className="text-xs font-mono text-[var(--color-slate)]">Zeno FM</span>
              </div>

              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Stream daily anointed preachings and heavenly worship directly in your browser.
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggle()}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-sm hover:scale-105 transition-all shadow-xs"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? "Pause Asriel Radio" : "Listen Live Now"}</span>
            </button>
          </div>

        </div>

        {/* Tab Sub-Navigation Pills (2.5px Lime Active Underline) */}
        <div className="flex items-center gap-6 border-b border-[var(--color-line)] pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-sans font-semibold uppercase tracking-wider relative py-2 transition-colors whitespace-nowrap cursor-pointer ${
                  active ? "text-[var(--color-ink)] font-bold" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--color-accent)] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Context: Video Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((video) => (
            <VideoCard key={video.videoId} sermon={video} />
          ))}
        </div>

        {/* Context: Community Feed Placeholder Section (Configured for Real Submissions §0) */}
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
