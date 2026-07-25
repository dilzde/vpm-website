"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

interface VideoCardProps {
  sermon: YouTubeVideo;
}

export default function VideoCard({ sermon }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white border border-[var(--color-line)] rounded-lg overflow-hidden flex flex-col h-full shadow-xs">
      {/* Thumbnail Frame or In-Place YouTube Embed */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-navy-900)] shrink-0">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${sermon.videoId}?autoplay=1`}
            title={sermon.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="w-full h-full text-left relative group cursor-pointer"
            aria-label={`Play ${sermon.title}`}
          >
            {sermon.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sermon.thumbnail}
                alt={sermon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <PlaceholderSermon className="group-hover:scale-105 transition-transform duration-300" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-navy-900)] shadow-md group-hover:scale-110 transition-transform">
                <Play size={20} className="ml-0.5 fill-current" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Editorial Title & Meta */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-sans text-base font-bold text-[var(--color-navy-900)] leading-snug line-clamp-2 mb-3">
          {sermon.title}
        </h3>
        <div className="mt-auto pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs text-[var(--color-slate)] font-sans">
          <span className="font-semibold text-[var(--color-navy-700)]">Asriel TV</span>
          <span>
            {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
