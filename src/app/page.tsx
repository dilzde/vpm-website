import React from "react";
import HeroSection from "@/components/home/HeroSection";
import LiveNowStrip from "@/components/home/LiveNowStrip";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import SupportCarousel from "@/components/home/SupportCarousel";
import BookingCarousel from "@/components/home/BookingCarousel";
import RadioSpotlight from "@/components/home/RadioSpotlight";
import RecentSermons from "@/components/home/RecentSermons";
import BranchesPreview from "@/components/home/BranchesPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveNowStrip />
      <AnnouncementsSection />
      <SupportCarousel />
      <BookingCarousel />
      <RadioSpotlight />
      <RecentSermons />
      <BranchesPreview />
    </>
  );
}
