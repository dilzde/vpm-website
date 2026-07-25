import React from "react";
import Link from "next/link";
import { Clock, Radio } from "lucide-react";
import { getLiveStatus } from "@/lib/youtube";

export default async function LiveNowStrip() {
  const liveVideo = await getLiveStatus();

  return (
    <section
      className={`w-full border-b border-white/10 py-4 ${
        liveVideo ? "bg-[var(--color-navy-950)] text-white" : "bg-[var(--color-navy-900)] text-white border-t border-white/5"
      }`}
      id="live-now-strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {liveVideo ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-sm)] bg-[var(--color-live)] text-white text-xs font-display font-bold uppercase tracking-widest shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                Live Now
              </span>
              <span className="text-sm md:text-base text-white font-display font-bold line-clamp-1">
                {liveVideo.title}
              </span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-xs font-display font-bold uppercase tracking-wider bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Watch Broadcast →
            </a>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                <Clock size={16} strokeWidth={2.2} />
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
                <span className="text-sm text-white font-display font-bold tracking-wide uppercase">
                  Upcoming Worship Service:
                </span>
                <span className="text-sm text-slate-300 font-sans">
                  Sunday at 9:00 AM EAT
                </span>
              </div>
            </div>
            <Link
              href="/radio"
              className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[var(--color-accent)] hover:text-white transition-colors"
            >
              <Radio size={16} strokeWidth={2.2} className="animate-pulse" />
              <span>Listen Live to Asriel FM →</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
