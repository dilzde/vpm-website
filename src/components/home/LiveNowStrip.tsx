import React from "react";
import Link from "next/link";
import { Clock, Radio } from "lucide-react";
import { getLiveStatus } from "@/lib/youtube";

export default async function LiveNowStrip() {
  const liveVideo = await getLiveStatus();

  return (
    <section
      className={`w-full border-b border-[var(--color-line)] ${
        liveVideo ? "bg-[var(--color-navy-900)]" : "bg-[var(--color-cloud)]"
      }`}
      id="live-now-strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        {liveVideo ? (
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--color-live)] text-white text-xs font-bold uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-live-pulse" />
              Live
            </span>
            <span className="text-sm md:text-base text-white font-medium line-clamp-1 flex-1">
              {liveVideo.title}
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm font-semibold text-white underline decoration-[var(--color-blue-300)] underline-offset-4 hover:text-[var(--color-blue-100)] transition-colors whitespace-nowrap"
            >
              Watch Now →
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-blue-500)] shadow-sm">
              <Clock size={16} strokeWidth={2} />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <span className="text-sm md:text-base text-[var(--color-ink)] font-semibold">
                Next Service
              </span>
              <span className="text-sm text-[var(--color-slate)] font-medium">
                Sunday at 9:00 AM EAT
              </span>
            </div>
            <Link
              href="/radio"
              className="ml-auto flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-500)] hover:text-[var(--color-blue-700)] transition-colors whitespace-nowrap"
            >
              <Radio size={16} strokeWidth={2} />
              <span className="hidden sm:inline">Listen to Radio</span>
              <span className="sm:hidden">Radio</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
