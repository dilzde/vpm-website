import React from "react";
import { getRecentVideos, getLiveStatus } from "@/lib/youtube";
import MediaContent from "@/components/media/MediaContent";

export const metadata = {
  title: "Sermons & Media Vault | Voice of the Potter's Messengers International",
  description: "Watch live sanctuary transmissions, prophetic teachings, and revival messages from Voice of the Potter's Messengers International.",
};

export default async function MediaPage() {
  const [sermons, liveVideo] = await Promise.all([
    getRecentVideos(),
    getLiveStatus()
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <MediaContent initialSermons={sermons} liveVideo={liveVideo} />
    </div>
  );
}
