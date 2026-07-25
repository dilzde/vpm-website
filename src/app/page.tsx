import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import SupportCarousel from "@/components/home/SupportCarousel";
import BookingCarousel from "@/components/home/BookingCarousel";
import RadioSpotlight from "@/components/home/RadioSpotlight";
import RecentSermons from "@/components/home/RecentSermons";
import BranchesPreview from "@/components/home/BranchesPreview";
import ImageGallery from "@/components/home/ImageGallery";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementsSection />
      <SupportCarousel />
      <BookingCarousel />
      <RadioSpotlight />
      <RecentSermons />
      <BranchesPreview />
      <ImageGallery />
    </>
  );
}
