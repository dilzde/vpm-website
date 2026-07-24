import React from "react";
import Link from "next/link";
import { Clock, Radio } from "lucide-react";
import { getLiveStatus } from "@/lib/youtube";

export default async function LiveNowStrip() {
  const liveVideo = await getLiveStatus();

  return (
    <section
      className="bg-white border-b border-line"
      id="live-now-strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {liveVideo ? (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-live/10 text-live text-xs font-semibold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
              Live
            </span>
            <span className="text-sm text-slate-800 font-medium line-clamp-1 flex-1">
              {liveVideo.title}
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors whitespace-nowrap"
            >
              Watch Now →
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 p-2 rounded-md bg-sky-50 text-sky-500">
              <Clock size={16} strokeWidth={1.75} />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-sm text-slate-800 font-medium">
                Next Service
              </span>
              <span className="text-sm text-slate-600">
                Sunday at 9:00 AM EAT
              </span>
            </div>
            <Link
              href="/radio"
              className="ml-auto flex items-center gap-1.5 text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors whitespace-nowrap"
            >
              <Radio size={14} strokeWidth={1.75} />
              <span className="hidden sm:inline">Listen to Radio</span>
              <span className="sm:hidden">Radio</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
