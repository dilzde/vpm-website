"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MiniPlayer />
    </>
  );
}
