"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import FloatingRadioWidget from "@/components/FloatingRadioWidget";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { visible } = useRadioPlayer();

  const isLinksPage = pathname === "/links" || pathname?.startsWith("/links/");

  if (isLinksPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className={`flex flex-col min-h-screen ${visible ? "pb-[68px] md:pb-0" : ""}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <FloatingRadioWidget />
      <Footer />
      <MiniPlayer />
    </div>
  );
}
