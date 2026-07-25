import React from "react";
import Link from "next/link";
import { Play, ArrowRight, Tv } from "lucide-react";
import { getRecentVideos } from "@/lib/youtube";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

export default async function RecentSermons() {
  const allSermons = await getRecentVideos();
  const sermons = allSermons.slice(0, 4); // fetch 4 recent videos

  return (
    <section className="band-mist py-20 md:py-28 border-t border-[var(--color-line)]" id="recent-sermons">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <Tv size={15} className="text-[var(--color-accent)]" />
              Watch & Build Faith
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[var(--color-ink)] tracking-tight">
              Recent <span className="highlight-block">Teachings</span>
            </h2>
          </div>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-display font-bold uppercase tracking-wider
                       bg-white text-[var(--color-navy-900)] border border-[var(--color-line)] rounded-[var(--radius-sm)]
                       hover:bg-[var(--color-navy-900)] hover:text-white transition-all duration-200 shadow-xs shrink-0"
          >
            Explore All Messages
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {sermons.map((sermon) => (
            <Link
              key={sermon.videoId}
              href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 group flex flex-col shadow-xs hover:shadow-xl transform hover:-translate-y-1.5 h-full"
            >
              {/* Thumbnail Frame */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="w-13 h-13 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-[0_0_20px_rgba(217,119,6,0.5)] transform group-hover:scale-110 transition-transform">
                    <Play size={20} strokeWidth={2.5} className="ml-0.5 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white tracking-wide uppercase">
                  HD Video
                </div>
              </div>

              {/* Editorial Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-display font-bold text-[var(--color-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors mb-4">
                  {sermon.title}
                </h3>
                <div className="mt-auto pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-xs text-[var(--color-slate)] font-sans">
                  <span className="font-medium text-[var(--color-navy-900)]">Asriel TV</span>
                  <span>
                    {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
