import React from "react";
import { getRecentVideos, getLiveStatus } from "@/lib/youtube";
import MediaContent from "@/components/media/MediaContent";

export const metadata = {
  title: "Sermons & Media | Voice of the Potter's Messengers International",
  description: "Watch live sanctuary transmissions, prophetic teachings, and revival messages from Voice of the Potter's Messengers International.",
};

export default async function MediaPage() {
  // Secure server-side fetching utilizing playlistItems low-quota optimization
  const [sermons, liveVideo] = await Promise.all([
    getRecentVideos(),
    getLiveStatus()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header Band */}
      <section className="band-navy py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3">
            Anointing & Prophetic Impartation
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Sermons & <span className="highlight-block">Media Vault</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Immerse your spirit in transforming truths. Explore our comprehensive archive of recent revival worship gatherings, deliverance meetings, and continuous broadcast streams.
          </p>
        </div>
      </section>

      {/* Interactive Bento Grid & Live Player */}
      <MediaContent initialSermons={sermons} liveVideo={liveVideo} />
    </div>
  );
}

