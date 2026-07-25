"use client";

import React, { useState } from "react";
import { Search, Tv } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import VideoCard from "@/components/home/VideoCard";

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
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-10 text-left">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Media Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold">
            Watch & Listen
          </h1>
        </div>

        {/* Live Status Inline Banner (Part E: Calm inline card, not hero) */}
        {liveVideo && (
          <div className="mb-10 p-6 rounded-lg bg-[var(--color-navy-900)] text-white border border-[var(--color-accent)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[var(--color-live)] animate-ping shrink-0" />
              <div>
                <span className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider block">
                  Live Now
                </span>
                <h3 className="font-sans text-lg font-bold text-white">
                  {liveVideo.title}
                </h3>
              </div>
            </div>
            <div className="w-full md:w-96 aspect-video rounded overflow-hidden bg-black shrink-0">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${liveVideo.videoId}?autoplay=1`}
                title="Live Service"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Reference 3 Tab Sub-Navigation & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[var(--color-line)] mb-10 gap-4">
          
          {/* Underlined Tabs (Reference 3 Pattern) */}
          <div className="flex items-center gap-6 overflow-x-auto pb-[1px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-sans font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[var(--color-navy-900)]"
                    : "text-[var(--color-slate)] hover:text-[var(--color-navy-900)]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 mb-3 sm:mb-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input
              type="text"
              placeholder="Search teachings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-sans rounded-md bg-white border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

        </div>

        {/* Video Grid (In-Place Playback via VideoCard) */}
        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <VideoCard key={sermon.videoId} sermon={sermon} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-[var(--color-line)] rounded-lg">
            <Tv size={36} className="mx-auto text-[var(--color-slate)] mb-3" />
            <h3 className="font-sans text-lg font-bold text-[var(--color-navy-900)] mb-1">
              No Sermons Found
            </h3>
            <p className="text-xs text-[var(--color-slate)] font-sans">
              Try refining your search terms or selecting another channel tab.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
