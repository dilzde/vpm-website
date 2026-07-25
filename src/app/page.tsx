import React from "react";
import HeroSection from "@/components/home/HeroSection";
import LiveRadioBand from "@/components/home/LiveRadioBand";
import HeartbeatBand from "@/components/home/HeartbeatBand";
import NumberedValues from "@/components/home/NumberedValues";
import AboutSection from "@/components/home/AboutSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import RecentSermons from "@/components/home/RecentSermons";
import SupportMissionBand from "@/components/home/SupportMissionBand";
import BranchesPreview from "@/components/home/BranchesPreview";
import ImageGallery from "@/components/home/ImageGallery";

export const revalidate = 60; // Revalidate every minute for live status / playlist updates

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. Nav bar in layout */}
      
      {/* 2. Hero Section (Part C) */}
      <HeroSection />

      {/* 3. Live & Radio Band (Part D §3 — Net-New, directly below Hero) */}
      <LiveRadioBand />

      {/* 4. "Our Heartbeat" Statement Band (Part D §4) */}
      <HeartbeatBand />

      {/* 5. Numbered Values / Pillars Grid (Part D §5) */}
      <NumberedValues />

      {/* 6. About / Who We Are Band (Part D §6) */}
      <AboutSection />

      {/* 7. Announcements Strip (Part D §7 — Terracotta Badges) */}
      <AnnouncementsSection />

      {/* 8. Recent Sermons / Watch Strip (Part D §8 — In-Place Video Playback) */}
      <RecentSermons />

      {/* 9. Support the Mission Band (Part D §9 — Full-Bleed Navy Separation) */}
      <SupportMissionBand />

      {/* 10. Branches Preview (Part D §10 & Part F — Clean Cards Grid, No Video) */}
      <BranchesPreview />

      {/* 11. Interactive Above-Footer Gallery (Part D §11) */}
      <ImageGallery />

      {/* 12. Footer in layout */}
    </main>
  );
}
