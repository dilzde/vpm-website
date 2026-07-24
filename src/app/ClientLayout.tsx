"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { visible } = useRadioPlayer();

  return (
    <div className={`flex flex-col min-h-screen ${visible ? "pb-[68px] md:pb-0" : ""}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MiniPlayer />
    </div>
  );
}
