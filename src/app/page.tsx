import React from "react";
import HeroSection from "@/components/home/HeroSection";
import QuickActionsRow from "@/components/home/QuickActionsRow";
import GatheringsAnnouncementsCarousel from "@/components/home/GatheringsAnnouncementsCarousel";
import LiveRadioBand from "@/components/home/LiveRadioBand";
import HeartbeatBand from "@/components/home/HeartbeatBand";
import NumberedValues from "@/components/home/NumberedValues";
import AboutSection from "@/components/home/AboutSection";
import RecentSermons from "@/components/home/RecentSermons";
import SupportMissionBand from "@/components/home/SupportMissionBand";
import BranchesPreview from "@/components/home/BranchesPreview";
import ImageGallery from "@/components/home/ImageGallery";

export const revalidate = 60; // Revalidate every minute for live status / playlist updates

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. Hero Section (§C) */}
      <HeroSection />

      {/* 2. Quick Actions Row (§D — Directly below Hero) */}
      <QuickActionsRow />

      {/* 3. Gatherings & Announcements Carousel + Real-Time Next Service Banner (Directly below Quick Actions) */}
      <GatheringsAnnouncementsCarousel />

      {/* 4. Live & Radio Band */}
      <LiveRadioBand />

      {/* 5. "Our Heartbeat" Statement Band (§L Copy) */}
      <HeartbeatBand />

      {/* 6. Numbered Values / Core Foundations Grid (§L Copy) */}
      <NumberedValues />

      {/* 7. About / Who We Are Band (§G Copy) */}
      <AboutSection />

      {/* 8. Recent Sermons / Watch Strip */}
      <RecentSermons />

      {/* 9. Support the Mission Band (§E Copy) */}
      <SupportMissionBand />

      {/* 10. Branches Preview (§F — 4 Clean Real Branches Cards Only) */}
      <BranchesPreview />

      {/* 11. Interactive Above-Footer Gallery */}
      <ImageGallery />
    </main>
  );
}
